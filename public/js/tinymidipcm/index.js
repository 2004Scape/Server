import loadTinyMidiPCM from './tinymidipcm.mjs';

class TinyMidiPCM {
    constructor(options = {}) {
        this.wasmModule = undefined;

        this.soundfontBufferPtr = 0;
        this.soundfontPtr = 0;

        this.midiBufferPtr = 0;

        this.renderInterval = options.renderInterval || 100;

        this.sampleRate = options.sampleRate || 44100;
        this.channels = options.channels || 2;
        this.gain = options.gain || 0;

        if (!options.bufferSize) {
            this.setBufferDuration(1);
        } else {
            this.bufferSize = options.bufferSize;
        }

        this.onPCMData = options.onPCMData || (() => {});
        this.onRenderEnd = options.onRenderEnd || (() => {});

        this.renderTimer = undefined;

        this.test = 0;
    }

    async init() {
        if (this.wasmModule) {
            return;
        }

        // check if node
        // http://philiplassen.com/2021/08/11/node-es6-emscripten.html
        if (typeof process !== 'undefined') {
            const { dirname } = await import(/* webpackIgnore: true */ 'path');
            const { createRequire } = await import(
                /* webpackIgnore: true */ 'module'
            );

            globalThis.__dirname = dirname(import.meta.url);
            globalThis.require = createRequire(import.meta.url);
        }

        this.wasmModule = await loadTinyMidiPCM();

        this.pcmBufferPtr = this.wasmModule._malloc(this.bufferSize);
        this.msecsPtr = this.wasmModule._malloc(8);
    }

    // set buffer size based on seconds
    setBufferDuration(seconds) {
        this.bufferSize = 4 * this.sampleRate * this.channels * seconds;
    }

    ensureInitialized() {
        if (!this.wasmModule) {
            throw new Error(
                `${this.constructor.name} not initalized. call .init()`
            );
        }
    }

    setSoundfont(buffer) {
        this.ensureInitialized();

        const {
            _malloc,
            _free,
            _tsf_load_memory,
            _tsf_set_output,
            _tsf_channel_set_bank_preset,
            _tsf_set_max_voices,
            _tsf_channel_set_presetnumber
        } = this.wasmModule;

        _free(this.soundfontBufferPtr);

        this.soundfontBufferPtr = _malloc(buffer.length);
        this.wasmModule.HEAPU8.set(buffer, this.soundfontBufferPtr);

        //_tsf_channel_set_bank_preset(this.soundfontPtr, 9, 128, 0);

        this.soundfontPtr = _tsf_load_memory(
            this.soundfontBufferPtr,
            buffer.length
        );

        //_tsf_set_max_voices(this.soundfontPtr, 10);

        _tsf_set_output(
            this.soundfontPtr,
            this.channels === 2 ? 0 : 2,
            this.sampleRate,
            this.gain
        );
    }

    getPCMBuffer() {
        this.ensureInitialized();

        const pcm = new Uint8Array(this.bufferSize);

        pcm.set(
            this.wasmModule.HEAPU8.subarray(
                this.pcmBufferPtr,
                this.pcmBufferPtr + this.bufferSize
            )
        );

        return pcm;
    }

    getMIDIMessagePtr(midiBuffer) {
        const { _malloc, _free, _tml_load_memory } = this.wasmModule;

        _free(this.midiBufferPtr);

        this.midiBufferPtr = _malloc(midiBuffer.length);
        this.wasmModule.HEAPU8.set(midiBuffer, this.midiBufferPtr);

        return _tml_load_memory(this.midiBufferPtr, midiBuffer.length);
    }

    renderMIDIMessage(midiMessagePtr) {
        const { _midi_render } = this.wasmModule;

        return _midi_render(
            this.soundfontPtr,
            midiMessagePtr,
            this.channels,
            this.sampleRate,
            this.pcmBufferPtr,
            this.bufferSize,
            this.msecsPtr
        );
    }

    render(midiBuffer) {
        this.ensureInitialized();

        if (!this.soundfontPtr) {
            throw new Error('no soundfont buffer set. call .setSoundfont');
        }

        window.clearTimeout(this.renderTimer);

        const { setValue, getValue } = this.wasmModule;

        setValue(this.msecsPtr, 0, 'double');

        this.wasmModule._tsf_reset(this.soundfontPtr);
        this.wasmModule._tsf_channel_set_bank_preset(this.soundfontPtr, 9, 128, 0);

        if (midiBuffer[0] == 'R'.charCodeAt(0)) {
            // there is a RIFF header before the midi, quick hack
            midiBuffer = midiBuffer.slice(0x14);
        }
        let midiMessagePtr = this.getMIDIMessagePtr(midiBuffer);

        const boundRender = function () {
            midiMessagePtr = this.renderMIDIMessage(midiMessagePtr);

            const pcm = this.getPCMBuffer();

            this.onPCMData(pcm);

            if (midiMessagePtr) {
                this.renderTimer = setTimeout(boundRender, this.renderInterval);
            } else {
                this.onRenderEnd(getValue(this.msecsPtr, 'double'));
            }
        }.bind(this);

        this.renderTimer = setTimeout(() => {
            boundRender();
        }, 16);
    }
}

export default TinyMidiPCM;
