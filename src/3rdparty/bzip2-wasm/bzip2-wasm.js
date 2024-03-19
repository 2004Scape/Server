import loadBZip2WASM from './bzip2-1.0.8/bzip2.mjs';

const ERROR_MESSAGES = {
    '-2': 'BZ_PARAM_ERROR: incorrect parameters',
    '-3': "BZ_MEM_ERROR: couldn't allocate enough memory",
    '-4': 'BZ_DATA_ERROR: data integrity error when decompressing',
    '-5': 'BZ_DATA_ERROR_MAGIC: compressed data has incorrect header',
    '-7': 'BZ_UNEXPECTED_EOF: compressed data ends too early',
    '-8': 'BZ_OUTBUFF_FULL: destination buffer is full'
};

class BZip2 {
    constructor() {
        this.wasmModule = undefined;
    }

    // fetch the wasm and initialize it
    async init() {
        if (this.wasmModule) {
            return;
        }

        // check if node
        // http://philiplassen.com/2021/08/11/node-es6-emscripten.html
        if (typeof process !== 'undefined') {
            const { dirname } = await import/* webpackIgnore: true */('path');
            const { createRequire } = await import(/* webpackIgnore: true */'module');

            globalThis.__dirname = dirname(import.meta.url);
            globalThis.require = createRequire(import.meta.url);
        }

        this.wasmModule = await loadBZip2WASM();
    }

    ensureInitialized() {
        if (!this.wasmModule) {
            throw new Error(
                `${this.constructor.name} not initalized. call .init()`
            );
        }
    }

    // turn bzip's integer return values into an error message and throw it.
    // also free the destination pointers
    handleError(returnValue, destPtr, destLengthPtr) {
        if (returnValue === 0) {
            return;
        }

        this.wasmModule._free(destPtr);
        this.wasmModule._free(destLengthPtr);

        const errorMessage = ERROR_MESSAGES[returnValue];

        if (errorMessage) {
            throw new Error(errorMessage);
        }

        throw new Error(`error code: ${returnValue}`);
    }

    // create source, destination and length buffers
    createWASMBuffers(source, destLength) {
        const { _malloc, setValue, HEAPU8 } = this.wasmModule;

        const sourcePtr = _malloc(source.length);
        HEAPU8.set(source, sourcePtr);

        const destPtr = _malloc(destLength);

        const destLengthPtr = _malloc(destLength);
        setValue(destLengthPtr, destLength, 'i32');

        return { sourcePtr, destPtr, destLengthPtr };
    }

    // read the length returned by bzip, create a new Uint8Array of that size
    // and copy the decompressed/compressed data into it
    createBuffer(destPtr, destLengthPtr) {
        const { _free, getValue, HEAPU8 } = this.wasmModule;

        const destLength = getValue(destLengthPtr, 'i32');

        const dest = new Uint8Array(destLength);
        dest.set(HEAPU8.subarray(destPtr, destPtr + destLength));

        _free(destPtr);
        _free(destLengthPtr);

        return dest;
    }

    decompress(compressed, decompressedLength, prependHeader = false, containsDecompressedLength = false) {
        if (containsDecompressedLength) {
            decompressedLength = (compressed[0] << 24) | (compressed[1] << 16) | (compressed[2] << 8) | compressed[3];
            compressed[0] = 'B'.charCodeAt(0);
            compressed[1] = 'Z'.charCodeAt(0);
            compressed[2] = 'h'.charCodeAt(0);
            compressed[3] = '1'.charCodeAt(0);
            prependHeader = false;
        }

        if (prependHeader) {
            const temp = new Uint8Array(compressed.length + 4);
            temp[0] = 'B'.charCodeAt(0);
            temp[1] = 'Z'.charCodeAt(0);
            temp[2] = 'h'.charCodeAt(0);
            temp[3] = '1'.charCodeAt(0);
            temp.set(compressed, 4);
            compressed = temp;
        }

        this.ensureInitialized();

        const {
            sourcePtr: compressedPtr,
            destPtr: decompressedPtr,
            destLengthPtr: decompressedLengthPtr
        } = this.createWASMBuffers(compressed, decompressedLength);

        const returnValue = this.wasmModule._BZ2_bzBuffToBuffDecompress(
            decompressedPtr,
            decompressedLengthPtr,
            compressedPtr,
            compressed.length,
            0,
            0
        );

        this.wasmModule._free(compressedPtr);

        this.handleError(returnValue, decompressedPtr, decompressedLengthPtr);

        return this.createBuffer(decompressedPtr, decompressedLengthPtr);
    }

    compress(decompressed, prefixLength = false, removeHeader = false, blockSize = 1, compressedLength = 0) {
        this.ensureInitialized();

        if (!compressedLength) {
            compressedLength = decompressed.length + 1024;
        }

        if (compressedLength < 128) {
            compressedLength = 128;
        }

        if (blockSize <= 0 || blockSize > 9) {
            throw new RangeError('blockSize should be between 1-9');
        }

        const {
            sourcePtr: decompressedPtr,
            destPtr: compressedPtr,
            destLengthPtr: compressedLengthPtr
        } = this.createWASMBuffers(decompressed, compressedLength);

        const returnValue = this.wasmModule._BZ2_bzBuffToBuffCompress(
            compressedPtr,
            compressedLengthPtr,
            decompressedPtr,
            decompressed.length,
            blockSize,
            0,
            30
        );

        this.wasmModule._free(decompressedPtr);

        this.handleError(returnValue, compressedPtr, compressedLengthPtr);

        const buf = this.createBuffer(compressedPtr, compressedLengthPtr);

        if (prefixLength) {
            buf[0] = (decompressed.length >> 24) & 0xff;
            buf[1] = (decompressed.length >> 16) & 0xff;
            buf[2] = (decompressed.length >> 8) & 0xff;
            buf[3] = decompressed.length & 0xff;
        }

        if (removeHeader) {
            return buf.subarray(4);
        }

        return buf;
    }
}

export default BZip2;
