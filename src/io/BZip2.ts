import BZ2Wasm from '#3rdparty/bzip2-wasm/bzip2-wasm.js';

const bzip2 = new BZ2Wasm();
await bzip2.init();

export default bzip2;
