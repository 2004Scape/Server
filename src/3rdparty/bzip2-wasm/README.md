# bzip2-wasm

(de)compress buffers in node and browser using wasm-compiled
[bzip2](https://sourceware.org/bzip2/).

## install

    $ npm install bzip2-wasm

## example
```javascript
import BZip2 from "wasm-bzip2";
import fs from 'fs';

const bzip2 = new BZip2();

await bzip2.init();

const licenseText = fs.readFileSync('./LICENSE');
console.log('original length:', licenseText.length);

const compressed = bzip2.compress(licenseText);
console.log('compressed length:', compressed.length);

const decompressed = bzip2.decompress(compressed, licenseText.length);
console.log('decompressed length:', decompressed.length);
```

## api

### bzip2 = new BZip2()

### async bzip2.init()
fetch and load the wasm. required for following methods.

### bzip2.compress(decompressed, blockSize = 5, compressedSize = decompressed.length)
compress an array of bytes.

`decompressed` should be array-like
([TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
or regular) of bytes.

`blockSize` should be a Number between 1-9 to determine block size (multiplied
by 100k). default is 5 (500k).

`compressedLength` should be a Number that is at least large or larger
than the resulting compressed data. default is `decompressed.length`.

returns a
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
of compressed data.

### bzip2.decompress(compressed = [], decompressedLength = 0)
decompress a compressed array of bytes.

`compressed` should be array-like
([TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
or regular) of bytes.

`decompressedLength` should be a Number that is at least large or larger
than the resulting decompressed data.

returns a
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
of decompressed data.

## license
This program, "bzip2", the associated library "libbzip2", and all
documentation, are copyright (C) 1996-2019 Julian R Seward.  All
rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

2. The origin of this software must not be misrepresented; you must
   not claim that you wrote the original software.  If you use this
   software in a product, an acknowledgment in the product
   documentation would be appreciated but is not required.

3. Altered source versions must be plainly marked as such, and must
   not be misrepresented as being the original software.

4. The name of the author may not be used to endorse or promote
   products derived from this software without specific prior written
   permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Julian Seward, jseward@acm.org
bzip2/libbzip2 version 1.0.8 of 13 July 2019
