// src/client/Client.ts
import { playWave, setWaveVolume, BZip2 as BZip22, playMidi, stopMidi, setMidiVolume, MobileKeyboard as MobileKeyboard2 } from "./deps.js";

// src/graphics/Canvas.ts
var canvas = document.getElementById("canvas");
var canvas2d = canvas.getContext("2d", { willReadFrequently: true });
var jpegCanvas = document.createElement("canvas");
var jpegImg = document.createElement("img");
var jpeg2d = jpegCanvas.getContext("2d", { willReadFrequently: true });

// src/datastruct/Linkable.ts
class Linkable {
  key = 0n;
  next = null;
  prev = null;
  unlink() {
    if (this.prev != null) {
      this.prev.next = this.next;
      if (this.next) {
        this.next.prev = this.prev;
      }
      this.next = null;
      this.prev = null;
    }
  }
}

// src/datastruct/DoublyLinkable.ts
class DoublyLinkable extends Linkable {
  next2 = null;
  prev2 = null;
  unlink2() {
    if (this.prev2 !== null) {
      this.prev2.next2 = this.next2;
      if (this.next2) {
        this.next2.prev2 = this.prev2;
      }
      this.next2 = null;
      this.prev2 = null;
    }
  }
}

// src/graphics/Pix2D.ts
class Pix2D extends DoublyLinkable {
  static pixels = new Int32Array;
  static width2d = 0;
  static height2d = 0;
  static top = 0;
  static bottom = 0;
  static left = 0;
  static right = 0;
  static boundX = 0;
  static centerX2d = 0;
  static centerY2d = 0;
  static bind(pixels, width, height) {
    this.pixels = pixels;
    this.width2d = width;
    this.height2d = height;
    this.setBounds(0, 0, width, height);
  }
  static resetBounds() {
    this.left = 0;
    this.top = 0;
    this.right = this.width2d;
    this.bottom = this.height2d;
    this.boundX = this.right - 1;
    this.centerX2d = this.right / 2 | 0;
  }
  static setBounds(left, top, right, bottom) {
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (right > this.width2d) {
      right = this.width2d;
    }
    if (bottom > this.height2d) {
      bottom = this.height2d;
    }
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.boundX = this.right - 1;
    this.centerX2d = this.right / 2 | 0;
    this.centerY2d = this.bottom / 2 | 0;
  }
  static clear() {
    const len = this.width2d * this.height2d;
    for (let i = 0;i < len; i++) {
      this.pixels[i] = 0;
    }
  }
  static drawRect(x, y, w, h, color) {
    this.drawHorizontalLine(x, y, color, w);
    this.drawHorizontalLine(x, y + h - 1, color, w);
    this.drawVerticalLine(x, y, color, h);
    this.drawVerticalLine(x + w - 1, y, color, h);
  }
  static drawHorizontalLine(x, y, color, width) {
    if (y < this.top || y >= this.bottom) {
      return;
    }
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    const off = x + y * this.width2d;
    for (let i = 0;i < width; i++) {
      this.pixels[off + i] = color;
    }
  }
  static drawVerticalLine(x, y, color, width) {
    if (x < this.left || x >= this.right) {
      return;
    }
    if (y < this.top) {
      width -= this.top - y;
      y = this.top;
    }
    if (y + width > this.bottom) {
      width = this.bottom - y;
    }
    const off = x + y * this.width2d;
    for (let i = 0;i < width; i++) {
      this.pixels[off + i * this.width2d] = color;
    }
  }
  static drawLine(x1, y1, x2, y2, color) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      if (x1 >= this.left && x1 < this.right && y1 >= this.top && y1 < this.bottom) {
        this.pixels[x1 + y1 * this.width2d] = color;
      }
      if (x1 === x2 && y1 === y2) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err = err - dy;
        x1 = x1 + sx;
      }
      if (e2 < dx) {
        err = err + dx;
        y1 = y1 + sy;
      }
    }
  }
  static fillRect2d(x, y, width, height, color) {
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (y < this.top) {
      height -= this.top - y;
      y = this.top;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    if (y + height > this.bottom) {
      height = this.bottom - y;
    }
    const step = this.width2d - width;
    let offset = x + y * this.width2d;
    for (let i = -height;i < 0; i++) {
      for (let j = -width;j < 0; j++) {
        this.pixels[offset++] = color;
      }
      offset += step;
    }
  }
  static fillRectAlpha(x, y, width, height, rgb, alpha) {
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (y < this.top) {
      height -= this.top - y;
      y = this.top;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    if (y + height > this.bottom) {
      height = this.bottom - y;
    }
    const invAlpha = 256 - alpha;
    const r0 = (rgb >> 16 & 255) * alpha;
    const g0 = (rgb >> 8 & 255) * alpha;
    const b0 = (rgb & 255) * alpha;
    const step = this.width2d - width;
    let offset = x + y * this.width2d;
    for (let i = 0;i < height; i++) {
      for (let j = -width;j < 0; j++) {
        const r1 = (this.pixels[offset] >> 16 & 255) * invAlpha;
        const g1 = (this.pixels[offset] >> 8 & 255) * invAlpha;
        const b1 = (this.pixels[offset] & 255) * invAlpha;
        const color = (r0 + r1 >> 8 << 16) + (g0 + g1 >> 8 << 8) + (b0 + b1 >> 8);
        this.pixels[offset++] = color;
      }
      offset += step;
    }
  }
  static fillCircle(xCenter, yCenter, yRadius, rgb, alpha) {
    const invAlpha = 256 - alpha;
    const r0 = (rgb >> 16 & 255) * alpha;
    const g0 = (rgb >> 8 & 255) * alpha;
    const b0 = (rgb & 255) * alpha;
    let yStart = yCenter - yRadius;
    if (yStart < 0) {
      yStart = 0;
    }
    let yEnd = yCenter + yRadius;
    if (yEnd >= this.height2d) {
      yEnd = this.height2d - 1;
    }
    for (let y = yStart;y <= yEnd; y++) {
      const midpoint = y - yCenter;
      const xRadius = Math.sqrt(yRadius * yRadius - midpoint * midpoint) | 0;
      let xStart = xCenter - xRadius;
      if (xStart < 0) {
        xStart = 0;
      }
      let xEnd = xCenter + xRadius;
      if (xEnd >= this.width2d) {
        xEnd = this.width2d - 1;
      }
      let offset = xStart + y * this.width2d;
      for (let x = xStart;x <= xEnd; x++) {
        const r1 = (this.pixels[offset] >> 16 & 255) * invAlpha;
        const g1 = (this.pixels[offset] >> 8 & 255) * invAlpha;
        const b1 = (this.pixels[offset] & 255) * invAlpha;
        const color = (r0 + r1 >> 8 << 16) + (g0 + g1 >> 8 << 8) + (b0 + b1 >> 8);
        this.pixels[offset++] = color;
      }
    }
  }
  static setPixel(x, y, color) {
    if (x < this.left || x >= this.right || y < this.top || y >= this.bottom) {
      return;
    }
    this.pixels[x + y * this.width2d] = color;
  }
}

// src/datastruct/LinkList.ts
class LinkList {
  sentinel = new Linkable;
  current = null;
  constructor() {
    this.sentinel.next = this.sentinel;
    this.sentinel.prev = this.sentinel;
  }
  addTail(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel.prev;
    node.next = this.sentinel;
    if (node.prev) {
      node.prev.next = node;
    }
    node.next.prev = node;
  }
  addHead(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel;
    node.next = this.sentinel.next;
    node.prev.next = node;
    if (node.next) {
      node.next.prev = node;
    }
  }
  removeHead() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      return null;
    }
    node?.unlink();
    return node;
  }
  head() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.next || null;
    return node;
  }
  tail() {
    const node = this.sentinel.prev;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.prev || null;
    return node;
  }
  next() {
    const node = this.current;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.next || null;
    return node;
  }
  prev() {
    const node = this.current;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.prev || null;
    return node;
  }
  clear() {
    while (true) {
      const node = this.sentinel.next;
      if (node === this.sentinel) {
        return;
      }
      node?.unlink();
    }
  }
}

// src/util/JsUtil.ts
var sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var downloadUrl = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());
function arraycopy(src, srcPos, dst, dstPos, length) {
  while (length--)
    dst[dstPos++] = src[srcPos++];
}
function bytesToBigInt(bytes) {
  let result = 0n;
  for (let index = 0;index < bytes.length; index++) {
    result = result << 8n | BigInt(bytes[index]);
  }
  return result;
}
function bigIntToBytes(bigInt) {
  const bytes = [];
  while (bigInt > 0n) {
    bytes.unshift(Number(bigInt & 0xffn));
    bigInt >>= 8n;
  }
  if (bytes[0] & 128) {
    bytes.unshift(0);
  }
  return new Uint8Array(bytes);
}
function bigIntModPow(base, exponent, modulus) {
  let result = 1n;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = result * base % modulus;
    }
    base = base * base % modulus;
    exponent >>= 1n;
  }
  return result;
}

// src/io/Packet.ts
class Packet extends DoublyLinkable {
  static CRC32_POLYNOMIAL = 3988292384;
  static crctable = new Int32Array(256);
  static bitmask = new Uint32Array(33);
  static cacheMin = new LinkList;
  static cacheMid = new LinkList;
  static cacheMax = new LinkList;
  static cacheMinCount = 0;
  static cacheMidCount = 0;
  static cacheMaxCount = 0;
  static {
    for (let i = 0;i < 32; i++) {
      Packet.bitmask[i] = (1 << i) - 1;
    }
    Packet.bitmask[32] = 4294967295;
    for (let i = 0;i < 256; i++) {
      let remainder = i;
      for (let bit = 0;bit < 8; bit++) {
        if ((remainder & 1) === 1) {
          remainder = remainder >>> 1 ^ Packet.CRC32_POLYNOMIAL;
        } else {
          remainder >>>= 1;
        }
      }
      Packet.crctable[i] = remainder;
    }
  }
  static crc32(src) {
    let crc = 4294967295;
    for (let i = 0;i < src.length; i++) {
      crc = crc >>> 8 ^ Packet.crctable[(crc ^ src[i]) & 255];
    }
    return ~crc;
  }
  view;
  data;
  pos = 0;
  bitPos = 0;
  random = null;
  constructor(src) {
    if (!src) {
      throw new Error;
    }
    super();
    if (src instanceof Int8Array) {
      this.data = new Uint8Array(src);
    } else {
      this.data = src;
    }
    this.view = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength);
  }
  get length() {
    return this.view.byteLength;
  }
  get available() {
    return this.length - this.pos;
  }
  static alloc(type) {
    let cached = null;
    if (type === 0 && Packet.cacheMinCount > 0) {
      Packet.cacheMinCount--;
      cached = Packet.cacheMin.removeHead();
    } else if (type === 1 && Packet.cacheMidCount > 0) {
      Packet.cacheMidCount--;
      cached = Packet.cacheMid.removeHead();
    } else if (type === 2 && Packet.cacheMaxCount > 0) {
      Packet.cacheMaxCount--;
      cached = Packet.cacheMax.removeHead();
    }
    if (cached) {
      cached.pos = 0;
      return cached;
    }
    if (type === 0) {
      return new Packet(new Uint8Array(100));
    } else if (type === 1) {
      return new Packet(new Uint8Array(5000));
    }
    return new Packet(new Uint8Array(30000));
  }
  release() {
    this.pos = 0;
    if (this.view.byteLength === 100 && Packet.cacheMinCount < 1000) {
      Packet.cacheMin.addTail(this);
      Packet.cacheMinCount++;
    } else if (this.view.byteLength === 5000 && Packet.cacheMidCount < 250) {
      Packet.cacheMid.addTail(this);
      Packet.cacheMidCount++;
    } else if (this.view.byteLength === 30000 && Packet.cacheMaxCount < 50) {
      Packet.cacheMax.addTail(this);
      Packet.cacheMaxCount++;
    }
  }
  g1() {
    return this.view.getUint8(this.pos++);
  }
  g1b() {
    return this.view.getInt8(this.pos++);
  }
  g2() {
    const result = this.view.getUint16(this.pos);
    this.pos += 2;
    return result;
  }
  g2b() {
    const result = this.view.getInt16(this.pos);
    this.pos += 2;
    return result;
  }
  g3() {
    const result = this.view.getUint8(this.pos++) << 16 | this.view.getUint16(this.pos);
    this.pos += 2;
    return result;
  }
  g4() {
    const result = this.view.getInt32(this.pos);
    this.pos += 4;
    return result;
  }
  g8() {
    const result = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return result;
  }
  gsmart() {
    return this.view.getUint8(this.pos) < 128 ? this.g1() - 64 : this.g2() - 49152;
  }
  gsmarts() {
    return this.view.getUint8(this.pos) < 128 ? this.g1() : this.g2() - 32768;
  }
  gjstr() {
    const view = this.view;
    const length = view.byteLength;
    let str = "";
    let b;
    while ((b = view.getUint8(this.pos++)) !== 10 && this.pos < length) {
      str += String.fromCharCode(b);
    }
    return str;
  }
  gdata(length, offset, dest) {
    dest.set(this.data.subarray(this.pos, this.pos + length), offset);
    this.pos += length;
  }
  p1isaac(opcode) {
    this.view.setUint8(this.pos++, opcode + (this.random?.nextInt ?? 0) & 255);
  }
  p1(value) {
    this.view.setUint8(this.pos++, value);
  }
  p2(value) {
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  ip2(value) {
    this.view.setUint16(this.pos, value, true);
    this.pos += 2;
  }
  p3(value) {
    this.view.setUint8(this.pos++, value >> 16);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  p4(value) {
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  ip4(value) {
    this.view.setInt32(this.pos, value, true);
    this.pos += 4;
  }
  p8(value) {
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
  pjstr(str) {
    const view = this.view;
    const length = str.length;
    for (let i = 0;i < length; i++) {
      view.setUint8(this.pos++, str.charCodeAt(i));
    }
    view.setUint8(this.pos++, 10);
  }
  pdata(src, length, offset) {
    this.data.set(src.subarray(offset, offset + length), this.pos);
    this.pos += length - offset;
  }
  psize1(size) {
    this.view.setUint8(this.pos - size - 1, size);
  }
  bits() {
    this.bitPos = this.pos << 3;
  }
  bytes() {
    this.pos = this.bitPos + 7 >>> 3;
  }
  gBit(n) {
    let bytePos = this.bitPos >>> 3;
    let remaining = 8 - (this.bitPos & 7);
    let value = 0;
    this.bitPos += n;
    for (;n > remaining; remaining = 8) {
      value += (this.view.getUint8(bytePos++) & Packet.bitmask[remaining]) << n - remaining;
      n -= remaining;
    }
    if (n === remaining) {
      value += this.view.getUint8(bytePos) & Packet.bitmask[remaining];
    } else {
      value += this.view.getUint8(bytePos) >>> remaining - n & Packet.bitmask[n];
    }
    return value;
  }
  rsaenc(mod, exp) {
    const length = this.pos;
    this.pos = 0;
    const temp = new Uint8Array(length);
    this.gdata(length, 0, temp);
    const bigRaw = bytesToBigInt(temp);
    const bigEnc = bigIntModPow(bigRaw, exp, mod);
    const rawEnc = bigIntToBytes(bigEnc);
    this.pos = 0;
    this.p1(rawEnc.length);
    this.pdata(rawEnc, rawEnc.length, 0);
  }
}

// src/graphics/Pix8.ts
class Pix8 extends DoublyLinkable {
  pixels;
  width2d;
  height2d;
  cropX;
  cropY;
  cropW;
  cropH;
  rgbPal;
  constructor(width, height, palette) {
    super();
    this.pixels = new Int8Array(width * height);
    this.width2d = this.cropW = width;
    this.height2d = this.cropH = height;
    this.cropX = this.cropY = 0;
    this.rgbPal = palette;
  }
  static fromArchive(archive, name, sprite = 0) {
    const dat = new Packet(archive.read(name + ".dat"));
    const index = new Packet(archive.read("index.dat"));
    index.pos = dat.g2();
    const cropW = index.g2();
    const cropH = index.g2();
    const paletteCount = index.g1();
    const palette = new Int32Array(paletteCount);
    for (let i = 1;i < paletteCount; i++) {
      palette[i] = index.g3();
      if (palette[i] === 0) {
        palette[i] = 1;
      }
    }
    for (let i = 0;i < sprite; i++) {
      index.pos += 2;
      dat.pos += index.g2() * index.g2();
      index.pos += 1;
    }
    if (dat.pos > dat.length || index.pos > index.length) {
      throw new Error;
    }
    const cropX = index.g1();
    const cropY = index.g1();
    const width = index.g2();
    const height = index.g2();
    const image = new Pix8(width, height, palette);
    image.cropX = cropX;
    image.cropY = cropY;
    image.cropW = cropW;
    image.cropH = cropH;
    const pixels = image.pixels;
    const pixelOrder = index.g1();
    if (pixelOrder === 0) {
      const length = image.width2d * image.height2d;
      for (let i = 0;i < length; i++) {
        pixels[i] = dat.g1b();
      }
    } else if (pixelOrder === 1) {
      const width2 = image.width2d;
      const height2 = image.height2d;
      for (let x = 0;x < width2; x++) {
        for (let y = 0;y < height2; y++) {
          pixels[x + y * width2] = dat.g1b();
        }
      }
    }
    return image;
  }
  draw(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImage(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  flipHorizontally() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < height; y++) {
      const div = width / 2 | 0;
      for (let x = 0;x < div; x++) {
        const off1 = x + y * width;
        const off2 = width - x - 1 + y * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  flipVertically() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < (height / 2 | 0); y++) {
      for (let x = 0;x < width; x++) {
        const off1 = x + y * width;
        const off2 = x + (height - y - 1) * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  translate2d(r, g, b) {
    for (let i = 0;i < this.rgbPal.length; i++) {
      let red = this.rgbPal[i] >> 16 & 255;
      red += r;
      if (red < 0) {
        red = 0;
      } else if (red > 255) {
        red = 255;
      }
      let green = this.rgbPal[i] >> 8 & 255;
      green += g;
      if (green < 0) {
        green = 0;
      } else if (green > 255) {
        green = 255;
      }
      let blue = this.rgbPal[i] & 255;
      blue += b;
      if (blue < 0) {
        blue = 0;
      } else if (blue > 255) {
        blue = 255;
      }
      this.rgbPal[i] = (red << 16) + (green << 8) + blue;
    }
  }
  shrink() {
    this.cropW |= 0;
    this.cropH |= 0;
    this.cropW /= 2;
    this.cropH /= 2;
    this.cropW |= 0;
    this.cropH |= 0;
    const pixels = new Int8Array(this.cropW * this.cropH);
    let off = 0;
    for (let y = 0;y < this.height2d; y++) {
      for (let x = 0;x < this.width2d; x++) {
        pixels[(x + this.cropX >> 1) + (y + this.cropY >> 1) * this.cropW] = this.pixels[off++];
      }
    }
    this.pixels = pixels;
    this.width2d = this.cropW;
    this.height2d = this.cropH;
    this.cropX = 0;
    this.cropY = 0;
  }
  crop() {
    if (this.width2d === this.cropW && this.height2d === this.cropH) {
      return;
    }
    const pixels = new Int8Array(this.cropW * this.cropH);
    let off = 0;
    for (let y = 0;y < this.height2d; y++) {
      for (let x = 0;x < this.width2d; x++) {
        pixels[x + this.cropX + (y + this.cropY) * this.cropW] = this.pixels[off++];
      }
    }
    this.pixels = pixels;
    this.width2d = this.cropW;
    this.height2d = this.cropH;
    this.cropX = 0;
    this.cropY = 0;
  }
  copyImage(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
      }
      for (let x = w;x < 0; x++) {
        const palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  clip(arg0, arg1, arg2, arg3) {
    try {
      const local2 = this.width2d;
      const local5 = this.height2d;
      let local7 = 0;
      let local9 = 0;
      const local15 = (local2 << 16) / arg2 | 0;
      const local21 = (local5 << 16) / arg3 | 0;
      const local24 = this.cropW;
      const local27 = this.cropH;
      const local33 = (local24 << 16) / arg2 | 0;
      const local39 = (local27 << 16) / arg3 | 0;
      arg0 = arg0 + (this.cropX * arg2 + local24 - 1) / local24 | 0;
      arg1 = arg1 + (this.cropY * arg3 + local27 - 1) / local27 | 0;
      if (this.cropX * arg2 % local24 != 0) {
        local7 = (local24 - this.cropX * arg2 % local24 << 16) / arg2 | 0;
      }
      if (this.cropY * arg3 % local27 != 0) {
        local9 = (local27 - this.cropY * arg3 % local27 << 16) / arg3 | 0;
      }
      arg2 = arg2 * (this.width2d - (local7 >> 16)) / local24 | 0;
      arg3 = arg3 * (this.height2d - (local9 >> 16)) / local27 | 0;
      let local133 = arg0 + arg1 * Pix2D.width2d;
      let local137 = Pix2D.width2d - arg2;
      let local144;
      if (arg1 < Pix2D.top) {
        local144 = Pix2D.top - arg1;
        arg3 -= local144;
        arg1 = 0;
        local133 += local144 * Pix2D.width2d;
        local9 += local39 * local144;
      }
      if (arg1 + arg3 > Pix2D.bottom) {
        arg3 -= arg1 + arg3 - Pix2D.bottom;
      }
      if (arg0 < Pix2D.left) {
        local144 = Pix2D.left - arg0;
        arg2 -= local144;
        arg0 = 0;
        local133 += local144;
        local7 += local33 * local144;
        local137 += local144;
      }
      if (arg0 + arg2 > Pix2D.right) {
        local144 = arg0 + arg2 - Pix2D.right;
        arg2 -= local144;
        local137 += local144;
      }
      this.plot_scale(Pix2D.pixels, this.pixels, this.rgbPal, local7, local9, local133, local137, arg2, arg3, local33, local39, local2);
    } catch (ignore) {
      console.log("error in sprite clipping routine");
    }
  }
  plot_scale(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    try {
      const local3 = arg3;
      for (let local6 = -arg8;local6 < 0; local6++) {
        const local14 = (arg4 >> 16) * arg11;
        for (let local17 = -arg7;local17 < 0; local17++) {
          const local27 = arg1[(arg3 >> 16) + local14];
          if (local27 == 0) {
            arg5++;
          } else {
            arg0[arg5++] = arg2[local27 & 255];
          }
          arg3 += arg9;
        }
        arg4 += arg10;
        arg3 = local3;
        arg5 += arg6;
      }
    } catch (ignore) {
      console.log("error in plot_scale");
    }
  }
}

// src/util/Arrays.ts
class TypedArray1d extends Array {
  constructor(length, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = defaultValue;
    }
  }
}

class TypedArray2d extends Array {
  constructor(length, width, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = defaultValue;
      }
    }
  }
}

class TypedArray3d extends Array {
  constructor(length, width, height, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = new Array(height);
        for (let h = 0;h < height; h++) {
          this[l][w][h] = defaultValue;
        }
      }
    }
  }
}

class TypedArray4d extends Array {
  constructor(length, width, height, space, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = new Array(height);
        for (let h = 0;h < height; h++) {
          this[l][w][h] = new Array(space);
          for (let s = 0;s < space; s++) {
            this[l][w][h][s] = defaultValue;
          }
        }
      }
    }
  }
}

class Uint8Array3d extends Array {
  constructor(length, width, height) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = new Uint8Array(height);
      }
    }
  }
}

class Int32Array2d extends Array {
  constructor(length, width) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Int32Array(width);
    }
  }
}

class Int32Array3d extends Array {
  constructor(length, width, height) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = new Int32Array(height);
      }
    }
  }
}

// src/graphics/Pix3D.ts
class Pix3D extends Pix2D {
  static lowMemory = false;
  static reciprocal15 = new Int32Array(512);
  static reciprocal16 = new Int32Array(2048);
  static sin = new Int32Array(2048);
  static cos = new Int32Array(2048);
  static hslPal = new Int32Array(65536);
  static textures = new TypedArray1d(50, null);
  static textureCount = 0;
  static lineOffset = new Int32Array;
  static centerX = 0;
  static centerY = 0;
  static jagged = true;
  static clipX = false;
  static alpha = 0;
  static texelPool = null;
  static activeTexels = new TypedArray1d(50, null);
  static poolSize = 0;
  static cycle = 0;
  static textureCycle = new Int32Array(50);
  static texPal = new TypedArray1d(50, null);
  static opaque = false;
  static textureTranslucent = new TypedArray1d(50, false);
  static averageTextureRGB = new Int32Array(50);
  static {
    for (let i = 1;i < 512; i++) {
      this.reciprocal15[i] = 32768 / i | 0;
    }
    for (let i = 1;i < 2048; i++) {
      this.reciprocal16[i] = 65536 / i | 0;
    }
    for (let i = 0;i < 2048; i++) {
      this.sin[i] = Math.sin(i * 0.0030679615757712823) * 65536 | 0;
      this.cos[i] = Math.cos(i * 0.0030679615757712823) * 65536 | 0;
    }
  }
  static init2D() {
    this.lineOffset = new Int32Array(Pix2D.height2d);
    for (let y = 0;y < Pix2D.height2d; y++) {
      this.lineOffset[y] = Pix2D.width2d * y;
    }
    this.centerX = Pix2D.width2d / 2 | 0;
    this.centerY = Pix2D.height2d / 2 | 0;
  }
  static init3D(width, height) {
    this.lineOffset = new Int32Array(height);
    for (let y = 0;y < height; y++) {
      this.lineOffset[y] = width * y;
    }
    this.centerX = width / 2 | 0;
    this.centerY = height / 2 | 0;
  }
  static clearTexels() {
    this.texelPool = null;
    this.activeTexels.fill(null);
  }
  static unpackTextures(textures) {
    this.textureCount = 0;
    for (let i = 0;i < 50; i++) {
      try {
        this.textures[i] = Pix8.fromArchive(textures, i.toString());
        if (this.lowMemory && this.textures[i]?.cropW === 128) {
          this.textures[i]?.shrink();
        } else {
          this.textures[i]?.crop();
        }
        this.textureCount++;
      } catch (err) {
      }
    }
  }
  static getAverageTextureRGB(id) {
    if (this.averageTextureRGB[id] !== 0) {
      return this.averageTextureRGB[id];
    }
    const palette = this.texPal[id];
    if (!palette) {
      return 0;
    }
    let r = 0;
    let g = 0;
    let b = 0;
    const length = palette.length;
    for (let i = 0;i < length; i++) {
      r += palette[i] >> 16 & 255;
      g += palette[i] >> 8 & 255;
      b += palette[i] & 255;
    }
    let rgb = ((r / length | 0) << 16) + ((g / length | 0) << 8) + (b / length | 0);
    rgb = this.setGamma(rgb, 1.4);
    if (rgb === 0) {
      rgb = 1;
    }
    this.averageTextureRGB[id] = rgb;
    return rgb;
  }
  static setBrightness(brightness) {
    const randomBrightness = brightness + Math.random() * 0.03 - 0.015;
    let offset = 0;
    for (let y = 0;y < 512; y++) {
      const hue = (y / 8 | 0) / 64 + 0.0078125;
      const saturation = (y & 7) / 8 + 0.0625;
      for (let x = 0;x < 128; x++) {
        const lightness = x / 128;
        let r = lightness;
        let g = lightness;
        let b = lightness;
        if (saturation !== 0) {
          let q;
          if (lightness < 0.5) {
            q = lightness * (saturation + 1);
          } else {
            q = lightness + saturation - lightness * saturation;
          }
          const p = lightness * 2 - q;
          let t = hue + 0.3333333333333333;
          if (t > 1) {
            t--;
          }
          let d11 = hue - 0.3333333333333333;
          if (d11 < 0) {
            d11++;
          }
          if (t * 6 < 1) {
            r = p + (q - p) * 6 * t;
          } else if (t * 2 < 1) {
            r = q;
          } else if (t * 3 < 2) {
            r = p + (q - p) * (0.6666666666666666 - t) * 6;
          } else {
            r = p;
          }
          if (hue * 6 < 1) {
            g = p + (q - p) * 6 * hue;
          } else if (hue * 2 < 1) {
            g = q;
          } else if (hue * 3 < 2) {
            g = p + (q - p) * (0.6666666666666666 - hue) * 6;
          } else {
            g = p;
          }
          if (d11 * 6 < 1) {
            b = p + (q - p) * 6 * d11;
          } else if (d11 * 2 < 1) {
            b = q;
          } else if (d11 * 3 < 2) {
            b = p + (q - p) * (0.6666666666666666 - d11) * 6;
          } else {
            b = p;
          }
        }
        const intR = r * 256 | 0;
        const intG = g * 256 | 0;
        const intB = b * 256 | 0;
        const rgb = (intR << 16) + (intG << 8) + intB;
        this.hslPal[offset++] = this.setGamma(rgb, randomBrightness);
      }
    }
    for (let id = 0;id < 50; id++) {
      const texture = this.textures[id];
      if (!texture) {
        continue;
      }
      const palette = texture.rgbPal;
      this.texPal[id] = new Int32Array(palette.length);
      for (let i = 0;i < palette.length; i++) {
        const texturePalette = this.texPal[id];
        if (!texturePalette) {
          continue;
        }
        texturePalette[i] = this.setGamma(palette[i], randomBrightness);
      }
    }
    for (let id = 0;id < 50; id++) {
      this.pushTexture(id);
    }
  }
  static setGamma(rgb, gamma) {
    const r = (rgb >> 16) / 256;
    const g = (rgb >> 8 & 255) / 256;
    const b = (rgb & 255) / 256;
    const powR = Math.pow(r, gamma);
    const powG = Math.pow(g, gamma);
    const powB = Math.pow(b, gamma);
    const intR = powR * 256 | 0;
    const intG = powG * 256 | 0;
    const intB = powB * 256 | 0;
    return (intR << 16) + (intG << 8) + intB;
  }
  static initPool(size) {
    if (this.texelPool) {
      return;
    }
    this.poolSize = size;
    if (this.lowMemory) {
      this.texelPool = new Int32Array2d(size, 16384);
    } else {
      this.texelPool = new Int32Array2d(size, 65536);
    }
    this.activeTexels.fill(null);
  }
  static fillGouraudTriangle(xA, xB, xC, yA, yB, yC, colorA, colorB, colorC) {
    let xStepAB = 0;
    let colorStepAB = 0;
    if (yB !== yA) {
      xStepAB = (xB - xA << 16) / (yB - yA) | 0;
      colorStepAB = (colorB - colorA << 15) / (yB - yA) | 0;
    }
    let xStepBC = 0;
    let colorStepBC = 0;
    if (yC !== yB) {
      xStepBC = (xC - xB << 16) / (yC - yB) | 0;
      colorStepBC = (colorC - colorB << 15) / (yC - yB) | 0;
    }
    let xStepAC = 0;
    let colorStepAC = 0;
    if (yC !== yA) {
      xStepAC = (xA - xC << 16) / (yA - yC) | 0;
      colorStepAC = (colorA - colorC << 15) / (yA - yC) | 0;
    }
    if (yA <= yB && yA <= yC) {
      if (yA < Pix2D.bottom) {
        if (yB > Pix2D.bottom) {
          yB = Pix2D.bottom;
        }
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yB < yC) {
          xC = xA <<= 16;
          colorC = colorA <<= 15;
          if (yA < 0) {
            xC -= xStepAC * yA;
            xA -= xStepAB * yA;
            colorC -= colorStepAC * yA;
            colorA -= colorStepAB * yA;
            yA = 0;
          }
          xB <<= 16;
          colorB <<= 15;
          if (yB < 0) {
            xB -= xStepBC * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          if (yA !== yB && xStepAC < xStepAB || yA === yB && xStepAC > xStepBC) {
            yC -= yB;
            yB -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepAC;
                  xB += xStepBC;
                  colorC += colorStepAC;
                  colorB += colorStepBC;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
              xC += xStepAC;
              xA += xStepAB;
              colorC += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          } else {
            yC -= yB;
            yB -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepAC;
                  xB += xStepBC;
                  colorC += colorStepAC;
                  colorB += colorStepBC;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
              xC += xStepAC;
              xA += xStepAB;
              colorC += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          }
        } else {
          xB = xA <<= 16;
          colorB = colorA <<= 15;
          if (yA < 0) {
            xB -= xStepAC * yA;
            xA -= xStepAB * yA;
            colorB -= colorStepAC * yA;
            colorA -= colorStepAB * yA;
            yA = 0;
          }
          xC <<= 16;
          colorC <<= 15;
          if (yC < 0) {
            xC -= xStepBC * yC;
            colorC -= colorStepBC * yC;
            yC = 0;
          }
          if (yA !== yC && xStepAC < xStepAB || yA === yC && xStepBC > xStepAB) {
            yB -= yC;
            yC -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepBC;
                  xA += xStepAB;
                  colorC += colorStepBC;
                  colorA += colorStepAB;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
              xB += xStepAC;
              xA += xStepAB;
              colorB += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          } else {
            yB -= yC;
            yC -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepBC;
                  xA += xStepAB;
                  colorC += colorStepBC;
                  colorA += colorStepAB;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yA, 0);
              xB += xStepAC;
              xA += xStepAB;
              colorB += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          }
        }
      }
    } else if (yB <= yC) {
      if (yB < Pix2D.bottom) {
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yA > Pix2D.bottom) {
          yA = Pix2D.bottom;
        }
        if (yC < yA) {
          xA = xB <<= 16;
          colorA = colorB <<= 15;
          if (yB < 0) {
            xA -= xStepAB * yB;
            xB -= xStepBC * yB;
            colorA -= colorStepAB * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          xC <<= 16;
          colorC <<= 15;
          if (yC < 0) {
            xC -= xStepAC * yC;
            colorC -= colorStepAC * yC;
            yC = 0;
          }
          if (yB !== yC && xStepAB < xStepBC || yB === yC && xStepAB > xStepAC) {
            yA -= yC;
            yC -= yB;
            yB = Pix3D.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAB;
                  xC += xStepAC;
                  colorA += colorStepAB;
                  colorC += colorStepAC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
              xA += xStepAB;
              xB += xStepBC;
              colorA += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          } else {
            yA -= yC;
            yC -= yB;
            yB = Pix3D.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAB;
                  xC += xStepAC;
                  colorA += colorStepAB;
                  colorC += colorStepAC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
              xA += xStepAB;
              xB += xStepBC;
              colorA += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          }
        } else {
          xC = xB <<= 16;
          colorC = colorB <<= 15;
          if (yB < 0) {
            xC -= xStepAB * yB;
            xB -= xStepBC * yB;
            colorC -= colorStepAB * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          xA <<= 16;
          colorA <<= 15;
          if (yA < 0) {
            xA -= xStepAC * yA;
            colorA -= colorStepAC * yA;
            yA = 0;
          }
          yC -= yA;
          yA -= yB;
          yB = Pix3D.lineOffset[yB];
          if (xStepAB < xStepBC) {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAC;
                  xB += xStepBC;
                  colorA += colorStepAC;
                  colorB += colorStepBC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
              xC += xStepAB;
              xB += xStepBC;
              colorC += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          } else {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAC;
                  xB += xStepBC;
                  colorA += colorStepAC;
                  colorB += colorStepBC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yB, 0);
              xC += xStepAB;
              xB += xStepBC;
              colorC += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          }
        }
      }
    } else if (yC < Pix2D.bottom) {
      if (yA > Pix2D.bottom) {
        yA = Pix2D.bottom;
      }
      if (yB > Pix2D.bottom) {
        yB = Pix2D.bottom;
      }
      if (yA < yB) {
        xB = xC <<= 16;
        colorB = colorC <<= 15;
        if (yC < 0) {
          xB -= xStepBC * yC;
          xC -= xStepAC * yC;
          colorB -= colorStepBC * yC;
          colorC -= colorStepAC * yC;
          yC = 0;
        }
        xA <<= 16;
        colorA <<= 15;
        if (yA < 0) {
          xA -= xStepAB * yA;
          colorA -= colorStepAB * yA;
          yA = 0;
        }
        yB -= yA;
        yA -= yC;
        yC = Pix3D.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yC, 0);
                xB += xStepBC;
                xA += xStepAB;
                colorB += colorStepBC;
                colorA += colorStepAB;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
            xB += xStepBC;
            xC += xStepAC;
            colorB += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
                xB += xStepBC;
                xA += xStepAB;
                colorB += colorStepBC;
                colorA += colorStepAB;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
            xB += xStepBC;
            xC += xStepAC;
            colorB += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        }
      } else {
        xA = xC <<= 16;
        colorA = colorC <<= 15;
        if (yC < 0) {
          xA -= xStepBC * yC;
          xC -= xStepAC * yC;
          colorA -= colorStepBC * yC;
          colorC -= colorStepAC * yC;
          yC = 0;
        }
        xB <<= 16;
        colorB <<= 15;
        if (yB < 0) {
          xB -= xStepAB * yB;
          colorB -= colorStepAB * yB;
          yB = 0;
        }
        yA -= yB;
        yB -= yC;
        yC = Pix3D.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
                xB += xStepAB;
                xC += xStepAC;
                colorB += colorStepAB;
                colorC += colorStepAC;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
            xA += xStepBC;
            xC += xStepAC;
            colorA += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        } else {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
                xB += xStepAB;
                xC += xStepAC;
                colorB += colorStepAB;
                colorC += colorStepAC;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yC, 0);
            xA += xStepBC;
            xC += xStepAC;
            colorA += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        }
      }
    }
  }
  static drawGouraudScanline(x0, x1, color0, color1, dst, offset, length) {
    let rgb;
    if (Pix3D.jagged) {
      let colorStep;
      if (Pix3D.clipX) {
        if (x1 - x0 > 3) {
          colorStep = (color1 - color0) / (x1 - x0) | 0;
        } else {
          colorStep = 0;
        }
        if (x1 > Pix2D.boundX) {
          x1 = Pix2D.boundX;
        }
        if (x0 < 0) {
          color0 -= x0 * colorStep;
          x0 = 0;
        }
        if (x0 >= x1) {
          return;
        }
        offset += x0;
        length = x1 - x0 >> 2;
        colorStep <<= 2;
      } else if (x0 < x1) {
        offset += x0;
        length = x1 - x0 >> 2;
        if (length > 0) {
          colorStep = (color1 - color0) * Pix3D.reciprocal15[length] >> 15;
        } else {
          colorStep = 0;
        }
      } else {
        return;
      }
      if (Pix3D.alpha === 0) {
        while (true) {
          length--;
          if (length < 0) {
            length = x1 - x0 & 3;
            if (length > 0) {
              rgb = Pix3D.hslPal[color0 >> 8];
              do {
                dst[offset++] = rgb;
                length--;
              } while (length > 0);
              return;
            }
            break;
          }
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
        }
      } else {
        const alpha = Pix3D.alpha;
        const invAlpha = 256 - Pix3D.alpha;
        while (true) {
          length--;
          if (length < 0) {
            length = x1 - x0 & 3;
            if (length > 0) {
              rgb = Pix3D.hslPal[color0 >> 8];
              rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
              do {
                dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
                length--;
              } while (length > 0);
            }
            break;
          }
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
        }
      }
    } else if (x0 < x1) {
      const colorStep = (color1 - color0) / (x1 - x0) | 0;
      if (Pix3D.clipX) {
        if (x1 > Pix2D.boundX) {
          x1 = Pix2D.boundX;
        }
        if (x0 < 0) {
          color0 -= x0 * colorStep;
          x0 = 0;
        }
        if (x0 >= x1) {
          return;
        }
      }
      offset += x0;
      length = x1 - x0;
      if (Pix3D.alpha === 0) {
        do {
          dst[offset++] = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          length--;
        } while (length > 0);
      } else {
        const alpha = Pix3D.alpha;
        const invAlpha = 256 - Pix3D.alpha;
        do {
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          length--;
        } while (length > 0);
      }
    }
  }
  static fillTriangle(x0, x1, x2, y0, y1, y2, color) {
    let xStepAB = 0;
    if (y1 !== y0) {
      xStepAB = (x1 - x0 << 16) / (y1 - y0) | 0;
    }
    let xStepBC = 0;
    if (y2 !== y1) {
      xStepBC = (x2 - x1 << 16) / (y2 - y1) | 0;
    }
    let xStepAC = 0;
    if (y2 !== y0) {
      xStepAC = (x0 - x2 << 16) / (y0 - y2) | 0;
    }
    if (y0 <= y1 && y0 <= y2) {
      if (y0 < Pix2D.bottom) {
        if (y1 > Pix2D.bottom) {
          y1 = Pix2D.bottom;
        }
        if (y2 > Pix2D.bottom) {
          y2 = Pix2D.bottom;
        }
        if (y1 < y2) {
          x2 = x0 <<= 16;
          if (y0 < 0) {
            x2 -= xStepAC * y0;
            x0 -= xStepAB * y0;
            y0 = 0;
          }
          x1 <<= 16;
          if (y1 < 0) {
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          if (y0 !== y1 && xStepAC < xStepAB || y0 === y1 && xStepAC > xStepBC) {
            y2 -= y1;
            y1 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y1--;
              if (y1 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepAC;
                  x1 += xStepBC;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
              x2 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          } else {
            y2 -= y1;
            y1 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y1--;
              if (y1 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepAC;
                  x1 += xStepBC;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
              x2 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          }
        } else {
          x1 = x0 <<= 16;
          if (y0 < 0) {
            x1 -= xStepAC * y0;
            x0 -= xStepAB * y0;
            y0 = 0;
          }
          x2 <<= 16;
          if (y2 < 0) {
            x2 -= xStepBC * y2;
            y2 = 0;
          }
          if (y0 !== y2 && xStepAC < xStepAB || y0 === y2 && xStepBC > xStepAB) {
            y1 -= y2;
            y2 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y1--;
                  if (y1 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepBC;
                  x0 += xStepAB;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
              x1 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          } else {
            y1 -= y2;
            y2 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y1--;
                  if (y1 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepBC;
                  x0 += xStepAB;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y0, color);
              x1 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          }
        }
      }
    } else if (y1 <= y2) {
      if (y1 < Pix2D.bottom) {
        if (y2 > Pix2D.bottom) {
          y2 = Pix2D.bottom;
        }
        if (y0 > Pix2D.bottom) {
          y0 = Pix2D.bottom;
        }
        if (y2 < y0) {
          x0 = x1 <<= 16;
          if (y1 < 0) {
            x0 -= xStepAB * y1;
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          x2 <<= 16;
          if (y2 < 0) {
            x2 -= xStepAC * y2;
            y2 = 0;
          }
          if (y1 !== y2 && xStepAB < xStepBC || y1 === y2 && xStepAB > xStepAC) {
            y0 -= y2;
            y2 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y0--;
                  if (y0 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAB;
                  x2 += xStepAC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
              x0 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          } else {
            y0 -= y2;
            y2 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y0--;
                  if (y0 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAB;
                  x2 += xStepAC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
              x0 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          }
        } else {
          x2 = x1 <<= 16;
          if (y1 < 0) {
            x2 -= xStepAB * y1;
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          x0 <<= 16;
          if (y0 < 0) {
            x0 -= xStepAC * y0;
            y0 = 0;
          }
          if (xStepAB < xStepBC) {
            y2 -= y0;
            y0 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y0--;
              if (y0 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAC;
                  x1 += xStepBC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
              x2 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          } else {
            y2 -= y0;
            y0 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y0--;
              if (y0 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAC;
                  x1 += xStepBC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y1, color);
              x2 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          }
        }
      }
    } else if (y2 < Pix2D.bottom) {
      if (y0 > Pix2D.bottom) {
        y0 = Pix2D.bottom;
      }
      if (y1 > Pix2D.bottom) {
        y1 = Pix2D.bottom;
      }
      if (y0 < y1) {
        x1 = x2 <<= 16;
        if (y2 < 0) {
          x1 -= xStepBC * y2;
          x2 -= xStepAC * y2;
          y2 = 0;
        }
        x0 <<= 16;
        if (y0 < 0) {
          x0 -= xStepAB * y0;
          y0 = 0;
        }
        if (xStepBC < xStepAC) {
          y1 -= y0;
          y0 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepBC;
                x0 += xStepAB;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
            x1 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        } else {
          y1 -= y0;
          y0 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepBC;
                x0 += xStepAB;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
            x1 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        }
      } else {
        x0 = x2 <<= 16;
        if (y2 < 0) {
          x0 -= xStepBC * y2;
          x2 -= xStepAC * y2;
          y2 = 0;
        }
        x1 <<= 16;
        if (y1 < 0) {
          x1 -= xStepAB * y1;
          y1 = 0;
        }
        if (xStepBC < xStepAC) {
          y0 -= y1;
          y1 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepAB;
                x2 += xStepAC;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
            x0 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        } else {
          y0 -= y1;
          y1 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepAB;
                x2 += xStepAC;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y2, color);
            x0 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        }
      }
    }
  }
  static fillTexturedTriangle(xA, xB, xC, yA, yB, yC, shadeA, shadeB, shadeC, originX, originY, originZ, txB, txC, tyB, tyC, tzB, tzC, texture) {
    const texels = this.getTexels(texture);
    this.opaque = !this.textureTranslucent[texture];
    const verticalX = originX - txB;
    const verticalY = originY - tyB;
    const verticalZ = originZ - tzB;
    const horizontalX = txC - originX;
    const horizontalY = tyC - originY;
    const horizontalZ = tzC - originZ;
    let u = horizontalX * originY - horizontalY * originX << 14;
    const uStride = horizontalY * originZ - horizontalZ * originY << 8;
    const uStepVertical = horizontalZ * originX - horizontalX * originZ << 5;
    let v = verticalX * originY - verticalY * originX << 14;
    const vStride = verticalY * originZ - verticalZ * originY << 8;
    const vStepVertical = verticalZ * originX - verticalX * originZ << 5;
    let w = verticalY * horizontalX - verticalX * horizontalY << 14;
    const wStride = verticalZ * horizontalY - verticalY * horizontalZ << 8;
    const wStepVertical = verticalX * horizontalZ - verticalZ * horizontalX << 5;
    let xStepAB = 0;
    let shadeStepAB = 0;
    if (yB !== yA) {
      xStepAB = (xB - xA << 16) / (yB - yA) | 0;
      shadeStepAB = (shadeB - shadeA << 16) / (yB - yA) | 0;
    }
    let xStepBC = 0;
    let shadeStepBC = 0;
    if (yC !== yB) {
      xStepBC = (xC - xB << 16) / (yC - yB) | 0;
      shadeStepBC = (shadeC - shadeB << 16) / (yC - yB) | 0;
    }
    let xStepAC = 0;
    let shadeStepAC = 0;
    if (yC !== yA) {
      xStepAC = (xA - xC << 16) / (yA - yC) | 0;
      shadeStepAC = (shadeA - shadeC << 16) / (yA - yC) | 0;
    }
    if (yA <= yB && yA <= yC) {
      if (yA < Pix2D.bottom) {
        if (yB > Pix2D.bottom) {
          yB = Pix2D.bottom;
        }
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yB < yC) {
          xC = xA <<= 16;
          shadeC = shadeA <<= 16;
          if (yA < 0) {
            xC -= xStepAC * yA;
            xA -= xStepAB * yA;
            shadeC -= shadeStepAC * yA;
            shadeA -= shadeStepAB * yA;
            yA = 0;
          }
          xB <<= 16;
          shadeB <<= 16;
          if (yB < 0) {
            xB -= xStepBC * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          const dy = yA - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if (yA !== yB && xStepAC < xStepAB || yA === yB && xStepAC > xStepBC) {
            yC -= yB;
            yB -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
                  xC += xStepAC;
                  xB += xStepBC;
                  shadeC += shadeStepAC;
                  shadeB += shadeStepBC;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
              xC += xStepAC;
              xA += xStepAB;
              shadeC += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yC -= yB;
            yB -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
                  xC += xStepAC;
                  xB += xStepBC;
                  shadeC += shadeStepAC;
                  shadeB += shadeStepBC;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
              xC += xStepAC;
              xA += xStepAB;
              shadeC += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        } else {
          xB = xA <<= 16;
          shadeB = shadeA <<= 16;
          if (yA < 0) {
            xB -= xStepAC * yA;
            xA -= xStepAB * yA;
            shadeB -= shadeStepAC * yA;
            shadeA -= shadeStepAB * yA;
            yA = 0;
          }
          xC <<= 16;
          shadeC <<= 16;
          if (yC < 0) {
            xC -= xStepBC * yC;
            shadeC -= shadeStepBC * yC;
            yC = 0;
          }
          const dy = yA - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if ((yA === yC || xStepAC >= xStepAB) && (yA !== yC || xStepBC <= xStepAB)) {
            yB -= yC;
            yC -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                  xC += xStepBC;
                  xA += xStepAB;
                  shadeC += shadeStepBC;
                  shadeA += shadeStepAB;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
              xB += xStepAC;
              xA += xStepAB;
              shadeB += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yB -= yC;
            yC -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                  xC += xStepBC;
                  xA += xStepAB;
                  shadeC += shadeStepBC;
                  shadeA += shadeStepAB;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
              xB += xStepAC;
              xA += xStepAB;
              shadeB += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        }
      }
    } else if (yB <= yC) {
      if (yB < Pix2D.bottom) {
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yA > Pix2D.bottom) {
          yA = Pix2D.bottom;
        }
        if (yC < yA) {
          xA = xB <<= 16;
          shadeA = shadeB <<= 16;
          if (yB < 0) {
            xA -= xStepAB * yB;
            xB -= xStepBC * yB;
            shadeA -= shadeStepAB * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          xC <<= 16;
          shadeC <<= 16;
          if (yC < 0) {
            xC -= xStepAC * yC;
            shadeC -= shadeStepAC * yC;
            yC = 0;
          }
          const dy = yB - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if (yB !== yC && xStepAB < xStepBC || yB === yC && xStepAB > xStepAC) {
            yA -= yC;
            yC -= yB;
            yB = this.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                  xA += xStepAB;
                  xC += xStepAC;
                  shadeA += shadeStepAB;
                  shadeC += shadeStepAC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
              xA += xStepAB;
              xB += xStepBC;
              shadeA += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yA -= yC;
            yC -= yB;
            yB = this.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                  xA += xStepAB;
                  xC += xStepAC;
                  shadeA += shadeStepAB;
                  shadeC += shadeStepAC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
              xA += xStepAB;
              xB += xStepBC;
              shadeA += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        } else {
          xC = xB <<= 16;
          shadeC = shadeB <<= 16;
          if (yB < 0) {
            xC -= xStepAB * yB;
            xB -= xStepBC * yB;
            shadeC -= shadeStepAB * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          xA <<= 16;
          shadeA <<= 16;
          if (yA < 0) {
            xA -= xStepAC * yA;
            shadeA -= shadeStepAC * yA;
            yA = 0;
          }
          const dy = yB - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          yC -= yA;
          yA -= yB;
          yB = this.lineOffset[yB];
          if (xStepAB < xStepBC) {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
                  xA += xStepAC;
                  xB += xStepBC;
                  shadeA += shadeStepAC;
                  shadeB += shadeStepBC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
              xC += xStepAB;
              xB += xStepBC;
              shadeC += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
                  xA += xStepAC;
                  xB += xStepBC;
                  shadeA += shadeStepAC;
                  shadeB += shadeStepBC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
              xC += xStepAB;
              xB += xStepBC;
              shadeC += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        }
      }
    } else if (yC < Pix2D.bottom) {
      if (yA > Pix2D.bottom) {
        yA = Pix2D.bottom;
      }
      if (yB > Pix2D.bottom) {
        yB = Pix2D.bottom;
      }
      if (yA < yB) {
        xB = xC <<= 16;
        shadeB = shadeC <<= 16;
        if (yC < 0) {
          xB -= xStepBC * yC;
          xC -= xStepAC * yC;
          shadeB -= shadeStepBC * yC;
          shadeC -= shadeStepAC * yC;
          yC = 0;
        }
        xA <<= 16;
        shadeA <<= 16;
        if (yA < 0) {
          xA -= xStepAB * yA;
          shadeA -= shadeStepAB * yA;
          yA = 0;
        }
        const dy = yC - this.centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        u |= 0;
        v |= 0;
        w |= 0;
        yB -= yA;
        yA -= yC;
        yC = this.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
                xB += xStepBC;
                xA += xStepAB;
                shadeB += shadeStepBC;
                shadeA += shadeStepAB;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
            xB += xStepBC;
            xC += xStepAC;
            shadeB += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
                xB += xStepBC;
                xA += xStepAB;
                shadeB += shadeStepBC;
                shadeA += shadeStepAB;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
            xB += xStepBC;
            xC += xStepAC;
            shadeB += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        }
      } else {
        xA = xC <<= 16;
        shadeA = shadeC <<= 16;
        if (yC < 0) {
          xA -= xStepBC * yC;
          xC -= xStepAC * yC;
          shadeA -= shadeStepBC * yC;
          shadeC -= shadeStepAC * yC;
          yC = 0;
        }
        xB <<= 16;
        shadeB <<= 16;
        if (yB < 0) {
          xB -= xStepAB * yB;
          shadeB -= shadeStepAB * yB;
          yB = 0;
        }
        const dy = yC - this.centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        u |= 0;
        v |= 0;
        w |= 0;
        yA -= yB;
        yB -= yC;
        yC = this.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
                xB += xStepAB;
                xC += xStepAC;
                shadeB += shadeStepAB;
                shadeC += shadeStepAC;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
            xA += xStepBC;
            xC += xStepAC;
            shadeA += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        } else {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
                xB += xStepAB;
                xC += xStepAC;
                shadeB += shadeStepAB;
                shadeC += shadeStepAC;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
            xA += xStepBC;
            xC += xStepAC;
            shadeA += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        }
      }
    }
  }
  static drawTexturedScanline(xA, xB, dst, offset, texels, curU, curV, u, v, w, uStride, vStride, wStride, shadeA, shadeB) {
    if (xA >= xB) {
      return;
    }
    let shadeStrides;
    let strides;
    if (this.clipX) {
      shadeStrides = (shadeB - shadeA) / (xB - xA) | 0;
      if (xB > Pix2D.boundX) {
        xB = Pix2D.boundX;
      }
      if (xA < 0) {
        shadeA -= xA * shadeStrides;
        xA = 0;
      }
      if (xA >= xB) {
        return;
      }
      strides = xB - xA >> 3;
      shadeStrides <<= 12;
    } else {
      if (xB - xA > 7) {
        strides = xB - xA >> 3;
        shadeStrides = (shadeB - shadeA) * this.reciprocal15[strides] >> 6;
      } else {
        strides = 0;
        shadeStrides = 0;
      }
    }
    shadeA <<= 9;
    offset += xA;
    let nextU;
    let nextV;
    let curW;
    let dx;
    let stepU;
    let stepV;
    let shadeShift;
    if (this.lowMemory && texels) {
      nextU = 0;
      nextV = 0;
      dx = xA - this.centerX;
      u = u + (uStride >> 3) * dx;
      v = v + (vStride >> 3) * dx;
      w = w + (wStride >> 3) * dx;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 12;
      if (curW !== 0) {
        curU = u / curW | 0;
        curV = v / curW | 0;
        if (curU < 0) {
          curU = 0;
        } else if (curU > 4032) {
          curU = 4032;
        }
      }
      u = u + uStride;
      v = v + vStride;
      w = w + wStride;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 12;
      if (curW !== 0) {
        nextU = u / curW | 0;
        nextV = v / curW | 0;
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 4032) {
          nextU = 4032;
        }
      }
      stepU = nextU - curU >> 3;
      stepV = nextV - curV >> 3;
      curU += shadeA >> 3 & 786432;
      shadeShift = shadeA >> 23;
      if (this.opaque) {
        while (strides-- > 0) {
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU = nextU;
          curV = nextV;
          u += uStride;
          v += vStride;
          w += wStride;
          curW = w >> 12;
          if (curW !== 0) {
            nextU = u / curW | 0;
            nextV = v / curW | 0;
            if (nextU < 7) {
              nextU = 7;
            } else if (nextU > 4032) {
              nextU = 4032;
            }
          }
          stepU = nextU - curU >> 3;
          stepV = nextV - curV >> 3;
          shadeA += shadeStrides;
          curU += shadeA >> 3 & 786432;
          shadeShift = shadeA >> 23;
        }
        strides = xB - xA & 7;
        while (strides-- > 0) {
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
        }
      } else {
        while (strides-- > 0) {
          let rgb;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset = offset + 1;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset = offset + 1;
          curU = nextU;
          curV = nextV;
          u += uStride;
          v += vStride;
          w += wStride;
          u |= 0;
          v |= 0;
          w |= 0;
          curW = w >> 12;
          if (curW !== 0) {
            nextU = u / curW | 0;
            nextV = v / curW | 0;
            if (nextU < 7) {
              nextU = 7;
            } else if (nextU > 4032) {
              nextU = 4032;
            }
          }
          stepU = nextU - curU >> 3;
          stepV = nextV - curV >> 3;
          shadeA += shadeStrides;
          curU += shadeA >> 3 & 786432;
          shadeShift = shadeA >> 23;
        }
        strides = xB - xA & 7;
        while (strides-- > 0) {
          let rgb;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
        }
      }
      return;
    }
    nextU = 0;
    nextV = 0;
    dx = xA - this.centerX;
    u = u + (uStride >> 3) * dx;
    v = v + (vStride >> 3) * dx;
    w = w + (wStride >> 3) * dx;
    u |= 0;
    v |= 0;
    w |= 0;
    curW = w >> 14;
    if (curW !== 0) {
      curU = u / curW | 0;
      curV = v / curW | 0;
      if (curU < 0) {
        curU = 0;
      } else if (curU > 16256) {
        curU = 16256;
      }
    }
    u = u + uStride;
    v = v + vStride;
    w = w + wStride;
    u |= 0;
    v |= 0;
    w |= 0;
    curW = w >> 14;
    if (curW !== 0) {
      nextU = u / curW | 0;
      nextV = v / curW | 0;
      if (nextU < 7) {
        nextU = 7;
      } else if (nextU > 16256) {
        nextU = 16256;
      }
    }
    stepU = nextU - curU >> 3;
    stepV = nextV - curV >> 3;
    curU += shadeA & 6291456;
    shadeShift = shadeA >> 23;
    if (this.opaque && texels) {
      while (strides-- > 0) {
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU = nextU;
        curV = nextV;
        u += uStride;
        v += vStride;
        w += wStride;
        u |= 0;
        v |= 0;
        w |= 0;
        curW = w >> 14;
        if (curW !== 0) {
          nextU = u / curW | 0;
          nextV = v / curW | 0;
          if (nextU < 7) {
            nextU = 7;
          } else if (nextU > 16256) {
            nextU = 16256;
          }
        }
        stepU = nextU - curU >> 3;
        stepV = nextV - curV >> 3;
        shadeA += shadeStrides;
        curU += shadeA & 6291456;
        shadeShift = shadeA >> 23;
      }
      strides = xB - xA & 7;
      while (strides-- > 0) {
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
      }
      return;
    }
    while (strides-- > 0 && texels) {
      let rgb;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset = offset + 1;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU = nextU;
      curV = nextV;
      u += uStride;
      v += vStride;
      w += wStride;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 14;
      if (curW !== 0) {
        nextU = u / curW | 0;
        nextV = v / curW | 0;
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 16256) {
          nextU = 16256;
        }
      }
      stepU = nextU - curU >> 3;
      stepV = nextV - curV >> 3;
      shadeA += shadeStrides;
      curU += shadeA & 6291456;
      shadeShift = shadeA >> 23;
    }
    strides = xB - xA & 7;
    while (strides-- > 0 && texels) {
      let rgb;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
    }
  }
  static drawScanline(x0, x1, dst, offset, rgb) {
    if (this.clipX) {
      if (x1 > Pix2D.boundX) {
        x1 = Pix2D.boundX;
      }
      if (x0 < 0) {
        x0 = 0;
      }
    }
    if (x0 >= x1) {
      return;
    }
    offset += x0;
    let length = x1 - x0 >> 2;
    if (this.alpha === 0) {
      while (true) {
        length--;
        if (length < 0) {
          length = x1 - x0 & 3;
          while (true) {
            length--;
            if (length < 0) {
              return;
            }
            dst[offset++] = rgb;
          }
        }
        dst[offset++] = rgb;
        dst[offset++] = rgb;
        dst[offset++] = rgb;
        dst[offset++] = rgb;
      }
    }
    const alpha = this.alpha;
    const invAlpha = 256 - this.alpha;
    rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
    while (true) {
      length--;
      if (length < 0) {
        length = x1 - x0 & 3;
        while (true) {
          length--;
          if (length < 0) {
            return;
          }
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
        }
      }
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
    }
  }
  static pushTexture(id) {
    if (this.activeTexels[id] && this.texelPool) {
      this.texelPool[this.poolSize++] = this.activeTexels[id];
      this.activeTexels[id] = null;
    }
  }
  static getTexels(id) {
    this.textureCycle[id] = this.cycle++;
    if (this.activeTexels[id]) {
      return this.activeTexels[id];
    }
    let texels;
    if (this.poolSize > 0 && this.texelPool) {
      texels = this.texelPool[--this.poolSize];
      this.texelPool[this.poolSize] = null;
    } else {
      let cycle = 0;
      let selected = -1;
      for (let t = 0;t < this.textureCount; t++) {
        if (this.activeTexels[t] && (this.textureCycle[t] < cycle || selected === -1)) {
          cycle = this.textureCycle[t];
          selected = t;
        }
      }
      texels = this.activeTexels[selected];
      this.activeTexels[selected] = null;
    }
    this.activeTexels[id] = texels;
    const texture = this.textures[id];
    const palette = this.texPal[id];
    if (!texels || !texture || !palette) {
      return null;
    }
    if (this.lowMemory) {
      this.textureTranslucent[id] = false;
      for (let i = 0;i < 4096; i++) {
        const rgb = texels[i] = palette[texture.pixels[i]] & 16316671;
        if (rgb === 0) {
          this.textureTranslucent[id] = true;
        }
        texels[i + 4096] = rgb - (rgb >>> 3) & 16316671;
        texels[i + 8192] = rgb - (rgb >>> 2) & 16316671;
        texels[i + 12288] = rgb - (rgb >>> 2) - (rgb >>> 3) & 16316671;
      }
    } else {
      if (texture.width2d === 64) {
        for (let y = 0;y < 128; y++) {
          for (let x = 0;x < 128; x++) {
            texels[x + (y << 7 | 0)] = palette[texture.pixels[(x >> 1) + (y >> 1 << 6 | 0)]];
          }
        }
      } else {
        for (let i = 0;i < 16384; i++) {
          texels[i] = palette[texture.pixels[i]];
        }
      }
      this.textureTranslucent[id] = false;
      for (let i = 0;i < 16384; i++) {
        texels[i] &= 16316671;
        const rgb = texels[i];
        if (rgb === 0) {
          this.textureTranslucent[id] = true;
        }
        texels[i + 16384] = rgb - (rgb >>> 3) & 16316671;
        texels[i + 32768] = rgb - (rgb >>> 2) & 16316671;
        texels[i + 49152] = rgb - (rgb >>> 2) - (rgb >>> 3) & 16316671;
      }
    }
    return texels;
  }
}

// src/graphics/PixMap.ts
class PixMap {
  image;
  width2d;
  height2d;
  ctx;
  paint;
  pixels;
  constructor(width, height, ctx = canvas2d) {
    this.ctx = ctx;
    this.image = this.ctx.getImageData(0, 0, width, height);
    this.paint = new Uint32Array(this.image.data.buffer);
    this.pixels = new Int32Array(width * height);
    this.width2d = width;
    this.height2d = height;
    this.bind();
  }
  clear() {
    this.pixels.fill(0);
  }
  bind() {
    Pix2D.bind(this.pixels, this.width2d, this.height2d);
  }
  draw(x, y) {
    this.#setPixels();
    this.ctx.putImageData(this.image, x, y);
  }
  #setPixels() {
    const length = this.pixels.length;
    const pixels = this.pixels;
    const paint = this.paint;
    for (let i = 0;i < length; i++) {
      const pixel = pixels[i];
      paint[i] = pixel >> 16 & 255 | (pixel >> 8 & 255) << 8 | (pixel & 255) << 16 | 4278190080;
    }
  }
}

// src/client/KeyCodes.ts
var CanvasEnabledKeys = ["F11", "F12"];
var KeyCodes = new Map;
KeyCodes.set("ArrowLeft", { code: 37, ch: 1 });
KeyCodes.set("ArrowRight", { code: 39, ch: 2 });
KeyCodes.set("ArrowUp", { code: 38, ch: 3 });
KeyCodes.set("ArrowDown", { code: 40, ch: 4 });
KeyCodes.set("Control", { code: 17, ch: 5 });
KeyCodes.set("Shift", { code: 16, ch: 6 });
KeyCodes.set("Alt", { code: 18, ch: 7 });
KeyCodes.set("Backspace", { code: 8, ch: 8 });
KeyCodes.set("Tab", { code: 9, ch: 9 });
KeyCodes.set("Enter", { code: 10, ch: 10 });
KeyCodes.set("Escape", { code: 27, ch: 27 });
KeyCodes.set(" ", { code: 32, ch: 32 });
KeyCodes.set("Delete", { code: 127, ch: 127 });
KeyCodes.set("Home", { code: 36, ch: 1000 });
KeyCodes.set("End", { code: 35, ch: 1001 });
KeyCodes.set("PageUp", { code: 33, ch: 1002 });
KeyCodes.set("PageDown", { code: 34, ch: 1003 });
KeyCodes.set("F1", { code: 112, ch: 1008 });
KeyCodes.set("F2", { code: 113, ch: 1009 });
KeyCodes.set("F3", { code: 114, ch: 1010 });
KeyCodes.set("F4", { code: 115, ch: 1011 });
KeyCodes.set("F5", { code: 116, ch: 1012 });
KeyCodes.set("F6", { code: 117, ch: 1013 });
KeyCodes.set("F7", { code: 118, ch: 1014 });
KeyCodes.set("F8", { code: 119, ch: 1015 });
KeyCodes.set("F9", { code: 120, ch: 1016 });
KeyCodes.set("F10", { code: 121, ch: 1017 });
KeyCodes.set("F11", { code: 122, ch: 1018 });
KeyCodes.set("F12", { code: 123, ch: 1019 });
KeyCodes.set("CapsLock", { code: 20, ch: 65535 });
KeyCodes.set("Meta", { code: 524, ch: 65535 });
KeyCodes.set("Insert", { code: 155, ch: 65535 });
KeyCodes.set("`", { code: 192, ch: 96 });
KeyCodes.set("~", { code: 192, ch: 126 });
KeyCodes.set("!", { code: 49, ch: 33 });
KeyCodes.set("@", { code: 50, ch: 64 });
KeyCodes.set("#", { code: 51, ch: 35 });
KeyCodes.set("£", { code: 51, ch: 163 });
KeyCodes.set("$", { code: 52, ch: 36 });
KeyCodes.set("%", { code: 53, ch: 37 });
KeyCodes.set("^", { code: 54, ch: 94 });
KeyCodes.set("&", { code: 55, ch: 38 });
KeyCodes.set("*", { code: 56, ch: 42 });
KeyCodes.set("(", { code: 57, ch: 40 });
KeyCodes.set(")", { code: 48, ch: 41 });
KeyCodes.set("-", { code: 45, ch: 45 });
KeyCodes.set("_", { code: 45, ch: 95 });
KeyCodes.set("=", { code: 61, ch: 61 });
KeyCodes.set("+", { code: 61, ch: 43 });
KeyCodes.set("[", { code: 91, ch: 91 });
KeyCodes.set("{", { code: 91, ch: 123 });
KeyCodes.set("]", { code: 93, ch: 93 });
KeyCodes.set("}", { code: 93, ch: 125 });
KeyCodes.set("\\", { code: 92, ch: 92 });
KeyCodes.set("|", { code: 92, ch: 124 });
KeyCodes.set(";", { code: 59, ch: 59 });
KeyCodes.set(":", { code: 59, ch: 58 });
KeyCodes.set("'", { code: 222, ch: 39 });
KeyCodes.set('"', { code: 222, ch: 34 });
KeyCodes.set(",", { code: 44, ch: 44 });
KeyCodes.set("<", { code: 44, ch: 60 });
KeyCodes.set(".", { code: 46, ch: 46 });
KeyCodes.set(">", { code: 46, ch: 62 });
KeyCodes.set("/", { code: 47, ch: 47 });
KeyCodes.set("?", { code: 47, ch: 63 });
KeyCodes.set("0", { code: 48, ch: 48 });
KeyCodes.set("1", { code: 49, ch: 49 });
KeyCodes.set("2", { code: 50, ch: 50 });
KeyCodes.set("3", { code: 51, ch: 51 });
KeyCodes.set("4", { code: 52, ch: 52 });
KeyCodes.set("5", { code: 53, ch: 53 });
KeyCodes.set("6", { code: 54, ch: 54 });
KeyCodes.set("7", { code: 55, ch: 55 });
KeyCodes.set("8", { code: 56, ch: 56 });
KeyCodes.set("9", { code: 57, ch: 57 });
KeyCodes.set("a", { code: 65, ch: 97 });
KeyCodes.set("b", { code: 66, ch: 98 });
KeyCodes.set("c", { code: 67, ch: 99 });
KeyCodes.set("d", { code: 68, ch: 100 });
KeyCodes.set("e", { code: 69, ch: 101 });
KeyCodes.set("f", { code: 70, ch: 102 });
KeyCodes.set("g", { code: 71, ch: 103 });
KeyCodes.set("h", { code: 72, ch: 104 });
KeyCodes.set("i", { code: 73, ch: 105 });
KeyCodes.set("j", { code: 74, ch: 106 });
KeyCodes.set("k", { code: 75, ch: 107 });
KeyCodes.set("l", { code: 76, ch: 108 });
KeyCodes.set("m", { code: 77, ch: 109 });
KeyCodes.set("n", { code: 78, ch: 110 });
KeyCodes.set("o", { code: 79, ch: 111 });
KeyCodes.set("p", { code: 80, ch: 112 });
KeyCodes.set("q", { code: 81, ch: 113 });
KeyCodes.set("r", { code: 82, ch: 114 });
KeyCodes.set("s", { code: 83, ch: 115 });
KeyCodes.set("t", { code: 84, ch: 116 });
KeyCodes.set("u", { code: 85, ch: 117 });
KeyCodes.set("v", { code: 86, ch: 118 });
KeyCodes.set("w", { code: 87, ch: 119 });
KeyCodes.set("x", { code: 88, ch: 120 });
KeyCodes.set("y", { code: 89, ch: 121 });
KeyCodes.set("z", { code: 90, ch: 122 });
KeyCodes.set("A", { code: 65, ch: 65 });
KeyCodes.set("B", { code: 66, ch: 66 });
KeyCodes.set("C", { code: 67, ch: 67 });
KeyCodes.set("D", { code: 68, ch: 68 });
KeyCodes.set("E", { code: 69, ch: 69 });
KeyCodes.set("F", { code: 70, ch: 70 });
KeyCodes.set("G", { code: 71, ch: 71 });
KeyCodes.set("H", { code: 72, ch: 72 });
KeyCodes.set("I", { code: 73, ch: 73 });
KeyCodes.set("J", { code: 74, ch: 74 });
KeyCodes.set("K", { code: 75, ch: 75 });
KeyCodes.set("L", { code: 76, ch: 76 });
KeyCodes.set("M", { code: 77, ch: 77 });
KeyCodes.set("N", { code: 78, ch: 78 });
KeyCodes.set("O", { code: 79, ch: 79 });
KeyCodes.set("P", { code: 80, ch: 80 });
KeyCodes.set("Q", { code: 81, ch: 81 });
KeyCodes.set("R", { code: 82, ch: 82 });
KeyCodes.set("S", { code: 83, ch: 83 });
KeyCodes.set("T", { code: 84, ch: 84 });
KeyCodes.set("U", { code: 85, ch: 85 });
KeyCodes.set("V", { code: 86, ch: 86 });
KeyCodes.set("W", { code: 87, ch: 87 });
KeyCodes.set("X", { code: 88, ch: 88 });
KeyCodes.set("Y", { code: 89, ch: 89 });
KeyCodes.set("Z", { code: 90, ch: 90 });

// src/client/InputTracking.ts
class InputTracking {
  static trackingActive = false;
  static outBuffer = null;
  static oldBuffer = null;
  static lastTime = 0;
  static trackedCount = 0;
  static lastMoveTime = 0;
  static lastX = 0;
  static lastY = 0;
  static setEnabled() {
    this.outBuffer = Packet.alloc(1);
    this.oldBuffer = null;
    this.lastTime = performance.now();
    this.trackingActive = true;
  }
  static setDisabled() {
    this.trackingActive = false;
    this.outBuffer = null;
  }
  static flush() {
    let buffer = null;
    if (this.oldBuffer && this.trackingActive) {
      buffer = this.oldBuffer;
    }
    this.oldBuffer = null;
    return buffer;
  }
  static stop() {
    let buffer = null;
    if (this.outBuffer && this.outBuffer.pos > 0 && this.trackingActive) {
      buffer = this.outBuffer;
    }
    this.setDisabled();
    return buffer;
  }
  static mousePressed(x, y, button) {
    if (!(this.trackingActive && x >= 0 && x < 789 && y >= 0 && y < 532)) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(5);
    if (button === 2) {
      this.outBuffer?.p1(1);
    } else {
      this.outBuffer?.p1(2);
    }
    this.outBuffer?.p1(delta);
    this.outBuffer?.p3(x + (y << 10));
  }
  static mouseReleased(button) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    if (button === 2) {
      this.outBuffer?.p1(3);
    } else {
      this.outBuffer?.p1(4);
    }
    this.outBuffer?.p1(delta);
  }
  static mouseMoved(x, y) {
    if (!(this.trackingActive && x >= 0 && x < 789 && y >= 0 && y < 532)) {
      return;
    }
    const now = performance.now();
    if (now - this.lastMoveTime >= 50) {
      this.lastMoveTime = now;
      this.trackedCount++;
      let delta = (now - this.lastTime) / 10 | 0;
      if (delta > 250) {
        delta = 250;
      }
      this.lastTime = now;
      if (x - this.lastX < 8 && x - this.lastX >= -8 && y - this.lastY < 8 && y - this.lastY >= -8) {
        this.ensureCapacity(3);
        this.outBuffer?.p1(5);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p1(x + (y - this.lastY + 8 << 4) + 8 - this.lastX);
      } else if (x - this.lastX < 128 && x - this.lastX >= -128 && y - this.lastY < 128 && y - this.lastY >= -128) {
        this.ensureCapacity(4);
        this.outBuffer?.p1(6);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p1(x + 128 - this.lastX);
        this.outBuffer?.p1(y + 128 - this.lastY);
      } else {
        this.ensureCapacity(5);
        this.outBuffer?.p1(7);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p3(x + (y << 10));
      }
      this.lastX = x;
      this.lastY = y;
    }
  }
  static keyPressed(key) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    if (key === 1000) {
      key = 11;
    } else if (key === 1001) {
      key = 12;
    } else if (key === 1002) {
      key = 14;
    } else if (key === 1003) {
      key = 15;
    } else if (key >= 1008) {
      key -= 992;
    }
    this.ensureCapacity(3);
    this.outBuffer?.p1(8);
    this.outBuffer?.p1(delta);
    this.outBuffer?.p1(key);
  }
  static keyReleased(key) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    if (key === 1000) {
      key = 11;
    } else if (key === 1001) {
      key = 12;
    } else if (key === 1002) {
      key = 14;
    } else if (key === 1003) {
      key = 15;
    } else if (key >= 1008) {
      key -= 992;
    }
    this.ensureCapacity(3);
    this.outBuffer?.p1(9);
    this.outBuffer?.p1(delta);
    this.outBuffer?.p1(key);
  }
  static focusGained() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(10);
    this.outBuffer?.p1(delta);
  }
  static focusLost() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(11);
    this.outBuffer?.p1(delta);
  }
  static mouseEntered() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(12);
    this.outBuffer?.p1(delta);
  }
  static mouseExited() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(13);
    this.outBuffer?.p1(delta);
  }
  static ensureCapacity(n) {
    if (!this.outBuffer) {
      return;
    }
    if (this.outBuffer.pos + n >= 500) {
      const buffer = this.outBuffer;
      this.outBuffer = Packet.alloc(1);
      this.oldBuffer = buffer;
    }
  }
}

// src/client/GameShell.ts
import { MobileKeyboard } from "./deps.js";

class GameShell {
  slowestMS = 0;
  averageMS = [];
  averageIndexMS = 0;
  drawArea = null;
  state = 0;
  deltime = 20;
  mindel = 1;
  otim = [];
  fps = 0;
  fpos = 0;
  frameTime = [];
  redrawScreen = true;
  resizeToFit = false;
  tfps = 50;
  hasFocus = true;
  ingame = false;
  idleCycles = performance.now();
  mouseButton = 0;
  mouseX = -1;
  mouseY = -1;
  mouseClickButton = 0;
  mouseClickX = -1;
  mouseClickY = -1;
  actionKey = [];
  keyQueue = [];
  keyQueueReadPos = 0;
  keyQueueWritePos = 0;
  touching = false;
  startedInViewport = false;
  startedInTabArea = false;
  time = -1;
  sx = 0;
  sy = 0;
  mx = 0;
  my = 0;
  nx = 0;
  ny = 0;
  async load() {
  }
  async update() {
  }
  async draw() {
  }
  async refresh() {
  }
  constructor(resizetoFit = false) {
    canvas.tabIndex = -1;
    canvas2d.fillStyle = "black";
    canvas2d.fillRect(0, 0, canvas.width, canvas.height);
    this.resizeToFit = resizetoFit;
    if (this.resizeToFit) {
      this.resize(window.innerWidth, window.innerHeight);
    } else {
      this.resize(canvas.width, canvas.height);
    }
  }
  get width() {
    return canvas.width;
  }
  get height() {
    return canvas.height;
  }
  resize(width, height) {
    canvas.width = width;
    canvas.height = height;
    this.drawArea = new PixMap(width, height);
    Pix3D.init2D();
  }
  async run() {
    canvas.addEventListener("resize", () => {
      if (this.resizeToFit) {
        this.resize(window.innerWidth, window.innerHeight);
      }
    }, false);
    canvas.onfocus = this.onfocus.bind(this);
    canvas.onblur = this.onblur.bind(this);
    canvas.onmousedown = this.onmousedown.bind(this);
    canvas.onmouseup = this.onmouseup.bind(this);
    canvas.onmouseenter = this.onmouseenter.bind(this);
    canvas.onmouseleave = this.onmouseleave.bind(this);
    canvas.onmousemove = this.onmousemove.bind(this);
    canvas.onkeydown = this.onkeydown.bind(this);
    canvas.onkeyup = this.onkeyup.bind(this);
    if (this.isMobile) {
      canvas.ontouchstart = this.ontouchstart.bind(this);
      canvas.ontouchend = this.ontouchend.bind(this);
      canvas.ontouchmove = this.ontouchmove.bind(this);
    }
    canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };
    await this.showProgress(0, "Loading...");
    await this.load();
    for (let i = 0;i < 10; i++) {
      this.otim[i] = performance.now();
    }
    let ntime;
    let opos = 0;
    let ratio = 256;
    let delta = 1;
    let count = 0;
    while (this.state >= 0) {
      if (this.state > 0) {
        this.state--;
        if (this.state === 0) {
          this.shutdown();
          return;
        }
      }
      const lastRatio = ratio;
      const lastDelta = delta;
      ratio = 300;
      delta = 1;
      ntime = performance.now();
      const otim = this.otim[opos];
      if (otim === 0) {
        ratio = lastRatio;
        delta = lastDelta;
      } else if (ntime > otim) {
        ratio = this.deltime * 2560 / (ntime - otim) | 0;
      }
      if (ratio < 25) {
        ratio = 25;
      } else if (ratio > 256) {
        ratio = 256;
        delta = this.deltime - (ntime - otim) / 10 | 0;
      }
      this.otim[opos] = ntime;
      opos = (opos + 1) % 10;
      if (delta > 1) {
        for (let i = 0;i < 10; i++) {
          if (this.otim[i] !== 0) {
            this.otim[i] += delta;
          }
        }
      }
      if (delta < this.mindel) {
        delta = this.mindel;
      }
      await sleep(delta);
      while (count < 256) {
        await this.update();
        this.mouseClickButton = 0;
        this.keyQueueReadPos = this.keyQueueWritePos;
        count += ratio;
      }
      count &= 255;
      if (this.deltime > 0) {
        this.fps = ratio * 1000 / (this.deltime * 256) | 0;
      }
      const time = performance.now();
      await this.draw();
      if (this.isMobile) {
        MobileKeyboard.draw();
      }
      this.frameTime[this.fpos] = (performance.now() - time) / 1000;
      this.fpos = (this.fpos + 1) % this.frameTime.length;
      if (this.tfps < 50) {
        const tfps = 1000 / this.tfps - (performance.now() - ntime);
        if (tfps > 0) {
          await sleep(tfps);
        }
      }
    }
    if (this.state === -1) {
      this.shutdown();
    }
  }
  shutdown() {
    this.state = -2;
  }
  setFramerate(rate) {
    this.deltime = 1000 / rate | 0;
  }
  setTargetedFramerate(rate) {
    this.tfps = Math.max(Math.min(50, rate | 0), 0);
  }
  start() {
    if (this.state >= 0) {
      this.state = 0;
    }
  }
  stop() {
    if (this.state >= 0) {
      this.state = 4000 / this.deltime | 0;
    }
  }
  destroy() {
    this.state = -1;
  }
  async showProgress(progress, message) {
    const width = this.width;
    const height = this.height;
    if (this.redrawScreen) {
      canvas2d.fillStyle = "black";
      canvas2d.fillRect(0, 0, width, height);
      this.redrawScreen = false;
    }
    const y = height / 2 - 18;
    canvas2d.fillStyle = "rgb(140, 17, 17)";
    canvas2d.rect((width / 2 | 0) - 152, y, 304, 34);
    canvas2d.fillRect((width / 2 | 0) - 150, y + 2, progress * 3, 30);
    canvas2d.fillStyle = "black";
    canvas2d.fillRect((width / 2 | 0) - 150 + progress * 3, y + 2, 300 - progress * 3, 30);
    canvas2d.font = "bold 13px helvetica, sans-serif";
    canvas2d.textAlign = "center";
    canvas2d.fillStyle = "white";
    canvas2d.fillText(message, width / 2 | 0, y + 22);
    await sleep(5);
  }
  pollKey() {
    let key = -1;
    if (this.keyQueueWritePos !== this.keyQueueReadPos) {
      key = this.keyQueue[this.keyQueueReadPos];
      this.keyQueueReadPos = this.keyQueueReadPos + 1 & 127;
    }
    return key;
  }
  get ms() {
    const length = this.frameTime.length;
    let ft = 0;
    for (let index = 0;index < length; index++) {
      ft += this.frameTime[index];
    }
    const ms = ft / length * 1000;
    if (ms > this.slowestMS) {
      this.slowestMS = ms;
    }
    this.averageMS[this.averageIndexMS] = ms;
    this.averageIndexMS = (this.averageIndexMS + 1) % 250;
    return ms;
  }
  get msAvg() {
    return this.averageMS.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 250;
  }
  onkeydown(e) {
    this.idleCycles = performance.now();
    const keyCode = KeyCodes.get(e.key);
    if (!keyCode || e.code.length === 0 && !e.isTrusted) {
      return;
    }
    let ch = keyCode.ch;
    if (e.ctrlKey) {
      if (ch >= 65 && ch <= 93 || ch == 95) {
        ch -= 65 - 1;
      } else if (ch >= 97 && ch <= 122) {
        ch -= 97 - 1;
      }
    }
    if (ch > 0 && ch < 128) {
      this.actionKey[ch] = 1;
    }
    if (ch > 4) {
      this.keyQueue[this.keyQueueWritePos] = ch;
      this.keyQueueWritePos = this.keyQueueWritePos + 1 & 127;
    }
    if (InputTracking.trackingActive) {
      InputTracking.keyPressed(ch);
    }
    if (!CanvasEnabledKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  onkeyup(e) {
    this.idleCycles = performance.now();
    const keyCode = KeyCodes.get(e.key);
    if (!keyCode || e.code.length === 0 && !e.isTrusted) {
      return;
    }
    let ch = keyCode.ch;
    if (e.ctrlKey) {
      if (ch >= 65 && ch <= 93 || ch == 95) {
        ch -= 65 - 1;
      } else if (ch >= 97 && ch <= 122) {
        ch -= 97 - 1;
      }
    }
    if (ch > 0 && ch < 128) {
      this.actionKey[ch] = 0;
    }
    if (InputTracking.trackingActive) {
      InputTracking.keyReleased(ch);
    }
    if (!CanvasEnabledKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  onmousedown(e) {
    this.touching = false;
    if (e.clientX > 0 || e.clientY > 0)
      this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseClickX = this.mouseX;
    this.mouseClickY = this.mouseY;
    if (this.isMobile && !this.isCapacitor) {
      if (this.insideMobileInputArea() && !this.insideUsernameArea() && !this.inPasswordArea()) {
        this.mouseClickButton = 0;
        this.mouseButton = 0;
        return;
      }
      const eventTime = e.timeStamp;
      if (eventTime >= this.time + 500) {
        this.mouseClickButton = 2;
        this.mouseButton = 2;
      } else {
        this.mouseClickButton = 1;
        this.mouseButton = 1;
      }
    } else {
      if (e.button === 2) {
        this.mouseClickButton = 2;
        this.mouseButton = 2;
      } else if (e.button === 0) {
        this.mouseClickButton = 1;
        this.mouseButton = 1;
      }
    }
    if (MobileKeyboard.isDisplayed()) {
      if (MobileKeyboard.captureMouseDown(this.mouseX, this.mouseY)) {
        this.mouseButton = 0;
        this.mouseClickButton = 0;
      }
    }
    if (InputTracking.trackingActive) {
      InputTracking.mousePressed(this.mouseClickX, this.mouseClickY, e.button);
    }
  }
  onmouseup(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseButton = 0;
    if (InputTracking.trackingActive) {
      InputTracking.mouseReleased(e.button);
    }
    if (this.isMobile) {
      const insideMobileInputArea = this.insideMobileInputArea();
      if (insideMobileInputArea && !MobileKeyboard.isDisplayed()) {
        MobileKeyboard.show(this.mouseX, this.mouseY);
      } else if (MobileKeyboard.isDisplayed()) {
        if (!MobileKeyboard.captureMouseUp(this.mouseX, this.mouseY)) {
          MobileKeyboard.hide();
          this.refresh();
        }
      }
    }
  }
  onmouseenter(e) {
    this.setMousePosition(e);
    if (InputTracking.trackingActive) {
      InputTracking.mouseEntered();
    }
  }
  onmouseleave(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseX = -1;
    this.mouseY = -1;
    this.mouseButton = 0;
    this.mouseClickX = -1;
    this.mouseClickY = -1;
    if (InputTracking.trackingActive) {
      InputTracking.mouseExited();
    }
  }
  onmousemove(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    if (this.isMobile && this.touching) {
      if (MobileKeyboard.isDisplayed()) {
        MobileKeyboard.notifyTouchMove(this.mouseX, this.mouseY);
      }
    }
    if (InputTracking.trackingActive) {
      InputTracking.mouseMoved(this.mouseX, this.mouseY);
    }
  }
  onfocus(e) {
    this.hasFocus = true;
    this.redrawScreen = true;
    this.refresh();
    if (InputTracking.trackingActive) {
      InputTracking.focusGained();
    }
  }
  onblur(e) {
    this.hasFocus = false;
    for (let i = 0;i < 128; i++) {
      this.actionKey[i] = 0;
    }
    if (InputTracking.trackingActive) {
      InputTracking.focusLost();
    }
  }
  ontouchstart(e) {
    if (!this.isMobile) {
      return;
    }
    this.touching = true;
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.sx = this.nx = this.mx = touch.screenX | 0;
    this.sy = this.ny = this.my = touch.screenY | 0;
    this.time = e.timeStamp;
    this.startedInViewport = this.insideViewportArea();
    this.startedInTabArea = this.insideTabArea();
  }
  ontouchend(e) {
    if (!this.isMobile || !this.touching) {
      return;
    }
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.nx = touch.screenX | 0;
    this.ny = touch.screenY | 0;
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowLeft", code: "ArrowLeft" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowUp", code: "ArrowUp" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowRight", code: "ArrowRight" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown" }));
    if (this.startedInViewport && !this.insideViewportArea()) {
      this.touching = false;
      return;
    } else if (this.startedInTabArea && !this.insideTabArea()) {
      this.touching = false;
      return;
    } else if (this.insideMobileInputArea()) {
      this.touching = false;
      return;
    }
    const eventTime = e.timeStamp;
    const longPress = eventTime >= this.time + 500;
    const moved = Math.abs(this.sx - this.nx) > 16 || Math.abs(this.sy - this.ny) > 16;
    if (longPress && !moved) {
      this.touching = true;
      this.onmousedown(new MouseEvent("mousedown", { clientX, clientY, button: 2 }));
      this.onmouseup(new MouseEvent("mouseup", { clientX, clientY, button: 2 }));
    }
  }
  ontouchmove(e) {
    if (!this.isMobile || !this.touching) {
      return;
    }
    if (e.touches.length > 1) {
      return;
    }
    e.preventDefault();
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.nx = touch.screenX | 0;
    this.ny = touch.screenY | 0;
    if (!MobileKeyboard.isDisplayed()) {
      if (this.startedInViewport && this.getViewportInterfaceId() === -1) {
        if (this.mx - this.nx > 0) {
          this.rotate(2);
        } else if (this.mx - this.nx < 0) {
          this.rotate(0);
        }
        if (this.my - this.ny > 0) {
          this.rotate(3);
        } else if (this.my - this.ny < 0) {
          this.rotate(1);
        }
      } else if (this.startedInTabArea || this.getViewportInterfaceId() !== -1) {
        this.onmousedown(new MouseEvent("mousedown", { clientX, clientY, button: 1 }));
      }
    }
    this.mx = this.nx;
    this.my = this.ny;
  }
  get isMobile() {
    const keywords = ["Android", "webOS", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];
    return keywords.some((keyword) => navigator.userAgent.includes(keyword));
  }
  get isAndroid() {
    const keywords = ["Android"];
    return keywords.some((keyword) => navigator.userAgent.includes(keyword));
  }
  get isCapacitor() {
    const keywords = ["Capacitor"];
    return keywords.some((keyword) => navigator.userAgent.includes(keyword));
  }
  insideViewportArea() {
    const viewportAreaX1 = 8;
    const viewportAreaY1 = 11;
    const viewportAreaX2 = viewportAreaX1 + 512;
    const viewportAreaY2 = viewportAreaY1 + 334;
    return this.ingame && this.mouseX >= viewportAreaX1 && this.mouseX <= viewportAreaX2 && this.mouseY >= viewportAreaY1 && this.mouseY <= viewportAreaY2;
  }
  insideMobileInputArea() {
    return this.insideChatInputArea() || this.insideChatPopupArea() || this.insideUsernameArea() || this.inPasswordArea() || this.insideReportInterfaceTextArea();
  }
  insideChatInputArea() {
    const chatInputAreaX1 = 11;
    const chatInputAreaY1 = 449;
    const chatInputAreaX2 = chatInputAreaX1 + 495;
    const chatInputAreaY2 = chatInputAreaY1 + 33;
    return this.ingame && this.getChatInterfaceId() === -1 && !this.isChatBackInputOpen() && !this.isShowSocialInput() && this.mouseX >= chatInputAreaX1 && this.mouseX <= chatInputAreaX2 && this.mouseY >= chatInputAreaY1 && this.mouseY <= chatInputAreaY2;
  }
  insideChatPopupArea() {
    const chatInputAreaX1 = 11;
    const chatInputAreaY1 = 383;
    const chatInputAreaX2 = chatInputAreaX1 + 495;
    const chatInputAreaY2 = chatInputAreaY1 + 99;
    return this.ingame && (this.isChatBackInputOpen() || this.isShowSocialInput()) && this.mouseX >= chatInputAreaX1 && this.mouseX <= chatInputAreaX2 && this.mouseY >= chatInputAreaY1 && this.mouseY <= chatInputAreaY2;
  }
  insideReportInterfaceTextArea() {
    if (!this.ingame) {
      return false;
    }
    const viewportInterfaceId = this.getViewportInterfaceId();
    const reportAbuseInterfaceId = this.getReportAbuseInterfaceId();
    if (viewportInterfaceId === -1 || reportAbuseInterfaceId === -1) {
      return false;
    }
    if (viewportInterfaceId !== reportAbuseInterfaceId) {
      return false;
    }
    const reportInputAreaX1 = 82;
    const reportInputAreaY1 = 137;
    const reportInputAreaX2 = reportInputAreaX1 + 366;
    const reportInputAreaY2 = reportInputAreaY1 + 26;
    return this.mouseX >= reportInputAreaX1 && this.mouseX <= reportInputAreaX2 && this.mouseY >= reportInputAreaY1 && this.mouseY <= reportInputAreaY2;
  }
  insideTabArea() {
    const tabAreaX1 = 562;
    const tabAreaY1 = 231;
    const tabAreaX2 = tabAreaX1 + 190;
    const tabAreaY2 = tabAreaY1 + 261;
    return this.ingame && this.mouseX >= tabAreaX1 && this.mouseX <= tabAreaX2 && this.mouseY >= tabAreaY1 && this.mouseY <= tabAreaY2;
  }
  insideUsernameArea() {
    const usernameAreaX1 = 301;
    const usernameAreaY1 = 262;
    const usernameAreaX2 = usernameAreaX1 + 261;
    const usernameAreaY2 = usernameAreaY1 + 17;
    return !this.ingame && this.getTitleScreenState() === 2 && this.mouseX >= usernameAreaX1 && this.mouseX <= usernameAreaX2 && this.mouseY >= usernameAreaY1 && this.mouseY <= usernameAreaY2;
  }
  inPasswordArea() {
    const passwordAreaX1 = 301;
    const passwordAreaY1 = 279;
    const passwordAreaX2 = passwordAreaX1 + 261;
    const passwordAreaY2 = passwordAreaY1 + 17;
    return !this.ingame && this.getTitleScreenState() === 2 && this.mouseX >= passwordAreaX1 && this.mouseX <= passwordAreaX2 && this.mouseY >= passwordAreaY1 && this.mouseY <= passwordAreaY2;
  }
  rotate(direction) {
    if (direction === 0) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowRight", code: "ArrowRight" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowLeft", code: "ArrowLeft" }));
    } else if (direction === 1) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowUp", code: "ArrowUp" }));
    } else if (direction === 2) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowLeft", code: "ArrowLeft" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight" }));
    } else if (direction === 3) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowUp", code: "ArrowUp" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowDown", code: "ArrowDown" }));
    }
  }
  isFullScreen() {
    return document.fullscreenElement !== null;
  }
  setMousePosition(e) {
    const fixedWidth = this.width;
    const fixedHeight = this.height;
    const canvasBounds = canvas.getBoundingClientRect();
    const clickLocWithinCanvas = {
      x: e.clientX - canvasBounds.left,
      y: e.clientY - canvasBounds.top
    };
    if (this.isFullScreen()) {
      const gameAspectRatio = fixedWidth / fixedHeight;
      const ourAspectRatio = window.innerWidth / window.innerHeight;
      const wider = ourAspectRatio >= gameAspectRatio;
      let trueCanvasWidth = 0;
      let trueCanvasHeight = 0;
      let offsetX = 0;
      let offsetY = 0;
      if (wider) {
        trueCanvasWidth = window.innerHeight * gameAspectRatio;
        trueCanvasHeight = window.innerHeight;
        offsetX = (window.innerWidth - trueCanvasWidth) / 2;
      } else {
        trueCanvasWidth = window.innerWidth;
        trueCanvasHeight = window.innerWidth / gameAspectRatio;
        offsetY = (window.innerHeight - trueCanvasHeight) / 2;
      }
      const scaleX = fixedWidth / trueCanvasWidth;
      const scaleY = fixedHeight / trueCanvasHeight;
      this.mouseX = (clickLocWithinCanvas.x - offsetX) * scaleX | 0;
      this.mouseY = (clickLocWithinCanvas.y - offsetY) * scaleY | 0;
    } else {
      const scaleX = canvas.width / canvasBounds.width;
      const scaleY = canvas.height / canvasBounds.height;
      this.mouseX = clickLocWithinCanvas.x * scaleX | 0;
      this.mouseY = clickLocWithinCanvas.y * scaleY | 0;
    }
    if (this.mouseX < 0) {
      this.mouseX = 0;
    }
    if (this.mouseY < 0) {
      this.mouseY = 0;
    }
    if (this.mouseX > fixedWidth) {
      this.mouseX = fixedWidth;
    }
    if (this.mouseY > fixedHeight) {
      this.mouseY = fixedHeight;
    }
  }
}

// src/config/ConfigType.ts
class ConfigType {
  id;
  debugname = null;
  constructor(id) {
    this.id = id;
  }
  unpackType(dat) {
    while (true) {
      const opcode = dat.g1();
      if (opcode === 0) {
        break;
      }
      this.unpack(opcode, dat);
    }
    return this;
  }
}

// src/config/FloType.ts
class FloType extends ConfigType {
  static totalCount = 0;
  static instances = [];
  static unpack(config) {
    const dat = new Packet(config.read("flo.dat"));
    this.totalCount = dat.g2();
    for (let i = 0;i < this.totalCount; i++) {
      this.instances[i] = new FloType(i).unpackType(dat);
    }
  }
  static hsl24to16(hue, saturation, lightness) {
    if (lightness > 179) {
      saturation = saturation / 2 | 0;
    }
    if (lightness > 192) {
      saturation = saturation / 2 | 0;
    }
    if (lightness > 217) {
      saturation = saturation / 2 | 0;
    }
    if (lightness > 243) {
      saturation = saturation / 2 | 0;
    }
    return ((hue / 4 | 0) << 10) + ((saturation / 32 | 0) << 7) + (lightness / 2 | 0);
  }
  static mulHSL(hsl, lightness) {
    if (hsl === -1) {
      return 12345678;
    }
    lightness = lightness * (hsl & 127) / 128 | 0;
    if (lightness < 2) {
      lightness = 2;
    } else if (lightness > 126) {
      lightness = 126;
    }
    return (hsl & 65408) + lightness;
  }
  static adjustLightness(hsl, scalar) {
    if (hsl === -2) {
      return 12345678;
    }
    if (hsl === -1) {
      if (scalar < 0) {
        scalar = 0;
      } else if (scalar > 127) {
        scalar = 127;
      }
      return 127 - scalar;
    } else {
      scalar = scalar * (hsl & 127) / 128 | 0;
      if (scalar < 2) {
        scalar = 2;
      } else if (scalar > 126) {
        scalar = 126;
      }
      return (hsl & 65408) + scalar;
    }
  }
  rgb = 0;
  overlayTexture = -1;
  opcode3 = false;
  occlude = true;
  hue = 0;
  saturation = 0;
  lightness = 0;
  luminance = 0;
  chroma = 0;
  hsl = 0;
  unpack(code, dat) {
    if (code === 1) {
      this.rgb = dat.g3();
      this.setColor(this.rgb);
    } else if (code === 2) {
      this.overlayTexture = dat.g1();
    } else if (code === 3) {
      this.opcode3 = true;
    } else if (code === 5) {
      this.occlude = false;
    } else if (code === 6) {
      this.debugname = dat.gjstr();
    } else {
      console.log("Error unrecognised config code: ", code);
    }
  }
  setColor(rgb) {
    const red = (rgb >> 16 & 255) / 256;
    const green = (rgb >> 8 & 255) / 256;
    const blue = (rgb & 255) / 256;
    let min = red;
    if (green < red) {
      min = green;
    }
    if (blue < min) {
      min = blue;
    }
    let max = red;
    if (green > red) {
      max = green;
    }
    if (blue > max) {
      max = blue;
    }
    let h = 0;
    let s = 0;
    const l = (min + max) / 2;
    if (min !== max) {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      }
      if (l >= 0.5) {
        s = (max - min) / (2 - max - min);
      }
      if (red === max) {
        h = (green - blue) / (max - min);
      } else if (green === max) {
        h = (blue - red) / (max - min) + 2;
      } else if (blue === max) {
        h = (red - green) / (max - min) + 4;
      }
    }
    h /= 6;
    this.hue = h * 256 | 0;
    this.saturation = s * 256 | 0;
    this.lightness = l * 256 | 0;
    if (this.saturation < 0) {
      this.saturation = 0;
    } else if (this.saturation > 255) {
      this.saturation = 255;
    }
    if (this.lightness < 0) {
      this.lightness = 0;
    } else if (this.lightness > 255) {
      this.lightness = 255;
    }
    if (l > 0.5) {
      this.luminance = (1 - l) * s * 512 | 0;
    } else {
      this.luminance = l * s * 512 | 0;
    }
    if (this.luminance < 1) {
      this.luminance = 1;
    }
    this.chroma = h * this.luminance | 0;
    let hue = this.hue + (Math.random() * 16 | 0) - 8;
    if (hue < 0) {
      hue = 0;
    } else if (hue > 255) {
      hue = 255;
    }
    let saturation = this.saturation + (Math.random() * 48 | 0) - 24;
    if (saturation < 0) {
      saturation = 0;
    } else if (saturation > 255) {
      saturation = 255;
    }
    let lightness = this.lightness + (Math.random() * 48 | 0) - 24;
    if (lightness < 0) {
      lightness = 0;
    } else if (lightness > 255) {
      lightness = 255;
    }
    this.hsl = FloType.hsl24to16(hue, saturation, lightness);
  }
}

// src/graphics/AnimBase.ts
class AnimBase {
  static instances = [];
  static unpack(models) {
    const head = new Packet(models.read("base_head.dat"));
    const type = new Packet(models.read("base_type.dat"));
    const label = new Packet(models.read("base_label.dat"));
    const total = head.g2();
    head.pos += 2;
    for (let i = 0;i < total; i++) {
      const id = head.g2();
      const length = head.g1();
      const transformTypes = new Uint8Array(length);
      const groupLabels = new TypedArray1d(length, null);
      for (let j = 0;j < length; j++) {
        transformTypes[j] = type.g1();
        const groupCount = label.g1();
        const labels = new Uint8Array(groupCount);
        for (let k = 0;k < groupCount; k++) {
          labels[k] = label.g1();
        }
        groupLabels[j] = labels;
      }
      this.instances[id] = new AnimBase;
      this.instances[id].animLength = length;
      this.instances[id].animTypes = transformTypes;
      this.instances[id].animLabels = groupLabels;
    }
  }
  animLength = 0;
  animTypes = null;
  animLabels = null;
}

// src/graphics/AnimFrame.ts
class AnimFrame {
  static instances = [];
  static unpack(models) {
    const head = new Packet(models.read("frame_head.dat"));
    const tran1 = new Packet(models.read("frame_tran1.dat"));
    const tran2 = new Packet(models.read("frame_tran2.dat"));
    const del = new Packet(models.read("frame_del.dat"));
    const total = head.g2();
    head.pos += 2;
    const labels = new Int32Array(500);
    const x = new Int32Array(500);
    const y = new Int32Array(500);
    const z = new Int32Array(500);
    for (let i = 0;i < total; i++) {
      const id = head.g2();
      const frame = this.instances[id] = new AnimFrame;
      frame.frameDelay = del.g1();
      const baseId = head.g2();
      const base = AnimBase.instances[baseId];
      frame.base = base;
      const groupCount = head.g1();
      let lastGroup = -1;
      let current = 0;
      for (let j = 0;j < groupCount; j++) {
        if (!base.animTypes) {
          throw new Error;
        }
        const flags = tran1.g1();
        if (flags > 0) {
          if (base.animTypes[j] !== 0) {
            for (let group = j - 1;group > lastGroup; group--) {
              if (base.animTypes[group] === 0) {
                labels[current] = group;
                x[current] = 0;
                y[current] = 0;
                z[current] = 0;
                current++;
                break;
              }
            }
          }
          labels[current] = j;
          let defaultValue = 0;
          if (base.animTypes[labels[current]] === 3) {
            defaultValue = 128;
          }
          if ((flags & 1) === 0) {
            x[current] = defaultValue;
          } else {
            x[current] = tran2.gsmart();
          }
          if ((flags & 2) === 0) {
            y[current] = defaultValue;
          } else {
            y[current] = tran2.gsmart();
          }
          if ((flags & 4) === 0) {
            z[current] = defaultValue;
          } else {
            z[current] = tran2.gsmart();
          }
          lastGroup = j;
          current++;
        }
      }
      frame.frameLength = current;
      frame.bases = new Int32Array(current);
      frame.x = new Int32Array(current);
      frame.y = new Int32Array(current);
      frame.z = new Int32Array(current);
      for (let j = 0;j < current; j++) {
        frame.bases[j] = labels[j];
        frame.x[j] = x[j];
        frame.y[j] = y[j];
        frame.z[j] = z[j];
      }
    }
  }
  frameDelay = 0;
  base = null;
  frameLength = 0;
  bases = null;
  x = null;
  y = null;
  z = null;
}

// src/config/SeqType.ts
class SeqType extends ConfigType {
  static totalCount = 0;
  static instances = [];
  seqFrameCount = 0;
  seqFrames = null;
  seqIframes = null;
  seqDelay = null;
  replayoff = -1;
  walkmerge = null;
  stretches = false;
  seqPriority = 5;
  righthand = -1;
  lefthand = -1;
  replaycount = 99;
  seqDuration = 0;
  static unpack(config) {
    const dat = new Packet(config.read("seq.dat"));
    this.totalCount = dat.g2();
    for (let i = 0;i < this.totalCount; i++) {
      const seq = new SeqType(i).unpackType(dat);
      if (seq.seqFrameCount === 0) {
        seq.seqFrameCount = 1;
        seq.seqFrames = new Int16Array(1);
        seq.seqFrames[0] = -1;
        seq.seqIframes = new Int16Array(1);
        seq.seqIframes[0] = -1;
        seq.seqDelay = new Int16Array(1);
        seq.seqDelay[0] = -1;
      }
      this.instances[i] = seq;
    }
  }
  unpack(code, dat) {
    if (code === 1) {
      this.seqFrameCount = dat.g1();
      this.seqFrames = new Int16Array(this.seqFrameCount);
      this.seqIframes = new Int16Array(this.seqFrameCount);
      this.seqDelay = new Int16Array(this.seqFrameCount);
      for (let i = 0;i < this.seqFrameCount; i++) {
        this.seqFrames[i] = dat.g2();
        this.seqIframes[i] = dat.g2();
        if (this.seqIframes[i] === 65535) {
          this.seqIframes[i] = -1;
        }
        this.seqDelay[i] = dat.g2();
        if (this.seqDelay[i] === 0) {
          this.seqDelay[i] = AnimFrame.instances[this.seqFrames[i]].frameDelay;
        }
        if (this.seqDelay[i] === 0) {
          this.seqDelay[i] = 1;
        }
        this.seqDuration += this.seqDelay[i];
      }
    } else if (code === 2) {
      this.replayoff = dat.g2();
    } else if (code === 3) {
      const count = dat.g1();
      this.walkmerge = new Int32Array(count + 1);
      for (let i = 0;i < count; i++) {
        this.walkmerge[i] = dat.g1();
      }
      this.walkmerge[count] = 9999999;
    } else if (code === 4) {
      this.stretches = true;
    } else if (code === 5) {
      this.seqPriority = dat.g1();
    } else if (code === 6) {
      this.righthand = dat.g2();
    } else if (code === 7) {
      this.lefthand = dat.g2();
    } else if (code === 8) {
      this.replaycount = dat.g1();
    } else {
      console.log("Error unrecognised seq config code: ", code);
    }
  }
}

// src/datastruct/HashTable.ts
class HashTable {
  bucketCount;
  buckets;
  constructor(size) {
    this.buckets = new Array(size);
    this.bucketCount = size;
    for (let i = 0;i < size; i++) {
      const sentinel = this.buckets[i] = new Linkable;
      sentinel.next = sentinel;
      sentinel.prev = sentinel;
    }
  }
  get(key) {
    const start = this.buckets[Number(key & BigInt(this.bucketCount - 1))];
    for (let node = start.next;node !== start; node = node.next) {
      if (!node) {
        continue;
      }
      if (node.key === key) {
        return node;
      }
    }
    return null;
  }
  put(key, value) {
    if (value.prev) {
      value.unlink();
    }
    const sentinel = this.buckets[Number(key & BigInt(this.bucketCount - 1))];
    value.prev = sentinel.prev;
    value.next = sentinel;
    if (value.prev) {
      value.prev.next = value;
    }
    value.next.prev = value;
    value.key = key;
  }
}

// src/datastruct/DoublyLinkList.ts
class DoublyLinkList {
  head = new DoublyLinkable;
  constructor() {
    this.head.next2 = this.head;
    this.head.prev2 = this.head;
  }
  push(node) {
    if (node.prev2) {
      node.unlink2();
    }
    node.prev2 = this.head.prev2;
    node.next2 = this.head;
    if (node.prev2) {
      node.prev2.next2 = node;
    }
    node.next2.prev2 = node;
  }
  pop() {
    const node = this.head.next2;
    if (node === this.head) {
      return null;
    } else {
      node?.unlink2();
      return node;
    }
  }
}

// src/datastruct/LruCache.ts
class LruCache {
  capacity;
  hashtable = new HashTable(1024);
  cacheHistory = new DoublyLinkList;
  cacheAvailable;
  constructor(size) {
    this.capacity = size;
    this.cacheAvailable = size;
  }
  get(key) {
    const node = this.hashtable.get(key);
    if (node) {
      this.cacheHistory.push(node);
    }
    return node;
  }
  put(key, value) {
    if (this.cacheAvailable === 0) {
      const node = this.cacheHistory.pop();
      node?.unlink();
      node?.unlink2();
    } else {
      this.cacheAvailable--;
    }
    this.hashtable.put(key, value);
    this.cacheHistory.push(value);
  }
  clear() {
    while (true) {
      const node = this.cacheHistory.pop();
      if (!node) {
        this.cacheAvailable = this.capacity;
        return;
      }
      node.unlink();
      node.unlink2();
    }
  }
}

// src/dash3d/LocShape.ts
class LocShape {
  static WALL_STRAIGHT = new LocShape(0, 0 /* WALL */);
  static WALL_DIAGONAL_CORNER = new LocShape(1, 0 /* WALL */);
  static WALL_L = new LocShape(2, 0 /* WALL */);
  static WALL_SQUARE_CORNER = new LocShape(3, 0 /* WALL */);
  static WALLDECOR_STRAIGHT_NOOFFSET = new LocShape(4, 1 /* WALL_DECOR */);
  static WALLDECOR_STRAIGHT_OFFSET = new LocShape(5, 1 /* WALL_DECOR */);
  static WALLDECOR_DIAGONAL_OFFSET = new LocShape(6, 1 /* WALL_DECOR */);
  static WALLDECOR_DIAGONAL_NOOFFSET = new LocShape(7, 1 /* WALL_DECOR */);
  static WALLDECOR_DIAGONAL_BOTH = new LocShape(8, 1 /* WALL_DECOR */);
  static WALL_DIAGONAL = new LocShape(9, 2 /* GROUND */);
  static CENTREPIECE_STRAIGHT = new LocShape(10, 2 /* GROUND */);
  static CENTREPIECE_DIAGONAL = new LocShape(11, 2 /* GROUND */);
  static ROOF_STRAIGHT = new LocShape(12, 2 /* GROUND */);
  static ROOF_DIAGONAL_WITH_ROOFEDGE = new LocShape(13, 2 /* GROUND */);
  static ROOF_DIAGONAL = new LocShape(14, 2 /* GROUND */);
  static ROOF_L_CONCAVE = new LocShape(15, 2 /* GROUND */);
  static ROOF_L_CONVEX = new LocShape(16, 2 /* GROUND */);
  static ROOF_FLAT = new LocShape(17, 2 /* GROUND */);
  static ROOFEDGE_STRAIGHT = new LocShape(18, 2 /* GROUND */);
  static ROOFEDGE_DIAGONAL_CORNER = new LocShape(19, 2 /* GROUND */);
  static ROOFEDGE_L = new LocShape(20, 2 /* GROUND */);
  static ROOFEDGE_SQUARE_CORNER = new LocShape(21, 2 /* GROUND */);
  static GROUND_DECOR = new LocShape(22, 3 /* GROUND_DECOR */);
  static values() {
    return [
      this.WALL_STRAIGHT,
      this.WALL_DIAGONAL_CORNER,
      this.ROOF_FLAT,
      this.ROOF_L_CONCAVE,
      this.WALL_L,
      this.ROOF_DIAGONAL,
      this.WALL_DIAGONAL,
      this.WALL_SQUARE_CORNER,
      this.GROUND_DECOR,
      this.ROOF_STRAIGHT,
      this.CENTREPIECE_DIAGONAL,
      this.WALLDECOR_DIAGONAL_OFFSET,
      this.ROOFEDGE_L,
      this.CENTREPIECE_STRAIGHT,
      this.WALLDECOR_STRAIGHT_OFFSET,
      this.ROOF_DIAGONAL_WITH_ROOFEDGE,
      this.WALLDECOR_DIAGONAL_NOOFFSET,
      this.WALLDECOR_STRAIGHT_NOOFFSET,
      this.ROOF_L_CONVEX,
      this.WALLDECOR_DIAGONAL_BOTH,
      this.ROOFEDGE_DIAGONAL_CORNER,
      this.ROOFEDGE_SQUARE_CORNER,
      this.ROOFEDGE_STRAIGHT
    ];
  }
  static of(id) {
    const values = this.values();
    for (let index = 0;index < values.length; index++) {
      const shape = values[index];
      if (shape.id === id) {
        return shape;
      }
    }
    throw Error("shape not found");
  }
  id;
  layer;
  constructor(id, layer) {
    this.id = id;
    this.layer = layer;
  }
}

// src/graphics/Model.ts
class Metadata {
  vertexCount = 0;
  faceCount = 0;
  texturedFaceCount = 0;
  vertexFlagsOffset = -1;
  vertexXOffset = -1;
  vertexYOffset = -1;
  vertexZOffset = -1;
  vertexLabelsOffset = -1;
  faceVerticesOffset = -1;
  faceOrientationsOffset = -1;
  faceColorsOffset = -1;
  faceInfosOffset = -1;
  facePrioritiesOffset = 0;
  faceAlphasOffset = -1;
  faceLabelsOffset = -1;
  faceTextureAxisOffset = -1;
  data = null;
}

class VertexNormal {
  x = 0;
  y = 0;
  z = 0;
  w = 0;
}

class Model extends DoublyLinkable {
  static modelMeta = null;
  static head = null;
  static face1 = null;
  static face2 = null;
  static face3 = null;
  static face4 = null;
  static face5 = null;
  static point1 = null;
  static point2 = null;
  static point3 = null;
  static point4 = null;
  static point5 = null;
  static vertex1 = null;
  static vertex2 = null;
  static axis = null;
  static faceClippedX = new TypedArray1d(4096, false);
  static faceNearClipped = new TypedArray1d(4096, false);
  static vertexScreenX = new Int32Array(4096);
  static vertexScreenY = new Int32Array(4096);
  static vertexScreenZ = new Int32Array(4096);
  static vertexViewSpaceX = new Int32Array(4096);
  static vertexViewSpaceY = new Int32Array(4096);
  static vertexViewSpaceZ = new Int32Array(4096);
  static tmpDepthFaceCount = new Int32Array(1500);
  static tmpDepthFaces = new Int32Array2d(1500, 512);
  static tmpPriorityFaceCount = new Int32Array(12);
  static tmpPriorityFaces = new Int32Array2d(12, 2000);
  static tmpPriority10FaceDepth = new Int32Array(2000);
  static tmpPriority11FaceDepth = new Int32Array(2000);
  static tmpPriorityDepthSum = new Int32Array(12);
  static clippedX = new Int32Array(10);
  static clippedY = new Int32Array(10);
  static clippedColor = new Int32Array(10);
  static baseX = 0;
  static baseY = 0;
  static baseZ = 0;
  static checkHover = false;
  static mouseX = 0;
  static mouseY = 0;
  static pickedCount = 0;
  static picked = new Int32Array(1000);
  static checkHoverFace = false;
  static unpack(models) {
    try {
      Model.head = new Packet(models.read("ob_head.dat"));
      Model.face1 = new Packet(models.read("ob_face1.dat"));
      Model.face2 = new Packet(models.read("ob_face2.dat"));
      Model.face3 = new Packet(models.read("ob_face3.dat"));
      Model.face4 = new Packet(models.read("ob_face4.dat"));
      Model.face5 = new Packet(models.read("ob_face5.dat"));
      Model.point1 = new Packet(models.read("ob_point1.dat"));
      Model.point2 = new Packet(models.read("ob_point2.dat"));
      Model.point3 = new Packet(models.read("ob_point3.dat"));
      Model.point4 = new Packet(models.read("ob_point4.dat"));
      Model.point5 = new Packet(models.read("ob_point5.dat"));
      Model.vertex1 = new Packet(models.read("ob_vertex1.dat"));
      Model.vertex2 = new Packet(models.read("ob_vertex2.dat"));
      Model.axis = new Packet(models.read("ob_axis.dat"));
      Model.head.pos = 0;
      Model.point1.pos = 0;
      Model.point2.pos = 0;
      Model.point3.pos = 0;
      Model.point4.pos = 0;
      Model.vertex1.pos = 0;
      Model.vertex2.pos = 0;
      const count = Model.head.g2();
      Model.modelMeta = new TypedArray1d(count + 100, null);
      let vertexTextureDataOffset = 0;
      let labelDataOffset = 0;
      let triangleColorDataOffset = 0;
      let triangleInfoDataOffset = 0;
      let trianglePriorityDataOffset = 0;
      let triangleAlphaDataOffset = 0;
      let triangleSkinDataOffset = 0;
      for (let i = 0;i < count; i++) {
        const id = Model.head.g2();
        const meta = new Metadata;
        meta.vertexCount = Model.head.g2();
        meta.faceCount = Model.head.g2();
        meta.texturedFaceCount = Model.head.g1();
        meta.vertexFlagsOffset = Model.point1.pos;
        meta.vertexXOffset = Model.point2.pos;
        meta.vertexYOffset = Model.point3.pos;
        meta.vertexZOffset = Model.point4.pos;
        meta.faceVerticesOffset = Model.vertex1.pos;
        meta.faceOrientationsOffset = Model.vertex2.pos;
        const hasInfo = Model.head.g1();
        const priority = Model.head.g1();
        const hasAlpha = Model.head.g1();
        const hasSkins = Model.head.g1();
        const hasLabels = Model.head.g1();
        for (let v = 0;v < meta.vertexCount; v++) {
          const flags = Model.point1.g1();
          if ((flags & 1) !== 0) {
            Model.point2.gsmart();
          }
          if ((flags & 2) !== 0) {
            Model.point3.gsmart();
          }
          if ((flags & 4) !== 0) {
            Model.point4.gsmart();
          }
        }
        for (let v = 0;v < meta.faceCount; v++) {
          const type = Model.vertex2.g1();
          if (type === 1) {
            Model.vertex1.gsmart();
            Model.vertex1.gsmart();
          }
          Model.vertex1.gsmart();
        }
        meta.faceColorsOffset = triangleColorDataOffset;
        triangleColorDataOffset += meta.faceCount * 2;
        if (hasInfo === 1) {
          meta.faceInfosOffset = triangleInfoDataOffset;
          triangleInfoDataOffset += meta.faceCount;
        }
        if (priority === 255) {
          meta.facePrioritiesOffset = trianglePriorityDataOffset;
          trianglePriorityDataOffset += meta.faceCount;
        } else {
          meta.facePrioritiesOffset = -priority - 1;
        }
        if (hasAlpha === 1) {
          meta.faceAlphasOffset = triangleAlphaDataOffset;
          triangleAlphaDataOffset += meta.faceCount;
        }
        if (hasSkins === 1) {
          meta.faceLabelsOffset = triangleSkinDataOffset;
          triangleSkinDataOffset += meta.faceCount;
        }
        if (hasLabels === 1) {
          meta.vertexLabelsOffset = labelDataOffset;
          labelDataOffset += meta.vertexCount;
        }
        meta.faceTextureAxisOffset = vertexTextureDataOffset;
        vertexTextureDataOffset += meta.texturedFaceCount;
        Model.modelMeta[id] = meta;
      }
    } catch (err) {
      console.log("Error loading model index");
      console.error(err);
    }
  }
  static mulColorLightness(hsl, scalar, faceInfo) {
    if ((faceInfo & 2) === 2) {
      if (scalar < 0) {
        scalar = 0;
      } else if (scalar > 127) {
        scalar = 127;
      }
      return 127 - scalar;
    }
    scalar = scalar * (hsl & 127) >> 7;
    if (scalar < 2) {
      scalar = 2;
    } else if (scalar > 126) {
      scalar = 126;
    }
    return (hsl & 65408) + scalar;
  }
  static modelCopyFaces(src, copyVertexY, copyFaces) {
    const vertexCount = src.vertexCount;
    const faceCount = src.faceCount;
    const texturedFaceCount = src.texturedFaceCount;
    let vertexY;
    if (copyVertexY) {
      vertexY = new Int32Array(vertexCount);
      for (let v = 0;v < vertexCount; v++) {
        vertexY[v] = src.vertexY[v];
      }
    } else {
      vertexY = src.vertexY;
    }
    let faceColorA;
    let faceColorB;
    let faceColorC;
    let faceInfo;
    let vertexNormal = null;
    let vertexNormalOriginal = null;
    if (copyFaces) {
      faceColorA = new Int32Array(faceCount);
      faceColorB = new Int32Array(faceCount);
      faceColorC = new Int32Array(faceCount);
      for (let f = 0;f < faceCount; f++) {
        if (src.faceColorA) {
          faceColorA[f] = src.faceColorA[f];
        }
        if (src.faceColorB) {
          faceColorB[f] = src.faceColorB[f];
        }
        if (src.faceColorC) {
          faceColorC[f] = src.faceColorC[f];
        }
      }
      faceInfo = new Int32Array(faceCount);
      if (!src.faceInfo) {
        for (let f = 0;f < faceCount; f++) {
          faceInfo[f] = 0;
        }
      } else {
        for (let f = 0;f < faceCount; f++) {
          faceInfo[f] = src.faceInfo[f];
        }
      }
      vertexNormal = new TypedArray1d(vertexCount, null);
      for (let v = 0;v < vertexCount; v++) {
        const copy = vertexNormal[v] = new VertexNormal;
        if (src.vertexNormal) {
          const original = src.vertexNormal[v];
          if (original) {
            copy.x = original.x;
            copy.y = original.y;
            copy.z = original.z;
            copy.w = original.w;
          }
        }
      }
      vertexNormalOriginal = src.vertexNormalOriginal;
    } else {
      faceColorA = src.faceColorA;
      faceColorB = src.faceColorB;
      faceColorC = src.faceColorC;
      faceInfo = src.faceInfo;
    }
    return new Model({
      vertexCount,
      vertexX: src.vertexX,
      vertexY,
      vertexZ: src.vertexZ,
      faceCount,
      faceVertexA: src.faceVertexA,
      faceVertexB: src.faceVertexB,
      faceVertexC: src.faceVertexC,
      faceColorA,
      faceColorB,
      faceColorC,
      faceInfo,
      facePriority: src.facePriority,
      faceAlpha: src.faceAlpha,
      faceColor: src.faceColor,
      priorityVal: src.priorityVal,
      texturedFaceCount,
      texturedVertexA: src.texturedVertexA,
      texturedVertexB: src.texturedVertexB,
      texturedVertexC: src.texturedVertexC,
      minX: src.minX,
      maxX: src.maxX,
      minZ: src.minZ,
      maxZ: src.maxZ,
      radius: src.radius,
      minY: src.minY,
      maxY: src.maxY,
      maxDepth: src.maxDepth,
      minDepth: src.minDepth,
      vertexNormal,
      vertexNormalOriginal
    });
  }
  static modelShareColored(src, shareColors, shareAlpha, shareVertices) {
    const vertexCount = src.vertexCount;
    const faceCount = src.faceCount;
    const texturedFaceCount = src.texturedFaceCount;
    let vertexX;
    let vertexY;
    let vertexZ;
    if (shareVertices) {
      vertexX = src.vertexX;
      vertexY = src.vertexY;
      vertexZ = src.vertexZ;
    } else {
      vertexX = new Int32Array(vertexCount);
      vertexY = new Int32Array(vertexCount);
      vertexZ = new Int32Array(vertexCount);
      for (let v = 0;v < vertexCount; v++) {
        vertexX[v] = src.vertexX[v];
        vertexY[v] = src.vertexY[v];
        vertexZ[v] = src.vertexZ[v];
      }
    }
    let faceColor;
    if (shareColors) {
      faceColor = src.faceColor;
    } else {
      faceColor = new Int32Array(faceCount);
      for (let f = 0;f < faceCount; f++) {
        if (src.faceColor) {
          faceColor[f] = src.faceColor[f];
        }
      }
    }
    let faceAlpha;
    if (shareAlpha) {
      faceAlpha = src.faceAlpha;
    } else {
      faceAlpha = new Int32Array(faceCount);
      if (!src.faceAlpha) {
        for (let f = 0;f < faceCount; f++) {
          faceAlpha[f] = 0;
        }
      } else {
        for (let f = 0;f < faceCount; f++) {
          faceAlpha[f] = src.faceAlpha[f];
        }
      }
    }
    return new Model({
      vertexCount,
      vertexX,
      vertexY,
      vertexZ,
      faceCount,
      faceVertexA: src.faceVertexA,
      faceVertexB: src.faceVertexB,
      faceVertexC: src.faceVertexC,
      faceColorA: null,
      faceColorB: null,
      faceColorC: null,
      faceInfo: src.faceInfo,
      facePriority: src.facePriority,
      faceAlpha,
      faceColor,
      priorityVal: src.priorityVal,
      texturedFaceCount,
      texturedVertexA: src.texturedVertexA,
      texturedVertexB: src.texturedVertexB,
      texturedVertexC: src.texturedVertexC,
      vertexLabel: src.vertexLabel,
      faceLabel: src.faceLabel
    });
  }
  static modelShareAlpha(src, shareAlpha) {
    const vertexCount = src.vertexCount;
    const faceCount = src.faceCount;
    const texturedFaceCount = src.texturedFaceCount;
    const vertexX = new Int32Array(vertexCount);
    const vertexY = new Int32Array(vertexCount);
    const vertexZ = new Int32Array(vertexCount);
    for (let v = 0;v < vertexCount; v++) {
      vertexX[v] = src.vertexX[v];
      vertexY[v] = src.vertexY[v];
      vertexZ[v] = src.vertexZ[v];
    }
    let faceAlpha;
    if (shareAlpha) {
      faceAlpha = src.faceAlpha;
    } else {
      faceAlpha = new Int32Array(faceCount);
      if (!src.faceAlpha) {
        for (let f = 0;f < faceCount; f++) {
          faceAlpha[f] = 0;
        }
      } else {
        for (let f = 0;f < faceCount; f++) {
          faceAlpha[f] = src.faceAlpha[f];
        }
      }
    }
    return new Model({
      vertexCount,
      vertexX,
      vertexY,
      vertexZ,
      faceCount,
      faceVertexA: src.faceVertexA,
      faceVertexB: src.faceVertexB,
      faceVertexC: src.faceVertexC,
      faceColorA: src.faceColorA,
      faceColorB: src.faceColorB,
      faceColorC: src.faceColorC,
      faceInfo: src.faceInfo,
      facePriority: src.facePriority,
      faceAlpha,
      faceColor: src.faceColor,
      priorityVal: src.priorityVal,
      texturedFaceCount,
      texturedVertexA: src.texturedVertexA,
      texturedVertexB: src.texturedVertexB,
      texturedVertexC: src.texturedVertexC,
      labelVertices: src.labelVertices,
      labelFaces: src.labelFaces
    });
  }
  static modelFromModelsBounds(models, count) {
    let copyInfo = false;
    let copyPriority = false;
    let copyAlpha = false;
    let copyColor = false;
    let vertexCount = 0;
    let faceCount = 0;
    let texturedFaceCount = 0;
    let priority = -1;
    for (let i = 0;i < count; i++) {
      const model2 = models[i];
      if (model2) {
        vertexCount += model2.vertexCount;
        faceCount += model2.faceCount;
        texturedFaceCount += model2.texturedFaceCount;
        copyInfo ||= model2.faceInfo !== null;
        if (!model2.facePriority) {
          if (priority === -1) {
            priority = model2.priorityVal;
          }
          if (priority !== model2.priorityVal) {
            copyPriority = true;
          }
        } else {
          copyPriority = true;
        }
        copyAlpha ||= model2.faceAlpha !== null;
        copyColor ||= model2.faceColor !== null;
      }
    }
    const vertexX = new Int32Array(vertexCount);
    const vertexY = new Int32Array(vertexCount);
    const vertexZ = new Int32Array(vertexCount);
    const faceVertexA = new Int32Array(faceCount);
    const faceVertexB = new Int32Array(faceCount);
    const faceVertexC = new Int32Array(faceCount);
    const faceColorA = new Int32Array(faceCount);
    const faceColorB = new Int32Array(faceCount);
    const faceColorC = new Int32Array(faceCount);
    const texturedVertexA = new Int32Array(texturedFaceCount);
    const texturedVertexB = new Int32Array(texturedFaceCount);
    const texturedVertexC = new Int32Array(texturedFaceCount);
    let faceInfo = null;
    if (copyInfo) {
      faceInfo = new Int32Array(faceCount);
    }
    let facePriority = null;
    if (copyPriority) {
      facePriority = new Int32Array(faceCount);
    }
    let faceAlpha = null;
    if (copyAlpha) {
      faceAlpha = new Int32Array(faceCount);
    }
    let faceColor = null;
    if (copyColor) {
      faceColor = new Int32Array(faceCount);
    }
    vertexCount = 0;
    faceCount = 0;
    texturedFaceCount = 0;
    for (let i = 0;i < count; i++) {
      const model2 = models[i];
      if (model2) {
        const vertexCount2 = vertexCount;
        for (let v = 0;v < model2.vertexCount; v++) {
          vertexX[vertexCount] = model2.vertexX[v];
          vertexY[vertexCount] = model2.vertexY[v];
          vertexZ[vertexCount] = model2.vertexZ[v];
          vertexCount++;
        }
        for (let f = 0;f < model2.faceCount; f++) {
          faceVertexA[faceCount] = model2.faceVertexA[f] + vertexCount2;
          faceVertexB[faceCount] = model2.faceVertexB[f] + vertexCount2;
          faceVertexC[faceCount] = model2.faceVertexC[f] + vertexCount2;
          if (model2.faceColorA) {
            faceColorA[faceCount] = model2.faceColorA[f];
          }
          if (model2.faceColorB) {
            faceColorB[faceCount] = model2.faceColorB[f];
          }
          if (model2.faceColorC) {
            faceColorC[faceCount] = model2.faceColorC[f];
          }
          if (copyInfo) {
            if (!model2.faceInfo) {
              if (faceInfo) {
                faceInfo[faceCount] = 0;
              }
            } else {
              if (faceInfo) {
                faceInfo[faceCount] = model2.faceInfo[f];
              }
            }
          }
          if (copyPriority) {
            if (!model2.facePriority) {
              if (facePriority) {
                facePriority[faceCount] = model2.priorityVal;
              }
            } else {
              if (facePriority) {
                facePriority[faceCount] = model2.facePriority[f];
              }
            }
          }
          if (copyAlpha) {
            if (!model2.faceAlpha) {
              if (faceAlpha) {
                faceAlpha[faceCount] = 0;
              }
            } else {
              if (faceAlpha) {
                faceAlpha[faceCount] = model2.faceAlpha[f];
              }
            }
          }
          if (copyColor && model2.faceColor) {
            if (faceColor) {
              faceColor[faceCount] = model2.faceColor[f];
            }
          }
          faceCount++;
        }
        for (let f = 0;f < model2.texturedFaceCount; f++) {
          texturedVertexA[texturedFaceCount] = model2.texturedVertexA[f] + vertexCount2;
          texturedVertexB[texturedFaceCount] = model2.texturedVertexB[f] + vertexCount2;
          texturedVertexC[texturedFaceCount] = model2.texturedVertexC[f] + vertexCount2;
          texturedFaceCount++;
        }
      }
    }
    const model = new Model({
      vertexCount,
      vertexX,
      vertexY,
      vertexZ,
      faceCount,
      faceVertexA,
      faceVertexB,
      faceVertexC,
      faceColorA,
      faceColorB,
      faceColorC,
      faceInfo,
      facePriority,
      faceAlpha,
      faceColor,
      priorityVal: priority,
      texturedFaceCount,
      texturedVertexA,
      texturedVertexB,
      texturedVertexC
    });
    model.calculateBoundsCylinder();
    return model;
  }
  static modelFromModels(models, count) {
    let copyInfo = false;
    let copyPriorities = false;
    let copyAlpha = false;
    let copyLabels = false;
    let vertexCount = 0;
    let faceCount = 0;
    let texturedFaceCount = 0;
    let priority = -1;
    for (let i = 0;i < count; i++) {
      const model = models[i];
      if (model) {
        vertexCount += model.vertexCount;
        faceCount += model.faceCount;
        texturedFaceCount += model.texturedFaceCount;
        copyInfo ||= model.faceInfo !== null;
        if (!model.facePriority) {
          if (priority === -1) {
            priority = model.priorityVal;
          }
          if (priority !== model.priorityVal) {
            copyPriorities = true;
          }
        } else {
          copyPriorities = true;
        }
        copyAlpha ||= model.faceAlpha !== null;
        copyLabels ||= model.faceLabel !== null;
      }
    }
    const vertexX = new Int32Array(vertexCount);
    const vertexY = new Int32Array(vertexCount);
    const vertexZ = new Int32Array(vertexCount);
    const vertexLabel = new Int32Array(vertexCount);
    const faceVertexA = new Int32Array(faceCount);
    const faceVertexB = new Int32Array(faceCount);
    const faceVertexC = new Int32Array(faceCount);
    const texturedVertexA = new Int32Array(texturedFaceCount);
    const texturedVertexB = new Int32Array(texturedFaceCount);
    const texturedVertexC = new Int32Array(texturedFaceCount);
    let faceInfo = null;
    if (copyInfo) {
      faceInfo = new Int32Array(faceCount);
    }
    let facePriority = null;
    if (copyPriorities) {
      facePriority = new Int32Array(faceCount);
    }
    let faceAlpha = null;
    if (copyAlpha) {
      faceAlpha = new Int32Array(faceCount);
    }
    let faceLabel = null;
    if (copyLabels) {
      faceLabel = new Int32Array(faceCount);
    }
    const faceColor = new Int32Array(faceCount);
    vertexCount = 0;
    faceCount = 0;
    texturedFaceCount = 0;
    const addVertex = (src, vertexId, vertexX2, vertexY2, vertexZ2, vertexLabel2, vertexCount2) => {
      let identical = -1;
      const x = src.vertexX[vertexId];
      const y = src.vertexY[vertexId];
      const z = src.vertexZ[vertexId];
      for (let v = 0;v < vertexCount2; v++) {
        if (x === vertexX2[v] && y === vertexY2[v] && z === vertexZ2[v]) {
          identical = v;
          break;
        }
      }
      if (identical === -1) {
        vertexX2[vertexCount2] = x;
        vertexY2[vertexCount2] = y;
        vertexZ2[vertexCount2] = z;
        if (vertexLabel2 && src.vertexLabel) {
          vertexLabel2[vertexCount2] = src.vertexLabel[vertexId];
        }
        identical = vertexCount2++;
      }
      return { vertex: identical, vertexCount: vertexCount2 };
    };
    for (let i = 0;i < count; i++) {
      const model = models[i];
      if (model) {
        for (let face = 0;face < model.faceCount; face++) {
          if (copyInfo) {
            if (!model.faceInfo) {
              if (faceInfo) {
                faceInfo[faceCount] = 0;
              }
            } else {
              if (faceInfo) {
                faceInfo[faceCount] = model.faceInfo[face];
              }
            }
          }
          if (copyPriorities) {
            if (!model.facePriority) {
              if (facePriority) {
                facePriority[faceCount] = model.priorityVal;
              }
            } else {
              if (facePriority) {
                facePriority[faceCount] = model.facePriority[face];
              }
            }
          }
          if (copyAlpha) {
            if (!model.faceAlpha) {
              if (faceAlpha) {
                faceAlpha[faceCount] = 0;
              }
            } else {
              if (faceAlpha) {
                faceAlpha[faceCount] = model.faceAlpha[face];
              }
            }
          }
          if (copyLabels && model.faceLabel) {
            if (faceLabel) {
              faceLabel[faceCount] = model.faceLabel[face];
            }
          }
          if (model.faceColor) {
            faceColor[faceCount] = model.faceColor[face];
          }
          const a = addVertex(model, model.faceVertexA[face], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = a.vertexCount;
          const b = addVertex(model, model.faceVertexB[face], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = b.vertexCount;
          const c = addVertex(model, model.faceVertexC[face], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = c.vertexCount;
          faceVertexA[faceCount] = a.vertex;
          faceVertexB[faceCount] = b.vertex;
          faceVertexC[faceCount] = c.vertex;
          faceCount++;
        }
        for (let f = 0;f < model.texturedFaceCount; f++) {
          const a = addVertex(model, model.texturedVertexA[f], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = a.vertexCount;
          const b = addVertex(model, model.texturedVertexB[f], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = b.vertexCount;
          const c = addVertex(model, model.texturedVertexC[f], vertexX, vertexY, vertexZ, vertexLabel, vertexCount);
          vertexCount = c.vertexCount;
          texturedVertexA[texturedFaceCount] = a.vertex;
          texturedVertexB[texturedFaceCount] = b.vertex;
          texturedVertexC[texturedFaceCount] = c.vertex;
          texturedFaceCount++;
        }
      }
    }
    return new Model({
      vertexCount,
      vertexX,
      vertexY,
      vertexZ,
      faceCount,
      faceVertexA,
      faceVertexB,
      faceVertexC,
      faceColorA: null,
      faceColorB: null,
      faceColorC: null,
      faceInfo,
      facePriority,
      faceAlpha,
      faceColor,
      priorityVal: priority,
      texturedFaceCount,
      texturedVertexA,
      texturedVertexB,
      texturedVertexC,
      vertexLabel,
      faceLabel
    });
  }
  static model(id) {
    if (!Model.modelMeta) {
      throw new Error;
    }
    const meta = Model.modelMeta[id];
    if (!meta) {
      console.error(`Error model:${id} not found!`);
      throw new Error;
    }
    if (!Model.head || !Model.face1 || !Model.face2 || !Model.face3 || !Model.face4 || !Model.face5 || !Model.point1 || !Model.point2 || !Model.point3 || !Model.point4 || !Model.point5 || !Model.vertex1 || !Model.vertex2 || !Model.axis) {
      throw new Error;
    }
    const vertexCount = meta.vertexCount;
    const faceCount = meta.faceCount;
    const texturedFaceCount = meta.texturedFaceCount;
    const vertexX = new Int32Array(vertexCount);
    const vertexY = new Int32Array(vertexCount);
    const vertexZ = new Int32Array(vertexCount);
    const faceVertexA = new Int32Array(faceCount);
    const faceVertexB = new Int32Array(faceCount);
    const faceVertexC = new Int32Array(faceCount);
    const texturedVertexA = new Int32Array(texturedFaceCount);
    const texturedVertexB = new Int32Array(texturedFaceCount);
    const texturedVertexC = new Int32Array(texturedFaceCount);
    let vertexLabel = null;
    if (meta.vertexLabelsOffset >= 0) {
      vertexLabel = new Int32Array(vertexCount);
    }
    let faceInfo = null;
    if (meta.faceInfosOffset >= 0) {
      faceInfo = new Int32Array(faceCount);
    }
    let facePriority = null;
    let priority = 0;
    if (meta.facePrioritiesOffset >= 0) {
      facePriority = new Int32Array(faceCount);
    } else {
      priority = -meta.facePrioritiesOffset - 1;
    }
    let faceAlpha = null;
    if (meta.faceAlphasOffset >= 0) {
      faceAlpha = new Int32Array(faceCount);
    }
    let faceLabel = null;
    if (meta.faceLabelsOffset >= 0) {
      faceLabel = new Int32Array(faceCount);
    }
    const faceColor = new Int32Array(faceCount);
    Model.point1.pos = meta.vertexFlagsOffset;
    Model.point2.pos = meta.vertexXOffset;
    Model.point3.pos = meta.vertexYOffset;
    Model.point4.pos = meta.vertexZOffset;
    Model.point5.pos = meta.vertexLabelsOffset;
    let dx = 0;
    let dy = 0;
    let dz = 0;
    let a;
    let b;
    let c;
    for (let v = 0;v < vertexCount; v++) {
      const flags = Model.point1.g1();
      a = 0;
      if ((flags & 1) !== 0) {
        a = Model.point2.gsmart();
      }
      b = 0;
      if ((flags & 2) !== 0) {
        b = Model.point3.gsmart();
      }
      c = 0;
      if ((flags & 4) !== 0) {
        c = Model.point4.gsmart();
      }
      vertexX[v] = dx + a;
      vertexY[v] = dy + b;
      vertexZ[v] = dz + c;
      dx = vertexX[v];
      dy = vertexY[v];
      dz = vertexZ[v];
      if (vertexLabel) {
        vertexLabel[v] = Model.point5.g1();
      }
    }
    Model.face1.pos = meta.faceColorsOffset;
    Model.face2.pos = meta.faceInfosOffset;
    Model.face3.pos = meta.facePrioritiesOffset;
    Model.face4.pos = meta.faceAlphasOffset;
    Model.face5.pos = meta.faceLabelsOffset;
    for (let f = 0;f < faceCount; f++) {
      faceColor[f] = Model.face1.g2();
      if (faceInfo) {
        faceInfo[f] = Model.face2.g1();
      }
      if (facePriority) {
        facePriority[f] = Model.face3.g1();
      }
      if (faceAlpha) {
        faceAlpha[f] = Model.face4.g1();
      }
      if (faceLabel) {
        faceLabel[f] = Model.face5.g1();
      }
    }
    Model.vertex1.pos = meta.faceVerticesOffset;
    Model.vertex2.pos = meta.faceOrientationsOffset;
    a = 0;
    b = 0;
    c = 0;
    let last = 0;
    for (let f = 0;f < faceCount; f++) {
      const orientation = Model.vertex2.g1();
      if (orientation === 1) {
        a = Model.vertex1.gsmart() + last;
        last = a;
        b = Model.vertex1.gsmart() + last;
        last = b;
        c = Model.vertex1.gsmart() + last;
        last = c;
      } else if (orientation === 2) {
        b = c;
        c = Model.vertex1.gsmart() + last;
        last = c;
      } else if (orientation === 3) {
        a = c;
        c = Model.vertex1.gsmart() + last;
        last = c;
      } else if (orientation === 4) {
        const tmp = a;
        a = b;
        b = tmp;
        c = Model.vertex1.gsmart() + last;
        last = c;
      }
      faceVertexA[f] = a;
      faceVertexB[f] = b;
      faceVertexC[f] = c;
    }
    Model.axis.pos = meta.faceTextureAxisOffset * 6;
    for (let f = 0;f < texturedFaceCount; f++) {
      texturedVertexA[f] = Model.axis.g2();
      texturedVertexB[f] = Model.axis.g2();
      texturedVertexC[f] = Model.axis.g2();
    }
    return new Model({
      vertexCount,
      vertexX,
      vertexY,
      vertexZ,
      faceCount,
      faceVertexA,
      faceVertexB,
      faceVertexC,
      faceColorA: null,
      faceColorB: null,
      faceColorC: null,
      faceInfo,
      facePriority,
      faceAlpha,
      faceColor,
      priorityVal: priority,
      texturedFaceCount,
      texturedVertexA,
      texturedVertexB,
      texturedVertexC,
      vertexLabel,
      faceLabel
    });
  }
  vertexCount;
  vertexX;
  vertexY;
  vertexZ;
  faceCount;
  faceVertexA;
  faceVertexB;
  faceVertexC;
  faceColorA;
  faceColorB;
  faceColorC;
  faceInfo;
  facePriority;
  faceAlpha;
  faceColor;
  priorityVal;
  texturedFaceCount;
  texturedVertexA;
  texturedVertexB;
  texturedVertexC;
  minX;
  maxX;
  minZ;
  maxZ;
  radius;
  minY;
  maxY;
  maxDepth;
  minDepth;
  vertexLabel;
  faceLabel;
  labelVertices;
  labelFaces;
  vertexNormal;
  vertexNormalOriginal;
  objRaise = 0;
  pickable = false;
  pickedFace = -1;
  pickedFaceDepth = -1;
  constructor(type) {
    super();
    this.vertexCount = type.vertexCount;
    this.vertexX = type.vertexX;
    this.vertexY = type.vertexY;
    this.vertexZ = type.vertexZ;
    this.faceCount = type.faceCount;
    this.faceVertexA = type.faceVertexA;
    this.faceVertexB = type.faceVertexB;
    this.faceVertexC = type.faceVertexC;
    this.faceColorA = type.faceColorA;
    this.faceColorB = type.faceColorB;
    this.faceColorC = type.faceColorC;
    this.faceInfo = type.faceInfo;
    this.facePriority = type.facePriority;
    this.faceAlpha = type.faceAlpha;
    this.faceColor = type.faceColor;
    this.priorityVal = type.priorityVal;
    this.texturedFaceCount = type.texturedFaceCount;
    this.texturedVertexA = type.texturedVertexA;
    this.texturedVertexB = type.texturedVertexB;
    this.texturedVertexC = type.texturedVertexC;
    this.minX = type.minX ?? 0;
    this.maxX = type.maxX ?? 0;
    this.minZ = type.minZ ?? 0;
    this.maxZ = type.maxZ ?? 0;
    this.radius = type.radius ?? 0;
    this.minY = type.minY ?? 0;
    this.maxY = type.maxY ?? 0;
    this.maxDepth = type.maxDepth ?? 0;
    this.minDepth = type.minDepth ?? 0;
    this.vertexLabel = type.vertexLabel ?? null;
    this.faceLabel = type.faceLabel ?? null;
    this.labelVertices = type.labelVertices ?? null;
    this.labelFaces = type.labelFaces ?? null;
    this.vertexNormal = type.vertexNormal ?? null;
    this.vertexNormalOriginal = type.vertexNormalOriginal ?? null;
  }
  calculateBoundsCylinder() {
    this.maxY = 0;
    this.radius = 0;
    this.minY = 0;
    for (let i = 0;i < this.vertexCount; i++) {
      const x = this.vertexX[i];
      const y = this.vertexY[i];
      const z = this.vertexZ[i];
      if (-y > this.maxY) {
        this.maxY = -y;
      }
      if (y > this.minY) {
        this.minY = y;
      }
      const radiusSqr = x * x + z * z;
      if (radiusSqr > this.radius) {
        this.radius = radiusSqr;
      }
    }
    this.radius = Math.sqrt(this.radius) + 0.99 | 0;
    this.minDepth = Math.sqrt(this.radius * this.radius + this.maxY * this.maxY) + 0.99 | 0;
    this.maxDepth = this.minDepth + (Math.sqrt(this.radius * this.radius + this.minY * this.minY) + 0.99 | 0);
  }
  calculateBoundsY() {
    this.maxY = 0;
    this.minY = 0;
    for (let v = 0;v < this.vertexCount; v++) {
      const y = this.vertexY[v];
      if (-y > this.maxY) {
        this.maxY = -y;
      }
      if (y > this.minY) {
        this.minY = y;
      }
    }
    this.minDepth = Math.sqrt(this.radius * this.radius + this.maxY * this.maxY) + 0.99 | 0;
    this.maxDepth = this.minDepth + (Math.sqrt(this.radius * this.radius + this.minY * this.minY) + 0.99 | 0);
  }
  createLabelReferences() {
    if (this.vertexLabel) {
      const labelVertexCount = new Int32Array(256);
      let count = 0;
      for (let v2 = 0;v2 < this.vertexCount; v2++) {
        const label = this.vertexLabel[v2];
        labelVertexCount[label]++;
        if (label > count) {
          count = label;
        }
      }
      this.labelVertices = new TypedArray1d(count + 1, null);
      for (let label = 0;label <= count; label++) {
        this.labelVertices[label] = new Int32Array(labelVertexCount[label]);
        labelVertexCount[label] = 0;
      }
      let v = 0;
      while (v < this.vertexCount) {
        const label = this.vertexLabel[v];
        const verts = this.labelVertices[label];
        if (!verts) {
          continue;
        }
        verts[labelVertexCount[label]++] = v++;
      }
      this.vertexLabel = null;
    }
    if (this.faceLabel) {
      const labelFaceCount = new Int32Array(256);
      let count = 0;
      for (let f = 0;f < this.faceCount; f++) {
        const label = this.faceLabel[f];
        labelFaceCount[label]++;
        if (label > count) {
          count = label;
        }
      }
      this.labelFaces = new TypedArray1d(count + 1, null);
      for (let label = 0;label <= count; label++) {
        this.labelFaces[label] = new Int32Array(labelFaceCount[label]);
        labelFaceCount[label] = 0;
      }
      let face = 0;
      while (face < this.faceCount) {
        const label = this.faceLabel[face];
        const faces = this.labelFaces[label];
        if (!faces) {
          continue;
        }
        faces[labelFaceCount[label]++] = face++;
      }
      this.faceLabel = null;
    }
  }
  applyTransforms(primaryId, secondaryId, mask) {
    if (primaryId === -1) {
      return;
    }
    if (!mask || secondaryId === -1) {
      this.applyTransform(primaryId);
    } else {
      const primary = AnimFrame.instances[primaryId];
      const secondary = AnimFrame.instances[secondaryId];
      const skeleton = primary.base;
      Model.baseX = 0;
      Model.baseY = 0;
      Model.baseZ = 0;
      let counter = 0;
      let maskBase = mask[counter++];
      for (let i = 0;i < primary.frameLength; i++) {
        if (!primary.bases) {
          continue;
        }
        const base = primary.bases[i];
        while (base > maskBase) {
          maskBase = mask[counter++];
        }
        if (skeleton && skeleton.animTypes && primary.x && primary.y && primary.z && skeleton.animLabels && (base !== maskBase || skeleton.animTypes[base] === 0)) {
          this.applyTransform2(primary.x[i], primary.y[i], primary.z[i], skeleton.animLabels[base], skeleton.animTypes[base]);
        }
      }
      Model.baseX = 0;
      Model.baseY = 0;
      Model.baseZ = 0;
      counter = 0;
      maskBase = mask[counter++];
      for (let i = 0;i < secondary.frameLength; i++) {
        if (!secondary.bases) {
          continue;
        }
        const base = secondary.bases[i];
        while (base > maskBase) {
          maskBase = mask[counter++];
        }
        if (skeleton && skeleton.animTypes && secondary.x && secondary.y && secondary.z && skeleton.animLabels && (base === maskBase || skeleton.animTypes[base] === 0)) {
          this.applyTransform2(secondary.x[i], secondary.y[i], secondary.z[i], skeleton.animLabels[base], skeleton.animTypes[base]);
        }
      }
    }
  }
  applyTransform(id) {
    if (!this.labelVertices || id === -1 || !AnimFrame.instances[id]) {
      return;
    }
    const transform = AnimFrame.instances[id];
    const skeleton = transform.base;
    Model.baseX = 0;
    Model.baseY = 0;
    Model.baseZ = 0;
    for (let i = 0;i < transform.frameLength; i++) {
      if (!transform.bases || !transform.x || !transform.y || !transform.z || !skeleton || !skeleton.animLabels || !skeleton.animTypes) {
        continue;
      }
      const base = transform.bases[i];
      this.applyTransform2(transform.x[i], transform.y[i], transform.z[i], skeleton.animLabels[base], skeleton.animTypes[base]);
    }
  }
  rotateY90() {
    for (let v = 0;v < this.vertexCount; v++) {
      const tmp = this.vertexX[v];
      this.vertexX[v] = this.vertexZ[v];
      this.vertexZ[v] = -tmp;
    }
  }
  rotateX(angle) {
    const sin = Pix3D.sin[angle];
    const cos = Pix3D.cos[angle];
    for (let v = 0;v < this.vertexCount; v++) {
      const tmp = this.vertexY[v] * cos - this.vertexZ[v] * sin >> 16;
      this.vertexZ[v] = this.vertexY[v] * sin + this.vertexZ[v] * cos >> 16;
      this.vertexY[v] = tmp;
    }
  }
  translateModel(y, x, z) {
    for (let v = 0;v < this.vertexCount; v++) {
      this.vertexX[v] += x;
      this.vertexY[v] += y;
      this.vertexZ[v] += z;
    }
  }
  recolor(src, dst) {
    if (!this.faceColor) {
      return;
    }
    for (let f = 0;f < this.faceCount; f++) {
      if (this.faceColor[f] === src) {
        this.faceColor[f] = dst;
      }
    }
  }
  rotateY180() {
    for (let v = 0;v < this.vertexCount; v++) {
      this.vertexZ[v] = -this.vertexZ[v];
    }
    for (let f = 0;f < this.faceCount; f++) {
      const temp = this.faceVertexA[f];
      this.faceVertexA[f] = this.faceVertexC[f];
      this.faceVertexC[f] = temp;
    }
  }
  scale(x, y, z) {
    for (let v = 0;v < this.vertexCount; v++) {
      this.vertexX[v] = this.vertexX[v] * x / 128 | 0;
      this.vertexY[v] = this.vertexY[v] * y / 128 | 0;
      this.vertexZ[v] = this.vertexZ[v] * z / 128 | 0;
    }
  }
  calculateNormals(lightAmbient, lightAttenuation, lightSrcX, lightSrcY, lightSrcZ, applyLighting) {
    const lightMagnitude = Math.sqrt(lightSrcX * lightSrcX + lightSrcY * lightSrcY + lightSrcZ * lightSrcZ) | 0;
    const attenuation = lightAttenuation * lightMagnitude >> 8;
    if (!this.faceColorA || !this.faceColorB || !this.faceColorC) {
      this.faceColorA = new Int32Array(this.faceCount);
      this.faceColorB = new Int32Array(this.faceCount);
      this.faceColorC = new Int32Array(this.faceCount);
    }
    if (!this.vertexNormal) {
      this.vertexNormal = new TypedArray1d(this.vertexCount, null);
      for (let v = 0;v < this.vertexCount; v++) {
        this.vertexNormal[v] = new VertexNormal;
      }
    }
    for (let f = 0;f < this.faceCount; f++) {
      const a = this.faceVertexA[f];
      const b = this.faceVertexB[f];
      const c = this.faceVertexC[f];
      const dxAB = this.vertexX[b] - this.vertexX[a];
      const dyAB = this.vertexY[b] - this.vertexY[a];
      const dzAB = this.vertexZ[b] - this.vertexZ[a];
      const dxAC = this.vertexX[c] - this.vertexX[a];
      const dyAC = this.vertexY[c] - this.vertexY[a];
      const dzAC = this.vertexZ[c] - this.vertexZ[a];
      let nx = dyAB * dzAC - dyAC * dzAB;
      let ny = dzAB * dxAC - dzAC * dxAB;
      let nz = dxAB * dyAC - dxAC * dyAB;
      while (nx > 8192 || ny > 8192 || nz > 8192 || nx < -8192 || ny < -8192 || nz < -8192) {
        nx >>= 1;
        ny >>= 1;
        nz >>= 1;
      }
      let length = Math.sqrt(nx * nx + ny * ny + nz * nz) | 0;
      if (length <= 0) {
        length = 1;
      }
      nx = nx * 256 / length | 0;
      ny = ny * 256 / length | 0;
      nz = nz * 256 / length | 0;
      if (!this.faceInfo || (this.faceInfo[f] & 1) === 0) {
        let n = this.vertexNormal[a];
        if (n) {
          n.x += nx;
          n.y += ny;
          n.z += nz;
          n.w++;
        }
        n = this.vertexNormal[b];
        if (n) {
          n.x += nx;
          n.y += ny;
          n.z += nz;
          n.w++;
        }
        n = this.vertexNormal[c];
        if (n) {
          n.x += nx;
          n.y += ny;
          n.z += nz;
          n.w++;
        }
      } else {
        const lightness = lightAmbient + ((lightSrcX * nx + lightSrcY * ny + lightSrcZ * nz) / (attenuation + (attenuation / 2 | 0)) | 0);
        if (this.faceColor) {
          this.faceColorA[f] = Model.mulColorLightness(this.faceColor[f], lightness, this.faceInfo[f]);
        }
      }
    }
    if (applyLighting) {
      this.applyLighting(lightAmbient, attenuation, lightSrcX, lightSrcY, lightSrcZ);
    } else {
      this.vertexNormalOriginal = new TypedArray1d(this.vertexCount, null);
      for (let v = 0;v < this.vertexCount; v++) {
        const normal = this.vertexNormal[v];
        const copy = new VertexNormal;
        if (normal) {
          copy.x = normal.x;
          copy.y = normal.y;
          copy.z = normal.z;
          copy.w = normal.w;
        }
        this.vertexNormalOriginal[v] = copy;
      }
    }
    if (applyLighting) {
      this.calculateBoundsCylinder();
    } else {
      this.calculateBoundsAABB();
    }
  }
  applyLighting(lightAmbient, lightAttenuation, lightSrcX, lightSrcY, lightSrcZ) {
    for (let f = 0;f < this.faceCount; f++) {
      const a = this.faceVertexA[f];
      const b = this.faceVertexB[f];
      const c = this.faceVertexC[f];
      if (!this.faceInfo && this.faceColor && this.vertexNormal && this.faceColorA && this.faceColorB && this.faceColorC) {
        const color = this.faceColor[f];
        const va = this.vertexNormal[a];
        if (va) {
          this.faceColorA[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * va.x + lightSrcY * va.y + lightSrcZ * va.z) / (lightAttenuation * va.w) | 0), 0);
        }
        const vb = this.vertexNormal[b];
        if (vb) {
          this.faceColorB[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * vb.x + lightSrcY * vb.y + lightSrcZ * vb.z) / (lightAttenuation * vb.w) | 0), 0);
        }
        const vc = this.vertexNormal[c];
        if (vc) {
          this.faceColorC[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * vc.x + lightSrcY * vc.y + lightSrcZ * vc.z) / (lightAttenuation * vc.w) | 0), 0);
        }
      } else if (this.faceInfo && (this.faceInfo[f] & 1) === 0 && this.faceColor && this.vertexNormal && this.faceColorA && this.faceColorB && this.faceColorC) {
        const color = this.faceColor[f];
        const info = this.faceInfo[f];
        const va = this.vertexNormal[a];
        if (va) {
          this.faceColorA[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * va.x + lightSrcY * va.y + lightSrcZ * va.z) / (lightAttenuation * va.w) | 0), info);
        }
        const vb = this.vertexNormal[b];
        if (vb) {
          this.faceColorB[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * vb.x + lightSrcY * vb.y + lightSrcZ * vb.z) / (lightAttenuation * vb.w) | 0), info);
        }
        const vc = this.vertexNormal[c];
        if (vc) {
          this.faceColorC[f] = Model.mulColorLightness(color, lightAmbient + ((lightSrcX * vc.x + lightSrcY * vc.y + lightSrcZ * vc.z) / (lightAttenuation * vc.w) | 0), info);
        }
      }
    }
    this.vertexNormal = null;
    this.vertexNormalOriginal = null;
    this.vertexLabel = null;
    this.faceLabel = null;
    if (this.faceInfo) {
      for (let f = 0;f < this.faceCount; f++) {
        if ((this.faceInfo[f] & 2) === 2) {
          return;
        }
      }
    }
    this.faceColor = null;
  }
  drawSimple(pitch, yaw, roll, eyePitch, eyeX, eyeY, eyeZ) {
    const sinPitch = Pix3D.sin[pitch];
    const cosPitch = Pix3D.cos[pitch];
    const sinYaw = Pix3D.sin[yaw];
    const cosYaw = Pix3D.cos[yaw];
    const sinRoll = Pix3D.sin[roll];
    const cosRoll = Pix3D.cos[roll];
    const sinEyePitch = Pix3D.sin[eyePitch];
    const cosEyePitch = Pix3D.cos[eyePitch];
    const midZ = eyeY * sinEyePitch + eyeZ * cosEyePitch >> 16;
    for (let v = 0;v < this.vertexCount; v++) {
      let x = this.vertexX[v];
      let y = this.vertexY[v];
      let z = this.vertexZ[v];
      let tmp;
      if (roll !== 0) {
        tmp = y * sinRoll + x * cosRoll >> 16;
        y = y * cosRoll - x * sinRoll >> 16;
        x = tmp;
      }
      if (pitch !== 0) {
        tmp = y * cosPitch - z * sinPitch >> 16;
        z = y * sinPitch + z * cosPitch >> 16;
        y = tmp;
      }
      if (yaw !== 0) {
        tmp = z * sinYaw + x * cosYaw >> 16;
        z = z * cosYaw - x * sinYaw >> 16;
        x = tmp;
      }
      x += eyeX;
      y += eyeY;
      z += eyeZ;
      tmp = y * cosEyePitch - z * sinEyePitch >> 16;
      z = y * sinEyePitch + z * cosEyePitch >> 16;
      y = tmp;
      if (Model.vertexScreenX && Model.vertexScreenY && Model.vertexScreenZ) {
        Model.vertexScreenZ[v] = z - midZ;
        Model.vertexScreenX[v] = Pix3D.centerX + ((x << 9) / z | 0);
        Model.vertexScreenY[v] = Pix3D.centerY + ((y << 9) / z | 0);
      }
      if (this.texturedFaceCount > 0 && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        Model.vertexViewSpaceX[v] = x;
        Model.vertexViewSpaceY[v] = y;
        Model.vertexViewSpaceZ[v] = z;
      }
    }
    try {
      this.draw2(false, false, 0);
    } catch (err) {
    }
  }
  draw(yaw, sinEyePitch, cosEyePitch, sinEyeYaw, cosEyeYaw, relativeX, relativeY, relativeZ, typecode) {
    const zPrime = relativeZ * cosEyeYaw - relativeX * sinEyeYaw >> 16;
    const midZ = relativeY * sinEyePitch + zPrime * cosEyePitch >> 16;
    const radiusCosEyePitch = this.radius * cosEyePitch >> 16;
    const maxZ = midZ + radiusCosEyePitch;
    if (maxZ <= 50 || midZ >= 3500) {
      return;
    }
    const midX = relativeZ * sinEyeYaw + relativeX * cosEyeYaw >> 16;
    let leftX = midX - this.radius << 9;
    if ((leftX / maxZ | 0) >= Pix2D.centerX2d) {
      return;
    }
    let rightX = midX + this.radius << 9;
    if ((rightX / maxZ | 0) <= -Pix2D.centerX2d) {
      return;
    }
    const midY = relativeY * cosEyePitch - zPrime * sinEyePitch >> 16;
    const radiusSinEyePitch = this.radius * sinEyePitch >> 16;
    let bottomY = midY + radiusSinEyePitch << 9;
    if ((bottomY / maxZ | 0) <= -Pix2D.centerY2d) {
      return;
    }
    const yPrime = radiusSinEyePitch + (this.maxY * cosEyePitch >> 16);
    let topY = midY - yPrime << 9;
    if ((topY / maxZ | 0) >= Pix2D.centerY2d) {
      return;
    }
    const radiusZ = radiusCosEyePitch + (this.maxY * sinEyePitch >> 16);
    let clipped = midZ - radiusZ <= 50;
    let picking = false;
    if (typecode > 0 && Model.checkHover) {
      let z = midZ - radiusCosEyePitch;
      if (z <= 50) {
        z = 50;
      }
      if (midX > 0) {
        leftX = leftX / maxZ | 0;
        rightX = rightX / z | 0;
      } else {
        rightX = rightX / maxZ | 0;
        leftX = leftX / z | 0;
      }
      if (midY > 0) {
        topY = topY / maxZ | 0;
        bottomY = bottomY / z | 0;
      } else {
        bottomY = bottomY / maxZ | 0;
        topY = topY / z | 0;
      }
      const mouseX = Model.mouseX - Pix3D.centerX;
      const mouseY = Model.mouseY - Pix3D.centerY;
      if (mouseX > leftX && mouseX < rightX && mouseY > topY && mouseY < bottomY) {
        if (this.pickable) {
          Model.picked[Model.pickedCount++] = typecode;
        } else {
          picking = true;
        }
      }
    }
    const centerX = Pix3D.centerX;
    const centerY = Pix3D.centerY;
    let sinYaw = 0;
    let cosYaw = 0;
    if (yaw !== 0) {
      sinYaw = Pix3D.sin[yaw];
      cosYaw = Pix3D.cos[yaw];
    }
    for (let v = 0;v < this.vertexCount; v++) {
      let x = this.vertexX[v];
      let y = this.vertexY[v];
      let z = this.vertexZ[v];
      let temp;
      if (yaw !== 0) {
        temp = z * sinYaw + x * cosYaw >> 16;
        z = z * cosYaw - x * sinYaw >> 16;
        x = temp;
      }
      x += relativeX;
      y += relativeY;
      z += relativeZ;
      temp = z * sinEyeYaw + x * cosEyeYaw >> 16;
      z = z * cosEyeYaw - x * sinEyeYaw >> 16;
      x = temp;
      temp = y * cosEyePitch - z * sinEyePitch >> 16;
      z = y * sinEyePitch + z * cosEyePitch >> 16;
      y = temp;
      if (Model.vertexScreenZ) {
        Model.vertexScreenZ[v] = z - midZ;
      }
      if (z >= 50 && Model.vertexScreenX && Model.vertexScreenY) {
        Model.vertexScreenX[v] = centerX + ((x << 9) / z | 0);
        Model.vertexScreenY[v] = centerY + ((y << 9) / z | 0);
      } else if (Model.vertexScreenX) {
        Model.vertexScreenX[v] = -5000;
        clipped = true;
      }
      if ((clipped || this.texturedFaceCount > 0) && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        Model.vertexViewSpaceX[v] = x;
        Model.vertexViewSpaceY[v] = y;
        Model.vertexViewSpaceZ[v] = z;
      }
    }
    try {
      this.draw2(clipped, picking, typecode);
    } catch (err) {
    }
  }
  draw2(clipped, picking, typecode, wireframe = false) {
    if (Model.checkHoverFace) {
      this.pickedFace = -1;
      this.pickedFaceDepth = -1;
    }
    for (let depth = 0;depth < this.maxDepth; depth++) {
      if (Model.tmpDepthFaceCount) {
        Model.tmpDepthFaceCount[depth] = 0;
      }
    }
    for (let f = 0;f < this.faceCount; f++) {
      if (this.faceInfo && this.faceInfo[f] === -1) {
        continue;
      }
      if (Model.vertexScreenX && Model.vertexScreenY && Model.vertexScreenZ && Model.tmpDepthFaces && Model.tmpDepthFaceCount) {
        const a = this.faceVertexA[f];
        const b = this.faceVertexB[f];
        const c = this.faceVertexC[f];
        const xA = Model.vertexScreenX[a];
        const xB = Model.vertexScreenX[b];
        const xC = Model.vertexScreenX[c];
        const yA = Model.vertexScreenY[a];
        const yB = Model.vertexScreenY[b];
        const yC = Model.vertexScreenY[c];
        const zA = Model.vertexScreenZ[a];
        const zB = Model.vertexScreenZ[b];
        const zC = Model.vertexScreenZ[c];
        if (clipped && (xA === -5000 || xB === -5000 || xC === -5000)) {
          if (Model.faceNearClipped) {
            Model.faceNearClipped[f] = true;
          }
          if (Model.tmpDepthFaces && Model.tmpDepthFaceCount) {
            const depthAverage = ((zA + zB + zC) / 3 | 0) + this.minDepth;
            Model.tmpDepthFaces[depthAverage][Model.tmpDepthFaceCount[depthAverage]++] = f;
          }
        } else {
          if (picking && this.pointWithinTriangle(Model.mouseX, Model.mouseY, yA, yB, yC, xA, xB, xC)) {
            Model.picked[Model.pickedCount++] = typecode;
            picking = false;
          }
          const dxAB = xA - xB;
          const dyAB = yA - yB;
          const dxCB = xC - xB;
          const dyCB = yC - yB;
          if (dxAB * dyCB - dyAB * dxCB <= 0) {
            continue;
          }
          if (Model.faceNearClipped) {
            Model.faceNearClipped[f] = false;
          }
          if (Model.faceClippedX) {
            Model.faceClippedX[f] = xA < 0 || xB < 0 || xC < 0 || xA > Pix2D.boundX || xB > Pix2D.boundX || xC > Pix2D.boundX;
          }
          if (Model.tmpDepthFaces && Model.tmpDepthFaceCount) {
            const depthAverage = ((zA + zB + zC) / 3 | 0) + this.minDepth;
            Model.tmpDepthFaces[depthAverage][Model.tmpDepthFaceCount[depthAverage]++] = f;
            if (Model.checkHoverFace && this.pointWithinTriangle(Model.mouseX, Model.mouseY, yA, yB, yC, xA, xB, xC) && this.pickedFaceDepth < depthAverage) {
              this.pickedFace = f;
              this.pickedFaceDepth = depthAverage;
            }
          }
        }
      }
    }
    if (!this.facePriority && Model.tmpDepthFaceCount) {
      for (let depth = this.maxDepth - 1;depth >= 0; depth--) {
        const count = Model.tmpDepthFaceCount[depth];
        if (count <= 0) {
          continue;
        }
        if (Model.tmpDepthFaces) {
          const faces = Model.tmpDepthFaces[depth];
          for (let f = 0;f < count; f++) {
            try {
              this.drawFace(faces[f], wireframe);
            } catch (e) {
            }
          }
        }
      }
      return;
    }
    for (let priority = 0;priority < 12; priority++) {
      if (Model.tmpPriorityFaceCount && Model.tmpPriorityDepthSum) {
        Model.tmpPriorityFaceCount[priority] = 0;
        Model.tmpPriorityDepthSum[priority] = 0;
      }
    }
    if (Model.tmpDepthFaceCount) {
      for (let depth = this.maxDepth - 1;depth >= 0; depth--) {
        const faceCount = Model.tmpDepthFaceCount[depth];
        if (faceCount > 0 && Model.tmpDepthFaces) {
          const faces = Model.tmpDepthFaces[depth];
          for (let i = 0;i < faceCount; i++) {
            if (this.facePriority && Model.tmpPriorityFaceCount && Model.tmpPriorityFaces) {
              const priorityDepth = faces[i];
              const priorityFace = this.facePriority[priorityDepth];
              const priorityFaceCount = Model.tmpPriorityFaceCount[priorityFace]++;
              Model.tmpPriorityFaces[priorityFace][priorityFaceCount] = priorityDepth;
              if (priorityFace < 10 && Model.tmpPriorityDepthSum) {
                Model.tmpPriorityDepthSum[priorityFace] += depth;
              } else if (priorityFace === 10 && Model.tmpPriority10FaceDepth) {
                Model.tmpPriority10FaceDepth[priorityFaceCount] = depth;
              } else if (Model.tmpPriority11FaceDepth) {
                Model.tmpPriority11FaceDepth[priorityFaceCount] = depth;
              }
            }
          }
        }
      }
    }
    let averagePriorityDepthSum1_2 = 0;
    if (Model.tmpPriorityFaceCount && Model.tmpPriorityDepthSum && (Model.tmpPriorityFaceCount[1] > 0 || Model.tmpPriorityFaceCount[2] > 0)) {
      averagePriorityDepthSum1_2 = (Model.tmpPriorityDepthSum[1] + Model.tmpPriorityDepthSum[2]) / (Model.tmpPriorityFaceCount[1] + Model.tmpPriorityFaceCount[2]) | 0;
    }
    let averagePriorityDepthSum3_4 = 0;
    if (Model.tmpPriorityFaceCount && Model.tmpPriorityDepthSum && (Model.tmpPriorityFaceCount[3] > 0 || Model.tmpPriorityFaceCount[4] > 0)) {
      averagePriorityDepthSum3_4 = (Model.tmpPriorityDepthSum[3] + Model.tmpPriorityDepthSum[4]) / (Model.tmpPriorityFaceCount[3] + Model.tmpPriorityFaceCount[4]) | 0;
    }
    let averagePriorityDepthSum6_8 = 0;
    if (Model.tmpPriorityFaceCount && Model.tmpPriorityDepthSum && (Model.tmpPriorityFaceCount[6] > 0 || Model.tmpPriorityFaceCount[8] > 0)) {
      averagePriorityDepthSum6_8 = (Model.tmpPriorityDepthSum[6] + Model.tmpPriorityDepthSum[8]) / (Model.tmpPriorityFaceCount[6] + Model.tmpPriorityFaceCount[8]) | 0;
    }
    if (Model.tmpPriorityFaceCount && Model.tmpPriorityFaces) {
      let priorityFace = 0;
      let priorityFaceCount = Model.tmpPriorityFaceCount[10];
      let priorityFaces = Model.tmpPriorityFaces[10];
      let priorityFaceDepths = Model.tmpPriority10FaceDepth;
      if (priorityFace === priorityFaceCount) {
        priorityFace = 0;
        priorityFaceCount = Model.tmpPriorityFaceCount[11];
        priorityFaces = Model.tmpPriorityFaces[11];
        priorityFaceDepths = Model.tmpPriority11FaceDepth;
      }
      let priorityDepth;
      if (priorityFace < priorityFaceCount && priorityFaceDepths) {
        priorityDepth = priorityFaceDepths[priorityFace];
      } else {
        priorityDepth = -1000;
      }
      for (let priority = 0;priority < 10; priority++) {
        while (priority === 0 && priorityDepth > averagePriorityDepthSum1_2) {
          try {
            this.drawFace(priorityFaces[priorityFace++], wireframe);
            if (priorityFace === priorityFaceCount && priorityFaces !== Model.tmpPriorityFaces[11]) {
              priorityFace = 0;
              priorityFaceCount = Model.tmpPriorityFaceCount[11];
              priorityFaces = Model.tmpPriorityFaces[11];
              priorityFaceDepths = Model.tmpPriority11FaceDepth;
            }
            if (priorityFace < priorityFaceCount && priorityFaceDepths) {
              priorityDepth = priorityFaceDepths[priorityFace];
            } else {
              priorityDepth = -1000;
            }
          } catch (e) {
          }
        }
        while (priority === 3 && priorityDepth > averagePriorityDepthSum3_4) {
          try {
            this.drawFace(priorityFaces[priorityFace++], wireframe);
            if (priorityFace === priorityFaceCount && priorityFaces !== Model.tmpPriorityFaces[11]) {
              priorityFace = 0;
              priorityFaceCount = Model.tmpPriorityFaceCount[11];
              priorityFaces = Model.tmpPriorityFaces[11];
              priorityFaceDepths = Model.tmpPriority11FaceDepth;
            }
            if (priorityFace < priorityFaceCount && priorityFaceDepths) {
              priorityDepth = priorityFaceDepths[priorityFace];
            } else {
              priorityDepth = -1000;
            }
          } catch (e) {
          }
        }
        while (priority === 5 && priorityDepth > averagePriorityDepthSum6_8) {
          try {
            this.drawFace(priorityFaces[priorityFace++], wireframe);
            if (priorityFace === priorityFaceCount && priorityFaces !== Model.tmpPriorityFaces[11]) {
              priorityFace = 0;
              priorityFaceCount = Model.tmpPriorityFaceCount[11];
              priorityFaces = Model.tmpPriorityFaces[11];
              priorityFaceDepths = Model.tmpPriority11FaceDepth;
            }
            if (priorityFace < priorityFaceCount && priorityFaceDepths) {
              priorityDepth = priorityFaceDepths[priorityFace];
            } else {
              priorityDepth = -1000;
            }
          } catch (e) {
          }
        }
        const count = Model.tmpPriorityFaceCount[priority];
        const faces = Model.tmpPriorityFaces[priority];
        for (let i = 0;i < count; i++) {
          try {
            this.drawFace(faces[i], wireframe);
          } catch (e) {
          }
        }
      }
      while (priorityDepth !== -1000) {
        try {
          this.drawFace(priorityFaces[priorityFace++], wireframe);
          if (priorityFace === priorityFaceCount && priorityFaces !== Model.tmpPriorityFaces[11]) {
            priorityFace = 0;
            priorityFaces = Model.tmpPriorityFaces[11];
            priorityFaceCount = Model.tmpPriorityFaceCount[11];
            priorityFaceDepths = Model.tmpPriority11FaceDepth;
          }
          if (priorityFace < priorityFaceCount && priorityFaceDepths) {
            priorityDepth = priorityFaceDepths[priorityFace];
          } else {
            priorityDepth = -1000;
          }
        } catch (e) {
        }
      }
    }
  }
  drawFace(face, wireframe = false) {
    if (Model.faceNearClipped && Model.faceNearClipped[face]) {
      this.drawNearClippedFace(face, wireframe);
      return;
    }
    const a = this.faceVertexA[face];
    const b = this.faceVertexB[face];
    const c = this.faceVertexC[face];
    if (Model.faceClippedX) {
      Pix3D.clipX = Model.faceClippedX[face];
    }
    if (!this.faceAlpha) {
      Pix3D.alpha = 0;
    } else {
      Pix3D.alpha = this.faceAlpha[face];
    }
    let type;
    if (!this.faceInfo) {
      type = 0;
    } else {
      type = this.faceInfo[face] & 3;
    }
    if (wireframe && Model.vertexScreenX && Model.vertexScreenY && this.faceColorA && this.faceColorB && this.faceColorC) {
      Pix3D.drawLine(Model.vertexScreenX[a], Model.vertexScreenY[a], Model.vertexScreenX[b], Model.vertexScreenY[b], Pix3D.hslPal[this.faceColorA[face]]);
      Pix3D.drawLine(Model.vertexScreenX[b], Model.vertexScreenY[b], Model.vertexScreenX[c], Model.vertexScreenY[c], Pix3D.hslPal[this.faceColorB[face]]);
      Pix3D.drawLine(Model.vertexScreenX[c], Model.vertexScreenY[c], Model.vertexScreenX[a], Model.vertexScreenY[a], Pix3D.hslPal[this.faceColorC[face]]);
    } else if (type === 0 && this.faceColorA && this.faceColorB && this.faceColorC && Model.vertexScreenX && Model.vertexScreenY) {
      Pix3D.fillGouraudTriangle(Model.vertexScreenX[a], Model.vertexScreenX[b], Model.vertexScreenX[c], Model.vertexScreenY[a], Model.vertexScreenY[b], Model.vertexScreenY[c], this.faceColorA[face], this.faceColorB[face], this.faceColorC[face]);
    } else if (type === 1 && this.faceColorA && Model.vertexScreenX && Model.vertexScreenY) {
      Pix3D.fillTriangle(Model.vertexScreenX[a], Model.vertexScreenX[b], Model.vertexScreenX[c], Model.vertexScreenY[a], Model.vertexScreenY[b], Model.vertexScreenY[c], Pix3D.hslPal[this.faceColorA[face]]);
    } else if (type === 2 && this.faceInfo && this.faceColor && this.faceColorA && this.faceColorB && this.faceColorC && Model.vertexScreenX && Model.vertexScreenY && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
      const texturedFace = this.faceInfo[face] >> 2;
      const tA = this.texturedVertexA[texturedFace];
      const tB = this.texturedVertexB[texturedFace];
      const tC = this.texturedVertexC[texturedFace];
      Pix3D.fillTexturedTriangle(Model.vertexScreenX[a], Model.vertexScreenX[b], Model.vertexScreenX[c], Model.vertexScreenY[a], Model.vertexScreenY[b], Model.vertexScreenY[c], this.faceColorA[face], this.faceColorB[face], this.faceColorC[face], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
    } else if (type === 3 && this.faceInfo && this.faceColor && this.faceColorA && Model.vertexScreenX && Model.vertexScreenY && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
      const texturedFace = this.faceInfo[face] >> 2;
      const tA = this.texturedVertexA[texturedFace];
      const tB = this.texturedVertexB[texturedFace];
      const tC = this.texturedVertexC[texturedFace];
      Pix3D.fillTexturedTriangle(Model.vertexScreenX[a], Model.vertexScreenX[b], Model.vertexScreenX[c], Model.vertexScreenY[a], Model.vertexScreenY[b], Model.vertexScreenY[c], this.faceColorA[face], this.faceColorA[face], this.faceColorA[face], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
    }
  }
  drawNearClippedFace(face, wireframe = false) {
    let elements = 0;
    if (Model.vertexViewSpaceZ) {
      const centerX = Pix3D.centerX;
      const centerY = Pix3D.centerY;
      const a = this.faceVertexA[face];
      const b = this.faceVertexB[face];
      const c = this.faceVertexC[face];
      const zA = Model.vertexViewSpaceZ[a];
      const zB = Model.vertexViewSpaceZ[b];
      const zC = Model.vertexViewSpaceZ[c];
      if (zA >= 50 && Model.vertexScreenX && Model.vertexScreenY && this.faceColorA) {
        Model.clippedX[elements] = Model.vertexScreenX[a];
        Model.clippedY[elements] = Model.vertexScreenY[a];
        Model.clippedColor[elements++] = this.faceColorA[face];
      } else if (Model.vertexViewSpaceX && Model.vertexViewSpaceY && this.faceColorA) {
        const xA = Model.vertexViewSpaceX[a];
        const yA = Model.vertexViewSpaceY[a];
        const colorA = this.faceColorA[face];
        if (zC >= 50 && this.faceColorC) {
          const scalar = (50 - zA) * Pix3D.reciprocal16[zC - zA];
          Model.clippedX[elements] = centerX + ((xA + ((Model.vertexViewSpaceX[c] - xA) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yA + ((Model.vertexViewSpaceY[c] - yA) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorA + ((this.faceColorC[face] - colorA) * scalar >> 16);
        }
        if (zB >= 50 && this.faceColorB) {
          const scalar = (50 - zA) * Pix3D.reciprocal16[zB - zA];
          Model.clippedX[elements] = centerX + ((xA + ((Model.vertexViewSpaceX[b] - xA) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yA + ((Model.vertexViewSpaceY[b] - yA) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorA + ((this.faceColorB[face] - colorA) * scalar >> 16);
        }
      }
      if (zB >= 50 && Model.vertexScreenX && Model.vertexScreenY && this.faceColorB) {
        Model.clippedX[elements] = Model.vertexScreenX[b];
        Model.clippedY[elements] = Model.vertexScreenY[b];
        Model.clippedColor[elements++] = this.faceColorB[face];
      } else if (Model.vertexViewSpaceX && Model.vertexViewSpaceY && this.faceColorB) {
        const xB = Model.vertexViewSpaceX[b];
        const yB = Model.vertexViewSpaceY[b];
        const colorB = this.faceColorB[face];
        if (zA >= 50 && this.faceColorA) {
          const scalar = (50 - zB) * Pix3D.reciprocal16[zA - zB];
          Model.clippedX[elements] = centerX + ((xB + ((Model.vertexViewSpaceX[a] - xB) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yB + ((Model.vertexViewSpaceY[a] - yB) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorB + ((this.faceColorA[face] - colorB) * scalar >> 16);
        }
        if (zC >= 50 && this.faceColorC) {
          const scalar = (50 - zB) * Pix3D.reciprocal16[zC - zB];
          Model.clippedX[elements] = centerX + ((xB + ((Model.vertexViewSpaceX[c] - xB) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yB + ((Model.vertexViewSpaceY[c] - yB) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorB + ((this.faceColorC[face] - colorB) * scalar >> 16);
        }
      }
      if (zC >= 50 && Model.vertexScreenX && Model.vertexScreenY && this.faceColorC) {
        Model.clippedX[elements] = Model.vertexScreenX[c];
        Model.clippedY[elements] = Model.vertexScreenY[c];
        Model.clippedColor[elements++] = this.faceColorC[face];
      } else if (Model.vertexViewSpaceX && Model.vertexViewSpaceY && this.faceColorC) {
        const xC = Model.vertexViewSpaceX[c];
        const yC = Model.vertexViewSpaceY[c];
        const colorC = this.faceColorC[face];
        if (zB >= 50 && this.faceColorB) {
          const scalar = (50 - zC) * Pix3D.reciprocal16[zB - zC];
          Model.clippedX[elements] = centerX + ((xC + ((Model.vertexViewSpaceX[b] - xC) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yC + ((Model.vertexViewSpaceY[b] - yC) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorC + ((this.faceColorB[face] - colorC) * scalar >> 16);
        }
        if (zA >= 50 && this.faceColorA) {
          const scalar = (50 - zC) * Pix3D.reciprocal16[zA - zC];
          Model.clippedX[elements] = centerX + ((xC + ((Model.vertexViewSpaceX[a] - xC) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedY[elements] = centerY + ((yC + ((Model.vertexViewSpaceY[a] - yC) * scalar >> 16) << 9) / 50 | 0);
          Model.clippedColor[elements++] = colorC + ((this.faceColorA[face] - colorC) * scalar >> 16);
        }
      }
    }
    const x0 = Model.clippedX[0];
    const x1 = Model.clippedX[1];
    const x2 = Model.clippedX[2];
    const y0 = Model.clippedY[0];
    const y1 = Model.clippedY[1];
    const y2 = Model.clippedY[2];
    if ((x0 - x1) * (y2 - y1) - (y0 - y1) * (x2 - x1) <= 0) {
      return;
    }
    Pix3D.clipX = false;
    if (elements === 3) {
      if (x0 < 0 || x1 < 0 || x2 < 0 || x0 > Pix2D.boundX || x1 > Pix2D.boundX || x2 > Pix2D.boundX) {
        Pix3D.clipX = true;
      }
      let type;
      if (!this.faceInfo) {
        type = 0;
      } else {
        type = this.faceInfo[face] & 3;
      }
      if (wireframe) {
        Pix3D.drawLine(x0, x1, y0, y1, Model.clippedColor[0]);
        Pix3D.drawLine(x1, x2, y1, y2, Model.clippedColor[1]);
        Pix3D.drawLine(x2, x0, y2, y0, Model.clippedColor[2]);
      } else if (type === 0) {
        Pix3D.fillGouraudTriangle(x0, x1, x2, y0, y1, y2, Model.clippedColor[0], Model.clippedColor[1], Model.clippedColor[2]);
      } else if (type === 1 && this.faceColorA) {
        Pix3D.fillTriangle(x0, x1, x2, y0, y1, y2, Pix3D.hslPal[this.faceColorA[face]]);
      } else if (type === 2 && this.faceInfo && this.faceColor && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        const texturedFace = this.faceInfo[face] >> 2;
        const tA = this.texturedVertexA[texturedFace];
        const tB = this.texturedVertexB[texturedFace];
        const tC = this.texturedVertexC[texturedFace];
        Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, Model.clippedColor[0], Model.clippedColor[1], Model.clippedColor[2], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
      } else if (type === 3 && this.faceInfo && this.faceColor && this.faceColorA && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        const texturedFace = this.faceInfo[face] >> 2;
        const tA = this.texturedVertexA[texturedFace];
        const tB = this.texturedVertexB[texturedFace];
        const tC = this.texturedVertexC[texturedFace];
        Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, this.faceColorA[face], this.faceColorA[face], this.faceColorA[face], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
      }
    } else if (elements === 4) {
      if (x0 < 0 || x1 < 0 || x2 < 0 || x0 > Pix2D.boundX || x1 > Pix2D.boundX || x2 > Pix2D.boundX || Model.clippedX[3] < 0 || Model.clippedX[3] > Pix2D.boundX) {
        Pix3D.clipX = true;
      }
      let type;
      if (!this.faceInfo) {
        type = 0;
      } else {
        type = this.faceInfo[face] & 3;
      }
      if (wireframe) {
        Pix3D.drawLine(x0, x1, y0, y1, Model.clippedColor[0]);
        Pix3D.drawLine(x1, x2, y1, y2, Model.clippedColor[1]);
        Pix3D.drawLine(x2, Model.clippedX[3], y2, Model.clippedY[3], Model.clippedColor[2]);
        Pix3D.drawLine(Model.clippedX[3], x0, Model.clippedY[3], y0, Model.clippedColor[3]);
      } else if (type === 0) {
        Pix3D.fillGouraudTriangle(x0, x1, x2, y0, y1, y2, Model.clippedColor[0], Model.clippedColor[1], Model.clippedColor[2]);
        Pix3D.fillGouraudTriangle(x0, x2, Model.clippedX[3], y0, y2, Model.clippedY[3], Model.clippedColor[0], Model.clippedColor[2], Model.clippedColor[3]);
      } else if (type === 1) {
        if (this.faceColorA) {
          const colorA = Pix3D.hslPal[this.faceColorA[face]];
          Pix3D.fillTriangle(x0, x1, x2, y0, y1, y2, colorA);
          Pix3D.fillTriangle(x0, x2, Model.clippedX[3], y0, y2, Model.clippedY[3], colorA);
        }
      } else if (type === 2 && this.faceInfo && this.faceColor && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        const texturedFace = this.faceInfo[face] >> 2;
        const tA = this.texturedVertexA[texturedFace];
        const tB = this.texturedVertexB[texturedFace];
        const tC = this.texturedVertexC[texturedFace];
        Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, Model.clippedColor[0], Model.clippedColor[1], Model.clippedColor[2], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
        Pix3D.fillTexturedTriangle(x0, x2, Model.clippedX[3], y0, y2, Model.clippedY[3], Model.clippedColor[0], Model.clippedColor[2], Model.clippedColor[3], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
      } else if (type === 3 && this.faceInfo && this.faceColor && this.faceColorA && Model.vertexViewSpaceX && Model.vertexViewSpaceY && Model.vertexViewSpaceZ) {
        const texturedFace = this.faceInfo[face] >> 2;
        const tA = this.texturedVertexA[texturedFace];
        const tB = this.texturedVertexB[texturedFace];
        const tC = this.texturedVertexC[texturedFace];
        Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, this.faceColorA[face], this.faceColorA[face], this.faceColorA[face], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
        Pix3D.fillTexturedTriangle(x0, x2, Model.clippedX[3], y0, y2, Model.clippedY[3], this.faceColorA[face], this.faceColorA[face], this.faceColorA[face], Model.vertexViewSpaceX[tA], Model.vertexViewSpaceY[tA], Model.vertexViewSpaceZ[tA], Model.vertexViewSpaceX[tB], Model.vertexViewSpaceX[tC], Model.vertexViewSpaceY[tB], Model.vertexViewSpaceY[tC], Model.vertexViewSpaceZ[tB], Model.vertexViewSpaceZ[tC], this.faceColor[face]);
      }
    }
  }
  applyTransform2(x, y, z, labels, type) {
    if (!labels) {
      return;
    }
    const labelCount = labels.length;
    if (type === 0) {
      let count = 0;
      Model.baseX = 0;
      Model.baseY = 0;
      Model.baseZ = 0;
      for (let g = 0;g < labelCount; g++) {
        if (!this.labelVertices) {
          continue;
        }
        const label = labels[g];
        if (label < this.labelVertices.length) {
          const vertices = this.labelVertices[label];
          if (vertices) {
            for (let i = 0;i < vertices.length; i++) {
              const v = vertices[i];
              Model.baseX += this.vertexX[v];
              Model.baseY += this.vertexY[v];
              Model.baseZ += this.vertexZ[v];
              count++;
            }
          }
        }
      }
      if (count > 0) {
        Model.baseX = (Model.baseX / count | 0) + x;
        Model.baseY = (Model.baseY / count | 0) + y;
        Model.baseZ = (Model.baseZ / count | 0) + z;
      } else {
        Model.baseX = x;
        Model.baseY = y;
        Model.baseZ = z;
      }
    } else if (type === 1) {
      for (let g = 0;g < labelCount; g++) {
        const group = labels[g];
        if (!this.labelVertices || group >= this.labelVertices.length) {
          continue;
        }
        const vertices = this.labelVertices[group];
        if (vertices) {
          for (let i = 0;i < vertices.length; i++) {
            const v = vertices[i];
            this.vertexX[v] += x;
            this.vertexY[v] += y;
            this.vertexZ[v] += z;
          }
        }
      }
    } else if (type === 2) {
      for (let g = 0;g < labelCount; g++) {
        const label = labels[g];
        if (!this.labelVertices || label >= this.labelVertices.length) {
          continue;
        }
        const vertices = this.labelVertices[label];
        if (vertices) {
          for (let i = 0;i < vertices.length; i++) {
            const v = vertices[i];
            this.vertexX[v] -= Model.baseX;
            this.vertexY[v] -= Model.baseY;
            this.vertexZ[v] -= Model.baseZ;
            const pitch = (x & 255) * 8;
            const yaw = (y & 255) * 8;
            const roll = (z & 255) * 8;
            let sin;
            let cos;
            if (roll !== 0) {
              sin = Pix3D.sin[roll];
              cos = Pix3D.cos[roll];
              const x_ = this.vertexY[v] * sin + this.vertexX[v] * cos >> 16;
              this.vertexY[v] = this.vertexY[v] * cos - this.vertexX[v] * sin >> 16;
              this.vertexX[v] = x_;
            }
            if (pitch !== 0) {
              sin = Pix3D.sin[pitch];
              cos = Pix3D.cos[pitch];
              const y_ = this.vertexY[v] * cos - this.vertexZ[v] * sin >> 16;
              this.vertexZ[v] = this.vertexY[v] * sin + this.vertexZ[v] * cos >> 16;
              this.vertexY[v] = y_;
            }
            if (yaw !== 0) {
              sin = Pix3D.sin[yaw];
              cos = Pix3D.cos[yaw];
              const x_ = this.vertexZ[v] * sin + this.vertexX[v] * cos >> 16;
              this.vertexZ[v] = this.vertexZ[v] * cos - this.vertexX[v] * sin >> 16;
              this.vertexX[v] = x_;
            }
            this.vertexX[v] += Model.baseX;
            this.vertexY[v] += Model.baseY;
            this.vertexZ[v] += Model.baseZ;
          }
        }
      }
    } else if (type === 3) {
      for (let g = 0;g < labelCount; g++) {
        const label = labels[g];
        if (!this.labelVertices || label >= this.labelVertices.length) {
          continue;
        }
        const vertices = this.labelVertices[label];
        if (vertices) {
          for (let i = 0;i < vertices.length; i++) {
            const v = vertices[i];
            this.vertexX[v] -= Model.baseX;
            this.vertexY[v] -= Model.baseY;
            this.vertexZ[v] -= Model.baseZ;
            this.vertexX[v] = this.vertexX[v] * x / 128 | 0;
            this.vertexY[v] = this.vertexY[v] * y / 128 | 0;
            this.vertexZ[v] = this.vertexZ[v] * z / 128 | 0;
            this.vertexX[v] += Model.baseX;
            this.vertexY[v] += Model.baseY;
            this.vertexZ[v] += Model.baseZ;
          }
        }
      }
    } else if (type === 5 && this.labelFaces && this.faceAlpha) {
      for (let g = 0;g < labelCount; g++) {
        const label = labels[g];
        if (label >= this.labelFaces.length) {
          continue;
        }
        const triangles = this.labelFaces[label];
        if (triangles) {
          for (let i = 0;i < triangles.length; i++) {
            const t = triangles[i];
            this.faceAlpha[t] += x * 8;
            if (this.faceAlpha[t] < 0) {
              this.faceAlpha[t] = 0;
            }
            if (this.faceAlpha[t] > 255) {
              this.faceAlpha[t] = 255;
            }
          }
        }
      }
    }
  }
  calculateBoundsAABB() {
    this.maxY = 0;
    this.radius = 0;
    this.minY = 0;
    this.minX = 999999;
    this.maxX = -999999;
    this.maxZ = -99999;
    this.minZ = 99999;
    for (let v = 0;v < this.vertexCount; v++) {
      const x = this.vertexX[v];
      const y = this.vertexY[v];
      const z = this.vertexZ[v];
      if (x < this.minX) {
        this.minX = x;
      }
      if (x > this.maxX) {
        this.maxX = x;
      }
      if (z < this.minZ) {
        this.minZ = z;
      }
      if (z > this.maxZ) {
        this.maxZ = z;
      }
      if (-y > this.maxY) {
        this.maxY = -y;
      }
      if (y > this.minY) {
        this.minY = y;
      }
      const radiusSqr = x * x + z * z;
      if (radiusSqr > this.radius) {
        this.radius = radiusSqr;
      }
    }
    this.radius = Math.sqrt(this.radius) | 0;
    this.minDepth = Math.sqrt(this.radius * this.radius + this.maxY * this.maxY) | 0;
    this.maxDepth = this.minDepth + (Math.sqrt(this.radius * this.radius + this.minY * this.minY) | 0);
  }
  pointWithinTriangle(x, y, yA, yB, yC, xA, xB, xC) {
    if (y < yA && y < yB && y < yC) {
      return false;
    } else if (y > yA && y > yB && y > yC) {
      return false;
    } else if (x < xA && x < xB && x < xC) {
      return false;
    } else {
      return x <= xA || x <= xB || x <= xC;
    }
  }
  drawFaceOutline(face) {
    if (!Model.vertexScreenX || !Model.vertexScreenY || !this.faceColorA || !this.faceColorB || !this.faceColorC) {
      return;
    }
    const a = this.faceVertexA[face];
    const b = this.faceVertexB[face];
    const c = this.faceVertexC[face];
    Pix3D.drawLine(Model.vertexScreenX[a], Model.vertexScreenY[a], Model.vertexScreenX[b], Model.vertexScreenY[b], Pix3D.hslPal[1000]);
    Pix3D.drawLine(Model.vertexScreenX[b], Model.vertexScreenY[b], Model.vertexScreenX[c], Model.vertexScreenY[c], Pix3D.hslPal[1000]);
    Pix3D.drawLine(Model.vertexScreenX[c], Model.vertexScreenY[c], Model.vertexScreenX[a], Model.vertexScreenY[a], Pix3D.hslPal[1000]);
  }
}

// src/config/LocType.ts
class LocType extends ConfigType {
  static totalCount = 0;
  static typeCache = null;
  static dat = null;
  static offsets = null;
  static cachePos = 0;
  static modelCacheStatic = new LruCache(500);
  static modelCacheDynamic = new LruCache(30);
  static unpack(config) {
    this.dat = new Packet(config.read("loc.dat"));
    const idx = new Packet(config.read("loc.idx"));
    this.totalCount = idx.g2();
    this.offsets = new Int32Array(this.totalCount);
    let offset = 2;
    for (let id = 0;id < this.totalCount; id++) {
      this.offsets[id] = offset;
      offset += idx.g2();
    }
    this.typeCache = new TypedArray1d(10, null);
    for (let id = 0;id < 10; id++) {
      this.typeCache[id] = new LocType(-1);
    }
  }
  static get(id) {
    if (!this.typeCache || !this.offsets || !this.dat) {
      throw new Error;
    }
    for (let i = 0;i < 10; i++) {
      const type = this.typeCache[i];
      if (!type) {
        continue;
      }
      if (type.id === id) {
        return type;
      }
    }
    this.cachePos = (this.cachePos + 1) % 10;
    const loc = this.typeCache[this.cachePos];
    this.dat.pos = this.offsets[id];
    loc.id = id;
    loc.reset();
    loc.unpackType(this.dat);
    if (!loc.shapes) {
      loc.shapes = new Int32Array(1);
    }
    if (loc.active2 === -1 && loc.shapes) {
      loc.locActive = loc.shapes.length > 0 && loc.shapes[0] === LocShape.CENTREPIECE_STRAIGHT.id;
      if (loc.op) {
        loc.locActive = true;
      }
    }
    return loc;
  }
  models = null;
  shapes = null;
  name = null;
  desc = null;
  recol_s = null;
  recol_d = null;
  width = 1;
  length = 1;
  blockwalk = true;
  blockrange = true;
  locActive = false;
  active2 = -1;
  hillskew = false;
  sharelight = false;
  occlude = false;
  anim = -1;
  disposeAlpha = false;
  wallwidth = 16;
  ambient = 0;
  contrast = 0;
  op = null;
  mapfunction = -1;
  mapscene = -1;
  mirror = false;
  shadow = true;
  resizex = 128;
  resizey = 128;
  resizez = 128;
  forceapproach = 0;
  offsetx = 0;
  offsety = 0;
  offsetz = 0;
  forcedecor = false;
  unpack(code, dat) {
    if (code === 1) {
      const count = dat.g1();
      this.models = new Int32Array(count);
      this.shapes = new Int32Array(count);
      for (let i = 0;i < count; i++) {
        this.models[i] = dat.g2();
        this.shapes[i] = dat.g1();
      }
    } else if (code === 2) {
      this.name = dat.gjstr();
    } else if (code === 3) {
      this.desc = dat.gjstr();
    } else if (code === 14) {
      this.width = dat.g1();
    } else if (code === 15) {
      this.length = dat.g1();
    } else if (code === 17) {
      this.blockwalk = false;
    } else if (code === 18) {
      this.blockrange = false;
    } else if (code === 19) {
      this.active2 = dat.g1();
      if (this.active2 === 1) {
        this.locActive = true;
      }
    } else if (code === 21) {
      this.hillskew = true;
    } else if (code === 22) {
      this.sharelight = true;
    } else if (code === 23) {
      this.occlude = true;
    } else if (code === 24) {
      this.anim = dat.g2();
      if (this.anim === 65535) {
        this.anim = -1;
      }
    } else if (code === 25) {
      this.disposeAlpha = true;
    } else if (code === 28) {
      this.wallwidth = dat.g1();
    } else if (code === 29) {
      this.ambient = dat.g1b();
    } else if (code === 39) {
      this.contrast = dat.g1b();
    } else if (code >= 30 && code < 39) {
      if (!this.op) {
        this.op = new TypedArray1d(5, null);
      }
      this.op[code - 30] = dat.gjstr();
      if (this.op[code - 30]?.toLowerCase() === "hidden") {
        this.op[code - 30] = null;
      }
    } else if (code === 40) {
      const count = dat.g1();
      this.recol_s = new Uint16Array(count);
      this.recol_d = new Uint16Array(count);
      for (let i = 0;i < count; i++) {
        this.recol_s[i] = dat.g2();
        this.recol_d[i] = dat.g2();
      }
    } else if (code === 60) {
      this.mapfunction = dat.g2();
    } else if (code === 62) {
      this.mirror = true;
    } else if (code === 64) {
      this.shadow = false;
    } else if (code === 65) {
      this.resizex = dat.g2();
    } else if (code === 66) {
      this.resizey = dat.g2();
    } else if (code === 67) {
      this.resizez = dat.g2();
    } else if (code === 68) {
      this.mapscene = dat.g2();
    } else if (code === 69) {
      this.forceapproach = dat.g1();
    } else if (code === 70) {
      this.offsetx = dat.g2b();
    } else if (code === 71) {
      this.offsety = dat.g2b();
    } else if (code === 72) {
      this.offsetz = dat.g2b();
    } else if (code === 73) {
      this.forcedecor = true;
    }
  }
  getModel(shape, angle, heightmapSW, heightmapSE, heightmapNE, heightmapNW, transformId) {
    if (!this.shapes) {
      return null;
    }
    let shapeIndex = -1;
    for (let i = 0;i < this.shapes.length; i++) {
      if (this.shapes[i] === shape) {
        shapeIndex = i;
        break;
      }
    }
    if (shapeIndex === -1) {
      return null;
    }
    const typecode = BigInt(BigInt(this.id) << 6n) + BigInt(BigInt(shapeIndex) << 3n) + BigInt(angle) + BigInt(BigInt(transformId) + 1n << 32n);
    let cached = LocType.modelCacheDynamic?.get(typecode);
    if (cached) {
      if (this.hillskew || this.sharelight) {
        cached = Model.modelCopyFaces(cached, this.hillskew, this.sharelight);
      }
      if (this.hillskew) {
        const groundY = (heightmapSW + heightmapSE + heightmapNE + heightmapNW) / 4 | 0;
        for (let i = 0;i < cached.vertexCount; i++) {
          const x = cached.vertexX[i];
          const z = cached.vertexZ[i];
          const heightS = heightmapSW + ((heightmapSE - heightmapSW) * (x + 64) / 128 | 0);
          const heightN = heightmapNW + ((heightmapNE - heightmapNW) * (x + 64) / 128 | 0);
          const y = heightS + ((heightN - heightS) * (z + 64) / 128 | 0);
          cached.vertexY[i] += y - groundY;
        }
        cached.calculateBoundsY();
      }
      return cached;
    }
    if (!this.models) {
      return null;
    }
    if (shapeIndex >= this.models.length) {
      return null;
    }
    let modelId = this.models[shapeIndex];
    if (modelId === -1) {
      return null;
    }
    const flipped = this.mirror !== angle > 3;
    if (flipped) {
      modelId += 65536;
    }
    let model = LocType.modelCacheStatic?.get(BigInt(modelId));
    if (!model) {
      model = Model.model(modelId & 65535);
      if (flipped) {
        model.rotateY180();
      }
      LocType.modelCacheStatic?.put(BigInt(modelId), model);
    }
    const scaled = this.resizex !== 128 || this.resizey !== 128 || this.resizez !== 128;
    const translated = this.offsetx !== 0 || this.offsety !== 0 || this.offsetz !== 0;
    let modified = Model.modelShareColored(model, !this.recol_s, !this.disposeAlpha, angle === 0 /* WEST */ && transformId === -1 && !scaled && !translated);
    if (transformId !== -1) {
      modified.createLabelReferences();
      modified.applyTransform(transformId);
      modified.labelFaces = null;
      modified.labelVertices = null;
    }
    while (angle-- > 0) {
      modified.rotateY90();
    }
    if (this.recol_s && this.recol_d) {
      for (let i = 0;i < this.recol_s.length; i++) {
        modified.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    if (scaled) {
      modified.scale(this.resizex, this.resizey, this.resizez);
    }
    if (translated) {
      modified.translateModel(this.offsety, this.offsetx, this.offsetz);
    }
    modified.calculateNormals((this.ambient & 255) + 64, (this.contrast & 255) * 5 + 768, -50, -10, -50, !this.sharelight);
    if (this.blockwalk) {
      modified.objRaise = modified.maxY;
    }
    LocType.modelCacheDynamic?.put(typecode, modified);
    if (this.hillskew || this.sharelight) {
      modified = Model.modelCopyFaces(modified, this.hillskew, this.sharelight);
    }
    if (this.hillskew) {
      const groundY = (heightmapSW + heightmapSE + heightmapNE + heightmapNW) / 4 | 0;
      for (let i = 0;i < modified.vertexCount; i++) {
        const x = modified.vertexX[i];
        const z = modified.vertexZ[i];
        const heightS = heightmapSW + ((heightmapSE - heightmapSW) * (x + 64) / 128 | 0);
        const heightN = heightmapNW + ((heightmapNE - heightmapNW) * (x + 64) / 128 | 0);
        const y = heightS + ((heightN - heightS) * (z + 64) / 128 | 0);
        modified.vertexY[i] += y - groundY;
      }
      modified.calculateBoundsY();
    }
    return modified;
  }
  reset() {
    this.models = null;
    this.shapes = null;
    this.name = null;
    this.desc = null;
    this.recol_s = null;
    this.recol_d = null;
    this.width = 1;
    this.length = 1;
    this.blockwalk = true;
    this.blockrange = true;
    this.locActive = false;
    this.active2 = -1;
    this.hillskew = false;
    this.sharelight = false;
    this.occlude = false;
    this.anim = -1;
    this.wallwidth = 16;
    this.ambient = 0;
    this.contrast = 0;
    this.op = null;
    this.disposeAlpha = false;
    this.mapfunction = -1;
    this.mapscene = -1;
    this.mirror = false;
    this.shadow = true;
    this.resizex = 128;
    this.resizey = 128;
    this.resizez = 128;
    this.forceapproach = 0;
    this.offsetx = 0;
    this.offsety = 0;
    this.offsetz = 0;
    this.forcedecor = false;
  }
}

// src/graphics/Jpeg.ts
async function decodeJpeg(data) {
  if (data[0] !== 255) {
    data[0] = 255;
  }
  URL.revokeObjectURL(jpegImg.src);
  jpegImg.src = URL.createObjectURL(new Blob([data], { type: "image/jpeg" }));
  await new Promise((resolve) => jpegImg.onload = () => resolve());
  jpeg2d.clearRect(0, 0, jpegCanvas.width, jpegCanvas.height);
  const width = jpegImg.naturalWidth;
  const height = jpegImg.naturalHeight;
  jpegCanvas.width = width;
  jpegCanvas.height = height;
  jpeg2d.drawImage(jpegImg, 0, 0);
  return jpeg2d.getImageData(0, 0, width, height);
}

// src/graphics/Pix24.ts
class Pix24 extends DoublyLinkable {
  pixels;
  width2d;
  height2d;
  cropX;
  cropY;
  cropW;
  cropH;
  constructor(width, height) {
    super();
    this.pixels = new Int32Array(width * height);
    this.width2d = this.cropW = width;
    this.height2d = this.cropH = height;
    this.cropX = this.cropY = 0;
  }
  static async fromJpeg(archive, name) {
    const dat = archive.read(name + ".dat");
    if (!dat) {
      throw new Error;
    }
    const jpeg = await decodeJpeg(dat);
    const image = new Pix24(jpeg.width, jpeg.height);
    const data = new Uint32Array(jpeg.data.buffer);
    const pixels = image.pixels;
    for (let i = 0;i < pixels.length; i++) {
      const pixel = data[i];
      pixels[i] = (pixel >> 24 & 255) << 24 | (pixel & 255) << 16 | (pixel >> 8 & 255) << 8 | pixel >> 16 & 255;
    }
    return image;
  }
  static fromArchive(archive, name, sprite = 0) {
    const dat = new Packet(archive.read(name + ".dat"));
    const index = new Packet(archive.read("index.dat"));
    index.pos = dat.g2();
    const cropW = index.g2();
    const cropH = index.g2();
    const paletteCount = index.g1();
    const palette = [];
    const length = paletteCount - 1;
    for (let i = 0;i < length; i++) {
      palette[i + 1] = index.g3();
      if (palette[i + 1] === 0) {
        palette[i + 1] = 1;
      }
    }
    for (let i = 0;i < sprite; i++) {
      index.pos += 2;
      dat.pos += index.g2() * index.g2();
      index.pos += 1;
    }
    if (dat.pos > dat.length || index.pos > index.length) {
      throw new Error;
    }
    const cropX = index.g1();
    const cropY = index.g1();
    const width = index.g2();
    const height = index.g2();
    const image = new Pix24(width, height);
    image.cropX = cropX;
    image.cropY = cropY;
    image.cropW = cropW;
    image.cropH = cropH;
    const pixelOrder = index.g1();
    if (pixelOrder === 0) {
      const length2 = image.width2d * image.height2d;
      for (let i = 0;i < length2; i++) {
        image.pixels[i] = palette[dat.g1()];
      }
    } else if (pixelOrder === 1) {
      const width2 = image.width2d;
      for (let x = 0;x < width2; x++) {
        const height2 = image.height2d;
        for (let y = 0;y < height2; y++) {
          image.pixels[x + y * width2] = palette[dat.g1()];
        }
      }
    }
    return image;
  }
  bind() {
    Pix2D.bind(this.pixels, this.width2d, this.height2d);
  }
  draw(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImageDraw(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  drawAlpha(alpha, x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstStep = x + y * Pix2D.width2d;
    let srcStep = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstOff = Pix2D.width2d - w;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcStep += cutoff * w;
      dstStep += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcStep += cutoff;
      dstStep += cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyPixelsAlpha(w, h, this.pixels, srcStep, srcOff, Pix2D.pixels, dstStep, dstOff, alpha);
    }
  }
  blitOpaque(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImageBlitOpaque(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  flipHorizontally() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < height; y++) {
      const div = width / 2 | 0;
      for (let x = 0;x < div; x++) {
        const off1 = x + y * width;
        const off2 = width - x - 1 + y * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  flipVertically() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < (height / 2 | 0); y++) {
      for (let x = 0;x < width; x++) {
        const off1 = x + y * width;
        const off2 = x + (height - y - 1) * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  translate2d(r, g, b) {
    for (let i = 0;i < this.pixels.length; i++) {
      const rgb = this.pixels[i];
      if (rgb !== 0) {
        let red = rgb >> 16 & 255;
        red += r;
        if (red < 1) {
          red = 1;
        } else if (red > 255) {
          red = 255;
        }
        let green = rgb >> 8 & 255;
        green += g;
        if (green < 1) {
          green = 1;
        } else if (green > 255) {
          green = 255;
        }
        let blue = rgb & 255;
        blue += b;
        if (blue < 1) {
          blue = 1;
        } else if (blue > 255) {
          blue = 255;
        }
        this.pixels[i] = (red << 16) + (green << 8) + blue;
      }
    }
  }
  crop(x, y, w, h) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    try {
      const currentW = this.width2d;
      let offW = 0;
      let offH = 0;
      const cw = this.cropW;
      const ch = this.cropH;
      const scaleCropWidth = (cw << 16) / w | 0;
      const scaleCropHeight = (ch << 16) / h | 0;
      x += (this.cropX * w + cw - 1) / cw | 0;
      y += (this.cropY * h + ch - 1) / ch | 0;
      if (this.cropX * w % cw !== 0) {
        offW = (cw - this.cropX * w % cw << 16) / w | 0;
      }
      if (this.cropY * h % ch !== 0) {
        offH = (ch - this.cropY * h % ch << 16) / h | 0;
      }
      w = w * (this.width2d - (offW >> 16)) / cw | 0;
      h = h * (this.height2d - (offH >> 16)) / ch | 0;
      let dstStep = x + y * Pix2D.width2d;
      let dstOff = Pix2D.width2d - w;
      if (y < Pix2D.top) {
        const cutoff = Pix2D.top - y;
        h -= cutoff;
        y = 0;
        dstStep += cutoff * Pix2D.width2d;
        offH += scaleCropHeight * cutoff;
      }
      if (y + h > Pix2D.bottom) {
        h -= y + h - Pix2D.bottom;
      }
      if (x < Pix2D.left) {
        const cutoff = Pix2D.left - x;
        w -= cutoff;
        x = 0;
        dstStep += cutoff;
        offW += scaleCropWidth * cutoff;
        dstOff += cutoff;
      }
      if (x + w > Pix2D.right) {
        const cutoff = x + w - Pix2D.right;
        w -= cutoff;
        dstOff += cutoff;
      }
      this.scale(w, h, this.pixels, offW, offH, Pix2D.pixels, dstOff, dstStep, currentW, scaleCropWidth, scaleCropHeight);
    } catch (e) {
      console.error("error in sprite clipping routine");
    }
  }
  drawRotatedMasked(x, y, w, h, lineStart, lineWidth, anchorX, anchorY, theta, zoom) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    try {
      const centerX = -w / 2 | 0;
      const centerY = -h / 2 | 0;
      const sin = Math.sin(theta / 326.11) * 65536 | 0;
      const cos = Math.cos(theta / 326.11) * 65536 | 0;
      const sinZoom = sin * zoom >> 8;
      const cosZoom = cos * zoom >> 8;
      let leftX = (anchorX << 16) + centerY * sinZoom + centerX * cosZoom;
      let leftY = (anchorY << 16) + (centerY * cosZoom - centerX * sinZoom);
      let leftOff = x + y * Pix2D.width2d;
      for (let i = 0;i < h; i++) {
        const dstOff = lineStart[i];
        let dstX = leftOff + dstOff;
        let srcX = leftX + cosZoom * dstOff;
        let srcY = leftY - sinZoom * dstOff;
        for (let j = -lineWidth[i];j < 0; j++) {
          Pix2D.pixels[dstX++] = this.pixels[(srcX >> 16) + (srcY >> 16) * this.width2d];
          srcX += cosZoom;
          srcY -= sinZoom;
        }
        leftX += sinZoom;
        leftY += cosZoom;
        leftOff += Pix2D.width2d;
      }
    } catch (e) {
    }
  }
  drawMasked(x, y, mask) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstStep = x + y * Pix2D.width2d;
    let srcStep = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstOff = Pix2D.width2d - w;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcStep += cutoff * w;
      dstStep += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcStep += cutoff;
      dstStep += cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyPixelsMasked(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstStep, dstOff, mask.pixels);
    }
  }
  scale(w, h, src, offW, offH, dst, dstStep, dstOff, currentW, scaleCropWidth, scaleCropHeight) {
    try {
      const lastOffW = offW;
      for (let y = -h;y < 0; y++) {
        const offY = (offH >> 16) * currentW;
        for (let x = -w;x < 0; x++) {
          const rgb = src[(offW >> 16) + offY];
          if (rgb === 0) {
            dstOff++;
          } else {
            dst[dstOff++] = rgb;
          }
          offW += scaleCropWidth;
        }
        offH += scaleCropHeight;
        offW = lastOffW;
        dstOff += dstStep;
      }
    } catch (e) {
      console.error("error in plot_scale");
    }
  }
  copyImageBlitOpaque(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
      }
      for (let x = w;x < 0; x++) {
        dst[dstOff++] = src[srcOff++];
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyPixelsAlpha(w, h, src, srcOff, srcStep, dst, dstOff, dstStep, alpha) {
    const invAlpha = 256 - alpha;
    for (let y = -h;y < 0; y++) {
      for (let x = -w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          const dstRgb = dst[dstOff];
          dst[dstOff++] = ((rgb & 16711935) * alpha + (dstRgb & 16711935) * invAlpha & 4278255360) + ((rgb & 65280) * alpha + (dstRgb & 65280) * invAlpha & 16711680) >> 8;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyImageDraw(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      for (let x = w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyPixelsMasked(w, h, src, srcStep, srcOff, dst, dstOff, dstStep, mask) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
      }
      for (let x = w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
}

// src/config/ObjType.ts
class ObjType extends ConfigType {
  static totalCount = 0;
  static typeCache = null;
  static dat = null;
  static offsets = null;
  static cachePos = 0;
  static membersWorld = true;
  static modelCache = new LruCache(50);
  static iconCache = new LruCache(200);
  static unpack(config, members) {
    this.membersWorld = members;
    this.dat = new Packet(config.read("obj.dat"));
    const idx = new Packet(config.read("obj.idx"));
    this.totalCount = idx.g2();
    this.offsets = new Int32Array(this.totalCount);
    let offset = 2;
    for (let id = 0;id < this.totalCount; id++) {
      this.offsets[id] = offset;
      offset += idx.g2();
    }
    this.typeCache = new TypedArray1d(10, null);
    for (let id = 0;id < 10; id++) {
      this.typeCache[id] = new ObjType(-1);
    }
  }
  static get(id) {
    if (!this.typeCache || !this.offsets || !this.dat) {
      throw new Error;
    }
    for (let i = 0;i < 10; i++) {
      const type = this.typeCache[i];
      if (!type) {
        continue;
      }
      if (type.id === id) {
        return type;
      }
    }
    this.cachePos = (this.cachePos + 1) % 10;
    const obj = this.typeCache[this.cachePos];
    this.dat.pos = this.offsets[id];
    obj.id = id;
    obj.reset();
    obj.unpackType(this.dat);
    if (obj.certtemplate !== -1) {
      obj.toCertificate();
    }
    if (!this.membersWorld && obj.members) {
      obj.name = "Members Object";
      obj.desc = "Login to a members' server to use this object.";
      obj.op = null;
      obj.iop = null;
    }
    return obj;
  }
  static getIcon(id, count) {
    if (ObjType.iconCache) {
      let icon2 = ObjType.iconCache.get(BigInt(id));
      if (icon2 && icon2.cropH !== count && icon2.cropH !== -1) {
        icon2.unlink();
        icon2 = null;
      }
      if (icon2) {
        return icon2;
      }
    }
    let obj = ObjType.get(id);
    if (!obj.countobj) {
      count = -1;
    }
    if (obj.countobj && obj.countco && count > 1) {
      let countobj = -1;
      for (let i = 0;i < 10; i++) {
        if (count >= obj.countco[i] && obj.countco[i] !== 0) {
          countobj = obj.countobj[i];
        }
      }
      if (countobj !== -1) {
        obj = ObjType.get(countobj);
      }
    }
    const icon = new Pix24(32, 32);
    const _cx = Pix3D.centerX;
    const _cy = Pix3D.centerY;
    const _loff = Pix3D.lineOffset;
    const _data = Pix2D.pixels;
    const _w = Pix2D.width2d;
    const _h = Pix2D.height2d;
    const _l = Pix2D.left;
    const _r = Pix2D.right;
    const _t = Pix2D.top;
    const _b = Pix2D.bottom;
    Pix3D.jagged = false;
    Pix2D.bind(icon.pixels, 32, 32);
    Pix2D.fillRect2d(0, 0, 32, 32, 0 /* BLACK */);
    Pix3D.init2D();
    const iModel = obj.getInterfaceModel(1);
    const sinPitch = Pix3D.sin[obj.xan2d] * obj.zoom2d >> 16;
    const cosPitch = Pix3D.cos[obj.xan2d] * obj.zoom2d >> 16;
    iModel.drawSimple(0, obj.yan2d, obj.zan2d, obj.xan2d, obj.xof2d, sinPitch + (iModel.maxY / 2 | 0) + obj.yof2d, cosPitch + obj.yof2d);
    for (let x = 31;x >= 0; x--) {
      for (let y = 31;y >= 0; y--) {
        if (icon.pixels[x + y * 32] !== 0) {
          continue;
        }
        if (x > 0 && icon.pixels[x + y * 32 - 1] > 1) {
          icon.pixels[x + y * 32] = 1;
        } else if (y > 0 && icon.pixels[x + (y - 1) * 32] > 1) {
          icon.pixels[x + y * 32] = 1;
        } else if (x < 31 && icon.pixels[x + y * 32 + 1] > 1) {
          icon.pixels[x + y * 32] = 1;
        } else if (y < 31 && icon.pixels[x + (y + 1) * 32] > 1) {
          icon.pixels[x + y * 32] = 1;
        }
      }
    }
    for (let x = 31;x >= 0; x--) {
      for (let y = 31;y >= 0; y--) {
        if (icon.pixels[x + y * 32] === 0 && x > 0 && y > 0 && icon.pixels[x + (y - 1) * 32 - 1] > 0) {
          icon.pixels[x + y * 32] = 3153952;
        }
      }
    }
    if (obj.certtemplate !== -1) {
      const linkedIcon = this.getIcon(obj.certlink, 10);
      const w = linkedIcon.cropW;
      const h = linkedIcon.cropH;
      linkedIcon.cropW = 32;
      linkedIcon.cropH = 32;
      linkedIcon.crop(5, 5, 22, 22);
      linkedIcon.cropW = w;
      linkedIcon.cropH = h;
    }
    ObjType.iconCache?.put(BigInt(id), icon);
    Pix2D.bind(_data, _w, _h);
    Pix2D.setBounds(_l, _t, _r, _b);
    Pix3D.centerX = _cx;
    Pix3D.centerY = _cy;
    Pix3D.lineOffset = _loff;
    Pix3D.jagged = true;
    if (obj.stackable) {
      icon.cropW = 33;
    } else {
      icon.cropW = 32;
    }
    icon.cropH = count;
    return icon;
  }
  model = 0;
  name = null;
  desc = null;
  recol_s = null;
  recol_d = null;
  zoom2d = 2000;
  xan2d = 0;
  yan2d = 0;
  zan2d = 0;
  xof2d = 0;
  yof2d = 0;
  code9 = false;
  code10 = -1;
  stackable = false;
  cost = 1;
  members = false;
  op = null;
  iop = null;
  manwear = -1;
  manwear2 = -1;
  manwearOffsetY = 0;
  womanwear = -1;
  womanwear2 = -1;
  womanwearOffsetY = 0;
  manwear3 = -1;
  womanwear3 = -1;
  manhead = -1;
  manhead2 = -1;
  womanhead = -1;
  womanhead2 = -1;
  countobj = null;
  countco = null;
  certlink = -1;
  certtemplate = -1;
  unpack(code, dat) {
    if (code === 1) {
      this.model = dat.g2();
    } else if (code === 2) {
      this.name = dat.gjstr();
    } else if (code === 3) {
      this.desc = dat.gjstr();
    } else if (code === 4) {
      this.zoom2d = dat.g2();
    } else if (code === 5) {
      this.xan2d = dat.g2();
    } else if (code === 6) {
      this.yan2d = dat.g2();
    } else if (code === 7) {
      this.xof2d = dat.g2b();
      if (this.xof2d > 32767) {
        this.xof2d -= 65536;
      }
    } else if (code === 8) {
      this.yof2d = dat.g2b();
      if (this.yof2d > 32767) {
        this.yof2d -= 65536;
      }
    } else if (code === 9) {
      this.code9 = true;
    } else if (code === 10) {
      this.code10 = dat.g2();
    } else if (code === 11) {
      this.stackable = true;
    } else if (code === 12) {
      this.cost = dat.g4();
    } else if (code === 16) {
      this.members = true;
    } else if (code === 23) {
      this.manwear = dat.g2();
      this.manwearOffsetY = dat.g1b();
    } else if (code === 24) {
      this.manwear2 = dat.g2();
    } else if (code === 25) {
      this.womanwear = dat.g2();
      this.womanwearOffsetY = dat.g1b();
    } else if (code === 26) {
      this.womanwear2 = dat.g2();
    } else if (code >= 30 && code < 35) {
      if (!this.op) {
        this.op = new TypedArray1d(5, null);
      }
      this.op[code - 30] = dat.gjstr();
      if (this.op[code - 30]?.toLowerCase() === "hidden") {
        this.op[code - 30] = null;
      }
    } else if (code >= 35 && code < 40) {
      if (!this.iop) {
        this.iop = new TypedArray1d(5, null);
      }
      this.iop[code - 35] = dat.gjstr();
    } else if (code === 40) {
      const count = dat.g1();
      this.recol_s = new Uint16Array(count);
      this.recol_d = new Uint16Array(count);
      for (let i = 0;i < count; i++) {
        this.recol_s[i] = dat.g2();
        this.recol_d[i] = dat.g2();
      }
    } else if (code === 78) {
      this.manwear3 = dat.g2();
    } else if (code === 79) {
      this.womanwear3 = dat.g2();
    } else if (code === 90) {
      this.manhead = dat.g2();
    } else if (code === 91) {
      this.womanhead = dat.g2();
    } else if (code === 92) {
      this.manhead2 = dat.g2();
    } else if (code === 93) {
      this.womanhead2 = dat.g2();
    } else if (code === 95) {
      this.zan2d = dat.g2();
    } else if (code === 97) {
      this.certlink = dat.g2();
    } else if (code === 98) {
      this.certtemplate = dat.g2();
    } else if (code >= 100 && code < 110) {
      if (!this.countobj || !this.countco) {
        this.countobj = new Uint16Array(10);
        this.countco = new Uint16Array(10);
      }
      this.countobj[code - 100] = dat.g2();
      this.countco[code - 100] = dat.g2();
    }
  }
  getWornModel(gender) {
    let id1 = this.manwear;
    if (gender === 1) {
      id1 = this.womanwear;
    }
    if (id1 === -1) {
      return null;
    }
    let id2 = this.manwear2;
    let id3 = this.manwear3;
    if (gender === 1) {
      id2 = this.womanwear2;
      id3 = this.womanwear3;
    }
    let model = Model.model(id1);
    if (id2 !== -1) {
      const model2 = Model.model(id2);
      if (id3 === -1) {
        const models = [model, model2];
        model = Model.modelFromModels(models, 2);
      } else {
        const model3 = Model.model(id3);
        const models = [model, model2, model3];
        model = Model.modelFromModels(models, 3);
      }
    }
    if (gender === 0 && this.manwearOffsetY !== 0) {
      model.translateModel(this.manwearOffsetY, 0, 0);
    }
    if (gender === 1 && this.womanwearOffsetY !== 0) {
      model.translateModel(this.womanwearOffsetY, 0, 0);
    }
    if (this.recol_s && this.recol_d) {
      for (let i = 0;i < this.recol_s.length; i++) {
        model.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    return model;
  }
  getHeadModel(gender) {
    let head1 = this.manhead;
    if (gender === 1) {
      head1 = this.womanhead;
    }
    if (head1 === -1) {
      return null;
    }
    let head2 = this.manhead2;
    if (gender === 1) {
      head2 = this.womanhead2;
    }
    let model = Model.model(head1);
    if (head2 !== -1) {
      const model2 = Model.model(head2);
      const models = [model, model2];
      model = Model.modelFromModels(models, 2);
    }
    if (this.recol_s && this.recol_d) {
      for (let i = 0;i < this.recol_s.length; i++) {
        model.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    return model;
  }
  getInterfaceModel(count) {
    if (this.countobj && this.countco && count > 1) {
      let id = -1;
      for (let i = 0;i < 10; i++) {
        if (count >= this.countco[i] && this.countco[i] !== 0) {
          id = this.countobj[i];
        }
      }
      if (id !== -1) {
        return ObjType.get(id).getInterfaceModel(1);
      }
    }
    if (ObjType.modelCache) {
      const model2 = ObjType.modelCache.get(BigInt(this.id));
      if (model2) {
        return model2;
      }
    }
    const model = Model.model(this.model);
    if (this.recol_s && this.recol_d) {
      for (let i = 0;i < this.recol_s.length; i++) {
        model.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    model.calculateNormals(64, 768, -50, -10, -50, true);
    model.pickable = true;
    ObjType.modelCache?.put(BigInt(this.id), model);
    return model;
  }
  toCertificate() {
    const template = ObjType.get(this.certtemplate);
    this.model = template.model;
    this.zoom2d = template.zoom2d;
    this.xan2d = template.xan2d;
    this.yan2d = template.yan2d;
    this.zan2d = template.zan2d;
    this.xof2d = template.xof2d;
    this.yof2d = template.yof2d;
    this.recol_s = template.recol_s;
    this.recol_d = template.recol_d;
    const link = ObjType.get(this.certlink);
    this.name = link.name;
    this.members = link.members;
    this.cost = link.cost;
    let article = "a";
    const c = (link.name || "").toLowerCase().charAt(0);
    if (c === "a" || c === "e" || c === "i" || c === "o" || c === "u") {
      article = "an";
    }
    this.desc = `Swap this note at any bank for ${article} ${link.name}.`;
    this.stackable = true;
  }
  reset() {
    this.model = 0;
    this.name = null;
    this.desc = null;
    this.recol_s = null;
    this.recol_d = null;
    this.zoom2d = 2000;
    this.xan2d = 0;
    this.yan2d = 0;
    this.zan2d = 0;
    this.xof2d = 0;
    this.yof2d = 0;
    this.code9 = false;
    this.code10 = -1;
    this.stackable = false;
    this.cost = 1;
    this.members = false;
    this.op = null;
    this.iop = null;
    this.manwear = -1;
    this.manwear2 = -1;
    this.manwearOffsetY = 0;
    this.womanwear = -1;
    this.womanwear2 = -1;
    this.womanwearOffsetY = 0;
    this.manwear3 = -1;
    this.womanwear3 = -1;
    this.manhead = -1;
    this.manhead2 = -1;
    this.womanhead = -1;
    this.womanhead2 = -1;
    this.countobj = null;
    this.countco = null;
    this.certlink = -1;
    this.certtemplate = -1;
  }
}

// src/config/NpcType.ts
class NpcType extends ConfigType {
  static totalCount = 0;
  static typeCache = null;
  static dat = null;
  static offsets = null;
  static cachePos = 0;
  static modelCache = new LruCache(30);
  static unpack(config) {
    this.dat = new Packet(config.read("npc.dat"));
    const idx = new Packet(config.read("npc.idx"));
    this.totalCount = idx.g2();
    this.offsets = new Int32Array(this.totalCount);
    let offset = 2;
    for (let id = 0;id < this.totalCount; id++) {
      this.offsets[id] = offset;
      offset += idx.g2();
    }
    this.typeCache = new TypedArray1d(20, null);
    for (let id = 0;id < 20; id++) {
      this.typeCache[id] = new NpcType(-1);
    }
  }
  static get(id) {
    if (!this.typeCache || !this.offsets || !this.dat) {
      throw new Error;
    }
    for (let i = 0;i < 20; i++) {
      const type = this.typeCache[i];
      if (!type) {
        continue;
      }
      if (type.id === id) {
        return type;
      }
    }
    this.cachePos = (this.cachePos + 1) % 20;
    const loc = this.typeCache[this.cachePos] = new NpcType(id);
    this.dat.pos = this.offsets[id];
    loc.unpackType(this.dat);
    return loc;
  }
  name = null;
  desc = null;
  size = 1;
  models = null;
  heads = null;
  disposeAlpha = false;
  readyanim = -1;
  walkanim = -1;
  walkanim_b = -1;
  walkanim_r = -1;
  walkanim_l = -1;
  recol_s = null;
  recol_d = null;
  op = null;
  resizex = -1;
  resizey = -1;
  resizez = -1;
  minimap = true;
  vislevel = -1;
  resizeh = 128;
  resizev = 128;
  unpack(code, dat) {
    if (code === 1) {
      const count = dat.g1();
      this.models = new Uint16Array(count);
      for (let i = 0;i < count; i++) {
        this.models[i] = dat.g2();
      }
    } else if (code === 2) {
      this.name = dat.gjstr();
    } else if (code === 3) {
      this.desc = dat.gjstr();
    } else if (code === 12) {
      this.size = dat.g1b();
    } else if (code === 13) {
      this.readyanim = dat.g2();
    } else if (code === 14) {
      this.walkanim = dat.g2();
    } else if (code === 16) {
      this.disposeAlpha = true;
    } else if (code === 17) {
      this.walkanim = dat.g2();
      this.walkanim_b = dat.g2();
      this.walkanim_r = dat.g2();
      this.walkanim_l = dat.g2();
    } else if (code >= 30 && code < 40) {
      if (!this.op) {
        this.op = new TypedArray1d(5, null);
      }
      this.op[code - 30] = dat.gjstr();
      if (this.op[code - 30]?.toLowerCase() === "hidden") {
        this.op[code - 30] = null;
      }
    } else if (code === 40) {
      const count = dat.g1();
      this.recol_s = new Uint16Array(count);
      this.recol_d = new Uint16Array(count);
      for (let i = 0;i < count; i++) {
        this.recol_s[i] = dat.g2();
        this.recol_d[i] = dat.g2();
      }
    } else if (code === 60) {
      const count = dat.g1();
      this.heads = new Uint16Array(count);
      for (let i = 0;i < count; i++) {
        this.heads[i] = dat.g2();
      }
    } else if (code === 90) {
      this.resizex = dat.g2();
    } else if (code === 91) {
      this.resizey = dat.g2();
    } else if (code === 92) {
      this.resizez = dat.g2();
    } else if (code === 93) {
      this.minimap = false;
    } else if (code === 95) {
      this.vislevel = dat.g2();
    } else if (code === 97) {
      this.resizeh = dat.g2();
    } else if (code === 98) {
      this.resizev = dat.g2();
    }
  }
  getSequencedModel(primaryTransformId, secondaryTransformId, seqMask) {
    let tmp = null;
    let model = null;
    if (NpcType.modelCache) {
      model = NpcType.modelCache.get(BigInt(this.id));
      if (!model && this.models) {
        const models = new TypedArray1d(this.models.length, null);
        for (let i = 0;i < this.models.length; i++) {
          models[i] = Model.model(this.models[i]);
        }
        if (models.length === 1) {
          model = models[0];
        } else {
          model = Model.modelFromModels(models, models.length);
        }
        if (this.recol_s && this.recol_d) {
          for (let i = 0;i < this.recol_s.length; i++) {
            model?.recolor(this.recol_s[i], this.recol_d[i]);
          }
        }
        model?.createLabelReferences();
        model?.calculateNormals(64, 850, -30, -50, -30, true);
        if (model) {
          NpcType.modelCache.put(BigInt(this.id), model);
        }
      }
    }
    if (model) {
      tmp = Model.modelShareAlpha(model, !this.disposeAlpha);
      if (primaryTransformId !== -1 && secondaryTransformId !== -1) {
        tmp.applyTransforms(primaryTransformId, secondaryTransformId, seqMask);
      } else if (primaryTransformId !== -1) {
        tmp.applyTransform(primaryTransformId);
      }
      if (this.resizeh !== 128 || this.resizev !== 128) {
        tmp.scale(this.resizeh, this.resizev, this.resizeh);
      }
      tmp.calculateBoundsCylinder();
      tmp.labelFaces = null;
      tmp.labelVertices = null;
      if (this.size === 1) {
        tmp.pickable = true;
      }
      return tmp;
    }
    return null;
  }
  getHeadModel() {
    if (!this.heads) {
      return null;
    }
    const models = new TypedArray1d(this.heads.length, null);
    for (let i = 0;i < this.heads.length; i++) {
      models[i] = Model.model(this.heads[i]);
    }
    let model;
    if (models.length === 1) {
      model = models[0];
    } else {
      model = Model.modelFromModels(models, models.length);
    }
    if (this.recol_s && this.recol_d) {
      for (let i = 0;i < this.recol_s.length; i++) {
        model?.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    return model;
  }
}

// src/config/IdkType.ts
class IdkType extends ConfigType {
  static totalCount = 0;
  static instances = [];
  static unpack(config) {
    const dat = new Packet(config.read("idk.dat"));
    this.totalCount = dat.g2();
    for (let i = 0;i < this.totalCount; i++) {
      this.instances[i] = new IdkType(i).unpackType(dat);
    }
  }
  bodyPart = -1;
  models = null;
  heads = new Int32Array(5).fill(-1);
  recol_s = new Int32Array(6);
  recol_d = new Int32Array(6);
  disableKit = false;
  unpack(code, dat) {
    if (code === 1) {
      this.bodyPart = dat.g1();
    } else if (code === 2) {
      const count = dat.g1();
      this.models = new Int32Array(count);
      for (let i = 0;i < count; i++) {
        this.models[i] = dat.g2();
      }
    } else if (code === 3) {
      this.disableKit = true;
    } else if (code >= 40 && code < 50) {
      this.recol_s[code - 40] = dat.g2();
    } else if (code >= 50 && code < 60) {
      this.recol_d[code - 50] = dat.g2();
    } else if (code >= 60 && code < 70) {
      this.heads[code - 60] = dat.g2();
    } else {
      console.log("Error unrecognised config code: ", code);
    }
  }
  getModel() {
    if (!this.models) {
      return null;
    }
    const models = new TypedArray1d(this.models.length, null);
    for (let i = 0;i < this.models.length; i++) {
      models[i] = Model.model(this.models[i]);
    }
    let model;
    if (models.length === 1) {
      model = models[0];
    } else {
      model = Model.modelFromModels(models, models.length);
    }
    for (let i = 0;i < 6 && this.recol_s[i] !== 0; i++) {
      model?.recolor(this.recol_s[i], this.recol_d[i]);
    }
    return model;
  }
  getHeadModel() {
    let count = 0;
    const models = new TypedArray1d(5, null);
    for (let i = 0;i < 5; i++) {
      if (this.heads[i] !== -1) {
        models[count++] = Model.model(this.heads[i]);
      }
    }
    const model = Model.modelFromModels(models, count);
    for (let i = 0;i < 6 && this.recol_s[i] !== 0; i++) {
      model.recolor(this.recol_s[i], this.recol_d[i]);
    }
    return model;
  }
}

// src/config/SpotAnimType.ts
class SpotAnimType extends ConfigType {
  static totalCount = 0;
  static instances = [];
  static modelCache = new LruCache(30);
  static unpack(config) {
    const dat = new Packet(config.read("spotanim.dat"));
    this.totalCount = dat.g2();
    for (let i = 0;i < this.totalCount; i++) {
      this.instances[i] = new SpotAnimType(i).unpackType(dat);
    }
  }
  model = 0;
  anim = -1;
  seq = null;
  disposeAlpha = false;
  recol_s = new Uint16Array(6);
  recol_d = new Uint16Array(6);
  resizeh = 128;
  resizev = 128;
  spotAngle = 0;
  ambient = 0;
  contrast = 0;
  unpack(code, dat) {
    if (code === 1) {
      this.model = dat.g2();
    } else if (code === 2) {
      this.anim = dat.g2();
      if (SeqType.instances) {
        this.seq = SeqType.instances[this.anim];
      }
    } else if (code === 3) {
      this.disposeAlpha = true;
    } else if (code === 4) {
      this.resizeh = dat.g2();
    } else if (code === 5) {
      this.resizev = dat.g2();
    } else if (code === 6) {
      this.spotAngle = dat.g2();
    } else if (code === 7) {
      this.ambient = dat.g1();
    } else if (code === 8) {
      this.contrast = dat.g1();
    } else if (code >= 40 && code < 50) {
      this.recol_s[code - 40] = dat.g2();
    } else if (code >= 50 && code < 60) {
      this.recol_d[code - 50] = dat.g2();
    } else {
      console.log("Error unrecognised spotanim config code: ", code);
    }
  }
  getModel() {
    let model = SpotAnimType.modelCache?.get(BigInt(this.id));
    if (model) {
      return model;
    }
    model = Model.model(this.model);
    for (let i = 0;i < 6; i++) {
      if (this.recol_s[0] !== 0) {
        model.recolor(this.recol_s[i], this.recol_d[i]);
      }
    }
    SpotAnimType.modelCache?.put(BigInt(this.id), model);
    return model;
  }
}

// src/config/VarpType.ts
class VarpType extends ConfigType {
  static totalCount = 0;
  static instances = [];
  static code3 = [];
  static code3Count = 0;
  static unpack(config) {
    const dat = new Packet(config.read("varp.dat"));
    this.totalCount = dat.g2();
    for (let i = 0;i < this.totalCount; i++) {
      this.instances[i] = new VarpType(i).unpackType(dat);
    }
  }
  scope = 0;
  varType = 0;
  code3 = false;
  protect = true;
  clientcode = 0;
  code7 = 0;
  transmit = false;
  code8 = false;
  unpack(code, dat) {
    if (code === 1) {
      this.scope = dat.g1();
    } else if (code === 2) {
      this.varType = dat.g1();
    } else if (code === 3) {
      this.code3 = true;
      VarpType.code3[VarpType.code3Count++] = this.id;
    } else if (code === 4) {
      this.protect = false;
    } else if (code === 5) {
      this.clientcode = dat.g2();
    } else if (code === 6) {
      this.transmit = true;
    } else if (code === 7) {
      this.code7 = dat.g4();
    } else if (code === 8) {
      this.code8 = true;
    } else if (code === 10) {
      this.debugname = dat.gjstr();
    } else {
      console.log("Error unrecognised config code: ", code);
    }
  }
}

// src/datastruct/JString.ts
class JString {
  static BASE37_LOOKUP = [
    "_",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  static toBase37(string) {
    string = string.trim();
    let l = 0n;
    for (let i = 0;i < string.length && i < 12; i++) {
      const c = string.charCodeAt(i);
      l *= 37n;
      if (c >= 65 && c <= 90) {
        l += BigInt(c + 1 - 65);
      } else if (c >= 97 && c <= 122) {
        l += BigInt(c + 1 - 97);
      } else if (c >= 48 && c <= 57) {
        l += BigInt(c + 27 - 48);
      }
    }
    return l;
  }
  static fromBase37(value) {
    if (value < 0n || value >= 6582952005840035281n) {
      return "invalid_name";
    }
    if (value % 37n === 0n) {
      return "invalid_name";
    }
    let len = 0;
    const chars = Array(12);
    while (value !== 0n) {
      const l1 = value;
      value /= 37n;
      chars[11 - len++] = this.BASE37_LOOKUP[Number(l1 - value * 37n)];
    }
    return chars.slice(12 - len).join("");
  }
  static toSentenceCase(input) {
    const chars = [...input.toLowerCase()];
    let punctuation = true;
    for (let index = 0;index < chars.length; index++) {
      const char = chars[index];
      if (punctuation && char >= "a" && char <= "z") {
        chars[index] = char.toUpperCase();
        punctuation = false;
      }
      if (char === "." || char === "!") {
        punctuation = true;
      }
    }
    return chars.join("");
  }
  static toAsterisks(str) {
    let temp = "";
    for (let i = 0;i < str.length; i++) {
      temp = temp + "*";
    }
    return temp;
  }
  static formatIPv4(ip) {
    return (ip >> 24 & 255) + "." + (ip >> 16 & 255) + "." + (ip >> 8 & 255) + "." + (ip & 255);
  }
  static formatName(str) {
    if (str.length === 0) {
      return str;
    }
    const chars = [...str];
    for (let i = 0;i < chars.length; i++) {
      if (chars[i] === "_") {
        chars[i] = " ";
        if (i + 1 < chars.length && chars[i + 1] >= "a" && chars[i + 1] <= "z") {
          chars[i + 1] = String.fromCharCode(chars[i + 1].charCodeAt(0) + 65 - 97);
        }
      }
    }
    if (chars[0] >= "a" && chars[0] <= "z") {
      chars[0] = String.fromCharCode(chars[0].charCodeAt(0) + 65 - 97);
    }
    return chars.join("");
  }
  static hashCode(str) {
    const upper = str.toUpperCase();
    let hash = 0n;
    for (let i = 0;i < upper.length; i++) {
      hash = hash * 61n + BigInt(upper.charCodeAt(i)) - 32n;
      hash = hash + (hash >> 56n) & 0xffffffffffffffn;
    }
    return hash;
  }
}

// src/config/Component.ts
class Component {
  static instances = [];
  static imageCache = null;
  static modelCache = null;
  static unpack(interfaces, media, fonts) {
    this.imageCache = new LruCache(50000);
    this.modelCache = new LruCache(50000);
    const dat = new Packet(interfaces.read("data"));
    let layer = -1;
    dat.pos += 2;
    while (dat.pos < dat.length) {
      let id = dat.g2();
      if (id === 65535) {
        layer = dat.g2();
        id = dat.g2();
      }
      const com = this.instances[id] = new Component;
      com.id = id;
      com.layer = layer;
      com.comType = dat.g1();
      com.buttonType = dat.g1();
      com.clientCode = dat.g2();
      com.width = dat.g2();
      com.height = dat.g2();
      com.overLayer = dat.g1();
      if (com.overLayer === 0) {
        com.overLayer = -1;
      } else {
        com.overLayer = (com.overLayer - 1 << 8) + dat.g1();
      }
      const comparatorCount = dat.g1();
      if (comparatorCount > 0) {
        com.scriptComparator = new Uint8Array(comparatorCount);
        com.scriptOperand = new Uint16Array(comparatorCount);
        for (let i = 0;i < comparatorCount; i++) {
          com.scriptComparator[i] = dat.g1();
          com.scriptOperand[i] = dat.g2();
        }
      }
      const scriptCount = dat.g1();
      if (scriptCount > 0) {
        com.script = new TypedArray1d(scriptCount, null);
        for (let i = 0;i < scriptCount; i++) {
          const opcodeCount = dat.g2();
          const script = new Uint16Array(opcodeCount);
          com.script[i] = script;
          for (let j = 0;j < opcodeCount; j++) {
            script[j] = dat.g2();
          }
        }
      }
      if (com.comType === 0 /* TYPE_LAYER */) {
        com.scroll = dat.g2();
        com.hide = dat.g1() === 1;
        const childCount = dat.g1();
        com.childId = new Array(childCount);
        com.childX = new Array(childCount);
        com.childY = new Array(childCount);
        for (let i = 0;i < childCount; i++) {
          com.childId[i] = dat.g2();
          com.childX[i] = dat.g2b();
          com.childY[i] = dat.g2b();
        }
      }
      if (com.comType === 1 /* TYPE_UNUSED */) {
        dat.pos += 3;
      }
      if (com.comType === 2 /* TYPE_INV */) {
        com.invSlotObjId = new Int32Array(com.width * com.height);
        com.invSlotObjCount = new Int32Array(com.width * com.height);
        com.draggable = dat.g1() === 1;
        com.interactable = dat.g1() === 1;
        com.usable = dat.g1() === 1;
        com.marginX = dat.g1();
        com.marginY = dat.g1();
        com.invSlotOffsetX = new Int16Array(20);
        com.invSlotOffsetY = new Int16Array(20);
        com.invSlotSprite = new TypedArray1d(20, null);
        for (let i = 0;i < 20; i++) {
          if (dat.g1() === 1) {
            com.invSlotOffsetX[i] = dat.g2b();
            com.invSlotOffsetY[i] = dat.g2b();
            const sprite = dat.gjstr();
            if (sprite.length > 0) {
              const spriteIndex = sprite.lastIndexOf(",");
              com.invSlotSprite[i] = this.getImage(media, sprite.substring(0, spriteIndex), parseInt(sprite.substring(spriteIndex + 1), 10));
            }
          }
        }
        com.iops = new TypedArray1d(5, null);
        for (let i = 0;i < 5; i++) {
          const iop = dat.gjstr();
          com.iops[i] = iop;
          if (iop.length === 0) {
            com.iops[i] = null;
          }
        }
      }
      if (com.comType === 3 /* TYPE_RECT */) {
        com.fill = dat.g1() === 1;
      }
      if (com.comType === 4 /* TYPE_TEXT */ || com.comType === 1 /* TYPE_UNUSED */) {
        com.center = dat.g1() === 1;
        const fontId = dat.g1();
        if (fonts) {
          com.font = fonts[fontId];
        }
        com.shadowed = dat.g1() === 1;
      }
      if (com.comType === 4 /* TYPE_TEXT */) {
        com.text = dat.gjstr();
        com.activeText = dat.gjstr();
      }
      if (com.comType === 1 /* TYPE_UNUSED */ || com.comType === 3 /* TYPE_RECT */ || com.comType === 4 /* TYPE_TEXT */) {
        com.colour = dat.g4();
      }
      if (com.comType === 3 /* TYPE_RECT */ || com.comType === 4 /* TYPE_TEXT */) {
        com.activeColour = dat.g4();
        com.overColour = dat.g4();
      }
      if (com.comType === 5 /* TYPE_GRAPHIC */) {
        const graphic = dat.gjstr();
        if (graphic.length > 0) {
          const index = graphic.lastIndexOf(",");
          com.graphic = this.getImage(media, graphic.substring(0, index), parseInt(graphic.substring(index + 1), 10));
        }
        const activeGraphic = dat.gjstr();
        if (activeGraphic.length > 0) {
          const index = activeGraphic.lastIndexOf(",");
          com.activeGraphic = this.getImage(media, activeGraphic.substring(0, index), parseInt(activeGraphic.substring(index + 1), 10));
        }
      }
      if (com.comType === 6 /* TYPE_MODEL */) {
        const model = dat.g1();
        if (model !== 0) {
          com.model = this.getModel((model - 1 << 8) + dat.g1());
        }
        const activeModel = dat.g1();
        if (activeModel !== 0) {
          com.activeModel = this.getModel((activeModel - 1 << 8) + dat.g1());
        }
        com.anim = dat.g1();
        if (com.anim === 0) {
          com.anim = -1;
        } else {
          com.anim = (com.anim - 1 << 8) + dat.g1();
        }
        com.activeAnim = dat.g1();
        if (com.activeAnim === 0) {
          com.activeAnim = -1;
        } else {
          com.activeAnim = (com.activeAnim - 1 << 8) + dat.g1();
        }
        com.zoom = dat.g2();
        com.xan = dat.g2();
        com.yan = dat.g2();
      }
      if (com.comType === 7 /* TYPE_INV_TEXT */) {
        com.invSlotObjId = new Int32Array(com.width * com.height);
        com.invSlotObjCount = new Int32Array(com.width * com.height);
        com.center = dat.g1() === 1;
        const fontId = dat.g1();
        if (fonts) {
          com.font = fonts[fontId];
        }
        com.shadowed = dat.g1() === 1;
        com.colour = dat.g4();
        com.marginX = dat.g2b();
        com.marginY = dat.g2b();
        com.interactable = dat.g1() === 1;
        com.iops = new TypedArray1d(5, null);
        for (let i = 0;i < 5; i++) {
          const iop = dat.gjstr();
          com.iops[i] = iop;
          if (iop.length === 0) {
            com.iops[i] = null;
          }
        }
      }
      if (com.buttonType === 2 /* BUTTON_TARGET */ || com.comType === 2 /* TYPE_INV */) {
        com.actionVerb = dat.gjstr();
        com.action = dat.gjstr();
        com.actionTarget = dat.g2();
      }
      if (com.buttonType === 1 /* BUTTON_OK */ || com.buttonType === 4 /* BUTTON_TOGGLE */ || com.buttonType === 5 /* BUTTON_SELECT */ || com.buttonType === 6 /* BUTTON_CONTINUE */) {
        com.option = dat.gjstr();
        if (com.option.length === 0) {
          if (com.buttonType === 1 /* BUTTON_OK */) {
            com.option = "Ok";
          } else if (com.buttonType === 4 /* BUTTON_TOGGLE */) {
            com.option = "Select";
          } else if (com.buttonType === 5 /* BUTTON_SELECT */) {
            com.option = "Select";
          } else if (com.buttonType === 6 /* BUTTON_CONTINUE */) {
            com.option = "Continue";
          }
        }
      }
    }
    this.imageCache = null;
    this.modelCache = null;
  }
  static getImage(media, sprite, spriteId) {
    const uid = JString.hashCode(sprite) << 8n | BigInt(spriteId);
    if (this.imageCache) {
      const image2 = this.imageCache.get(uid);
      if (image2) {
        return image2;
      }
    }
    let image;
    try {
      image = Pix24.fromArchive(media, sprite, spriteId);
      this.imageCache?.put(uid, image);
    } catch (e) {
      return null;
    }
    return image;
  }
  static getModel(id) {
    if (this.modelCache) {
      const model2 = this.modelCache.get(BigInt(id));
      if (model2) {
        return model2;
      }
    }
    const model = Model.model(id);
    this.modelCache?.put(BigInt(id), model);
    return model;
  }
  id = -1;
  layer = -1;
  comType = -1;
  buttonType = -1;
  clientCode = 0;
  width = 0;
  height = 0;
  overLayer = -1;
  scriptComparator = null;
  scriptOperand = null;
  script = null;
  scroll = 0;
  hide = false;
  draggable = false;
  interactable = false;
  usable = false;
  marginX = 0;
  marginY = 0;
  invSlotOffsetX = null;
  invSlotOffsetY = null;
  invSlotSprite = null;
  iops = null;
  fill = false;
  center = false;
  font = null;
  shadowed = false;
  text = null;
  activeText = null;
  colour = 0;
  activeColour = 0;
  overColour = 0;
  graphic = null;
  activeGraphic = null;
  model = null;
  activeModel = null;
  anim = -1;
  activeAnim = -1;
  zoom = 0;
  xan = 0;
  yan = 0;
  actionVerb = null;
  action = null;
  actionTarget = -1;
  option = null;
  childId = null;
  childX = null;
  childY = null;
  x = 0;
  y = 0;
  scrollPosition = 0;
  invSlotObjId = null;
  invSlotObjCount = null;
  seqFrame = 0;
  seqCycle = 0;
  getModel(primaryFrame, secondaryFrame, active) {
    let model = this.model;
    if (active) {
      model = this.activeModel;
    }
    if (!model) {
      return null;
    }
    if (primaryFrame === -1 && secondaryFrame === -1 && !model.faceColor) {
      return model;
    }
    const tmp = Model.modelShareColored(model, true, true, false);
    if (primaryFrame !== -1 || secondaryFrame !== -1) {
      tmp.createLabelReferences();
    }
    if (primaryFrame !== -1) {
      tmp.applyTransform(primaryFrame);
    }
    if (secondaryFrame !== -1) {
      tmp.applyTransform(secondaryFrame);
    }
    tmp.calculateNormals(64, 768, -50, -10, -50, true);
    return tmp;
  }
  getAbsoluteX() {
    if (this.layer === this.id) {
      return this.x;
    }
    let parent = Component.instances[this.layer];
    if (!parent.childId || !parent.childX || !parent.childY) {
      return this.x;
    }
    let childIndex = parent.childId.indexOf(this.id);
    if (childIndex === -1) {
      return this.x;
    }
    let x = parent.childX[childIndex];
    while (parent.layer !== parent.id) {
      const grandParent = Component.instances[parent.layer];
      if (grandParent.childId && grandParent.childX && grandParent.childY) {
        childIndex = grandParent.childId.indexOf(parent.id);
        if (childIndex !== -1) {
          x += grandParent.childX[childIndex];
        }
      }
      parent = grandParent;
    }
    return x;
  }
  getAbsoluteY() {
    if (this.layer === this.id) {
      return this.y;
    }
    let parent = Component.instances[this.layer];
    if (!parent.childId || !parent.childX || !parent.childY) {
      return this.y;
    }
    let childIndex = parent.childId.indexOf(this.id);
    if (childIndex === -1) {
      return this.y;
    }
    let y = parent.childY[childIndex];
    while (parent.layer !== parent.id) {
      const grandParent = Component.instances[parent.layer];
      if (grandParent.childId && grandParent.childX && grandParent.childY) {
        childIndex = grandParent.childId.indexOf(parent.id);
        if (childIndex !== -1) {
          y += grandParent.childY[childIndex];
        }
      }
      parent = grandParent;
    }
    return y;
  }
  outline(color) {
    const x = this.getAbsoluteX();
    const y = this.getAbsoluteY();
    Pix2D.drawRect(x, y, this.width, this.height, color);
  }
  move(x, y) {
    if (this.layer === this.id) {
      return;
    }
    this.x = 0;
    this.y = 0;
    const parent = Component.instances[this.layer];
    if (parent.childId && parent.childX && parent.childY) {
      const childIndex = parent.childId.indexOf(this.id);
      if (childIndex !== -1) {
        parent.childX[childIndex] = x;
        parent.childY[childIndex] = y;
      }
    }
  }
  delete() {
    if (this.layer === this.id) {
      return;
    }
    const parent = Component.instances[this.layer];
    if (parent.childId && parent.childX && parent.childY) {
      const childIndex = parent.childId.indexOf(this.id);
      if (childIndex !== -1) {
        parent.childId.splice(childIndex, 1);
        parent.childX.splice(childIndex, 1);
        parent.childY.splice(childIndex, 1);
      }
    }
  }
}

// src/dash3d/CollisionMap.ts
class CollisionMap {
  static index = (x, z) => x * 104 /* SIZE */ + z;
  startX;
  startZ;
  sizeX;
  sizeZ;
  flags;
  constructor() {
    this.startX = 0;
    this.startZ = 0;
    this.sizeX = 104 /* SIZE */;
    this.sizeZ = 104 /* SIZE */;
    this.flags = new Int32Array(this.sizeX * this.sizeZ);
    this.reset();
  }
  reset() {
    for (let x = 0;x < this.sizeX; x++) {
      for (let z = 0;z < this.sizeZ; z++) {
        const index = CollisionMap.index(x, z);
        if (x === 0 || z === 0 || x === this.sizeX - 1 || z === this.sizeZ - 1) {
          this.flags[index] = 16777215 /* BOUNDS */;
        } else {
          this.flags[index] = 0 /* OPEN */;
        }
      }
    }
  }
  addFloor(tileX, tileZ) {
    this.flags[CollisionMap.index(tileX - this.startX, tileZ - this.startZ)] |= 2097152 /* FLOOR */;
  }
  removeFloor(tileX, tileZ) {
    this.flags[CollisionMap.index(tileX - this.startX, tileZ - this.startZ)] &= ~2097152 /* FLOOR */;
  }
  addLoc(tileX, tileZ, sizeX, sizeZ, angle, blockrange) {
    let flags = 256 /* LOC */;
    if (blockrange) {
      flags |= 131072 /* LOC_PROJ_BLOCKER */;
    }
    const x = tileX - this.startX;
    const z = tileZ - this.startZ;
    if (angle === 1 /* NORTH */ || angle === 3 /* SOUTH */) {
      const tmp = sizeX;
      sizeX = sizeZ;
      sizeZ = tmp;
    }
    for (let tx = x;tx < x + sizeX; tx++) {
      if (!(tx >= 0 && tx < this.sizeX)) {
        continue;
      }
      for (let tz = z;tz < z + sizeZ; tz++) {
        if (!(tz >= 0 && tz < this.sizeZ)) {
          continue;
        }
        this.add(tx, tz, flags);
      }
    }
  }
  removeLoc(tileX, tileZ, sizeX, sizeZ, angle, blockrange) {
    let flags = 256 /* LOC */;
    if (blockrange) {
      flags |= 131072 /* LOC_PROJ_BLOCKER */;
    }
    const x = tileX - this.startX;
    const z = tileZ - this.startZ;
    if (angle === 1 /* NORTH */ || angle === 3 /* SOUTH */) {
      const tmp = sizeX;
      sizeX = sizeZ;
      sizeZ = tmp;
    }
    for (let tx = x;tx < x + sizeX; tx++) {
      if (!(tx >= 0 && tx < this.sizeX)) {
        continue;
      }
      for (let tz = z;tz < z + sizeZ; tz++) {
        if (!(tz >= 0 && tz < this.sizeZ)) {
          continue;
        }
        this.remove(tx, tz, flags);
      }
    }
  }
  addWall(tileX, tileZ, shape, angle, blockrange) {
    const x = tileX - this.startX;
    const z = tileZ - this.startZ;
    const west = blockrange ? 65536 /* WALL_WEST_PROJ_BLOCKER */ : 128 /* WALL_WEST */;
    const east = blockrange ? 4096 /* WALL_EAST_PROJ_BLOCKER */ : 8 /* WALL_EAST */;
    const north = blockrange ? 1024 /* WALL_NORTH_PROJ_BLOCKER */ : 2 /* WALL_NORTH */;
    const south = blockrange ? 16384 /* WALL_SOUTH_PROJ_BLOCKER */ : 32 /* WALL_SOUTH */;
    const northWest = blockrange ? 512 /* WALL_NORTH_WEST_PROJ_BLOCKER */ : 1 /* WALL_NORTH_WEST */;
    const southEast = blockrange ? 8192 /* WALL_SOUTH_EAST_PROJ_BLOCKER */ : 16 /* WALL_SOUTH_EAST */;
    const northEast = blockrange ? 2048 /* WALL_NORTH_EAST_PROJ_BLOCKER */ : 4 /* WALL_NORTH_EAST */;
    const southWest = blockrange ? 32768 /* WALL_SOUTH_WEST_PROJ_BLOCKER */ : 64 /* WALL_SOUTH_WEST */;
    if (shape === LocShape.WALL_STRAIGHT.id) {
      if (angle === 0 /* WEST */) {
        this.add(x, z, west);
        this.add(x - 1, z, east);
      } else if (angle === 1 /* NORTH */) {
        this.add(x, z, north);
        this.add(x, z + 1, south);
      } else if (angle === 2 /* EAST */) {
        this.add(x, z, east);
        this.add(x + 1, z, west);
      } else if (angle === 3 /* SOUTH */) {
        this.add(x, z, south);
        this.add(x, z - 1, north);
      }
    } else if (shape === LocShape.WALL_DIAGONAL_CORNER.id || shape === LocShape.WALL_SQUARE_CORNER.id) {
      if (angle === 0 /* WEST */) {
        this.add(x, z, northWest);
        this.add(x - 1, z + 1, southEast);
      } else if (angle === 1 /* NORTH */) {
        this.add(x, z, northEast);
        this.add(x + 1, z + 1, southWest);
      } else if (angle === 2 /* EAST */) {
        this.add(x, z, southEast);
        this.add(x + 1, z - 1, northWest);
      } else if (angle === 3 /* SOUTH */) {
        this.add(x, z, southWest);
        this.add(x - 1, z - 1, northEast);
      }
    } else if (shape === LocShape.WALL_L.id) {
      if (angle === 0 /* WEST */) {
        this.add(x, z, north | west);
        this.add(x - 1, z, east);
        this.add(x, z + 1, south);
      } else if (angle === 1 /* NORTH */) {
        this.add(x, z, north | east);
        this.add(x, z + 1, south);
        this.add(x + 1, z, west);
      } else if (angle === 2 /* EAST */) {
        this.add(x, z, south | east);
        this.add(x + 1, z, west);
        this.add(x, z - 1, north);
      } else if (angle === 3 /* SOUTH */) {
        this.add(x, z, south | west);
        this.add(x, z - 1, north);
        this.add(x - 1, z, east);
      }
    }
    if (blockrange) {
      this.addWall(tileX, tileZ, shape, angle, false);
    }
  }
  removeWall(tileX, tileZ, shape, angle, blockrange) {
    const x = tileX - this.startX;
    const z = tileZ - this.startZ;
    const west = blockrange ? 65536 /* WALL_WEST_PROJ_BLOCKER */ : 128 /* WALL_WEST */;
    const east = blockrange ? 4096 /* WALL_EAST_PROJ_BLOCKER */ : 8 /* WALL_EAST */;
    const north = blockrange ? 1024 /* WALL_NORTH_PROJ_BLOCKER */ : 2 /* WALL_NORTH */;
    const south = blockrange ? 16384 /* WALL_SOUTH_PROJ_BLOCKER */ : 32 /* WALL_SOUTH */;
    const northWest = blockrange ? 512 /* WALL_NORTH_WEST_PROJ_BLOCKER */ : 1 /* WALL_NORTH_WEST */;
    const southEast = blockrange ? 8192 /* WALL_SOUTH_EAST_PROJ_BLOCKER */ : 16 /* WALL_SOUTH_EAST */;
    const northEast = blockrange ? 2048 /* WALL_NORTH_EAST_PROJ_BLOCKER */ : 4 /* WALL_NORTH_EAST */;
    const southWest = blockrange ? 32768 /* WALL_SOUTH_WEST_PROJ_BLOCKER */ : 64 /* WALL_SOUTH_WEST */;
    if (shape === LocShape.WALL_STRAIGHT.id) {
      if (angle === 0 /* WEST */) {
        this.remove(x, z, west);
        this.remove(x - 1, z, east);
      } else if (angle === 1 /* NORTH */) {
        this.remove(x, z, north);
        this.remove(x, z + 1, south);
      } else if (angle === 2 /* EAST */) {
        this.remove(x, z, east);
        this.remove(x + 1, z, west);
      } else if (angle === 3 /* SOUTH */) {
        this.remove(x, z, south);
        this.remove(x, z - 1, north);
      }
    } else if (shape === LocShape.WALL_DIAGONAL_CORNER.id || shape === LocShape.WALL_SQUARE_CORNER.id) {
      if (angle === 0 /* WEST */) {
        this.remove(x, z, northWest);
        this.remove(x - 1, z + 1, southEast);
      } else if (angle === 1 /* NORTH */) {
        this.remove(x, z, northEast);
        this.remove(x + 1, z + 1, southWest);
      } else if (angle === 2 /* EAST */) {
        this.remove(x, z, southEast);
        this.remove(x + 1, z - 1, northWest);
      } else if (angle === 3 /* SOUTH */) {
        this.remove(x, z, southWest);
        this.remove(x - 1, z - 1, northEast);
      }
    } else if (shape === LocShape.WALL_L.id) {
      if (angle === 0 /* WEST */) {
        this.remove(x, z, north | west);
        this.remove(x - 1, z, east);
        this.remove(x, z + 1, south);
      } else if (angle === 1 /* NORTH */) {
        this.remove(x, z, north | east);
        this.remove(x, z + 1, south);
        this.remove(x + 1, z, west);
      } else if (angle === 2 /* EAST */) {
        this.remove(x, z, south | east);
        this.remove(x + 1, z, west);
        this.remove(x, z - 1, north);
      } else if (angle === 3 /* SOUTH */) {
        this.remove(x, z, south | west);
        this.remove(x, z - 1, north);
        this.remove(x - 1, z, east);
      }
    }
    if (blockrange) {
      this.removeWall(tileX, tileZ, shape, angle, false);
    }
  }
  reachedWall(sourceX, sourceZ, destX, destZ, shape, angle) {
    if (sourceX === destX && sourceZ === destZ) {
      return true;
    }
    const sx = sourceX - this.startX;
    const sz = sourceZ - this.startZ;
    const dx = destX - this.startX;
    const dz = destZ - this.startZ;
    const index = CollisionMap.index(sx, sz);
    if (shape === LocShape.WALL_STRAIGHT.id) {
      if (angle === 0 /* WEST */) {
        if (sx === dx - 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 1 /* NORTH */) {
        if (sx === dx && sz === dz + 1) {
          return true;
        } else if (sx === dx - 1 && sz === dz && (this.flags[index] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 2 /* EAST */) {
        if (sx === dx + 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 3 /* SOUTH */) {
        if (sx === dx && sz === dz - 1) {
          return true;
        } else if (sx === dx - 1 && sz === dz && (this.flags[index] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
          return true;
        }
      }
    } else if (shape === LocShape.WALL_L.id) {
      if (angle === 0 /* WEST */) {
        if (sx === dx - 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz + 1) {
          return true;
        } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 1 /* NORTH */) {
        if (sx === dx - 1 && sz === dz && (this.flags[index] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz + 1) {
          return true;
        } else if (sx === dx + 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 2 /* EAST */) {
        if (sx === dx - 1 && sz === dz && (this.flags[index] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx + 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz - 1) {
          return true;
        }
      } else if (angle === 3 /* SOUTH */) {
        if (sx === dx - 1 && sz === dz) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1) {
          return true;
        }
      }
    } else if (shape === LocShape.WALL_DIAGONAL.id) {
      if (sx === dx && sz === dz + 1 && (this.flags[index] & 32 /* WALL_SOUTH */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2 /* WALL_NORTH */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx - 1 && sz === dz && (this.flags[index] & 8 /* WALL_EAST */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 128 /* WALL_WEST */) === 0 /* OPEN */) {
        return true;
      }
    }
    return false;
  }
  reachedWallDecoration(sourceX, sourceZ, destX, destZ, shape, angle) {
    if (sourceX === destX && sourceZ === destZ) {
      return true;
    }
    const sx = sourceX - this.startX;
    const sz = sourceZ - this.startZ;
    const dx = destX - this.startX;
    const dz = destZ - this.startZ;
    const index = CollisionMap.index(sx, sz);
    if (shape === LocShape.WALLDECOR_DIAGONAL_OFFSET.id || shape === LocShape.WALLDECOR_DIAGONAL_NOOFFSET.id) {
      if (shape === LocShape.WALLDECOR_DIAGONAL_NOOFFSET.id) {
        angle = angle + 2 & 3;
      }
      if (angle === 0 /* WEST */) {
        if (sx === dx + 1 && sz === dz && (this.flags[index] & 128 /* WALL_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2 /* WALL_NORTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 1 /* NORTH */) {
        if (sx === dx - 1 && sz === dz && (this.flags[index] & 8 /* WALL_EAST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2 /* WALL_NORTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 2 /* EAST */) {
        if (sx === dx - 1 && sz === dz && (this.flags[index] & 8 /* WALL_EAST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 32 /* WALL_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      } else if (angle === 3 /* SOUTH */) {
        if (sx === dx + 1 && sz === dz && (this.flags[index] & 128 /* WALL_WEST */) === 0 /* OPEN */) {
          return true;
        } else if (sx === dx && sz === dz + 1 && (this.flags[index] & 32 /* WALL_SOUTH */) === 0 /* OPEN */) {
          return true;
        }
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_BOTH.id) {
      if (sx === dx && sz === dz + 1 && (this.flags[index] & 32 /* WALL_SOUTH */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx && sz === dz - 1 && (this.flags[index] & 2 /* WALL_NORTH */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx - 1 && sz === dz && (this.flags[index] & 8 /* WALL_EAST */) === 0 /* OPEN */) {
        return true;
      } else if (sx === dx + 1 && sz === dz && (this.flags[index] & 128 /* WALL_WEST */) === 0 /* OPEN */) {
        return true;
      }
    }
    return false;
  }
  reachedLoc(srcX, srcZ, dstX, dstZ, dstSizeX, dstSizeZ, forceapproach) {
    const maxX = dstX + dstSizeX - 1;
    const maxZ = dstZ + dstSizeZ - 1;
    const index = CollisionMap.index(srcX - this.startX, srcZ - this.startZ);
    if (srcX >= dstX && srcX <= maxX && srcZ >= dstZ && srcZ <= maxZ) {
      return true;
    } else if (srcX === dstX - 1 && srcZ >= dstZ && srcZ <= maxZ && (this.flags[index] & 8 /* WALL_EAST */) === 0 /* OPEN */ && (forceapproach & 8 /* WEST */) === 0 /* OPEN */) {
      return true;
    } else if (srcX === maxX + 1 && srcZ >= dstZ && srcZ <= maxZ && (this.flags[index] & 128 /* WALL_WEST */) === 0 /* OPEN */ && (forceapproach & 2 /* EAST */) === 0 /* OPEN */) {
      return true;
    } else if (srcZ === dstZ - 1 && srcX >= dstX && srcX <= maxX && (this.flags[index] & 2 /* WALL_NORTH */) === 0 /* OPEN */ && (forceapproach & 4 /* SOUTH */) === 0 /* OPEN */) {
      return true;
    } else if (srcZ === maxZ + 1 && srcX >= dstX && srcX <= maxX && (this.flags[index] & 32 /* WALL_SOUTH */) === 0 /* OPEN */ && (forceapproach & 1 /* NORTH */) === 0 /* OPEN */) {
      return true;
    }
    return false;
  }
  add(x, z, flags) {
    this.flags[CollisionMap.index(x, z)] |= flags;
  }
  remove(x, z, flags) {
    this.flags[CollisionMap.index(x, z)] &= 16777215 /* BOUNDS */ - flags;
  }
}

// src/dash3d/Occlude.ts
class Occlude {
  minTileX;
  maxTileX;
  minTileZ;
  maxTileZ;
  type;
  minX;
  maxX;
  minZ;
  maxZ;
  minY;
  maxY;
  mode = 0;
  minDeltaX = 0;
  maxDeltaX = 0;
  minDeltaZ = 0;
  maxDeltaZ = 0;
  minDeltaY = 0;
  maxDeltaY = 0;
  constructor(minTileX, maxTileX, minTileZ, maxTileZ, type, minX, maxX, minZ, maxZ, minY, maxY) {
    this.minTileX = minTileX;
    this.maxTileX = maxTileX;
    this.minTileZ = minTileZ;
    this.maxTileZ = maxTileZ;
    this.type = type;
    this.minX = minX;
    this.maxX = maxX;
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.minY = minY;
    this.maxY = maxY;
  }
}

// src/dash3d/type/GroundDecor.ts
class GroundDecor {
  y;
  x;
  z;
  model;
  typecode;
  info;
  constructor(y, x, z, model, typecode, info) {
    this.y = y;
    this.x = x;
    this.z = z;
    this.model = model;
    this.typecode = typecode;
    this.info = info;
  }
}

// src/dash3d/type/Loc.ts
class Location {
  locLevel;
  y;
  x;
  z;
  model;
  entity;
  yaw;
  minSceneTileX;
  maxSceneTileX;
  minSceneTileZ;
  maxSceneTileZ;
  typecode;
  info;
  distance = 0;
  cycle = 0;
  constructor(level, y, x, z, model, entity, yaw, minSceneTileX, maxSceneTileX, minSceneTileZ, maxSceneTileZ, typecode, info) {
    this.locLevel = level;
    this.y = y;
    this.x = x;
    this.z = z;
    this.model = model;
    this.entity = entity;
    this.yaw = yaw;
    this.minSceneTileX = minSceneTileX;
    this.maxSceneTileX = maxSceneTileX;
    this.minSceneTileZ = minSceneTileZ;
    this.maxSceneTileZ = maxSceneTileZ;
    this.typecode = typecode;
    this.info = info;
  }
}

// src/dash3d/type/ObjStack.ts
class ObjStack {
  y;
  x;
  z;
  topObj;
  middleObj;
  bottomObj;
  typecode;
  offset;
  constructor(y, x, z, topObj, middleObj, bottomObj, typecode, offset) {
    this.y = y;
    this.x = x;
    this.z = z;
    this.topObj = topObj;
    this.middleObj = middleObj;
    this.bottomObj = bottomObj;
    this.typecode = typecode;
    this.offset = offset;
  }
}

// src/dash3d/type/Ground.ts
class Ground extends Linkable {
  groundLevel;
  x;
  z;
  occludeLevel;
  locs;
  locSpan;
  underlay = null;
  overlay = null;
  wall = null;
  wallDecoration = null;
  groundDecoration = null;
  objStack = null;
  bridge = null;
  locCount = 0;
  locSpans = 0;
  drawLevel = 0;
  groundVisible = false;
  update = false;
  containsLocs = false;
  checkLocSpans = 0;
  blockLocSpans = 0;
  inverseBlockLocSpans = 0;
  backWallTypes = 0;
  constructor(level, x, z) {
    super();
    this.occludeLevel = this.groundLevel = level;
    this.x = x;
    this.z = z;
    this.locs = new TypedArray1d(5, null);
    this.locSpan = new Int32Array(5);
  }
}

// src/dash3d/type/TileOverlay.ts
class TileOverlay {
  static tmpScreenX = new Int32Array(6);
  static tmpScreenY = new Int32Array(6);
  static tmpViewspaceX = new Int32Array(6);
  static tmpViewspaceY = new Int32Array(6);
  static tmpViewspaceZ = new Int32Array(6);
  static SHAPE_POINTS = [
    Int8Array.of(1, 3, 5, 7),
    Int8Array.of(1, 3, 5, 7),
    Int8Array.of(1, 3, 5, 7),
    Int8Array.of(1, 3, 5, 7, 6),
    Int8Array.of(1, 3, 5, 7, 6),
    Int8Array.of(1, 3, 5, 7, 6),
    Int8Array.of(1, 3, 5, 7, 6),
    Int8Array.of(1, 3, 5, 7, 2, 6),
    Int8Array.of(1, 3, 5, 7, 2, 8),
    Int8Array.of(1, 3, 5, 7, 2, 8),
    Int8Array.of(1, 3, 5, 7, 11, 12),
    Int8Array.of(1, 3, 5, 7, 11, 12),
    Int8Array.of(1, 3, 5, 7, 13, 14)
  ];
  static SHAPE_PATHS = [
    Int8Array.of(0, 1, 2, 3, 0, 0, 1, 3),
    Int8Array.of(1, 1, 2, 3, 1, 0, 1, 3),
    Int8Array.of(0, 1, 2, 3, 1, 0, 1, 3),
    Int8Array.of(0, 0, 1, 2, 0, 0, 2, 4, 1, 0, 4, 3),
    Int8Array.of(0, 0, 1, 4, 0, 0, 4, 3, 1, 1, 2, 4),
    Int8Array.of(0, 0, 4, 3, 1, 0, 1, 2, 1, 0, 2, 4),
    Int8Array.of(0, 1, 2, 4, 1, 0, 1, 4, 1, 0, 4, 3),
    Int8Array.of(0, 4, 1, 2, 0, 4, 2, 5, 1, 0, 4, 5, 1, 0, 5, 3),
    Int8Array.of(0, 4, 1, 2, 0, 4, 2, 3, 0, 4, 3, 5, 1, 0, 4, 5),
    Int8Array.of(0, 0, 4, 5, 1, 4, 1, 2, 1, 4, 2, 3, 1, 4, 3, 5),
    Int8Array.of(0, 0, 1, 5, 0, 1, 4, 5, 0, 1, 2, 4, 1, 0, 5, 3, 1, 5, 4, 3, 1, 4, 2, 3),
    Int8Array.of(1, 0, 1, 5, 1, 1, 4, 5, 1, 1, 2, 4, 0, 0, 5, 3, 0, 5, 4, 3, 0, 4, 2, 3),
    Int8Array.of(1, 0, 5, 4, 1, 0, 1, 5, 0, 0, 4, 3, 0, 4, 5, 3, 0, 5, 2, 3, 0, 1, 2, 5)
  ];
  static FULL_SQUARE = 128;
  static HALF_SQUARE = this.FULL_SQUARE / 2 | 0;
  static CORNER_SMALL = this.FULL_SQUARE / 4 | 0;
  static CORNER_BIG = this.FULL_SQUARE * 3 / 4 | 0;
  vertexX;
  vertexY;
  vertexZ;
  triangleColorA;
  triangleColorB;
  triangleColorC;
  triangleVertexA;
  triangleVertexB;
  triangleVertexC;
  triangleTextureIds;
  flat;
  shape;
  shapeAngle;
  backgroundRgb;
  foregroundRgb;
  constructor(tileX, shape, southeastColor2, southeastY, northeastColor1, angle, southwestColor1, northwestY, foregroundRgb, southwestColor2, textureId, northwestColor2, backgroundRgb, northeastY, northeastColor2, northwestColor1, southwestY, tileZ, southeastColor1) {
    this.flat = !(southwestY !== southeastY || southwestY !== northeastY || southwestY !== northwestY);
    this.shape = shape;
    this.shapeAngle = angle;
    this.backgroundRgb = backgroundRgb;
    this.foregroundRgb = foregroundRgb;
    const points = TileOverlay.SHAPE_POINTS[shape];
    const vertexCount = points.length;
    this.vertexX = new Int32Array(vertexCount);
    this.vertexY = new Int32Array(vertexCount);
    this.vertexZ = new Int32Array(vertexCount);
    const primaryColors = new Int32Array(vertexCount);
    const secondaryColors = new Int32Array(vertexCount);
    const sceneX = tileX * TileOverlay.FULL_SQUARE;
    const sceneZ = tileZ * TileOverlay.FULL_SQUARE;
    for (let v = 0;v < vertexCount; v++) {
      let type = points[v];
      if ((type & 1) === 0 && type <= 8) {
        type = (type - angle - angle - 1 & 7) + 1;
      }
      if (type > 8 && type <= 12) {
        type = (type - angle - 9 & 3) + 9;
      }
      if (type > 12 && type <= 16) {
        type = (type - angle - 13 & 3) + 13;
      }
      let x;
      let z;
      let y;
      let color1;
      let color2;
      if (type === 1) {
        x = sceneX;
        z = sceneZ;
        y = southwestY;
        color1 = southwestColor1;
        color2 = southwestColor2;
      } else if (type === 2) {
        x = sceneX + TileOverlay.HALF_SQUARE;
        z = sceneZ;
        y = southwestY + southeastY >> 1;
        color1 = southwestColor1 + southeastColor1 >> 1;
        color2 = southwestColor2 + southeastColor2 >> 1;
      } else if (type === 3) {
        x = sceneX + TileOverlay.FULL_SQUARE;
        z = sceneZ;
        y = southeastY;
        color1 = southeastColor1;
        color2 = southeastColor2;
      } else if (type === 4) {
        x = sceneX + TileOverlay.FULL_SQUARE;
        z = sceneZ + TileOverlay.HALF_SQUARE;
        y = southeastY + northeastY >> 1;
        color1 = southeastColor1 + northeastColor1 >> 1;
        color2 = southeastColor2 + northeastColor2 >> 1;
      } else if (type === 5) {
        x = sceneX + TileOverlay.FULL_SQUARE;
        z = sceneZ + TileOverlay.FULL_SQUARE;
        y = northeastY;
        color1 = northeastColor1;
        color2 = northeastColor2;
      } else if (type === 6) {
        x = sceneX + TileOverlay.HALF_SQUARE;
        z = sceneZ + TileOverlay.FULL_SQUARE;
        y = northeastY + northwestY >> 1;
        color1 = northeastColor1 + northwestColor1 >> 1;
        color2 = northeastColor2 + northwestColor2 >> 1;
      } else if (type === 7) {
        x = sceneX;
        z = sceneZ + TileOverlay.FULL_SQUARE;
        y = northwestY;
        color1 = northwestColor1;
        color2 = northwestColor2;
      } else if (type === 8) {
        x = sceneX;
        z = sceneZ + TileOverlay.HALF_SQUARE;
        y = northwestY + southwestY >> 1;
        color1 = northwestColor1 + southwestColor1 >> 1;
        color2 = northwestColor2 + southwestColor2 >> 1;
      } else if (type === 9) {
        x = sceneX + TileOverlay.HALF_SQUARE;
        z = sceneZ + TileOverlay.CORNER_SMALL;
        y = southwestY + southeastY >> 1;
        color1 = southwestColor1 + southeastColor1 >> 1;
        color2 = southwestColor2 + southeastColor2 >> 1;
      } else if (type === 10) {
        x = sceneX + TileOverlay.CORNER_BIG;
        z = sceneZ + TileOverlay.HALF_SQUARE;
        y = southeastY + northeastY >> 1;
        color1 = southeastColor1 + northeastColor1 >> 1;
        color2 = southeastColor2 + northeastColor2 >> 1;
      } else if (type === 11) {
        x = sceneX + TileOverlay.HALF_SQUARE;
        z = sceneZ + TileOverlay.CORNER_BIG;
        y = northeastY + northwestY >> 1;
        color1 = northeastColor1 + northwestColor1 >> 1;
        color2 = northeastColor2 + northwestColor2 >> 1;
      } else if (type === 12) {
        x = sceneX + TileOverlay.CORNER_SMALL;
        z = sceneZ + TileOverlay.HALF_SQUARE;
        y = northwestY + southwestY >> 1;
        color1 = northwestColor1 + southwestColor1 >> 1;
        color2 = northwestColor2 + southwestColor2 >> 1;
      } else if (type === 13) {
        x = sceneX + TileOverlay.CORNER_SMALL;
        z = sceneZ + TileOverlay.CORNER_SMALL;
        y = southwestY;
        color1 = southwestColor1;
        color2 = southwestColor2;
      } else if (type === 14) {
        x = sceneX + TileOverlay.CORNER_BIG;
        z = sceneZ + TileOverlay.CORNER_SMALL;
        y = southeastY;
        color1 = southeastColor1;
        color2 = southeastColor2;
      } else if (type === 15) {
        x = sceneX + TileOverlay.CORNER_BIG;
        z = sceneZ + TileOverlay.CORNER_BIG;
        y = northeastY;
        color1 = northeastColor1;
        color2 = northeastColor2;
      } else {
        x = sceneX + TileOverlay.CORNER_SMALL;
        z = sceneZ + TileOverlay.CORNER_BIG;
        y = northwestY;
        color1 = northwestColor1;
        color2 = northwestColor2;
      }
      this.vertexX[v] = x;
      this.vertexY[v] = y;
      this.vertexZ[v] = z;
      primaryColors[v] = color1;
      secondaryColors[v] = color2;
    }
    const paths = TileOverlay.SHAPE_PATHS[shape];
    const triangleCount = paths.length / 4 | 0;
    this.triangleVertexA = new Int32Array(triangleCount);
    this.triangleVertexB = new Int32Array(triangleCount);
    this.triangleVertexC = new Int32Array(triangleCount);
    this.triangleColorA = new Int32Array(triangleCount);
    this.triangleColorB = new Int32Array(triangleCount);
    this.triangleColorC = new Int32Array(triangleCount);
    if (textureId !== -1) {
      this.triangleTextureIds = new Int32Array(triangleCount);
    } else {
      this.triangleTextureIds = null;
    }
    let index = 0;
    for (let t = 0;t < triangleCount; t++) {
      const color = paths[index];
      let a = paths[index + 1];
      let b = paths[index + 2];
      let c = paths[index + 3];
      index += 4;
      if (a < 4) {
        a = a - angle & 3;
      }
      if (b < 4) {
        b = b - angle & 3;
      }
      if (c < 4) {
        c = c - angle & 3;
      }
      this.triangleVertexA[t] = a;
      this.triangleVertexB[t] = b;
      this.triangleVertexC[t] = c;
      if (color === 0) {
        this.triangleColorA[t] = primaryColors[a];
        this.triangleColorB[t] = primaryColors[b];
        this.triangleColorC[t] = primaryColors[c];
        if (this.triangleTextureIds) {
          this.triangleTextureIds[t] = -1;
        }
      } else {
        this.triangleColorA[t] = secondaryColors[a];
        this.triangleColorB[t] = secondaryColors[b];
        this.triangleColorC[t] = secondaryColors[c];
        if (this.triangleTextureIds) {
          this.triangleTextureIds[t] = textureId;
        }
      }
    }
  }
}

// src/dash3d/type/TileUnderlay.ts
class TileUnderlay {
  southwestColor;
  southeastColor;
  northeastColor;
  northwestColor;
  textureId;
  colour;
  flat;
  constructor(southwestColor, southeastColor, northeastColor, northwestColor, textureId, color, flat) {
    this.southwestColor = southwestColor;
    this.southeastColor = southeastColor;
    this.northeastColor = northeastColor;
    this.northwestColor = northwestColor;
    this.textureId = textureId;
    this.colour = color;
    this.flat = flat;
  }
}

// src/dash3d/type/Wall.ts
class Wall {
  y;
  x;
  z;
  typeA;
  typeB;
  modelA;
  modelB;
  typecode;
  info;
  constructor(y, x, z, typeA, typeB, modelA, modelB, typecode, info) {
    this.y = y;
    this.x = x;
    this.z = z;
    this.typeA = typeA;
    this.typeB = typeB;
    this.modelA = modelA;
    this.modelB = modelB;
    this.typecode = typecode;
    this.info = info;
  }
}

// src/dash3d/type/Decor.ts
class Decor {
  y;
  x;
  z;
  decorType;
  decorAngle;
  model;
  typecode;
  info;
  constructor(y, x, z, type, angle, model, typecode, info) {
    this.y = y;
    this.x = x;
    this.z = z;
    this.decorType = type;
    this.decorAngle = angle;
    this.model = model;
    this.typecode = typecode;
    this.info = info;
  }
}

// src/dash3d/World3D.ts
class World3D {
  static visibilityMatrix = new TypedArray4d(8, 32, 51, 51, false);
  static locBuffer = new TypedArray1d(100, null);
  static levelOccluderCount = new Int32Array(4 /* LEVELS */);
  static levelOccluders = new TypedArray2d(4 /* LEVELS */, 500, null);
  static activeOccluders = new TypedArray1d(500, null);
  static drawTileQueue = new LinkList;
  static cycle = 0;
  static viewportLeft = 0;
  static viewportTop = 0;
  static viewportRight = 0;
  static viewportBottom = 0;
  static viewportCenterX = 0;
  static viewportCenterY = 0;
  static sinEyePitch = 0;
  static cosEyePitch = 0;
  static sinEyeYaw = 0;
  static cosEyeYaw = 0;
  static eyeX = 0;
  static eyeY = 0;
  static eyeZ = 0;
  static eyeTileX = 0;
  static eyeTileZ = 0;
  static minDrawTileX = 0;
  static maxDrawTileX = 0;
  static minDrawTileZ = 0;
  static maxDrawTileZ = 0;
  static topLevel = 0;
  static tilesRemaining = 0;
  static takingInput = false;
  static visibilityMap = null;
  static FRONT_WALL_TYPES = Uint8Array.of(19, 55, 38, 155, 255, 110, 137, 205, 76);
  static DIRECTION_ALLOW_WALL_CORNER_TYPE = Uint8Array.of(160, 192, 80, 96, 0, 144, 80, 48, 160);
  static BACK_WALL_TYPES = Uint8Array.of(76, 8, 137, 4, 0, 1, 38, 2, 19);
  static WALL_CORNER_TYPE_16_BLOCK_LOC_SPANS = Int8Array.of(0, 0, 2, 0, 0, 2, 1, 1, 0);
  static WALL_CORNER_TYPE_32_BLOCK_LOC_SPANS = Int8Array.of(2, 0, 0, 2, 0, 0, 0, 4, 4);
  static WALL_CORNER_TYPE_64_BLOCK_LOC_SPANS = Int8Array.of(0, 4, 4, 8, 0, 0, 8, 0, 0);
  static WALL_CORNER_TYPE_128_BLOCK_LOC_SPANS = Int8Array.of(1, 1, 0, 0, 0, 8, 0, 0, 8);
  static WALL_DECORATION_INSET_X = Int8Array.of(53, -53, -53, 53);
  static WALL_DECORATION_INSET_Z = Int8Array.of(-53, -53, 53, 53);
  static WALL_DECORATION_OUTSET_X = Int8Array.of(-45, 45, 45, -45);
  static WALL_DECORATION_OUTSET_Z = Int8Array.of(45, 45, -45, -45);
  static MINIMAP_TILE_MASK = [
    new Int8Array(16),
    Int8Array.of(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    Int8Array.of(1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1),
    Int8Array.of(1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0),
    Int8Array.of(0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1),
    Int8Array.of(0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    Int8Array.of(1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1),
    Int8Array.of(1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0),
    Int8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0),
    Int8Array.of(1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1),
    Int8Array.of(1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0),
    Int8Array.of(0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1),
    Int8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1)
  ];
  static MINIMAP_TILE_ROTATION_MAP = [
    Int8Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15),
    Int8Array.of(12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3),
    Int8Array.of(15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0),
    Int8Array.of(3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12)
  ];
  static TEXTURE_HSL = Int32Array.of(41, 39248, 41, 4643, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 43086, 41, 41, 41, 41, 41, 41, 41, 8602, 41, 28992, 41, 41, 41, 41, 41, 5056, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 3131, 41, 41, 41);
  static activeOccluderCount = 0;
  static mouseX = 0;
  static mouseY = 0;
  static clickTileX = -1;
  static clickTileZ = -1;
  static lowMemory = true;
  static init(viewportWidth, viewportHeight, frustumStart, frustumEnd, pitchDistance) {
    this.viewportLeft = 0;
    this.viewportTop = 0;
    this.viewportRight = viewportWidth;
    this.viewportBottom = viewportHeight;
    this.viewportCenterX = viewportWidth / 2 | 0;
    this.viewportCenterY = viewportHeight / 2 | 0;
    const matrix = new TypedArray4d(9, 32, 53, 53, false);
    for (let pitch = 128;pitch <= 384; pitch += 32) {
      for (let yaw = 0;yaw < 2048; yaw += 64) {
        this.sinEyePitch = Pix3D.sin[pitch];
        this.cosEyePitch = Pix3D.cos[pitch];
        this.sinEyeYaw = Pix3D.sin[yaw];
        this.cosEyeYaw = Pix3D.cos[yaw];
        const pitchLevel = (pitch - 128) / 32 | 0;
        const yawLevel = yaw / 64 | 0;
        for (let dx = -26;dx <= 26; dx++) {
          for (let dz = -26;dz <= 26; dz++) {
            const x = dx * 128;
            const z = dz * 128;
            let visible = false;
            for (let y = -frustumStart;y <= frustumEnd; y += 128) {
              if (this.testPoint(x, z, pitchDistance[pitchLevel] + y)) {
                visible = true;
                break;
              }
            }
            matrix[pitchLevel][yawLevel][dx + 25 + 1][dz + 25 + 1] = visible;
          }
        }
      }
    }
    for (let pitchLevel = 0;pitchLevel < 8; pitchLevel++) {
      for (let yawLevel = 0;yawLevel < 32; yawLevel++) {
        for (let x = -25;x < 25; x++) {
          for (let z = -25;z < 25; z++) {
            let visible = false;
            check_areas:
              for (let dx = -1;dx <= 1; dx++) {
                for (let dz = -1;dz <= 1; dz++) {
                  if (matrix[pitchLevel][yawLevel][x + dx + 25 + 1][z + dz + 25 + 1]) {
                    visible = true;
                    break check_areas;
                  }
                  if (matrix[pitchLevel][(yawLevel + 1) % 31][x + dx + 25 + 1][z + dz + 25 + 1]) {
                    visible = true;
                    break check_areas;
                  }
                  if (matrix[pitchLevel + 1][yawLevel][x + dx + 25 + 1][z + dz + 25 + 1]) {
                    visible = true;
                    break check_areas;
                  }
                  if (matrix[pitchLevel + 1][(yawLevel + 1) % 31][x + dx + 25 + 1][z + dz + 25 + 1]) {
                    visible = true;
                    break check_areas;
                  }
                }
              }
            this.visibilityMatrix[pitchLevel][yawLevel][x + 25][z + 25] = visible;
          }
        }
      }
    }
  }
  static addOccluder(level, type, minX, minY, minZ, maxX, maxY, maxZ) {
    World3D.levelOccluders[level][World3D.levelOccluderCount[level]++] = new Occlude(minX / 128 | 0, maxX / 128 | 0, minZ / 128 | 0, maxZ / 128 | 0, type, minX, maxX, minZ, maxZ, minY, maxY);
  }
  static testPoint(x, z, y) {
    const px = z * this.sinEyeYaw + x * this.cosEyeYaw >> 16;
    const tmp = z * this.cosEyeYaw - x * this.sinEyeYaw >> 16;
    const pz = y * this.sinEyePitch + tmp * this.cosEyePitch >> 16;
    const py = y * this.cosEyePitch - tmp * this.sinEyePitch >> 16;
    if (pz < 50 || pz > 3500) {
      return false;
    }
    const viewportX = this.viewportCenterX + ((px << 9) / pz | 0);
    const viewportY = this.viewportCenterY + ((py << 9) / pz | 0);
    return viewportX >= this.viewportLeft && viewportX <= this.viewportRight && viewportY >= this.viewportTop && viewportY <= this.viewportBottom;
  }
  maxLevel;
  maxTileX;
  maxTileZ;
  levelHeightmaps;
  levelTiles;
  temporaryLocs;
  levelTileOcclusionCycles;
  mergeIndexA;
  mergeIndexB;
  temporaryLocCount = 0;
  minLevel = 0;
  tmpMergeIndex = 0;
  constructor(levelHeightmaps, maxTileZ, maxLevel, maxTileX) {
    this.maxLevel = maxLevel;
    this.maxTileX = maxTileX;
    this.maxTileZ = maxTileZ;
    this.levelTiles = new TypedArray3d(maxLevel, maxTileX, maxTileZ, null);
    this.levelTileOcclusionCycles = new Int32Array3d(maxLevel, maxTileX + 1, maxTileZ + 1);
    this.levelHeightmaps = levelHeightmaps;
    this.temporaryLocs = new TypedArray1d(5000, null);
    this.mergeIndexA = new Int32Array(1e4);
    this.mergeIndexB = new Int32Array(1e4);
    this.reset();
  }
  reset() {
    for (let level = 0;level < this.maxLevel; level++) {
      for (let x = 0;x < this.maxTileX; x++) {
        for (let z = 0;z < this.maxTileZ; z++) {
          this.levelTiles[level][x][z] = null;
        }
      }
    }
    for (let l = 0;l < 4 /* LEVELS */; l++) {
      for (let o = 0;o < World3D.levelOccluderCount[l]; o++) {
        World3D.levelOccluders[l][o] = null;
      }
      World3D.levelOccluderCount[l] = 0;
    }
    for (let i = 0;i < this.temporaryLocCount; i++) {
      this.temporaryLocs[i] = null;
    }
    this.temporaryLocCount = 0;
    World3D.locBuffer.fill(null);
  }
  setMinLevel(level) {
    this.minLevel = level;
    for (let stx = 0;stx < this.maxTileX; stx++) {
      for (let stz = 0;stz < this.maxTileZ; stz++) {
        this.levelTiles[level][stx][stz] = new Ground(level, stx, stz);
      }
    }
  }
  setBridge(stx, stz) {
    const ground = this.levelTiles[0][stx][stz];
    for (let level = 0;level < 3; level++) {
      this.levelTiles[level][stx][stz] = this.levelTiles[level + 1][stx][stz];
      const tile2 = this.levelTiles[level][stx][stz];
      if (tile2) {
        tile2.groundLevel--;
      }
    }
    if (!this.levelTiles[0][stx][stz]) {
      this.levelTiles[0][stx][stz] = new Ground(0, stx, stz);
    }
    const tile = this.levelTiles[0][stx][stz];
    if (tile) {
      tile.bridge = ground;
    }
    this.levelTiles[3][stx][stz] = null;
  }
  setDrawLevel(level, stx, stz, drawLevel) {
    const tile = this.levelTiles[level][stx][stz];
    if (!tile) {
      return;
    }
    tile.drawLevel = drawLevel;
  }
  setTile(level, x, z, shape, angle, textureId, southwestY, southeastY, northeastY, northwestY, southwestColor, southeastColor, northeastColor, northwestColor, southwestColor2, southeastColor2, northeastColor2, northwestColor2, backgroundRgb, foregroundRgb) {
    if (shape === 0 /* PLAIN */) {
      for (let l = level;l >= 0; l--) {
        if (!this.levelTiles[l][x][z]) {
          this.levelTiles[l][x][z] = new Ground(l, x, z);
        }
      }
      const tile = this.levelTiles[level][x][z];
      if (tile) {
        tile.underlay = new TileUnderlay(southwestColor, southeastColor, northeastColor, northwestColor, -1, backgroundRgb, false);
      }
    } else if (shape === 1 /* DIAGONAL */) {
      for (let l = level;l >= 0; l--) {
        if (!this.levelTiles[l][x][z]) {
          this.levelTiles[l][x][z] = new Ground(l, x, z);
        }
      }
      const tile = this.levelTiles[level][x][z];
      if (tile) {
        tile.underlay = new TileUnderlay(southwestColor2, southeastColor2, northeastColor2, northwestColor2, textureId, foregroundRgb, southwestY === southeastY && southwestY === northeastY && southwestY === northwestY);
      }
    } else {
      for (let l = level;l >= 0; l--) {
        if (!this.levelTiles[l][x][z]) {
          this.levelTiles[l][x][z] = new Ground(l, x, z);
        }
      }
      const tile = this.levelTiles[level][x][z];
      if (tile) {
        tile.overlay = new TileOverlay(x, shape, southeastColor2, southeastY, northeastColor, angle, southwestColor, northwestY, foregroundRgb, southwestColor2, textureId, northwestColor2, backgroundRgb, northeastY, northeastColor2, northwestColor, southwestY, z, southeastColor);
      }
    }
  }
  addGroundDecoration(model, tileLevel, tileX, tileZ, y, typecode, info) {
    if (!this.levelTiles[tileLevel][tileX][tileZ]) {
      this.levelTiles[tileLevel][tileX][tileZ] = new Ground(tileLevel, tileX, tileZ);
    }
    const tile = this.levelTiles[tileLevel][tileX][tileZ];
    if (tile) {
      tile.groundDecoration = new GroundDecor(y, tileX * 128 + 64, tileZ * 128 + 64, model, typecode, info);
    }
  }
  removeGroundDecoration(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    tile.groundDecoration = null;
  }
  addObjStack(stx, stz, y, level, typecode, topObj, middleObj, bottomObj) {
    let stackOffset = 0;
    const tile = this.levelTiles[level][stx][stz];
    if (tile) {
      for (let l = 0;l < tile.locCount; l++) {
        const loc = tile.locs[l];
        if (!loc || !loc.model) {
          continue;
        }
        const height = loc.model.objRaise;
        if (height > stackOffset) {
          stackOffset = height;
        }
      }
    } else {
      this.levelTiles[level][stx][stz] = new Ground(level, stx, stz);
    }
    const tile2 = this.levelTiles[level][stx][stz];
    if (tile2) {
      tile2.objStack = new ObjStack(y, stx * 128 + 64, stz * 128 + 64, topObj, middleObj, bottomObj, typecode, stackOffset);
    }
  }
  removeObjStack(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    tile.objStack = null;
  }
  addWall(level, tileX, tileZ, y, typeA, typeB, modelA, modelB, typecode, info) {
    if (!modelA && !modelB) {
      return;
    }
    for (let l = level;l >= 0; l--) {
      if (!this.levelTiles[l][tileX][tileZ]) {
        this.levelTiles[l][tileX][tileZ] = new Ground(l, tileX, tileZ);
      }
    }
    const tile = this.levelTiles[level][tileX][tileZ];
    if (tile) {
      tile.wall = new Wall(y, tileX * 128 + 64, tileZ * 128 + 64, typeA, typeB, modelA, modelB, typecode, info);
    }
  }
  removeWall(level, x, z, force) {
    const tile = this.levelTiles[level][x][z];
    if (force === 1 && tile) {
      tile.wall = null;
    }
  }
  setWallDecoration(level, tileX, tileZ, y, offsetX, offsetZ, typecode, model, info, angle, type) {
    if (!model) {
      return;
    }
    for (let l = level;l >= 0; l--) {
      if (!this.levelTiles[l][tileX][tileZ]) {
        this.levelTiles[l][tileX][tileZ] = new Ground(l, tileX, tileZ);
      }
    }
    const tile = this.levelTiles[level][tileX][tileZ];
    if (tile) {
      tile.wallDecoration = new Decor(y, tileX * 128 + offsetX + 64, tileZ * 128 + offsetZ + 64, type, angle, model, typecode, info);
    }
  }
  removeWallDecoration(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    tile.wallDecoration = null;
  }
  setWallDecorationOffset(level, x, z, offset) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const decor = tile.wallDecoration;
    if (!decor) {
      return;
    }
    const sx = x * 128 + 64;
    const sz = z * 128 + 64;
    decor.x = sx + ((decor.x - sx) * offset / 16 | 0);
    decor.z = sz + ((decor.z - sz) * offset / 16 | 0);
  }
  setWallDecorationModel(level, x, z, model) {
    if (!model) {
      return;
    }
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const decor = tile.wallDecoration;
    if (!decor) {
      return;
    }
    decor.model = model;
  }
  setGroundDecorationModel(level, x, z, model) {
    if (!model) {
      return;
    }
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const decor = tile.groundDecoration;
    if (!decor) {
      return;
    }
    decor.model = model;
  }
  setWallModel(level, x, z, model) {
    if (!model) {
      return;
    }
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const wall = tile.wall;
    if (!wall) {
      return;
    }
    wall.modelA = model;
  }
  setWallModels(x, z, level, modelA, modelB) {
    if (!modelA) {
      return;
    }
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const wall = tile.wall;
    if (!wall) {
      return;
    }
    wall.modelA = modelA;
    wall.modelB = modelB;
  }
  addLoc(level, tileX, tileZ, y, model, entity, typecode, info, width, length, yaw) {
    if (!model && !entity) {
      return true;
    }
    const sceneX = tileX * 128 + width * 64;
    const sceneZ = tileZ * 128 + length * 64;
    return this.addLoc2(sceneX, sceneZ, y, level, tileX, tileZ, width, length, model, entity, typecode, info, yaw, false);
  }
  addTemporary(level, x, y, z, model, entity, typecode, yaw, padding, forwardPadding) {
    if (!model && !entity) {
      return true;
    }
    let x0 = x - padding;
    let z0 = z - padding;
    let x1 = x + padding;
    let z1 = z + padding;
    if (forwardPadding) {
      if (yaw > 640 && yaw < 1408) {
        z1 += 128;
      }
      if (yaw > 1152 && yaw < 1920) {
        x1 += 128;
      }
      if (yaw > 1664 || yaw < 384) {
        z0 -= 128;
      }
      if (yaw > 128 && yaw < 896) {
        x0 -= 128;
      }
    }
    x0 = x0 / 128 | 0;
    z0 = z0 / 128 | 0;
    x1 = x1 / 128 | 0;
    z1 = z1 / 128 | 0;
    return this.addLoc2(x, z, y, level, x0, z0, x1 + 1 - x0, z1 - z0 + 1, model, entity, typecode, 0, yaw, true);
  }
  addTemporary2(level, x, y, z, minTileX, minTileZ, maxTileX, maxTileZ, model, entity, typecode, yaw) {
    return !model && !entity || this.addLoc2(x, z, y, level, minTileX, minTileZ, maxTileX + 1 - minTileX, maxTileZ - minTileZ + 1, model, entity, typecode, 0, yaw, true);
  }
  removeLoc(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    for (let l = 0;l < tile.locCount; l++) {
      const loc = tile.locs[l];
      if (loc && (loc.typecode >> 29 & 3) === 2 && loc.minSceneTileX === x && loc.minSceneTileZ === z) {
        this.removeLoc2(loc);
        return;
      }
    }
  }
  setLocModel(level, x, z, model) {
    if (!model) {
      return;
    }
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    for (let i = 0;i < tile.locCount; i++) {
      const loc = tile.locs[i];
      if (loc && (loc.typecode >> 29 & 3) === 2) {
        loc.model = model;
        return;
      }
    }
  }
  clearTemporaryLocs() {
    for (let i = 0;i < this.temporaryLocCount; i++) {
      const loc = this.temporaryLocs[i];
      if (loc) {
        this.removeLoc2(loc);
      }
      this.temporaryLocs[i] = null;
    }
    this.temporaryLocCount = 0;
  }
  getWallTypecode(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    return !tile || !tile.wall ? 0 : tile.wall.typecode;
  }
  getDecorTypecode(level, z, x) {
    const tile = this.levelTiles[level][x][z];
    return !tile || !tile.wallDecoration ? 0 : tile.wallDecoration.typecode;
  }
  getLocTypecode(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return 0;
    }
    for (let l = 0;l < tile.locCount; l++) {
      const loc = tile.locs[l];
      if (loc && (loc.typecode >> 29 & 3) === 2 && loc.minSceneTileX === x && loc.minSceneTileZ === z) {
        return loc.typecode;
      }
    }
    return 0;
  }
  getGroundDecorTypecode(level, x, z) {
    const tile = this.levelTiles[level][x][z];
    return !tile || !tile.groundDecoration ? 0 : tile.groundDecoration.typecode;
  }
  getInfo(level, x, z, typecode) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return -1;
    } else if (tile.wall && tile.wall.typecode === typecode) {
      return tile.wall.info & 255;
    } else if (tile.wallDecoration && tile.wallDecoration.typecode === typecode) {
      return tile.wallDecoration.info & 255;
    } else if (tile.groundDecoration && tile.groundDecoration.typecode === typecode) {
      return tile.groundDecoration.info & 255;
    } else {
      for (let i = 0;i < tile.locCount; i++) {
        const loc = tile.locs[i];
        if (loc && loc.typecode === typecode) {
          return loc.info & 255;
        }
      }
      return -1;
    }
  }
  buildModels(lightAmbient, lightAttenuation, lightSrcX, lightSrcY, lightSrcZ) {
    const lightMagnitude = Math.sqrt(lightSrcX * lightSrcX + lightSrcY * lightSrcY + lightSrcZ * lightSrcZ) | 0;
    const attenuation = lightAttenuation * lightMagnitude >> 8;
    for (let level = 0;level < this.maxLevel; level++) {
      for (let tileX = 0;tileX < this.maxTileX; tileX++) {
        for (let tileZ = 0;tileZ < this.maxTileZ; tileZ++) {
          const tile = this.levelTiles[level][tileX][tileZ];
          if (!tile) {
            continue;
          }
          const wall = tile.wall;
          if (wall && wall.modelA && wall.modelA.vertexNormal) {
            this.mergeLocNormals(level, tileX, tileZ, 1, 1, wall.modelA);
            if (wall.modelB && wall.modelB.vertexNormal) {
              this.mergeLocNormals(level, tileX, tileZ, 1, 1, wall.modelB);
              this.mergeNormals(wall.modelA, wall.modelB, 0, 0, 0, false);
              wall.modelB.applyLighting(lightAmbient, attenuation, lightSrcX, lightSrcY, lightSrcZ);
            }
            wall.modelA.applyLighting(lightAmbient, attenuation, lightSrcX, lightSrcY, lightSrcZ);
          }
          for (let i = 0;i < tile.locCount; i++) {
            const loc = tile.locs[i];
            if (loc && loc.model && loc.model.vertexNormal) {
              this.mergeLocNormals(level, tileX, tileZ, loc.maxSceneTileX + 1 - loc.minSceneTileX, loc.maxSceneTileZ - loc.minSceneTileZ + 1, loc.model);
              loc.model.applyLighting(lightAmbient, attenuation, lightSrcX, lightSrcY, lightSrcZ);
            }
          }
          const decor = tile.groundDecoration;
          if (decor && decor.model && decor.model.vertexNormal) {
            this.mergeGroundDecorationNormals(level, tileX, tileZ, decor.model);
            decor.model.applyLighting(lightAmbient, attenuation, lightSrcX, lightSrcY, lightSrcZ);
          }
        }
      }
    }
  }
  mergeGroundDecorationNormals(level, tileX, tileZ, model) {
    if (tileX < this.maxTileX) {
      const tile = this.levelTiles[level][tileX + 1][tileZ];
      if (tile && tile.groundDecoration && tile.groundDecoration.model && tile.groundDecoration.model.vertexNormal) {
        this.mergeNormals(model, tile.groundDecoration.model, 128, 0, 0, true);
      }
    }
    if (tileZ < this.maxTileX) {
      const tile = this.levelTiles[level][tileX][tileZ + 1];
      if (tile && tile.groundDecoration && tile.groundDecoration.model && tile.groundDecoration.model.vertexNormal) {
        this.mergeNormals(model, tile.groundDecoration.model, 0, 0, 128, true);
      }
    }
    if (tileX < this.maxTileX && tileZ < this.maxTileZ) {
      const tile = this.levelTiles[level][tileX + 1][tileZ + 1];
      if (tile && tile.groundDecoration && tile.groundDecoration.model && tile.groundDecoration.model.vertexNormal) {
        this.mergeNormals(model, tile.groundDecoration.model, 128, 0, 128, true);
      }
    }
    if (tileX < this.maxTileX && tileZ > 0) {
      const tile = this.levelTiles[level][tileX + 1][tileZ - 1];
      if (tile && tile.groundDecoration && tile.groundDecoration.model && tile.groundDecoration.model.vertexNormal) {
        this.mergeNormals(model, tile.groundDecoration.model, 128, 0, -128, true);
      }
    }
  }
  mergeLocNormals(level, tileX, tileZ, tileSizeX, tileSizeZ, model) {
    let allowFaceRemoval = true;
    let minTileX = tileX;
    const maxTileX = tileX + tileSizeX;
    const minTileZ = tileZ - 1;
    const maxTileZ = tileZ + tileSizeZ;
    for (let l = level;l <= level + 1; l++) {
      if (l === this.maxLevel) {
        continue;
      }
      for (let x = minTileX;x <= maxTileX; x++) {
        if (x < 0 || x >= this.maxTileX) {
          continue;
        }
        for (let z = minTileZ;z <= maxTileZ; z++) {
          if (z < 0 || z >= this.maxTileZ || allowFaceRemoval && x < maxTileX && z < maxTileZ && (z >= tileZ || x === tileX)) {
            continue;
          }
          const tile = this.levelTiles[l][x][z];
          if (!tile) {
            continue;
          }
          const offsetX = (x - tileX) * 128 + (1 - tileSizeX) * 64;
          const offsetZ = (z - tileZ) * 128 + (1 - tileSizeZ) * 64;
          const offsetY = ((this.levelHeightmaps[l][x][z] + this.levelHeightmaps[l][x + 1][z] + this.levelHeightmaps[l][x][z + 1] + this.levelHeightmaps[l][x + 1][z + 1]) / 4 | 0) - ((this.levelHeightmaps[level][tileX][tileZ] + this.levelHeightmaps[level][tileX + 1][tileZ] + this.levelHeightmaps[level][tileX][tileZ + 1] + this.levelHeightmaps[level][tileX + 1][tileZ + 1]) / 4 | 0);
          const wall = tile.wall;
          if (wall && wall.modelA && wall.modelA.vertexNormal) {
            this.mergeNormals(model, wall.modelA, offsetX, offsetY, offsetZ, allowFaceRemoval);
          }
          if (wall && wall.modelB && wall.modelB.vertexNormal) {
            this.mergeNormals(model, wall.modelB, offsetX, offsetY, offsetZ, allowFaceRemoval);
          }
          for (let i = 0;i < tile.locCount; i++) {
            const loc = tile.locs[i];
            if (!loc || !loc.model || !loc.model.vertexNormal) {
              continue;
            }
            const locTileSizeX = loc.maxSceneTileX + 1 - loc.minSceneTileX;
            const locTileSizeZ = loc.maxSceneTileZ + 1 - loc.minSceneTileZ;
            this.mergeNormals(model, loc.model, (loc.minSceneTileX - tileX) * 128 + (locTileSizeX - tileSizeX) * 64, offsetY, (loc.minSceneTileZ - tileZ) * 128 + (locTileSizeZ - tileSizeZ) * 64, allowFaceRemoval);
          }
        }
      }
      minTileX--;
      allowFaceRemoval = false;
    }
  }
  mergeNormals(modelA, modelB, offsetX, offsetY, offsetZ, allowFaceRemoval) {
    this.tmpMergeIndex++;
    let merged = 0;
    const vertexX = modelB.vertexX;
    const vertexCountB = modelB.vertexCount;
    if (modelA.vertexNormal && modelA.vertexNormalOriginal) {
      for (let vertexA = 0;vertexA < modelA.vertexCount; vertexA++) {
        const normalA = modelA.vertexNormal[vertexA];
        const originalNormalA = modelA.vertexNormalOriginal[vertexA];
        if (originalNormalA && originalNormalA.w !== 0) {
          const y = modelA.vertexY[vertexA] - offsetY;
          if (y > modelB.minY) {
            continue;
          }
          const x = modelA.vertexX[vertexA] - offsetX;
          if (x < modelB.minX || x > modelB.maxX) {
            continue;
          }
          const z = modelA.vertexZ[vertexA] - offsetZ;
          if (z < modelB.minZ || z > modelB.maxZ) {
            continue;
          }
          if (modelB.vertexNormal && modelB.vertexNormalOriginal) {
            for (let vertexB = 0;vertexB < vertexCountB; vertexB++) {
              const normalB = modelB.vertexNormal[vertexB];
              const originalNormalB = modelB.vertexNormalOriginal[vertexB];
              if (x !== vertexX[vertexB] || z !== modelB.vertexZ[vertexB] || y !== modelB.vertexY[vertexB] || originalNormalB && originalNormalB.w === 0) {
                continue;
              }
              if (normalA && normalB && originalNormalB) {
                normalA.x += originalNormalB.x;
                normalA.y += originalNormalB.y;
                normalA.z += originalNormalB.z;
                normalA.w += originalNormalB.w;
                normalB.x += originalNormalA.x;
                normalB.y += originalNormalA.y;
                normalB.z += originalNormalA.z;
                normalB.w += originalNormalA.w;
                merged++;
              }
              this.mergeIndexA[vertexA] = this.tmpMergeIndex;
              this.mergeIndexB[vertexB] = this.tmpMergeIndex;
            }
          }
        }
      }
    }
    if (merged < 3 || !allowFaceRemoval) {
      return;
    }
    if (modelA.faceInfo) {
      for (let i = 0;i < modelA.faceCount; i++) {
        if (this.mergeIndexA[modelA.faceVertexA[i]] === this.tmpMergeIndex && this.mergeIndexA[modelA.faceVertexB[i]] === this.tmpMergeIndex && this.mergeIndexA[modelA.faceVertexC[i]] === this.tmpMergeIndex) {
          modelA.faceInfo[i] = -1;
        }
      }
    }
    if (modelB.faceInfo) {
      for (let i = 0;i < modelB.faceCount; i++) {
        if (this.mergeIndexB[modelB.faceVertexA[i]] === this.tmpMergeIndex && this.mergeIndexB[modelB.faceVertexB[i]] === this.tmpMergeIndex && this.mergeIndexB[modelB.faceVertexC[i]] === this.tmpMergeIndex) {
          modelB.faceInfo[i] = -1;
        }
      }
    }
  }
  drawMinimapTile(level, x, z, dst, offset, step) {
    const tile = this.levelTiles[level][x][z];
    if (!tile) {
      return;
    }
    const underlay = tile.underlay;
    if (underlay) {
      const rgb = underlay.colour;
      if (rgb !== 0) {
        for (let i = 0;i < 4; i++) {
          dst[offset] = rgb;
          dst[offset + 1] = rgb;
          dst[offset + 2] = rgb;
          dst[offset + 3] = rgb;
          offset += step;
        }
      }
      return;
    }
    const overlay = tile.overlay;
    if (!overlay) {
      return;
    }
    const shape = overlay.shape;
    const angle = overlay.shapeAngle;
    const background = overlay.backgroundRgb;
    const foreground = overlay.foregroundRgb;
    const mask = World3D.MINIMAP_TILE_MASK[shape];
    const rotation = World3D.MINIMAP_TILE_ROTATION_MAP[angle];
    let off = 0;
    if (background !== 0) {
      for (let i = 0;i < 4; i++) {
        dst[offset] = mask[rotation[off++]] === 0 ? background : foreground;
        dst[offset + 1] = mask[rotation[off++]] === 0 ? background : foreground;
        dst[offset + 2] = mask[rotation[off++]] === 0 ? background : foreground;
        dst[offset + 3] = mask[rotation[off++]] === 0 ? background : foreground;
        offset += step;
      }
      return;
    }
    for (let i = 0;i < 4; i++) {
      if (mask[rotation[off++]] !== 0) {
        dst[offset] = foreground;
      }
      if (mask[rotation[off++]] !== 0) {
        dst[offset + 1] = foreground;
      }
      if (mask[rotation[off++]] !== 0) {
        dst[offset + 2] = foreground;
      }
      if (mask[rotation[off++]] !== 0) {
        dst[offset + 3] = foreground;
      }
      offset += step;
    }
  }
  click(mouseX, mouseY) {
    World3D.takingInput = true;
    World3D.mouseX = mouseX;
    World3D.mouseY = mouseY;
    World3D.clickTileX = -1;
    World3D.clickTileZ = -1;
  }
  draw(eyeX, eyeY, eyeZ, topLevel, eyeYaw, eyePitch, loopCycle) {
    if (eyeX < 0) {
      eyeX = 0;
    } else if (eyeX >= this.maxTileX * 128) {
      eyeX = this.maxTileX * 128 - 1;
    }
    if (eyeZ < 0) {
      eyeZ = 0;
    } else if (eyeZ >= this.maxTileZ * 128) {
      eyeZ = this.maxTileZ * 128 - 1;
    }
    World3D.cycle++;
    World3D.sinEyePitch = Pix3D.sin[eyePitch];
    World3D.cosEyePitch = Pix3D.cos[eyePitch];
    World3D.sinEyeYaw = Pix3D.sin[eyeYaw];
    World3D.cosEyeYaw = Pix3D.cos[eyeYaw];
    World3D.visibilityMap = World3D.visibilityMatrix[(eyePitch - 128) / 32 | 0][eyeYaw / 64 | 0];
    World3D.eyeX = eyeX;
    World3D.eyeY = eyeY;
    World3D.eyeZ = eyeZ;
    World3D.eyeTileX = eyeX / 128 | 0;
    World3D.eyeTileZ = eyeZ / 128 | 0;
    World3D.topLevel = topLevel;
    World3D.minDrawTileX = World3D.eyeTileX - 25;
    if (World3D.minDrawTileX < 0) {
      World3D.minDrawTileX = 0;
    }
    World3D.minDrawTileZ = World3D.eyeTileZ - 25;
    if (World3D.minDrawTileZ < 0) {
      World3D.minDrawTileZ = 0;
    }
    World3D.maxDrawTileX = World3D.eyeTileX + 25;
    if (World3D.maxDrawTileX > this.maxTileX) {
      World3D.maxDrawTileX = this.maxTileX;
    }
    World3D.maxDrawTileZ = World3D.eyeTileZ + 25;
    if (World3D.maxDrawTileZ > this.maxTileZ) {
      World3D.maxDrawTileZ = this.maxTileZ;
    }
    this.updateActiveOccluders();
    World3D.tilesRemaining = 0;
    for (let level = this.minLevel;level < this.maxLevel; level++) {
      const tiles = this.levelTiles[level];
      for (let x = World3D.minDrawTileX;x < World3D.maxDrawTileX; x++) {
        for (let z = World3D.minDrawTileZ;z < World3D.maxDrawTileZ; z++) {
          const tile = tiles[x][z];
          if (!tile) {
            continue;
          }
          if (tile.drawLevel <= topLevel && (World3D.visibilityMap[x + 25 - World3D.eyeTileX][z + 25 - World3D.eyeTileZ] || this.levelHeightmaps[level][x][z] - eyeY >= 2000)) {
            tile.groundVisible = true;
            tile.update = true;
            tile.containsLocs = tile.locCount > 0;
            World3D.tilesRemaining++;
          } else {
            tile.groundVisible = false;
            tile.update = false;
            tile.checkLocSpans = 0;
          }
        }
      }
    }
    for (let level = this.minLevel;level < this.maxLevel; level++) {
      const tiles = this.levelTiles[level];
      for (let dx = -25;dx <= 0; dx++) {
        const rightTileX = World3D.eyeTileX + dx;
        const leftTileX = World3D.eyeTileX - dx;
        if (rightTileX < World3D.minDrawTileX && leftTileX >= World3D.maxDrawTileX) {
          continue;
        }
        for (let dz = -25;dz <= 0; dz++) {
          const forwardTileZ = World3D.eyeTileZ + dz;
          const backwardTileZ = World3D.eyeTileZ - dz;
          let tile;
          if (rightTileX >= World3D.minDrawTileX) {
            if (forwardTileZ >= World3D.minDrawTileZ) {
              tile = tiles[rightTileX][forwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, true, loopCycle);
              }
            }
            if (backwardTileZ < World3D.maxDrawTileZ) {
              tile = tiles[rightTileX][backwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, true, loopCycle);
              }
            }
          }
          if (leftTileX < World3D.maxDrawTileX) {
            if (forwardTileZ >= World3D.minDrawTileZ) {
              tile = tiles[leftTileX][forwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, true, loopCycle);
              }
            }
            if (backwardTileZ < World3D.maxDrawTileZ) {
              tile = tiles[leftTileX][backwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, true, loopCycle);
              }
            }
          }
          if (World3D.tilesRemaining === 0) {
            World3D.takingInput = false;
            return;
          }
        }
      }
    }
    for (let level = this.minLevel;level < this.maxLevel; level++) {
      const tiles = this.levelTiles[level];
      for (let dx = -25;dx <= 0; dx++) {
        const rightTileX = World3D.eyeTileX + dx;
        const leftTileX = World3D.eyeTileX - dx;
        if (rightTileX < World3D.minDrawTileX && leftTileX >= World3D.maxDrawTileX) {
          continue;
        }
        for (let dz = -25;dz <= 0; dz++) {
          const forwardTileZ = World3D.eyeTileZ + dz;
          const backgroundTileZ = World3D.eyeTileZ - dz;
          let tile;
          if (rightTileX >= World3D.minDrawTileX) {
            if (forwardTileZ >= World3D.minDrawTileZ) {
              tile = tiles[rightTileX][forwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, false, loopCycle);
              }
            }
            if (backgroundTileZ < World3D.maxDrawTileZ) {
              tile = tiles[rightTileX][backgroundTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, false, loopCycle);
              }
            }
          }
          if (leftTileX < World3D.maxDrawTileX) {
            if (forwardTileZ >= World3D.minDrawTileZ) {
              tile = tiles[leftTileX][forwardTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, false, loopCycle);
              }
            }
            if (backgroundTileZ < World3D.maxDrawTileZ) {
              tile = tiles[leftTileX][backgroundTileZ];
              if (tile && tile.groundVisible) {
                this.drawTile(tile, false, loopCycle);
              }
            }
          }
          if (World3D.tilesRemaining === 0) {
            World3D.takingInput = false;
            return;
          }
        }
      }
    }
  }
  addLoc2(x, z, y, level, tileX, tileZ, tileSizeX, tileSizeZ, model, entity, typecode, info, yaw, temporary) {
    if (!model && !entity) {
      return false;
    }
    for (let tx = tileX;tx < tileX + tileSizeX; tx++) {
      for (let tz = tileZ;tz < tileZ + tileSizeZ; tz++) {
        if (tx < 0 || tz < 0 || tx >= this.maxTileX || tz >= this.maxTileZ) {
          return false;
        }
        const tile = this.levelTiles[level][tx][tz];
        if (tile && tile.locCount >= 5) {
          return false;
        }
      }
    }
    const loc = new Location(level, y, x, z, model, entity, yaw, tileX, tileX + tileSizeX - 1, tileZ, tileZ + tileSizeZ - 1, typecode, info);
    for (let tx = tileX;tx < tileX + tileSizeX; tx++) {
      for (let tz = tileZ;tz < tileZ + tileSizeZ; tz++) {
        let spans = 0;
        if (tx > tileX) {
          spans |= 1;
        }
        if (tx < tileX + tileSizeX - 1) {
          spans += 4;
        }
        if (tz > tileZ) {
          spans += 8;
        }
        if (tz < tileZ + tileSizeZ - 1) {
          spans += 2;
        }
        for (let l = level;l >= 0; l--) {
          if (!this.levelTiles[l][tx][tz]) {
            this.levelTiles[l][tx][tz] = new Ground(l, tx, tz);
          }
        }
        const tile = this.levelTiles[level][tx][tz];
        if (tile) {
          tile.locs[tile.locCount] = loc;
          tile.locSpan[tile.locCount] = spans;
          tile.locSpans |= spans;
          tile.locCount++;
        }
      }
    }
    if (temporary) {
      this.temporaryLocs[this.temporaryLocCount++] = loc;
    }
    return true;
  }
  removeLoc2(loc) {
    for (let tx = loc.minSceneTileX;tx <= loc.maxSceneTileX; tx++) {
      for (let tz = loc.minSceneTileZ;tz <= loc.maxSceneTileZ; tz++) {
        const tile = this.levelTiles[loc.locLevel][tx][tz];
        if (!tile) {
          continue;
        }
        for (let i = 0;i < tile.locCount; i++) {
          if (tile.locs[i] === loc) {
            tile.locCount--;
            for (let j = i;j < tile.locCount; j++) {
              tile.locs[j] = tile.locs[j + 1];
              tile.locSpan[j] = tile.locSpan[j + 1];
            }
            tile.locs[tile.locCount] = null;
            break;
          }
        }
        tile.locSpans = 0;
        for (let i = 0;i < tile.locCount; i++) {
          tile.locSpans |= tile.locSpan[i];
        }
      }
    }
  }
  updateActiveOccluders() {
    const count = World3D.levelOccluderCount[World3D.topLevel];
    const occluders = World3D.levelOccluders[World3D.topLevel];
    World3D.activeOccluderCount = 0;
    for (let i = 0;i < count; i++) {
      const occluder = occluders[i];
      if (!occluder) {
        continue;
      }
      let deltaMaxY;
      let deltaMinTileZ;
      let deltaMaxTileZ;
      let deltaMaxTileX;
      if (occluder.type === 1) {
        deltaMaxY = occluder.minTileX + 25 - World3D.eyeTileX;
        if (deltaMaxY >= 0 && deltaMaxY <= 50) {
          deltaMinTileZ = occluder.minTileZ + 25 - World3D.eyeTileZ;
          if (deltaMinTileZ < 0) {
            deltaMinTileZ = 0;
          }
          deltaMaxTileZ = occluder.maxTileZ + 25 - World3D.eyeTileZ;
          if (deltaMaxTileZ > 50) {
            deltaMaxTileZ = 50;
          }
          let ok = false;
          while (deltaMinTileZ <= deltaMaxTileZ) {
            if (World3D.visibilityMap && World3D.visibilityMap[deltaMaxY][deltaMinTileZ++]) {
              ok = true;
              break;
            }
          }
          if (ok) {
            deltaMaxTileX = World3D.eyeX - occluder.minX;
            if (deltaMaxTileX > 32) {
              occluder.mode = 1;
            } else {
              if (deltaMaxTileX >= -32) {
                continue;
              }
              occluder.mode = 2;
              deltaMaxTileX = -deltaMaxTileX;
            }
            occluder.minDeltaZ = (occluder.minZ - World3D.eyeZ << 8) / deltaMaxTileX | 0;
            occluder.maxDeltaZ = (occluder.maxZ - World3D.eyeZ << 8) / deltaMaxTileX | 0;
            occluder.minDeltaY = (occluder.minY - World3D.eyeY << 8) / deltaMaxTileX | 0;
            occluder.maxDeltaY = (occluder.maxY - World3D.eyeY << 8) / deltaMaxTileX | 0;
            World3D.activeOccluders[World3D.activeOccluderCount++] = occluder;
          }
        }
      } else if (occluder.type === 2) {
        deltaMaxY = occluder.minTileZ + 25 - World3D.eyeTileZ;
        if (deltaMaxY >= 0 && deltaMaxY <= 50) {
          deltaMinTileZ = occluder.minTileX + 25 - World3D.eyeTileX;
          if (deltaMinTileZ < 0) {
            deltaMinTileZ = 0;
          }
          deltaMaxTileZ = occluder.maxTileX + 25 - World3D.eyeTileX;
          if (deltaMaxTileZ > 50) {
            deltaMaxTileZ = 50;
          }
          let ok = false;
          while (deltaMinTileZ <= deltaMaxTileZ) {
            if (World3D.visibilityMap && World3D.visibilityMap[deltaMinTileZ++][deltaMaxY]) {
              ok = true;
              break;
            }
          }
          if (ok) {
            deltaMaxTileX = World3D.eyeZ - occluder.minZ;
            if (deltaMaxTileX > 32) {
              occluder.mode = 3;
            } else {
              if (deltaMaxTileX >= -32) {
                continue;
              }
              occluder.mode = 4;
              deltaMaxTileX = -deltaMaxTileX;
            }
            occluder.minDeltaX = (occluder.minX - World3D.eyeX << 8) / deltaMaxTileX | 0;
            occluder.maxDeltaX = (occluder.maxX - World3D.eyeX << 8) / deltaMaxTileX | 0;
            occluder.minDeltaY = (occluder.minY - World3D.eyeY << 8) / deltaMaxTileX | 0;
            occluder.maxDeltaY = (occluder.maxY - World3D.eyeY << 8) / deltaMaxTileX | 0;
            World3D.activeOccluders[World3D.activeOccluderCount++] = occluder;
          }
        }
      } else if (occluder.type === 4) {
        deltaMaxY = occluder.minY - World3D.eyeY;
        if (deltaMaxY > 128) {
          deltaMinTileZ = occluder.minTileZ + 25 - World3D.eyeTileZ;
          if (deltaMinTileZ < 0) {
            deltaMinTileZ = 0;
          }
          deltaMaxTileZ = occluder.maxTileZ + 25 - World3D.eyeTileZ;
          if (deltaMaxTileZ > 50) {
            deltaMaxTileZ = 50;
          }
          if (deltaMinTileZ <= deltaMaxTileZ) {
            let deltaMinTileX = occluder.minTileX + 25 - World3D.eyeTileX;
            if (deltaMinTileX < 0) {
              deltaMinTileX = 0;
            }
            deltaMaxTileX = occluder.maxTileX + 25 - World3D.eyeTileX;
            if (deltaMaxTileX > 50) {
              deltaMaxTileX = 50;
            }
            let ok = false;
            find_visible_tile:
              for (let x = deltaMinTileX;x <= deltaMaxTileX; x++) {
                for (let z = deltaMinTileZ;z <= deltaMaxTileZ; z++) {
                  if (World3D.visibilityMap && World3D.visibilityMap[x][z]) {
                    ok = true;
                    break find_visible_tile;
                  }
                }
              }
            if (ok) {
              occluder.mode = 5;
              occluder.minDeltaX = (occluder.minX - World3D.eyeX << 8) / deltaMaxY | 0;
              occluder.maxDeltaX = (occluder.maxX - World3D.eyeX << 8) / deltaMaxY | 0;
              occluder.minDeltaZ = (occluder.minZ - World3D.eyeZ << 8) / deltaMaxY | 0;
              occluder.maxDeltaZ = (occluder.maxZ - World3D.eyeZ << 8) / deltaMaxY | 0;
              World3D.activeOccluders[World3D.activeOccluderCount++] = occluder;
            }
          }
        }
      }
    }
  }
  drawTile(next, checkAdjacent, loopCycle) {
    World3D.drawTileQueue.addTail(next);
    while (true) {
      let tile;
      do {
        tile = World3D.drawTileQueue.removeHead();
        if (!tile) {
          return;
        }
      } while (!tile.update);
      const tileX = tile.x;
      const tileZ = tile.z;
      const level = tile.groundLevel;
      const occludeLevel = tile.occludeLevel;
      const tiles = this.levelTiles[level];
      if (tile.groundVisible) {
        if (checkAdjacent) {
          if (level > 0) {
            const above = this.levelTiles[level - 1][tileX][tileZ];
            if (above && above.update) {
              continue;
            }
          }
          if (tileX <= World3D.eyeTileX && tileX > World3D.minDrawTileX) {
            const adjacent = tiles[tileX - 1][tileZ];
            if (adjacent && adjacent.update && (adjacent.groundVisible || (tile.locSpans & 1) === 0)) {
              continue;
            }
          }
          if (tileX >= World3D.eyeTileX && tileX < World3D.maxDrawTileX - 1) {
            const adjacent = tiles[tileX + 1][tileZ];
            if (adjacent && adjacent.update && (adjacent.groundVisible || (tile.locSpans & 4) === 0)) {
              continue;
            }
          }
          if (tileZ <= World3D.eyeTileZ && tileZ > World3D.minDrawTileZ) {
            const adjacent = tiles[tileX][tileZ - 1];
            if (adjacent && adjacent.update && (adjacent.groundVisible || (tile.locSpans & 8) === 0)) {
              continue;
            }
          }
          if (tileZ >= World3D.eyeTileZ && tileZ < World3D.maxDrawTileZ - 1) {
            const adjacent = tiles[tileX][tileZ + 1];
            if (adjacent && adjacent.update && (adjacent.groundVisible || (tile.locSpans & 2) === 0)) {
              continue;
            }
          }
        } else {
          checkAdjacent = true;
        }
        tile.groundVisible = false;
        if (tile.bridge) {
          const bridge = tile.bridge;
          if (!bridge.underlay) {
            if (bridge.overlay && !this.tileVisible(0, tileX, tileZ)) {
              this.drawTileOverlay(tileX, tileZ, bridge.overlay, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw);
            }
          } else if (!this.tileVisible(0, tileX, tileZ)) {
            this.drawTileUnderlay(bridge.underlay, 0, tileX, tileZ, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw);
          }
          const wall2 = bridge.wall;
          if (wall2) {
            wall2.modelA?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall2.x - World3D.eyeX, wall2.y - World3D.eyeY, wall2.z - World3D.eyeZ, wall2.typecode);
          }
          for (let i = 0;i < bridge.locCount; i++) {
            const loc = bridge.locs[i];
            if (loc) {
              let model = loc.model;
              if (!model) {
                model = loc.entity?.draw(loopCycle) ?? null;
              }
              model?.draw(loc.yaw, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, loc.x - World3D.eyeX, loc.y - World3D.eyeY, loc.z - World3D.eyeZ, loc.typecode);
            }
          }
        }
        let tileDrawn = false;
        if (!tile.underlay) {
          if (tile.overlay && !this.tileVisible(occludeLevel, tileX, tileZ)) {
            tileDrawn = true;
            this.drawTileOverlay(tileX, tileZ, tile.overlay, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw);
          }
        } else if (!this.tileVisible(occludeLevel, tileX, tileZ)) {
          tileDrawn = true;
          this.drawTileUnderlay(tile.underlay, occludeLevel, tileX, tileZ, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw);
        }
        let direction = 0;
        let frontWallTypes = 0;
        const wall = tile.wall;
        const decor = tile.wallDecoration;
        if (wall || decor) {
          if (World3D.eyeTileX === tileX) {
            direction += 1;
          } else if (World3D.eyeTileX < tileX) {
            direction += 2;
          }
          if (World3D.eyeTileZ === tileZ) {
            direction += 3;
          } else if (World3D.eyeTileZ > tileZ) {
            direction += 6;
          }
          frontWallTypes = World3D.FRONT_WALL_TYPES[direction];
          tile.backWallTypes = World3D.BACK_WALL_TYPES[direction];
        }
        if (wall) {
          if ((wall.typeA & World3D.DIRECTION_ALLOW_WALL_CORNER_TYPE[direction]) === 0) {
            tile.checkLocSpans = 0;
          } else if (wall.typeA === 16) {
            tile.checkLocSpans = 3;
            tile.blockLocSpans = World3D.WALL_CORNER_TYPE_16_BLOCK_LOC_SPANS[direction];
            tile.inverseBlockLocSpans = 3 - tile.blockLocSpans;
          } else if (wall.typeA === 32) {
            tile.checkLocSpans = 6;
            tile.blockLocSpans = World3D.WALL_CORNER_TYPE_32_BLOCK_LOC_SPANS[direction];
            tile.inverseBlockLocSpans = 6 - tile.blockLocSpans;
          } else if (wall.typeA === 64) {
            tile.checkLocSpans = 12;
            tile.blockLocSpans = World3D.WALL_CORNER_TYPE_64_BLOCK_LOC_SPANS[direction];
            tile.inverseBlockLocSpans = 12 - tile.blockLocSpans;
          } else {
            tile.checkLocSpans = 9;
            tile.blockLocSpans = World3D.WALL_CORNER_TYPE_128_BLOCK_LOC_SPANS[direction];
            tile.inverseBlockLocSpans = 9 - tile.blockLocSpans;
          }
          if ((wall.typeA & frontWallTypes) !== 0 && !this.wallVisible(occludeLevel, tileX, tileZ, wall.typeA)) {
            wall.modelA?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall.x - World3D.eyeX, wall.y - World3D.eyeY, wall.z - World3D.eyeZ, wall.typecode);
          }
          if ((wall.typeB & frontWallTypes) !== 0 && !this.wallVisible(occludeLevel, tileX, tileZ, wall.typeB)) {
            wall.modelB?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall.x - World3D.eyeX, wall.y - World3D.eyeY, wall.z - World3D.eyeZ, wall.typecode);
          }
        }
        if (decor && !this.visible(occludeLevel, tileX, tileZ, decor.model.maxY)) {
          if ((decor.decorType & frontWallTypes) !== 0) {
            decor.model.draw(decor.decorAngle, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, decor.x - World3D.eyeX, decor.y - World3D.eyeY, decor.z - World3D.eyeZ, decor.typecode);
          } else if ((decor.decorType & 768) !== 0) {
            const x = decor.x - World3D.eyeX;
            const y = decor.y - World3D.eyeY;
            const z = decor.z - World3D.eyeZ;
            const angle = decor.decorAngle;
            let nearestX;
            if (angle === 1 /* NORTH */ || angle === 2 /* EAST */) {
              nearestX = -x;
            } else {
              nearestX = x;
            }
            let nearestZ;
            if (angle === 2 /* EAST */ || angle === 3 /* SOUTH */) {
              nearestZ = -z;
            } else {
              nearestZ = z;
            }
            if ((decor.decorType & 256) !== 0 && nearestZ < nearestX) {
              const drawX = x + World3D.WALL_DECORATION_INSET_X[angle];
              const drawZ = z + World3D.WALL_DECORATION_INSET_Z[angle];
              decor.model.draw(angle * 512 + 256, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, drawX, y, drawZ, decor.typecode);
            }
            if ((decor.decorType & 512) !== 0 && nearestZ > nearestX) {
              const drawX = x + World3D.WALL_DECORATION_OUTSET_X[angle];
              const drawZ = z + World3D.WALL_DECORATION_OUTSET_Z[angle];
              decor.model.draw(angle * 512 + 1280 & 2047, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, drawX, y, drawZ, decor.typecode);
            }
          }
        }
        if (tileDrawn) {
          const groundDecor = tile.groundDecoration;
          if (groundDecor) {
            groundDecor.model?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, groundDecor.x - World3D.eyeX, groundDecor.y - World3D.eyeY, groundDecor.z - World3D.eyeZ, groundDecor.typecode);
          }
          const objs2 = tile.objStack;
          if (objs2 && objs2.offset === 0) {
            if (objs2.bottomObj) {
              objs2.bottomObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs2.x - World3D.eyeX, objs2.y - World3D.eyeY, objs2.z - World3D.eyeZ, objs2.typecode);
            }
            if (objs2.middleObj) {
              objs2.middleObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs2.x - World3D.eyeX, objs2.y - World3D.eyeY, objs2.z - World3D.eyeZ, objs2.typecode);
            }
            if (objs2.topObj) {
              objs2.topObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs2.x - World3D.eyeX, objs2.y - World3D.eyeY, objs2.z - World3D.eyeZ, objs2.typecode);
            }
          }
        }
        const spans = tile.locSpans;
        if (spans !== 0) {
          if (tileX < World3D.eyeTileX && (spans & 4) !== 0) {
            const adjacent = tiles[tileX + 1][tileZ];
            if (adjacent && adjacent.update) {
              World3D.drawTileQueue.addTail(adjacent);
            }
          }
          if (tileZ < World3D.eyeTileZ && (spans & 2) !== 0) {
            const adjacent = tiles[tileX][tileZ + 1];
            if (adjacent && adjacent.update) {
              World3D.drawTileQueue.addTail(adjacent);
            }
          }
          if (tileX > World3D.eyeTileX && (spans & 1) !== 0) {
            const adjacent = tiles[tileX - 1][tileZ];
            if (adjacent && adjacent.update) {
              World3D.drawTileQueue.addTail(adjacent);
            }
          }
          if (tileZ > World3D.eyeTileZ && (spans & 8) !== 0) {
            const adjacent = tiles[tileX][tileZ - 1];
            if (adjacent && adjacent.update) {
              World3D.drawTileQueue.addTail(adjacent);
            }
          }
        }
      }
      if (tile.checkLocSpans !== 0) {
        let draw = true;
        for (let i = 0;i < tile.locCount; i++) {
          const loc = tile.locs[i];
          if (!loc) {
            continue;
          }
          if (loc.cycle !== World3D.cycle && (tile.locSpan[i] & tile.checkLocSpans) === tile.blockLocSpans) {
            draw = false;
            break;
          }
        }
        if (draw) {
          const wall = tile.wall;
          if (wall && !this.wallVisible(occludeLevel, tileX, tileZ, wall.typeA)) {
            wall.modelA?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall.x - World3D.eyeX, wall.y - World3D.eyeY, wall.z - World3D.eyeZ, wall.typecode);
          }
          tile.checkLocSpans = 0;
        }
      }
      if (tile.containsLocs) {
        const locCount = tile.locCount;
        tile.containsLocs = false;
        let locBufferSize = 0;
        iterate_locs:
          for (let i = 0;i < locCount; i++) {
            const loc = tile.locs[i];
            if (!loc || loc.cycle === World3D.cycle) {
              continue;
            }
            for (let x = loc.minSceneTileX;x <= loc.maxSceneTileX; x++) {
              for (let z = loc.minSceneTileZ;z <= loc.maxSceneTileZ; z++) {
                const other = tiles[x][z];
                if (!other) {
                  continue;
                }
                if (!other.groundVisible) {
                  if (other.checkLocSpans === 0) {
                    continue;
                  }
                  let spans = 0;
                  if (x > loc.minSceneTileX) {
                    spans += 1;
                  }
                  if (x < loc.maxSceneTileX) {
                    spans += 4;
                  }
                  if (z > loc.minSceneTileZ) {
                    spans += 8;
                  }
                  if (z < loc.maxSceneTileZ) {
                    spans += 2;
                  }
                  if ((spans & other.checkLocSpans) !== tile.inverseBlockLocSpans) {
                    continue;
                  }
                }
                tile.containsLocs = true;
                continue iterate_locs;
              }
            }
            World3D.locBuffer[locBufferSize++] = loc;
            let minTileDistanceX = World3D.eyeTileX - loc.minSceneTileX;
            const maxTileDistanceX = loc.maxSceneTileX - World3D.eyeTileX;
            if (maxTileDistanceX > minTileDistanceX) {
              minTileDistanceX = maxTileDistanceX;
            }
            const minTileDistanceZ = World3D.eyeTileZ - loc.minSceneTileZ;
            const maxTileDistanceZ = loc.maxSceneTileZ - World3D.eyeTileZ;
            if (maxTileDistanceZ > minTileDistanceZ) {
              loc.distance = minTileDistanceX + maxTileDistanceZ;
            } else {
              loc.distance = minTileDistanceX + minTileDistanceZ;
            }
          }
        while (true) {
          let farthestDistance = -50;
          let farthestIndex = -1;
          for (let index = 0;index < locBufferSize; index++) {
            const loc = World3D.locBuffer[index];
            if (!loc) {
              continue;
            }
            if (loc.cycle !== World3D.cycle) {
              if (loc.distance > farthestDistance) {
                farthestDistance = loc.distance;
                farthestIndex = index;
              }
            }
          }
          if (farthestIndex === -1) {
            break;
          }
          const farthest = World3D.locBuffer[farthestIndex];
          if (farthest) {
            farthest.cycle = World3D.cycle;
            let model = farthest.model;
            if (!model) {
              model = farthest.entity?.draw(loopCycle) ?? null;
            }
            if (model && !this.locVisible(occludeLevel, farthest.minSceneTileX, farthest.maxSceneTileX, farthest.minSceneTileZ, farthest.maxSceneTileZ, model.maxY)) {
              model.draw(farthest.yaw, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, farthest.x - World3D.eyeX, farthest.y - World3D.eyeY, farthest.z - World3D.eyeZ, farthest.typecode);
            }
            for (let x = farthest.minSceneTileX;x <= farthest.maxSceneTileX; x++) {
              for (let z = farthest.minSceneTileZ;z <= farthest.maxSceneTileZ; z++) {
                const occupied = tiles[x][z];
                if (!occupied) {
                  continue;
                }
                if (occupied.checkLocSpans !== 0) {
                  World3D.drawTileQueue.addTail(occupied);
                } else if ((x !== tileX || z !== tileZ) && occupied.update) {
                  World3D.drawTileQueue.addTail(occupied);
                }
              }
            }
          }
        }
        if (tile.containsLocs) {
          continue;
        }
      }
      if (!tile.update || tile.checkLocSpans !== 0) {
        continue;
      }
      if (tileX <= World3D.eyeTileX && tileX > World3D.minDrawTileX) {
        const adjacent = tiles[tileX - 1][tileZ];
        if (adjacent && adjacent.update) {
          continue;
        }
      }
      if (tileX >= World3D.eyeTileX && tileX < World3D.maxDrawTileX - 1) {
        const adjacent = tiles[tileX + 1][tileZ];
        if (adjacent && adjacent.update) {
          continue;
        }
      }
      if (tileZ <= World3D.eyeTileZ && tileZ > World3D.minDrawTileZ) {
        const adjacent = tiles[tileX][tileZ - 1];
        if (adjacent && adjacent.update) {
          continue;
        }
      }
      if (tileZ >= World3D.eyeTileZ && tileZ < World3D.maxDrawTileZ - 1) {
        const adjacent = tiles[tileX][tileZ + 1];
        if (adjacent && adjacent.update) {
          continue;
        }
      }
      tile.update = false;
      World3D.tilesRemaining--;
      const objs = tile.objStack;
      if (objs && objs.offset !== 0) {
        if (objs.bottomObj) {
          objs.bottomObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs.x - World3D.eyeX, objs.y - World3D.eyeY - objs.offset, objs.z - World3D.eyeZ, objs.typecode);
        }
        if (objs.middleObj) {
          objs.middleObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs.x - World3D.eyeX, objs.y - World3D.eyeY - objs.offset, objs.z - World3D.eyeZ, objs.typecode);
        }
        if (objs.topObj) {
          objs.topObj.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, objs.x - World3D.eyeX, objs.y - World3D.eyeY - objs.offset, objs.z - World3D.eyeZ, objs.typecode);
        }
      }
      if (tile.backWallTypes !== 0) {
        const decor = tile.wallDecoration;
        if (decor && !this.visible(occludeLevel, tileX, tileZ, decor.model.maxY)) {
          if ((decor.decorType & tile.backWallTypes) !== 0) {
            decor.model.draw(decor.decorAngle, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, decor.x - World3D.eyeX, decor.y - World3D.eyeY, decor.z - World3D.eyeZ, decor.typecode);
          } else if ((decor.decorType & 768) !== 0) {
            const x = decor.x - World3D.eyeX;
            const y = decor.y - World3D.eyeY;
            const z = decor.z - World3D.eyeZ;
            const angle = decor.decorAngle;
            let nearestX;
            if (angle === 1 /* NORTH */ || angle === 2 /* EAST */) {
              nearestX = -x;
            } else {
              nearestX = x;
            }
            let nearestZ;
            if (angle === 2 /* EAST */ || angle === 3 /* SOUTH */) {
              nearestZ = -z;
            } else {
              nearestZ = z;
            }
            if ((decor.decorType & 256) !== 0 && nearestZ >= nearestX) {
              const drawX = x + World3D.WALL_DECORATION_INSET_X[angle];
              const drawZ = z + World3D.WALL_DECORATION_INSET_Z[angle];
              decor.model.draw(angle * 512 + 256, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, drawX, y, drawZ, decor.typecode);
            }
            if ((decor.decorType & 512) !== 0 && nearestZ <= nearestX) {
              const drawX = x + World3D.WALL_DECORATION_OUTSET_X[angle];
              const drawZ = z + World3D.WALL_DECORATION_OUTSET_Z[angle];
              decor.model.draw(angle * 512 + 1280 & 2047, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, drawX, y, drawZ, decor.typecode);
            }
          }
        }
        const wall = tile.wall;
        if (wall) {
          if ((wall.typeB & tile.backWallTypes) !== 0 && !this.wallVisible(occludeLevel, tileX, tileZ, wall.typeB)) {
            wall.modelB?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall.x - World3D.eyeX, wall.y - World3D.eyeY, wall.z - World3D.eyeZ, wall.typecode);
          }
          if ((wall.typeA & tile.backWallTypes) !== 0 && !this.wallVisible(occludeLevel, tileX, tileZ, wall.typeA)) {
            wall.modelA?.draw(0, World3D.sinEyePitch, World3D.cosEyePitch, World3D.sinEyeYaw, World3D.cosEyeYaw, wall.x - World3D.eyeX, wall.y - World3D.eyeY, wall.z - World3D.eyeZ, wall.typecode);
          }
        }
      }
      if (level < this.maxLevel - 1) {
        const above = this.levelTiles[level + 1][tileX][tileZ];
        if (above && above.update) {
          World3D.drawTileQueue.addTail(above);
        }
      }
      if (tileX < World3D.eyeTileX) {
        const adjacent = tiles[tileX + 1][tileZ];
        if (adjacent && adjacent.update) {
          World3D.drawTileQueue.addTail(adjacent);
        }
      }
      if (tileZ < World3D.eyeTileZ) {
        const adjacent = tiles[tileX][tileZ + 1];
        if (adjacent && adjacent.update) {
          World3D.drawTileQueue.addTail(adjacent);
        }
      }
      if (tileX > World3D.eyeTileX) {
        const adjacent = tiles[tileX - 1][tileZ];
        if (adjacent && adjacent.update) {
          World3D.drawTileQueue.addTail(adjacent);
        }
      }
      if (tileZ > World3D.eyeTileZ) {
        const adjacent = tiles[tileX][tileZ - 1];
        if (adjacent && adjacent.update) {
          World3D.drawTileQueue.addTail(adjacent);
        }
      }
    }
  }
  drawTileUnderlay(underlay, level, tileX, tileZ, sinEyePitch, cosEyePitch, sinEyeYaw, cosEyeYaw) {
    let x3;
    let x0 = x3 = (tileX << 7) - World3D.eyeX;
    let z1;
    let z0 = z1 = (tileZ << 7) - World3D.eyeZ;
    let x2;
    let x1 = x2 = x0 + 128;
    let z3;
    let z2 = z3 = z0 + 128;
    let y0 = this.levelHeightmaps[level][tileX][tileZ] - World3D.eyeY;
    let y1 = this.levelHeightmaps[level][tileX + 1][tileZ] - World3D.eyeY;
    let y2 = this.levelHeightmaps[level][tileX + 1][tileZ + 1] - World3D.eyeY;
    let y3 = this.levelHeightmaps[level][tileX][tileZ + 1] - World3D.eyeY;
    let tmp = z0 * sinEyeYaw + x0 * cosEyeYaw >> 16;
    z0 = z0 * cosEyeYaw - x0 * sinEyeYaw >> 16;
    x0 = tmp;
    tmp = y0 * cosEyePitch - z0 * sinEyePitch >> 16;
    z0 = y0 * sinEyePitch + z0 * cosEyePitch >> 16;
    y0 = tmp;
    if (z0 < 50) {
      return;
    }
    tmp = z1 * sinEyeYaw + x1 * cosEyeYaw >> 16;
    z1 = z1 * cosEyeYaw - x1 * sinEyeYaw >> 16;
    x1 = tmp;
    tmp = y1 * cosEyePitch - z1 * sinEyePitch >> 16;
    z1 = y1 * sinEyePitch + z1 * cosEyePitch >> 16;
    y1 = tmp;
    if (z1 < 50) {
      return;
    }
    tmp = z2 * sinEyeYaw + x2 * cosEyeYaw >> 16;
    z2 = z2 * cosEyeYaw - x2 * sinEyeYaw >> 16;
    x2 = tmp;
    tmp = y2 * cosEyePitch - z2 * sinEyePitch >> 16;
    z2 = y2 * sinEyePitch + z2 * cosEyePitch >> 16;
    y2 = tmp;
    if (z2 < 50) {
      return;
    }
    tmp = z3 * sinEyeYaw + x3 * cosEyeYaw >> 16;
    z3 = z3 * cosEyeYaw - x3 * sinEyeYaw >> 16;
    x3 = tmp;
    tmp = y3 * cosEyePitch - z3 * sinEyePitch >> 16;
    z3 = y3 * sinEyePitch + z3 * cosEyePitch >> 16;
    y3 = tmp;
    if (z3 < 50) {
      return;
    }
    const px0 = Pix3D.centerX + ((x0 << 9) / z0 | 0);
    const py0 = Pix3D.centerY + ((y0 << 9) / z0 | 0);
    const pz0 = Pix3D.centerX + ((x1 << 9) / z1 | 0);
    const px1 = Pix3D.centerY + ((y1 << 9) / z1 | 0);
    const py1 = Pix3D.centerX + ((x2 << 9) / z2 | 0);
    const pz1 = Pix3D.centerY + ((y2 << 9) / z2 | 0);
    const px3 = Pix3D.centerX + ((x3 << 9) / z3 | 0);
    const py3 = Pix3D.centerY + ((y3 << 9) / z3 | 0);
    Pix3D.alpha = 0;
    if ((py1 - px3) * (px1 - py3) - (pz1 - py3) * (pz0 - px3) > 0) {
      Pix3D.clipX = py1 < 0 || px3 < 0 || pz0 < 0 || py1 > Pix2D.boundX || px3 > Pix2D.boundX || pz0 > Pix2D.boundX;
      if (World3D.takingInput && this.pointInsideTriangle(World3D.mouseX, World3D.mouseY, pz1, py3, px1, py1, px3, pz0)) {
        World3D.clickTileX = tileX;
        World3D.clickTileZ = tileZ;
      }
      if (underlay.textureId === -1) {
        if (underlay.northeastColor !== 12345678) {
          Pix3D.fillGouraudTriangle(py1, px3, pz0, pz1, py3, px1, underlay.northeastColor, underlay.northwestColor, underlay.southeastColor);
        }
      } else if (World3D.lowMemory) {
        const averageColor = World3D.TEXTURE_HSL[underlay.textureId];
        Pix3D.fillGouraudTriangle(py1, px3, pz0, pz1, py3, px1, this.mulLightness(averageColor, underlay.northeastColor), this.mulLightness(averageColor, underlay.northwestColor), this.mulLightness(averageColor, underlay.southeastColor));
      } else if (underlay.flat) {
        Pix3D.fillTexturedTriangle(py1, px3, pz0, pz1, py3, px1, underlay.northeastColor, underlay.northwestColor, underlay.southeastColor, x0, y0, z0, x1, x3, y1, y3, z1, z3, underlay.textureId);
      } else {
        Pix3D.fillTexturedTriangle(py1, px3, pz0, pz1, py3, px1, underlay.northeastColor, underlay.northwestColor, underlay.southeastColor, x2, y2, z2, x3, x1, y3, y1, z3, z1, underlay.textureId);
      }
    }
    if ((px0 - pz0) * (py3 - px1) - (py0 - px1) * (px3 - pz0) <= 0) {
      return;
    }
    Pix3D.clipX = px0 < 0 || pz0 < 0 || px3 < 0 || px0 > Pix2D.boundX || pz0 > Pix2D.boundX || px3 > Pix2D.boundX;
    if (World3D.takingInput && this.pointInsideTriangle(World3D.mouseX, World3D.mouseY, py0, px1, py3, px0, pz0, px3)) {
      World3D.clickTileX = tileX;
      World3D.clickTileZ = tileZ;
    }
    if (underlay.textureId !== -1) {
      if (!World3D.lowMemory) {
        Pix3D.fillTexturedTriangle(px0, pz0, px3, py0, px1, py3, underlay.southwestColor, underlay.southeastColor, underlay.northwestColor, x0, y0, z0, x1, x3, y1, y3, z1, z3, underlay.textureId);
        return;
      }
      const averageColor = World3D.TEXTURE_HSL[underlay.textureId];
      Pix3D.fillGouraudTriangle(px0, pz0, px3, py0, px1, py3, this.mulLightness(averageColor, underlay.southwestColor), this.mulLightness(averageColor, underlay.southeastColor), this.mulLightness(averageColor, underlay.northwestColor));
    } else if (underlay.southwestColor !== 12345678) {
      Pix3D.fillGouraudTriangle(px0, pz0, px3, py0, px1, py3, underlay.southwestColor, underlay.southeastColor, underlay.northwestColor);
    }
  }
  drawTileOverlay(tileX, tileZ, overlay, sinEyePitch, cosEyePitch, sinEyeYaw, cosEyeYaw) {
    let vertexCount = overlay.vertexX.length;
    for (let i = 0;i < vertexCount; i++) {
      let x = overlay.vertexX[i] - World3D.eyeX;
      let y = overlay.vertexY[i] - World3D.eyeY;
      let z = overlay.vertexZ[i] - World3D.eyeZ;
      let tmp = z * sinEyeYaw + x * cosEyeYaw >> 16;
      z = z * cosEyeYaw - x * sinEyeYaw >> 16;
      x = tmp;
      tmp = y * cosEyePitch - z * sinEyePitch >> 16;
      z = y * sinEyePitch + z * cosEyePitch >> 16;
      y = tmp;
      if (z < 50) {
        return;
      }
      if (overlay.triangleTextureIds) {
        TileOverlay.tmpViewspaceX[i] = x;
        TileOverlay.tmpViewspaceY[i] = y;
        TileOverlay.tmpViewspaceZ[i] = z;
      }
      TileOverlay.tmpScreenX[i] = Pix3D.centerX + ((x << 9) / z | 0);
      TileOverlay.tmpScreenY[i] = Pix3D.centerY + ((y << 9) / z | 0);
    }
    Pix3D.alpha = 0;
    vertexCount = overlay.triangleVertexA.length;
    for (let v = 0;v < vertexCount; v++) {
      const a = overlay.triangleVertexA[v];
      const b = overlay.triangleVertexB[v];
      const c = overlay.triangleVertexC[v];
      const x0 = TileOverlay.tmpScreenX[a];
      const x1 = TileOverlay.tmpScreenX[b];
      const x2 = TileOverlay.tmpScreenX[c];
      const y0 = TileOverlay.tmpScreenY[a];
      const y1 = TileOverlay.tmpScreenY[b];
      const y2 = TileOverlay.tmpScreenY[c];
      if ((x0 - x1) * (y2 - y1) - (y0 - y1) * (x2 - x1) > 0) {
        Pix3D.clipX = x0 < 0 || x1 < 0 || x2 < 0 || x0 > Pix2D.boundX || x1 > Pix2D.boundX || x2 > Pix2D.boundX;
        if (World3D.takingInput && this.pointInsideTriangle(World3D.mouseX, World3D.mouseY, y0, y1, y2, x0, x1, x2)) {
          World3D.clickTileX = tileX;
          World3D.clickTileZ = tileZ;
        }
        if (!overlay.triangleTextureIds || overlay.triangleTextureIds[v] === -1) {
          if (overlay.triangleColorA[v] !== 12345678) {
            Pix3D.fillGouraudTriangle(x0, x1, x2, y0, y1, y2, overlay.triangleColorA[v], overlay.triangleColorB[v], overlay.triangleColorC[v]);
          }
        } else if (World3D.lowMemory) {
          const textureColor = World3D.TEXTURE_HSL[overlay.triangleTextureIds[v]];
          Pix3D.fillGouraudTriangle(x0, x1, x2, y0, y1, y2, this.mulLightness(textureColor, overlay.triangleColorA[v]), this.mulLightness(textureColor, overlay.triangleColorB[v]), this.mulLightness(textureColor, overlay.triangleColorC[v]));
        } else if (overlay.flat) {
          Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, overlay.triangleColorA[v], overlay.triangleColorB[v], overlay.triangleColorC[v], TileOverlay.tmpViewspaceX[0], TileOverlay.tmpViewspaceY[0], TileOverlay.tmpViewspaceZ[0], TileOverlay.tmpViewspaceX[1], TileOverlay.tmpViewspaceX[3], TileOverlay.tmpViewspaceY[1], TileOverlay.tmpViewspaceY[3], TileOverlay.tmpViewspaceZ[1], TileOverlay.tmpViewspaceZ[3], overlay.triangleTextureIds[v]);
        } else {
          Pix3D.fillTexturedTriangle(x0, x1, x2, y0, y1, y2, overlay.triangleColorA[v], overlay.triangleColorB[v], overlay.triangleColorC[v], TileOverlay.tmpViewspaceX[a], TileOverlay.tmpViewspaceY[a], TileOverlay.tmpViewspaceZ[a], TileOverlay.tmpViewspaceX[b], TileOverlay.tmpViewspaceX[c], TileOverlay.tmpViewspaceY[b], TileOverlay.tmpViewspaceY[c], TileOverlay.tmpViewspaceZ[b], TileOverlay.tmpViewspaceZ[c], overlay.triangleTextureIds[v]);
        }
      }
    }
  }
  tileVisible(level, x, z) {
    const cycle = this.levelTileOcclusionCycles[level][x][z];
    if (cycle === -World3D.cycle) {
      return false;
    } else if (cycle === World3D.cycle) {
      return true;
    } else {
      const sx = x << 7;
      const sz = z << 7;
      if (this.occluded(sx + 1, this.levelHeightmaps[level][x][z], sz + 1) && this.occluded(sx + 128 - 1, this.levelHeightmaps[level][x + 1][z], sz + 1) && this.occluded(sx + 128 - 1, this.levelHeightmaps[level][x + 1][z + 1], sz + 128 - 1) && this.occluded(sx + 1, this.levelHeightmaps[level][x][z + 1], sz + 128 - 1)) {
        this.levelTileOcclusionCycles[level][x][z] = World3D.cycle;
        return true;
      } else {
        this.levelTileOcclusionCycles[level][x][z] = -World3D.cycle;
        return false;
      }
    }
  }
  wallVisible(level, x, z, type) {
    if (!this.tileVisible(level, x, z)) {
      return false;
    }
    const sceneX = x << 7;
    const sceneZ = z << 7;
    const sceneY = this.levelHeightmaps[level][x][z] - 1;
    const y0 = sceneY - 120;
    const y1 = sceneY - 230;
    const y2 = sceneY - 238;
    if (type < 16) {
      if (type === 1) {
        if (sceneX > World3D.eyeX) {
          if (!this.occluded(sceneX, sceneY, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX, sceneY, sceneZ + 128)) {
            return false;
          }
        }
        if (level > 0) {
          if (!this.occluded(sceneX, y0, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX, y0, sceneZ + 128)) {
            return false;
          }
        }
        if (!this.occluded(sceneX, y1, sceneZ)) {
          return false;
        }
        return this.occluded(sceneX, y1, sceneZ + 128);
      }
      if (type === 2) {
        if (sceneZ < World3D.eyeZ) {
          if (!this.occluded(sceneX, sceneY, sceneZ + 128)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, sceneY, sceneZ + 128)) {
            return false;
          }
        }
        if (level > 0) {
          if (!this.occluded(sceneX, y0, sceneZ + 128)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, y0, sceneZ + 128)) {
            return false;
          }
        }
        if (!this.occluded(sceneX, y1, sceneZ + 128)) {
          return false;
        }
        return this.occluded(sceneX + 128, y1, sceneZ + 128);
      }
      if (type === 4) {
        if (sceneX < World3D.eyeX) {
          if (!this.occluded(sceneX + 128, sceneY, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, sceneY, sceneZ + 128)) {
            return false;
          }
        }
        if (level > 0) {
          if (!this.occluded(sceneX + 128, y0, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, y0, sceneZ + 128)) {
            return false;
          }
        }
        if (!this.occluded(sceneX + 128, y1, sceneZ)) {
          return false;
        }
        return this.occluded(sceneX + 128, y1, sceneZ + 128);
      }
      if (type === 8) {
        if (sceneZ > World3D.eyeZ) {
          if (!this.occluded(sceneX, sceneY, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, sceneY, sceneZ)) {
            return false;
          }
        }
        if (level > 0) {
          if (!this.occluded(sceneX, y0, sceneZ)) {
            return false;
          }
          if (!this.occluded(sceneX + 128, y0, sceneZ)) {
            return false;
          }
        }
        if (!this.occluded(sceneX, y1, sceneZ)) {
          return false;
        }
        return this.occluded(sceneX + 128, y1, sceneZ);
      }
    }
    if (!this.occluded(sceneX + 64, y2, sceneZ + 64)) {
      return false;
    } else if (type === 16) {
      return this.occluded(sceneX, y1, sceneZ + 128);
    } else if (type === 32) {
      return this.occluded(sceneX + 128, y1, sceneZ + 128);
    } else if (type === 64) {
      return this.occluded(sceneX + 128, y1, sceneZ);
    } else if (type === 128) {
      return this.occluded(sceneX, y1, sceneZ);
    }
    console.warn("Warning unsupported wall type!");
    return true;
  }
  visible(level, tileX, tileZ, y) {
    if (this.tileVisible(level, tileX, tileZ)) {
      const x = tileX << 7;
      const z = tileZ << 7;
      return this.occluded(x + 1, this.levelHeightmaps[level][tileX][tileZ] - y, z + 1) && this.occluded(x + 128 - 1, this.levelHeightmaps[level][tileX + 1][tileZ] - y, z + 1) && this.occluded(x + 128 - 1, this.levelHeightmaps[level][tileX + 1][tileZ + 1] - y, z + 128 - 1) && this.occluded(x + 1, this.levelHeightmaps[level][tileX][tileZ + 1] - y, z + 128 - 1);
    }
    return false;
  }
  locVisible(level, minX, maxX, minZ, maxZ, y) {
    let x;
    let z;
    if (minX !== maxX || minZ !== maxZ) {
      for (x = minX;x <= maxX; x++) {
        for (z = minZ;z <= maxZ; z++) {
          if (this.levelTileOcclusionCycles[level][x][z] === -World3D.cycle) {
            return false;
          }
        }
      }
      z = (minX << 7) + 1;
      const z0 = (minZ << 7) + 2;
      const y0 = this.levelHeightmaps[level][minX][minZ] - y;
      if (!this.occluded(z, y0, z0)) {
        return false;
      }
      const x1 = (maxX << 7) - 1;
      if (!this.occluded(x1, y0, z0)) {
        return false;
      }
      const z1 = (maxZ << 7) - 1;
      if (!this.occluded(z, y0, z1)) {
        return false;
      } else
        return this.occluded(x1, y0, z1);
    } else if (this.tileVisible(level, minX, minZ)) {
      x = minX << 7;
      z = minZ << 7;
      return this.occluded(x + 1, this.levelHeightmaps[level][minX][minZ] - y, z + 1) && this.occluded(x + 128 - 1, this.levelHeightmaps[level][minX + 1][minZ] - y, z + 1) && this.occluded(x + 128 - 1, this.levelHeightmaps[level][minX + 1][minZ + 1] - y, z + 128 - 1) && this.occluded(x + 1, this.levelHeightmaps[level][minX][minZ + 1] - y, z + 128 - 1);
    }
    return false;
  }
  occluded(x, y, z) {
    for (let i = 0;i < World3D.activeOccluderCount; i++) {
      const occluder = World3D.activeOccluders[i];
      if (!occluder) {
        continue;
      }
      if (occluder.mode === 1) {
        const dx = occluder.minX - x;
        if (dx > 0) {
          const minZ = occluder.minZ + (occluder.minDeltaZ * dx >> 8);
          const maxZ = occluder.maxZ + (occluder.maxDeltaZ * dx >> 8);
          const minY = occluder.minY + (occluder.minDeltaY * dx >> 8);
          const maxY = occluder.maxY + (occluder.maxDeltaY * dx >> 8);
          if (z >= minZ && z <= maxZ && y >= minY && y <= maxY) {
            return true;
          }
        }
      } else if (occluder.mode === 2) {
        const dx = x - occluder.minX;
        if (dx > 0) {
          const minZ = occluder.minZ + (occluder.minDeltaZ * dx >> 8);
          const maxZ = occluder.maxZ + (occluder.maxDeltaZ * dx >> 8);
          const minY = occluder.minY + (occluder.minDeltaY * dx >> 8);
          const maxY = occluder.maxY + (occluder.maxDeltaY * dx >> 8);
          if (z >= minZ && z <= maxZ && y >= minY && y <= maxY) {
            return true;
          }
        }
      } else if (occluder.mode === 3) {
        const dz = occluder.minZ - z;
        if (dz > 0) {
          const minX = occluder.minX + (occluder.minDeltaX * dz >> 8);
          const maxX = occluder.maxX + (occluder.maxDeltaX * dz >> 8);
          const minY = occluder.minY + (occluder.minDeltaY * dz >> 8);
          const maxY = occluder.maxY + (occluder.maxDeltaY * dz >> 8);
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return true;
          }
        }
      } else if (occluder.mode === 4) {
        const dz = z - occluder.minZ;
        if (dz > 0) {
          const minX = occluder.minX + (occluder.minDeltaX * dz >> 8);
          const maxX = occluder.maxX + (occluder.maxDeltaX * dz >> 8);
          const minY = occluder.minY + (occluder.minDeltaY * dz >> 8);
          const maxY = occluder.maxY + (occluder.maxDeltaY * dz >> 8);
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return true;
          }
        }
      } else if (occluder.mode === 5) {
        const dy = y - occluder.minY;
        if (dy > 0) {
          const minX = occluder.minX + (occluder.minDeltaX * dy >> 8);
          const maxX = occluder.maxX + (occluder.maxDeltaX * dy >> 8);
          const minZ = occluder.minZ + (occluder.minDeltaZ * dy >> 8);
          const maxZ = occluder.maxZ + (occluder.maxDeltaZ * dy >> 8);
          if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  pointInsideTriangle(x, y, y0, y1, y2, x0, x1, x2) {
    if (y < y0 && y < y1 && y < y2) {
      return false;
    } else if (y > y0 && y > y1 && y > y2) {
      return false;
    } else if (x < x0 && x < x1 && x < x2) {
      return false;
    } else if (x > x0 && x > x1 && x > x2) {
      return false;
    }
    const crossProduct_01 = (y - y0) * (x1 - x0) - (x - x0) * (y1 - y0);
    const crossProduct_20 = (y - y2) * (x0 - x2) - (x - x2) * (y0 - y2);
    const crossProduct_12 = (y - y1) * (x2 - x1) - (x - x1) * (y2 - y1);
    return crossProduct_01 * crossProduct_12 > 0 && crossProduct_12 * crossProduct_20 > 0;
  }
  mulLightness(hsl, lightness) {
    const invLightness = 127 - lightness;
    lightness = invLightness * (hsl & 127) / 160 | 0;
    if (lightness < 2) {
      lightness = 2;
    } else if (lightness > 126) {
      lightness = 126;
    }
    return (hsl & 65408) + lightness;
  }
}

// src/dash3d/entity/LocEntity.ts
class LocEntity extends Linkable {
  heightmapSW;
  heightmapSE;
  heightmapNE;
  heightmapNW;
  index;
  seq;
  seqFrame;
  seqCycle;
  constructor(index, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seq, randomFrame) {
    super();
    this.heightmapSW = heightmapSW;
    this.heightmapSE = heightmapSE;
    this.heightmapNE = heightmapNE;
    this.heightmapNW = heightmapNW;
    this.index = index;
    this.seq = seq;
    if (randomFrame && seq.replayoff !== -1 && this.seq.seqDelay) {
      this.seqFrame = Math.random() * this.seq.seqFrameCount | 0;
      this.seqCycle = Math.random() * this.seq.seqDelay[this.seqFrame] | 0;
    } else {
      this.seqFrame = -1;
      this.seqCycle = 0;
    }
  }
}

// src/dash3d/World.ts
class World {
  static ROTATION_WALL_TYPE = Int8Array.of(1, 2, 4, 8);
  static ROTATION_WALL_CORNER_TYPE = Uint8Array.of(16, 32, 64, 128);
  static WALL_DECORATION_ROTATION_FORWARD_X = Int8Array.of(1, 0, -1, 0);
  static WALL_DECORATION_ROTATION_FORWARD_Z = Int8Array.of(0, -1, 0, 1);
  static randomHueOffset = (Math.random() * 17 | 0) - 8;
  static randomLightnessOffset = (Math.random() * 33 | 0) - 16;
  static lowMemory = true;
  static levelBuilt = 0;
  static fullbright = false;
  static perlin(x, z) {
    let value = this.perlinScale(x + 45365, z + 91923, 4) + (this.perlinScale(x + 10294, z + 37821, 2) - 128 >> 1) + (this.perlinScale(x, z, 1) - 128 >> 2) - 128;
    value = (value * 0.3 | 0) + 35;
    if (value < 10) {
      value = 10;
    } else if (value > 60) {
      value = 60;
    }
    return value;
  }
  static perlinScale(x, z, scale) {
    const intX = x / scale | 0;
    const fracX = x & scale - 1;
    const intZ = z / scale | 0;
    const fracZ = z & scale - 1;
    const v1 = this.smoothNoise(intX, intZ);
    const v2 = this.smoothNoise(intX + 1, intZ);
    const v3 = this.smoothNoise(intX, intZ + 1);
    const v4 = this.smoothNoise(intX + 1, intZ + 1);
    const i1 = this.interpolate(v1, v2, fracX, scale);
    const i2 = this.interpolate(v3, v4, fracX, scale);
    return this.interpolate(i1, i2, fracZ, scale);
  }
  static interpolate(a, b, x, scale) {
    const f = 65536 - Pix3D.cos[x * 1024 / scale | 0] >> 1;
    return (a * (65536 - f) >> 16) + (b * f >> 16);
  }
  static smoothNoise(x, y) {
    const corners = this.noise(x - 1, y - 1) + this.noise(x + 1, y - 1) + this.noise(x - 1, y + 1) + this.noise(x + 1, y + 1);
    const sides = this.noise(x - 1, y) + this.noise(x + 1, y) + this.noise(x, y - 1) + this.noise(x, y + 1);
    const center = this.noise(x, y);
    return (corners / 16 | 0) + (sides / 8 | 0) + (center / 4 | 0);
  }
  static noise(x, y) {
    const n = x + y * 57;
    const n1 = BigInt(n << 13 ^ n);
    return Number((n1 * (n1 * n1 * 15731n + 789221n) + 1376312589n & 0x7fffffffn) >> 19n) & 255;
  }
  static addLoc(level, x, z, scene, levelHeightmap, locs, collision, locId, shape, angle, trueLevel) {
    const heightSW = levelHeightmap[trueLevel][x][z];
    const heightSE = levelHeightmap[trueLevel][x + 1][z];
    const heightNW = levelHeightmap[trueLevel][x + 1][z + 1];
    const heightNE = levelHeightmap[trueLevel][x][z + 1];
    const y = heightSW + heightSE + heightNW + heightNE >> 2;
    const loc = LocType.get(locId);
    let typecode = x + (z << 7) + (locId << 14) + 1073741824 | 0;
    if (!loc.locActive) {
      typecode += -2147483648;
    }
    typecode |= 0;
    const info = ((angle << 6) + shape | 0) << 24 >> 24;
    if (shape === LocShape.GROUND_DECOR.id) {
      scene?.addGroundDecoration(loc.getModel(LocShape.GROUND_DECOR.id, angle, heightSW, heightSE, heightNW, heightNE, -1), level, x, z, y, typecode, info);
      if (loc.blockwalk && loc.locActive) {
        collision?.addFloor(x, z);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 3, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.CENTREPIECE_STRAIGHT.id || shape === LocShape.CENTREPIECE_DIAGONAL.id) {
      const model = loc.getModel(LocShape.CENTREPIECE_STRAIGHT.id, angle, heightSW, heightSE, heightNW, heightNE, -1);
      if (model) {
        let yaw = 0;
        if (shape === LocShape.CENTREPIECE_DIAGONAL.id) {
          yaw += 256;
        }
        let width;
        let height;
        if (angle === 1 /* NORTH */ || angle === 3 /* SOUTH */) {
          width = loc.length;
          height = loc.width;
        } else {
          width = loc.width;
          height = loc.length;
        }
        scene?.addLoc(level, x, z, y, model, null, typecode, info, width, height, yaw);
      }
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape >= LocShape.ROOF_STRAIGHT.id) {
      scene?.addLoc(level, x, z, y, loc.getModel(shape, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info, 1, 1, 0);
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_STRAIGHT.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_TYPE[angle], 0, loc.getModel(LocShape.WALL_STRAIGHT.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_DIAGONAL_CORNER.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_CORNER_TYPE[angle], 0, loc.getModel(LocShape.WALL_DIAGONAL_CORNER.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_L.id) {
      const offset = angle + 1 & 3;
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_TYPE[angle], World.ROTATION_WALL_TYPE[offset], loc.getModel(LocShape.WALL_L.id, angle + 4, heightSW, heightSE, heightNW, heightNE, -1), loc.getModel(LocShape.WALL_L.id, offset, heightSW, heightSE, heightNW, heightNE, -1), typecode, info);
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_SQUARE_CORNER.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_CORNER_TYPE[angle], 0, loc.getModel(LocShape.WALL_SQUARE_CORNER.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_DIAGONAL.id) {
      scene?.addLoc(level, x, z, y, loc.getModel(shape, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info, 1, 1, 0);
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle * 512, World.ROTATION_WALL_TYPE[angle]);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_STRAIGHT_OFFSET.id) {
      let offset = 16;
      if (scene) {
        const typecode2 = scene.getWallTypecode(level, x, z);
        if (typecode2 > 0) {
          offset = LocType.get(typecode2 >> 14 & 32767).wallwidth;
        }
      }
      scene?.setWallDecoration(level, x, z, y, World.WALL_DECORATION_ROTATION_FORWARD_X[angle] * offset, World.WALL_DECORATION_ROTATION_FORWARD_Z[angle] * offset, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle * 512, World.ROTATION_WALL_TYPE[angle]);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_OFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 256);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_NOOFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 512);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_BOTH.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 768);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    }
  }
  maxTileX;
  maxTileZ;
  levelHeightmap;
  levelTileFlags;
  levelTileUnderlayIds;
  levelTileOverlayIds;
  levelTileOverlayShape;
  levelTileOverlayRotation;
  levelShademap;
  levelLightmap;
  blendChroma;
  blendSaturation;
  blendLightness;
  blendLuminance;
  blendMagnitude;
  levelOccludemap;
  constructor(maxTileX, maxTileZ, levelHeightmap, levelTileFlags) {
    this.maxTileX = maxTileX;
    this.maxTileZ = maxTileZ;
    this.levelHeightmap = levelHeightmap;
    this.levelTileFlags = levelTileFlags;
    this.levelTileUnderlayIds = new Uint8Array3d(4 /* LEVELS */, maxTileX, maxTileZ);
    this.levelTileOverlayIds = new Uint8Array3d(4 /* LEVELS */, maxTileX, maxTileZ);
    this.levelTileOverlayShape = new Uint8Array3d(4 /* LEVELS */, maxTileX, maxTileZ);
    this.levelTileOverlayRotation = new Uint8Array3d(4 /* LEVELS */, maxTileX, maxTileZ);
    this.levelOccludemap = new Int32Array3d(4 /* LEVELS */, maxTileX + 1, maxTileZ + 1);
    this.levelShademap = new Uint8Array3d(4 /* LEVELS */, maxTileX + 1, maxTileZ + 1);
    this.levelLightmap = new Int32Array2d(maxTileX + 1, maxTileZ + 1);
    this.blendChroma = new Int32Array(maxTileZ);
    this.blendSaturation = new Int32Array(maxTileZ);
    this.blendLightness = new Int32Array(maxTileZ);
    this.blendLuminance = new Int32Array(maxTileZ);
    this.blendMagnitude = new Int32Array(maxTileZ);
  }
  build(scene, collision) {
    for (let level = 0;level < 4 /* LEVELS */; level++) {
      for (let x = 0;x < 104 /* SIZE */; x++) {
        for (let z = 0;z < 104 /* SIZE */; z++) {
          if ((this.levelTileFlags[level][x][z] & 1) === 1) {
            let trueLevel = level;
            if ((this.levelTileFlags[1][x][z] & 2) === 2) {
              trueLevel--;
            }
            if (trueLevel >= 0) {
              collision[trueLevel]?.addFloor(x, z);
            }
          }
        }
      }
    }
    World.randomHueOffset += (Math.random() * 5 | 0) - 2;
    if (World.randomHueOffset < -8) {
      World.randomHueOffset = -8;
    } else if (World.randomHueOffset > 8) {
      World.randomHueOffset = 8;
    }
    World.randomLightnessOffset += (Math.random() * 5 | 0) - 2;
    if (World.randomLightnessOffset < -16) {
      World.randomLightnessOffset = -16;
    } else if (World.randomLightnessOffset > 16) {
      World.randomLightnessOffset = 16;
    }
    for (let level = 0;level < 4 /* LEVELS */; level++) {
      const shademap = this.levelShademap[level];
      const lightAmbient = 96;
      const lightAttenuation = 768;
      const lightX = -50;
      const lightY = -10;
      const lightZ = -50;
      const lightMag = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ) | 0;
      const lightMagnitude = lightAttenuation * lightMag >> 8;
      for (let z = 1;z < this.maxTileZ - 1; z++) {
        for (let x = 1;x < this.maxTileX - 1; x++) {
          const dx = this.levelHeightmap[level][x + 1][z] - this.levelHeightmap[level][x - 1][z];
          const dz = this.levelHeightmap[level][x][z + 1] - this.levelHeightmap[level][x][z - 1];
          const len = Math.sqrt(dx * dx + dz * dz + 65536) | 0;
          const normalX = (dx << 8) / len | 0;
          const normalY = 65536 / len | 0;
          const normalZ = (dz << 8) / len | 0;
          const light = lightAmbient + ((lightX * normalX + lightY * normalY + lightZ * normalZ) / lightMagnitude | 0);
          const shade = (shademap[x - 1][z] >> 2) + (shademap[x + 1][z] >> 3) + (shademap[x][z - 1] >> 2) + (shademap[x][z + 1] >> 3) + (shademap[x][z] >> 1);
          this.levelLightmap[x][z] = light - shade;
        }
      }
      for (let z = 0;z < this.maxTileZ; z++) {
        this.blendChroma[z] = 0;
        this.blendSaturation[z] = 0;
        this.blendLightness[z] = 0;
        this.blendLuminance[z] = 0;
        this.blendMagnitude[z] = 0;
      }
      for (let x0 = -5;x0 < this.maxTileX + 5; x0++) {
        for (let z0 = 0;z0 < this.maxTileZ; z0++) {
          const x1 = x0 + 5;
          let debugMag;
          if (x1 >= 0 && x1 < this.maxTileX) {
            const underlayId = this.levelTileUnderlayIds[level][x1][z0] & 255;
            if (underlayId > 0) {
              const flu = FloType.instances[underlayId - 1];
              this.blendChroma[z0] += flu.chroma;
              this.blendSaturation[z0] += flu.saturation;
              this.blendLightness[z0] += flu.lightness;
              this.blendLuminance[z0] += flu.luminance;
              debugMag = this.blendMagnitude[z0]++;
            }
          }
          const x2 = x0 - 5;
          if (x2 >= 0 && x2 < this.maxTileX) {
            const underlayId = this.levelTileUnderlayIds[level][x2][z0] & 255;
            if (underlayId > 0) {
              const flu = FloType.instances[underlayId - 1];
              this.blendChroma[z0] -= flu.chroma;
              this.blendSaturation[z0] -= flu.saturation;
              this.blendLightness[z0] -= flu.lightness;
              this.blendLuminance[z0] -= flu.luminance;
              debugMag = this.blendMagnitude[z0]--;
            }
          }
        }
        if (x0 >= 1 && x0 < this.maxTileX - 1) {
          let hueAccumulator = 0;
          let saturationAccumulator = 0;
          let lightnessAccumulator = 0;
          let luminanceAccumulator = 0;
          let magnitudeAccumulator = 0;
          for (let z0 = -5;z0 < this.maxTileZ + 5; z0++) {
            const dz1 = z0 + 5;
            if (dz1 >= 0 && dz1 < this.maxTileZ) {
              hueAccumulator += this.blendChroma[dz1];
              saturationAccumulator += this.blendSaturation[dz1];
              lightnessAccumulator += this.blendLightness[dz1];
              luminanceAccumulator += this.blendLuminance[dz1];
              magnitudeAccumulator += this.blendMagnitude[dz1];
            }
            const dz2 = z0 - 5;
            if (dz2 >= 0 && dz2 < this.maxTileZ) {
              hueAccumulator -= this.blendChroma[dz2];
              saturationAccumulator -= this.blendSaturation[dz2];
              lightnessAccumulator -= this.blendLightness[dz2];
              luminanceAccumulator -= this.blendLuminance[dz2];
              magnitudeAccumulator -= this.blendMagnitude[dz2];
            }
            if (z0 >= 1 && z0 < this.maxTileZ - 1 && (!World.lowMemory || (this.levelTileFlags[level][x0][z0] & 16) === 0 && this.getDrawLevel(level, x0, z0) === World.levelBuilt)) {
              const underlayId = this.levelTileUnderlayIds[level][x0][z0] & 255;
              const overlayId = this.levelTileOverlayIds[level][x0][z0] & 255;
              if (underlayId > 0 || overlayId > 0) {
                const heightSW = this.levelHeightmap[level][x0][z0];
                const heightSE = this.levelHeightmap[level][x0 + 1][z0];
                const heightNE = this.levelHeightmap[level][x0 + 1][z0 + 1];
                const heightNW = this.levelHeightmap[level][x0][z0 + 1];
                const lightSW = this.levelLightmap[x0][z0];
                const lightSE = this.levelLightmap[x0 + 1][z0];
                const lightNE = this.levelLightmap[x0 + 1][z0 + 1];
                const lightNW = this.levelLightmap[x0][z0 + 1];
                let baseColor = -1;
                let tintColor = -1;
                if (underlayId > 0) {
                  const hue = hueAccumulator * 256 / luminanceAccumulator | 0;
                  const saturation = saturationAccumulator / magnitudeAccumulator | 0;
                  let lightness = lightnessAccumulator / magnitudeAccumulator | 0;
                  baseColor = FloType.hsl24to16(hue, saturation, lightness);
                  const randomHue = hue + World.randomHueOffset & 255;
                  lightness += World.randomLightnessOffset;
                  if (lightness < 0) {
                    lightness = 0;
                  } else if (lightness > 255) {
                    lightness = 255;
                  }
                  tintColor = FloType.hsl24to16(randomHue, saturation, lightness);
                }
                if (level > 0) {
                  let occludes = underlayId !== 0 || this.levelTileOverlayShape[level][x0][z0] === 0 /* PLAIN */;
                  if (overlayId > 0 && !FloType.instances[overlayId - 1].occlude) {
                    occludes = false;
                  }
                  if (occludes && heightSW === heightSE && heightSW === heightNE && heightSW === heightNW) {
                    this.levelOccludemap[level][x0][z0] |= 2340;
                  }
                }
                let shadeColor = 0;
                if (baseColor !== -1) {
                  shadeColor = Pix3D.hslPal[FloType.mulHSL(tintColor, 96)];
                }
                if (overlayId === 0) {
                  scene?.setTile(level, x0, z0, 0 /* PLAIN */, 0 /* WEST */, -1, heightSW, heightSE, heightNE, heightNW, FloType.mulHSL(baseColor, lightSW), FloType.mulHSL(baseColor, lightSE), FloType.mulHSL(baseColor, lightNE), FloType.mulHSL(baseColor, lightNW), 0 /* BLACK */, 0 /* BLACK */, 0 /* BLACK */, 0 /* BLACK */, shadeColor, 0 /* BLACK */);
                } else {
                  const shape = this.levelTileOverlayShape[level][x0][z0] + 1;
                  const rotation = this.levelTileOverlayRotation[level][x0][z0];
                  const flo = FloType.instances[overlayId - 1];
                  let textureId = flo.overlayTexture;
                  let hsl;
                  let rgb;
                  if (textureId >= 0) {
                    rgb = Pix3D.getAverageTextureRGB(textureId);
                    hsl = -1;
                  } else if (flo.rgb === 16711935 /* MAGENTA */) {
                    rgb = 0;
                    hsl = -2;
                    textureId = -1;
                  } else {
                    hsl = FloType.hsl24to16(flo.hue, flo.saturation, flo.lightness);
                    rgb = Pix3D.hslPal[FloType.adjustLightness(flo.hsl, 96)];
                  }
                  scene?.setTile(level, x0, z0, shape, rotation, textureId, heightSW, heightSE, heightNE, heightNW, FloType.mulHSL(baseColor, lightSW), FloType.mulHSL(baseColor, lightSE), FloType.mulHSL(baseColor, lightNE), FloType.mulHSL(baseColor, lightNW), FloType.adjustLightness(hsl, lightSW), FloType.adjustLightness(hsl, lightSE), FloType.adjustLightness(hsl, lightNE), FloType.adjustLightness(hsl, lightNW), shadeColor, rgb);
                }
              }
            }
          }
        }
      }
      for (let stz = 1;stz < this.maxTileZ - 1; stz++) {
        for (let stx = 1;stx < this.maxTileX - 1; stx++) {
          scene?.setDrawLevel(level, stx, stz, this.getDrawLevel(level, stx, stz));
        }
      }
    }
    if (!World.fullbright) {
      scene?.buildModels(64, 768, -50, -10, -50);
    }
    for (let x = 0;x < this.maxTileX; x++) {
      for (let z = 0;z < this.maxTileZ; z++) {
        if ((this.levelTileFlags[1][x][z] & 2) === 2) {
          scene?.setBridge(x, z);
        }
      }
    }
    if (!World.fullbright) {
      let wall0 = 1;
      let wall1 = 2;
      let floor = 4;
      for (let topLevel = 0;topLevel < 4 /* LEVELS */; topLevel++) {
        if (topLevel > 0) {
          wall0 <<= 3;
          wall1 <<= 3;
          floor <<= 3;
        }
        for (let level = 0;level <= topLevel; level++) {
          for (let tileZ = 0;tileZ <= this.maxTileZ; tileZ++) {
            for (let tileX = 0;tileX <= this.maxTileX; tileX++) {
              if ((this.levelOccludemap[level][tileX][tileZ] & wall0) !== 0) {
                let minTileZ = tileZ;
                let maxTileZ = tileZ;
                let minLevel = level;
                let maxLevel = level;
                while (minTileZ > 0 && (this.levelOccludemap[level][tileX][minTileZ - 1] & wall0) !== 0) {
                  minTileZ--;
                }
                while (maxTileZ < this.maxTileZ && (this.levelOccludemap[level][tileX][maxTileZ + 1] & wall0) !== 0) {
                  maxTileZ++;
                }
                find_min_level:
                  while (minLevel > 0) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      if ((this.levelOccludemap[minLevel - 1][tileX][z] & wall0) === 0) {
                        break find_min_level;
                      }
                    }
                    minLevel--;
                  }
                find_max_level:
                  while (maxLevel < topLevel) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      if ((this.levelOccludemap[maxLevel + 1][tileX][z] & wall0) === 0) {
                        break find_max_level;
                      }
                    }
                    maxLevel++;
                  }
                const area = (maxLevel + 1 - minLevel) * (maxTileZ + 1 - minTileZ);
                if (area >= 8) {
                  const minY = this.levelHeightmap[maxLevel][tileX][minTileZ] - 240;
                  const maxX = this.levelHeightmap[minLevel][tileX][minTileZ];
                  World3D.addOccluder(topLevel, 1, tileX * 128, minY, minTileZ * 128, tileX * 128, maxX, maxTileZ * 128 + 128);
                  for (let l = minLevel;l <= maxLevel; l++) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      this.levelOccludemap[l][tileX][z] &= ~wall0;
                    }
                  }
                }
              }
              if ((this.levelOccludemap[level][tileX][tileZ] & wall1) !== 0) {
                let minTileX = tileX;
                let maxTileX = tileX;
                let minLevel = level;
                let maxLevel = level;
                while (minTileX > 0 && (this.levelOccludemap[level][minTileX - 1][tileZ] & wall1) !== 0) {
                  minTileX--;
                }
                while (maxTileX < this.maxTileX && (this.levelOccludemap[level][maxTileX + 1][tileZ] & wall1) !== 0) {
                  maxTileX++;
                }
                find_min_level2:
                  while (minLevel > 0) {
                    for (let x = minTileX;x <= maxTileX; x++) {
                      if ((this.levelOccludemap[minLevel - 1][x][tileZ] & wall1) === 0) {
                        break find_min_level2;
                      }
                    }
                    minLevel--;
                  }
                find_max_level2:
                  while (maxLevel < topLevel) {
                    for (let x = minTileX;x <= maxTileX; x++) {
                      if ((this.levelOccludemap[maxLevel + 1][x][tileZ] & wall1) === 0) {
                        break find_max_level2;
                      }
                    }
                    maxLevel++;
                  }
                const area = (maxLevel + 1 - minLevel) * (maxTileX + 1 - minTileX);
                if (area >= 8) {
                  const minY = this.levelHeightmap[maxLevel][minTileX][tileZ] - 240;
                  const maxY = this.levelHeightmap[minLevel][minTileX][tileZ];
                  World3D.addOccluder(topLevel, 2, minTileX * 128, minY, tileZ * 128, maxTileX * 128 + 128, maxY, tileZ * 128);
                  for (let l = minLevel;l <= maxLevel; l++) {
                    for (let x = minTileX;x <= maxTileX; x++) {
                      this.levelOccludemap[l][x][tileZ] &= ~wall1;
                    }
                  }
                }
              }
              if ((this.levelOccludemap[level][tileX][tileZ] & floor) !== 0) {
                let minTileX = tileX;
                let maxTileX = tileX;
                let minTileZ = tileZ;
                let maxTileZ = tileZ;
                while (minTileZ > 0 && (this.levelOccludemap[level][tileX][minTileZ - 1] & floor) !== 0) {
                  minTileZ--;
                }
                while (maxTileZ < this.maxTileZ && (this.levelOccludemap[level][tileX][maxTileZ + 1] & floor) !== 0) {
                  maxTileZ++;
                }
                find_min_tile_xz:
                  while (minTileX > 0) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      if ((this.levelOccludemap[level][minTileX - 1][z] & floor) === 0) {
                        break find_min_tile_xz;
                      }
                    }
                    minTileX--;
                  }
                find_max_tile_xz:
                  while (maxTileX < this.maxTileX) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      if ((this.levelOccludemap[level][maxTileX + 1][z] & floor) === 0) {
                        break find_max_tile_xz;
                      }
                    }
                    maxTileX++;
                  }
                if ((maxTileX + 1 - minTileX) * (maxTileZ + 1 - minTileZ) >= 4) {
                  const y = this.levelHeightmap[level][minTileX][minTileZ];
                  World3D.addOccluder(topLevel, 4, minTileX * 128, y, minTileZ * 128, maxTileX * 128 + 128, y, maxTileZ * 128 + 128);
                  for (let x = minTileX;x <= maxTileX; x++) {
                    for (let z = minTileZ;z <= maxTileZ; z++) {
                      this.levelOccludemap[level][x][z] &= ~floor;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  clearLandscape(startX, startZ, endX, endZ) {
    let waterOverlay = 0;
    for (let i = 0;i < FloType.totalCount; i++) {
      if (FloType.instances[i].debugname?.toLowerCase() === "water") {
        waterOverlay = i + 1 << 24 >> 24;
        break;
      }
    }
    for (let z = startX;z < startX + endX; z++) {
      for (let x = startZ;x < startZ + endZ; x++) {
        if (x >= 0 && x < this.maxTileX && z >= 0 && z < this.maxTileZ) {
          this.levelTileOverlayIds[0][x][z] = waterOverlay;
          for (let level = 0;level < 4 /* LEVELS */; level++) {
            this.levelHeightmap[level][x][z] = 0;
            this.levelTileFlags[level][x][z] = 0;
          }
        }
      }
    }
  }
  readLandscape(originX, originZ, xOffset, zOffset, src) {
    const buf = new Packet(src);
    for (let level = 0;level < 4 /* LEVELS */; level++) {
      for (let x = 0;x < 64; x++) {
        for (let z = 0;z < 64; z++) {
          const stx = x + xOffset;
          const stz = z + zOffset;
          let opcode;
          if (stx >= 0 && stx < 104 /* SIZE */ && stz >= 0 && stz < 104 /* SIZE */) {
            this.levelTileFlags[level][stx][stz] = 0;
            while (true) {
              opcode = buf.g1();
              if (opcode === 0) {
                if (level === 0) {
                  this.levelHeightmap[0][stx][stz] = -World.perlin(stx + originX + 932731, stz + 556238 + originZ) * 8;
                } else {
                  this.levelHeightmap[level][stx][stz] = this.levelHeightmap[level - 1][stx][stz] - 240;
                }
                break;
              }
              if (opcode === 1) {
                let height = buf.g1();
                if (height === 1) {
                  height = 0;
                }
                if (level === 0) {
                  this.levelHeightmap[0][stx][stz] = -height * 8;
                } else {
                  this.levelHeightmap[level][stx][stz] = this.levelHeightmap[level - 1][stx][stz] - height * 8;
                }
                break;
              }
              if (opcode <= 49) {
                this.levelTileOverlayIds[level][stx][stz] = buf.g1b();
                this.levelTileOverlayShape[level][stx][stz] = ((opcode - 2) / 4 | 0) << 24 >> 24;
                this.levelTileOverlayRotation[level][stx][stz] = (opcode - 2 & 3) << 24 >> 24;
              } else if (opcode <= 81) {
                this.levelTileFlags[level][stx][stz] = opcode - 49 << 24 >> 24;
              } else {
                this.levelTileUnderlayIds[level][stx][stz] = opcode - 81 << 24 >> 24;
              }
            }
          } else {
            while (true) {
              opcode = buf.g1();
              if (opcode === 0) {
                break;
              }
              if (opcode === 1) {
                buf.g1();
                break;
              }
              if (opcode <= 49) {
                buf.g1();
              }
            }
          }
        }
      }
    }
  }
  readLocs(scene, locs, collision, src, xOffset, zOffset) {
    const buf = new Packet(src);
    let locId = -1;
    while (true) {
      const deltaId = buf.gsmarts();
      if (deltaId === 0) {
        return;
      }
      locId += deltaId;
      let locPos = 0;
      while (true) {
        const deltaPos = buf.gsmarts();
        if (deltaPos === 0) {
          break;
        }
        locPos += deltaPos - 1;
        const z = locPos & 63;
        const x = locPos >> 6 & 63;
        const level = locPos >> 12;
        const info = buf.g1();
        const shape = info >> 2;
        const rotation = info & 3;
        const stx = x + xOffset;
        const stz = z + zOffset;
        if (stx > 0 && stz > 0 && stx < 104 /* SIZE */ - 1 && stz < 104 /* SIZE */ - 1) {
          let currentLevel = level;
          if ((this.levelTileFlags[1][stx][stz] & 2) === 2) {
            currentLevel = level - 1;
          }
          let collisionMap = null;
          if (currentLevel >= 0) {
            collisionMap = collision[currentLevel];
          }
          this.addLoc(level, stx, stz, scene, locs, collisionMap, locId, shape, rotation);
        }
      }
    }
  }
  addLoc(level, x, z, scene, locs, collision, locId, shape, angle) {
    if (World.lowMemory) {
      if ((this.levelTileFlags[level][x][z] & 16) !== 0) {
        return;
      }
      if (this.getDrawLevel(level, x, z) !== World.levelBuilt) {
        return;
      }
    }
    const heightSW = this.levelHeightmap[level][x][z];
    const heightSE = this.levelHeightmap[level][x + 1][z];
    const heightNW = this.levelHeightmap[level][x + 1][z + 1];
    const heightNE = this.levelHeightmap[level][x][z + 1];
    const y = heightSW + heightSE + heightNW + heightNE >> 2;
    const loc = LocType.get(locId);
    let typecode = x + (z << 7) + (locId << 14) + 1073741824 | 0;
    if (!loc.locActive) {
      typecode += -2147483648;
    }
    typecode |= 0;
    const info = ((angle << 6) + shape | 0) << 24 >> 24;
    if (shape === LocShape.GROUND_DECOR.id) {
      if (!World.lowMemory || loc.locActive || loc.forcedecor) {
        scene?.addGroundDecoration(loc.getModel(LocShape.GROUND_DECOR.id, angle, heightSW, heightSE, heightNW, heightNE, -1), level, x, z, y, typecode, info);
        if (loc.blockwalk && loc.locActive) {
          collision?.addFloor(x, z);
        }
        if (loc.anim !== -1) {
          locs.addTail(new LocEntity(locId, level, 3, x, z, SeqType.instances[loc.anim], true));
        }
      }
    } else if (shape === LocShape.CENTREPIECE_STRAIGHT.id || shape === LocShape.CENTREPIECE_DIAGONAL.id) {
      const model = loc.getModel(LocShape.CENTREPIECE_STRAIGHT.id, angle, heightSW, heightSE, heightNW, heightNE, -1);
      if (model) {
        let yaw = 0;
        if (shape === LocShape.CENTREPIECE_DIAGONAL.id) {
          yaw += 256;
        }
        let width;
        let height;
        if (angle === 1 /* NORTH */ || angle === 3 /* SOUTH */) {
          width = loc.length;
          height = loc.width;
        } else {
          width = loc.width;
          height = loc.length;
        }
        if (scene?.addLoc(level, x, z, y, model, null, typecode, info, width, height, yaw) && loc.shadow) {
          for (let dx = 0;dx <= width; dx++) {
            for (let dz = 0;dz <= height; dz++) {
              let shade = model.radius / 4 | 0;
              if (shade > 30) {
                shade = 30;
              }
              if (shade > this.levelShademap[level][x + dx][z + dz]) {
                this.levelShademap[level][x + dx][z + dz] = shade << 24 >> 24;
              }
            }
          }
        }
      }
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape >= LocShape.ROOF_STRAIGHT.id) {
      scene?.addLoc(level, x, z, y, loc.getModel(shape, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info, 1, 1, 0);
      if (shape >= LocShape.ROOF_STRAIGHT.id && shape <= LocShape.ROOF_FLAT.id && shape !== LocShape.ROOF_DIAGONAL_WITH_ROOFEDGE.id && level > 0) {
        this.levelOccludemap[level][x][z] |= 2340;
      }
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_STRAIGHT.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_TYPE[angle], 0, loc.getModel(LocShape.WALL_STRAIGHT.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (angle === 0 /* WEST */) {
        if (loc.shadow) {
          this.levelShademap[level][x][z] = 50;
          this.levelShademap[level][x][z + 1] = 50;
        }
        if (loc.occlude) {
          this.levelOccludemap[level][x][z] |= 585;
        }
      } else if (angle === 1 /* NORTH */) {
        if (loc.shadow) {
          this.levelShademap[level][x][z + 1] = 50;
          this.levelShademap[level][x + 1][z + 1] = 50;
        }
        if (loc.occlude) {
          this.levelOccludemap[level][x][z + 1] |= 1170;
        }
      } else if (angle === 2 /* EAST */) {
        if (loc.shadow) {
          this.levelShademap[level][x + 1][z] = 50;
          this.levelShademap[level][x + 1][z + 1] = 50;
        }
        if (loc.occlude) {
          this.levelOccludemap[level][x + 1][z] |= 585;
        }
      } else if (angle === 3 /* SOUTH */) {
        if (loc.shadow) {
          this.levelShademap[level][x][z] = 50;
          this.levelShademap[level][x + 1][z] = 50;
        }
        if (loc.occlude) {
          this.levelOccludemap[level][x][z] |= 1170;
        }
      }
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
      if (loc.wallwidth !== 16) {
        scene?.setWallDecorationOffset(level, x, z, loc.wallwidth);
      }
    } else if (shape === LocShape.WALL_DIAGONAL_CORNER.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_CORNER_TYPE[angle], 0, loc.getModel(LocShape.WALL_DIAGONAL_CORNER.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (loc.shadow) {
        if (angle === 0 /* WEST */) {
          this.levelShademap[level][x][z + 1] = 50;
        } else if (angle === 1 /* NORTH */) {
          this.levelShademap[level][x + 1][z + 1] = 50;
        } else if (angle === 2 /* EAST */) {
          this.levelShademap[level][x + 1][z] = 50;
        } else if (angle === 3 /* SOUTH */) {
          this.levelShademap[level][x][z] = 50;
        }
      }
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_L.id) {
      const offset = angle + 1 & 3;
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_TYPE[angle], World.ROTATION_WALL_TYPE[offset], loc.getModel(LocShape.WALL_L.id, angle + 4, heightSW, heightSE, heightNW, heightNE, -1), loc.getModel(LocShape.WALL_L.id, offset, heightSW, heightSE, heightNW, heightNE, -1), typecode, info);
      if (loc.occlude) {
        if (angle === 0 /* WEST */) {
          this.levelOccludemap[level][x][z] |= 265;
          this.levelOccludemap[level][x][z + 1] |= 1170;
        } else if (angle === 1 /* NORTH */) {
          this.levelOccludemap[level][x][z + 1] |= 1170;
          this.levelOccludemap[level][x + 1][z] |= 585;
        } else if (angle === 2 /* EAST */) {
          this.levelOccludemap[level][x + 1][z] |= 585;
          this.levelOccludemap[level][x][z] |= 1170;
        } else if (angle === 3 /* SOUTH */) {
          this.levelOccludemap[level][x][z] |= 1170;
          this.levelOccludemap[level][x][z] |= 585;
        }
      }
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
      if (loc.wallwidth !== 16) {
        scene?.setWallDecorationOffset(level, x, z, loc.wallwidth);
      }
    } else if (shape === LocShape.WALL_SQUARE_CORNER.id) {
      scene?.addWall(level, x, z, y, World.ROTATION_WALL_CORNER_TYPE[angle], 0, loc.getModel(LocShape.WALL_SQUARE_CORNER.id, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info);
      if (loc.shadow) {
        if (angle === 0 /* WEST */) {
          this.levelShademap[level][x][z + 1] = 50;
        } else if (angle === 1 /* NORTH */) {
          this.levelShademap[level][x + 1][z + 1] = 50;
        } else if (angle === 2 /* EAST */) {
          this.levelShademap[level][x + 1][z] = 50;
        } else if (angle === 3 /* SOUTH */) {
          this.levelShademap[level][x][z] = 50;
        }
      }
      if (loc.blockwalk) {
        collision?.addWall(x, z, shape, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 0, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALL_DIAGONAL.id) {
      scene?.addLoc(level, x, z, y, loc.getModel(shape, angle, heightSW, heightSE, heightNW, heightNE, -1), null, typecode, info, 1, 1, 0);
      if (loc.blockwalk) {
        collision?.addLoc(x, z, loc.width, loc.length, angle, loc.blockrange);
      }
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 2, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle * 512, World.ROTATION_WALL_TYPE[angle]);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_STRAIGHT_OFFSET.id) {
      let offset = 16;
      if (scene) {
        const typecode2 = scene.getWallTypecode(level, x, z);
        if (typecode2 > 0) {
          offset = LocType.get(typecode2 >> 14 & 32767).wallwidth;
        }
      }
      scene?.setWallDecoration(level, x, z, y, World.WALL_DECORATION_ROTATION_FORWARD_X[angle] * offset, World.WALL_DECORATION_ROTATION_FORWARD_Z[angle] * offset, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle * 512, World.ROTATION_WALL_TYPE[angle]);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_OFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 256);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_NOOFFSET.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 512);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    } else if (shape === LocShape.WALLDECOR_DIAGONAL_BOTH.id) {
      scene?.setWallDecoration(level, x, z, y, 0, 0, typecode, loc.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0 /* WEST */, heightSW, heightSE, heightNW, heightNE, -1), info, angle, 768);
      if (loc.anim !== -1) {
        locs.addTail(new LocEntity(locId, level, 1, x, z, SeqType.instances[loc.anim], true));
      }
    }
  }
  getDrawLevel(level, stx, stz) {
    if ((this.levelTileFlags[level][stx][stz] & 8) === 0) {
      return level <= 0 || (this.levelTileFlags[1][stx][stz] & 2) === 0 ? level : level - 1;
    }
    return 0;
  }
}

// src/dash3d/entity/Entity.ts
class Entity extends Linkable {
}

// src/dash3d/entity/PathingEntity.ts
class PathingEntity extends Entity {
  x = 0;
  z = 0;
  yaw = 0;
  seqStretches = false;
  size = 1;
  seqStandId = -1;
  seqTurnId = -1;
  seqWalkId = -1;
  seqTurnAroundId = -1;
  seqTurnLeftId = -1;
  seqTurnRightId = -1;
  seqRunId = -1;
  chat = null;
  chatTimer = 100;
  chatColor = 0;
  chatStyle = 0;
  damage = 0;
  damageType = 0;
  combatCycle = -1000;
  health = 0;
  totalHealth = 0;
  targetId = -1;
  targetTileX = 0;
  targetTileZ = 0;
  secondarySeqId = -1;
  secondarySeqFrame = 0;
  secondarySeqCycle = 0;
  primarySeqId = -1;
  primarySeqFrame = 0;
  primarySeqCycle = 0;
  primarySeqDelay = 0;
  primarySeqLoop = 0;
  spotanimId = -1;
  spotanimFrame = 0;
  spotanimCycle = 0;
  spotanimLastCycle = 0;
  spotanimOffset = 0;
  forceMoveStartSceneTileX = 0;
  forceMoveEndSceneTileX = 0;
  forceMoveStartSceneTileZ = 0;
  forceMoveEndSceneTileZ = 0;
  forceMoveEndCycle = 0;
  forceMoveStartCycle = 0;
  forceMoveFaceDirection = 0;
  cycle = 0;
  maxY = 0;
  dstYaw = 0;
  routeLength = 0;
  routeFlagX = new Int32Array(10);
  routeFlagZ = new Int32Array(10);
  routeRun = new TypedArray1d(10, false);
  seqTrigger = 0;
  lastMask = -1;
  lastMaskCycle = -1;
  lastFaceX = -1;
  lastFaceZ = -1;
  move(teleport, x, z) {
    if (this.primarySeqId !== -1 && SeqType.instances[this.primarySeqId].seqPriority <= 1) {
      this.primarySeqId = -1;
    }
    if (!teleport) {
      const dx = x - this.routeFlagX[0];
      const dz = z - this.routeFlagZ[0];
      if (dx >= -8 && dx <= 8 && dz >= -8 && dz <= 8) {
        if (this.routeLength < 9) {
          this.routeLength++;
        }
        for (let i = this.routeLength;i > 0; i--) {
          this.routeFlagX[i] = this.routeFlagX[i - 1];
          this.routeFlagZ[i] = this.routeFlagZ[i - 1];
          this.routeRun[i] = this.routeRun[i - 1];
        }
        this.routeFlagX[0] = x;
        this.routeFlagZ[0] = z;
        this.routeRun[0] = false;
        return;
      }
    }
    this.routeLength = 0;
    this.seqTrigger = 0;
    this.routeFlagX[0] = x;
    this.routeFlagZ[0] = z;
    this.x = this.routeFlagX[0] * 128 + this.size * 64;
    this.z = this.routeFlagZ[0] * 128 + this.size * 64;
  }
  step(running, direction) {
    let nextX = this.routeFlagX[0];
    let nextZ = this.routeFlagZ[0];
    if (direction === 0) {
      nextX--;
      nextZ++;
    } else if (direction === 1) {
      nextZ++;
    } else if (direction === 2) {
      nextX++;
      nextZ++;
    } else if (direction === 3) {
      nextX--;
    } else if (direction === 4) {
      nextX++;
    } else if (direction === 5) {
      nextX--;
      nextZ--;
    } else if (direction === 6) {
      nextZ--;
    } else if (direction === 7) {
      nextX++;
      nextZ--;
    }
    if (this.primarySeqId !== -1 && SeqType.instances[this.primarySeqId].seqPriority <= 1) {
      this.primarySeqId = -1;
    }
    if (this.routeLength < 9) {
      this.routeLength++;
    }
    for (let i = this.routeLength;i > 0; i--) {
      this.routeFlagX[i] = this.routeFlagX[i - 1];
      this.routeFlagZ[i] = this.routeFlagZ[i - 1];
      this.routeRun[i] = this.routeRun[i - 1];
    }
    this.routeFlagX[0] = nextX;
    this.routeFlagZ[0] = nextZ;
    this.routeRun[0] = running;
  }
}

// src/dash3d/entity/NpcEntity.ts
class NpcEntity extends PathingEntity {
  npcType = null;
  draw(_loopCycle) {
    if (!this.npcType) {
      return null;
    }
    if (this.spotanimId === -1 || this.spotanimFrame === -1) {
      return this.getSequencedModel();
    }
    const model = this.getSequencedModel();
    if (!model) {
      return null;
    }
    const spotanim = SpotAnimType.instances[this.spotanimId];
    const model1 = Model.modelShareColored(spotanim.getModel(), true, !spotanim.disposeAlpha, false);
    model1.translateModel(-this.spotanimOffset, 0, 0);
    model1.createLabelReferences();
    if (spotanim.seq && spotanim.seq.seqFrames) {
      model1.applyTransform(spotanim.seq.seqFrames[this.spotanimFrame]);
    }
    model1.labelFaces = null;
    model1.labelVertices = null;
    if (spotanim.resizeh !== 128 || spotanim.resizev !== 128) {
      model1.scale(spotanim.resizeh, spotanim.resizev, spotanim.resizeh);
    }
    model1.calculateNormals(64 + spotanim.ambient, 850 + spotanim.contrast, -30, -50, -30, true);
    const models = [model, model1];
    const tmp = Model.modelFromModelsBounds(models, 2);
    if (this.npcType.size === 1) {
      tmp.pickable = true;
    }
    return tmp;
  }
  isVisibleNow() {
    return this.npcType !== null;
  }
  getSequencedModel() {
    if (!this.npcType) {
      return null;
    }
    if (this.primarySeqId >= 0 && this.primarySeqDelay === 0) {
      const frames = SeqType.instances[this.primarySeqId].seqFrames;
      if (frames) {
        const primaryTransformId = frames[this.primarySeqFrame];
        let secondaryTransformId = -1;
        if (this.secondarySeqId >= 0 && this.secondarySeqId !== this.seqStandId) {
          const secondFrames = SeqType.instances[this.secondarySeqId].seqFrames;
          if (secondFrames) {
            secondaryTransformId = secondFrames[this.secondarySeqFrame];
          }
        }
        return this.npcType.getSequencedModel(primaryTransformId, secondaryTransformId, SeqType.instances[this.primarySeqId].walkmerge);
      }
    }
    let transformId = -1;
    if (this.secondarySeqId >= 0) {
      const secondFrames = SeqType.instances[this.secondarySeqId].seqFrames;
      if (secondFrames) {
        transformId = secondFrames[this.secondarySeqFrame];
      }
    }
    const model = this.npcType.getSequencedModel(transformId, -1, null);
    if (!model) {
      return null;
    }
    this.maxY = model.maxY;
    return model;
  }
}

// src/dash3d/entity/PlayerEntity.ts
class PlayerEntity extends PathingEntity {
  static TORSO_RECOLORS = [
    9104 /* BODY_RECOLOR_KHAKI */,
    10275 /* BODY_RECOLOR_CHARCOAL */,
    7595 /* BODY_RECOLOR_CRIMSON */,
    3610 /* BODY_RECOLOR_NAVY */,
    7975 /* BODY_RECOLOR_STRAW */,
    8526 /* BODY_RECOLOR_WHITE */,
    918 /* BODY_RECOLOR_RED */,
    38802 /* BODY_RECOLOR_BLUE */,
    24466 /* BODY_RECOLOR_GREEN */,
    10145 /* BODY_RECOLOR_YELLOW */,
    58654 /* BODY_RECOLOR_PURPLE */,
    5027 /* BODY_RECOLOR_ORANGE */,
    1457 /* BODY_RECOLOR_ROSE */,
    16565 /* BODY_RECOLOR_LIME */,
    34991 /* BODY_RECOLOR_CYAN */,
    25486 /* BODY_RECOLOR_EMERALD */
  ];
  static DESIGN_IDK_COLORS = [
    [
      6798 /* HAIR_DARK_BROWN */,
      107 /* HAIR_WHITE */,
      10283 /* HAIR_LIGHT_GREY */,
      16 /* HAIR_DARK_GREY */,
      4797 /* HAIR_APRICOT */,
      7744 /* HAIR_STRAW */,
      5799 /* HAIR_LIGHT_BROWN */,
      4634 /* HAIR_BROWN */,
      33697 /* HAIR_TURQUOISE */,
      22433 /* HAIR_GREEN */,
      2983 /* HAIR_GINGER */,
      54193 /* HAIR_MAGENTA */
    ],
    [
      8741 /* BODY_KHAKI */,
      12 /* BODY_CHARCOAL */,
      64030 /* BODY_CRIMSON */,
      43162 /* BODY_NAVY */,
      7735 /* BODY_STRAW */,
      8404 /* BODY_WHITE */,
      1701 /* BODY_RED */,
      38430 /* BODY_BLUE */,
      24094 /* BODY_GREEN */,
      10153 /* BODY_YELLOW */,
      56621 /* BODY_PURPLE */,
      4783 /* BODY_ORANGE */,
      1341 /* BODY_ROSE */,
      16578 /* BODY_LIME */,
      35003 /* BODY_CYAN */,
      25239 /* BODY_EMERALD */
    ],
    [
      25239 /* BODY_EMERALD */ - 1,
      8741 /* BODY_KHAKI */ + 1,
      12 /* BODY_CHARCOAL */,
      64030 /* BODY_CRIMSON */,
      43162 /* BODY_NAVY */,
      7735 /* BODY_STRAW */,
      8404 /* BODY_WHITE */,
      1701 /* BODY_RED */,
      38430 /* BODY_BLUE */,
      24094 /* BODY_GREEN */,
      10153 /* BODY_YELLOW */,
      56621 /* BODY_PURPLE */,
      4783 /* BODY_ORANGE */,
      1341 /* BODY_ROSE */,
      16578 /* BODY_LIME */,
      35003 /* BODY_CYAN */
    ],
    [
      4626 /* FEET_BROWN */,
      11146 /* FEET_KHAKI */,
      6439 /* FEET_ASHEN */,
      12 /* FEET_DARK */,
      4758 /* FEET_TERRACOTTA */,
      10270 /* FEET_GREY */
    ],
    [
      4550 /* SKIN_DARKER */,
      4537 /* SKIN_DARKER_DARKER */,
      5681 /* SKIN_DARKER_DARKER_DARKER */,
      5673 /* SKIN_DARKER_DARKER_DARKER_DARKER */,
      5790 /* SKIN_DARKER_DARKER_DARKER_DARKER_DARKER */,
      6806 /* SKIN_DARKER_DARKER_DARKER_DARKER_DARKER_DARKER */,
      8076 /* SKIN_DARKER_DARKER_DARKER_DARKER_DARKER_DARKER_DARKER */,
      4574 /* SKIN */
    ]
  ];
  static modelCache = new LruCache(200);
  name = null;
  playerVisible = false;
  gender = 0;
  headicons = 0;
  appearances = new Uint16Array(12);
  colors = new Uint16Array(5);
  combatLevel = 0;
  appearanceHashcode = 0n;
  y = 0;
  locStartCycle = 0;
  locStopCycle = 0;
  locOffsetX = 0;
  locOffsetY = 0;
  locOffsetZ = 0;
  locModel = null;
  minTileX = 0;
  minTileZ = 0;
  maxTileX = 0;
  maxTileZ = 0;
  lowMemory = false;
  draw(loopCycle) {
    if (!this.playerVisible) {
      return null;
    }
    let model = this.getSequencedModel();
    this.maxY = model.maxY;
    model.pickable = true;
    if (this.lowMemory) {
      return model;
    }
    if (this.spotanimId !== -1 && this.spotanimFrame !== -1) {
      const spotanim = SpotAnimType.instances[this.spotanimId];
      const model2 = Model.modelShareColored(spotanim.getModel(), true, !spotanim.disposeAlpha, false);
      model2.translateModel(-this.spotanimOffset, 0, 0);
      model2.createLabelReferences();
      if (spotanim.seq && spotanim.seq.seqFrames) {
        model2.applyTransform(spotanim.seq.seqFrames[this.spotanimFrame]);
      }
      model2.labelFaces = null;
      model2.labelVertices = null;
      if (spotanim.resizeh !== 128 || spotanim.resizev !== 128) {
        model2.scale(spotanim.resizeh, spotanim.resizev, spotanim.resizeh);
      }
      model2.calculateNormals(spotanim.ambient + 64, spotanim.contrast + 850, -30, -50, -30, true);
      const models = [model, model2];
      model = Model.modelFromModelsBounds(models, 2);
    }
    if (this.locModel) {
      if (loopCycle >= this.locStopCycle) {
        this.locModel = null;
      }
      if (loopCycle >= this.locStartCycle && loopCycle < this.locStopCycle) {
        const loc = this.locModel;
        if (loc) {
          loc.translateModel(this.locOffsetY - this.y, this.locOffsetX - this.x, this.locOffsetZ - this.z);
          if (this.dstYaw === 512) {
            loc.rotateY90();
            loc.rotateY90();
            loc.rotateY90();
          } else if (this.dstYaw === 1024) {
            loc.rotateY90();
            loc.rotateY90();
          } else if (this.dstYaw === 1536) {
            loc.rotateY90();
          }
          const models = [model, loc];
          model = Model.modelFromModelsBounds(models, 2);
          if (this.dstYaw === 512) {
            loc.rotateY90();
          } else if (this.dstYaw === 1024) {
            loc.rotateY90();
            loc.rotateY90();
          } else if (this.dstYaw === 1536) {
            loc.rotateY90();
            loc.rotateY90();
            loc.rotateY90();
          }
          loc.translateModel(this.y - this.locOffsetY, this.x - this.locOffsetX, this.z - this.locOffsetZ);
        }
      }
    }
    model.pickable = true;
    return model;
  }
  isVisibleNow() {
    return this.playerVisible;
  }
  read(buf) {
    buf.pos = 0;
    this.gender = buf.g1();
    this.headicons = buf.g1();
    for (let part = 0;part < 12; part++) {
      const msb = buf.g1();
      if (msb === 0) {
        this.appearances[part] = 0;
      } else {
        this.appearances[part] = (msb << 8) + buf.g1();
      }
    }
    for (let part = 0;part < 5; part++) {
      let color = buf.g1();
      if (color < 0 || color >= PlayerEntity.DESIGN_IDK_COLORS[part].length) {
        color = 0;
      }
      this.colors[part] = color;
    }
    this.seqStandId = buf.g2();
    if (this.seqStandId === 65535) {
      this.seqStandId = -1;
    }
    this.seqTurnId = buf.g2();
    if (this.seqTurnId === 65535) {
      this.seqTurnId = -1;
    }
    this.seqWalkId = buf.g2();
    if (this.seqWalkId === 65535) {
      this.seqWalkId = -1;
    }
    this.seqTurnAroundId = buf.g2();
    if (this.seqTurnAroundId === 65535) {
      this.seqTurnAroundId = -1;
    }
    this.seqTurnLeftId = buf.g2();
    if (this.seqTurnLeftId === 65535) {
      this.seqTurnLeftId = -1;
    }
    this.seqTurnRightId = buf.g2();
    if (this.seqTurnRightId === 65535) {
      this.seqTurnRightId = -1;
    }
    this.seqRunId = buf.g2();
    if (this.seqRunId === 65535) {
      this.seqRunId = -1;
    }
    this.name = JString.formatName(JString.fromBase37(buf.g8()));
    this.combatLevel = buf.g1();
    this.playerVisible = true;
    this.appearanceHashcode = 0n;
    for (let part = 0;part < 12; part++) {
      this.appearanceHashcode <<= 0x4n;
      if (this.appearances[part] >= 256) {
        this.appearanceHashcode += BigInt(this.appearances[part]) - 256n;
      }
    }
    if (this.appearances[0] >= 256) {
      this.appearanceHashcode += BigInt(this.appearances[0]) - 256n >> 4n;
    }
    if (this.appearances[1] >= 256) {
      this.appearanceHashcode += BigInt(this.appearances[1]) - 256n >> 8n;
    }
    for (let part = 0;part < 5; part++) {
      this.appearanceHashcode <<= 0x3n;
      this.appearanceHashcode += BigInt(this.colors[part]);
    }
    this.appearanceHashcode <<= 0x1n;
    this.appearanceHashcode += BigInt(this.gender);
  }
  getHeadModel() {
    if (!this.playerVisible) {
      return null;
    }
    const models = new TypedArray1d(12, null);
    let modelCount = 0;
    for (let part = 0;part < 12; part++) {
      const value = this.appearances[part];
      if (value >= 256 && value < 512) {
        models[modelCount++] = IdkType.instances[value - 256].getHeadModel();
      }
      if (value >= 512) {
        const headModel = ObjType.get(value - 512).getHeadModel(this.gender);
        if (headModel) {
          models[modelCount++] = headModel;
        }
      }
    }
    const tmp = Model.modelFromModels(models, modelCount);
    for (let part = 0;part < 5; part++) {
      if (this.colors[part] === 0) {
        continue;
      }
      tmp.recolor(PlayerEntity.DESIGN_IDK_COLORS[part][0], PlayerEntity.DESIGN_IDK_COLORS[part][this.colors[part]]);
      if (part === 1) {
        tmp.recolor(PlayerEntity.TORSO_RECOLORS[0], PlayerEntity.TORSO_RECOLORS[this.colors[part]]);
      }
    }
    return tmp;
  }
  getSequencedModel() {
    let hashCode = this.appearanceHashcode;
    let primaryTransformId = -1;
    let secondaryTransformId = -1;
    let rightHandValue = -1;
    let leftHandValue = -1;
    if (this.primarySeqId >= 0 && this.primarySeqDelay === 0) {
      const seq = SeqType.instances[this.primarySeqId];
      if (seq.seqFrames) {
        primaryTransformId = seq.seqFrames[this.primarySeqFrame];
      }
      if (this.secondarySeqId >= 0 && this.secondarySeqId !== this.seqStandId) {
        const secondFrames = SeqType.instances[this.secondarySeqId].seqFrames;
        if (secondFrames) {
          secondaryTransformId = secondFrames[this.secondarySeqFrame];
        }
      }
      if (seq.righthand >= 0) {
        rightHandValue = seq.righthand;
        hashCode += BigInt(rightHandValue - this.appearances[5]) << 8n;
      }
      if (seq.lefthand >= 0) {
        leftHandValue = seq.lefthand;
        hashCode += BigInt(leftHandValue - this.appearances[3]) << 16n;
      }
    } else if (this.secondarySeqId >= 0) {
      const secondFrames = SeqType.instances[this.secondarySeqId].seqFrames;
      if (secondFrames) {
        primaryTransformId = secondFrames[this.secondarySeqFrame];
      }
    }
    let model = PlayerEntity.modelCache?.get(hashCode);
    if (!model) {
      const models = new TypedArray1d(12, null);
      let modelCount = 0;
      for (let part = 0;part < 12; part++) {
        let value = this.appearances[part];
        if (leftHandValue >= 0 && part === 3) {
          value = leftHandValue;
        }
        if (rightHandValue >= 0 && part === 5) {
          value = rightHandValue;
        }
        if (value >= 256 && value < 512) {
          const idkModel = IdkType.instances[value - 256].getModel();
          if (idkModel) {
            models[modelCount++] = idkModel;
          }
        }
        if (value >= 512) {
          const obj = ObjType.get(value - 512);
          const wornModel = obj.getWornModel(this.gender);
          if (wornModel) {
            models[modelCount++] = wornModel;
          }
        }
      }
      model = Model.modelFromModels(models, modelCount);
      for (let part = 0;part < 5; part++) {
        if (this.colors[part] === 0) {
          continue;
        }
        model.recolor(PlayerEntity.DESIGN_IDK_COLORS[part][0], PlayerEntity.DESIGN_IDK_COLORS[part][this.colors[part]]);
        if (part === 1) {
          model.recolor(PlayerEntity.TORSO_RECOLORS[0], PlayerEntity.TORSO_RECOLORS[this.colors[part]]);
        }
      }
      model.createLabelReferences();
      model.calculateNormals(64, 850, -30, -50, -30, true);
      PlayerEntity.modelCache?.put(hashCode, model);
    }
    if (this.lowMemory) {
      return model;
    }
    const tmp = Model.modelShareAlpha(model, true);
    if (primaryTransformId !== -1 && secondaryTransformId !== -1) {
      tmp.applyTransforms(primaryTransformId, secondaryTransformId, SeqType.instances[this.primarySeqId].walkmerge);
    } else if (primaryTransformId !== -1) {
      tmp.applyTransform(primaryTransformId);
    }
    tmp.calculateBoundsCylinder();
    tmp.labelFaces = null;
    tmp.labelVertices = null;
    return tmp;
  }
}

// src/dash3d/type/LocAdd.ts
class LocAdd extends Linkable {
  duration = -1;
  locIndex = 0;
  locAngle = 0;
  shape = 0;
  plane = 0;
  layer = 0;
  x = 0;
  z = 0;
  lastLocIndex = 0;
  lastAngle = 0;
  lastShape = 0;
  delay = 0;
}

// src/dash3d/entity/ObjStackEntity.ts
class ObjStackEntity extends Linkable {
  index;
  count;
  constructor(index, count) {
    super();
    this.index = index;
    this.count = count;
  }
}

// src/dash3d/entity/ProjectileEntity.ts
class ProjectileEntity extends Entity {
  spotanim;
  projLevel;
  srcX;
  srcZ;
  srcY;
  projOffsetY;
  startCycle;
  lastCycle;
  peakPitch;
  projArc;
  projTarget;
  mobile = false;
  x = 0;
  z = 0;
  y = 0;
  projVelocityX = 0;
  projVelocityZ = 0;
  projVelocity = 0;
  projVelocityY = 0;
  accelerationY = 0;
  yaw = 0;
  pitch = 0;
  seqFrame = 0;
  seqCycle = 0;
  constructor(spotanim, level, srcX, srcY, srcZ, startCycle, lastCycle, peakPitch, arc, target, offsetY) {
    super();
    this.spotanim = SpotAnimType.instances[spotanim];
    this.projLevel = level;
    this.srcX = srcX;
    this.srcZ = srcZ;
    this.srcY = srcY;
    this.startCycle = startCycle;
    this.lastCycle = lastCycle;
    this.peakPitch = peakPitch;
    this.projArc = arc;
    this.projTarget = target;
    this.projOffsetY = offsetY;
  }
  updateVelocity(dstX, dstY, dstZ, cycle) {
    if (!this.mobile) {
      const dx = dstX - this.srcX;
      const dz = dstZ - this.srcZ;
      const d = Math.sqrt(dx * dx + dz * dz);
      this.x = this.srcX + dx * this.projArc / d;
      this.z = this.srcZ + dz * this.projArc / d;
      this.y = this.srcY;
    }
    const dt = this.lastCycle + 1 - cycle;
    this.projVelocityX = (dstX - this.x) / dt;
    this.projVelocityZ = (dstZ - this.z) / dt;
    this.projVelocity = Math.sqrt(this.projVelocityX * this.projVelocityX + this.projVelocityZ * this.projVelocityZ);
    if (!this.mobile) {
      this.projVelocityY = -this.projVelocity * Math.tan(this.peakPitch * 0.02454369);
    }
    this.accelerationY = (dstY - this.y - this.projVelocityY * dt) * 2 / (dt * dt);
  }
  update(delta) {
    this.mobile = true;
    this.x += this.projVelocityX * delta;
    this.z += this.projVelocityZ * delta;
    this.y += this.projVelocityY * delta + this.accelerationY * 0.5 * delta * delta;
    this.projVelocityY += this.accelerationY * delta;
    this.yaw = (Math.atan2(this.projVelocityX, this.projVelocityZ) * 325.949 + 1024 | 0) & 2047;
    this.pitch = (Math.atan2(this.projVelocityY, this.projVelocity) * 325.949 | 0) & 2047;
    if (!this.spotanim.seq || !this.spotanim.seq.seqDelay) {
      return;
    }
    this.seqCycle += delta;
    while (this.seqCycle > this.spotanim.seq.seqDelay[this.seqFrame]) {
      this.seqCycle -= this.spotanim.seq.seqDelay[this.seqFrame] + 1;
      this.seqFrame++;
      if (this.seqFrame >= this.spotanim.seq.seqFrameCount) {
        this.seqFrame = 0;
      }
    }
  }
  draw() {
    const tmp = this.spotanim.getModel();
    const model = Model.modelShareColored(tmp, true, !this.spotanim.disposeAlpha, false);
    if (this.spotanim.seq && this.spotanim.seq.seqFrames) {
      model.createLabelReferences();
      model.applyTransform(this.spotanim.seq.seqFrames[this.seqFrame]);
      model.labelFaces = null;
      model.labelVertices = null;
    }
    if (this.spotanim.resizeh !== 128 || this.spotanim.resizev !== 128) {
      model.scale(this.spotanim.resizeh, this.spotanim.resizev, this.spotanim.resizeh);
    }
    model.rotateX(this.pitch);
    model.calculateNormals(64 + this.spotanim.ambient, 850 + this.spotanim.contrast, -30, -50, -30, true);
    return model;
  }
}

// src/dash3d/entity/SpotAnimEntity.ts
class SpotAnimEntity extends Entity {
  spotType;
  spotLevel;
  x;
  z;
  y;
  startCycle;
  seqComplete = false;
  seqFrame = 0;
  seqCycle = 0;
  constructor(id, level, x, z, y, cycle, delay) {
    super();
    this.spotType = SpotAnimType.instances[id];
    this.spotLevel = level;
    this.x = x;
    this.z = z;
    this.y = y;
    this.startCycle = cycle + delay;
  }
  update(delta) {
    if (!this.spotType.seq || !this.spotType.seq.seqDelay) {
      return;
    }
    for (this.seqCycle += delta;this.seqCycle > this.spotType.seq.seqDelay[this.seqFrame]; ) {
      this.seqCycle -= this.spotType.seq.seqDelay[this.seqFrame] + 1;
      this.seqFrame++;
      if (this.seqFrame >= this.spotType.seq.seqFrameCount) {
        this.seqFrame = 0;
        this.seqComplete = true;
      }
    }
  }
  draw() {
    const tmp = this.spotType.getModel();
    const model = Model.modelShareColored(tmp, true, !this.spotType.disposeAlpha, false);
    if (!this.seqComplete && this.spotType.seq && this.spotType.seq.seqFrames) {
      model.createLabelReferences();
      model.applyTransform(this.spotType.seq.seqFrames[this.seqFrame]);
      model.labelFaces = null;
      model.labelVertices = null;
    }
    if (this.spotType.resizeh !== 128 || this.spotType.resizev !== 128) {
      model.scale(this.spotType.resizeh, this.spotType.resizev, this.spotType.resizeh);
    }
    if (this.spotType.spotAngle !== 0) {
      if (this.spotType.spotAngle === 90) {
        model.rotateY90();
      } else if (this.spotType.spotAngle === 180) {
        model.rotateY90();
        model.rotateY90();
      } else if (this.spotType.spotAngle === 270) {
        model.rotateY90();
        model.rotateY90();
        model.rotateY90();
      }
    }
    model.calculateNormals(64 + this.spotType.ambient, 850 + this.spotType.contrast, -30, -50, -30, true);
    return model;
  }
}

// src/util/JavaRandom.ts
class JavaRandom {
  seed;
  constructor(seed) {
    this.seed = (seed ^ 0x5deece66dn) & (1n << 48n) - 1n;
  }
  setSeed(seed) {
    this.seed = (seed ^ 0x5deece66dn) & (1n << 48n) - 1n;
  }
  nextInt() {
    return this.next(32);
  }
  next(bits) {
    this.seed = this.seed * 0x5deece66dn + 0xbn & (1n << 48n) - 1n;
    return Number(this.seed) >>> 48 - bits;
  }
}

// src/graphics/PixFont.ts
class PixFont extends DoublyLinkable {
  static CHARSET = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"£$%^&*()-_=+[{]};:'@#~,<.>/?\\| `;
  static CHARCODESET = [];
  charMask = [];
  charMaskWidth = new Int32Array(94);
  charMaskHeight = new Int32Array(94);
  charOffsetX = new Int32Array(94);
  charOffsetY = new Int32Array(94);
  charAdvance = new Int32Array(95);
  drawWidth = new Int32Array(256);
  random = new JavaRandom(BigInt(Date.now()));
  height2d = 0;
  static {
    const isCapacitor = navigator.userAgent.includes("Capacitor");
    for (let i = 0;i < 256; i++) {
      let c = PixFont.CHARSET.indexOf(String.fromCharCode(i));
      if (isCapacitor) {
        if (c >= 63) {
          c--;
        }
      }
      if (c === -1) {
        c = 74;
      }
      PixFont.CHARCODESET[i] = c;
    }
  }
  static fromArchive(archive, name) {
    const dat = new Packet(archive.read(name + ".dat"));
    const idx = new Packet(archive.read("index.dat"));
    idx.pos = dat.g2() + 4;
    const off = idx.g1();
    if (off > 0) {
      idx.pos += (off - 1) * 3;
    }
    const font = new PixFont;
    for (let i = 0;i < 94; i++) {
      font.charOffsetX[i] = idx.g1();
      font.charOffsetY[i] = idx.g1();
      const w = font.charMaskWidth[i] = idx.g2();
      const h = font.charMaskHeight[i] = idx.g2();
      const type = idx.g1();
      const len = w * h;
      font.charMask[i] = new Int8Array(len);
      if (type === 0) {
        for (let j = 0;j < w * h; j++) {
          font.charMask[i][j] = dat.g1b();
        }
      } else if (type === 1) {
        for (let x = 0;x < w; x++) {
          for (let y = 0;y < h; y++) {
            font.charMask[i][x + y * w] = dat.g1b();
          }
        }
      }
      if (h > font.height2d) {
        font.height2d = h;
      }
      font.charOffsetX[i] = 1;
      font.charAdvance[i] = w + 2;
      {
        let space = 0;
        for (let y = h / 7 | 0;y < h; y++) {
          space += font.charMask[i][y * w];
        }
        if (space <= (h / 7 | 0)) {
          font.charAdvance[i]--;
          font.charOffsetX[i] = 0;
        }
      }
      {
        let space = 0;
        for (let y = h / 7 | 0;y < h; y++) {
          space += font.charMask[i][w + y * w - 1];
        }
        if (space <= (h / 7 | 0)) {
          font.charAdvance[i]--;
        }
      }
    }
    font.charAdvance[94] = font.charAdvance[8];
    for (let i = 0;i < 256; i++) {
      font.drawWidth[i] = font.charAdvance[PixFont.CHARCODESET[i]];
    }
    return font;
  }
  drawString(x, y, str, color) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    const length = str.length;
    y -= this.height2d;
    for (let i = 0;i < length; i++) {
      const c = PixFont.CHARCODESET[str.charCodeAt(i)];
      if (c !== 94) {
        this.drawChar(this.charMask[c], x + this.charOffsetX[c], y + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color);
      }
      x += this.charAdvance[c];
    }
  }
  drawStringTaggable(x, y, str, color, shadowed) {
    x |= 0;
    y |= 0;
    const length = str.length;
    y -= this.height2d;
    for (let i = 0;i < length; i++) {
      if (str.charAt(i) === "@" && i + 4 < length && str.charAt(i + 4) === "@") {
        color = this.evaluateTag(str.substring(i + 1, i + 4));
        i += 4;
      } else {
        const c = PixFont.CHARCODESET[str.charCodeAt(i)];
        if (c !== 94) {
          if (shadowed) {
            this.drawChar(this.charMask[c], x + this.charOffsetX[c] + 1, y + this.charOffsetY[c] + 1, this.charMaskWidth[c], this.charMaskHeight[c], 0 /* BLACK */);
          }
          this.drawChar(this.charMask[c], x + this.charOffsetX[c], y + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color);
        }
        x += this.charAdvance[c];
      }
    }
  }
  stringWidth(str) {
    if (!str) {
      return 0;
    }
    const length = str.length;
    let w = 0;
    for (let i = 0;i < length; i++) {
      if (str.charAt(i) === "@" && i + 4 < length && str.charAt(i + 4) === "@") {
        i += 4;
      } else {
        w += this.drawWidth[str.charCodeAt(i)];
      }
    }
    return w;
  }
  drawStringTaggableCenter(x, y, str, color, shadowed) {
    x |= 0;
    y |= 0;
    this.drawStringTaggable(x - (this.stringWidth(str) / 2 | 0), y, str, color, shadowed);
  }
  drawStringCenter(x, y, str, color) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    this.drawString(x - (this.stringWidth(str) / 2 | 0), y, str, color);
  }
  drawStringTooltip(x, y, str, color, shadowed, seed) {
    x |= 0;
    y |= 0;
    this.random.setSeed(BigInt(seed));
    const rand = (this.random.nextInt() & 31) + 192;
    const offY = y - this.height2d;
    for (let i = 0;i < str.length; i++) {
      if (str.charAt(i) === "@" && i + 4 < str.length && str.charAt(i + 4) === "@") {
        color = this.evaluateTag(str.substring(i + 1, i + 4));
        i += 4;
      } else {
        const c = PixFont.CHARCODESET[str.charCodeAt(i)];
        if (c !== 94) {
          if (shadowed) {
            this.drawCharAlpha(x + this.charOffsetX[c] + 1, offY + this.charOffsetY[c] + 1, this.charMaskWidth[c], this.charMaskHeight[c], 0 /* BLACK */, 192, this.charMask[c]);
          }
          this.drawCharAlpha(x + this.charOffsetX[c], offY + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color, rand, this.charMask[c]);
        }
        x += this.charAdvance[c];
        if ((this.random.nextInt() & 3) === 0) {
          x++;
        }
      }
    }
  }
  drawStringRight(x, y, str, color, shadowed = true) {
    x |= 0;
    y |= 0;
    if (shadowed) {
      this.drawString(x - this.stringWidth(str) + 1, y + 1, str, 0 /* BLACK */);
    }
    this.drawString(x - this.stringWidth(str), y, str, color);
  }
  drawCenteredWave(x, y, str, color, phase) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    x -= this.stringWidth(str) / 2 | 0;
    const offY = y - this.height2d;
    for (let i = 0;i < str.length; i++) {
      const c = PixFont.CHARCODESET[str.charCodeAt(i)];
      if (c != 94) {
        this.drawChar(this.charMask[c], x + this.charOffsetX[c], offY + this.charOffsetY[c] + (Math.sin(i / 2 + phase / 5) * 5 | 0), this.charMaskWidth[c], this.charMaskHeight[c], color);
      }
      x += this.charAdvance[c];
    }
  }
  drawChar(data, x, y, w, h, color) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    let dstOff = x + y * Pix2D.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h >= Pix2D.bottom) {
      h -= y + h + 1 - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w >= Pix2D.right) {
      const cutoff = x + w + 1 - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.drawMask(w, h, data, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep, color);
    }
  }
  drawCharAlpha(x, y, w, h, color, alpha, mask) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    let dstOff = x + y * Pix2D.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h >= Pix2D.bottom) {
      h -= y + h + 1 - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w >= Pix2D.right) {
      const cutoff = x + w + 1 - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.drawMaskAlpha(w, h, Pix2D.pixels, dstOff, dstStep, mask, srcOff, srcStep, color, alpha);
    }
  }
  drawMask(w, h, src, srcOff, srcStep, dst, dstOff, dstStep, rgb) {
    w |= 0;
    h |= 0;
    const hw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = hw;x < 0; x++) {
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      for (let x = w;x < 0; x++) {
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  drawMaskAlpha(w, h, dst, dstOff, dstStep, mask, maskOff, maskStep, color, alpha) {
    w |= 0;
    h |= 0;
    const rgb = ((color & 16711935) * alpha & 4278255360) + ((color & 65280) * alpha & 16711680) >> 8;
    const invAlpha = 256 - alpha;
    for (let y = -h;y < 0; y++) {
      for (let x = -w;x < 0; x++) {
        if (mask[maskOff++] === 0) {
          dstOff++;
        } else {
          const dstRgb = dst[dstOff];
          dst[dstOff++] = (((dstRgb & 16711935) * invAlpha & 4278255360) + ((dstRgb & 65280) * invAlpha & 16711680) >> 8) + rgb;
        }
      }
      dstOff += dstStep;
      maskOff += maskStep;
    }
  }
  evaluateTag(tag) {
    if (tag === "red") {
      return 16711680 /* RED */;
    } else if (tag === "gre") {
      return 65280 /* GREEN */;
    } else if (tag === "blu") {
      return 255 /* BLUE */;
    } else if (tag === "yel") {
      return 16776960 /* YELLOW */;
    } else if (tag === "cya") {
      return 65535 /* CYAN */;
    } else if (tag === "mag") {
      return 16711935 /* MAGENTA */;
    } else if (tag === "whi") {
      return 16777215 /* WHITE */;
    } else if (tag === "bla") {
      return 0 /* BLACK */;
    } else if (tag === "lre") {
      return 16748608 /* LIGHTRED */;
    } else if (tag === "dre") {
      return 8388608 /* DARKRED */;
    } else if (tag === "dbl") {
      return 128 /* DARKBLUE */;
    } else if (tag === "or1") {
      return 16756736 /* ORANGE1 */;
    } else if (tag === "or2") {
      return 16740352 /* ORANGE2 */;
    } else if (tag === "or3") {
      return 16723968 /* ORANGE3 */;
    } else if (tag === "gr1") {
      return 12648192 /* GREEN1 */;
    } else if (tag === "gr2") {
      return 8453888 /* GREEN2 */;
    } else if (tag === "gr3") {
      return 4259584 /* GREEN3 */;
    } else {
      return 0 /* BLACK */;
    }
  }
  split(str, maxWidth) {
    if (str.length === 0) {
      return [str];
    }
    const lines = [];
    while (str.length > 0) {
      const width = this.stringWidth(str);
      if (width <= maxWidth && str.indexOf("|") === -1) {
        lines.push(str);
        break;
      }
      let splitIndex = str.length;
      for (let i = 0;i < str.length; i++) {
        if (str[i] === " ") {
          const w = this.stringWidth(str.substring(0, i));
          if (w > maxWidth) {
            break;
          }
          splitIndex = i;
        } else if (str[i] === "|") {
          splitIndex = i;
          break;
        }
      }
      lines.push(str.substring(0, splitIndex));
      str = str.substring(splitIndex + 1);
    }
    return lines;
  }
}

// src/io/ClientStream.ts
class ClientStream {
  socket;
  wsin;
  wsout;
  closed = false;
  ioerror = false;
  static async openSocket(host, secured) {
    return await new Promise((resolve, reject) => {
      const protocol = secured ? "wss" : "ws";
      const ws = new WebSocket(`${protocol}://${host}`, "binary");
      ws.addEventListener("open", () => {
        resolve(ws);
      });
      ws.addEventListener("error", () => {
        reject(ws);
      });
    });
  }
  constructor(socket) {
    socket.onclose = this.onclose;
    socket.onerror = this.onerror;
    this.wsin = new WebSocketReader(socket, 5000);
    this.wsout = new WebSocketWriter(socket, 5000);
    this.socket = socket;
  }
  get host() {
    return this.socket.url.split("/")[2];
  }
  get port() {
    return parseInt(this.socket.url.split(":")[2], 10);
  }
  get available() {
    return this.closed ? 0 : this.wsin.available;
  }
  write(src, len) {
    if (!this.closed) {
      this.wsout.write(src, len);
    }
  }
  async read() {
    return this.closed ? 0 : await this.wsin.read();
  }
  async readBytes(dst, off, len) {
    if (this.closed) {
      return;
    }
    await this.wsin.readBytes(dst, off, len);
  }
  close() {
    this.closed = true;
    this.socket.close();
    this.wsin.close();
    this.wsout.close();
  }
  onclose = (event) => {
    if (this.closed) {
      return;
    }
    this.close();
  };
  onerror = (event) => {
    if (this.closed) {
      return;
    }
    this.ioerror = true;
    this.close();
  };
}

class WebSocketWriter {
  socket;
  limit;
  closed = false;
  ioerror = false;
  constructor(socket, limit) {
    this.socket = socket;
    this.limit = limit;
  }
  write(src, len) {
    if (this.closed) {
      return;
    }
    if (this.ioerror) {
      this.ioerror = false;
      throw new Error;
    }
    if (len > this.limit || src.length > this.limit) {
      throw new Error;
    }
    try {
      this.socket.send(src.slice(0, len));
    } catch (e) {
      this.ioerror = true;
    }
  }
  close() {
    this.closed = true;
  }
}

class WebSocketEvent {
  bytes;
  position;
  constructor(bytes) {
    this.bytes = bytes;
    this.position = 0;
  }
  get available() {
    return this.bytes.length - this.position;
  }
  get read() {
    return this.bytes[this.position++];
  }
  get len() {
    return this.bytes.length;
  }
}

class WebSocketReader {
  limit;
  queue = [];
  event = null;
  callback = null;
  closed = false;
  total = 0;
  constructor(socket, limit) {
    this.limit = limit;
    socket.binaryType = "arraybuffer";
    socket.onmessage = this.onmessage;
  }
  get available() {
    return this.total;
  }
  onmessage = (e) => {
    if (this.closed) {
      throw new Error;
    }
    const event = new WebSocketEvent(new Uint8Array(e.data));
    this.total += event.available;
    if (this.callback) {
      const cb = this.callback;
      this.callback = null;
      cb(event);
    } else {
      this.queue.push(event);
    }
  };
  async read() {
    if (this.closed) {
      throw new Error;
    }
    return await Promise.race([
      new Promise((resolve) => {
        if (!this.event || this.event.available === 0) {
          this.event = this.queue.shift() ?? null;
        }
        if (this.event && this.event.available > 0) {
          resolve(this.event.read);
          this.total--;
        } else {
          this.callback = (event) => {
            this.event = event;
            this.total--;
            resolve(event.read);
          };
        }
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          if (this.closed) {
            reject(new Error);
          } else {
            reject(new Error);
          }
        }, 20000);
      })
    ]);
  }
  async readBytes(dst, off, len) {
    if (this.closed) {
      throw new Error;
    }
    for (let i = 0;i < len; i++) {
      dst[off + i] = await this.read();
    }
    return dst;
  }
  close() {
    this.closed = true;
    this.callback = null;
    this.event = null;
    this.queue = [];
  }
}

// src/io/Database.ts
class Database {
  db;
  constructor(db) {
    db.onerror = this.onerror;
    db.onclose = this.onclose;
    this.db = db;
  }
  static async openDatabase() {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open("lostcity", 1);
      request.onsuccess = (event) => {
        const target = event.target;
        resolve(target.result);
      };
      request.onupgradeneeded = (event) => {
        const target = event.target;
        target.result.createObjectStore("cache");
      };
      request.onerror = (event) => {
        const target = event.target;
        reject(target.result);
      };
    });
  }
  async cacheload(name) {
    return await new Promise((resolve) => {
      const transaction = this.db.transaction("cache", "readonly");
      const store = transaction.objectStore("cache");
      const request = store.get(name);
      request.onsuccess = () => {
        if (request.result) {
          resolve(new Uint8Array(request.result));
        } else {
          resolve(undefined);
        }
      };
      request.onerror = () => {
        resolve(undefined);
      };
    });
  }
  async cachesave(name, src) {
    if (src === null) {
      return;
    }
    return await new Promise((resolve, reject) => {
      const transaction = this.db.transaction("cache", "readwrite");
      const store = transaction.objectStore("cache");
      const request = store.put(src, name);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        resolve();
      };
    });
  }
  onclose = (event) => {
  };
  onerror = (event) => {
  };
}

// src/io/Isaac.ts
class Isaac {
  count = 0;
  rsl = new Int32Array(256);
  mem = new Int32Array(256);
  a = 0;
  b = 0;
  c = 0;
  constructor(seed) {
    for (let i = 0;i < seed.length; i++) {
      this.rsl[i] = seed[i];
    }
    this.init();
  }
  get nextInt() {
    if (this.count-- === 0) {
      this.isaac();
      this.count = 255;
    }
    return this.rsl[this.count];
  }
  init() {
    let a = 2654435769, b = 2654435769, c = 2654435769, d = 2654435769, e = 2654435769, f = 2654435769, g = 2654435769, h = 2654435769;
    for (let i = 0;i < 4; i++) {
      a ^= b << 11;
      d += a;
      b += c;
      b ^= c >>> 2;
      e += b;
      c += d;
      c ^= d << 8;
      f += c;
      d += e;
      d ^= e >>> 16;
      g += d;
      e += f;
      e ^= f << 10;
      h += e;
      f += g;
      f ^= g >>> 4;
      a += f;
      g += h;
      g ^= h << 8;
      b += g;
      h += a;
      h ^= a >>> 9;
      c += h;
      a += b;
    }
    for (let i = 0;i < 256; i += 8) {
      a += this.rsl[i];
      b += this.rsl[i + 1];
      c += this.rsl[i + 2];
      d += this.rsl[i + 3];
      e += this.rsl[i + 4];
      f += this.rsl[i + 5];
      g += this.rsl[i + 6];
      h += this.rsl[i + 7];
      a ^= b << 11;
      d += a;
      b += c;
      b ^= c >>> 2;
      e += b;
      c += d;
      c ^= d << 8;
      f += c;
      d += e;
      d ^= e >>> 16;
      g += d;
      e += f;
      e ^= f << 10;
      h += e;
      f += g;
      f ^= g >>> 4;
      a += f;
      g += h;
      g ^= h << 8;
      b += g;
      h += a;
      h ^= a >>> 9;
      c += h;
      a += b;
      this.mem[i] = a;
      this.mem[i + 1] = b;
      this.mem[i + 2] = c;
      this.mem[i + 3] = d;
      this.mem[i + 4] = e;
      this.mem[i + 5] = f;
      this.mem[i + 6] = g;
      this.mem[i + 7] = h;
    }
    for (let i = 0;i < 256; i += 8) {
      a += this.mem[i];
      b += this.mem[i + 1];
      c += this.mem[i + 2];
      d += this.mem[i + 3];
      e += this.mem[i + 4];
      f += this.mem[i + 5];
      g += this.mem[i + 6];
      h += this.mem[i + 7];
      a ^= b << 11;
      d += a;
      b += c;
      b ^= c >>> 2;
      e += b;
      c += d;
      c ^= d << 8;
      f += c;
      d += e;
      d ^= e >>> 16;
      g += d;
      e += f;
      e ^= f << 10;
      h += e;
      f += g;
      f ^= g >>> 4;
      a += f;
      g += h;
      g ^= h << 8;
      b += g;
      h += a;
      h ^= a >>> 9;
      c += h;
      a += b;
      this.mem[i] = a;
      this.mem[i + 1] = b;
      this.mem[i + 2] = c;
      this.mem[i + 3] = d;
      this.mem[i + 4] = e;
      this.mem[i + 5] = f;
      this.mem[i + 6] = g;
      this.mem[i + 7] = h;
    }
    this.isaac();
    this.count = 256;
  }
  isaac() {
    this.c++;
    this.b += this.c;
    for (let i = 0;i < 256; i++) {
      const x = this.mem[i];
      const mem = i & 3;
      if (mem === 0) {
        this.a ^= this.a << 13;
      } else if (mem === 1) {
        this.a ^= this.a >>> 6;
      } else if (mem === 2) {
        this.a ^= this.a << 2;
      } else if (mem === 3) {
        this.a ^= this.a >>> 16;
      }
      this.a += this.mem[i + 128 & 255];
      let y;
      this.mem[i] = y = this.mem[x >>> 2 & 255] + this.a + this.b;
      this.rsl[i] = this.b = this.mem[y >>> 8 >>> 2 & 255] + x;
    }
  }
}

// src/io/Jagfile.ts
import { BZip2 } from "./deps.js";
class Jagfile {
  static genHash(name) {
    let hash = 0;
    name = name.toUpperCase();
    for (let i = 0;i < name.length; i++) {
      hash = hash * 61 + name.charCodeAt(i) - 32 | 0;
    }
    return hash;
  }
  jagSrc;
  compressedWhole;
  fileCount;
  fileHash;
  fileUnpackedSize;
  filePackedSize;
  fileOffset;
  fileUnpacked = [];
  constructor(src) {
    let data = new Packet(new Uint8Array(src));
    const unpackedSize = data.g3();
    const packedSize = data.g3();
    if (unpackedSize === packedSize) {
      this.jagSrc = src;
      this.compressedWhole = false;
    } else {
      this.jagSrc = BZip2.decompress(src.subarray(6), unpackedSize, true);
      data = new Packet(new Uint8Array(this.jagSrc));
      this.compressedWhole = true;
    }
    this.fileCount = data.g2();
    this.fileHash = [];
    this.fileUnpackedSize = [];
    this.filePackedSize = [];
    this.fileOffset = [];
    let offset = data.pos + this.fileCount * 10;
    for (let i = 0;i < this.fileCount; i++) {
      this.fileHash.push(data.g4());
      this.fileUnpackedSize.push(data.g3());
      this.filePackedSize.push(data.g3());
      this.fileOffset.push(offset);
      offset += this.filePackedSize[i];
    }
  }
  read(name) {
    const hash = Jagfile.genHash(name);
    const index = this.fileHash.indexOf(hash);
    if (index === -1) {
      return null;
    }
    return this.readIndex(index);
  }
  readIndex(index) {
    if (index < 0 || index >= this.fileCount) {
      return null;
    }
    if (this.fileUnpacked[index]) {
      return this.fileUnpacked[index];
    }
    const offset = this.fileOffset[index];
    const length = offset + this.filePackedSize[index];
    const src = new Uint8Array(this.jagSrc.subarray(offset, offset + length));
    if (this.compressedWhole) {
      this.fileUnpacked[index] = src;
      return src;
    } else {
      const data = BZip2.decompress(src, this.fileUnpackedSize[index], true);
      this.fileUnpacked[index] = data;
      return data;
    }
  }
}

// src/io/ServerProt.ts
var ServerProtSizes = [
  0,
  -2,
  4,
  6,
  -1,
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  5,
  4,
  2,
  2,
  0,
  0,
  0,
  0,
  2,
  -2,
  2,
  14,
  0,
  6,
  3,
  0,
  4,
  0,
  0,
  0,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -1,
  4,
  2,
  6,
  0,
  6,
  0,
  0,
  3,
  7,
  0,
  0,
  0,
  -1,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  15,
  0,
  0,
  0,
  0,
  6,
  0,
  2,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  1,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  -2,
  0,
  0,
  2,
  0,
  0,
  0,
  2,
  9,
  0,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  3,
  7,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  0,
  0,
  0,
  0,
  3,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  2,
  0,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  2,
  0,
  2,
  0,
  0,
  0,
  -2,
  0,
  0,
  4,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  -2,
  -2,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  0,
  0,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0
];

// src/wordenc/WordFilter.ts
class WordFilter {
  static PERIOD = new Uint16Array(["d", "o", "t"].join("").split("").map((char) => char.charCodeAt(0)));
  static AMPERSAT = new Uint16Array(["(", "a", ")"].join("").split("").map((char) => char.charCodeAt(0)));
  static SLASH = new Uint16Array(["s", "l", "a", "s", "h"].join("").split("").map((char) => char.charCodeAt(0)));
  static whitelist = ["cook", "cook's", "cooks", "seeks", "sheet"];
  static tlds = [];
  static tldTypes = [];
  static bads = [];
  static badCombinations = [];
  static domains = [];
  static fragments = [];
  static unpack(wordenc) {
    const fragments = new Packet(wordenc.read("fragmentsenc.txt"));
    const bad = new Packet(wordenc.read("badenc.txt"));
    const domain = new Packet(wordenc.read("domainenc.txt"));
    const tld = new Packet(wordenc.read("tldlist.txt"));
    this.read(bad, domain, fragments, tld);
  }
  static filter(input) {
    const characters = [...input];
    this.format(characters);
    const trimmed = characters.join("").trim();
    const lowercase = trimmed.toLowerCase();
    const filtered = [...lowercase];
    this.filterTlds(filtered);
    this.filterBadWords(filtered);
    this.filterDomains(filtered);
    this.filterFragments(filtered);
    for (let index = 0;index < this.whitelist.length; index++) {
      let offset = -1;
      while ((offset = lowercase.indexOf(this.whitelist[index], offset + 1)) !== -1) {
        const whitelisted = [...this.whitelist[index]];
        for (let charIndex = 0;charIndex < whitelisted.length; charIndex++) {
          filtered[charIndex + offset] = whitelisted[charIndex];
        }
      }
    }
    this.replaceUppercases(filtered, [...trimmed]);
    this.formatUppercases(filtered);
    return filtered.join("").trim();
  }
  static read(bad, domain, fragments, tld) {
    this.readBadWords(bad);
    this.readDomains(domain);
    this.readFragments(fragments);
    this.readTld(tld);
  }
  static readTld(packet) {
    const count = packet.g4();
    for (let index = 0;index < count; index++) {
      this.tldTypes[index] = packet.g1();
      this.tlds[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
    }
  }
  static readBadWords(packet) {
    const count = packet.g4();
    for (let index = 0;index < count; index++) {
      this.bads[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
      const combos = new Array(packet.g1()).fill([]).map(() => [packet.g1b(), packet.g1b()]);
      if (combos.length > 0) {
        this.badCombinations[index] = combos;
      }
    }
  }
  static readDomains(packet) {
    const count = packet.g4();
    for (let index = 0;index < count; index++) {
      this.domains[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
    }
  }
  static readFragments(packet) {
    const count = packet.g4();
    for (let index = 0;index < count; index++) {
      this.fragments[index] = packet.g2();
    }
  }
  static filterTlds(chars) {
    const period = [...chars];
    const slash = [...chars];
    this.filterBadCombinations(null, period, this.PERIOD);
    this.filterBadCombinations(null, slash, this.SLASH);
    for (let index = 0;index < this.tlds.length; index++) {
      this.filterTld(slash, this.tldTypes[index], chars, this.tlds[index], period);
    }
  }
  static filterBadWords(chars) {
    for (let comboIndex = 0;comboIndex < 2; comboIndex++) {
      for (let index = this.bads.length - 1;index >= 0; index--) {
        this.filterBadCombinations(this.badCombinations[index], chars, this.bads[index]);
      }
    }
  }
  static filterDomains(chars) {
    const ampersat = [...chars];
    const period = [...chars];
    this.filterBadCombinations(null, ampersat, this.AMPERSAT);
    this.filterBadCombinations(null, period, this.PERIOD);
    for (let index = this.domains.length - 1;index >= 0; index--) {
      this.filterDomain(period, ampersat, this.domains[index], chars);
    }
  }
  static filterFragments(chars) {
    for (let currentIndex = 0;currentIndex < chars.length; ) {
      const numberIndex = this.indexOfNumber(chars, currentIndex);
      if (numberIndex === -1) {
        return;
      }
      let isSymbolOrNotLowercaseAlpha = false;
      for (let index = currentIndex;index >= 0 && index < numberIndex && !isSymbolOrNotLowercaseAlpha; index++) {
        if (!this.isSymbol(chars[index]) && !this.isNotLowercaseAlpha(chars[index])) {
          isSymbolOrNotLowercaseAlpha = true;
        }
      }
      let startIndex = 0;
      if (isSymbolOrNotLowercaseAlpha) {
        startIndex = 0;
      }
      if (startIndex === 0) {
        startIndex = 1;
        currentIndex = numberIndex;
      }
      let value = 0;
      for (let index = numberIndex;index < chars.length && index < currentIndex; index++) {
        value = value * 10 + chars[index].charCodeAt(0) - 48;
      }
      if (value <= 255 && currentIndex - numberIndex <= 8) {
        startIndex++;
      } else {
        startIndex = 0;
      }
      if (startIndex === 4) {
        this.maskChars(numberIndex, currentIndex, chars);
        startIndex = 0;
      }
      currentIndex = this.indexOfNonNumber(currentIndex, chars);
    }
  }
  static isBadFragment(chars) {
    if (this.isNumericalChars(chars)) {
      return true;
    }
    const value = this.getInteger(chars);
    const fragments = this.fragments;
    const fragmentsLength = fragments.length;
    if (value === fragments[0] || value === fragments[fragmentsLength - 1]) {
      return true;
    }
    let start = 0;
    let end = fragmentsLength - 1;
    while (start <= end) {
      const mid = (start + end) / 2 | 0;
      if (value === fragments[mid]) {
        return true;
      } else if (value < fragments[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return false;
  }
  static getInteger(chars) {
    if (chars.length > 6) {
      return 0;
    }
    let value = 0;
    for (let index = 0;index < chars.length; index++) {
      const char = chars[chars.length - index - 1];
      if (this.isLowercaseAlpha(char)) {
        value = value * 38 + char.charCodeAt(0) + 1 - 97;
      } else if (char === "'") {
        value = value * 38 + 27;
      } else if (this.isNumerical(char)) {
        value = value * 38 + char.charCodeAt(0) + 28 - 48;
      } else if (char !== "\x00") {
        return 0;
      }
    }
    return value;
  }
  static indexOfNumber(chars, offset) {
    for (let index = offset;index < chars.length && index >= 0; index++) {
      if (this.isNumerical(chars[index])) {
        return index;
      }
    }
    return -1;
  }
  static indexOfNonNumber(offset, chars) {
    for (let index = offset;index < chars.length && index >= 0; index++) {
      if (!this.isNumerical(chars[index])) {
        return index;
      }
    }
    return chars.length;
  }
  static getEmulatedDomainCharLen(nextChar, domainChar, currentChar) {
    if (domainChar === currentChar) {
      return 1;
    } else if (domainChar === "o" && currentChar === "0") {
      return 1;
    } else if (domainChar === "o" && currentChar === "(" && nextChar === ")") {
      return 2;
    } else if (domainChar === "c" && (currentChar === "(" || currentChar === "<" || currentChar === "[")) {
      return 1;
    } else if (domainChar === "e" && currentChar === "€") {
      return 1;
    } else if (domainChar === "s" && currentChar === "$") {
      return 1;
    } else if (domainChar === "l" && currentChar === "i") {
      return 1;
    }
    return 0;
  }
  static filterDomain(period, ampersat, domain, chars) {
    const domainLength = domain.length;
    const charsLength = chars.length;
    for (let index = 0;index <= charsLength - domainLength; index++) {
      const { matched, currentIndex } = this.findMatchingDomain(index, domain, chars);
      if (!matched) {
        continue;
      }
      const ampersatStatus = this.prefixSymbolStatus(index, chars, 3, ampersat, ["@"]);
      const periodStatus = this.suffixSymbolStatus(currentIndex - 1, chars, 3, period, [".", ","]);
      const shouldFilter = ampersatStatus > 2 || periodStatus > 2;
      if (!shouldFilter) {
        continue;
      }
      this.maskChars(index, currentIndex, chars);
    }
  }
  static findMatchingDomain(startIndex, domain, chars) {
    const domainLength = domain.length;
    let currentIndex = startIndex;
    let domainIndex = 0;
    while (currentIndex < chars.length && domainIndex < domainLength) {
      const currentChar = chars[currentIndex];
      const nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : "\x00";
      const currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex]), currentChar);
      if (currentLength > 0) {
        currentIndex += currentLength;
        domainIndex++;
      } else {
        if (domainIndex === 0)
          break;
        const previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex - 1]), currentChar);
        if (previousLength > 0) {
          currentIndex += previousLength;
          if (domainIndex === 1)
            startIndex++;
        } else {
          if (domainIndex >= domainLength || !this.isSymbol(currentChar))
            break;
          currentIndex++;
        }
      }
    }
    return { matched: domainIndex >= domainLength, currentIndex };
  }
  static filterBadCombinations(combos, chars, bads) {
    if (bads.length > chars.length) {
      return;
    }
    for (let startIndex = 0;startIndex <= chars.length - bads.length; startIndex++) {
      let currentIndex = startIndex;
      const { currentIndex: updatedCurrentIndex, badIndex, hasSymbol, hasNumber, hasDigit } = this.processBadCharacters(chars, bads, currentIndex);
      currentIndex = updatedCurrentIndex;
      let currentChar = chars[currentIndex];
      let nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : "\x00";
      if (!(badIndex >= bads.length && (!hasNumber || !hasDigit))) {
        continue;
      }
      let shouldFilter = true;
      let localIndex;
      if (hasSymbol) {
        let isBeforeSymbol = false;
        let isAfterSymbol = false;
        if (startIndex - 1 < 0 || this.isSymbol(chars[startIndex - 1]) && chars[startIndex - 1] !== "'") {
          isBeforeSymbol = true;
        }
        if (currentIndex >= chars.length || this.isSymbol(chars[currentIndex]) && chars[currentIndex] !== "'") {
          isAfterSymbol = true;
        }
        if (!isBeforeSymbol || !isAfterSymbol) {
          let isSubstringValid = false;
          localIndex = startIndex - 2;
          if (isBeforeSymbol) {
            localIndex = startIndex;
          }
          while (!isSubstringValid && localIndex < currentIndex) {
            if (localIndex >= 0 && (!this.isSymbol(chars[localIndex]) || chars[localIndex] === "'")) {
              const localSubString = [];
              let localSubStringIndex;
              for (localSubStringIndex = 0;localSubStringIndex < 3 && localIndex + localSubStringIndex < chars.length && (!this.isSymbol(chars[localIndex + localSubStringIndex]) || chars[localIndex + localSubStringIndex] === "'"); localSubStringIndex++) {
                localSubString[localSubStringIndex] = chars[localIndex + localSubStringIndex];
              }
              let isSubStringValidCondition = true;
              if (localSubStringIndex === 0) {
                isSubStringValidCondition = false;
              }
              if (localSubStringIndex < 3 && localIndex - 1 >= 0 && (!this.isSymbol(chars[localIndex - 1]) || chars[localIndex - 1] === "'")) {
                isSubStringValidCondition = false;
              }
              if (isSubStringValidCondition && !this.isBadFragment(localSubString)) {
                isSubstringValid = true;
              }
            }
            localIndex++;
          }
          if (!isSubstringValid) {
            shouldFilter = false;
          }
        }
      } else {
        currentChar = " ";
        if (startIndex - 1 >= 0) {
          currentChar = chars[startIndex - 1];
        }
        nextChar = " ";
        if (currentIndex < chars.length) {
          nextChar = chars[currentIndex];
        }
        const current = this.getIndex(currentChar);
        const next = this.getIndex(nextChar);
        if (combos && this.comboMatches(current, combos, next)) {
          shouldFilter = false;
        }
      }
      if (!shouldFilter) {
        continue;
      }
      let numeralCount = 0;
      let alphaCount = 0;
      for (let index = startIndex;index < currentIndex; index++) {
        if (this.isNumerical(chars[index])) {
          numeralCount++;
        } else if (this.isAlpha(chars[index])) {
          alphaCount++;
        }
      }
      if (numeralCount <= alphaCount) {
        this.maskChars(startIndex, currentIndex, chars);
      }
    }
  }
  static processBadCharacters(chars, bads, startIndex) {
    let index = startIndex;
    let badIndex = 0;
    let count = 0;
    let hasSymbol = false;
    let hasNumber = false;
    let hasDigit = false;
    for (;index < chars.length && !(hasNumber && hasDigit); ) {
      if (index >= chars.length || hasNumber && hasDigit) {
        break;
      }
      const currentChar = chars[index];
      const nextChar = index + 1 < chars.length ? chars[index + 1] : "\x00";
      let currentLength;
      if (badIndex < bads.length && (currentLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex]), currentChar)) > 0) {
        if (currentLength === 1 && this.isNumerical(currentChar)) {
          hasNumber = true;
        }
        if (currentLength === 2 && (this.isNumerical(currentChar) || this.isNumerical(nextChar))) {
          hasNumber = true;
        }
        index += currentLength;
        badIndex++;
      } else {
        if (badIndex === 0) {
          break;
        }
        let previousLength;
        if ((previousLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex - 1]), currentChar)) > 0) {
          index += previousLength;
        } else {
          if (badIndex >= bads.length || !this.isNotLowercaseAlpha(currentChar)) {
            break;
          }
          if (this.isSymbol(currentChar) && currentChar !== "'") {
            hasSymbol = true;
          }
          if (this.isNumerical(currentChar)) {
            hasDigit = true;
          }
          index++;
          count++;
          if ((count * 100 / (index - startIndex) | 0) > 90) {
            break;
          }
        }
      }
    }
    return { currentIndex: index, badIndex, hasSymbol, hasNumber, hasDigit };
  }
  static getEmulatedBadCharLen(nextChar, badChar, currentChar) {
    if (badChar === currentChar) {
      return 1;
    }
    if (badChar >= "a" && badChar <= "m") {
      if (badChar === "a") {
        if (currentChar !== "4" && currentChar !== "@" && currentChar !== "^") {
          if (currentChar === "/" && nextChar === "\\") {
            return 2;
          }
          return 0;
        }
        return 1;
      }
      if (badChar === "b") {
        if (currentChar !== "6" && currentChar !== "8") {
          if (currentChar === "1" && nextChar === "3") {
            return 2;
          }
          return 0;
        }
        return 1;
      }
      if (badChar === "c") {
        if (currentChar !== "(" && currentChar !== "<" && currentChar !== "{" && currentChar !== "[") {
          return 0;
        }
        return 1;
      }
      if (badChar === "d") {
        if (currentChar === "[" && nextChar === ")") {
          return 2;
        }
        return 0;
      }
      if (badChar === "e") {
        if (currentChar !== "3" && currentChar !== "€") {
          return 0;
        }
        return 1;
      }
      if (badChar === "f") {
        if (currentChar === "p" && nextChar === "h") {
          return 2;
        }
        if (currentChar === "£") {
          return 1;
        }
        return 0;
      }
      if (badChar === "g") {
        if (currentChar !== "9" && currentChar !== "6") {
          return 0;
        }
        return 1;
      }
      if (badChar === "h") {
        if (currentChar === "#") {
          return 1;
        }
        return 0;
      }
      if (badChar === "i") {
        if (currentChar !== "y" && currentChar !== "l" && currentChar !== "j" && currentChar !== "1" && currentChar !== "!" && currentChar !== ":" && currentChar !== ";" && currentChar !== "|") {
          return 0;
        }
        return 1;
      }
      if (badChar === "j") {
        return 0;
      }
      if (badChar === "k") {
        return 0;
      }
      if (badChar === "l") {
        if (currentChar !== "1" && currentChar !== "|" && currentChar !== "i") {
          return 0;
        }
        return 1;
      }
      if (badChar === "m") {
        return 0;
      }
    }
    if (badChar >= "n" && badChar <= "z") {
      if (badChar === "n") {
        return 0;
      }
      if (badChar === "o") {
        if (currentChar !== "0" && currentChar !== "*") {
          if ((currentChar !== "(" || nextChar !== ")") && (currentChar !== "[" || nextChar !== "]") && (currentChar !== "{" || nextChar !== "}") && (currentChar !== "<" || nextChar !== ">")) {
            return 0;
          }
          return 2;
        }
        return 1;
      }
      if (badChar === "p") {
        return 0;
      }
      if (badChar === "q") {
        return 0;
      }
      if (badChar === "r") {
        return 0;
      }
      if (badChar === "s") {
        if (currentChar !== "5" && currentChar !== "z" && currentChar !== "$" && currentChar !== "2") {
          return 0;
        }
        return 1;
      }
      if (badChar === "t") {
        if (currentChar !== "7" && currentChar !== "+") {
          return 0;
        }
        return 1;
      }
      if (badChar === "u") {
        if (currentChar === "v") {
          return 1;
        }
        if ((currentChar !== "\\" || nextChar !== "/") && (currentChar !== "\\" || nextChar !== "|") && (currentChar !== "|" || nextChar !== "/")) {
          return 0;
        }
        return 2;
      }
      if (badChar === "v") {
        if ((currentChar !== "\\" || nextChar !== "/") && (currentChar !== "\\" || nextChar !== "|") && (currentChar !== "|" || nextChar !== "/")) {
          return 0;
        }
        return 2;
      }
      if (badChar === "w") {
        if (currentChar === "v" && nextChar === "v") {
          return 2;
        }
        return 0;
      }
      if (badChar === "x") {
        if ((currentChar !== ")" || nextChar !== "(") && (currentChar !== "}" || nextChar !== "{") && (currentChar !== "]" || nextChar !== "[") && (currentChar !== ">" || nextChar !== "<")) {
          return 0;
        }
        return 2;
      }
      if (badChar === "y") {
        return 0;
      }
      if (badChar === "z") {
        return 0;
      }
    }
    if (badChar >= "0" && badChar <= "9") {
      if (badChar === "0") {
        if (currentChar === "o" || currentChar === "O") {
          return 1;
        } else if ((currentChar !== "(" || nextChar !== ")") && (currentChar !== "{" || nextChar !== "}") && (currentChar !== "[" || nextChar !== "]")) {
          return 0;
        } else {
          return 2;
        }
      } else if (badChar === "1") {
        return currentChar === "l" ? 1 : 0;
      } else {
        return 0;
      }
    } else if (badChar === ",") {
      return currentChar === "." ? 1 : 0;
    } else if (badChar === ".") {
      return currentChar === "," ? 1 : 0;
    } else if (badChar === "!") {
      return currentChar === "i" ? 1 : 0;
    }
    return 0;
  }
  static comboMatches(currentIndex, combos, nextIndex) {
    let start = 0;
    let end = combos.length - 1;
    while (start <= end) {
      const mid = (start + end) / 2 | 0;
      if (combos[mid][0] === currentIndex && combos[mid][1] === nextIndex) {
        return true;
      } else if (currentIndex < combos[mid][0] || currentIndex === combos[mid][0] && nextIndex < combos[mid][1]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return false;
  }
  static getIndex(char) {
    if (this.isLowercaseAlpha(char)) {
      return char.charCodeAt(0) + 1 - 97;
    } else if (char === "'") {
      return 28;
    } else if (this.isNumerical(char)) {
      return char.charCodeAt(0) + 29 - 48;
    }
    return 27;
  }
  static filterTld(slash, tldType, chars, tld, period) {
    if (tld.length > chars.length) {
      return;
    }
    for (let index = 0;index <= chars.length - tld.length; index++) {
      const { currentIndex, tldIndex } = this.processTlds(chars, tld, index);
      if (tldIndex < tld.length) {
        continue;
      }
      let shouldFilter = false;
      const periodFilterStatus = this.prefixSymbolStatus(index, chars, 3, period, [",", "."]);
      const slashFilterStatus = this.suffixSymbolStatus(currentIndex - 1, chars, 5, slash, ["\\", "/"]);
      if (tldType === 1 && periodFilterStatus > 0 && slashFilterStatus > 0) {
        shouldFilter = true;
      }
      if (tldType === 2 && (periodFilterStatus > 2 && slashFilterStatus > 0 || periodFilterStatus > 0 && slashFilterStatus > 2)) {
        shouldFilter = true;
      }
      if (tldType === 3 && periodFilterStatus > 0 && slashFilterStatus > 2) {
        shouldFilter = true;
      }
      if (!shouldFilter) {
        continue;
      }
      let startFilterIndex = index;
      let endFilterIndex = currentIndex - 1;
      let foundPeriod = false;
      let periodIndex;
      if (periodFilterStatus > 2) {
        if (periodFilterStatus === 4) {
          foundPeriod = false;
          for (periodIndex = index - 1;periodIndex >= 0; periodIndex--) {
            if (foundPeriod) {
              if (period[periodIndex] !== "*") {
                break;
              }
              startFilterIndex = periodIndex;
            } else if (period[periodIndex] === "*") {
              startFilterIndex = periodIndex;
              foundPeriod = true;
            }
          }
        }
        foundPeriod = false;
        for (periodIndex = startFilterIndex - 1;periodIndex >= 0; periodIndex--) {
          if (foundPeriod) {
            if (this.isSymbol(chars[periodIndex])) {
              break;
            }
            startFilterIndex = periodIndex;
          } else if (!this.isSymbol(chars[periodIndex])) {
            foundPeriod = true;
            startFilterIndex = periodIndex;
          }
        }
      }
      if (slashFilterStatus > 2) {
        if (slashFilterStatus === 4) {
          foundPeriod = false;
          for (periodIndex = endFilterIndex + 1;periodIndex < chars.length; periodIndex++) {
            if (foundPeriod) {
              if (slash[periodIndex] !== "*") {
                break;
              }
              endFilterIndex = periodIndex;
            } else if (slash[periodIndex] === "*") {
              endFilterIndex = periodIndex;
              foundPeriod = true;
            }
          }
        }
        foundPeriod = false;
        for (periodIndex = endFilterIndex + 1;periodIndex < chars.length; periodIndex++) {
          if (foundPeriod) {
            if (this.isSymbol(chars[periodIndex])) {
              break;
            }
            endFilterIndex = periodIndex;
          } else if (!this.isSymbol(chars[periodIndex])) {
            foundPeriod = true;
            endFilterIndex = periodIndex;
          }
        }
      }
      this.maskChars(startFilterIndex, endFilterIndex + 1, chars);
    }
  }
  static processTlds(chars, tld, currentIndex) {
    let tldIndex = 0;
    while (currentIndex < chars.length && tldIndex < tld.length) {
      const currentChar = chars[currentIndex];
      const nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : "\x00";
      let currentLength;
      if ((currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex]), currentChar)) > 0) {
        currentIndex += currentLength;
        tldIndex++;
      } else {
        if (tldIndex === 0) {
          break;
        }
        let previousLength;
        if ((previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex - 1]), currentChar)) > 0) {
          currentIndex += previousLength;
        } else {
          if (!this.isSymbol(currentChar)) {
            break;
          }
          currentIndex++;
        }
      }
    }
    return { currentIndex, tldIndex };
  }
  static isSymbol(char) {
    return !this.isAlpha(char) && !this.isNumerical(char);
  }
  static isNotLowercaseAlpha(char) {
    return this.isLowercaseAlpha(char) ? char === "v" || char === "x" || char === "j" || char === "q" || char === "z" : true;
  }
  static isAlpha(char) {
    return this.isLowercaseAlpha(char) || this.isUppercaseAlpha(char);
  }
  static isNumerical(char) {
    return char >= "0" && char <= "9";
  }
  static isLowercaseAlpha(char) {
    return char >= "a" && char <= "z";
  }
  static isUppercaseAlpha(char) {
    return char >= "A" && char <= "Z";
  }
  static isNumericalChars(chars) {
    for (let index = 0;index < chars.length; index++) {
      if (!this.isNumerical(chars[index]) && chars[index] !== "\x00") {
        return false;
      }
    }
    return true;
  }
  static maskChars(offset, length, chars) {
    for (let index = offset;index < length; index++) {
      chars[index] = "*";
    }
  }
  static maskedCountBackwards(chars, offset) {
    let count = 0;
    for (let index = offset - 1;index >= 0 && this.isSymbol(chars[index]); index--) {
      if (chars[index] === "*") {
        count++;
      }
    }
    return count;
  }
  static maskedCountForwards(chars, offset) {
    let count = 0;
    for (let index = offset + 1;index < chars.length && this.isSymbol(chars[index]); index++) {
      if (chars[index] === "*") {
        count++;
      }
    }
    return count;
  }
  static maskedCharsStatus(chars, filtered, offset, length, prefix) {
    const count = prefix ? this.maskedCountBackwards(filtered, offset) : this.maskedCountForwards(filtered, offset);
    if (count >= length) {
      return 4;
    } else if (this.isSymbol(prefix ? chars[offset - 1] : chars[offset + 1])) {
      return 1;
    }
    return 0;
  }
  static prefixSymbolStatus(offset, chars, length, symbolChars, symbols) {
    if (offset === 0) {
      return 2;
    }
    for (let index = offset - 1;index >= 0 && this.isSymbol(chars[index]); index--) {
      if (symbols.includes(chars[index])) {
        return 3;
      }
    }
    return this.maskedCharsStatus(chars, symbolChars, offset, length, true);
  }
  static suffixSymbolStatus(offset, chars, length, symbolChars, symbols) {
    if (offset + 1 === chars.length) {
      return 2;
    }
    for (let index = offset + 1;index < chars.length && this.isSymbol(chars[index]); index++) {
      if (symbols.includes(chars[index])) {
        return 3;
      }
    }
    return this.maskedCharsStatus(chars, symbolChars, offset, length, false);
  }
  static format(chars) {
    let pos = 0;
    for (let index = 0;index < chars.length; index++) {
      if (this.isCharacterAllowed(chars[index])) {
        chars[pos] = chars[index];
      } else {
        chars[pos] = " ";
      }
      if (pos === 0 || chars[pos] !== " " || chars[pos - 1] !== " ") {
        pos++;
      }
    }
    for (let index = pos;index < chars.length; index++) {
      chars[index] = " ";
    }
  }
  static isCharacterAllowed(char) {
    return char >= " " && char <= "" || char === " " || char === `
` || char === "\t" || char === "£" || char === "€";
  }
  static replaceUppercases(chars, comparison) {
    for (let index = 0;index < comparison.length; index++) {
      if (chars[index] !== "*" && this.isUppercaseAlpha(comparison[index])) {
        chars[index] = comparison[index];
      }
    }
  }
  static formatUppercases(chars) {
    let flagged = true;
    for (let index = 0;index < chars.length; index++) {
      const char = chars[index];
      if (!this.isAlpha(char)) {
        flagged = true;
      } else if (flagged) {
        if (this.isLowercaseAlpha(char)) {
          flagged = false;
        }
      } else if (this.isUppercaseAlpha(char)) {
        chars[index] = String.fromCharCode(char.charCodeAt(0) + 97 - 65);
      }
    }
  }
}

// src/wordenc/WordPack.ts
class WordPack {
  static TABLE = [
    " ",
    "e",
    "t",
    "a",
    "o",
    "i",
    "h",
    "n",
    "s",
    "r",
    "d",
    "l",
    "u",
    "m",
    "w",
    "c",
    "y",
    "f",
    "g",
    "p",
    "b",
    "v",
    "k",
    "x",
    "j",
    "q",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    " ",
    "!",
    "?",
    ".",
    ",",
    ":",
    ";",
    "(",
    ")",
    "-",
    "&",
    "*",
    "\\",
    "'",
    "@",
    "#",
    "+",
    "=",
    "£",
    "$",
    "%",
    '"',
    "[",
    "]"
  ];
  static charBuffer = [];
  static unpack(word, length) {
    let pos = 0;
    let carry = -1;
    let nibble;
    for (let index = 0;index < length && pos < 100; index++) {
      const value = word.g1();
      nibble = value >> 4 & 15;
      if (carry !== -1) {
        this.charBuffer[pos++] = this.TABLE[(carry << 4) + nibble - 195];
        carry = -1;
      } else if (nibble < 13) {
        this.charBuffer[pos++] = this.TABLE[nibble];
      } else {
        carry = nibble;
      }
      nibble = value & 15;
      if (carry !== -1) {
        this.charBuffer[pos++] = this.TABLE[(carry << 4) + nibble - 195];
        carry = -1;
      } else if (nibble < 13) {
        this.charBuffer[pos++] = this.TABLE[nibble];
      } else {
        carry = nibble;
      }
    }
    let uppercase = true;
    for (let index = 0;index < pos; index++) {
      const char = this.charBuffer[index];
      if (uppercase && char >= "a" && char <= "z") {
        this.charBuffer[index] = char.toUpperCase();
        uppercase = false;
      }
      if (char === "." || char === "!") {
        uppercase = true;
      }
    }
    return this.charBuffer.slice(0, pos).join("");
  }
  static pack(word, str) {
    if (str.length > 80) {
      str = str.substring(0, 80);
    }
    str = str.toLowerCase();
    let carry = -1;
    for (let index = 0;index < str.length; index++) {
      const char = str.charAt(index);
      let currentChar = 0;
      for (let lookupIndex = 0;lookupIndex < this.TABLE.length; lookupIndex++) {
        if (char === this.TABLE[lookupIndex]) {
          currentChar = lookupIndex;
          break;
        }
      }
      if (currentChar > 12) {
        currentChar += 195;
      }
      if (carry === -1) {
        if (currentChar < 13) {
          carry = currentChar;
        } else {
          word.p1(currentChar);
        }
      } else if (currentChar < 13) {
        word.p1((carry << 4) + currentChar);
        carry = -1;
      } else {
        word.p1((carry << 4) + (currentChar >> 4));
        carry = currentChar & 15;
      }
    }
    if (carry !== -1) {
      word.p1(carry << 4);
    }
  }
}

// src/sound/Envelope.ts
class Envelope {
  start = 0;
  end = 0;
  form = 0;
  envLength = 0;
  shapeDelta = null;
  shapePeak = null;
  envThreshold = 0;
  envPosition = 0;
  delta = 0;
  envAmplitude = 0;
  ticks = 0;
  read(dat) {
    this.form = dat.g1();
    this.start = dat.g4();
    this.end = dat.g4();
    this.envLength = dat.g1();
    this.shapeDelta = new Int32Array(this.envLength);
    this.shapePeak = new Int32Array(this.envLength);
    for (let i = 0;i < this.envLength; i++) {
      this.shapeDelta[i] = dat.g2();
      this.shapePeak[i] = dat.g2();
    }
  }
  reset() {
    this.envThreshold = 0;
    this.envPosition = 0;
    this.delta = 0;
    this.envAmplitude = 0;
    this.ticks = 0;
  }
  evaluateAt(delta) {
    if (this.ticks >= this.envThreshold && this.shapePeak && this.shapeDelta) {
      this.envAmplitude = this.shapePeak[this.envPosition++] << 15;
      if (this.envPosition >= this.envLength) {
        this.envPosition = this.envLength - 1;
      }
      this.envThreshold = this.shapeDelta[this.envPosition] / 65536 * delta | 0;
      if (this.envThreshold > this.ticks) {
        this.delta = ((this.shapePeak[this.envPosition] << 15) - this.envAmplitude) / (this.envThreshold - this.ticks) | 0;
      }
    }
    this.envAmplitude += this.delta;
    this.ticks++;
    return this.envAmplitude - this.delta >> 15;
  }
}

// src/sound/Tone.ts
class Tone {
  static toneSrc = null;
  static noise = null;
  static sin = null;
  static tmpPhases = new Int32Array(5);
  static tmpDelays = new Int32Array(5);
  static tmpVolumes = new Int32Array(5);
  static tmpSemitones = new Int32Array(5);
  static tmpStarts = new Int32Array(5);
  frequencyBase = null;
  amplitudeBase = null;
  frequencyModRate = null;
  frequencyModRange = null;
  amplitudeModRate = null;
  amplitudeModRange = null;
  envRelease = null;
  envAttack = null;
  harmonicVolume = new Int32Array(5);
  harmonicSemitone = new Int32Array(5);
  harmonicDelay = new Int32Array(5);
  toneStart = 0;
  toneLength = 500;
  reverbVolume = 100;
  reverbDelay = 0;
  static init() {
    this.noise = new Int32Array(32768);
    for (let i = 0;i < 32768; i++) {
      if (Math.random() > 0.5) {
        this.noise[i] = 1;
      } else {
        this.noise[i] = -1;
      }
    }
    this.sin = new Int32Array(32768);
    for (let i = 0;i < 32768; i++) {
      this.sin[i] = Math.sin(i / 5215.1903) * 16384 | 0;
    }
    this.toneSrc = new Int32Array(220500);
  }
  generate(sampleCount, length) {
    for (let sample = 0;sample < sampleCount; sample++) {
      Tone.toneSrc[sample] = 0;
    }
    if (length < 10) {
      return Tone.toneSrc;
    }
    const samplesPerStep = sampleCount / length | 0;
    this.frequencyBase?.reset();
    this.amplitudeBase?.reset();
    let frequencyStart = 0;
    let frequencyDuration = 0;
    let frequencyPhase = 0;
    if (this.frequencyModRate && this.frequencyModRange) {
      this.frequencyModRate.reset();
      this.frequencyModRange.reset();
      frequencyStart = (this.frequencyModRate.end - this.frequencyModRate.start) * 32.768 / samplesPerStep | 0;
      frequencyDuration = this.frequencyModRate.start * 32.768 / samplesPerStep | 0;
    }
    let amplitudeStart = 0;
    let amplitudeDuration = 0;
    let amplitudePhase = 0;
    if (this.amplitudeModRate && this.amplitudeModRange) {
      this.amplitudeModRate.reset();
      this.amplitudeModRange.reset();
      amplitudeStart = (this.amplitudeModRate.end - this.amplitudeModRate.start) * 32.768 / samplesPerStep | 0;
      amplitudeDuration = this.amplitudeModRate.start * 32.768 / samplesPerStep | 0;
    }
    for (let harmonic = 0;harmonic < 5; harmonic++) {
      if (this.frequencyBase && this.harmonicVolume[harmonic] !== 0) {
        Tone.tmpPhases[harmonic] = 0;
        Tone.tmpDelays[harmonic] = this.harmonicDelay[harmonic] * samplesPerStep;
        Tone.tmpVolumes[harmonic] = (this.harmonicVolume[harmonic] << 14) / 100 | 0;
        Tone.tmpSemitones[harmonic] = (this.frequencyBase.end - this.frequencyBase.start) * 32.768 * Math.pow(1.0057929410678534, this.harmonicSemitone[harmonic]) / samplesPerStep | 0;
        Tone.tmpStarts[harmonic] = this.frequencyBase.start * 32.768 / samplesPerStep | 0;
      }
    }
    if (this.frequencyBase && this.amplitudeBase) {
      for (let sample = 0;sample < sampleCount; sample++) {
        let frequency = this.frequencyBase.evaluateAt(sampleCount);
        let amplitude = this.amplitudeBase.evaluateAt(sampleCount);
        if (this.frequencyModRate && this.frequencyModRange) {
          const rate = this.frequencyModRate.evaluateAt(sampleCount);
          const range = this.frequencyModRange.evaluateAt(sampleCount);
          frequency += this.generate2(range, frequencyPhase, this.frequencyModRate.form) >> 1;
          frequencyPhase += (rate * frequencyStart >> 16) + frequencyDuration;
        }
        if (this.amplitudeModRate && this.amplitudeModRange) {
          const rate = this.amplitudeModRate.evaluateAt(sampleCount);
          const range = this.amplitudeModRange.evaluateAt(sampleCount);
          amplitude = amplitude * ((this.generate2(range, amplitudePhase, this.amplitudeModRate.form) >> 1) + 32768) >> 15;
          amplitudePhase += (rate * amplitudeStart >> 16) + amplitudeDuration;
        }
        for (let harmonic = 0;harmonic < 5; harmonic++) {
          if (this.harmonicVolume[harmonic] !== 0) {
            const position = sample + Tone.tmpDelays[harmonic];
            if (position < sampleCount) {
              Tone.toneSrc[position] += this.generate2(amplitude * Tone.tmpVolumes[harmonic] >> 15, Tone.tmpPhases[harmonic], this.frequencyBase.form);
              Tone.tmpPhases[harmonic] += (frequency * Tone.tmpSemitones[harmonic] >> 16) + Tone.tmpStarts[harmonic];
            }
          }
        }
      }
    }
    if (this.envRelease && this.envAttack) {
      this.envRelease.reset();
      this.envAttack.reset();
      let counter = 0;
      let muted = true;
      for (let sample = 0;sample < sampleCount; sample++) {
        const releaseValue = this.envRelease.evaluateAt(sampleCount);
        const attackValue = this.envAttack.evaluateAt(sampleCount);
        let threshold;
        if (muted) {
          threshold = this.envRelease.start + ((this.envRelease.end - this.envRelease.start) * releaseValue >> 8);
        } else {
          threshold = this.envRelease.start + ((this.envRelease.end - this.envRelease.start) * attackValue >> 8);
        }
        counter += 256;
        if (counter >= threshold) {
          counter = 0;
          muted = !muted;
        }
        if (muted) {
          Tone.toneSrc[sample] = 0;
        }
      }
    }
    if (this.reverbDelay > 0 && this.reverbVolume > 0) {
      const start = this.reverbDelay * samplesPerStep;
      for (let sample = start;sample < sampleCount; sample++) {
        Tone.toneSrc[sample] += Tone.toneSrc[sample - start] * this.reverbVolume / 100 | 0;
        Tone.toneSrc[sample] |= 0;
      }
    }
    for (let sample = 0;sample < sampleCount; sample++) {
      if (Tone.toneSrc[sample] < -32768) {
        Tone.toneSrc[sample] = -32768;
      }
      if (Tone.toneSrc[sample] > 32767) {
        Tone.toneSrc[sample] = 32767;
      }
    }
    return Tone.toneSrc;
  }
  generate2(amplitude, phase, form) {
    if (form === 1) {
      return (phase & 32767) < 16384 ? amplitude : -amplitude;
    } else if (form === 2) {
      return Tone.sin[phase & 32767] * amplitude >> 14;
    } else if (form === 3) {
      return ((phase & 32767) * amplitude >> 14) - amplitude;
    } else if (form === 4) {
      return Tone.noise[(phase / 2607 | 0) & 32767] * amplitude;
    } else {
      return 0;
    }
  }
  read(dat) {
    this.frequencyBase = new Envelope;
    this.frequencyBase.read(dat);
    this.amplitudeBase = new Envelope;
    this.amplitudeBase.read(dat);
    if (dat.g1() !== 0) {
      dat.pos--;
      this.frequencyModRate = new Envelope;
      this.frequencyModRate.read(dat);
      this.frequencyModRange = new Envelope;
      this.frequencyModRange.read(dat);
    }
    if (dat.g1() !== 0) {
      dat.pos--;
      this.amplitudeModRate = new Envelope;
      this.amplitudeModRate.read(dat);
      this.amplitudeModRange = new Envelope;
      this.amplitudeModRange.read(dat);
    }
    if (dat.g1() !== 0) {
      dat.pos--;
      this.envRelease = new Envelope;
      this.envRelease.read(dat);
      this.envAttack = new Envelope;
      this.envAttack.read(dat);
    }
    for (let harmonic = 0;harmonic < 10; harmonic++) {
      const volume = dat.gsmarts();
      if (volume === 0) {
        break;
      }
      this.harmonicVolume[harmonic] = volume;
      this.harmonicSemitone[harmonic] = dat.gsmart();
      this.harmonicDelay[harmonic] = dat.gsmarts();
    }
    this.reverbDelay = dat.gsmarts();
    this.reverbVolume = dat.gsmarts();
    this.toneLength = dat.g2();
    this.toneStart = dat.g2();
  }
}

// src/sound/Wave.ts
class Wave {
  static delays = new Int32Array(1000);
  static waveBytes = null;
  static waveBuffer = null;
  static tracks = new TypedArray1d(1000, null);
  tones = new TypedArray1d(10, null);
  waveLoopBegin = 0;
  waveLoopEnd = 0;
  static unpack(sounds) {
    const dat = new Packet(sounds.read("sounds.dat"));
    this.waveBytes = new Uint8Array(441000);
    this.waveBuffer = new Packet(this.waveBytes);
    Tone.init();
    while (true) {
      const id = dat.g2();
      if (id === 65535) {
        break;
      }
      const wave = new Wave;
      wave.read(dat);
      this.tracks[id] = wave;
      this.delays[id] = wave.trim();
    }
  }
  static generate(id, loopCount) {
    if (!this.tracks[id]) {
      return null;
    }
    const track = this.tracks[id];
    return track?.getWave(loopCount) ?? null;
  }
  read(dat) {
    for (let tone = 0;tone < 10; tone++) {
      if (dat.g1() !== 0) {
        dat.pos--;
        this.tones[tone] = new Tone;
        this.tones[tone]?.read(dat);
      }
    }
    this.waveLoopBegin = dat.g2();
    this.waveLoopEnd = dat.g2();
  }
  trim() {
    let start = 9999999;
    for (let tone = 0;tone < 10; tone++) {
      if (this.tones[tone] && (this.tones[tone].toneStart / 20 | 0) < start) {
        start = this.tones[tone].toneStart / 20 | 0;
      }
    }
    if (this.waveLoopBegin < this.waveLoopEnd && (this.waveLoopBegin / 20 | 0) < start) {
      start = this.waveLoopBegin / 20 | 0;
    }
    if (start === 9999999 || start === 0) {
      return 0;
    }
    for (let tone = 0;tone < 10; tone++) {
      if (this.tones[tone]) {
        this.tones[tone].toneStart -= start * 20;
      }
    }
    if (this.waveLoopBegin < this.waveLoopEnd) {
      this.waveLoopBegin -= start * 20;
      this.waveLoopEnd -= start * 20;
    }
    return start;
  }
  getWave(loopCount) {
    const length = this.generate(loopCount);
    Wave.waveBuffer.pos = 0;
    Wave.waveBuffer?.p4(1380533830);
    Wave.waveBuffer?.ip4(length + 36);
    Wave.waveBuffer?.p4(1463899717);
    Wave.waveBuffer?.p4(1718449184);
    Wave.waveBuffer?.ip4(16);
    Wave.waveBuffer?.ip2(1);
    Wave.waveBuffer?.ip2(1);
    Wave.waveBuffer?.ip4(22050);
    Wave.waveBuffer?.ip4(22050);
    Wave.waveBuffer?.ip2(1);
    Wave.waveBuffer?.ip2(8);
    Wave.waveBuffer?.p4(1684108385);
    Wave.waveBuffer?.ip4(length);
    Wave.waveBuffer.pos += length;
    return Wave.waveBuffer;
  }
  generate(loopCount) {
    let duration = 0;
    for (let tone = 0;tone < 10; tone++) {
      if (this.tones[tone] && this.tones[tone].toneLength + this.tones[tone].toneStart > duration) {
        duration = this.tones[tone].toneLength + this.tones[tone].toneStart;
      }
    }
    if (duration === 0) {
      return 0;
    }
    let sampleCount = duration * 22050 / 1000 | 0;
    let loopStart = this.waveLoopBegin * 22050 / 1000 | 0;
    let loopStop = this.waveLoopEnd * 22050 / 1000 | 0;
    if (loopStart < 0 || loopStop < 0 || loopStop > sampleCount || loopStart >= loopStop) {
      loopCount = 0;
    }
    let totalSampleCount = sampleCount + (loopStop - loopStart) * (loopCount - 1);
    for (let sample = 44;sample < totalSampleCount + 44; sample++) {
      if (Wave.waveBytes) {
        Wave.waveBytes[sample] = -128;
      }
    }
    for (let tone = 0;tone < 10; tone++) {
      if (this.tones[tone]) {
        const toneSampleCount = this.tones[tone].toneLength * 22050 / 1000 | 0;
        const start = this.tones[tone].toneStart * 22050 / 1000 | 0;
        const samples = this.tones[tone].generate(toneSampleCount, this.tones[tone].toneLength);
        for (let sample = 0;sample < toneSampleCount; sample++) {
          if (Wave.waveBytes) {
            Wave.waveBytes[sample + start + 44] += samples[sample] >> 8 << 24 >> 24;
          }
        }
      }
    }
    if (loopCount > 1) {
      loopStart += 44;
      loopStop += 44;
      sampleCount += 44;
      totalSampleCount += 44;
      const endOffset = totalSampleCount - sampleCount;
      for (let sample = sampleCount - 1;sample >= loopStop; sample--) {
        if (Wave.waveBytes) {
          Wave.waveBytes[sample + endOffset] = Wave.waveBytes[sample];
        }
      }
      for (let loop = 1;loop < loopCount; loop++) {
        const offset = (loopStop - loopStart) * loop;
        for (let sample = loopStart;sample < loopStop; sample++) {
          if (Wave.waveBytes) {
            Wave.waveBytes[sample + offset] = Wave.waveBytes[sample];
          }
        }
      }
      totalSampleCount -= 44;
    }
    return totalSampleCount;
  }
}

// src/client/Client.ts
class Client extends GameShell {
  static nodeId = 10;
  static members = true;
  static lowMemory = false;
  static cyclelogic1 = 0;
  static cyclelogic2 = 0;
  static cyclelogic3 = 0;
  static cyclelogic4 = 0;
  static cyclelogic5 = 0;
  static cyclelogic6 = 0;
  static oplogic1 = 0;
  static oplogic2 = 0;
  static oplogic3 = 0;
  static oplogic4 = 0;
  static oplogic5 = 0;
  static oplogic6 = 0;
  static oplogic7 = 0;
  static oplogic8 = 0;
  static oplogic9 = 0;
  alreadyStarted = false;
  errorStarted = false;
  errorLoading = false;
  errorHost = false;
  errorMessage = null;
  db = null;
  loopCycle = 0;
  archiveChecksums = [];
  netStream = null;
  in = Packet.alloc(1);
  out = Packet.alloc(1);
  loginout = Packet.alloc(1);
  serverSeed = 0n;
  idleNetCycles = 0;
  idleTimeout = 0;
  systemUpdateTimer = 0;
  randomIn = null;
  inPacketType = 0;
  inPacketSize = 0;
  lastPacketType0 = 0;
  lastPacketType1 = 0;
  lastPacketType2 = 0;
  titleArchive = null;
  redrawTitleBackground = true;
  titleScreenState = 0;
  titleLoginField = 0;
  imageTitle2 = null;
  imageTitle3 = null;
  imageTitle4 = null;
  imageTitle0 = null;
  imageTitle1 = null;
  imageTitle5 = null;
  imageTitle6 = null;
  imageTitle7 = null;
  imageTitle8 = null;
  imageTitlebox = null;
  imageTitlebutton = null;
  loginMessage0 = "";
  loginMessage1 = "";
  usernameInput = "";
  passwordInput = "";
  fontPlain11 = null;
  fontPlain12 = null;
  fontBold12 = null;
  fontQuill8 = null;
  imageRunes = [];
  flameActive = false;
  imageFlamesLeft = null;
  imageFlamesRight = null;
  flameBuffer1 = null;
  flameBuffer0 = null;
  flameBuffer3 = null;
  flameBuffer2 = null;
  flameGradient = null;
  flameGradient0 = null;
  flameGradient1 = null;
  flameGradient2 = null;
  flameLineOffset = new Int32Array(256);
  flameCycle0 = 0;
  flameGradientCycle0 = 0;
  flameGradientCycle1 = 0;
  flamesInterval = null;
  areaSidebar = null;
  areaMapback = null;
  areaViewport = null;
  areaChatback = null;
  areaBackbase1 = null;
  areaBackbase2 = null;
  areaBackhmid1 = null;
  areaBackleft1 = null;
  areaBackleft2 = null;
  areaBackright1 = null;
  areaBackright2 = null;
  areaBacktop1 = null;
  areaBacktop2 = null;
  areaBackvmid1 = null;
  areaBackvmid2 = null;
  areaBackvmid3 = null;
  areaBackhmid2 = null;
  areaChatbackOffsets = null;
  areaSidebarOffsets = null;
  areaViewportOffsets = null;
  compassMaskLineOffsets = new Int32Array(33);
  compassMaskLineLengths = new Int32Array(33);
  minimapMaskLineOffsets = new Int32Array(151);
  minimapMaskLineLengths = new Int32Array(151);
  imageInvback = null;
  imageChatback = null;
  imageMapback = null;
  imageBackbase1 = null;
  imageBackbase2 = null;
  imageBackhmid1 = null;
  imageSideicons = new TypedArray1d(13, null);
  imageMinimap = null;
  imageCompass = null;
  imageMapscene = new TypedArray1d(50, null);
  imageMapfunction = new TypedArray1d(50, null);
  imageHitmarks = new TypedArray1d(20, null);
  imageHeadicons = new TypedArray1d(20, null);
  imageMapflag = null;
  imageCrosses = new TypedArray1d(8, null);
  imageMapdot0 = null;
  imageMapdot1 = null;
  imageMapdot2 = null;
  imageMapdot3 = null;
  imageScrollbar0 = null;
  imageScrollbar1 = null;
  imageRedstone1 = null;
  imageRedstone2 = null;
  imageRedstone3 = null;
  imageRedstone1h = null;
  imageRedstone2h = null;
  imageRedstone1v = null;
  imageRedstone2v = null;
  imageRedstone3v = null;
  imageRedstone1hv = null;
  imageRedstone2hv = null;
  genderButtonImage0 = null;
  genderButtonImage1 = null;
  activeMapFunctions = new TypedArray1d(1000, null);
  redrawSidebar = false;
  redrawChatback = false;
  redrawSideicons = false;
  redrawPrivacySettings = false;
  viewportInterfaceId = -1;
  dragCycles = 0;
  crossMode = 0;
  crossCycle = 0;
  crossX = 0;
  crossY = 0;
  overrideChat = 0;
  menuVisible = false;
  menuArea = 0;
  menuX = 0;
  menuY = 0;
  menuWidth = 0;
  menuHeight = 0;
  menuSize = 0;
  menuOption = [];
  sidebarInterfaceId = -1;
  chatInterfaceId = -1;
  chatInterface = new Component;
  chatScrollHeight = 78;
  chatScrollOffset = 0;
  ignoreCount = 0;
  ignoreName37 = [];
  hintType = 0;
  hintNpc = 0;
  hintOffsetX = 0;
  hintOffsetZ = 0;
  hintPlayer = 0;
  hintTileX = 0;
  hintTileZ = 0;
  hintHeight = 0;
  skillExperience = [];
  skillLevel = [];
  skillBaseLevel = [];
  levelExperience = [];
  modalMessage = null;
  flashingTab = -1;
  selectedTab = 3;
  tabInterfaceId = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  publicChatSetting = 0;
  privateChatSetting = 0;
  tradeChatSetting = 0;
  scrollGrabbed = false;
  scrollInputPadding = 0;
  showSocialInput = false;
  socialMessage = "";
  socialInput = "";
  socialAction = 0;
  chatbackInput = "";
  chatbackInputOpen = false;
  stickyChatInterfaceId = -1;
  messageText = new TypedArray1d(100, null);
  messageTextSender = new TypedArray1d(100, null);
  messageTextType = new Int32Array(100);
  messageTextIds = new Int32Array(100);
  privateMessageCount = 0;
  splitPrivateChat = 0;
  chatEffects = 0;
  chatTyped = "";
  viewportHoveredInterfaceIndex = 0;
  sidebarHoveredInterfaceIndex = 0;
  chatHoveredInterfaceIndex = 0;
  objDragInterfaceId = 0;
  objDragSlot = 0;
  objDragArea = 0;
  objGrabX = 0;
  objGrabY = 0;
  objDragCycles = 0;
  objGrabThreshold = false;
  objSelected = 0;
  objSelectedSlot = 0;
  objSelectedInterface = 0;
  objInterface = 0;
  objSelectedName = null;
  selectedArea = 0;
  selectedItem = 0;
  selectedInterface = 0;
  selectedCycle = 0;
  pressedContinueOption = false;
  varps = [];
  varCache = [];
  spellSelected = 0;
  activeSpellId = 0;
  activeSpellFlags = 0;
  spellCaption = null;
  mouseButtonsOption = 0;
  menuAction = new Int32Array(500);
  menuParamA = new Int32Array(500);
  menuParamB = new Int32Array(500);
  menuParamC = new Int32Array(500);
  hoveredSlotParentId = 0;
  hoveredSlot = 0;
  lastHoveredInterfaceId = 0;
  reportAbuseInput = "";
  reportAbuseMuteOption = false;
  reportAbuseInterfaceID = -1;
  lastAddress = 0;
  daysSinceLastLogin = 0;
  daysSinceRecoveriesChanged = 0;
  unreadMessages = 0;
  activeMapFunctionCount = 0;
  activeMapFunctionX = new Int32Array(1000);
  activeMapFunctionZ = new Int32Array(1000);
  scene = null;
  sceneState = 0;
  sceneDelta = 0;
  sceneCycle = 0;
  flagSceneTileX = 0;
  flagSceneTileZ = 0;
  cutscene = false;
  cameraOffsetCycle = 0;
  cameraAnticheatOffsetX = 0;
  cameraAnticheatOffsetZ = 0;
  cameraAnticheatAngle = 0;
  cameraOffsetXModifier = 2;
  cameraOffsetZModifier = 2;
  cameraOffsetYawModifier = 1;
  cameraModifierCycle = new Int32Array(5);
  cameraModifierEnabled = new TypedArray1d(5, false);
  cameraModifierJitter = new Int32Array(5);
  cameraModifierWobbleScale = new Int32Array(5);
  cameraModifierWobbleSpeed = new Int32Array(5);
  cameraX = 0;
  cameraY = 0;
  cameraZ = 0;
  cameraPitch = 0;
  cameraYaw = 0;
  cameraPitchClamp = 0;
  minimapOffsetCycle = 0;
  minimapAnticheatAngle = 0;
  minimapZoom = 0;
  minimapZoomModifier = 1;
  minimapAngleModifier = 2;
  minimapLevel = -1;
  baseX = 0;
  baseZ = 0;
  sceneCenterZoneX = 0;
  sceneCenterZoneZ = 0;
  sceneBaseTileX = 0;
  sceneBaseTileZ = 0;
  sceneMapLandData = null;
  sceneMapLandReady = null;
  sceneMapLocData = null;
  sceneMapLocReady = null;
  sceneMapIndex = null;
  sceneAwaitingSync = false;
  scenePrevBaseTileX = 0;
  scenePrevBaseTileZ = 0;
  textureBuffer = new Int8Array(16384);
  levelCollisionMap = new TypedArray1d(4 /* LEVELS */, null);
  currentLevel = 0;
  cameraMovedWrite = 0;
  orbitCameraPitch = 128;
  orbitCameraYaw = 0;
  orbitCameraYawVelocity = 0;
  orbitCameraPitchVelocity = 0;
  orbitCameraX = 0;
  orbitCameraZ = 0;
  levelHeightmap = null;
  levelTileFlags = null;
  tileLastOccupiedCycle = new Int32Array2d(104 /* SIZE */, 104 /* SIZE */);
  projectX = 0;
  projectY = 0;
  cutsceneDstLocalTileX = 0;
  cutsceneDstLocalTileZ = 0;
  cutsceneDstHeight = 0;
  cutsceneRotateSpeed = 0;
  cutsceneRotateAcceleration = 0;
  cutsceneSrcLocalTileX = 0;
  cutsceneSrcLocalTileZ = 0;
  cutsceneSrcHeight = 0;
  cutsceneMoveSpeed = 0;
  cutsceneMoveAcceleration = 0;
  players = new TypedArray1d(2048 /* MAX_PLAYER_COUNT */, null);
  playerCount = 0;
  playerIds = new Int32Array(2048 /* MAX_PLAYER_COUNT */);
  entityUpdateCount = 0;
  entityRemovalCount = 0;
  entityUpdateIds = new Int32Array(2048 /* MAX_PLAYER_COUNT */);
  entityRemovalIds = new Int32Array(1000);
  playerAppearanceBuffer = new TypedArray1d(2048 /* MAX_PLAYER_COUNT */, null);
  npcs = new TypedArray1d(8192, null);
  npcCount = 0;
  npcIds = new Int32Array(8192);
  projectiles = new LinkList;
  spotanims = new LinkList;
  locList = new LinkList;
  objStacks = new TypedArray3d(4 /* LEVELS */, 104 /* SIZE */, 104 /* SIZE */, null);
  addedLocs = new LinkList;
  bfsStepX = new Int32Array(4000);
  bfsStepZ = new Int32Array(4000);
  bfsDirection = new Int32Array(104 /* SIZE */ * 104 /* SIZE */);
  bfsCost = new Int32Array(104 /* SIZE */ * 104 /* SIZE */);
  tryMoveNearest = 0;
  localPlayer = null;
  energy = 0;
  inMultizone = 0;
  localPid = -1;
  weightCarried = 0;
  heartbeatTimer = 0;
  wildernessLevel = 0;
  worldLocationState = 0;
  rights = false;
  designGenderMale = true;
  updateDesignModel = false;
  designIdentikits = new Int32Array(7);
  designColors = new Int32Array(5);
  static CHAT_COLORS = Int32Array.of(16776960 /* YELLOW */, 16711680 /* RED */, 65280 /* GREEN */, 65535 /* CYAN */, 16711935 /* MAGENTA */, 16777215 /* WHITE */);
  friendCount = 0;
  chatCount = 0;
  chatX = new Int32Array(50 /* MAX_CHATS */);
  chatY = new Int32Array(50 /* MAX_CHATS */);
  chatHeight = new Int32Array(50 /* MAX_CHATS */);
  chatWidth = new Int32Array(50 /* MAX_CHATS */);
  chatColors = new Int32Array(50 /* MAX_CHATS */);
  chatStyles = new Int32Array(50 /* MAX_CHATS */);
  chatTimers = new Int32Array(50 /* MAX_CHATS */);
  chats = new TypedArray1d(50 /* MAX_CHATS */, null);
  friendName = new TypedArray1d(100, null);
  friendName37 = new BigInt64Array(100);
  friendWorld = new Int32Array(100);
  socialName37 = null;
  waveCount = 0;
  waveEnabled = true;
  waveIds = new Int32Array(50);
  waveLoops = new Int32Array(50);
  waveDelay = new Int32Array(50);
  waveVolume = 64;
  lastWaveId = -1;
  lastWaveLoops = -1;
  lastWaveLength = 0;
  lastWaveStartTime = 0;
  nextMusicDelay = 0;
  midiActive = true;
  currentMidi = null;
  midiCrc = 0;
  midiSize = 0;
  midiVolume = 64;
  displayFps = false;
  static setHighMemory() {
    World3D.lowMemory = false;
    Pix3D.lowMemory = false;
    Client.lowMemory = false;
    World.lowMemory = false;
  }
  static setLowMemory() {
    World3D.lowMemory = true;
    Pix3D.lowMemory = true;
    Client.lowMemory = true;
    World.lowMemory = true;
  }
  constructor(nodeid, lowmem, members) {
    super();
    if (typeof nodeid === "undefined" || typeof lowmem === "undefined" || typeof members === "undefined") {
      return;
    }
    console.log(`RS2 user client - release #${225 /* CLIENT_VERSION */}`);
    Client.nodeId = nodeid;
    Client.members = members;
    if (lowmem) {
      Client.setLowMemory();
    } else {
      Client.setHighMemory();
    }
    if (false) {
    }
    this.run();
  }
  getTitleScreenState() {
    return this.titleScreenState;
  }
  isChatBackInputOpen() {
    return this.chatbackInputOpen;
  }
  isShowSocialInput() {
    return this.showSocialInput;
  }
  getChatInterfaceId() {
    return this.chatInterfaceId;
  }
  getViewportInterfaceId() {
    return this.viewportInterfaceId;
  }
  getReportAbuseInterfaceId() {
    return this.reportAbuseInterfaceID;
  }
  unloadTitle() {
    this.flameActive = false;
    if (this.flamesInterval) {
      clearInterval(this.flamesInterval);
      this.flamesInterval = null;
    }
    this.imageTitlebox = null;
    this.imageTitlebutton = null;
    this.imageRunes = [];
    this.flameGradient = null;
    this.flameGradient0 = null;
    this.flameGradient1 = null;
    this.flameGradient2 = null;
    this.flameBuffer0 = null;
    this.flameBuffer1 = null;
    this.flameBuffer3 = null;
    this.flameBuffer2 = null;
    this.imageFlamesLeft = null;
    this.imageFlamesRight = null;
  }
  async loadArchive(filename, displayName, crc, progress) {
    let retry = 5;
    let data = await this.db?.cacheload(filename);
    if (data && Packet.crc32(data) !== crc) {
      data = undefined;
    }
    if (data) {
      return new Jagfile(data);
    }
    while (!data) {
      await this.showProgress(progress, `Requesting ${displayName}`);
      try {
        data = await downloadUrl(`/${filename}${crc}`);
      } catch (e) {
        data = undefined;
        for (let i = retry;i > 0; i--) {
          await this.showProgress(progress, `Error loading - Will retry in ${i} secs.`);
          await sleep(1000);
        }
        retry *= 2;
        if (retry > 60) {
          retry = 60;
        }
      }
    }
    await this.db?.cachesave(filename, data);
    return new Jagfile(data);
  }
  async setMidi(name, crc, length, fade) {
    try {
      let data = await this.db?.cacheload(name + ".mid");
      if (data && crc !== 12345678 && Packet.crc32(data) !== crc) {
        data = undefined;
      }
      if (!data || !data.length) {
        try {
          data = await downloadUrl(`/${name}_${crc}.mid`);
          if (length !== data.length) {
            data = data.slice(0, length);
          }
        } catch (e) {
        }
      }
      if (!data) {
        return;
      }
      try {
        await this.db?.cachesave(name + ".mid", data);
        const uncompressed = BZip22.decompress(data, -1, false, true);
        playMidi(uncompressed, this.midiVolume, fade);
      } catch (e) {
      }
    } catch (e) {
    }
  }
  drawError() {
    canvas2d.fillStyle = "black";
    canvas2d.fillRect(0, 0, this.width, this.height);
    this.setFramerate(1);
    this.flameActive = false;
    let y = 35;
    if (this.errorLoading) {
      canvas2d.font = "bold 16px helvetica, sans-serif";
      canvas2d.textAlign = "left";
      canvas2d.fillStyle = "yellow";
      canvas2d.fillText("Sorry, an error has occured whilst loading RuneScape", 30, y);
      y += 50;
      canvas2d.fillStyle = "white";
      canvas2d.fillText("To fix this try the following (in order):", 30, y);
      y += 50;
      canvas2d.font = "bold 12px helvetica, sans-serif";
      canvas2d.fillText("1: Try closing ALL open web-browser windows, and reloading", 30, y);
      y += 30;
      canvas2d.fillText("2: Try clearing your web-browsers cache", 30, y);
      y += 30;
      canvas2d.fillText("3: Try using a different game-world", 30, y);
      y += 30;
      canvas2d.fillText("4: Try rebooting your computer", 30, y);
    } else if (this.errorHost) {
      canvas2d.font = "bold 20px helvetica, sans-serif";
      canvas2d.textAlign = "left";
      canvas2d.fillStyle = "white";
      canvas2d.fillText("Error - unable to load game!", 50, 50);
      canvas2d.fillText("To play RuneScape make sure you play from an approved domain", 50, 100);
    } else if (this.errorStarted) {
      canvas2d.font = "bold 13px helvetica, sans-serif";
      canvas2d.textAlign = "left";
      canvas2d.fillStyle = "yellow";
      canvas2d.fillText("Error a copy of RuneScape already appears to be loaded", 30, y);
      y += 50;
      canvas2d.fillStyle = "white";
      canvas2d.fillText("To fix this try the following (in order):", 30, y);
      y += 50;
      canvas2d.font = "bold 12px helvetica, sans-serif";
      canvas2d.fillText("1: Try closing ALL open web-browser windows, and reloading", 30, y);
      y += 30;
      canvas2d.fillText("2: Try rebooting your computer, and reloading", 30, y);
    }
    if (this.errorMessage) {
      y += 50;
      canvas2d.fillStyle = "red";
      canvas2d.fillText("Error: " + this.errorMessage, 30, y);
    }
  }
  executeInterfaceScript(com) {
    if (!com.scriptComparator) {
      return false;
    }
    for (let i = 0;i < com.scriptComparator.length; i++) {
      const value = this.executeClientscript1(com, i);
      if (!com.scriptOperand) {
        return false;
      }
      const operand = com.scriptOperand[i];
      if (com.scriptComparator[i] === 2) {
        if (value >= operand) {
          return false;
        }
      } else if (com.scriptComparator[i] === 3) {
        if (value <= operand) {
          return false;
        }
      } else if (com.scriptComparator[i] === 4) {
        if (value === operand) {
          return false;
        }
      } else if (value !== operand) {
        return false;
      }
    }
    return true;
  }
  drawScrollbar(x, y, scrollY, scrollHeight, height) {
    this.imageScrollbar0?.draw(x, y);
    this.imageScrollbar1?.draw(x, y + height - 16);
    Pix2D.fillRect2d(x, y + 16, 16, height - 32, 2301979 /* SCROLLBAR_TRACK */);
    let gripSize = (height - 32) * height / scrollHeight | 0;
    if (gripSize < 8) {
      gripSize = 8;
    }
    const gripY = (height - gripSize - 32) * scrollY / (scrollHeight - height) | 0;
    Pix2D.fillRect2d(x, y + gripY + 16, 16, gripSize, 5063219 /* SCROLLBAR_GRIP_FOREGROUND */);
    Pix2D.drawVerticalLine(x, y + gripY + 16, 7759444 /* SCROLLBAR_GRIP_HIGHLIGHT */, gripSize);
    Pix2D.drawVerticalLine(x + 1, y + gripY + 16, 7759444 /* SCROLLBAR_GRIP_HIGHLIGHT */, gripSize);
    Pix2D.drawHorizontalLine(x, y + gripY + 16, 7759444 /* SCROLLBAR_GRIP_HIGHLIGHT */, 16);
    Pix2D.drawHorizontalLine(x, y + gripY + 17, 7759444 /* SCROLLBAR_GRIP_HIGHLIGHT */, 16);
    Pix2D.drawVerticalLine(x + 15, y + gripY + 16, 3353893 /* SCROLLBAR_GRIP_LOWLIGHT */, gripSize);
    Pix2D.drawVerticalLine(x + 14, y + gripY + 17, 3353893 /* SCROLLBAR_GRIP_LOWLIGHT */, gripSize - 1);
    Pix2D.drawHorizontalLine(x, y + gripY + gripSize + 15, 3353893 /* SCROLLBAR_GRIP_LOWLIGHT */, 16);
    Pix2D.drawHorizontalLine(x + 1, y + gripY + gripSize + 14, 3353893 /* SCROLLBAR_GRIP_LOWLIGHT */, 15);
  }
  updateInterfaceAnimation(id, delta) {
    let updated = false;
    const parent = Component.instances[id];
    if (!parent.childId) {
      return false;
    }
    for (let i = 0;i < parent.childId.length && parent.childId[i] !== -1; i++) {
      const child = Component.instances[parent.childId[i]];
      if (child.comType === 1) {
        updated ||= this.updateInterfaceAnimation(child.id, delta);
      }
      if (child.comType === 6 && (child.anim !== -1 || child.activeAnim !== -1)) {
        const active = this.executeInterfaceScript(child);
        let seqId;
        if (active) {
          seqId = child.activeAnim;
        } else {
          seqId = child.anim;
        }
        if (seqId !== -1) {
          const type = SeqType.instances[seqId];
          child.seqCycle += delta;
          if (type.seqDelay) {
            while (child.seqCycle > type.seqDelay[child.seqFrame]) {
              child.seqCycle -= type.seqDelay[child.seqFrame] + 1;
              child.seqFrame++;
              if (child.seqFrame >= type.seqFrameCount) {
                child.seqFrame -= type.replayoff;
                if (child.seqFrame < 0 || child.seqFrame >= type.seqFrameCount) {
                  child.seqFrame = 0;
                }
              }
              updated = true;
            }
          }
        }
      }
    }
    return updated;
  }
  drawInterface(com, x, y, scrollY, outline = false) {
    if (com.comType !== 0 || !com.childId || com.hide && this.viewportHoveredInterfaceIndex !== com.id && this.sidebarHoveredInterfaceIndex !== com.id && this.chatHoveredInterfaceIndex !== com.id) {
      return;
    }
    const left = Pix2D.left;
    const top = Pix2D.top;
    const right = Pix2D.right;
    const bottom = Pix2D.bottom;
    Pix2D.setBounds(x, y, x + com.width, y + com.height);
    const children = com.childId.length;
    for (let i = 0;i < children; i++) {
      if (!com.childX || !com.childY) {
        continue;
      }
      let childX = com.childX[i] + x;
      let childY = com.childY[i] + y - scrollY;
      const child = Component.instances[com.childId[i]];
      childX += child.x;
      childY += child.y;
      if (outline) {
        Pix2D.drawRect(childX, childY, child.width, child.height, 16777215 /* WHITE */);
      }
      if (child.clientCode > 0) {
        this.updateInterfaceContent(child);
      }
      if (child.comType === 0 /* TYPE_LAYER */) {
        if (child.scrollPosition > child.scroll - child.height) {
          child.scrollPosition = child.scroll - child.height;
        }
        if (child.scrollPosition < 0) {
          child.scrollPosition = 0;
        }
        this.drawInterface(child, childX, childY, child.scrollPosition, outline);
        if (child.scroll > child.height) {
          this.drawScrollbar(childX + child.width, childY, child.scrollPosition, child.scroll, child.height);
        }
      } else if (child.comType === 2 /* TYPE_INV */) {
        let slot = 0;
        for (let row = 0;row < child.height; row++) {
          for (let col = 0;col < child.width; col++) {
            if (!child.invSlotOffsetX || !child.invSlotOffsetY || !child.invSlotObjId || !child.invSlotObjCount) {
              continue;
            }
            let slotX = childX + col * (child.marginX + 32);
            let slotY = childY + row * (child.marginY + 32);
            if (slot < 20) {
              slotX += child.invSlotOffsetX[slot];
              slotY += child.invSlotOffsetY[slot];
            }
            if (child.invSlotObjId[slot] > 0) {
              let dx = 0;
              let dy = 0;
              const id = child.invSlotObjId[slot] - 1;
              if (slotX >= -32 && slotX <= 512 && slotY >= -32 && slotY <= 334 || this.objDragArea !== 0 && this.objDragSlot === slot) {
                const icon = ObjType.getIcon(id, child.invSlotObjCount[slot]);
                if (this.objDragArea !== 0 && this.objDragSlot === slot && this.objDragInterfaceId === child.id) {
                  dx = this.mouseX - this.objGrabX;
                  dy = this.mouseY - this.objGrabY;
                  if (dx < 5 && dx > -5) {
                    dx = 0;
                  }
                  if (dy < 5 && dy > -5) {
                    dy = 0;
                  }
                  if (this.objDragCycles < 5) {
                    dx = 0;
                    dy = 0;
                  }
                  icon.drawAlpha(128, slotX + dx, slotY + dy);
                } else if (this.selectedArea !== 0 && this.selectedItem === slot && this.selectedInterface === child.id) {
                  icon.drawAlpha(128, slotX, slotY);
                } else {
                  icon.draw(slotX, slotY);
                }
                if (icon.cropW === 33 || child.invSlotObjCount[slot] !== 1) {
                  const count = child.invSlotObjCount[slot];
                  this.fontPlain11?.drawString(slotX + dx + 1, slotY + 10 + dy, this.formatObjCount(count), 0 /* BLACK */);
                  this.fontPlain11?.drawString(slotX + dx, slotY + 9 + dy, this.formatObjCount(count), 16776960 /* YELLOW */);
                }
              }
            } else if (child.invSlotSprite && slot < 20) {
              const image = child.invSlotSprite[slot];
              image?.draw(slotX, slotY);
            }
            slot++;
          }
        }
      } else if (child.comType === 3 /* TYPE_RECT */) {
        if (child.fill) {
          Pix2D.fillRect2d(childX, childY, child.width, child.height, child.colour);
        } else {
          Pix2D.drawRect(childX, childY, child.width, child.height, child.colour);
        }
      } else if (child.comType === 4 /* TYPE_TEXT */) {
        const font = child.font;
        let color = child.colour;
        let text = child.text;
        if ((this.chatHoveredInterfaceIndex === child.id || this.sidebarHoveredInterfaceIndex === child.id || this.viewportHoveredInterfaceIndex === child.id) && child.overColour !== 0) {
          color = child.overColour;
        }
        if (this.executeInterfaceScript(child)) {
          color = child.activeColour;
          if (child.activeText && child.activeText.length > 0) {
            text = child.activeText;
          }
        }
        if (child.buttonType === 6 /* BUTTON_CONTINUE */ && this.pressedContinueOption) {
          text = "Please wait...";
          color = child.colour;
        }
        if (!font || !text) {
          continue;
        }
        for (let lineY = childY + font.height2d;text.length > 0; lineY += font.height2d) {
          if (text.indexOf("%") !== -1) {
            do {
              const index = text.indexOf("%1");
              if (index === -1) {
                break;
              }
              text = text.substring(0, index) + this.getIntString(this.executeClientscript1(child, 0)) + text.substring(index + 2);
            } while (true);
            do {
              const index = text.indexOf("%2");
              if (index === -1) {
                break;
              }
              text = text.substring(0, index) + this.getIntString(this.executeClientscript1(child, 1)) + text.substring(index + 2);
            } while (true);
            do {
              const index = text.indexOf("%3");
              if (index === -1) {
                break;
              }
              text = text.substring(0, index) + this.getIntString(this.executeClientscript1(child, 2)) + text.substring(index + 2);
            } while (true);
            do {
              const index = text.indexOf("%4");
              if (index === -1) {
                break;
              }
              text = text.substring(0, index) + this.getIntString(this.executeClientscript1(child, 3)) + text.substring(index + 2);
            } while (true);
            do {
              const index = text.indexOf("%5");
              if (index === -1) {
                break;
              }
              text = text.substring(0, index) + this.getIntString(this.executeClientscript1(child, 4)) + text.substring(index + 2);
            } while (true);
          }
          const newline = text.indexOf("\\n");
          let split;
          if (newline !== -1) {
            split = text.substring(0, newline);
            text = text.substring(newline + 2);
          } else {
            split = text;
            text = "";
          }
          if (child.center) {
            font.drawStringTaggableCenter(childX + (child.width / 2 | 0), lineY, split, color, child.shadowed);
          } else {
            font.drawStringTaggable(childX, lineY, split, color, child.shadowed);
          }
        }
      } else if (child.comType === 5 /* TYPE_GRAPHIC */) {
        let image;
        if (this.executeInterfaceScript(child)) {
          image = child.activeGraphic;
        } else {
          image = child.graphic;
        }
        image?.draw(childX, childY);
      } else if (child.comType === 6 /* TYPE_MODEL */) {
        const tmpX = Pix3D.centerX;
        const tmpY = Pix3D.centerY;
        Pix3D.centerX = childX + (child.width / 2 | 0);
        Pix3D.centerY = childY + (child.height / 2 | 0);
        const eyeY = Pix3D.sin[child.xan] * child.zoom >> 16;
        const eyeZ = Pix3D.cos[child.xan] * child.zoom >> 16;
        const active = this.executeInterfaceScript(child);
        let seqId;
        if (active) {
          seqId = child.activeAnim;
        } else {
          seqId = child.anim;
        }
        let model = null;
        if (seqId === -1) {
          model = child.getModel(-1, -1, active);
        } else {
          const seq = SeqType.instances[seqId];
          if (seq.seqFrames && seq.seqIframes) {
            model = child.getModel(seq.seqFrames[child.seqFrame], seq.seqIframes[child.seqFrame], active);
          }
        }
        if (model) {
          model.drawSimple(0, child.yan, 0, child.xan, 0, eyeY, eyeZ);
        }
        Pix3D.centerX = tmpX;
        Pix3D.centerY = tmpY;
      } else if (child.comType === 7 /* TYPE_INV_TEXT */) {
        const font = child.font;
        if (!font || !child.invSlotObjId || !child.invSlotObjCount) {
          continue;
        }
        let slot = 0;
        for (let row = 0;row < child.height; row++) {
          for (let col = 0;col < child.width; col++) {
            if (child.invSlotObjId[slot] > 0) {
              const obj = ObjType.get(child.invSlotObjId[slot] - 1);
              let text = obj.name;
              if (obj.stackable || child.invSlotObjCount[slot] !== 1) {
                text = text + " x" + this.formatObjCountTagged(child.invSlotObjCount[slot]);
              }
              if (!text) {
                continue;
              }
              const textX = childX + col * (child.marginX + 115);
              const textY = childY + row * (child.marginY + 12);
              if (child.center) {
                font.drawStringTaggableCenter(textX + (child.width / 2 | 0), textY, text, child.colour, child.shadowed);
              } else {
                font.drawStringTaggable(textX, textY, text, child.colour, child.shadowed);
              }
            }
            slot++;
          }
        }
      }
    }
    Pix2D.setBounds(left, top, right, bottom);
  }
  updateInterfaceContent(component) {
    let clientCode = component.clientCode;
    if (clientCode >= 1 /* CC_FRIENDS_START */ && clientCode <= 100 /* CC_FRIENDS_END */) {
      clientCode--;
      if (clientCode >= this.friendCount) {
        component.text = "";
        component.buttonType = 0;
      } else {
        component.text = this.friendName[clientCode];
        component.buttonType = 1;
      }
    } else if (clientCode >= 101 /* CC_FRIENDS_UPDATE_START */ && clientCode <= 200 /* CC_FRIENDS_UPDATE_END */) {
      clientCode -= 101 /* CC_FRIENDS_UPDATE_START */;
      if (clientCode >= this.friendCount) {
        component.text = "";
        component.buttonType = 0;
      } else {
        if (this.friendWorld[clientCode] === 0) {
          component.text = "@red@Offline";
        } else if (this.friendWorld[clientCode] === Client.nodeId) {
          component.text = "@gre@World-" + (this.friendWorld[clientCode] - 9);
        } else {
          component.text = "@yel@World-" + (this.friendWorld[clientCode] - 9);
        }
        component.buttonType = 1;
      }
    } else if (clientCode === 203 /* CC_FRIENDS_SIZE */) {
      component.scroll = this.friendCount * 15 + 20;
      if (component.scroll <= component.height) {
        component.scroll = component.height + 1;
      }
    } else if (clientCode >= 401 /* CC_IGNORES_START */ && clientCode <= 500 /* CC_IGNORES_END */) {
      clientCode -= 401 /* CC_IGNORES_START */;
      if (clientCode >= this.ignoreCount) {
        component.text = "";
        component.buttonType = 0;
      } else {
        component.text = JString.formatName(JString.fromBase37(this.ignoreName37[clientCode]));
        component.buttonType = 1;
      }
    } else if (clientCode === 503 /* CC_IGNORES_SIZE */) {
      component.scroll = this.ignoreCount * 15 + 20;
      if (component.scroll <= component.height) {
        component.scroll = component.height + 1;
      }
    } else if (clientCode === 327 /* CC_DESIGN_PREVIEW */) {
      component.xan = 150;
      component.yan = (Math.sin(this.loopCycle / 40) * 256 | 0) & 2047;
      if (this.updateDesignModel) {
        this.updateDesignModel = false;
        const models = new TypedArray1d(7, null);
        let modelCount = 0;
        for (let part = 0;part < 7; part++) {
          const kit = this.designIdentikits[part];
          if (kit >= 0) {
            models[modelCount++] = IdkType.instances[kit].getModel();
          }
        }
        const model = Model.modelFromModels(models, modelCount);
        for (let part = 0;part < 5; part++) {
          if (this.designColors[part] !== 0) {
            model.recolor(PlayerEntity.DESIGN_IDK_COLORS[part][0], PlayerEntity.DESIGN_IDK_COLORS[part][this.designColors[part]]);
            if (part === 1) {
              model.recolor(PlayerEntity.TORSO_RECOLORS[0], PlayerEntity.TORSO_RECOLORS[this.designColors[part]]);
            }
          }
        }
        if (this.localPlayer) {
          const frames = SeqType.instances[this.localPlayer.seqStandId].seqFrames;
          if (frames) {
            model.createLabelReferences();
            model.applyTransform(frames[0]);
            model.calculateNormals(64, 850, -30, -50, -30, true);
            component.model = model;
          }
        }
      }
    } else if (clientCode === 324 /* CC_SWITCH_TO_MALE */) {
      if (!this.genderButtonImage0) {
        this.genderButtonImage0 = component.graphic;
        this.genderButtonImage1 = component.activeGraphic;
      }
      if (this.designGenderMale) {
        component.graphic = this.genderButtonImage1;
      } else {
        component.graphic = this.genderButtonImage0;
      }
    } else if (clientCode === 325 /* CC_SWITCH_TO_FEMALE */) {
      if (!this.genderButtonImage0) {
        this.genderButtonImage0 = component.graphic;
        this.genderButtonImage1 = component.activeGraphic;
      }
      if (this.designGenderMale) {
        component.graphic = this.genderButtonImage0;
      } else {
        component.graphic = this.genderButtonImage1;
      }
    } else if (clientCode === 600 /* CC_REPORT_INPUT */) {
      component.text = this.reportAbuseInput;
      if (this.loopCycle % 20 < 10) {
        component.text = component.text + "|";
      } else {
        component.text = component.text + " ";
      }
    } else if (clientCode === 613 /* CC_MOD_MUTE */) {
      if (!this.rights) {
        component.text = "";
      } else if (this.reportAbuseMuteOption) {
        component.colour = 16711680 /* RED */;
        component.text = "Moderator option: Mute player for 48 hours: <ON>";
      } else {
        component.colour = 16777215 /* WHITE */;
        component.text = "Moderator option: Mute player for 48 hours: <OFF>";
      }
    } else if (clientCode === 650 /* CC_LAST_LOGIN_INFO */ || clientCode === 655 /* CC_LAST_LOGIN_INFO2 */) {
      if (this.lastAddress === 0) {
        component.text = "";
      } else {
        let text;
        if (this.daysSinceLastLogin === 0) {
          text = "earlier today";
        } else if (this.daysSinceLastLogin === 1) {
          text = "yesterday";
        } else {
          text = this.daysSinceLastLogin + " days ago";
        }
        const ipStr = JString.formatIPv4(this.lastAddress);
        component.text = "You last logged in " + text + (ipStr === "127.0.0.1" ? "." : " from: " + ipStr);
      }
    } else if (clientCode === 651 /* CC_UNREAD_MESSAGES */) {
      if (this.unreadMessages === 0) {
        component.text = "0 unread messages";
        component.colour = 16776960 /* YELLOW */;
      }
      if (this.unreadMessages === 1) {
        component.text = "1 unread message";
        component.colour = 65280 /* GREEN */;
      }
      if (this.unreadMessages > 1) {
        component.text = this.unreadMessages + " unread messages";
        component.colour = 65280 /* GREEN */;
      }
    } else if (clientCode === 652 /* CC_RECOVERY1 */) {
      if (this.daysSinceRecoveriesChanged === 201) {
        component.text = "";
      } else if (this.daysSinceRecoveriesChanged === 200) {
        component.text = "You have not yet set any password recovery questions.";
      } else {
        let text;
        if (this.daysSinceRecoveriesChanged === 0) {
          text = "Earlier today";
        } else if (this.daysSinceRecoveriesChanged === 1) {
          text = "Yesterday";
        } else {
          text = this.daysSinceRecoveriesChanged + " days ago";
        }
        component.text = text + " you changed your recovery questions";
      }
    } else if (clientCode === 653 /* CC_RECOVERY2 */) {
      if (this.daysSinceRecoveriesChanged === 201) {
        component.text = "";
      } else if (this.daysSinceRecoveriesChanged === 200) {
        component.text = "We strongly recommend you do so now to secure your account.";
      } else {
        component.text = "If you do not remember making this change then cancel it immediately";
      }
    } else if (clientCode === 654 /* CC_RECOVERY3 */) {
      if (this.daysSinceRecoveriesChanged === 201) {
        component.text = "";
      } else if (this.daysSinceRecoveriesChanged === 200) {
        component.text = "Do this from the 'account management' area on our front webpage";
      } else {
        component.text = "Do this from the 'account management' area on our front webpage";
      }
    }
  }
  executeClientscript1(component, scriptId) {
    if (!component.script || scriptId >= component.script.length) {
      return -2;
    }
    try {
      const script = component.script[scriptId];
      if (!script) {
        return -1;
      }
      let register = 0;
      let pc = 0;
      while (true) {
        const opcode = script[pc++];
        if (opcode === 0) {
          return register;
        }
        if (opcode === 1) {
          register += this.skillLevel[script[pc++]];
        } else if (opcode === 2) {
          register += this.skillBaseLevel[script[pc++]];
        } else if (opcode === 3) {
          register += this.skillExperience[script[pc++]];
        } else if (opcode === 4) {
          const com = Component.instances[script[pc++]];
          const obj = script[pc++] + 1;
          if (com.invSlotObjId && com.invSlotObjCount) {
            for (let i = 0;i < com.invSlotObjId.length; i++) {
              if (com.invSlotObjId[i] === obj) {
                register += com.invSlotObjCount[i];
              }
            }
          } else {
            register += 0;
          }
        } else if (opcode === 5) {
          register += this.varps[script[pc++]];
        } else if (opcode === 6) {
          register += this.levelExperience[this.skillBaseLevel[script[pc++]] - 1];
        } else if (opcode === 7) {
          register += this.varps[script[pc++]] * 100 / 46875 | 0;
        } else if (opcode === 8) {
          register += this.localPlayer?.combatLevel || 0;
        } else if (opcode === 9) {
          for (let i = 0;i < 19; i++) {
            if (i === 18) {
              i = 20;
            }
            register += this.skillBaseLevel[i];
          }
        } else if (opcode === 10) {
          const com = Component.instances[script[pc++]];
          const obj = script[pc++] + 1;
          for (let i = 0;i < com.invSlotObjId.length; i++) {
            if (com.invSlotObjId[i] === obj) {
              register += 999999999;
              break;
            }
          }
        } else if (opcode === 11) {
          register += this.energy;
        } else if (opcode === 12) {
          register += this.weightCarried;
        } else if (opcode === 13) {
          const varp = this.varps[script[pc++]];
          const lsb = script[pc++];
          register += (varp & 1 << lsb) === 0 ? 0 : 1;
        }
      }
    } catch (e) {
      return -1;
    }
  }
  getIntString(value) {
    return value < 999999999 ? String(value) : "*";
  }
  formatObjCountTagged(amount) {
    let s = String(amount);
    for (let i = s.length - 3;i > 0; i -= 3) {
      s = s.substring(0, i) + "," + s.substring(i);
    }
    if (s.length > 8) {
      s = "@gre@" + s.substring(0, s.length - 8) + " million @whi@(" + s + ")";
    } else if (s.length > 4) {
      s = "@cya@" + s.substring(0, s.length - 4) + "K @whi@(" + s + ")";
    }
    return " " + s;
  }
  formatObjCount(amount) {
    if (amount < 1e5) {
      return String(amount);
    } else if (amount < 1e7) {
      return (amount / 1000 | 0) + "K";
    } else {
      return (amount / 1e6 | 0) + "M";
    }
  }
  async load() {
    if (this.isMobile && Client.lowMemory) {
      this.setTargetedFramerate(30);
    }
    if (this.alreadyStarted) {
      this.errorStarted = true;
      return;
    }
    this.alreadyStarted = true;
    try {
      await this.showProgress(10, "Connecting to fileserver");
      try {
        this.db = new Database(await Database.openDatabase());
      } catch (err) {
        this.db = null;
      }
      const checksums = new Packet(await downloadUrl("/crc"));
      for (let i = 0;i < 9; i++) {
        this.archiveChecksums[i] = checksums.g4();
      }
      if (!Client.lowMemory) {
        await this.setMidi("scape_main", 12345678, 40000, false);
      }
      const title = await this.loadArchive("title", "title screen", this.archiveChecksums[1], 10);
      this.titleArchive = title;
      this.fontPlain11 = PixFont.fromArchive(title, "p11");
      this.fontPlain12 = PixFont.fromArchive(title, "p12");
      this.fontBold12 = PixFont.fromArchive(title, "b12");
      this.fontQuill8 = PixFont.fromArchive(title, "q8");
      await this.loadTitleBackground();
      this.loadTitleImages();
      const config = await this.loadArchive("config", "config", this.archiveChecksums[2], 15);
      const interfaces = await this.loadArchive("interface", "interface", this.archiveChecksums[3], 20);
      const media = await this.loadArchive("media", "2d graphics", this.archiveChecksums[4], 30);
      const models = await this.loadArchive("models", "3d graphics", this.archiveChecksums[5], 40);
      const textures = await this.loadArchive("textures", "textures", this.archiveChecksums[6], 60);
      const wordenc = await this.loadArchive("wordenc", "chat system", this.archiveChecksums[7], 65);
      const sounds = await this.loadArchive("sounds", "sound effects", this.archiveChecksums[8], 70);
      this.levelTileFlags = new Uint8Array3d(4 /* LEVELS */, 104 /* SIZE */, 104 /* SIZE */);
      this.levelHeightmap = new Int32Array3d(4 /* LEVELS */, 104 /* SIZE */ + 1, 104 /* SIZE */ + 1);
      if (this.levelHeightmap) {
        this.scene = new World3D(this.levelHeightmap, 104 /* SIZE */, 4 /* LEVELS */, 104 /* SIZE */);
      }
      for (let level = 0;level < 4 /* LEVELS */; level++) {
        this.levelCollisionMap[level] = new CollisionMap;
      }
      this.imageMinimap = new Pix24(512, 512);
      await this.showProgress(75, "Unpacking media");
      this.imageInvback = Pix8.fromArchive(media, "invback", 0);
      this.imageChatback = Pix8.fromArchive(media, "chatback", 0);
      this.imageMapback = Pix8.fromArchive(media, "mapback", 0);
      this.imageBackbase1 = Pix8.fromArchive(media, "backbase1", 0);
      this.imageBackbase2 = Pix8.fromArchive(media, "backbase2", 0);
      this.imageBackhmid1 = Pix8.fromArchive(media, "backhmid1", 0);
      for (let i = 0;i < 13; i++) {
        this.imageSideicons[i] = Pix8.fromArchive(media, "sideicons", i);
      }
      this.imageCompass = Pix24.fromArchive(media, "compass", 0);
      try {
        for (let i = 0;i < 50; i++) {
          if (i === 22) {
            continue;
          }
          this.imageMapscene[i] = Pix8.fromArchive(media, "mapscene", i);
        }
      } catch (e) {
      }
      try {
        for (let i = 0;i < 50; i++) {
          this.imageMapfunction[i] = Pix24.fromArchive(media, "mapfunction", i);
        }
      } catch (e) {
      }
      try {
        for (let i = 0;i < 20; i++) {
          this.imageHitmarks[i] = Pix24.fromArchive(media, "hitmarks", i);
        }
      } catch (e) {
      }
      try {
        for (let i = 0;i < 20; i++) {
          this.imageHeadicons[i] = Pix24.fromArchive(media, "headicons", i);
        }
      } catch (e) {
      }
      this.imageMapflag = Pix24.fromArchive(media, "mapflag", 0);
      for (let i = 0;i < 8; i++) {
        this.imageCrosses[i] = Pix24.fromArchive(media, "cross", i);
      }
      this.imageMapdot0 = Pix24.fromArchive(media, "mapdots", 0);
      this.imageMapdot1 = Pix24.fromArchive(media, "mapdots", 1);
      this.imageMapdot2 = Pix24.fromArchive(media, "mapdots", 2);
      this.imageMapdot3 = Pix24.fromArchive(media, "mapdots", 3);
      this.imageScrollbar0 = Pix8.fromArchive(media, "scrollbar", 0);
      this.imageScrollbar1 = Pix8.fromArchive(media, "scrollbar", 1);
      this.imageRedstone1 = Pix8.fromArchive(media, "redstone1", 0);
      this.imageRedstone2 = Pix8.fromArchive(media, "redstone2", 0);
      this.imageRedstone3 = Pix8.fromArchive(media, "redstone3", 0);
      this.imageRedstone1h = Pix8.fromArchive(media, "redstone1", 0);
      this.imageRedstone1h?.flipHorizontally();
      this.imageRedstone2h = Pix8.fromArchive(media, "redstone2", 0);
      this.imageRedstone2h?.flipHorizontally();
      this.imageRedstone1v = Pix8.fromArchive(media, "redstone1", 0);
      this.imageRedstone1v?.flipVertically();
      this.imageRedstone2v = Pix8.fromArchive(media, "redstone2", 0);
      this.imageRedstone2v?.flipVertically();
      this.imageRedstone3v = Pix8.fromArchive(media, "redstone3", 0);
      this.imageRedstone3v?.flipVertically();
      this.imageRedstone1hv = Pix8.fromArchive(media, "redstone1", 0);
      this.imageRedstone1hv?.flipHorizontally();
      this.imageRedstone1hv?.flipVertically();
      this.imageRedstone2hv = Pix8.fromArchive(media, "redstone2", 0);
      this.imageRedstone2hv?.flipHorizontally();
      this.imageRedstone2hv?.flipVertically();
      const backleft1 = Pix24.fromArchive(media, "backleft1", 0);
      this.areaBackleft1 = new PixMap(backleft1.width2d, backleft1.height2d);
      backleft1.blitOpaque(0, 0);
      const backleft2 = Pix24.fromArchive(media, "backleft2", 0);
      this.areaBackleft2 = new PixMap(backleft2.width2d, backleft2.height2d);
      backleft2.blitOpaque(0, 0);
      const backright1 = Pix24.fromArchive(media, "backright1", 0);
      this.areaBackright1 = new PixMap(backright1.width2d, backright1.height2d);
      backright1.blitOpaque(0, 0);
      const backright2 = Pix24.fromArchive(media, "backright2", 0);
      this.areaBackright2 = new PixMap(backright2.width2d, backright2.height2d);
      backright2.blitOpaque(0, 0);
      const backtop1 = Pix24.fromArchive(media, "backtop1", 0);
      this.areaBacktop1 = new PixMap(backtop1.width2d, backtop1.height2d);
      backtop1.blitOpaque(0, 0);
      const backtop2 = Pix24.fromArchive(media, "backtop2", 0);
      this.areaBacktop2 = new PixMap(backtop2.width2d, backtop2.height2d);
      backtop2.blitOpaque(0, 0);
      const backvmid1 = Pix24.fromArchive(media, "backvmid1", 0);
      this.areaBackvmid1 = new PixMap(backvmid1.width2d, backvmid1.height2d);
      backvmid1.blitOpaque(0, 0);
      const backvmid2 = Pix24.fromArchive(media, "backvmid2", 0);
      this.areaBackvmid2 = new PixMap(backvmid2.width2d, backvmid2.height2d);
      backvmid2.blitOpaque(0, 0);
      const backvmid3 = Pix24.fromArchive(media, "backvmid3", 0);
      this.areaBackvmid3 = new PixMap(backvmid3.width2d, backvmid3.height2d);
      backvmid3.blitOpaque(0, 0);
      const backhmid2 = Pix24.fromArchive(media, "backhmid2", 0);
      this.areaBackhmid2 = new PixMap(backhmid2.width2d, backhmid2.height2d);
      backhmid2.blitOpaque(0, 0);
      const randR = (Math.random() * 21 | 0) - 10;
      const randG = (Math.random() * 21 | 0) - 10;
      const randB = (Math.random() * 21 | 0) - 10;
      const rand = (Math.random() * 41 | 0) - 20;
      for (let i = 0;i < 50; i++) {
        if (this.imageMapfunction[i]) {
          this.imageMapfunction[i]?.translate2d(randR + rand, randG + rand, randB + rand);
        }
        if (this.imageMapscene[i]) {
          this.imageMapscene[i]?.translate2d(randR + rand, randG + rand, randB + rand);
        }
      }
      await this.showProgress(80, "Unpacking textures");
      Pix3D.unpackTextures(textures);
      Pix3D.setBrightness(0.8);
      Pix3D.initPool(20);
      await this.showProgress(83, "Unpacking models");
      Model.unpack(models);
      AnimBase.unpack(models);
      AnimFrame.unpack(models);
      await this.showProgress(86, "Unpacking config");
      SeqType.unpack(config);
      LocType.unpack(config);
      FloType.unpack(config);
      ObjType.unpack(config, Client.members);
      NpcType.unpack(config);
      IdkType.unpack(config);
      SpotAnimType.unpack(config);
      VarpType.unpack(config);
      if (!Client.lowMemory) {
        await this.showProgress(90, "Unpacking sounds");
        Wave.unpack(sounds);
      }
      await this.showProgress(92, "Unpacking interfaces");
      Component.unpack(interfaces, media, [this.fontPlain11, this.fontPlain12, this.fontBold12, this.fontQuill8]);
      await this.showProgress(97, "Preparing game engine");
      for (let y = 0;y < 33; y++) {
        let left = 999;
        let right = 0;
        for (let x = 0;x < 35; x++) {
          if (this.imageMapback.pixels[x + y * this.imageMapback.width2d] === 0) {
            if (left === 999) {
              left = x;
            }
          } else if (left !== 999) {
            right = x;
            break;
          }
        }
        this.compassMaskLineOffsets[y] = left;
        this.compassMaskLineLengths[y] = right - left;
      }
      for (let y = 9;y < 160; y++) {
        let left = 999;
        let right = 0;
        for (let x = 10;x < 168; x++) {
          if (this.imageMapback.pixels[x + y * this.imageMapback.width2d] === 0 && (x > 34 || y > 34)) {
            if (left === 999) {
              left = x;
            }
          } else if (left !== 999) {
            right = x;
            break;
          }
        }
        this.minimapMaskLineOffsets[y - 9] = left - 21;
        this.minimapMaskLineLengths[y - 9] = right - left;
      }
      Pix3D.init3D(479, 96);
      this.areaChatbackOffsets = Pix3D.lineOffset;
      Pix3D.init3D(190, 261);
      this.areaSidebarOffsets = Pix3D.lineOffset;
      Pix3D.init3D(512, 334);
      this.areaViewportOffsets = Pix3D.lineOffset;
      const distance = new Int32Array(9);
      for (let x = 0;x < 9; x++) {
        const angle = x * 32 + 128 + 15;
        const offset = angle * 3 + 600;
        const sin = Pix3D.sin[angle];
        distance[x] = offset * sin >> 16;
      }
      World3D.init(512, 334, 500, 800, distance);
      WordFilter.unpack(wordenc);
      this.initializeLevelExperience();
    } catch (err) {
      this.errorLoading = true;
      console.error(err);
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }
  }
  async update() {
    if (this.errorStarted || this.errorLoading || this.errorHost) {
      return;
    }
    this.loopCycle++;
    if (this.ingame) {
      await this.updateGame();
    } else {
      await this.updateTitleScreen();
    }
  }
  async draw() {
    if (this.errorStarted || this.errorLoading || this.errorHost) {
      this.drawError();
      return;
    }
    if (this.ingame) {
      this.drawGame();
    } else {
      await this.drawTitleScreen();
    }
    this.dragCycles = 0;
  }
  async refresh() {
    this.redrawTitleBackground = true;
  }
  async showProgress(progress, str) {
    console.log(`${progress}%: ${str}`);
    await this.loadTitle();
    if (!this.titleArchive) {
      await super.showProgress(progress, str);
      return;
    }
    this.imageTitle4?.bind();
    const x = 360;
    const y = 200;
    const offsetY = 20;
    this.fontBold12?.drawStringCenter(x / 2 | 0, (y / 2 | 0) - offsetY - 26, "RuneScape is loading - please wait...", 16777215 /* WHITE */);
    const midY = (y / 2 | 0) - 18 - offsetY;
    Pix2D.drawRect((x / 2 | 0) - 152, midY, 304, 34, 9179409 /* PROGRESS_RED */);
    Pix2D.drawRect((x / 2 | 0) - 151, midY + 1, 302, 32, 0 /* BLACK */);
    Pix2D.fillRect2d((x / 2 | 0) - 150, midY + 2, progress * 3, 30, 9179409 /* PROGRESS_RED */);
    Pix2D.fillRect2d((x / 2 | 0) - 150 + progress * 3, midY + 2, 300 - progress * 3, 30, 0 /* BLACK */);
    this.fontBold12?.drawStringCenter(x / 2 | 0, (y / 2 | 0) + 5 - offsetY, str, 16777215 /* WHITE */);
    this.imageTitle4?.draw(214, 186);
    if (this.redrawTitleBackground) {
      this.redrawTitleBackground = false;
      if (!this.flameActive) {
        this.imageTitle0?.draw(0, 0);
        this.imageTitle1?.draw(661, 0);
      }
      this.imageTitle2?.draw(128, 0);
      this.imageTitle3?.draw(214, 386);
      this.imageTitle5?.draw(0, 265);
      this.imageTitle6?.draw(574, 265);
      this.imageTitle7?.draw(128, 186);
      this.imageTitle8?.draw(574, 186);
    }
    await sleep(5);
  }
  runFlames() {
    if (!this.flameActive) {
      return;
    }
    this.updateFlames();
    this.updateFlames();
    this.drawFlames();
  }
  async loadTitle() {
    if (!this.imageTitle2) {
      this.drawArea = null;
      this.areaChatback = null;
      this.areaMapback = null;
      this.areaSidebar = null;
      this.areaViewport = null;
      this.areaBackbase1 = null;
      this.areaBackbase2 = null;
      this.areaBackhmid1 = null;
      this.imageTitle0 = new PixMap(128, 265);
      Pix2D.clear();
      this.imageTitle1 = new PixMap(128, 265);
      Pix2D.clear();
      this.imageTitle2 = new PixMap(533, 186);
      Pix2D.clear();
      this.imageTitle3 = new PixMap(360, 146);
      Pix2D.clear();
      this.imageTitle4 = new PixMap(360, 200);
      Pix2D.clear();
      this.imageTitle5 = new PixMap(214, 267);
      Pix2D.clear();
      this.imageTitle6 = new PixMap(215, 267);
      Pix2D.clear();
      this.imageTitle7 = new PixMap(86, 79);
      Pix2D.clear();
      this.imageTitle8 = new PixMap(87, 79);
      Pix2D.clear();
      if (this.titleArchive) {
        await this.loadTitleBackground();
        this.loadTitleImages();
      }
      this.redrawTitleBackground = true;
    }
  }
  async loadTitleBackground() {
    if (!this.titleArchive) {
      return;
    }
    const background = await Pix24.fromJpeg(this.titleArchive, "title");
    this.imageTitle0?.bind();
    background.blitOpaque(0, 0);
    this.imageTitle1?.bind();
    background.blitOpaque(-661, 0);
    this.imageTitle2?.bind();
    background.blitOpaque(-128, 0);
    this.imageTitle3?.bind();
    background.blitOpaque(-214, -386);
    this.imageTitle4?.bind();
    background.blitOpaque(-214, -186);
    this.imageTitle5?.bind();
    background.blitOpaque(0, -265);
    this.imageTitle6?.bind();
    background.blitOpaque(-128, -186);
    this.imageTitle7?.bind();
    background.blitOpaque(-128, -186);
    this.imageTitle8?.bind();
    background.blitOpaque(-574, -186);
    background.flipHorizontally();
    this.imageTitle0?.bind();
    background.blitOpaque(394, 0);
    this.imageTitle1?.bind();
    background.blitOpaque(-267, 0);
    this.imageTitle2?.bind();
    background.blitOpaque(266, 0);
    this.imageTitle3?.bind();
    background.blitOpaque(180, -386);
    this.imageTitle4?.bind();
    background.blitOpaque(180, -186);
    this.imageTitle5?.bind();
    background.blitOpaque(394, -265);
    this.imageTitle6?.bind();
    background.blitOpaque(-180, -265);
    this.imageTitle7?.bind();
    background.blitOpaque(212, -186);
    this.imageTitle8?.bind();
    background.blitOpaque(-180, -186);
    const logo = Pix24.fromArchive(this.titleArchive, "logo");
    this.imageTitle2?.bind();
    logo.draw((this.width / 2 | 0) - (logo.width2d / 2 | 0) - 128, 18);
  }
  updateFlameBuffer(image) {
    if (!this.flameBuffer0 || !this.flameBuffer1) {
      return;
    }
    const flameHeight = 256;
    this.flameBuffer0.fill(0);
    for (let i = 0;i < 5000; i++) {
      const rand = Math.random() * 128 * flameHeight | 0;
      this.flameBuffer0[rand] = Math.random() * 256 | 0;
    }
    for (let i = 0;i < 20; i++) {
      for (let y = 1;y < flameHeight - 1; y++) {
        for (let x = 1;x < 127; x++) {
          const index = x + (y << 7);
          this.flameBuffer1[index] = (this.flameBuffer0[index - 1] + this.flameBuffer0[index + 1] + this.flameBuffer0[index - 128] + this.flameBuffer0[index + 128]) / 4 | 0;
        }
      }
      const last = this.flameBuffer0;
      this.flameBuffer0 = this.flameBuffer1;
      this.flameBuffer1 = last;
    }
    if (image) {
      let off = 0;
      for (let y = 0;y < image.height2d; y++) {
        for (let x = 0;x < image.width2d; x++) {
          if (image.pixels[off++] !== 0) {
            const x0 = x + image.cropX + 16;
            const y0 = y + image.cropY + 16;
            const index = x0 + (y0 << 7);
            this.flameBuffer0[index] = 0;
          }
        }
      }
    }
  }
  loadTitleImages() {
    if (!this.titleArchive) {
      return;
    }
    this.imageTitlebox = Pix8.fromArchive(this.titleArchive, "titlebox");
    this.imageTitlebutton = Pix8.fromArchive(this.titleArchive, "titlebutton");
    for (let i = 0;i < 12; i++) {
      this.imageRunes[i] = Pix8.fromArchive(this.titleArchive, "runes", i);
    }
    this.imageFlamesLeft = new Pix24(128, 265);
    this.imageFlamesRight = new Pix24(128, 265);
    if (this.imageTitle0)
      arraycopy(this.imageTitle0.pixels, 0, this.imageFlamesLeft.pixels, 0, 33920);
    if (this.imageTitle1)
      arraycopy(this.imageTitle1.pixels, 0, this.imageFlamesRight.pixels, 0, 33920);
    this.flameGradient0 = new Int32Array(256);
    for (let index = 0;index < 64; index++) {
      this.flameGradient0[index] = index * 262144;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient0[index + 64] = index * 1024 + 16711680 /* RED */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient0[index + 128] = index * 4 + 16776960 /* YELLOW */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient0[index + 192] = 16777215 /* WHITE */;
    }
    this.flameGradient1 = new Int32Array(256);
    for (let index = 0;index < 64; index++) {
      this.flameGradient1[index] = index * 1024;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient1[index + 64] = index * 4 + 65280 /* GREEN */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient1[index + 128] = index * 262144 + 65535 /* CYAN */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient1[index + 192] = 16777215 /* WHITE */;
    }
    this.flameGradient2 = new Int32Array(256);
    for (let index = 0;index < 64; index++) {
      this.flameGradient2[index] = index * 4;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient2[index + 64] = index * 262144 + 255 /* BLUE */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient2[index + 128] = index * 1024 + 16711935 /* MAGENTA */;
    }
    for (let index = 0;index < 64; index++) {
      this.flameGradient2[index + 192] = 16777215 /* WHITE */;
    }
    this.flameGradient = new Int32Array(256);
    this.flameBuffer0 = new Int32Array(32768);
    this.flameBuffer1 = new Int32Array(32768);
    this.updateFlameBuffer(null);
    this.flameBuffer3 = new Int32Array(32768);
    this.flameBuffer2 = new Int32Array(32768);
    this.showProgress(10, "Connecting to fileserver").then(() => {
      if (!this.flameActive) {
        this.flameActive = true;
        this.flamesInterval = setInterval(this.runFlames.bind(this), 35);
      }
    });
  }
  async updateTitleScreen() {
    if (this.titleScreenState === 0) {
      let x = (this.width / 2 | 0) - 80;
      let y = (this.height / 2 | 0) + 20;
      y += 20;
      if (this.mouseClickButton === 1 && this.mouseClickX >= x - 75 && this.mouseClickX <= x + 75 && this.mouseClickY >= y - 20 && this.mouseClickY <= y + 20) {
        this.titleScreenState = 3;
        this.titleLoginField = 0;
      }
      x = (this.width / 2 | 0) + 80;
      if (this.mouseClickButton === 1 && this.mouseClickX >= x - 75 && this.mouseClickX <= x + 75 && this.mouseClickY >= y - 20 && this.mouseClickY <= y + 20) {
        this.loginMessage0 = "";
        this.loginMessage1 = "Enter your username & password.";
        this.titleScreenState = 2;
        this.titleLoginField = 0;
      }
    } else if (this.titleScreenState === 2) {
      let y = (this.height / 2 | 0) - 40;
      y += 30;
      y += 25;
      if (this.mouseClickButton === 1 && this.mouseClickY >= y - 15 && this.mouseClickY < y) {
        this.titleLoginField = 0;
      }
      y += 15;
      if (this.mouseClickButton === 1 && this.mouseClickY >= y - 15 && this.mouseClickY < y) {
        this.titleLoginField = 1;
      }
      let buttonX = (this.width / 2 | 0) - 80;
      let buttonY = (this.height / 2 | 0) + 50;
      buttonY += 20;
      if (this.mouseClickButton === 1 && this.mouseClickX >= buttonX - 75 && this.mouseClickX <= buttonX + 75 && this.mouseClickY >= buttonY - 20 && this.mouseClickY <= buttonY + 20) {
        await this.tryLogin(this.usernameInput, this.passwordInput, false);
      }
      buttonX = (this.width / 2 | 0) + 80;
      if (this.mouseClickButton === 1 && this.mouseClickX >= buttonX - 75 && this.mouseClickX <= buttonX + 75 && this.mouseClickY >= buttonY - 20 && this.mouseClickY <= buttonY + 20) {
        this.titleScreenState = 0;
        this.usernameInput = "";
        this.passwordInput = "";
      }
      while (true) {
        const key = this.pollKey();
        if (key === -1) {
          return;
        }
        let valid = false;
        for (let i = 0;i < PixFont.CHARSET.length; i++) {
          if (String.fromCharCode(key) === PixFont.CHARSET.charAt(i)) {
            valid = true;
            break;
          }
        }
        if (this.titleLoginField === 0) {
          if (key === 8 && this.usernameInput.length > 0) {
            this.usernameInput = this.usernameInput.substring(0, this.usernameInput.length - 1);
          }
          if (key === 9 || key === 10 || key === 13) {
            this.titleLoginField = 1;
          }
          if (valid) {
            this.usernameInput = this.usernameInput + String.fromCharCode(key);
          }
          if (this.usernameInput.length > 12) {
            this.usernameInput = this.usernameInput.substring(0, 12);
          }
        } else if (this.titleLoginField === 1) {
          if (key === 8 && this.passwordInput.length > 0) {
            this.passwordInput = this.passwordInput.substring(0, this.passwordInput.length - 1);
          }
          if (key === 9 || key === 10 || key === 13) {
            this.titleLoginField = 0;
          }
          if (valid) {
            this.passwordInput = this.passwordInput + String.fromCharCode(key);
          }
          if (this.passwordInput.length > 20) {
            this.passwordInput = this.passwordInput.substring(0, 20);
          }
        }
      }
    } else if (this.titleScreenState === 3) {
      const x = this.width / 2 | 0;
      let y = (this.height / 2 | 0) + 50;
      y += 20;
      if (this.mouseClickButton === 1 && this.mouseClickX >= x - 75 && this.mouseClickX <= x + 75 && this.mouseClickY >= y - 20 && this.mouseClickY <= y + 20) {
        this.titleScreenState = 0;
      }
    }
  }
  async drawTitleScreen() {
    await this.loadTitle();
    this.imageTitle4?.bind();
    this.imageTitlebox?.draw(0, 0);
    const w = 360;
    const h = 200;
    if (this.titleScreenState === 0) {
      let x = w / 2 | 0;
      let y = (h / 2 | 0) - 20;
      this.fontBold12?.drawStringTaggableCenter(x, y, "Welcome to RuneScape", 16776960 /* YELLOW */, true);
      x = (w / 2 | 0) - 80;
      y = (h / 2 | 0) + 20;
      this.imageTitlebutton?.draw(x - 73, y - 20);
      this.fontBold12?.drawStringTaggableCenter(x, y + 5, "New user", 16777215 /* WHITE */, true);
      x = (w / 2 | 0) + 80;
      this.imageTitlebutton?.draw(x - 73, y - 20);
      this.fontBold12?.drawStringTaggableCenter(x, y + 5, "Existing User", 16777215 /* WHITE */, true);
    } else if (this.titleScreenState === 2) {
      let x = (w / 2 | 0) - 80;
      let y = (h / 2 | 0) - 40;
      if (this.loginMessage0.length > 0) {
        this.fontBold12?.drawStringTaggableCenter(w / 2, y - 15, this.loginMessage0, 16776960 /* YELLOW */, true);
        this.fontBold12?.drawStringTaggableCenter(w / 2, y, this.loginMessage1, 16776960 /* YELLOW */, true);
        y += 30;
      } else {
        this.fontBold12?.drawStringTaggableCenter(w / 2, y - 7, this.loginMessage1, 16776960 /* YELLOW */, true);
        y += 30;
      }
      this.fontBold12?.drawStringTaggable(w / 2 - 90, y, `Username: ${this.usernameInput}${this.titleLoginField === 0 && this.loopCycle % 40 < 20 ? "@yel@|" : ""}`, 16777215 /* WHITE */, true);
      y += 15;
      this.fontBold12?.drawStringTaggable(w / 2 - 88, y, `Password: ${JString.toAsterisks(this.passwordInput)}${this.titleLoginField === 1 && this.loopCycle % 40 < 20 ? "@yel@|" : ""}`, 16777215 /* WHITE */, true);
      y = (h / 2 | 0) + 50;
      this.imageTitlebutton?.draw(x - 73, y - 20);
      this.fontBold12?.drawStringTaggableCenter(x, y + 5, "Login", 16777215 /* WHITE */, true);
      x = (w / 2 | 0) + 80;
      this.imageTitlebutton?.draw(x - 73, y - 20);
      this.fontBold12?.drawStringTaggableCenter(x, y + 5, "Cancel", 16777215 /* WHITE */, true);
    } else if (this.titleScreenState === 3) {
      this.fontBold12?.drawStringTaggableCenter(w / 2, h / 2 - 60, "Create a free account", 16776960 /* YELLOW */, true);
      const x = w / 2 | 0;
      let y = (h / 2 | 0) - 35;
      this.fontBold12?.drawStringTaggableCenter(w / 2 | 0, y, "To create a new account you need to", 16777215 /* WHITE */, true);
      y += 15;
      this.fontBold12?.drawStringTaggableCenter(w / 2 | 0, y, "go back to the main RuneScape webpage", 16777215 /* WHITE */, true);
      y += 15;
      this.fontBold12?.drawStringTaggableCenter(w / 2 | 0, y, "and choose the red 'create account'", 16777215 /* WHITE */, true);
      y += 15;
      this.fontBold12?.drawStringTaggableCenter(w / 2 | 0, y, "button at the top right of that page.", 16777215 /* WHITE */, true);
      y = (h / 2 | 0) + 50;
      this.imageTitlebutton?.draw(x - 73, y - 20);
      this.fontBold12?.drawStringTaggableCenter(x, y + 5, "Cancel", 16777215 /* WHITE */, true);
    }
    this.imageTitle4?.draw(214, 186);
    if (this.redrawTitleBackground) {
      this.redrawTitleBackground = false;
      this.imageTitle2?.draw(128, 0);
      this.imageTitle3?.draw(214, 386);
      this.imageTitle5?.draw(0, 265);
      this.imageTitle6?.draw(574, 265);
      this.imageTitle7?.draw(128, 186);
      this.imageTitle8?.draw(574, 186);
    }
  }
  async tryLogin(username, password, reconnect) {
    try {
      if (!reconnect) {
        this.loginMessage0 = "";
        this.loginMessage1 = "Connecting to server...";
        await this.drawTitleScreen();
      }
      this.netStream = new ClientStream(await ClientStream.openSocket(window.location.host, window.location.protocol === "https:"));
      await this.netStream.readBytes(this.in.data, 0, 8);
      this.in.pos = 0;
      this.serverSeed = this.in.g8();
      const seed = new Int32Array([Math.floor(Math.random() * 99999999), Math.floor(Math.random() * 99999999), Number(this.serverSeed >> 32n), Number(this.serverSeed & BigInt(4294967295))]);
      this.out.pos = 0;
      this.out.p1(10);
      this.out.p4(seed[0]);
      this.out.p4(seed[1]);
      this.out.p4(seed[2]);
      this.out.p4(seed[3]);
      this.out.p4(1337);
      this.out.pjstr(username);
      this.out.pjstr(password);
      this.out.rsaenc(BigInt("7162900525229798032761816791230527296329313291232324290237849263501208207972894053929065636522363163621000728841182238772712427862772219676577293600221789"), BigInt("58778699976184461502525193738213253649000149147835990136706041084440742975821"));
      this.loginout.pos = 0;
      if (reconnect) {
        this.loginout.p1(18);
      } else {
        this.loginout.p1(16);
      }
      this.loginout.p1(this.out.pos + 36 + 1 + 1);
      this.loginout.p1(225);
      this.loginout.p1(Client.lowMemory ? 1 : 0);
      for (let i = 0;i < 9; i++) {
        this.loginout.p4(this.archiveChecksums[i]);
      }
      this.loginout.pdata(this.out.data, this.out.pos, 0);
      this.out.random = new Isaac(seed);
      for (let i = 0;i < 4; i++) {
        seed[i] += 50;
      }
      this.randomIn = new Isaac(seed);
      this.netStream?.write(this.loginout.data, this.loginout.pos);
      const reply = await this.netStream.read();
      if (reply === 1) {
        await sleep(2000);
        await this.tryLogin(username, password, reconnect);
        return;
      }
      if (reply === 2 || reply === 18) {
        this.rights = reply === 18;
        InputTracking.setDisabled();
        this.ingame = true;
        this.out.pos = 0;
        this.in.pos = 0;
        this.inPacketType = -1;
        this.lastPacketType0 = -1;
        this.lastPacketType1 = -1;
        this.lastPacketType2 = -1;
        this.inPacketSize = 0;
        this.idleNetCycles = 0;
        this.systemUpdateTimer = 0;
        this.idleTimeout = 0;
        this.hintType = 0;
        this.menuSize = 0;
        this.menuVisible = false;
        this.idleCycles = performance.now();
        for (let i = 0;i < 100; i++) {
          this.messageText[i] = null;
        }
        this.objSelected = 0;
        this.spellSelected = 0;
        this.sceneState = 0;
        this.waveCount = 0;
        this.cameraAnticheatOffsetX = (Math.random() * 100 | 0) - 50;
        this.cameraAnticheatOffsetZ = (Math.random() * 110 | 0) - 55;
        this.cameraAnticheatAngle = (Math.random() * 80 | 0) - 40;
        this.minimapAnticheatAngle = (Math.random() * 120 | 0) - 60;
        this.minimapZoom = (Math.random() * 30 | 0) - 20;
        this.orbitCameraYaw = (Math.random() * 20 | 0) - 10 & 2047;
        this.minimapLevel = -1;
        this.flagSceneTileX = 0;
        this.flagSceneTileZ = 0;
        this.playerCount = 0;
        this.npcCount = 0;
        for (let i = 0;i < 2048 /* MAX_PLAYER_COUNT */; i++) {
          this.players[i] = null;
          this.playerAppearanceBuffer[i] = null;
        }
        for (let i = 0;i < 8192; i++) {
          this.npcs[i] = null;
        }
        this.localPlayer = this.players[2047 /* LOCAL_PLAYER_INDEX */] = new PlayerEntity;
        this.projectiles.clear();
        this.spotanims.clear();
        for (let level = 0;level < 4 /* LEVELS */; level++) {
          for (let x = 0;x < 104 /* SIZE */; x++) {
            for (let z = 0;z < 104 /* SIZE */; z++) {
              this.objStacks[level][x][z] = null;
            }
          }
        }
        this.addedLocs = new LinkList;
        this.friendCount = 0;
        this.stickyChatInterfaceId = -1;
        this.chatInterfaceId = -1;
        this.viewportInterfaceId = -1;
        this.sidebarInterfaceId = -1;
        this.pressedContinueOption = false;
        this.selectedTab = 3;
        this.chatbackInputOpen = false;
        this.menuVisible = false;
        this.showSocialInput = false;
        this.modalMessage = null;
        this.inMultizone = 0;
        this.flashingTab = -1;
        this.designGenderMale = true;
        this.validateCharacterDesign();
        for (let i = 0;i < 5; i++) {
          this.designColors[i] = 0;
        }
        Client.oplogic1 = 0;
        Client.oplogic2 = 0;
        Client.oplogic3 = 0;
        Client.oplogic4 = 0;
        Client.oplogic5 = 0;
        Client.oplogic6 = 0;
        Client.oplogic7 = 0;
        Client.oplogic8 = 0;
        Client.oplogic9 = 0;
        this.prepareGameScreen();
        return;
      }
      if (reply === 3) {
        this.loginMessage0 = "";
        this.loginMessage1 = "Invalid username or password.";
        return;
      }
      if (reply === 4) {
        this.loginMessage0 = "Your account has been disabled.";
        this.loginMessage1 = "Please check your message-centre for details.";
        return;
      }
      if (reply === 5) {
        this.loginMessage0 = "Your account is already logged in.";
        this.loginMessage1 = "Try again in 60 secs...";
        return;
      }
      if (reply === 6) {
        this.loginMessage0 = "RuneScape has been updated!";
        this.loginMessage1 = "Please reload this page.";
        return;
      }
      if (reply === 7) {
        this.loginMessage0 = "This world is full.";
        this.loginMessage1 = "Please use a different world.";
        return;
      }
      if (reply === 8) {
        this.loginMessage0 = "Unable to connect.";
        this.loginMessage1 = "Login server offline.";
        return;
      }
      if (reply === 9) {
        this.loginMessage0 = "Login limit exceeded.";
        this.loginMessage1 = "Too many connections from your address.";
        return;
      }
      if (reply === 10) {
        this.loginMessage0 = "Unable to connect.";
        this.loginMessage1 = "Bad session id.";
        return;
      }
      if (reply === 11) {
        this.loginMessage1 = "Login server rejected session.";
        this.loginMessage1 = "Please try again.";
        return;
      }
      if (reply === 12) {
        this.loginMessage0 = "You need a members account to login to this world.";
        this.loginMessage1 = "Please subscribe, or use a different world.";
        return;
      }
      if (reply === 13) {
        this.loginMessage0 = "Could not complete login.";
        this.loginMessage1 = "Please try using a different world.";
        return;
      }
      if (reply === 14) {
        this.loginMessage0 = "The server is being updated.";
        this.loginMessage1 = "Please wait 1 minute and try again.";
        return;
      }
      if (reply === 15) {
        this.ingame = true;
        this.out.pos = 0;
        this.in.pos = 0;
        this.inPacketType = -1;
        this.lastPacketType0 = -1;
        this.lastPacketType1 = -1;
        this.lastPacketType2 = -1;
        this.inPacketSize = 0;
        this.idleNetCycles = 0;
        this.systemUpdateTimer = 0;
        this.menuSize = 0;
        this.menuVisible = false;
        return;
      }
      if (reply === 16) {
        this.loginMessage0 = "Login attempts exceeded.";
        this.loginMessage1 = "Please wait 1 minute and try again.";
        return;
      }
      if (reply === 17) {
        this.loginMessage0 = "You are standing in a members-only area.";
        this.loginMessage1 = "To play on this world move to a free area first";
      }
    } catch (err) {
      console.error(err);
      this.loginMessage0 = "";
      this.loginMessage1 = "Error connecting to server.";
    }
  }
  async updateGame() {
    if (this.players === null) {
      return;
    }
    if (this.systemUpdateTimer > 1) {
      this.systemUpdateTimer--;
    }
    if (this.idleTimeout > 0) {
      this.idleTimeout--;
    }
    for (let i = 0;i < 5 && await this.read(); i++) {
    }
    if (this.ingame) {
      for (let wave = 0;wave < this.waveCount; wave++) {
        if (this.waveDelay[wave] <= 0) {
          try {
            const buf = Wave.generate(this.waveIds[wave], this.waveLoops[wave]);
            if (!buf) {
              throw new Error;
            }
            if (performance.now() + (buf.pos / 22 | 0) > this.lastWaveStartTime + (this.lastWaveLength / 22 | 0)) {
              this.lastWaveLength = buf.pos;
              this.lastWaveStartTime = performance.now();
              this.lastWaveId = this.waveIds[wave];
              this.lastWaveLoops = this.waveLoops[wave];
              await playWave(buf.data.slice(0, buf.pos));
            }
          } catch (e) {
            console.error(e);
          }
          this.waveCount--;
          for (let i = wave;i < this.waveCount; i++) {
            this.waveIds[i] = this.waveIds[i + 1];
            this.waveLoops[i] = this.waveLoops[i + 1];
            this.waveDelay[i] = this.waveDelay[i + 1];
          }
          wave--;
        } else {
          this.waveDelay[wave]--;
        }
      }
      if (this.nextMusicDelay > 0) {
        this.nextMusicDelay -= 20;
        if (this.nextMusicDelay < 0) {
          this.nextMusicDelay = 0;
        }
        if (this.nextMusicDelay === 0 && this.midiActive && !Client.lowMemory && this.currentMidi) {
          await this.setMidi(this.currentMidi, this.midiCrc, this.midiSize, false);
        }
      }
      const tracking = InputTracking.flush();
      if (tracking) {
        this.out.p1isaac(81 /* EVENT_TRACKING */);
        this.out.p2(tracking.pos);
        this.out.pdata(tracking.data, tracking.pos, 0);
        tracking.release();
      }
      this.updateSceneState();
      this.updateAddedLocs();
      this.idleNetCycles++;
      if (this.idleNetCycles > 250) {
        await this.tryReconnect();
      }
      this.updatePlayers();
      this.updateNpcs();
      this.updateEntityChats();
      if ((this.actionKey[1] === 1 || this.actionKey[2] === 1 || this.actionKey[3] === 1 || this.actionKey[4] === 1) && this.cameraMovedWrite++ > 5) {
        this.cameraMovedWrite = 0;
        this.out.p1isaac(189 /* EVENT_CAMERA_POSITION */);
        this.out.p2(this.orbitCameraPitch);
        this.out.p2(this.orbitCameraYaw);
        this.out.p1(this.minimapAnticheatAngle);
        this.out.p1(this.minimapZoom);
      }
      this.sceneDelta++;
      if (this.crossMode !== 0) {
        this.crossCycle += 20;
        if (this.crossCycle >= 400) {
          this.crossMode = 0;
        }
      }
      if (this.selectedArea !== 0) {
        this.selectedCycle++;
        if (this.selectedCycle >= 15) {
          if (this.selectedArea === 2) {
            this.redrawSidebar = true;
          }
          if (this.selectedArea === 3) {
            this.redrawChatback = true;
          }
          this.selectedArea = 0;
        }
      }
      if (this.objDragArea !== 0) {
        this.objDragCycles++;
        if (this.mouseX > this.objGrabX + 5 || this.mouseX < this.objGrabX - 5 || this.mouseY > this.objGrabY + 5 || this.mouseY < this.objGrabY - 5) {
          this.objGrabThreshold = true;
        }
        if (this.mouseButton === 0) {
          if (this.objDragArea === 2) {
            this.redrawSidebar = true;
          }
          if (this.objDragArea === 3) {
            this.redrawChatback = true;
          }
          this.objDragArea = 0;
          if (this.objGrabThreshold && this.objDragCycles >= 5) {
            this.hoveredSlotParentId = -1;
            this.handleInput();
            if (this.hoveredSlotParentId === this.objDragInterfaceId && this.hoveredSlot !== this.objDragSlot) {
              const com = Component.instances[this.objDragInterfaceId];
              if (com.invSlotObjId) {
                const obj = com.invSlotObjId[this.hoveredSlot];
                com.invSlotObjId[this.hoveredSlot] = com.invSlotObjId[this.objDragSlot];
                com.invSlotObjId[this.objDragSlot] = obj;
              }
              if (com.invSlotObjCount) {
                const count = com.invSlotObjCount[this.hoveredSlot];
                com.invSlotObjCount[this.hoveredSlot] = com.invSlotObjCount[this.objDragSlot];
                com.invSlotObjCount[this.objDragSlot] = count;
              }
              this.out.p1isaac(159 /* INV_BUTTOND */);
              this.out.p2(this.objDragInterfaceId);
              this.out.p2(this.objDragSlot);
              this.out.p2(this.hoveredSlot);
            }
          } else if ((this.mouseButtonsOption === 1 || this.isAddFriendOption(this.menuSize - 1)) && this.menuSize > 2) {
            this.showContextMenu();
          } else if (this.menuSize > 0) {
            await this.useMenuOption(this.menuSize - 1);
          }
          this.selectedCycle = 10;
          this.mouseClickButton = 0;
        }
      }
      Client.cyclelogic3++;
      if (Client.cyclelogic3 > 127) {
        Client.cyclelogic3 = 0;
        this.out.p1isaac(215 /* ANTICHEAT_CYCLELOGIC3 */);
        this.out.p3(4991788);
      }
      if (World3D.clickTileX !== -1) {
        if (this.localPlayer) {
          const x = World3D.clickTileX;
          const z = World3D.clickTileZ;
          const success = this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], x, z, 0, 0, 0, 0, 0, 0, true);
          World3D.clickTileX = -1;
          if (success) {
            this.crossX = this.mouseClickX;
            this.crossY = this.mouseClickY;
            this.crossMode = 1;
            this.crossCycle = 0;
          }
        }
      }
      if (this.mouseClickButton === 1 && this.modalMessage) {
        this.modalMessage = null;
        this.redrawChatback = true;
        this.mouseClickButton = 0;
      }
      await this.handleMouseInput();
      this.handleMinimapInput();
      this.handleTabInput();
      this.handleChatSettingsInput();
      if (this.mouseButton === 1 || this.mouseClickButton === 1) {
        this.dragCycles++;
      }
      if (this.sceneState === 2) {
        this.updateOrbitCamera();
      }
      if (this.sceneState === 2 && this.cutscene) {
        this.applyCutscene();
      }
      for (let i = 0;i < 5; i++) {
        this.cameraModifierCycle[i]++;
      }
      await this.handleInputKey();
      if (performance.now() - this.idleCycles > 90000) {
        this.idleTimeout = 250;
        this.idleCycles = performance.now() - 1e4;
        this.out.p1isaac(70 /* IDLE_TIMER */);
      }
      this.cameraOffsetCycle++;
      if (this.cameraOffsetCycle > 500) {
        this.cameraOffsetCycle = 0;
        const rand = Math.random() * 8 | 0;
        if ((rand & 1) === 1) {
          this.cameraAnticheatOffsetX += this.cameraOffsetXModifier;
        }
        if ((rand & 2) === 2) {
          this.cameraAnticheatOffsetZ += this.cameraOffsetZModifier;
        }
        if ((rand & 4) === 4) {
          this.cameraAnticheatAngle += this.cameraOffsetYawModifier;
        }
      }
      if (this.cameraAnticheatOffsetX < -50) {
        this.cameraOffsetXModifier = 2;
      }
      if (this.cameraAnticheatOffsetX > 50) {
        this.cameraOffsetXModifier = -2;
      }
      if (this.cameraAnticheatOffsetZ < -55) {
        this.cameraOffsetZModifier = 2;
      }
      if (this.cameraAnticheatOffsetZ > 55) {
        this.cameraOffsetZModifier = -2;
      }
      if (this.cameraAnticheatAngle < -40) {
        this.cameraOffsetYawModifier = 1;
      }
      if (this.cameraAnticheatAngle > 40) {
        this.cameraOffsetYawModifier = -1;
      }
      this.minimapOffsetCycle++;
      if (this.minimapOffsetCycle > 500) {
        this.minimapOffsetCycle = 0;
        const rand = Math.random() * 8 | 0;
        if ((rand & 1) === 1) {
          this.minimapAnticheatAngle += this.minimapAngleModifier;
        }
        if ((rand & 2) === 2) {
          this.minimapZoom += this.minimapZoomModifier;
        }
      }
      if (this.minimapAnticheatAngle < -60) {
        this.minimapAngleModifier = 2;
      }
      if (this.minimapAnticheatAngle > 60) {
        this.minimapAngleModifier = -2;
      }
      if (this.minimapZoom < -20) {
        this.minimapZoomModifier = 1;
      }
      if (this.minimapZoom > 10) {
        this.minimapZoomModifier = -1;
      }
      Client.cyclelogic4++;
      if (Client.cyclelogic4 > 110) {
        Client.cyclelogic4 = 0;
        this.out.p1isaac(236 /* ANTICHEAT_CYCLELOGIC4 */);
        this.out.p4(0);
      }
      this.heartbeatTimer++;
      if (this.heartbeatTimer > 50) {
        this.out.p1isaac(108 /* NO_TIMEOUT */);
      }
      try {
        if (this.netStream && this.out.pos > 0) {
          this.netStream.write(this.out.data, this.out.pos);
          this.out.pos = 0;
          this.heartbeatTimer = 0;
        }
      } catch (e) {
        console.error(e);
        await this.tryReconnect();
      }
    }
  }
  updateSceneState() {
    if (Client.lowMemory && this.sceneState === 2 && World.levelBuilt !== this.currentLevel) {
      this.areaViewport?.bind();
      this.fontPlain12?.drawStringCenter(257, 151, "Loading - please wait.", 0 /* BLACK */);
      this.fontPlain12?.drawStringCenter(256, 150, "Loading - please wait.", 16777215 /* WHITE */);
      this.areaViewport?.draw(8, 11);
      this.sceneState = 1;
    }
    if (this.sceneState === 1) {
      this.checkScene();
    }
    if (this.sceneState === 2 && this.currentLevel !== this.minimapLevel) {
      this.minimapLevel = this.currentLevel;
      this.createMinimap(this.currentLevel);
    }
  }
  checkScene() {
    if (!this.sceneMapLandData || !this.sceneMapLandReady || !this.sceneMapLocData || !this.sceneMapLocReady) {
      return -1000;
    }
    for (let i = 0;i < this.sceneMapLandReady.length; i++) {
      if (this.sceneMapLandReady[i] === false) {
        return -1;
      }
      if (this.sceneMapLocReady[i] === false) {
        return -2;
      }
    }
    if (this.sceneAwaitingSync) {
      return -3;
    }
    this.sceneState = 2;
    World.levelBuilt = this.currentLevel;
    this.buildScene();
    return 0;
  }
  updateAddedLocs() {
    if (this.sceneState !== 2) {
      return;
    }
    for (let loc = this.addedLocs.head();loc; loc = this.addedLocs.next()) {
      if (loc.duration > 0) {
        loc.duration--;
      }
      if (loc.duration != 0) {
        if (loc.delay > 0) {
          loc.delay--;
        }
        if (loc.delay === 0 && loc.x >= 1 && loc.z >= 1 && loc.x <= 102 && loc.z <= 102) {
          this.addLoc(loc.plane, loc.x, loc.z, loc.locIndex, loc.locAngle, loc.shape, loc.layer);
          loc.delay = -1;
          if (loc.lastLocIndex === loc.locIndex && loc.lastLocIndex === -1) {
            loc.unlink();
          } else if (loc.lastLocIndex === loc.locIndex && loc.lastAngle === loc.locAngle && loc.lastShape === loc.shape) {
            loc.unlink();
          }
        }
      } else {
        this.addLoc(loc.plane, loc.x, loc.z, loc.lastLocIndex, loc.lastAngle, loc.lastShape, loc.layer);
        loc.unlink();
      }
    }
    Client.cyclelogic5++;
    if (Client.cyclelogic5 > 85) {
      Client.cyclelogic5 = 0;
      this.out.p1isaac(85 /* ANTICHEAT_CYCLELOGIC5 */);
    }
  }
  clearAddedLocs() {
    for (let loc = this.addedLocs.head();loc; loc = this.addedLocs.next()) {
      if (loc.duration === -1) {
        loc.delay = 0;
        this.storeLoc(loc);
      } else {
        loc.unlink();
      }
    }
  }
  appendLoc(duration, type, rotation, layer, z, shape, level, x, delay) {
    let loc = null;
    for (let next = this.addedLocs.head();next; next = this.addedLocs.next()) {
      if (next.plane === this.currentLevel && next.x === x && next.z === z && next.layer === layer) {
        loc = next;
        break;
      }
    }
    if (!loc) {
      loc = new LocAdd;
      loc.plane = level;
      loc.layer = layer;
      loc.x = x;
      loc.z = z;
      this.storeLoc(loc);
      this.addedLocs.addTail(loc);
    }
    loc.locIndex = type;
    loc.shape = shape;
    loc.locAngle = rotation;
    loc.delay = delay;
    loc.duration = duration;
  }
  storeLoc(loc) {
    if (!this.scene) {
      return;
    }
    let typecode = 0;
    let otherId = -1;
    let otherShape = 0;
    let otherAngle = 0;
    if (loc.layer === 0 /* WALL */) {
      typecode = this.scene.getWallTypecode(loc.plane, loc.x, loc.z);
    } else if (loc.layer === 1 /* WALL_DECOR */) {
      typecode = this.scene.getDecorTypecode(loc.plane, loc.z, loc.x);
    } else if (loc.layer === 2 /* GROUND */) {
      typecode = this.scene.getLocTypecode(loc.plane, loc.x, loc.z);
    } else if (loc.layer === 3 /* GROUND_DECOR */) {
      typecode = this.scene.getGroundDecorTypecode(loc.plane, loc.x, loc.z);
    }
    if (typecode !== 0) {
      const otherInfo = this.scene.getInfo(loc.plane, loc.x, loc.z, typecode);
      otherId = typecode >> 14 & 32767;
      otherShape = otherInfo & 31;
      otherAngle = otherInfo >> 6;
    }
    loc.lastLocIndex = otherId;
    loc.lastShape = otherShape;
    loc.lastAngle = otherAngle;
  }
  drawGame() {
    if (this.players === null) {
      return;
    }
    if (this.redrawTitleBackground) {
      this.redrawTitleBackground = false;
      this.areaBackleft1?.draw(0, 11);
      this.areaBackleft2?.draw(0, 375);
      this.areaBackright1?.draw(729, 5);
      this.areaBackright2?.draw(752, 231);
      this.areaBacktop1?.draw(0, 0);
      this.areaBacktop2?.draw(561, 0);
      this.areaBackvmid1?.draw(520, 11);
      this.areaBackvmid2?.draw(520, 231);
      this.areaBackvmid3?.draw(501, 375);
      this.areaBackhmid2?.draw(0, 345);
      this.redrawSidebar = true;
      this.redrawChatback = true;
      this.redrawSideicons = true;
      this.redrawPrivacySettings = true;
      if (this.sceneState !== 2) {
        this.areaViewport?.draw(8, 11);
        this.areaMapback?.draw(561, 5);
      }
    }
    if (this.sceneState === 2) {
      this.drawScene();
    }
    if (this.menuVisible && this.menuArea === 1) {
      this.redrawSidebar = true;
    }
    let redraw = false;
    if (this.sidebarInterfaceId !== -1) {
      redraw = this.updateInterfaceAnimation(this.sidebarInterfaceId, this.sceneDelta);
      if (redraw) {
        this.redrawSidebar = true;
      }
    }
    if (this.selectedArea === 2) {
      this.redrawSidebar = true;
    }
    if (this.objDragArea === 2) {
      this.redrawSidebar = true;
    }
    if (this.redrawSidebar) {
      this.drawSidebar();
      this.redrawSidebar = false;
    }
    if (this.chatInterfaceId === -1) {
      this.chatInterface.scrollPosition = this.chatScrollHeight - this.chatScrollOffset - 77;
      if (this.mouseX > 453 && this.mouseX < 565 && this.mouseY > 350) {
        this.handleScrollInput(this.mouseX - 22, this.mouseY - 375, this.chatScrollHeight, 77, false, 463, 0, this.chatInterface);
      }
      let offset = this.chatScrollHeight - this.chatInterface.scrollPosition - 77;
      if (offset < 0) {
        offset = 0;
      }
      if (offset > this.chatScrollHeight - 77) {
        offset = this.chatScrollHeight - 77;
      }
      if (this.chatScrollOffset !== offset) {
        this.chatScrollOffset = offset;
        this.redrawChatback = true;
      }
    }
    if (this.chatInterfaceId !== -1) {
      redraw = this.updateInterfaceAnimation(this.chatInterfaceId, this.sceneDelta);
      if (redraw) {
        this.redrawChatback = true;
      }
    }
    if (this.selectedArea === 3) {
      this.redrawChatback = true;
    }
    if (this.objDragArea === 3) {
      this.redrawChatback = true;
    }
    if (this.modalMessage) {
      this.redrawChatback = true;
    }
    if (this.menuVisible && this.menuArea === 2) {
      this.redrawChatback = true;
    }
    if (this.redrawChatback) {
      this.drawChatback();
      this.redrawChatback = false;
    }
    if (this.sceneState === 2) {
      this.drawMinimap();
      this.areaMapback?.draw(561, 5);
    }
    if (this.flashingTab !== -1) {
      this.redrawSideicons = true;
    }
    if (this.redrawSideicons) {
      if (this.flashingTab !== -1 && this.flashingTab === this.selectedTab) {
        this.flashingTab = -1;
        this.out.p1isaac(175 /* TUTORIAL_CLICKSIDE */);
        this.out.p1(this.selectedTab);
      }
      this.redrawSideicons = false;
      this.areaBackhmid1?.bind();
      this.imageBackhmid1?.draw(0, 0);
      if (this.sidebarInterfaceId === -1) {
        if (this.tabInterfaceId[this.selectedTab] !== -1) {
          if (this.selectedTab === 0) {
            this.imageRedstone1?.draw(29, 30);
          } else if (this.selectedTab === 1) {
            this.imageRedstone2?.draw(59, 29);
          } else if (this.selectedTab === 2) {
            this.imageRedstone2?.draw(87, 29);
          } else if (this.selectedTab === 3) {
            this.imageRedstone3?.draw(115, 29);
          } else if (this.selectedTab === 4) {
            this.imageRedstone2h?.draw(156, 29);
          } else if (this.selectedTab === 5) {
            this.imageRedstone2h?.draw(184, 29);
          } else if (this.selectedTab === 6) {
            this.imageRedstone1h?.draw(212, 30);
          }
        }
        if (this.tabInterfaceId[0] !== -1 && (this.flashingTab !== 0 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[0]?.draw(35, 34);
        }
        if (this.tabInterfaceId[1] !== -1 && (this.flashingTab !== 1 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[1]?.draw(59, 32);
        }
        if (this.tabInterfaceId[2] !== -1 && (this.flashingTab !== 2 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[2]?.draw(86, 32);
        }
        if (this.tabInterfaceId[3] !== -1 && (this.flashingTab !== 3 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[3]?.draw(121, 33);
        }
        if (this.tabInterfaceId[4] !== -1 && (this.flashingTab !== 4 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[4]?.draw(157, 34);
        }
        if (this.tabInterfaceId[5] !== -1 && (this.flashingTab !== 5 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[5]?.draw(185, 32);
        }
        if (this.tabInterfaceId[6] !== -1 && (this.flashingTab !== 6 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[6]?.draw(212, 34);
        }
      }
      this.areaBackhmid1?.draw(520, 165);
      this.areaBackbase2?.bind();
      this.imageBackbase2?.draw(0, 0);
      if (this.sidebarInterfaceId === -1) {
        if (this.tabInterfaceId[this.selectedTab] !== -1) {
          if (this.selectedTab === 7) {
            this.imageRedstone1v?.draw(49, 0);
          } else if (this.selectedTab === 8) {
            this.imageRedstone2v?.draw(81, 0);
          } else if (this.selectedTab === 9) {
            this.imageRedstone2v?.draw(108, 0);
          } else if (this.selectedTab === 10) {
            this.imageRedstone3v?.draw(136, 1);
          } else if (this.selectedTab === 11) {
            this.imageRedstone2hv?.draw(178, 0);
          } else if (this.selectedTab === 12) {
            this.imageRedstone2hv?.draw(205, 0);
          } else if (this.selectedTab === 13) {
            this.imageRedstone1hv?.draw(233, 0);
          }
        }
        if (this.tabInterfaceId[8] !== -1 && (this.flashingTab !== 8 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[7]?.draw(80, 2);
        }
        if (this.tabInterfaceId[9] !== -1 && (this.flashingTab !== 9 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[8]?.draw(107, 3);
        }
        if (this.tabInterfaceId[10] !== -1 && (this.flashingTab !== 10 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[9]?.draw(142, 4);
        }
        if (this.tabInterfaceId[11] !== -1 && (this.flashingTab !== 11 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[10]?.draw(179, 2);
        }
        if (this.tabInterfaceId[12] !== -1 && (this.flashingTab !== 12 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[11]?.draw(206, 2);
        }
        if (this.tabInterfaceId[13] !== -1 && (this.flashingTab !== 13 || this.loopCycle % 20 < 10)) {
          this.imageSideicons[12]?.draw(230, 2);
        }
      }
      this.areaBackbase2?.draw(501, 492);
      this.areaViewport?.bind();
    }
    if (this.redrawPrivacySettings) {
      this.redrawPrivacySettings = false;
      this.areaBackbase1?.bind();
      this.imageBackbase1?.draw(0, 0);
      this.fontPlain12?.drawStringTaggableCenter(57, 33, "Public chat", 16777215 /* WHITE */, true);
      if (this.publicChatSetting === 0) {
        this.fontPlain12?.drawStringTaggableCenter(57, 46, "On", 65280 /* GREEN */, true);
      }
      if (this.publicChatSetting === 1) {
        this.fontPlain12?.drawStringTaggableCenter(57, 46, "Friends", 16776960 /* YELLOW */, true);
      }
      if (this.publicChatSetting === 2) {
        this.fontPlain12?.drawStringTaggableCenter(57, 46, "Off", 16711680 /* RED */, true);
      }
      if (this.publicChatSetting === 3) {
        this.fontPlain12?.drawStringTaggableCenter(57, 46, "Hide", 65535 /* CYAN */, true);
      }
      this.fontPlain12?.drawStringTaggableCenter(186, 33, "Private chat", 16777215 /* WHITE */, true);
      if (this.privateChatSetting === 0) {
        this.fontPlain12?.drawStringTaggableCenter(186, 46, "On", 65280 /* GREEN */, true);
      }
      if (this.privateChatSetting === 1) {
        this.fontPlain12?.drawStringTaggableCenter(186, 46, "Friends", 16776960 /* YELLOW */, true);
      }
      if (this.privateChatSetting === 2) {
        this.fontPlain12?.drawStringTaggableCenter(186, 46, "Off", 16711680 /* RED */, true);
      }
      this.fontPlain12?.drawStringTaggableCenter(326, 33, "Trade/duel", 16777215 /* WHITE */, true);
      if (this.tradeChatSetting === 0) {
        this.fontPlain12?.drawStringTaggableCenter(326, 46, "On", 65280 /* GREEN */, true);
      }
      if (this.tradeChatSetting === 1) {
        this.fontPlain12?.drawStringTaggableCenter(326, 46, "Friends", 16776960 /* YELLOW */, true);
      }
      if (this.tradeChatSetting === 2) {
        this.fontPlain12?.drawStringTaggableCenter(326, 46, "Off", 16711680 /* RED */, true);
      }
      this.fontPlain12?.drawStringTaggableCenter(462, 38, "Report abuse", 16777215 /* WHITE */, true);
      this.areaBackbase1?.draw(0, 471);
      this.areaViewport?.bind();
    }
    this.sceneDelta = 0;
  }
  drawScene() {
    this.sceneCycle++;
    this.pushPlayers();
    this.pushNpcs();
    this.pushProjectiles();
    this.pushSpotanims();
    this.pushLocs();
    if (!this.cutscene) {
      let pitch = this.orbitCameraPitch;
      if ((this.cameraPitchClamp / 256 | 0) > pitch) {
        pitch = this.cameraPitchClamp / 256 | 0;
      }
      if (this.cameraModifierEnabled[4] && this.cameraModifierWobbleScale[4] + 128 > pitch) {
        pitch = this.cameraModifierWobbleScale[4] + 128;
      }
      const yaw = this.orbitCameraYaw + this.cameraAnticheatAngle & 2047;
      if (this.localPlayer) {
        this.orbitCamera(this.orbitCameraX, this.getHeightmapY(this.currentLevel, this.localPlayer.x, this.localPlayer.z) - 50, this.orbitCameraZ, yaw, pitch, pitch * 3 + 600);
      }
      Client.cyclelogic2++;
      if (Client.cyclelogic2 > 1802) {
        Client.cyclelogic2 = 0;
        this.out.p1isaac(146 /* ANTICHEAT_CYCLELOGIC2 */);
        this.out.p1(0);
        const start = this.out.pos;
        this.out.p2(29711);
        this.out.p1(70);
        this.out.p1(Math.random() * 256 | 0);
        this.out.p1(242);
        this.out.p1(186);
        this.out.p1(39);
        this.out.p1(61);
        if ((Math.random() * 2 | 0) === 0) {
          this.out.p1(13);
        }
        if ((Math.random() * 2 | 0) === 0) {
          this.out.p2(57856);
        }
        this.out.p2(Math.random() * 65536 | 0);
        this.out.psize1(this.out.pos - start);
      }
    }
    let level;
    if (this.cutscene) {
      level = this.getTopLevelCutscene();
    } else {
      level = this.getTopLevel();
    }
    const cameraX = this.cameraX;
    const cameraY = this.cameraY;
    const cameraZ = this.cameraZ;
    const cameraPitch = this.cameraPitch;
    const cameraYaw = this.cameraYaw;
    let jitter;
    for (let type = 0;type < 5; type++) {
      if (this.cameraModifierEnabled[type]) {
        jitter = Math.random() * (this.cameraModifierJitter[type] * 2 + 1) - this.cameraModifierJitter[type] + Math.sin(this.cameraModifierCycle[type] * (this.cameraModifierWobbleSpeed[type] / 100)) * this.cameraModifierWobbleScale[type] | 0;
        if (type === 0) {
          this.cameraX += jitter;
        }
        if (type === 1) {
          this.cameraY += jitter;
        }
        if (type === 2) {
          this.cameraZ += jitter;
        }
        if (type === 3) {
          this.cameraYaw = this.cameraYaw + jitter & 2047;
        }
        if (type === 4) {
          this.cameraPitch += jitter;
          if (this.cameraPitch < 128) {
            this.cameraPitch = 128;
          }
          if (this.cameraPitch > 383) {
            this.cameraPitch = 383;
          }
        }
      }
    }
    jitter = Pix3D.cycle;
    Model.checkHover = true;
    Model.pickedCount = 0;
    Model.mouseX = this.mouseX - 8;
    Model.mouseY = this.mouseY - 11;
    Pix2D.clear();
    this.scene?.draw(this.cameraX, this.cameraY, this.cameraZ, level, this.cameraYaw, this.cameraPitch, this.loopCycle);
    this.scene?.clearTemporaryLocs();
    this.draw2DEntityElements();
    this.drawTileHint();
    this.updateTextures(jitter);
    this.draw3DEntityElements();
    this.areaViewport?.draw(8, 11);
    this.cameraX = cameraX;
    this.cameraY = cameraY;
    this.cameraZ = cameraZ;
    this.cameraPitch = cameraPitch;
    this.cameraYaw = cameraYaw;
  }
  clearCaches() {
    LocType.modelCacheStatic?.clear();
    LocType.modelCacheDynamic?.clear();
    NpcType.modelCache?.clear();
    ObjType.modelCache?.clear();
    ObjType.iconCache?.clear();
    PlayerEntity.modelCache?.clear();
    SpotAnimType.modelCache?.clear();
  }
  projectFromEntity(entity, height) {
    this.projectFromGround(entity.x, height, entity.z);
  }
  projectFromGround(x, height, z) {
    if (x < 128 || z < 128 || x > 13056 || z > 13056) {
      this.projectX = -1;
      this.projectY = -1;
      return;
    }
    const y = this.getHeightmapY(this.currentLevel, x, z) - height;
    this.project(x, y, z);
  }
  project(x, y, z) {
    let dx = x - this.cameraX;
    let dy = y - this.cameraY;
    let dz = z - this.cameraZ;
    const sinPitch = Pix3D.sin[this.cameraPitch];
    const cosPitch = Pix3D.cos[this.cameraPitch];
    const sinYaw = Pix3D.sin[this.cameraYaw];
    const cosYaw = Pix3D.cos[this.cameraYaw];
    let tmp = dz * sinYaw + dx * cosYaw >> 16;
    dz = dz * cosYaw - dx * sinYaw >> 16;
    dx = tmp;
    tmp = dy * cosPitch - dz * sinPitch >> 16;
    dz = dy * sinPitch + dz * cosPitch >> 16;
    dy = tmp;
    if (dz >= 50) {
      this.projectX = Pix3D.centerX + ((dx << 9) / dz | 0);
      this.projectY = Pix3D.centerY + ((dy << 9) / dz | 0);
    } else {
      this.projectX = -1;
      this.projectY = -1;
    }
  }
  draw2DEntityElements() {
    this.chatCount = 0;
    for (let index = -1;index < this.playerCount + this.npcCount; index++) {
      let entity = null;
      if (index === -1) {
        entity = this.localPlayer;
      } else if (index < this.playerCount) {
        entity = this.players[this.playerIds[index]];
      } else {
        entity = this.npcs[this.npcIds[index - this.playerCount]];
      }
      if (!entity || !entity.isVisibleNow()) {
        continue;
      }
      if (index < this.playerCount) {
        let y = 30;
        const player = entity;
        if (player.headicons !== 0) {
          this.projectFromEntity(entity, entity.maxY + 15);
          if (this.projectX > -1) {
            for (let icon = 0;icon < 8; icon++) {
              if ((player.headicons & 1 << icon) !== 0) {
                this.imageHeadicons[icon]?.draw(this.projectX - 12, this.projectY - y);
                y -= 25;
              }
            }
          }
        }
        if (index >= 0 && this.hintType === 10 && this.hintPlayer === this.playerIds[index]) {
          this.projectFromEntity(entity, entity.maxY + 15);
          if (this.projectX > -1) {
            this.imageHeadicons[7]?.draw(this.projectX - 12, this.projectY - y);
          }
        }
      } else if (this.hintType === 1 && this.hintNpc === this.npcIds[index - this.playerCount] && this.loopCycle % 20 < 10) {
        this.projectFromEntity(entity, entity.maxY + 15);
        if (this.projectX > -1) {
          this.imageHeadicons[2]?.draw(this.projectX - 12, this.projectY - 28);
        }
      }
      if (entity.chat && (index >= this.playerCount || this.publicChatSetting === 0 || this.publicChatSetting === 3 || this.publicChatSetting === 1 && this.isFriend(entity.name))) {
        this.projectFromEntity(entity, entity.maxY);
        if (this.projectX > -1 && this.chatCount < 50 /* MAX_CHATS */ && this.fontBold12) {
          this.chatWidth[this.chatCount] = this.fontBold12.stringWidth(entity.chat) / 2 | 0;
          this.chatHeight[this.chatCount] = this.fontBold12.height2d;
          this.chatX[this.chatCount] = this.projectX;
          this.chatY[this.chatCount] = this.projectY;
          this.chatColors[this.chatCount] = entity.chatColor;
          this.chatStyles[this.chatCount] = entity.chatStyle;
          this.chatTimers[this.chatCount] = entity.chatTimer;
          this.chats[this.chatCount++] = entity.chat;
          if (this.chatEffects === 0 && entity.chatStyle === 1) {
            this.chatHeight[this.chatCount] += 10;
            this.chatY[this.chatCount] += 5;
          }
          if (this.chatEffects === 0 && entity.chatStyle === 2) {
            this.chatWidth[this.chatCount] = 60;
          }
        }
      }
      if (entity.combatCycle > this.loopCycle + 100) {
        this.projectFromEntity(entity, entity.maxY + 15);
        if (this.projectX > -1) {
          let w = entity.health * 30 / entity.totalHealth | 0;
          if (w > 30) {
            w = 30;
          }
          Pix2D.fillRect2d(this.projectX - 15, this.projectY - 3, w, 5, 65280 /* GREEN */);
          Pix2D.fillRect2d(this.projectX - 15 + w, this.projectY - 3, 30 - w, 5, 16711680 /* RED */);
        }
      }
      if (entity.combatCycle > this.loopCycle + 330) {
        this.projectFromEntity(entity, entity.maxY / 2 | 0);
        if (this.projectX > -1) {
          this.imageHitmarks[entity.damageType]?.draw(this.projectX - 12, this.projectY - 12);
          this.fontPlain11?.drawStringCenter(this.projectX, this.projectY + 4, entity.damage.toString(), 0 /* BLACK */);
          this.fontPlain11?.drawStringCenter(this.projectX - 1, this.projectY + 3, entity.damage.toString(), 16777215 /* WHITE */);
        }
      }
    }
    for (let i = 0;i < this.chatCount; i++) {
      const x = this.chatX[i];
      let y = this.chatY[i];
      const padding = this.chatWidth[i];
      const height = this.chatHeight[i];
      let sorting = true;
      while (sorting) {
        sorting = false;
        for (let j = 0;j < i; j++) {
          if (y + 2 > this.chatY[j] - this.chatHeight[j] && y - height < this.chatY[j] + 2 && x - padding < this.chatX[j] + this.chatWidth[j] && x + padding > this.chatX[j] - this.chatWidth[j] && this.chatY[j] - this.chatHeight[j] < y) {
            y = this.chatY[j] - this.chatHeight[j];
            sorting = true;
          }
        }
      }
      this.projectX = this.chatX[i];
      this.projectY = this.chatY[i] = y;
      const message = this.chats[i];
      if (this.chatEffects === 0) {
        let color = 16776960 /* YELLOW */;
        if (this.chatColors[i] < 6) {
          color = Client.CHAT_COLORS[this.chatColors[i]];
        }
        if (this.chatColors[i] === 6) {
          color = this.sceneCycle % 20 < 10 ? 16711680 /* RED */ : 16776960 /* YELLOW */;
        }
        if (this.chatColors[i] === 7) {
          color = this.sceneCycle % 20 < 10 ? 255 /* BLUE */ : 65535 /* CYAN */;
        }
        if (this.chatColors[i] === 8) {
          color = this.sceneCycle % 20 < 10 ? 45056 : 8454016;
        }
        if (this.chatColors[i] === 9) {
          const delta = 150 - this.chatTimers[i];
          if (delta < 50) {
            color = delta * 1280 + 16711680 /* RED */;
          } else if (delta < 100) {
            color = 16776960 /* YELLOW */ - (delta - 50) * 327680;
          } else if (delta < 150) {
            color = (delta - 100) * 5 + 65280 /* GREEN */;
          }
        }
        if (this.chatColors[i] === 10) {
          const delta = 150 - this.chatTimers[i];
          if (delta < 50) {
            color = delta * 5 + 16711680 /* RED */;
          } else if (delta < 100) {
            color = 16711935 /* MAGENTA */ - (delta - 50) * 327680;
          } else if (delta < 150) {
            color = (delta - 100) * 327680 + 255 /* BLUE */ - (delta - 100) * 5;
          }
        }
        if (this.chatColors[i] === 11) {
          const delta = 150 - this.chatTimers[i];
          if (delta < 50) {
            color = 16777215 /* WHITE */ - delta * 327685;
          } else if (delta < 100) {
            color = (delta - 50) * 327685 + 65280 /* GREEN */;
          } else if (delta < 150) {
            color = 16777215 /* WHITE */ - (delta - 100) * 327680;
          }
        }
        if (this.chatStyles[i] === 0) {
          this.fontBold12?.drawStringCenter(this.projectX, this.projectY + 1, message, 0 /* BLACK */);
          this.fontBold12?.drawStringCenter(this.projectX, this.projectY, message, color);
        }
        if (this.chatStyles[i] === 1) {
          this.fontBold12?.drawCenteredWave(this.projectX, this.projectY + 1, message, 0 /* BLACK */, this.sceneCycle);
          this.fontBold12?.drawCenteredWave(this.projectX, this.projectY, message, color, this.sceneCycle);
        }
        if (this.chatStyles[i] === 2) {
          const w = this.fontBold12?.stringWidth(message) ?? 0;
          const offsetX = (150 - this.chatTimers[i]) * (w + 100) / 150;
          Pix2D.setBounds(this.projectX - 50, 0, this.projectX + 50, 334);
          this.fontBold12?.drawString(this.projectX + 50 - offsetX, this.projectY + 1, message, 0 /* BLACK */);
          this.fontBold12?.drawString(this.projectX + 50 - offsetX, this.projectY, message, color);
          Pix2D.resetBounds();
        }
      } else {
        this.fontBold12?.drawStringCenter(this.projectX, this.projectY + 1, message, 0 /* BLACK */);
        this.fontBold12?.drawStringCenter(this.projectX, this.projectY, message, 16776960 /* YELLOW */);
      }
    }
  }
  drawTileHint() {
    if (this.hintType !== 2 || !this.imageHeadicons[2]) {
      return;
    }
    this.projectFromGround((this.hintTileX - this.sceneBaseTileX << 7) + this.hintOffsetX, this.hintHeight * 2, (this.hintTileZ - this.sceneBaseTileZ << 7) + this.hintOffsetZ);
    if (this.projectX > -1 && this.loopCycle % 20 < 10) {
      this.imageHeadicons[2].draw(this.projectX - 12, this.projectY - 28);
    }
  }
  draw3DEntityElements() {
    this.drawPrivateMessages();
    if (this.crossMode === 1) {
      this.imageCrosses[this.crossCycle / 100 | 0]?.draw(this.crossX - 8 - 8, this.crossY - 8 - 11);
    }
    if (this.crossMode === 2) {
      this.imageCrosses[(this.crossCycle / 100 | 0) + 4]?.draw(this.crossX - 8 - 8, this.crossY - 8 - 11);
    }
    if (this.viewportInterfaceId !== -1) {
      this.updateInterfaceAnimation(this.viewportInterfaceId, this.sceneDelta);
      this.drawInterface(Component.instances[this.viewportInterfaceId], 0, 0, 0);
    }
    this.drawWildyLevel();
    if (!this.menuVisible) {
      this.handleInput();
      this.drawTooltip();
    } else if (this.menuArea === 0) {
      this.drawMenu();
    }
    if (this.inMultizone === 1) {
      if (this.wildernessLevel > 0 || this.worldLocationState === 1) {
        this.imageHeadicons[1]?.draw(472, 258);
      } else {
        this.imageHeadicons[1]?.draw(472, 296);
      }
    }
    if (this.wildernessLevel > 0) {
      this.imageHeadicons[0]?.draw(472, 296);
      this.fontPlain12?.drawStringCenter(484, 329, "Level: " + this.wildernessLevel, 16776960 /* YELLOW */);
    }
    if (this.worldLocationState === 1) {
      this.imageHeadicons[6]?.draw(472, 296);
      this.fontPlain12?.drawStringCenter(484, 329, "Arena", 16776960 /* YELLOW */);
    }
    if (this.displayFps) {
      let x = 507;
      let y = 20;
      let color = 16776960 /* YELLOW */;
      if (this.fps < 15) {
        color = 16711680 /* RED */;
      }
      this.fontPlain12?.drawStringRight(x, y, "Fps:" + this.fps, color);
      y += 15;
      let memoryUsage = -1;
      if (typeof window.performance["memory"] !== "undefined") {
        const memory = window.performance["memory"];
        memoryUsage = memory.usedJSHeapSize / 1024 | 0;
      }
      if (memoryUsage !== -1) {
        this.fontPlain12?.drawStringRight(x, y, "Mem:" + memoryUsage + "k", 16776960 /* YELLOW */);
      }
    }
    if (this.systemUpdateTimer !== 0) {
      let seconds = this.systemUpdateTimer / 50 | 0;
      const minutes = seconds / 60 | 0;
      seconds %= 60;
      if (seconds < 10) {
        this.fontPlain12?.drawString(4, 329, "System update in: " + minutes + ":0" + seconds, 16776960 /* YELLOW */);
      } else {
        this.fontPlain12?.drawString(4, 329, "System update in: " + minutes + ":" + seconds, 16776960 /* YELLOW */);
      }
    }
  }
  drawPrivateMessages() {
    if (this.splitPrivateChat === 0) {
      return;
    }
    const font = this.fontPlain12;
    let lineOffset = 0;
    if (this.systemUpdateTimer !== 0) {
      lineOffset = 1;
    }
    for (let i = 0;i < 100; i++) {
      if (!this.messageText[i]) {
        continue;
      }
      const type = this.messageTextType[i];
      let y;
      if ((type === 3 || type === 7) && (type === 7 || this.privateChatSetting === 0 || this.privateChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
        y = 329 - lineOffset * 13;
        font?.drawString(4, y, "From " + this.messageTextSender[i] + ": " + this.messageText[i], 0 /* BLACK */);
        font?.drawString(4, y - 1, "From " + this.messageTextSender[i] + ": " + this.messageText[i], 65535 /* CYAN */);
        lineOffset++;
        if (lineOffset >= 5) {
          return;
        }
      }
      if (type === 5 && this.privateChatSetting < 2) {
        y = 329 - lineOffset * 13;
        font?.drawString(4, y, this.messageText[i], 0 /* BLACK */);
        font?.drawString(4, y - 1, this.messageText[i], 65535 /* CYAN */);
        lineOffset++;
        if (lineOffset >= 5) {
          return;
        }
      }
      if (type === 6 && this.privateChatSetting < 2) {
        y = 329 - lineOffset * 13;
        font?.drawString(4, y, "To " + this.messageTextSender[i] + ": " + this.messageText[i], 0 /* BLACK */);
        font?.drawString(4, y - 1, "To " + this.messageTextSender[i] + ": " + this.messageText[i], 65535 /* CYAN */);
        lineOffset++;
        if (lineOffset >= 5) {
          return;
        }
      }
    }
  }
  drawWildyLevel() {
    if (!this.localPlayer) {
      return;
    }
    const x = (this.localPlayer.x >> 7) + this.sceneBaseTileX;
    const z = (this.localPlayer.z >> 7) + this.sceneBaseTileZ;
    if (x >= 2944 && x < 3392 && z >= 3520 && z < 6400) {
      this.wildernessLevel = ((z - 3520) / 8 | 0) + 1;
    } else if (x >= 2944 && x < 3392 && z >= 9920 && z < 12800) {
      this.wildernessLevel = ((z - 9920) / 8 | 0) + 1;
    } else {
      this.wildernessLevel = 0;
    }
    this.worldLocationState = 0;
    if (x >= 3328 && x < 3392 && z >= 3200 && z < 3264) {
      const localX = x & 63;
      const localZ = z & 63;
      if (localX >= 4 && localX <= 29 && localZ >= 44 && localZ <= 58) {
        this.worldLocationState = 1;
      } else if (localX >= 36 && localX <= 61 && localZ >= 44 && localZ <= 58) {
        this.worldLocationState = 1;
      } else if (localX >= 4 && localX <= 29 && localZ >= 25 && localZ <= 39) {
        this.worldLocationState = 1;
      } else if (localX >= 36 && localX <= 61 && localZ >= 25 && localZ <= 39) {
        this.worldLocationState = 1;
      } else if (localX >= 4 && localX <= 29 && localZ >= 6 && localZ <= 20) {
        this.worldLocationState = 1;
      } else if (localX >= 36 && localX <= 61 && localZ >= 6 && localZ <= 20) {
        this.worldLocationState = 1;
      }
    }
    if (this.worldLocationState === 0 && x >= 3328 && x <= 3393 && z >= 3203 && z <= 3325) {
      this.worldLocationState = 2;
    }
    this.overrideChat = 0;
    if (x >= 3053 && x <= 3156 && z >= 3056 && z <= 3136) {
      this.overrideChat = 1;
    } else if (x >= 3072 && x <= 3118 && z >= 9492 && z <= 9535) {
      this.overrideChat = 1;
    }
    if (this.overrideChat === 1 && x >= 3139 && x <= 3199 && z >= 3008 && z <= 3062) {
      this.overrideChat = 0;
    }
  }
  drawSidebar() {
    this.areaSidebar?.bind();
    if (this.areaSidebarOffsets) {
      Pix3D.lineOffset = this.areaSidebarOffsets;
    }
    this.imageInvback?.draw(0, 0);
    if (this.sidebarInterfaceId !== -1) {
      this.drawInterface(Component.instances[this.sidebarInterfaceId], 0, 0, 0);
    } else if (this.tabInterfaceId[this.selectedTab] !== -1) {
      this.drawInterface(Component.instances[this.tabInterfaceId[this.selectedTab]], 0, 0, 0);
    }
    if (this.menuVisible && this.menuArea === 1) {
      this.drawMenu();
    }
    this.areaSidebar?.draw(562, 231);
    this.areaViewport?.bind();
    if (this.areaViewportOffsets) {
      Pix3D.lineOffset = this.areaViewportOffsets;
    }
  }
  drawChatback() {
    this.areaChatback?.bind();
    if (this.areaChatbackOffsets) {
      Pix3D.lineOffset = this.areaChatbackOffsets;
    }
    this.imageChatback?.draw(0, 0);
    if (this.showSocialInput) {
      this.fontBold12?.drawStringCenter(239, 40, this.socialMessage, 0 /* BLACK */);
      this.fontBold12?.drawStringCenter(239, 60, this.socialInput + "*", 128 /* DARKBLUE */);
    } else if (this.chatbackInputOpen) {
      this.fontBold12?.drawStringCenter(239, 40, "Enter amount:", 0 /* BLACK */);
      this.fontBold12?.drawStringCenter(239, 60, this.chatbackInput + "*", 128 /* DARKBLUE */);
    } else if (this.modalMessage) {
      this.fontBold12?.drawStringCenter(239, 40, this.modalMessage, 0 /* BLACK */);
      this.fontBold12?.drawStringCenter(239, 60, "Click to continue", 128 /* DARKBLUE */);
    } else if (this.chatInterfaceId !== -1) {
      this.drawInterface(Component.instances[this.chatInterfaceId], 0, 0, 0);
    } else if (this.stickyChatInterfaceId === -1) {
      let font = this.fontPlain12;
      let line = 0;
      Pix2D.setBounds(0, 0, 463, 77);
      for (let i = 0;i < 100; i++) {
        const message = this.messageText[i];
        if (!message) {
          continue;
        }
        const type = this.messageTextType[i];
        const offset = this.chatScrollOffset + 70 - line * 14;
        if (type === 0) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, message, 0 /* BLACK */);
          }
          line++;
        }
        if (type === 1) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, this.messageTextSender[i] + ":", 16777215 /* WHITE */);
            font?.drawString(font.stringWidth(this.messageTextSender[i]) + 12, offset, message, 255 /* BLUE */);
          }
          line++;
        }
        if (type === 2 && (this.publicChatSetting === 0 || this.publicChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, this.messageTextSender[i] + ":", 0 /* BLACK */);
            font?.drawString(font.stringWidth(this.messageTextSender[i]) + 12, offset, message, 255 /* BLUE */);
          }
          line++;
        }
        if ((type === 3 || type === 7) && this.splitPrivateChat === 0 && (type === 7 || this.privateChatSetting === 0 || this.privateChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, "From " + this.messageTextSender[i] + ":", 0 /* BLACK */);
            font?.drawString(font.stringWidth("From " + this.messageTextSender[i]) + 12, offset, message, 8388608 /* DARKRED */);
          }
          line++;
        }
        if (type === 4 && (this.tradeChatSetting === 0 || this.tradeChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, this.messageTextSender[i] + " " + this.messageText[i], 8388736 /* TRADE_MESSAGE */);
          }
          line++;
        }
        if (type === 5 && this.splitPrivateChat === 0 && this.privateChatSetting < 2) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, message, 8388608 /* DARKRED */);
          }
          line++;
        }
        if (type === 6 && this.splitPrivateChat === 0 && this.privateChatSetting < 2) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, "To " + this.messageTextSender[i] + ":", 0 /* BLACK */);
            font?.drawString(font.stringWidth("To " + this.messageTextSender[i]) + 12, offset, message, 8388608 /* DARKRED */);
          }
          line++;
        }
        if (type === 8 && (this.tradeChatSetting === 0 || this.tradeChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
          if (offset > 0 && offset < 110) {
            font?.drawString(4, offset, this.messageTextSender[i] + " " + this.messageText[i], 13350793 /* DUEL_MESSAGE */);
          }
          line++;
        }
      }
      Pix2D.resetBounds();
      this.chatScrollHeight = line * 14 + 7;
      if (this.chatScrollHeight < 78) {
        this.chatScrollHeight = 78;
      }
      this.drawScrollbar(463, 0, this.chatScrollHeight - this.chatScrollOffset - 77, this.chatScrollHeight, 77);
      font?.drawString(4, 90, JString.formatName(this.usernameInput) + ":", 0 /* BLACK */);
      font?.drawString(font.stringWidth(this.usernameInput + ": ") + 6, 90, this.chatTyped + "*", 255 /* BLUE */);
      Pix2D.drawHorizontalLine(0, 77, 0 /* BLACK */, 479);
    } else {
      this.drawInterface(Component.instances[this.stickyChatInterfaceId], 0, 0, 0);
    }
    if (this.menuVisible && this.menuArea === 2) {
      this.drawMenu();
    }
    this.areaChatback?.draw(22, 375);
    this.areaViewport?.bind();
    if (this.areaViewportOffsets) {
      Pix3D.lineOffset = this.areaViewportOffsets;
    }
  }
  drawMinimap() {
    this.areaMapback?.bind();
    if (!this.localPlayer) {
      return;
    }
    const angle = this.orbitCameraYaw + this.minimapAnticheatAngle & 2047;
    let anchorX = (this.localPlayer.x / 32 | 0) + 48;
    let anchorY = 464 - (this.localPlayer.z / 32 | 0);
    this.imageMinimap?.drawRotatedMasked(21, 9, 146, 151, this.minimapMaskLineOffsets, this.minimapMaskLineLengths, anchorX, anchorY, angle, this.minimapZoom + 256);
    this.imageCompass?.drawRotatedMasked(0, 0, 33, 33, this.compassMaskLineOffsets, this.compassMaskLineLengths, 25, 25, this.orbitCameraYaw, 256);
    for (let i = 0;i < this.activeMapFunctionCount; i++) {
      anchorX = this.activeMapFunctionX[i] * 4 + 2 - (this.localPlayer.x / 32 | 0);
      anchorY = this.activeMapFunctionZ[i] * 4 + 2 - (this.localPlayer.z / 32 | 0);
      this.drawOnMinimap(anchorY, this.activeMapFunctions[i], anchorX);
    }
    for (let ltx = 0;ltx < 104 /* SIZE */; ltx++) {
      for (let ltz = 0;ltz < 104 /* SIZE */; ltz++) {
        const stack = this.objStacks[this.currentLevel][ltx][ltz];
        if (stack) {
          anchorX = ltx * 4 + 2 - (this.localPlayer.x / 32 | 0);
          anchorY = ltz * 4 + 2 - (this.localPlayer.z / 32 | 0);
          this.drawOnMinimap(anchorY, this.imageMapdot0, anchorX);
        }
      }
    }
    for (let i = 0;i < this.npcCount; i++) {
      const npc = this.npcs[this.npcIds[i]];
      if (npc && npc.isVisibleNow() && npc.npcType && npc.npcType.minimap) {
        anchorX = (npc.x / 32 | 0) - (this.localPlayer.x / 32 | 0);
        anchorY = (npc.z / 32 | 0) - (this.localPlayer.z / 32 | 0);
        this.drawOnMinimap(anchorY, this.imageMapdot1, anchorX);
      }
    }
    for (let i = 0;i < this.playerCount; i++) {
      const player = this.players[this.playerIds[i]];
      if (player && player.isVisibleNow() && player.name) {
        anchorX = (player.x / 32 | 0) - (this.localPlayer.x / 32 | 0);
        anchorY = (player.z / 32 | 0) - (this.localPlayer.z / 32 | 0);
        let friend = false;
        const name37 = JString.toBase37(player.name);
        for (let j = 0;j < this.friendCount; j++) {
          if (name37 === this.friendName37[j] && this.friendWorld[j] !== 0) {
            friend = true;
            break;
          }
        }
        if (friend) {
          this.drawOnMinimap(anchorY, this.imageMapdot3, anchorX);
        } else {
          this.drawOnMinimap(anchorY, this.imageMapdot2, anchorX);
        }
      }
    }
    if (this.flagSceneTileX !== 0) {
      anchorX = this.flagSceneTileX * 4 + 2 - (this.localPlayer.x / 32 | 0);
      anchorY = this.flagSceneTileZ * 4 + 2 - (this.localPlayer.z / 32 | 0);
      this.drawOnMinimap(anchorY, this.imageMapflag, anchorX);
    }
    Pix2D.fillRect2d(93, 82, 3, 3, 16777215 /* WHITE */);
    this.areaViewport?.bind();
  }
  drawOnMinimap(dy, image, dx) {
    if (!image) {
      return;
    }
    const angle = this.orbitCameraYaw + this.minimapAnticheatAngle & 2047;
    const distance = dx * dx + dy * dy;
    if (distance > 6400) {
      return;
    }
    let sinAngle = Pix3D.sin[angle];
    let cosAngle = Pix3D.cos[angle];
    sinAngle = sinAngle * 256 / (this.minimapZoom + 256) | 0;
    cosAngle = cosAngle * 256 / (this.minimapZoom + 256) | 0;
    const x = dy * sinAngle + dx * cosAngle >> 16;
    const y = dy * cosAngle - dx * sinAngle >> 16;
    if (distance > 2500 && this.imageMapback) {
      image.drawMasked(x + 94 - (image.cropW / 2 | 0), 83 - y - (image.cropH / 2 | 0), this.imageMapback);
    } else {
      image.draw(x + 94 - (image.cropW / 2 | 0), 83 - y - (image.cropH / 2 | 0));
    }
  }
  createMinimap(level) {
    if (!this.imageMinimap) {
      return;
    }
    const pixels = this.imageMinimap.pixels;
    const length = pixels.length;
    for (let i = 0;i < length; i++) {
      pixels[i] = 0;
    }
    for (let z = 1;z < 104 /* SIZE */ - 1; z++) {
      let offset = (104 /* SIZE */ - 1 - z) * 512 * 4 + 24628;
      for (let x = 1;x < 104 /* SIZE */ - 1; x++) {
        if (this.levelTileFlags && (this.levelTileFlags[level][x][z] & 24) === 0) {
          this.scene?.drawMinimapTile(level, x, z, pixels, offset, 512);
        }
        if (level < 3 && this.levelTileFlags && (this.levelTileFlags[level + 1][x][z] & 8) !== 0) {
          this.scene?.drawMinimapTile(level + 1, x, z, pixels, offset, 512);
        }
        offset += 4;
      }
    }
    const wallRgb = ((Math.random() * 20 | 0) + 238 - 10 << 16) + ((Math.random() * 20 | 0) + 238 - 10 << 8) + (Math.random() * 20 | 0) + 238 - 10;
    const doorRgb = (Math.random() * 20 | 0) + 238 - 10 << 16;
    this.imageMinimap.bind();
    for (let z = 1;z < 104 /* SIZE */ - 1; z++) {
      for (let x = 1;x < 104 /* SIZE */ - 1; x++) {
        if (this.levelTileFlags && (this.levelTileFlags[level][x][z] & 24) === 0) {
          this.drawMinimapLoc(x, z, level, wallRgb, doorRgb);
        }
        if (level < 3 && this.levelTileFlags && (this.levelTileFlags[level + 1][x][z] & 8) !== 0) {
          this.drawMinimapLoc(x, z, level + 1, wallRgb, doorRgb);
        }
      }
    }
    this.areaViewport?.bind();
    this.activeMapFunctionCount = 0;
    for (let x = 0;x < 104 /* SIZE */; x++) {
      for (let z = 0;z < 104 /* SIZE */; z++) {
        let typecode = this.scene?.getGroundDecorTypecode(this.currentLevel, x, z) ?? 0;
        if (typecode === 0) {
          continue;
        }
        typecode = typecode >> 14 & 32767;
        const func = LocType.get(typecode).mapfunction;
        if (func < 0) {
          continue;
        }
        let stx = x;
        let stz = z;
        if (func !== 22 && func !== 29 && func !== 34 && func !== 36 && func !== 46 && func !== 47 && func !== 48) {
          const maxX = 104 /* SIZE */;
          const maxZ = 104 /* SIZE */;
          const collisionmap = this.levelCollisionMap[this.currentLevel];
          if (collisionmap) {
            const flags = collisionmap.flags;
            for (let i = 0;i < 10; i++) {
              const rand = Math.random() * 4 | 0;
              if (rand === 0 && stx > 0 && stx > x - 3 && (flags[CollisionMap.index(stx - 1, stz)] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
                stx--;
              }
              if (rand === 1 && stx < maxX - 1 && stx < x + 3 && (flags[CollisionMap.index(stx + 1, stz)] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
                stx++;
              }
              if (rand === 2 && stz > 0 && stz > z - 3 && (flags[CollisionMap.index(stx, stz - 1)] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
                stz--;
              }
              if (rand === 3 && stz < maxZ - 1 && stz < z + 3 && (flags[CollisionMap.index(stx, stz + 1)] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
                stz++;
              }
            }
          }
        }
        this.activeMapFunctions[this.activeMapFunctionCount] = this.imageMapfunction[func];
        this.activeMapFunctionX[this.activeMapFunctionCount] = stx;
        this.activeMapFunctionZ[this.activeMapFunctionCount] = stz;
        this.activeMapFunctionCount++;
      }
    }
  }
  drawMinimapLoc(tileX, tileZ, level, wallRgb, doorRgb) {
    if (!this.scene || !this.imageMinimap) {
      return;
    }
    let typecode = this.scene.getWallTypecode(level, tileX, tileZ);
    if (typecode !== 0) {
      const info = this.scene.getInfo(level, tileX, tileZ, typecode);
      const angle = info >> 6 & 3;
      const shape = info & 31;
      let rgb = wallRgb;
      if (typecode > 0) {
        rgb = doorRgb;
      }
      const dst = this.imageMinimap.pixels;
      const offset = tileX * 4 + (103 - tileZ) * 512 * 4 + 24624;
      const locId = typecode >> 14 & 32767;
      const loc = LocType.get(locId);
      if (loc.mapscene === -1) {
        if (shape === LocShape.WALL_STRAIGHT.id || shape === LocShape.WALL_L.id) {
          if (angle === 0 /* WEST */) {
            dst[offset] = rgb;
            dst[offset + 512] = rgb;
            dst[offset + 1024] = rgb;
            dst[offset + 1536] = rgb;
          } else if (angle === 1 /* NORTH */) {
            dst[offset] = rgb;
            dst[offset + 1] = rgb;
            dst[offset + 2] = rgb;
            dst[offset + 3] = rgb;
          } else if (angle === 2 /* EAST */) {
            dst[offset + 3] = rgb;
            dst[offset + 3 + 512] = rgb;
            dst[offset + 3 + 1024] = rgb;
            dst[offset + 3 + 1536] = rgb;
          } else if (angle === 3 /* SOUTH */) {
            dst[offset + 1536] = rgb;
            dst[offset + 1536 + 1] = rgb;
            dst[offset + 1536 + 2] = rgb;
            dst[offset + 1536 + 3] = rgb;
          }
        }
        if (shape === LocShape.WALL_SQUARE_CORNER.id) {
          if (angle === 0 /* WEST */) {
            dst[offset] = rgb;
          } else if (angle === 1 /* NORTH */) {
            dst[offset + 3] = rgb;
          } else if (angle === 2 /* EAST */) {
            dst[offset + 3 + 1536] = rgb;
          } else if (angle === 3 /* SOUTH */) {
            dst[offset + 1536] = rgb;
          }
        }
        if (shape === LocShape.WALL_L.id) {
          if (angle === 3 /* SOUTH */) {
            dst[offset] = rgb;
            dst[offset + 512] = rgb;
            dst[offset + 1024] = rgb;
            dst[offset + 1536] = rgb;
          } else if (angle === 0 /* WEST */) {
            dst[offset] = rgb;
            dst[offset + 1] = rgb;
            dst[offset + 2] = rgb;
            dst[offset + 3] = rgb;
          } else if (angle === 1 /* NORTH */) {
            dst[offset + 3] = rgb;
            dst[offset + 3 + 512] = rgb;
            dst[offset + 3 + 1024] = rgb;
            dst[offset + 3 + 1536] = rgb;
          } else if (angle === 2 /* EAST */) {
            dst[offset + 1536] = rgb;
            dst[offset + 1536 + 1] = rgb;
            dst[offset + 1536 + 2] = rgb;
            dst[offset + 1536 + 3] = rgb;
          }
        }
      } else {
        const scene = this.imageMapscene[loc.mapscene];
        if (scene) {
          const offsetX = (loc.width * 4 - scene.width2d) / 2 | 0;
          const offsetY = (loc.length * 4 - scene.height2d) / 2 | 0;
          scene.draw(tileX * 4 + 48 + offsetX, (104 /* SIZE */ - tileZ - loc.length) * 4 + offsetY + 48);
        }
      }
    }
    typecode = this.scene.getLocTypecode(level, tileX, tileZ);
    if (typecode !== 0) {
      const info = this.scene.getInfo(level, tileX, tileZ, typecode);
      const angle = info >> 6 & 3;
      const shape = info & 31;
      const locId = typecode >> 14 & 32767;
      const loc = LocType.get(locId);
      if (loc.mapscene !== -1) {
        const scene = this.imageMapscene[loc.mapscene];
        if (scene) {
          const offsetX = (loc.width * 4 - scene.width2d) / 2 | 0;
          const offsetY = (loc.length * 4 - scene.height2d) / 2 | 0;
          scene.draw(tileX * 4 + 48 + offsetX, (104 /* SIZE */ - tileZ - loc.length) * 4 + offsetY + 48);
        }
      } else if (shape === LocShape.WALL_DIAGONAL.id) {
        let rgb = 15658734;
        if (typecode > 0) {
          rgb = 15597568;
        }
        const dst = this.imageMinimap.pixels;
        const offset = tileX * 4 + (104 /* SIZE */ - 1 - tileZ) * 512 * 4 + 24624;
        if (angle === 0 /* WEST */ || angle === 2 /* EAST */) {
          dst[offset + 1536] = rgb;
          dst[offset + 1024 + 1] = rgb;
          dst[offset + 512 + 2] = rgb;
          dst[offset + 3] = rgb;
        } else {
          dst[offset] = rgb;
          dst[offset + 512 + 1] = rgb;
          dst[offset + 1024 + 2] = rgb;
          dst[offset + 1536 + 3] = rgb;
        }
      }
    }
    typecode = this.scene.getGroundDecorTypecode(level, tileX, tileZ);
    if (typecode !== 0) {
      const loc = LocType.get(typecode >> 14 & 32767);
      if (loc.mapscene !== -1) {
        const scene = this.imageMapscene[loc.mapscene];
        if (scene) {
          const offsetX = (loc.width * 4 - scene.width2d) / 2 | 0;
          const offsetY = (loc.length * 4 - scene.height2d) / 2 | 0;
          scene.draw(tileX * 4 + 48 + offsetX, (104 /* SIZE */ - tileZ - loc.length) * 4 + offsetY + 48);
        }
      }
    }
  }
  drawTooltip() {
    if (this.menuSize < 2 && this.objSelected === 0 && this.spellSelected === 0) {
      return;
    }
    let tooltip;
    if (this.objSelected === 1 && this.menuSize < 2) {
      tooltip = "Use " + this.objSelectedName + " with...";
    } else if (this.spellSelected === 1 && this.menuSize < 2) {
      tooltip = this.spellCaption + "...";
    } else {
      tooltip = this.menuOption[this.menuSize - 1];
    }
    if (this.menuSize > 2) {
      tooltip = tooltip + "@whi@ / " + (this.menuSize - 2) + " more options";
    }
    this.fontBold12?.drawStringTooltip(4, 15, tooltip, 16777215 /* WHITE */, true, this.loopCycle / 1000 | 0);
  }
  drawMenu() {
    const x = this.menuX;
    const y = this.menuY;
    const w = this.menuWidth;
    const h = this.menuHeight;
    const background = 6116423 /* OPTIONS_MENU */;
    Pix2D.fillRect2d(x, y, w, h, background);
    Pix2D.fillRect2d(x + 1, y + 1, w - 2, 16, 0 /* BLACK */);
    Pix2D.drawRect(x + 1, y + 18, w - 2, h - 19, 0 /* BLACK */);
    this.fontBold12?.drawString(x + 3, y + 14, "Choose Option", background);
    let mouseX = this.mouseX;
    let mouseY = this.mouseY;
    if (this.menuArea === 0) {
      mouseX -= 8;
      mouseY -= 11;
    }
    if (this.menuArea === 1) {
      mouseX -= 562;
      mouseY -= 231;
    }
    if (this.menuArea === 2) {
      mouseX -= 22;
      mouseY -= 375;
    }
    for (let i = 0;i < this.menuSize; i++) {
      const optionY = y + (this.menuSize - 1 - i) * 15 + 31;
      let rgb = 16777215 /* WHITE */;
      if (mouseX > x && mouseX < x + w && mouseY > optionY - 13 && mouseY < optionY + 3) {
        rgb = 16776960 /* YELLOW */;
      }
      this.fontBold12?.drawStringTaggable(x + 3, optionY, this.menuOption[i], rgb, true);
    }
  }
  async handleMouseInput() {
    if (this.objDragArea !== 0) {
      return;
    }
    let button = this.mouseClickButton;
    if (this.spellSelected === 1 && this.mouseClickX >= 520 && this.mouseClickY >= 165 && this.mouseClickX <= 788 && this.mouseClickY <= 230) {
      button = 0;
    }
    if (this.menuVisible) {
      if (button !== 1) {
        let x = this.mouseX;
        let y = this.mouseY;
        if (this.menuArea === 0) {
          x -= 8;
          y -= 11;
        } else if (this.menuArea === 1) {
          x -= 562;
          y -= 231;
        } else if (this.menuArea === 2) {
          x -= 22;
          y -= 375;
        }
        if (x < this.menuX - 10 || x > this.menuX + this.menuWidth + 10 || y < this.menuY - 10 || y > this.menuY + this.menuHeight + 10) {
          this.menuVisible = false;
          if (this.menuArea === 1) {
            this.redrawSidebar = true;
          }
          if (this.menuArea === 2) {
            this.redrawChatback = true;
          }
        }
      }
      if (button === 1) {
        const menuX = this.menuX;
        const menuY = this.menuY;
        const menuWidth = this.menuWidth;
        let clickX = this.mouseClickX;
        let clickY = this.mouseClickY;
        if (this.menuArea === 0) {
          clickX -= 8;
          clickY -= 11;
        } else if (this.menuArea === 1) {
          clickX -= 562;
          clickY -= 231;
        } else if (this.menuArea === 2) {
          clickX -= 22;
          clickY -= 375;
        }
        let option = -1;
        for (let i = 0;i < this.menuSize; i++) {
          const optionY = menuY + (this.menuSize - 1 - i) * 15 + 31;
          if (clickX > menuX && clickX < menuX + menuWidth && clickY > optionY - 13 && clickY < optionY + 3) {
            option = i;
          }
        }
        if (option !== -1) {
          await this.useMenuOption(option);
        }
        this.menuVisible = false;
        if (this.menuArea === 1) {
          this.redrawSidebar = true;
        } else if (this.menuArea === 2) {
          this.redrawChatback = true;
        }
      }
    } else {
      if (button === 1 && this.menuSize > 0) {
        const action = this.menuAction[this.menuSize - 1];
        if (action === 602 || action === 596 || action === 22 || action === 892 || action === 415 || action === 405 || action === 38 || action === 422 || action === 478 || action === 347 || action === 188) {
          const slot = this.menuParamB[this.menuSize - 1];
          const comId = this.menuParamC[this.menuSize - 1];
          const com = Component.instances[comId];
          if (com.draggable) {
            this.objGrabThreshold = false;
            this.objDragCycles = 0;
            this.objDragInterfaceId = comId;
            this.objDragSlot = slot;
            this.objDragArea = 2;
            this.objGrabX = this.mouseClickX;
            this.objGrabY = this.mouseClickY;
            if (Component.instances[comId].layer === this.viewportInterfaceId) {
              this.objDragArea = 1;
            }
            if (Component.instances[comId].layer === this.chatInterfaceId) {
              this.objDragArea = 3;
            }
            return;
          }
        }
      }
      if (button === 1 && (this.mouseButtonsOption === 1 || this.isAddFriendOption(this.menuSize - 1)) && this.menuSize > 2) {
        button = 2;
      }
      if (button === 1 && this.menuSize > 0) {
        await this.useMenuOption(this.menuSize - 1);
      }
      if (button !== 2 || this.menuSize <= 0) {
        return;
      }
      this.showContextMenu();
    }
  }
  handleMinimapInput() {
    if (this.mouseClickButton === 1 && this.localPlayer) {
      let x = this.mouseClickX - 21 - 561;
      let y = this.mouseClickY - 9 - 5;
      if (x >= 0 && y >= 0 && x < 146 && y < 151) {
        x -= 73;
        y -= 75;
        const yaw = this.orbitCameraYaw + this.minimapAnticheatAngle & 2047;
        let sinYaw = Pix3D.sin[yaw];
        let cosYaw = Pix3D.cos[yaw];
        sinYaw = sinYaw * (this.minimapZoom + 256) >> 8;
        cosYaw = cosYaw * (this.minimapZoom + 256) >> 8;
        const relX = y * sinYaw + x * cosYaw >> 11;
        const relY = y * cosYaw - x * sinYaw >> 11;
        const tileX = this.localPlayer.x + relX >> 7;
        const tileZ = this.localPlayer.z - relY >> 7;
        if (this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], tileX, tileZ, 1, 0, 0, 0, 0, 0, true)) {
          this.out.p1(x);
          this.out.p1(y);
          this.out.p2(this.orbitCameraYaw);
          this.out.p1(57);
          this.out.p1(this.minimapAnticheatAngle);
          this.out.p1(this.minimapZoom);
          this.out.p1(89);
          this.out.p2(this.localPlayer.x);
          this.out.p2(this.localPlayer.z);
          this.out.p1(this.tryMoveNearest);
          this.out.p1(63);
        }
      }
    }
  }
  isAddFriendOption(option) {
    if (option < 0) {
      return false;
    }
    let action = this.menuAction[option];
    if (action >= 2000) {
      action -= 2000;
    }
    return action === 406;
  }
  async useMenuOption(optionId) {
    if (optionId < 0) {
      return;
    }
    if (this.chatbackInputOpen) {
      this.chatbackInputOpen = false;
      this.redrawChatback = true;
    }
    let action = this.menuAction[optionId];
    const a = this.menuParamA[optionId];
    const b = this.menuParamB[optionId];
    const c = this.menuParamC[optionId];
    if (action >= 2000) {
      action -= 2000;
    }
    if (action === 903 || action === 363) {
      let option = this.menuOption[optionId];
      const tag = option.indexOf("@whi@");
      if (tag !== -1) {
        option = option.substring(tag + 5).trim();
        const name = JString.formatName(JString.fromBase37(JString.toBase37(option)));
        let found = false;
        for (let i = 0;i < this.playerCount; i++) {
          const player = this.players[this.playerIds[i]];
          if (player && player.name && player.name.toLowerCase() === name.toLowerCase() && this.localPlayer) {
            this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], player.routeFlagX[0], player.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
            if (action === 903) {
              this.out.p1isaac(206 /* OPPLAYER4 */);
            } else if (action === 363) {
              this.out.p1isaac(164 /* OPPLAYER1 */);
            }
            this.out.p2(this.playerIds[i]);
            found = true;
            break;
          }
        }
        if (!found) {
          this.addMessage(0, "Unable to find " + name, "");
        }
      }
    } else if (action === 450 && this.interactWithLoc(75 /* OPLOCU */, b, c, a)) {
      this.out.p2(this.objInterface);
      this.out.p2(this.objSelectedSlot);
      this.out.p2(this.objSelectedInterface);
    } else if (action === 405 || action === 38 || action === 422 || action === 478 || action === 347) {
      if (action === 478) {
        if ((b & 3) === 0) {
          Client.oplogic5++;
        }
        if (Client.oplogic5 >= 90) {
          this.out.p1isaac(220 /* ANTICHEAT_OPLOGIC5 */);
        }
        this.out.p1isaac(157 /* OPHELD4 */);
      } else if (action === 347) {
        this.out.p1isaac(211 /* OPHELD5 */);
      } else if (action === 422) {
        this.out.p1isaac(133 /* OPHELD3 */);
      } else if (action === 405) {
        Client.oplogic3 += a;
        if (Client.oplogic3 >= 97) {
          this.out.p1isaac(30 /* ANTICHEAT_OPLOGIC3 */);
          this.out.p3(14953816);
        }
        this.out.p1isaac(195 /* OPHELD1 */);
      } else if (action === 38) {
        this.out.p1isaac(71 /* OPHELD2 */);
      }
      this.out.p2(a);
      this.out.p2(b);
      this.out.p2(c);
      this.selectedCycle = 0;
      this.selectedInterface = c;
      this.selectedItem = b;
      this.selectedArea = 2;
      if (Component.instances[c].layer === this.viewportInterfaceId) {
        this.selectedArea = 1;
      }
      if (Component.instances[c].layer === this.chatInterfaceId) {
        this.selectedArea = 3;
      }
    } else if (action === 728 || action === 542 || action === 6 || action === 963 || action === 245) {
      const npc = this.npcs[a];
      if (npc && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], npc.routeFlagX[0], npc.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        if (action === 542) {
          this.out.p1isaac(8 /* OPNPC2 */);
        } else if (action === 6) {
          if ((a & 3) === 0) {
            Client.oplogic2++;
          }
          if (Client.oplogic2 >= 124) {
            this.out.p1isaac(88 /* ANTICHEAT_OPLOGIC2 */);
            this.out.p4(0);
          }
          this.out.p1isaac(27 /* OPNPC3 */);
        } else if (action === 963) {
          this.out.p1isaac(113 /* OPNPC4 */);
        } else if (action === 728) {
          this.out.p1isaac(194 /* OPNPC1 */);
        } else if (action === 245) {
          if ((a & 3) === 0) {
            Client.oplogic4++;
          }
          if (Client.oplogic4 >= 85) {
            this.out.p1isaac(176 /* ANTICHEAT_OPLOGIC4 */);
            this.out.p2(39596);
          }
          this.out.p1isaac(100 /* OPNPC5 */);
        }
        this.out.p2(a);
      }
    } else if (action === 217) {
      if (this.localPlayer) {
        const success = this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 0, 0, 0, 0, 0, false);
        if (!success) {
          this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 1, 1, 0, 0, 0, false);
        }
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(239 /* OPOBJU */);
        this.out.p2(b + this.sceneBaseTileX);
        this.out.p2(c + this.sceneBaseTileZ);
        this.out.p2(a);
        this.out.p2(this.objInterface);
        this.out.p2(this.objSelectedSlot);
        this.out.p2(this.objSelectedInterface);
      }
    } else if (action === 1175) {
      const locId = a >> 14 & 32767;
      const loc = LocType.get(locId);
      let examine;
      if (!loc.desc) {
        examine = "It's a " + loc.name + ".";
      } else {
        examine = loc.desc;
      }
      this.addMessage(0, examine, "");
    } else if (action === 285) {
      this.interactWithLoc(245 /* OPLOC1 */, b, c, a);
    } else if (action === 881) {
      this.out.p1isaac(130 /* OPHELDU */);
      this.out.p2(a);
      this.out.p2(b);
      this.out.p2(c);
      this.out.p2(this.objInterface);
      this.out.p2(this.objSelectedSlot);
      this.out.p2(this.objSelectedInterface);
      this.selectedCycle = 0;
      this.selectedInterface = c;
      this.selectedItem = b;
      this.selectedArea = 2;
      if (Component.instances[c].layer === this.viewportInterfaceId) {
        this.selectedArea = 1;
      }
      if (Component.instances[c].layer === this.chatInterfaceId) {
        this.selectedArea = 3;
      }
    } else if (action === 391) {
      this.out.p1isaac(48 /* OPHELDT */);
      this.out.p2(a);
      this.out.p2(b);
      this.out.p2(c);
      this.out.p2(this.activeSpellId);
      this.selectedCycle = 0;
      this.selectedInterface = c;
      this.selectedItem = b;
      this.selectedArea = 2;
      if (Component.instances[c].layer === this.viewportInterfaceId) {
        this.selectedArea = 1;
      }
      if (Component.instances[c].layer === this.chatInterfaceId) {
        this.selectedArea = 3;
      }
    } else if (action === 660) {
      if (this.menuVisible) {
        this.scene?.click(b - 8, c - 11);
      } else {
        this.scene?.click(this.mouseClickX - 8, this.mouseClickY - 11);
      }
    } else if (action === 188) {
      this.objSelected = 1;
      this.objSelectedSlot = b;
      this.objSelectedInterface = c;
      this.objInterface = a;
      this.objSelectedName = ObjType.get(a).name;
      this.spellSelected = 0;
      return;
    } else if (action === 44) {
      if (!this.pressedContinueOption) {
        this.out.p1isaac(235 /* RESUME_PAUSEBUTTON */);
        this.out.p2(c);
        this.pressedContinueOption = true;
      }
    } else if (action === 1773) {
      const obj = ObjType.get(a);
      let examine;
      if (c >= 1e5) {
        examine = c + " x " + obj.name;
      } else if (!obj.desc) {
        examine = "It's a " + obj.name + ".";
      } else {
        examine = obj.desc;
      }
      this.addMessage(0, examine, "");
    } else if (action === 900) {
      const npc = this.npcs[a];
      if (npc && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], npc.routeFlagX[0], npc.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(202 /* OPNPCU */);
        this.out.p2(a);
        this.out.p2(this.objInterface);
        this.out.p2(this.objSelectedSlot);
        this.out.p2(this.objSelectedInterface);
      }
    } else if (action === 1373 || action === 1544 || action === 151 || action === 1101) {
      const player = this.players[a];
      if (player && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], player.routeFlagX[0], player.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        if (action === 1101) {
          this.out.p1isaac(164 /* OPPLAYER1 */);
        } else if (action === 151) {
          Client.oplogic8++;
          if (Client.oplogic8 >= 90) {
            this.out.p1isaac(2 /* ANTICHEAT_OPLOGIC8 */);
            this.out.p2(31114);
          }
          this.out.p1isaac(53 /* OPPLAYER2 */);
        } else if (action === 1373) {
          this.out.p1isaac(206 /* OPPLAYER4 */);
        } else if (action === 1544) {
          this.out.p1isaac(185 /* OPPLAYER3 */);
        }
        this.out.p2(a);
      }
    } else if (action === 265) {
      const npc = this.npcs[a];
      if (npc && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], npc.routeFlagX[0], npc.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(134 /* OPNPCT */);
        this.out.p2(a);
        this.out.p2(this.activeSpellId);
      }
    } else if (action === 679) {
      const option = this.menuOption[optionId];
      const tag = option.indexOf("@whi@");
      if (tag !== -1) {
        const name37 = JString.toBase37(option.substring(tag + 5).trim());
        let friend = -1;
        for (let i = 0;i < this.friendCount; i++) {
          if (this.friendName37[i] === name37) {
            friend = i;
            break;
          }
        }
        if (friend !== -1 && this.friendWorld[friend] > 0) {
          this.redrawChatback = true;
          this.chatbackInputOpen = false;
          this.showSocialInput = true;
          this.socialInput = "";
          this.socialAction = 3;
          this.socialName37 = this.friendName37[friend];
          this.socialMessage = "Enter message to send to " + this.friendName[friend];
        }
      }
    } else if (action === 55) {
      if (this.interactWithLoc(9 /* OPLOCT */, b, c, a)) {
        this.out.p2(this.activeSpellId);
      }
    } else if (action === 224 || action === 993 || action === 99 || action === 746 || action === 877) {
      if (this.localPlayer) {
        const success = this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 0, 0, 0, 0, 0, false);
        if (!success) {
          this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 1, 1, 0, 0, 0, false);
        }
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        if (action === 224) {
          this.out.p1isaac(140 /* OPOBJ1 */);
        } else if (action === 746) {
          this.out.p1isaac(178 /* OPOBJ4 */);
        } else if (action === 877) {
          this.out.p1isaac(247 /* OPOBJ5 */);
        } else if (action === 99) {
          this.out.p1isaac(200 /* OPOBJ3 */);
        } else if (action === 993) {
          this.out.p1isaac(40 /* OPOBJ2 */);
        }
        this.out.p2(b + this.sceneBaseTileX);
        this.out.p2(c + this.sceneBaseTileZ);
        this.out.p2(a);
      }
    } else if (action === 1607) {
      const npc = this.npcs[a];
      if (npc && npc.npcType) {
        let examine;
        if (!npc.npcType.desc) {
          examine = "It's a " + npc.npcType.name + ".";
        } else {
          examine = npc.npcType.desc;
        }
        this.addMessage(0, examine, "");
      }
    } else if (action === 504) {
      this.interactWithLoc(172 /* OPLOC2 */, b, c, a);
    } else if (action === 930) {
      const com = Component.instances[c];
      this.spellSelected = 1;
      this.activeSpellId = c;
      this.activeSpellFlags = com.actionTarget;
      this.objSelected = 0;
      let prefix = com.actionVerb;
      if (prefix && prefix.indexOf(" ") !== -1) {
        prefix = prefix.substring(0, prefix.indexOf(" "));
      }
      let suffix = com.actionVerb;
      if (suffix && suffix.indexOf(" ") !== -1) {
        suffix = suffix.substring(suffix.indexOf(" ") + 1);
      }
      this.spellCaption = prefix + " " + com.action + " " + suffix;
      if (this.activeSpellFlags === 16) {
        this.redrawSidebar = true;
        this.selectedTab = 3;
        this.redrawSideicons = true;
      }
      return;
    } else if (action === 951) {
      const com = Component.instances[c];
      let notify = true;
      if (com.clientCode > 0) {
        notify = this.handleInterfaceAction(com);
      }
      if (notify) {
        this.out.p1isaac(155 /* IF_BUTTON */);
        this.out.p2(c);
      }
    } else if (action === 602 || action === 596 || action === 22 || action === 892 || action === 415) {
      if (action === 22) {
        this.out.p1isaac(212 /* INV_BUTTON3 */);
      } else if (action === 415) {
        if ((c & 3) === 0) {
          Client.oplogic7++;
        }
        if (Client.oplogic7 >= 55) {
          this.out.p1isaac(17 /* ANTICHEAT_OPLOGIC7 */);
          this.out.p4(0);
        }
        this.out.p1isaac(6 /* INV_BUTTON5 */);
      } else if (action === 602) {
        this.out.p1isaac(31 /* INV_BUTTON1 */);
      } else if (action === 892) {
        if ((b & 3) === 0) {
          Client.oplogic9++;
        }
        if (Client.oplogic9 >= 130) {
          this.out.p1isaac(238 /* ANTICHEAT_OPLOGIC9 */);
          this.out.p1(177);
        }
        this.out.p1isaac(38 /* INV_BUTTON4 */);
      } else if (action === 596) {
        this.out.p1isaac(59 /* INV_BUTTON2 */);
      }
      this.out.p2(a);
      this.out.p2(b);
      this.out.p2(c);
      this.selectedCycle = 0;
      this.selectedInterface = c;
      this.selectedItem = b;
      this.selectedArea = 2;
      if (Component.instances[c].layer === this.viewportInterfaceId) {
        this.selectedArea = 1;
      }
      if (Component.instances[c].layer === this.chatInterfaceId) {
        this.selectedArea = 3;
      }
    } else if (action === 581) {
      if ((a & 3) === 0) {
        Client.oplogic1++;
      }
      if (Client.oplogic1 >= 99) {
        this.out.p1isaac(7 /* ANTICHEAT_OPLOGIC1 */);
        this.out.p4(0);
      }
      this.interactWithLoc(97 /* OPLOC4 */, b, c, a);
    } else if (action === 965) {
      if (this.localPlayer) {
        const success = this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 0, 0, 0, 0, 0, false);
        if (!success) {
          this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], b, c, 2, 1, 1, 0, 0, 0, false);
        }
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(138 /* OPOBJT */);
        this.out.p2(b + this.sceneBaseTileX);
        this.out.p2(c + this.sceneBaseTileZ);
        this.out.p2(a);
        this.out.p2(this.activeSpellId);
      }
    } else if (action === 1501) {
      Client.oplogic6 += this.sceneBaseTileZ;
      if (Client.oplogic6 >= 92) {
        this.out.p1isaac(66 /* ANTICHEAT_OPLOGIC6 */);
        this.out.p4(0);
      }
      this.interactWithLoc(116 /* OPLOC5 */, b, c, a);
    } else if (action === 364) {
      this.interactWithLoc(96 /* OPLOC3 */, b, c, a);
    } else if (action === 1102) {
      const obj = ObjType.get(a);
      let examine;
      if (!obj.desc) {
        examine = "It's a " + obj.name + ".";
      } else {
        examine = obj.desc;
      }
      this.addMessage(0, examine, "");
    } else if (action === 960) {
      this.out.p1isaac(155 /* IF_BUTTON */);
      this.out.p2(c);
      const com = Component.instances[c];
      if (com.script && com.script[0] && com.script[0][0] === 5) {
        const varp = com.script[0][1];
        if (com.scriptOperand && this.varps[varp] !== com.scriptOperand[0]) {
          this.varps[varp] = com.scriptOperand[0];
          await this.updateVarp(varp);
          this.redrawSidebar = true;
        }
      }
    } else if (action === 34) {
      const option = this.menuOption[optionId];
      const tag = option.indexOf("@whi@");
      if (tag !== -1) {
        this.closeInterfaces();
        this.reportAbuseInput = option.substring(tag + 5).trim();
        this.reportAbuseMuteOption = false;
        for (let i = 0;i < Component.instances.length; i++) {
          if (Component.instances[i] && Component.instances[i].clientCode === 600 /* CC_REPORT_INPUT */) {
            this.reportAbuseInterfaceID = this.viewportInterfaceId = Component.instances[i].layer;
            break;
          }
        }
      }
    } else if (action === 947) {
      this.closeInterfaces();
    } else if (action === 367) {
      const player = this.players[a];
      if (player && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], player.routeFlagX[0], player.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(248 /* OPPLAYERU */);
        this.out.p2(a);
        this.out.p2(this.objInterface);
        this.out.p2(this.objSelectedSlot);
        this.out.p2(this.objSelectedInterface);
      }
    } else if (action === 465) {
      this.out.p1isaac(155 /* IF_BUTTON */);
      this.out.p2(c);
      const com = Component.instances[c];
      if (com.script && com.script[0] && com.script[0][0] === 5) {
        const varp = com.script[0][1];
        this.varps[varp] = 1 - this.varps[varp];
        await this.updateVarp(varp);
        this.redrawSidebar = true;
      }
    } else if (action === 406 || action === 436 || action === 557 || action === 556) {
      const option = this.menuOption[optionId];
      const tag = option.indexOf("@whi@");
      if (tag !== -1) {
        const username = JString.toBase37(option.substring(tag + 5).trim());
        if (action === 406) {
          this.addFriend(username);
        } else if (action === 436) {
          this.addIgnore(username);
        } else if (action === 557) {
          this.removeFriend(username);
        } else if (action === 556) {
          this.removeIgnore(username);
        }
      }
    } else if (action === 651) {
      const player = this.players[a];
      if (player && this.localPlayer) {
        this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], player.routeFlagX[0], player.routeFlagZ[0], 2, 1, 1, 0, 0, 0, false);
        this.crossX = this.mouseClickX;
        this.crossY = this.mouseClickY;
        this.crossMode = 2;
        this.crossCycle = 0;
        this.out.p1isaac(177 /* OPPLAYERT */);
        this.out.p2(a);
        this.out.p2(this.activeSpellId);
      }
    }
    this.objSelected = 0;
    this.spellSelected = 0;
  }
  handleInterfaceAction(com) {
    const clientCode = com.clientCode;
    if (clientCode === 201 /* CC_ADD_FRIEND */) {
      this.redrawChatback = true;
      this.chatbackInputOpen = false;
      this.showSocialInput = true;
      this.socialInput = "";
      this.socialAction = 1;
      this.socialMessage = "Enter name of friend to add to list";
    }
    if (clientCode === 202 /* CC_DEL_FRIEND */) {
      this.redrawChatback = true;
      this.chatbackInputOpen = false;
      this.showSocialInput = true;
      this.socialInput = "";
      this.socialAction = 2;
      this.socialMessage = "Enter name of friend to delete from list";
    }
    if (clientCode === 205 /* CC_LOGOUT */) {
      this.idleTimeout = 250;
      return true;
    }
    if (clientCode === 501 /* CC_ADD_IGNORE */) {
      this.redrawChatback = true;
      this.chatbackInputOpen = false;
      this.showSocialInput = true;
      this.socialInput = "";
      this.socialAction = 4;
      this.socialMessage = "Enter name of player to add to list";
    }
    if (clientCode === 502 /* CC_DEL_IGNORE */) {
      this.redrawChatback = true;
      this.chatbackInputOpen = false;
      this.showSocialInput = true;
      this.socialInput = "";
      this.socialAction = 5;
      this.socialMessage = "Enter name of player to delete from list";
    }
    if (clientCode >= 300 /* CC_CHANGE_HEAD_L */ && clientCode <= 313 /* CC_CHANGE_FEET_R */) {
      const part = (clientCode - 300) / 2 | 0;
      const direction = clientCode & 1;
      let kit = this.designIdentikits[part];
      if (kit !== -1) {
        while (true) {
          if (direction === 0) {
            kit--;
            if (kit < 0) {
              kit = IdkType.totalCount - 1;
            }
          }
          if (direction === 1) {
            kit++;
            if (kit >= IdkType.totalCount) {
              kit = 0;
            }
          }
          if (!IdkType.instances[kit].disableKit && IdkType.instances[kit].bodyPart === part + (this.designGenderMale ? 0 : 7)) {
            this.designIdentikits[part] = kit;
            this.updateDesignModel = true;
            break;
          }
        }
      }
    }
    if (clientCode >= 314 /* CC_RECOLOUR_HAIR_L */ && clientCode <= 323 /* CC_RECOLOUR_SKIN_R */) {
      const part = (clientCode - 314) / 2 | 0;
      const direction = clientCode & 1;
      let color = this.designColors[part];
      if (direction === 0) {
        color--;
        if (color < 0) {
          color = PlayerEntity.DESIGN_IDK_COLORS[part].length - 1;
        }
      }
      if (direction === 1) {
        color++;
        if (color >= PlayerEntity.DESIGN_IDK_COLORS[part].length) {
          color = 0;
        }
      }
      this.designColors[part] = color;
      this.updateDesignModel = true;
    }
    if (clientCode === 324 /* CC_SWITCH_TO_MALE */ && !this.designGenderMale) {
      this.designGenderMale = true;
      this.validateCharacterDesign();
    }
    if (clientCode === 325 /* CC_SWITCH_TO_FEMALE */ && this.designGenderMale) {
      this.designGenderMale = false;
      this.validateCharacterDesign();
    }
    if (clientCode === 326 /* CC_ACCEPT_DESIGN */) {
      this.out.p1isaac(52 /* IF_PLAYERDESIGN */);
      this.out.p1(this.designGenderMale ? 0 : 1);
      for (let i = 0;i < 7; i++) {
        this.out.p1(this.designIdentikits[i]);
      }
      for (let i = 0;i < 5; i++) {
        this.out.p1(this.designColors[i]);
      }
      return true;
    }
    if (clientCode === 613 /* CC_MOD_MUTE */) {
      this.reportAbuseMuteOption = !this.reportAbuseMuteOption;
    }
    if (clientCode >= 601 /* CC_REPORT_RULE1 */ && clientCode <= 612 /* CC_REPORT_RULE12 */) {
      this.closeInterfaces();
      if (this.reportAbuseInput.length > 0) {
        this.out.p1isaac(190 /* REPORT_ABUSE */);
        this.out.p8(JString.toBase37(this.reportAbuseInput));
        this.out.p1(clientCode - 601);
        this.out.p1(this.reportAbuseMuteOption ? 1 : 0);
      }
    }
    return false;
  }
  validateCharacterDesign() {
    this.updateDesignModel = true;
    for (let i = 0;i < 7; i++) {
      this.designIdentikits[i] = -1;
      for (let j = 0;j < IdkType.totalCount; j++) {
        if (!IdkType.instances[j].disableKit && IdkType.instances[j].bodyPart === i + (this.designGenderMale ? 0 : 7)) {
          this.designIdentikits[i] = j;
          break;
        }
      }
    }
  }
  interactWithLoc(opcode, x, z, typecode) {
    if (!this.localPlayer || !this.scene) {
      return false;
    }
    const locId = typecode >> 14 & 32767;
    const info = this.scene.getInfo(this.currentLevel, x, z, typecode);
    if (info === -1) {
      return false;
    }
    const shape = info & 31;
    const angle = info >> 6 & 3;
    if (shape === LocShape.CENTREPIECE_STRAIGHT.id || shape === LocShape.CENTREPIECE_DIAGONAL.id || shape === LocShape.GROUND_DECOR.id) {
      const loc = LocType.get(locId);
      let width;
      let height;
      if (angle === 0 /* WEST */ || angle === 2 /* EAST */) {
        width = loc.width;
        height = loc.length;
      } else {
        width = loc.length;
        height = loc.width;
      }
      let forceapproach = loc.forceapproach;
      if (angle !== 0) {
        forceapproach = (forceapproach << angle & 15) + (forceapproach >> 4 - angle);
      }
      this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], x, z, 2, width, height, 0, 0, forceapproach, false);
    } else {
      this.tryMove(this.localPlayer.routeFlagX[0], this.localPlayer.routeFlagZ[0], x, z, 2, 0, 0, angle, shape + 1, 0, false);
    }
    this.crossX = this.mouseClickX;
    this.crossY = this.mouseClickY;
    this.crossMode = 2;
    this.crossCycle = 0;
    this.out.p1isaac(opcode);
    this.out.p2(x + this.sceneBaseTileX);
    this.out.p2(z + this.sceneBaseTileZ);
    this.out.p2(locId);
    return true;
  }
  handleTabInput() {
    if (this.mouseClickButton === 1) {
      if (this.mouseClickX >= 549 && this.mouseClickX <= 583 && this.mouseClickY >= 195 && this.mouseClickY < 231 && this.tabInterfaceId[0] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 0;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 579 && this.mouseClickX <= 609 && this.mouseClickY >= 194 && this.mouseClickY < 231 && this.tabInterfaceId[1] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 1;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 607 && this.mouseClickX <= 637 && this.mouseClickY >= 194 && this.mouseClickY < 231 && this.tabInterfaceId[2] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 2;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 635 && this.mouseClickX <= 679 && this.mouseClickY >= 194 && this.mouseClickY < 229 && this.tabInterfaceId[3] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 3;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 676 && this.mouseClickX <= 706 && this.mouseClickY >= 194 && this.mouseClickY < 231 && this.tabInterfaceId[4] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 4;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 704 && this.mouseClickX <= 734 && this.mouseClickY >= 194 && this.mouseClickY < 231 && this.tabInterfaceId[5] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 5;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 732 && this.mouseClickX <= 766 && this.mouseClickY >= 195 && this.mouseClickY < 231 && this.tabInterfaceId[6] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 6;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 550 && this.mouseClickX <= 584 && this.mouseClickY >= 492 && this.mouseClickY < 528 && this.tabInterfaceId[7] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 7;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 582 && this.mouseClickX <= 612 && this.mouseClickY >= 492 && this.mouseClickY < 529 && this.tabInterfaceId[8] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 8;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 609 && this.mouseClickX <= 639 && this.mouseClickY >= 492 && this.mouseClickY < 529 && this.tabInterfaceId[9] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 9;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 637 && this.mouseClickX <= 681 && this.mouseClickY >= 493 && this.mouseClickY < 528 && this.tabInterfaceId[10] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 10;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 679 && this.mouseClickX <= 709 && this.mouseClickY >= 492 && this.mouseClickY < 529 && this.tabInterfaceId[11] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 11;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 706 && this.mouseClickX <= 736 && this.mouseClickY >= 492 && this.mouseClickY < 529 && this.tabInterfaceId[12] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 12;
        this.redrawSideicons = true;
      } else if (this.mouseClickX >= 734 && this.mouseClickX <= 768 && this.mouseClickY >= 492 && this.mouseClickY < 528 && this.tabInterfaceId[13] !== -1) {
        this.redrawSidebar = true;
        this.selectedTab = 13;
        this.redrawSideicons = true;
      }
      Client.cyclelogic1++;
      if (Client.cyclelogic1 > 150) {
        Client.cyclelogic1 = 0;
        this.out.p1isaac(233 /* ANTICHEAT_CYCLELOGIC1 */);
        this.out.p1(43);
      }
    }
  }
  async handleInputKey() {
    while (true) {
      let key;
      do {
        while (true) {
          key = this.pollKey();
          if (key === -1) {
            return;
          }
          if (this.viewportInterfaceId !== -1 && this.viewportInterfaceId === this.reportAbuseInterfaceID) {
            if (key === 8 && this.reportAbuseInput.length > 0) {
              this.reportAbuseInput = this.reportAbuseInput.substring(0, this.reportAbuseInput.length - 1);
            }
            break;
          }
          if (this.showSocialInput) {
            if (key >= 32 && key <= 122 && this.socialInput.length < 80) {
              this.socialInput = this.socialInput + String.fromCharCode(key);
              this.redrawChatback = true;
            }
            if (key === 8 && this.socialInput.length > 0) {
              this.socialInput = this.socialInput.substring(0, this.socialInput.length - 1);
              this.redrawChatback = true;
            }
            if (key === 13 || key === 10) {
              this.showSocialInput = false;
              this.redrawChatback = true;
              let username;
              if (this.socialAction === 1) {
                username = JString.toBase37(this.socialInput);
                this.addFriend(username);
              }
              if (this.socialAction === 2 && this.friendCount > 0) {
                username = JString.toBase37(this.socialInput);
                this.removeFriend(username);
              }
              if (this.socialAction === 3 && this.socialInput.length > 0 && this.socialName37) {
                this.out.p1isaac(148 /* MESSAGE_PRIVATE */);
                this.out.p1(0);
                const start = this.out.pos;
                this.out.p8(this.socialName37);
                WordPack.pack(this.out, this.socialInput);
                this.out.psize1(this.out.pos - start);
                this.socialInput = JString.toSentenceCase(this.socialInput);
                this.socialInput = WordFilter.filter(this.socialInput);
                this.addMessage(6, this.socialInput, JString.formatName(JString.fromBase37(this.socialName37)));
                if (this.privateChatSetting === 2) {
                  this.privateChatSetting = 1;
                  this.redrawPrivacySettings = true;
                  this.out.p1isaac(244 /* CHAT_SETMODE */);
                  this.out.p1(this.publicChatSetting);
                  this.out.p1(this.privateChatSetting);
                  this.out.p1(this.tradeChatSetting);
                }
              }
              if (this.socialAction === 4 && this.ignoreCount < 100) {
                username = JString.toBase37(this.socialInput);
                this.addIgnore(username);
              }
              if (this.socialAction === 5 && this.ignoreCount > 0) {
                username = JString.toBase37(this.socialInput);
                this.removeIgnore(username);
              }
            }
          } else if (this.chatbackInputOpen) {
            if (key >= 48 && key <= 57 && this.chatbackInput.length < 10) {
              this.chatbackInput = this.chatbackInput + String.fromCharCode(key);
              this.redrawChatback = true;
            }
            if (key === 8 && this.chatbackInput.length > 0) {
              this.chatbackInput = this.chatbackInput.substring(0, this.chatbackInput.length - 1);
              this.redrawChatback = true;
            }
            if (key === 13 || key === 10) {
              if (this.chatbackInput.length > 0) {
                let value = 0;
                try {
                  value = parseInt(this.chatbackInput, 10);
                } catch (e) {
                }
                this.out.p1isaac(237 /* RESUME_P_COUNTDIALOG */);
                this.out.p4(value);
              }
              this.chatbackInputOpen = false;
              this.redrawChatback = true;
            }
          } else if (this.chatInterfaceId === -1) {
            if (key >= 32 && (key <= 122 || this.chatTyped.startsWith("::") && key <= 126) && this.chatTyped.length < 80) {
              this.chatTyped = this.chatTyped + String.fromCharCode(key);
              this.redrawChatback = true;
            }
            if (key === 8 && this.chatTyped.length > 0) {
              this.chatTyped = this.chatTyped.substring(0, this.chatTyped.length - 1);
              this.redrawChatback = true;
            }
            if ((key === 13 || key === 10) && this.chatTyped.length > 0) {
              if (this.chatTyped.startsWith("::")) {
                if (this.chatTyped === "::fpson") {
                  this.displayFps = true;
                } else if (this.chatTyped === "::fpsoff") {
                  this.displayFps = false;
                } else if (this.chatTyped.startsWith("::fps ")) {
                  try {
                    const desiredFps = parseInt(this.chatTyped.substring(6)) || 50;
                    this.setTargetedFramerate(desiredFps);
                  } catch (e) {
                  }
                } else {
                  this.out.p1isaac(4 /* CLIENT_CHEAT */);
                  this.out.p1(this.chatTyped.length - 1);
                  this.out.pjstr(this.chatTyped.substring(2));
                }
              } else {
                let color = 0;
                if (this.chatTyped.startsWith("yellow:")) {
                  color = 0;
                  this.chatTyped = this.chatTyped.substring(7);
                } else if (this.chatTyped.startsWith("red:")) {
                  color = 1;
                  this.chatTyped = this.chatTyped.substring(4);
                } else if (this.chatTyped.startsWith("green:")) {
                  color = 2;
                  this.chatTyped = this.chatTyped.substring(6);
                } else if (this.chatTyped.startsWith("cyan:")) {
                  color = 3;
                  this.chatTyped = this.chatTyped.substring(5);
                } else if (this.chatTyped.startsWith("purple:")) {
                  color = 4;
                  this.chatTyped = this.chatTyped.substring(7);
                } else if (this.chatTyped.startsWith("white:")) {
                  color = 5;
                  this.chatTyped = this.chatTyped.substring(6);
                } else if (this.chatTyped.startsWith("flash1:")) {
                  color = 6;
                  this.chatTyped = this.chatTyped.substring(7);
                } else if (this.chatTyped.startsWith("flash2:")) {
                  color = 7;
                  this.chatTyped = this.chatTyped.substring(7);
                } else if (this.chatTyped.startsWith("flash3:")) {
                  color = 8;
                  this.chatTyped = this.chatTyped.substring(7);
                } else if (this.chatTyped.startsWith("glow1:")) {
                  color = 9;
                  this.chatTyped = this.chatTyped.substring(6);
                } else if (this.chatTyped.startsWith("glow2:")) {
                  color = 10;
                  this.chatTyped = this.chatTyped.substring(6);
                } else if (this.chatTyped.startsWith("glow3:")) {
                  color = 11;
                  this.chatTyped = this.chatTyped.substring(6);
                }
                let effect = 0;
                if (this.chatTyped.startsWith("wave:")) {
                  effect = 1;
                  this.chatTyped = this.chatTyped.substring(5);
                }
                if (this.chatTyped.startsWith("scroll:")) {
                  effect = 2;
                  this.chatTyped = this.chatTyped.substring(7);
                }
                this.out.p1isaac(158 /* MESSAGE_PUBLIC */);
                this.out.p1(0);
                const start = this.out.pos;
                this.out.p1(color);
                this.out.p1(effect);
                WordPack.pack(this.out, this.chatTyped);
                this.out.psize1(this.out.pos - start);
                this.chatTyped = JString.toSentenceCase(this.chatTyped);
                this.chatTyped = WordFilter.filter(this.chatTyped);
                if (this.localPlayer && this.localPlayer.name) {
                  this.localPlayer.chat = this.chatTyped;
                  this.localPlayer.chatColor = color;
                  this.localPlayer.chatStyle = effect;
                  this.localPlayer.chatTimer = 150;
                  this.addMessage(2, this.localPlayer.chat, this.localPlayer.name);
                }
                if (this.publicChatSetting === 2) {
                  this.publicChatSetting = 3;
                  this.redrawPrivacySettings = true;
                  this.out.p1isaac(244 /* CHAT_SETMODE */);
                  this.out.p1(this.publicChatSetting);
                  this.out.p1(this.privateChatSetting);
                  this.out.p1(this.tradeChatSetting);
                }
              }
              this.chatTyped = "";
              this.redrawChatback = true;
            }
          }
        }
      } while ((key < 97 || key > 122) && (key < 65 || key > 90) && (key < 48 || key > 57) && key !== 32);
      if (this.reportAbuseInput.length < 12) {
        this.reportAbuseInput = this.reportAbuseInput + String.fromCharCode(key);
      }
    }
  }
  handleChatSettingsInput() {
    if (this.mouseClickButton === 1) {
      if (this.mouseClickX >= 8 && this.mouseClickX <= 108 && this.mouseClickY >= 490 && this.mouseClickY <= 522) {
        this.publicChatSetting = (this.publicChatSetting + 1) % 4;
        this.redrawPrivacySettings = true;
        this.redrawChatback = true;
        this.out.p1isaac(244 /* CHAT_SETMODE */);
        this.out.p1(this.publicChatSetting);
        this.out.p1(this.privateChatSetting);
        this.out.p1(this.tradeChatSetting);
      } else if (this.mouseClickX >= 137 && this.mouseClickX <= 237 && this.mouseClickY >= 490 && this.mouseClickY <= 522) {
        this.privateChatSetting = (this.privateChatSetting + 1) % 3;
        this.redrawPrivacySettings = true;
        this.redrawChatback = true;
        this.out.p1isaac(244 /* CHAT_SETMODE */);
        this.out.p1(this.publicChatSetting);
        this.out.p1(this.privateChatSetting);
        this.out.p1(this.tradeChatSetting);
      } else if (this.mouseClickX >= 275 && this.mouseClickX <= 375 && this.mouseClickY >= 490 && this.mouseClickY <= 522) {
        this.tradeChatSetting = (this.tradeChatSetting + 1) % 3;
        this.redrawPrivacySettings = true;
        this.redrawChatback = true;
        this.out.p1isaac(244 /* CHAT_SETMODE */);
        this.out.p1(this.publicChatSetting);
        this.out.p1(this.privateChatSetting);
        this.out.p1(this.tradeChatSetting);
      } else if (this.mouseClickX >= 416 && this.mouseClickX <= 516 && this.mouseClickY >= 490 && this.mouseClickY <= 522) {
        this.closeInterfaces();
        this.reportAbuseInput = "";
        this.reportAbuseMuteOption = false;
        for (let i = 0;i < Component.instances.length; i++) {
          if (Component.instances[i] && Component.instances[i].clientCode === 600) {
            this.reportAbuseInterfaceID = this.viewportInterfaceId = Component.instances[i].layer;
            return;
          }
        }
      }
    }
  }
  handleScrollInput(mouseX, mouseY, scrollableHeight, height, redraw, left, top, component) {
    if (this.scrollGrabbed) {
      this.scrollInputPadding = 32;
    } else {
      this.scrollInputPadding = 0;
    }
    this.scrollGrabbed = false;
    if (mouseX >= left && mouseX < left + 16 && mouseY >= top && mouseY < top + 16) {
      component.scrollPosition -= this.dragCycles * 4;
      if (redraw) {
        this.redrawSidebar = true;
      }
    } else if (mouseX >= left && mouseX < left + 16 && mouseY >= top + height - 16 && mouseY < top + height) {
      component.scrollPosition += this.dragCycles * 4;
      if (redraw) {
        this.redrawSidebar = true;
      }
    } else if (mouseX >= left - this.scrollInputPadding && mouseX < left + this.scrollInputPadding + 16 && mouseY >= top + 16 && mouseY < top + height - 16 && this.dragCycles > 0) {
      let gripSize = (height - 32) * height / scrollableHeight | 0;
      if (gripSize < 8) {
        gripSize = 8;
      }
      const gripY = mouseY - top - (gripSize / 2 | 0) - 16;
      const maxY = height - gripSize - 32;
      component.scrollPosition = (scrollableHeight - height) * gripY / maxY | 0;
      if (redraw) {
        this.redrawSidebar = true;
      }
      this.scrollGrabbed = true;
    }
  }
  prepareGameScreen() {
    if (!this.areaChatback) {
      this.unloadTitle();
      this.drawArea = null;
      this.imageTitle2 = null;
      this.imageTitle3 = null;
      this.imageTitle4 = null;
      this.imageTitle0 = null;
      this.imageTitle1 = null;
      this.imageTitle5 = null;
      this.imageTitle6 = null;
      this.imageTitle7 = null;
      this.imageTitle8 = null;
      this.areaChatback = new PixMap(479, 96);
      this.areaMapback = new PixMap(168, 160);
      Pix2D.clear();
      this.imageMapback?.draw(0, 0);
      this.areaSidebar = new PixMap(190, 261);
      this.areaViewport = new PixMap(512, 334);
      Pix2D.clear();
      this.areaBackbase1 = new PixMap(501, 61);
      this.areaBackbase2 = new PixMap(288, 40);
      this.areaBackhmid1 = new PixMap(269, 66);
      this.redrawTitleBackground = true;
    }
  }
  isFriend(username) {
    if (!username) {
      return false;
    }
    for (let i = 0;i < this.friendCount; i++) {
      if (username.toLowerCase() === this.friendName[i]?.toLowerCase()) {
        return true;
      }
    }
    if (!this.localPlayer) {
      return false;
    }
    return username.toLowerCase() === this.localPlayer.name?.toLowerCase();
  }
  addFriend(username) {
    if (username === 0n) {
      return;
    }
    if (this.friendCount >= 100) {
      this.addMessage(0, "Your friends list is full. Max of 100 hit", "");
      return;
    }
    const displayName = JString.formatName(JString.fromBase37(username));
    for (let i = 0;i < this.friendCount; i++) {
      if (this.friendName37[i] === username) {
        this.addMessage(0, displayName + " is already on your friend list", "");
        return;
      }
    }
    for (let i = 0;i < this.ignoreCount; i++) {
      if (this.ignoreName37[i] === username) {
        this.addMessage(0, "Please remove " + displayName + " from your ignore list first", "");
        return;
      }
    }
    if (!this.localPlayer || !this.localPlayer.name) {
      return;
    }
    if (displayName !== this.localPlayer.name) {
      this.friendName[this.friendCount] = displayName;
      this.friendName37[this.friendCount] = username;
      this.friendWorld[this.friendCount] = 0;
      this.friendCount++;
      this.redrawSidebar = true;
      this.out.p1isaac(118 /* FRIENDLIST_ADD */);
      this.out.p8(username);
    }
  }
  removeFriend(username) {
    if (username === 0n) {
      return;
    }
    for (let i = 0;i < this.friendCount; i++) {
      if (this.friendName37[i] === username) {
        this.friendCount--;
        this.redrawSidebar = true;
        for (let j = i;j < this.friendCount; j++) {
          this.friendName[j] = this.friendName[j + 1];
          this.friendWorld[j] = this.friendWorld[j + 1];
          this.friendName37[j] = this.friendName37[j + 1];
        }
        this.out.p1isaac(11 /* FRIENDLIST_DEL */);
        this.out.p8(username);
        return;
      }
    }
  }
  addIgnore(username) {
    if (username === 0n) {
      return;
    }
    if (this.ignoreCount >= 100) {
      this.addMessage(0, "Your ignore list is full. Max of 100 hit", "");
      return;
    }
    const displayName = JString.formatName(JString.fromBase37(username));
    for (let i = 0;i < this.ignoreCount; i++) {
      if (this.ignoreName37[i] === username) {
        this.addMessage(0, displayName + " is already on your ignore list", "");
        return;
      }
    }
    for (let i = 0;i < this.friendCount; i++) {
      if (this.friendName37[i] === username) {
        this.addMessage(0, "Please remove " + displayName + " from your friend list first", "");
        return;
      }
    }
    this.ignoreName37[this.ignoreCount++] = username;
    this.redrawSidebar = true;
    this.out.p1isaac(79 /* IGNORELIST_ADD */);
    this.out.p8(username);
  }
  removeIgnore(username) {
    if (username === 0n) {
      return;
    }
    for (let i = 0;i < this.ignoreCount; i++) {
      if (this.ignoreName37[i] === username) {
        this.ignoreCount--;
        this.redrawSidebar = true;
        for (let j = i;j < this.ignoreCount; j++) {
          this.ignoreName37[j] = this.ignoreName37[j + 1];
        }
        this.out.p1isaac(171 /* IGNORELIST_DEL */);
        this.out.p8(username);
        return;
      }
    }
  }
  sortObjStacks(x, z) {
    const objStacks = this.objStacks[this.currentLevel][x][z];
    if (!objStacks) {
      this.scene?.removeObjStack(this.currentLevel, x, z);
      return;
    }
    let topCost = -99999999;
    let topObj = null;
    for (let obj = objStacks.head();obj; obj = objStacks.next()) {
      const type2 = ObjType.get(obj.index);
      let cost = type2.cost;
      if (type2.stackable) {
        cost *= obj.count + 1;
      }
      if (cost > topCost) {
        topCost = cost;
        topObj = obj;
      }
    }
    if (!topObj) {
      return;
    }
    objStacks.addHead(topObj);
    let bottomObjId = -1;
    let middleObjId = -1;
    let bottomObjCount = 0;
    let middleObjCount = 0;
    for (let obj = objStacks.head();obj; obj = objStacks.next()) {
      if (obj.index !== topObj.index && bottomObjId === -1) {
        bottomObjId = obj.index;
        bottomObjCount = obj.count;
      }
      if (obj.index !== topObj.index && obj.index !== bottomObjId && middleObjId === -1) {
        middleObjId = obj.index;
        middleObjCount = obj.count;
      }
    }
    let bottomObj = null;
    if (bottomObjId !== -1) {
      bottomObj = ObjType.get(bottomObjId).getInterfaceModel(bottomObjCount);
    }
    let middleObj = null;
    if (middleObjId !== -1) {
      middleObj = ObjType.get(middleObjId).getInterfaceModel(middleObjCount);
    }
    const typecode = x + (z << 7) + 1610612736 | 0;
    const type = ObjType.get(topObj.index);
    this.scene?.addObjStack(x, z, this.getHeightmapY(this.currentLevel, x * 128 + 64, z * 128 + 64), this.currentLevel, typecode, type.getInterfaceModel(topObj.count), middleObj, bottomObj);
  }
  addLoc(level, x, z, id, angle, shape, layer) {
    if (x < 1 || z < 1 || x > 102 || z > 102) {
      return;
    }
    if (Client.lowMemory && level !== this.currentLevel) {
      return;
    }
    if (!this.scene) {
      return;
    }
    let typecode = 0;
    if (layer === 0 /* WALL */) {
      typecode = this.scene.getWallTypecode(level, x, z);
    } else if (layer === 1 /* WALL_DECOR */) {
      typecode = this.scene.getDecorTypecode(level, z, x);
    } else if (layer === 2 /* GROUND */) {
      typecode = this.scene.getLocTypecode(level, x, z);
    } else if (layer === 3 /* GROUND_DECOR */) {
      typecode = this.scene.getGroundDecorTypecode(level, x, z);
    }
    if (typecode !== 0) {
      const otherInfo = this.scene.getInfo(level, x, z, typecode);
      const otherId = typecode >> 14 & 32767;
      const otherShape = otherInfo & 31;
      const otherRotation = otherInfo >> 6;
      if (layer === 0 /* WALL */) {
        this.scene?.removeWall(level, x, z, 1);
        const type = LocType.get(otherId);
        if (type.blockwalk) {
          this.levelCollisionMap[level]?.removeWall(x, z, otherShape, otherRotation, type.blockrange);
        }
      } else if (layer === 1 /* WALL_DECOR */) {
        this.scene?.removeWallDecoration(level, x, z);
      } else if (layer === 2 /* GROUND */) {
        this.scene.removeLoc(level, x, z);
        const type = LocType.get(otherId);
        if (x + type.width > 104 /* SIZE */ - 1 || z + type.width > 104 /* SIZE */ - 1 || x + type.length > 104 /* SIZE */ - 1 || z + type.length > 104 /* SIZE */ - 1) {
          return;
        }
        if (type.blockwalk) {
          this.levelCollisionMap[level]?.removeLoc(x, z, type.width, type.length, otherRotation, type.blockrange);
        }
      } else if (layer === 3 /* GROUND_DECOR */) {
        this.scene?.removeGroundDecoration(level, x, z);
        const type = LocType.get(otherId);
        if (type.blockwalk && type.locActive) {
          this.levelCollisionMap[level]?.removeFloor(x, z);
        }
      }
    }
    if (id >= 0) {
      let tileLevel = level;
      if (this.levelTileFlags && level < 3 && (this.levelTileFlags[1][x][z] & 2) === 2) {
        tileLevel = level + 1;
      }
      if (this.levelHeightmap) {
        World.addLoc(level, x, z, this.scene, this.levelHeightmap, this.locList, this.levelCollisionMap[level], id, shape, angle, tileLevel);
      }
    }
  }
  closeInterfaces() {
    this.out.p1isaac(231 /* CLOSE_MODAL */);
    if (this.sidebarInterfaceId !== -1) {
      this.sidebarInterfaceId = -1;
      this.redrawSidebar = true;
      this.pressedContinueOption = false;
      this.redrawSideicons = true;
    }
    if (this.chatInterfaceId !== -1) {
      this.chatInterfaceId = -1;
      this.redrawChatback = true;
      this.pressedContinueOption = false;
    }
    this.viewportInterfaceId = -1;
  }
  async tryReconnect() {
    if (this.idleTimeout > 0) {
      await this.logout();
    } else {
      this.areaViewport?.bind();
      this.fontPlain12?.drawStringCenter(257, 144, "Connection lost", 0 /* BLACK */);
      this.fontPlain12?.drawStringCenter(256, 143, "Connection lost", 16777215 /* WHITE */);
      this.fontPlain12?.drawStringCenter(257, 159, "Please wait - attempting to reestablish", 0 /* BLACK */);
      this.fontPlain12?.drawStringCenter(256, 158, "Please wait - attempting to reestablish", 16777215 /* WHITE */);
      this.areaViewport?.draw(8, 11);
      this.flagSceneTileX = 0;
      this.netStream?.close();
      this.ingame = false;
      await this.tryLogin(this.usernameInput, this.passwordInput, true);
      if (!this.ingame) {
        await this.logout();
      }
    }
  }
  async logout() {
    if (this.netStream) {
      this.netStream.close();
    }
    this.netStream = null;
    this.ingame = false;
    this.titleScreenState = 0;
    this.usernameInput = "";
    this.passwordInput = "";
    InputTracking.setDisabled();
    this.clearCaches();
    this.scene?.reset();
    for (let level = 0;level < 4 /* LEVELS */; level++) {
      this.levelCollisionMap[level]?.reset();
    }
    stopMidi(false);
    this.currentMidi = null;
    this.nextMusicDelay = 0;
  }
  async read() {
    if (!this.netStream) {
      return false;
    }
    try {
      let available = this.netStream.available;
      if (available === 0) {
        return false;
      }
      if (this.inPacketType === -1) {
        await this.netStream.readBytes(this.in.data, 0, 1);
        this.inPacketType = this.in.data[0] & 255;
        if (this.randomIn) {
          this.inPacketType = this.inPacketType - this.randomIn.nextInt & 255;
        }
        this.inPacketSize = ServerProtSizes[this.inPacketType];
        available--;
      }
      if (this.inPacketSize === -1) {
        if (available <= 0) {
          return false;
        }
        await this.netStream.readBytes(this.in.data, 0, 1);
        this.inPacketSize = this.in.data[0] & 255;
        available--;
      }
      if (this.inPacketSize === -2) {
        if (available <= 1) {
          return false;
        }
        await this.netStream.readBytes(this.in.data, 0, 2);
        this.in.pos = 0;
        this.inPacketSize = this.in.g2();
        available -= 2;
      }
      if (available < this.inPacketSize) {
        return false;
      }
      this.in.pos = 0;
      await this.netStream.readBytes(this.in.data, 0, this.inPacketSize);
      this.idleNetCycles = 0;
      this.lastPacketType2 = this.lastPacketType1;
      this.lastPacketType1 = this.lastPacketType0;
      this.lastPacketType0 = this.inPacketType;
      if (this.inPacketType === 150 /* VARP_SMALL */) {
        const varp = this.in.g2();
        const value = this.in.g1b();
        this.varCache[varp] = value;
        if (this.varps[varp] !== value) {
          this.varps[varp] = value;
          await this.updateVarp(varp);
          this.redrawSidebar = true;
          if (this.stickyChatInterfaceId !== -1) {
            this.redrawChatback = true;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 152 /* UPDATE_FRIENDLIST */) {
        const username = this.in.g8();
        const world = this.in.g1();
        let displayName = JString.formatName(JString.fromBase37(username));
        for (let i = 0;i < this.friendCount; i++) {
          if (username === this.friendName37[i]) {
            if (this.friendWorld[i] !== world) {
              this.friendWorld[i] = world;
              this.redrawSidebar = true;
              if (world > 0) {
                this.addMessage(5, displayName + " has logged in.", "");
              }
              if (world === 0) {
                this.addMessage(5, displayName + " has logged out.", "");
              }
            }
            displayName = null;
            break;
          }
        }
        if (displayName && this.friendCount < 100) {
          this.friendName37[this.friendCount] = username;
          this.friendName[this.friendCount] = displayName;
          this.friendWorld[this.friendCount] = world;
          this.friendCount++;
          this.redrawSidebar = true;
        }
        let sorted = false;
        while (!sorted) {
          sorted = true;
          for (let i = 0;i < this.friendCount - 1; i++) {
            if (this.friendWorld[i] !== Client.nodeId && this.friendWorld[i + 1] === Client.nodeId || this.friendWorld[i] === 0 && this.friendWorld[i + 1] !== 0) {
              const oldWorld = this.friendWorld[i];
              this.friendWorld[i] = this.friendWorld[i + 1];
              this.friendWorld[i + 1] = oldWorld;
              const oldName = this.friendName[i];
              this.friendName[i] = this.friendName[i + 1];
              this.friendName[i + 1] = oldName;
              const oldName37 = this.friendName37[i];
              this.friendName37[i] = this.friendName37[i + 1];
              this.friendName37[i + 1] = oldName37;
              this.redrawSidebar = true;
              sorted = false;
            }
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 43 /* UPDATE_REBOOT_TIMER */) {
        this.systemUpdateTimer = this.in.g2() * 30;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 80 /* DATA_LAND_DONE */) {
        const x = this.in.g1();
        const z = this.in.g1();
        if (this.sceneMapIndex && this.sceneMapLandData && this.sceneMapLandReady) {
          let index = -1;
          for (let i = 0;i < this.sceneMapIndex.length; i++) {
            if (this.sceneMapIndex[i] === (x << 8) + z) {
              index = i;
            }
          }
          if (index !== -1) {
            this.db?.cachesave(`m${x}_${z}`, this.sceneMapLandData[index]);
            this.sceneMapLandReady[index] = true;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 1 /* NPC_INFO */) {
        this.readNpcInfo(this.in, this.inPacketSize);
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 237 /* REBUILD_NORMAL */) {
        const zoneX = this.in.g2();
        const zoneZ = this.in.g2();
        if (this.sceneCenterZoneX === zoneX && this.sceneCenterZoneZ === zoneZ && this.sceneState !== 0) {
          this.inPacketType = -1;
          return true;
        }
        this.sceneCenterZoneX = zoneX;
        this.sceneCenterZoneZ = zoneZ;
        this.sceneBaseTileX = (this.sceneCenterZoneX - 6) * 8;
        this.sceneBaseTileZ = (this.sceneCenterZoneZ - 6) * 8;
        this.sceneState = 1;
        this.areaViewport?.bind();
        this.fontPlain12?.drawStringCenter(257, 151, "Loading - please wait.", 0 /* BLACK */);
        this.fontPlain12?.drawStringCenter(256, 150, "Loading - please wait.", 16777215 /* WHITE */);
        this.areaViewport?.draw(8, 11);
        const regions = (this.inPacketSize - 2) / 10 | 0;
        this.sceneMapLandData = new TypedArray1d(regions, null);
        this.sceneMapLandReady = new TypedArray1d(regions, false);
        this.sceneMapLocData = new TypedArray1d(regions, null);
        this.sceneMapLocReady = new TypedArray1d(regions, false);
        this.sceneMapIndex = new Int32Array(regions);
        this.out.p1isaac(150 /* REBUILD_GETMAPS */);
        this.out.p1(0);
        let mapCount = 0;
        for (let i = 0;i < regions; i++) {
          const mapsquareX = this.in.g1();
          const mapsquareZ = this.in.g1();
          const landCrc = this.in.g4();
          const locCrc = this.in.g4();
          this.sceneMapIndex[i] = (mapsquareX << 8) + mapsquareZ;
          let data;
          if (landCrc !== 0) {
            data = await this.db?.cacheload(`m${mapsquareX}_${mapsquareZ}`);
            if (data && Packet.crc32(data) !== landCrc) {
              data = undefined;
            }
            if (!data) {
              this.out.p1(0);
              this.out.p1(mapsquareX);
              this.out.p1(mapsquareZ);
              mapCount += 3;
            } else {
              this.sceneMapLandData[i] = data;
              this.sceneMapLandReady[i] = true;
            }
          } else {
            this.sceneMapLandReady[i] = true;
          }
          if (locCrc !== 0) {
            data = await this.db?.cacheload(`l${mapsquareX}_${mapsquareZ}`);
            if (data && Packet.crc32(data) !== locCrc) {
              data = undefined;
            }
            if (!data) {
              this.out.p1(1);
              this.out.p1(mapsquareX);
              this.out.p1(mapsquareZ);
              mapCount += 3;
            } else {
              this.sceneMapLocData[i] = data;
              this.sceneMapLocReady[i] = true;
            }
          } else {
            this.sceneMapLocReady[i] = true;
          }
        }
        this.out.psize1(mapCount);
        this.areaViewport?.bind();
        if (this.sceneState === 0) {
          this.fontPlain12?.drawStringCenter(257, 166, "Map area updated since last visit, so load will take longer this time only", 0 /* BLACK */);
          this.fontPlain12?.drawStringCenter(256, 165, "Map area updated since last visit, so load will take longer this time only", 16777215 /* WHITE */);
        }
        this.areaViewport?.draw(8, 11);
        const dx = this.sceneBaseTileX - this.scenePrevBaseTileX;
        const dz = this.sceneBaseTileZ - this.scenePrevBaseTileZ;
        this.scenePrevBaseTileX = this.sceneBaseTileX;
        this.scenePrevBaseTileZ = this.sceneBaseTileZ;
        for (let i = 0;i < 8192; i++) {
          const npc = this.npcs[i];
          if (npc) {
            for (let j = 0;j < 10; j++) {
              npc.routeFlagX[j] -= dx;
              npc.routeFlagZ[j] -= dz;
            }
            npc.x -= dx * 128;
            npc.z -= dz * 128;
          }
        }
        for (let i = 0;i < 2048 /* MAX_PLAYER_COUNT */; i++) {
          const player = this.players[i];
          if (player) {
            for (let j = 0;j < 10; j++) {
              player.routeFlagX[j] -= dx;
              player.routeFlagZ[j] -= dz;
            }
            player.x -= dx * 128;
            player.z -= dz * 128;
          }
        }
        this.sceneAwaitingSync = true;
        let startTileX = 0;
        let endTileX = 104 /* SIZE */;
        let dirX = 1;
        if (dx < 0) {
          startTileX = 104 /* SIZE */ - 1;
          endTileX = -1;
          dirX = -1;
        }
        let startTileZ = 0;
        let endTileZ = 104 /* SIZE */;
        let dirZ = 1;
        if (dz < 0) {
          startTileZ = 104 /* SIZE */ - 1;
          endTileZ = -1;
          dirZ = -1;
        }
        for (let x = startTileX;x !== endTileX; x += dirX) {
          for (let z = startTileZ;z !== endTileZ; z += dirZ) {
            const lastX = x + dx;
            const lastZ = z + dz;
            for (let level = 0;level < 4 /* LEVELS */; level++) {
              if (lastX >= 0 && lastZ >= 0 && lastX < 104 /* SIZE */ && lastZ < 104 /* SIZE */) {
                this.objStacks[level][x][z] = this.objStacks[level][lastX][lastZ];
              } else {
                this.objStacks[level][x][z] = null;
              }
            }
          }
        }
        for (let loc = this.addedLocs.head();loc; loc = this.addedLocs.next()) {
          loc.x -= dx;
          loc.z -= dz;
          if (loc.x < 0 || loc.z < 0 || loc.x >= 104 /* SIZE */ || loc.z >= 104 /* SIZE */) {
            loc.unlink();
          }
        }
        if (this.flagSceneTileX !== 0) {
          this.flagSceneTileX -= dx;
          this.flagSceneTileZ -= dz;
        }
        this.cutscene = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 197 /* IF_SETPLAYERHEAD */) {
        Component.instances[this.in.g2()].model = this.localPlayer?.getHeadModel() || null;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 25 /* HINT_ARROW */) {
        this.hintType = this.in.g1();
        if (this.hintType === 1) {
          this.hintNpc = this.in.g2();
        }
        if (this.hintType >= 2 && this.hintType <= 6) {
          if (this.hintType === 2) {
            this.hintOffsetX = 64;
            this.hintOffsetZ = 64;
          }
          if (this.hintType === 3) {
            this.hintOffsetX = 0;
            this.hintOffsetZ = 64;
          }
          if (this.hintType === 4) {
            this.hintOffsetX = 128;
            this.hintOffsetZ = 64;
          }
          if (this.hintType === 5) {
            this.hintOffsetX = 64;
            this.hintOffsetZ = 0;
          }
          if (this.hintType === 6) {
            this.hintOffsetX = 64;
            this.hintOffsetZ = 128;
          }
          this.hintType = 2;
          this.hintTileX = this.in.g2();
          this.hintTileZ = this.in.g2();
          this.hintHeight = this.in.g1();
        }
        if (this.hintType === 10) {
          this.hintPlayer = this.in.g2();
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 54 /* MIDI_SONG */) {
        const name = this.in.gjstr();
        const crc = this.in.g4();
        const length = this.in.g4();
        if (!(name === this.currentMidi) && this.midiActive && !Client.lowMemory) {
          await this.setMidi(name, crc, length, true);
        }
        this.currentMidi = name;
        this.midiCrc = crc;
        this.midiSize = length;
        this.nextMusicDelay = 0;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 142 /* LOGOUT */) {
        await this.logout();
        this.inPacketType = -1;
        return false;
      }
      if (this.inPacketType === 20 /* DATA_LOC_DONE */) {
        const x = this.in.g1();
        const z = this.in.g1();
        if (this.sceneMapIndex && this.sceneMapLocData && this.sceneMapLocReady) {
          let index = -1;
          for (let i = 0;i < this.sceneMapIndex.length; i++) {
            if (this.sceneMapIndex[i] === (x << 8) + z) {
              index = i;
            }
          }
          if (index !== -1) {
            this.db?.cachesave(`l${x}_${z}`, this.sceneMapLocData[index]);
            this.sceneMapLocReady[index] = true;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 19 /* UNSET_MAP_FLAG */) {
        this.flagSceneTileX = 0;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 139 /* UPDATE_PID */) {
        this.localPid = this.in.g2();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 151 /* OBJ_COUNT */ || this.inPacketType === 23 /* LOC_MERGE */ || this.inPacketType === 50 /* OBJ_REVEAL */ || this.inPacketType === 191 /* MAP_ANIM */ || this.inPacketType === 69 /* MAP_PROJANIM */ || this.inPacketType === 49 /* OBJ_DEL */ || this.inPacketType === 223 /* OBJ_ADD */ || this.inPacketType === 42 /* LOC_ANIM */ || this.inPacketType === 76 /* LOC_DEL */ || this.inPacketType === 59 /* LOC_ADD_CHANGE */) {
        this.readZonePacket(this.in, this.inPacketType);
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 28 /* IF_OPENMAINSIDEMODAL */) {
        const main = this.in.g2();
        const side = this.in.g2();
        if (this.chatInterfaceId !== -1) {
          this.chatInterfaceId = -1;
          this.redrawChatback = true;
        }
        if (this.chatbackInputOpen) {
          this.chatbackInputOpen = false;
          this.redrawChatback = true;
        }
        this.viewportInterfaceId = main;
        this.sidebarInterfaceId = side;
        this.redrawSidebar = true;
        this.redrawSideicons = true;
        this.pressedContinueOption = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 175 /* VARP_LARGE */) {
        const varp = this.in.g2();
        const value = this.in.g4();
        this.varCache[varp] = value;
        if (this.varps[varp] !== value) {
          this.varps[varp] = value;
          await this.updateVarp(varp);
          this.redrawSidebar = true;
          if (this.stickyChatInterfaceId !== -1) {
            this.redrawChatback = true;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 146 /* IF_SETANIM */) {
        const com = this.in.g2();
        Component.instances[com].anim = this.in.g2();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 167 /* IF_OPENSIDEOVERLAY */) {
        let com = this.in.g2();
        const tab = this.in.g1();
        if (com === 65535) {
          com = -1;
        }
        this.tabInterfaceId[tab] = com;
        this.redrawSidebar = true;
        this.redrawSideicons = true;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 220 /* DATA_LOC */) {
        const x = this.in.g1();
        const z = this.in.g1();
        const off = this.in.g2();
        const length = this.in.g2();
        let index = -1;
        if (this.sceneMapIndex) {
          for (let i = 0;i < this.sceneMapIndex.length; i++) {
            if (this.sceneMapIndex[i] === (x << 8) + z) {
              index = i;
            }
          }
        }
        if (index !== -1 && this.sceneMapLocData) {
          if (!this.sceneMapLocData[index] || this.sceneMapLocData[index]?.length !== length) {
            this.sceneMapLocData[index] = new Uint8Array(length);
          }
          const data = this.sceneMapLocData[index];
          if (data) {
            this.in.gdata(this.inPacketSize - 6, off, data);
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 133 /* FINISH_TRACKING */) {
        const tracking = InputTracking.stop();
        if (tracking) {
          this.out.p1isaac(81 /* EVENT_TRACKING */);
          this.out.p2(tracking.pos);
          this.out.pdata(tracking.data, tracking.pos, 0);
          tracking.release();
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 98 /* UPDATE_INV_FULL */) {
        this.redrawSidebar = true;
        const com = this.in.g2();
        const inv = Component.instances[com];
        const size = this.in.g1();
        if (inv.invSlotObjId && inv.invSlotObjCount) {
          for (let i = 0;i < size; i++) {
            inv.invSlotObjId[i] = this.in.g2();
            let count = this.in.g1();
            if (count === 255) {
              count = this.in.g4();
            }
            inv.invSlotObjCount[i] = count;
          }
          for (let i = size;i < inv.invSlotObjId.length; i++) {
            inv.invSlotObjId[i] = 0;
            inv.invSlotObjCount[i] = 0;
          }
        } else {
          for (let i = 0;i < size; i++) {
            this.in.g2();
            if (this.in.g1() === 255) {
              this.in.g4();
            }
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 226 /* ENABLE_TRACKING */) {
        InputTracking.setEnabled();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 243 /* P_COUNTDIALOG */) {
        this.showSocialInput = false;
        this.chatbackInputOpen = true;
        this.chatbackInput = "";
        this.redrawChatback = true;
        this.inPacketType = -1;
        if (this.isMobile) {
          MobileKeyboard2.show();
        }
        return true;
      }
      if (this.inPacketType === 15 /* UPDATE_INV_STOP_TRANSMIT */) {
        const inv = Component.instances[this.in.g2()];
        if (inv.invSlotObjId) {
          for (let i = 0;i < inv.invSlotObjId.length; i++) {
            inv.invSlotObjId[i] = -1;
            inv.invSlotObjId[i] = 0;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 140 /* LAST_LOGIN_INFO */) {
        this.lastAddress = this.in.g4();
        this.daysSinceLastLogin = this.in.g2();
        this.daysSinceRecoveriesChanged = this.in.g1();
        this.unreadMessages = this.in.g2();
        if (this.lastAddress !== 0 && this.viewportInterfaceId === -1) {
          this.closeInterfaces();
          let contentType = 650;
          if (this.daysSinceRecoveriesChanged !== 201) {
            contentType = 655;
          }
          this.reportAbuseInput = "";
          this.reportAbuseMuteOption = false;
          for (let i = 0;i < Component.instances.length; i++) {
            if (Component.instances[i] && Component.instances[i].clientCode === contentType) {
              this.viewportInterfaceId = Component.instances[i].layer;
              break;
            }
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 126 /* TUTORIAL_FLASHSIDE */) {
        this.flashingTab = this.in.g1();
        if (this.flashingTab === this.selectedTab) {
          if (this.flashingTab === 3) {
            this.selectedTab = 1;
          } else {
            this.selectedTab = 3;
          }
          this.redrawSidebar = true;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 212 /* MIDI_JINGLE */) {
        if (this.midiActive && !Client.lowMemory) {
          const delay = this.in.g2();
          const data = this.in.data.subarray(this.in.pos, this.inPacketSize);
          const uncompressed = BZip22.decompress(data, -1, false, true);
          playMidi(uncompressed, this.midiVolume, false);
          this.nextMusicDelay = delay;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 254 /* SET_MULTIWAY */) {
        this.inMultizone = this.in.g1();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 12 /* SYNTH_SOUND */) {
        const id = this.in.g2();
        const loop = this.in.g1();
        const delay = this.in.g2();
        if (this.waveEnabled && !Client.lowMemory && this.waveCount < 50) {
          this.waveIds[this.waveCount] = id;
          this.waveLoops[this.waveCount] = loop;
          this.waveDelay[this.waveCount] = delay + Wave.delays[id];
          this.waveCount++;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 204 /* IF_SETNPCHEAD */) {
        const com = this.in.g2();
        const npcId = this.in.g2();
        const npc = NpcType.get(npcId);
        Component.instances[com].model = npc.getHeadModel();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 7 /* UPDATE_ZONE_PARTIAL_FOLLOWS */) {
        this.baseX = this.in.g1();
        this.baseZ = this.in.g1();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 103 /* IF_SETRECOL */) {
        const com = this.in.g2();
        const src = this.in.g2();
        const dst = this.in.g2();
        const inter = Component.instances[com];
        const model = inter.model;
        model?.recolor(src, dst);
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 32 /* CHAT_FILTER_SETTINGS */) {
        this.publicChatSetting = this.in.g1();
        this.privateChatSetting = this.in.g1();
        this.tradeChatSetting = this.in.g1();
        this.redrawPrivacySettings = true;
        this.redrawChatback = true;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 195 /* IF_OPENSIDEMODAL */) {
        const com = this.in.g2();
        this.resetInterfaceAnimation(com);
        if (this.chatInterfaceId !== -1) {
          this.chatInterfaceId = -1;
          this.redrawChatback = true;
        }
        if (this.chatbackInputOpen) {
          this.chatbackInputOpen = false;
          this.redrawChatback = true;
        }
        this.sidebarInterfaceId = com;
        this.redrawSidebar = true;
        this.redrawSideicons = true;
        this.viewportInterfaceId = -1;
        this.pressedContinueOption = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 14 /* IF_OPENCHATMODAL */) {
        const com = this.in.g2();
        this.resetInterfaceAnimation(com);
        if (this.sidebarInterfaceId !== -1) {
          this.sidebarInterfaceId = -1;
          this.redrawSidebar = true;
          this.redrawSideicons = true;
        }
        this.chatInterfaceId = com;
        this.redrawChatback = true;
        this.viewportInterfaceId = -1;
        this.pressedContinueOption = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 209 /* IF_SETPOSITION */) {
        const com = this.in.g2();
        const x = this.in.g2b();
        const z = this.in.g2b();
        const inter = Component.instances[com];
        inter.x = x;
        inter.y = z;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 3 /* CAM_MOVETO */) {
        this.cutscene = true;
        this.cutsceneSrcLocalTileX = this.in.g1();
        this.cutsceneSrcLocalTileZ = this.in.g1();
        this.cutsceneSrcHeight = this.in.g2();
        this.cutsceneMoveSpeed = this.in.g1();
        this.cutsceneMoveAcceleration = this.in.g1();
        if (this.cutsceneMoveAcceleration >= 100) {
          this.cameraX = this.cutsceneSrcLocalTileX * 128 + 64;
          this.cameraZ = this.cutsceneSrcLocalTileZ * 128 + 64;
          this.cameraY = this.getHeightmapY(this.currentLevel, this.cutsceneSrcLocalTileX, this.cutsceneSrcLocalTileZ) - this.cutsceneSrcHeight;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 135 /* UPDATE_ZONE_FULL_FOLLOWS */) {
        this.baseX = this.in.g1();
        this.baseZ = this.in.g1();
        for (let x = this.baseX;x < this.baseX + 8; x++) {
          for (let z = this.baseZ;z < this.baseZ + 8; z++) {
            if (this.objStacks[this.currentLevel][x][z]) {
              this.objStacks[this.currentLevel][x][z] = null;
              this.sortObjStacks(x, z);
            }
          }
        }
        for (let loc = this.addedLocs.head();loc; loc = this.addedLocs.next()) {
          if (loc.x >= this.baseX && loc.x < this.baseX + 8 && loc.z >= this.baseZ && loc.z < this.baseZ + 8 && loc.plane === this.currentLevel) {
            loc.duration = 0;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 132 /* DATA_LAND */) {
        const x = this.in.g1();
        const z = this.in.g1();
        const off = this.in.g2();
        const length = this.in.g2();
        let index = -1;
        if (this.sceneMapIndex) {
          for (let i = 0;i < this.sceneMapIndex.length; i++) {
            if (this.sceneMapIndex[i] === (x << 8) + z) {
              index = i;
            }
          }
        }
        if (index !== -1 && this.sceneMapLandData) {
          if (!this.sceneMapLandData[index] || this.sceneMapLandData[index]?.length !== length) {
            this.sceneMapLandData[index] = new Uint8Array(length);
          }
          const data = this.sceneMapLandData[index];
          if (data) {
            this.in.gdata(this.inPacketSize - 6, off, data);
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 41 /* MESSAGE_PRIVATE */) {
        const from = this.in.g8();
        const messageId = this.in.g4();
        const staffModLevel = this.in.g1();
        let ignored = false;
        for (let i = 0;i < 100; i++) {
          if (this.messageTextIds[i] === messageId) {
            ignored = true;
            break;
          }
        }
        if (staffModLevel <= 1) {
          for (let i = 0;i < this.ignoreCount; i++) {
            if (this.ignoreName37[i] === from) {
              ignored = true;
              break;
            }
          }
        }
        if (!ignored && this.overrideChat === 0) {
          try {
            this.messageTextIds[this.privateMessageCount] = messageId;
            this.privateMessageCount = (this.privateMessageCount + 1) % 100;
            const uncompressed = WordPack.unpack(this.in, this.inPacketSize - 13);
            const filtered = WordFilter.filter(uncompressed);
            if (staffModLevel > 1) {
              this.addMessage(7, filtered, JString.formatName(JString.fromBase37(from)));
            } else {
              this.addMessage(3, filtered, JString.formatName(JString.fromBase37(from)));
            }
          } catch (e) {
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 193 /* RESET_CLIENT_VARCACHE */) {
        for (let i = 0;i < this.varps.length; i++) {
          if (this.varps[i] !== this.varCache[i]) {
            this.varps[i] = this.varCache[i];
            await this.updateVarp(i);
            this.redrawSidebar = true;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 87 /* IF_SETMODEL */) {
        const com = this.in.g2();
        const model = this.in.g2();
        Component.instances[com].model = Model.model(model);
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 185 /* TUTORIAL_OPENCHAT */) {
        this.stickyChatInterfaceId = this.in.g2b();
        this.redrawChatback = true;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 68 /* UPDATE_RUNENERGY */) {
        if (this.selectedTab === 12) {
          this.redrawSidebar = true;
        }
        this.energy = this.in.g1();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 74 /* CAM_LOOKAT */) {
        this.cutscene = true;
        this.cutsceneDstLocalTileX = this.in.g1();
        this.cutsceneDstLocalTileZ = this.in.g1();
        this.cutsceneDstHeight = this.in.g2();
        this.cutsceneRotateSpeed = this.in.g1();
        this.cutsceneRotateAcceleration = this.in.g1();
        if (this.cutsceneRotateAcceleration >= 100) {
          const sceneX = this.cutsceneDstLocalTileX * 128 + 64;
          const sceneZ = this.cutsceneDstLocalTileZ * 128 + 64;
          const sceneY = this.getHeightmapY(this.currentLevel, this.cutsceneDstLocalTileX, this.cutsceneDstLocalTileZ) - this.cutsceneDstHeight;
          const deltaX = sceneX - this.cameraX;
          const deltaY = sceneY - this.cameraY;
          const deltaZ = sceneZ - this.cameraZ;
          const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ) | 0;
          this.cameraPitch = (Math.atan2(deltaY, distance) * 325.949 | 0) & 2047;
          this.cameraYaw = (Math.atan2(deltaX, deltaZ) * -325.949 | 0) & 2047;
          if (this.cameraPitch < 128) {
            this.cameraPitch = 128;
          }
          if (this.cameraPitch > 383) {
            this.cameraPitch = 383;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 84 /* IF_SHOWSIDE */) {
        this.selectedTab = this.in.g1();
        this.redrawSidebar = true;
        this.redrawSideicons = true;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 4 /* MESSAGE_GAME */) {
        const message = this.in.gjstr();
        let username;
        if (message.endsWith(":tradereq:")) {
          const player = message.substring(0, message.indexOf(":"));
          username = JString.toBase37(player);
          let ignored = false;
          for (let i = 0;i < this.ignoreCount; i++) {
            if (this.ignoreName37[i] === username) {
              ignored = true;
              break;
            }
          }
          if (!ignored && this.overrideChat === 0) {
            this.addMessage(4, "wishes to trade with you.", player);
          }
        } else if (message.endsWith(":duelreq:")) {
          const player = message.substring(0, message.indexOf(":"));
          username = JString.toBase37(player);
          let ignored = false;
          for (let i = 0;i < this.ignoreCount; i++) {
            if (this.ignoreName37[i] === username) {
              ignored = true;
              break;
            }
          }
          if (!ignored && this.overrideChat === 0) {
            this.addMessage(8, "wishes to duel with you.", player);
          }
        } else {
          this.addMessage(0, message, "");
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 46 /* IF_SETOBJECT */) {
        const com = this.in.g2();
        const objId = this.in.g2();
        const zoom = this.in.g2();
        const obj = ObjType.get(objId);
        Component.instances[com].model = obj.getInterfaceModel(50);
        Component.instances[com].xan = obj.xan2d;
        Component.instances[com].yan = obj.yan2d;
        Component.instances[com].zoom = obj.zoom2d * 100 / zoom | 0;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 168 /* IF_OPENMAINMODAL */) {
        const com = this.in.g2();
        this.resetInterfaceAnimation(com);
        if (this.sidebarInterfaceId !== -1) {
          this.sidebarInterfaceId = -1;
          this.redrawSidebar = true;
          this.redrawSideicons = true;
        }
        if (this.chatInterfaceId !== -1) {
          this.chatInterfaceId = -1;
          this.redrawChatback = true;
        }
        if (this.chatbackInputOpen) {
          this.chatbackInputOpen = false;
          this.redrawChatback = true;
        }
        this.viewportInterfaceId = com;
        this.pressedContinueOption = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 2 /* IF_SETCOLOUR */) {
        const com = this.in.g2();
        const color = this.in.g2();
        const r = color >> 10 & 31;
        const g = color >> 5 & 31;
        const b = color & 31;
        Component.instances[com].colour = (r << 19) + (g << 11) + (b << 3);
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 136 /* RESET_ANIMS */) {
        for (let i = 0;i < this.players.length; i++) {
          const player = this.players[i];
          if (!player) {
            continue;
          }
          player.primarySeqId = -1;
        }
        for (let i = 0;i < this.npcs.length; i++) {
          const npc = this.npcs[i];
          if (!npc) {
            continue;
          }
          npc.primarySeqId = -1;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 26 /* IF_SETHIDE */) {
        const com = this.in.g2();
        Component.instances[com].hide = this.in.g1() === 1;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 21 /* UPDATE_IGNORELIST */) {
        this.ignoreCount = this.inPacketSize / 8 | 0;
        for (let i = 0;i < this.ignoreCount; i++) {
          this.ignoreName37[i] = this.in.g8();
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 239 /* CAM_RESET */) {
        this.cutscene = false;
        for (let i = 0;i < 5; i++) {
          this.cameraModifierEnabled[i] = false;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 129 /* IF_CLOSE */) {
        if (this.sidebarInterfaceId !== -1) {
          this.sidebarInterfaceId = -1;
          this.redrawSidebar = true;
          this.redrawSideicons = true;
        }
        if (this.chatInterfaceId !== -1) {
          this.chatInterfaceId = -1;
          this.redrawChatback = true;
        }
        if (this.chatbackInputOpen) {
          this.chatbackInputOpen = false;
          this.redrawChatback = true;
        }
        this.viewportInterfaceId = -1;
        this.pressedContinueOption = false;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 201 /* IF_SETTEXT */) {
        const com = this.in.g2();
        Component.instances[com].text = this.in.gjstr();
        if (Component.instances[com].layer === this.tabInterfaceId[this.selectedTab]) {
          this.redrawSidebar = true;
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 44 /* UPDATE_STAT */) {
        this.redrawSidebar = true;
        const stat = this.in.g1();
        const xp = this.in.g4();
        const level = this.in.g1();
        this.skillExperience[stat] = xp;
        this.skillLevel[stat] = level;
        this.skillBaseLevel[stat] = 1;
        for (let i = 0;i < 98; i++) {
          if (xp >= this.levelExperience[i]) {
            this.skillBaseLevel[stat] = i + 2;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 162 /* UPDATE_ZONE_PARTIAL_ENCLOSED */) {
        this.baseX = this.in.g1();
        this.baseZ = this.in.g1();
        while (this.in.pos < this.inPacketSize) {
          const opcode = this.in.g1();
          this.readZonePacket(this.in, opcode);
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 22 /* UPDATE_RUNWEIGHT */) {
        if (this.selectedTab === 12) {
          this.redrawSidebar = true;
        }
        this.weightCarried = this.in.g2b();
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 13 /* CAM_SHAKE */) {
        const type = this.in.g1();
        const jitter = this.in.g1();
        const wobbleScale = this.in.g1();
        const wobbleSpeed = this.in.g1();
        this.cameraModifierEnabled[type] = true;
        this.cameraModifierJitter[type] = jitter;
        this.cameraModifierWobbleScale[type] = wobbleScale;
        this.cameraModifierWobbleSpeed[type] = wobbleSpeed;
        this.cameraModifierCycle[type] = 0;
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 213 /* UPDATE_INV_PARTIAL */) {
        this.redrawSidebar = true;
        const com = this.in.g2();
        const inv = Component.instances[com];
        while (this.in.pos < this.inPacketSize) {
          const slot = this.in.g1();
          const id = this.in.g2();
          let count = this.in.g1();
          if (count === 255) {
            count = this.in.g4();
          }
          if (inv.invSlotObjId && inv.invSlotObjCount && slot >= 0 && slot < inv.invSlotObjId.length) {
            inv.invSlotObjId[slot] = id;
            inv.invSlotObjCount[slot] = count;
          }
        }
        this.inPacketType = -1;
        return true;
      }
      if (this.inPacketType === 184 /* PLAYER_INFO */) {
        this.readPlayerInfo(this.in, this.inPacketSize);
        this.sceneAwaitingSync = false;
        this.inPacketType = -1;
        return true;
      }
      await this.logout();
    } catch (e) {
      console.error(e);
      await this.logout();
    }
    return true;
  }
  buildScene() {
    try {
      this.minimapLevel = -1;
      this.locList.clear();
      this.spotanims.clear();
      this.projectiles.clear();
      Pix3D.clearTexels();
      this.clearCaches();
      this.scene?.reset();
      for (let level = 0;level < 4 /* LEVELS */; level++) {
        this.levelCollisionMap[level]?.reset();
      }
      const world = new World(104 /* SIZE */, 104 /* SIZE */, this.levelHeightmap, this.levelTileFlags);
      World.lowMemory = Client.lowMemory;
      const maps = this.sceneMapLandData?.length ?? 0;
      if (this.sceneMapIndex) {
        for (let index = 0;index < maps; index++) {
          const mapsquareX = this.sceneMapIndex[index] >> 8;
          const mapsquareZ = this.sceneMapIndex[index] & 255;
          if (mapsquareX === 33 && mapsquareZ >= 71 && mapsquareZ <= 73) {
            World.lowMemory = false;
            break;
          }
        }
      }
      if (Client.lowMemory) {
        this.scene?.setMinLevel(this.currentLevel);
      } else {
        this.scene?.setMinLevel(0);
      }
      if (this.sceneMapIndex && this.sceneMapLandData) {
        this.out.p1isaac(108 /* NO_TIMEOUT */);
        for (let i = 0;i < maps; i++) {
          const x = (this.sceneMapIndex[i] >> 8) * 64 - this.sceneBaseTileX;
          const z = (this.sceneMapIndex[i] & 255) * 64 - this.sceneBaseTileZ;
          const src = this.sceneMapLandData[i];
          if (src) {
            const data = BZip22.decompress(src, -1, false, true);
            world.readLandscape((this.sceneCenterZoneX - 6) * 8, (this.sceneCenterZoneZ - 6) * 8, x, z, data);
          } else if (this.sceneCenterZoneZ < 800) {
            world.clearLandscape(z, x, 64, 64);
          }
        }
      }
      if (this.sceneMapIndex && this.sceneMapLocData) {
        this.out.p1isaac(108 /* NO_TIMEOUT */);
        for (let i = 0;i < maps; i++) {
          const x = (this.sceneMapIndex[i] >> 8) * 64 - this.sceneBaseTileX;
          const z = (this.sceneMapIndex[i] & 255) * 64 - this.sceneBaseTileZ;
          const src = this.sceneMapLocData[i];
          if (src) {
            const data = BZip22.decompress(src, -1, false, true);
            world.readLocs(this.scene, this.locList, this.levelCollisionMap, data, x, z);
          }
        }
      }
      this.out.p1isaac(108 /* NO_TIMEOUT */);
      world.build(this.scene, this.levelCollisionMap);
      this.areaViewport?.bind();
      this.out.p1isaac(108 /* NO_TIMEOUT */);
      for (let loc = this.locList.head();loc; loc = this.locList.next()) {
        if ((this.levelTileFlags && this.levelTileFlags[1][loc.heightmapNE][loc.heightmapNW] & 2) === 2) {
          loc.heightmapSW--;
          if (loc.heightmapSW < 0) {
            loc.unlink();
          }
        }
      }
      for (let x = 0;x < 104 /* SIZE */; x++) {
        for (let z = 0;z < 104 /* SIZE */; z++) {
          this.sortObjStacks(x, z);
        }
      }
      this.clearAddedLocs();
    } catch (err) {
      console.error(err);
    }
    LocType.modelCacheStatic?.clear();
    Pix3D.initPool(20);
  }
  resetInterfaceAnimation(id) {
    const parent = Component.instances[id];
    if (!parent.childId) {
      return;
    }
    for (let i = 0;i < parent.childId.length && parent.childId[i] !== -1; i++) {
      const child = Component.instances[parent.childId[i]];
      if (child.comType === 1) {
        this.resetInterfaceAnimation(child.id);
      }
      child.seqFrame = 0;
      child.seqCycle = 0;
    }
  }
  initializeLevelExperience() {
    let acc = 0;
    for (let i = 0;i < 99; i++) {
      const level = i + 1;
      const delta = level + Math.pow(2, level / 7) * 300 | 0;
      acc += delta;
      this.levelExperience[i] = acc / 4 | 0;
    }
  }
  addMessage(type, text, sender) {
    if (type === 0 && this.stickyChatInterfaceId !== -1) {
      this.modalMessage = text;
      this.mouseClickButton = 0;
    }
    if (this.chatInterfaceId === -1) {
      this.redrawChatback = true;
    }
    for (let i = 99;i > 0; i--) {
      this.messageTextType[i] = this.messageTextType[i - 1];
      this.messageTextSender[i] = this.messageTextSender[i - 1];
      this.messageText[i] = this.messageText[i - 1];
    }
    this.messageTextType[0] = type;
    this.messageTextSender[0] = sender;
    this.messageText[0] = text;
  }
  async updateVarp(id) {
    const clientcode = VarpType.instances[id].clientcode;
    if (clientcode !== 0) {
      const value = this.varps[id];
      if (clientcode === 1) {
        if (value === 1) {
          Pix3D.setBrightness(0.9);
        }
        if (value === 2) {
          Pix3D.setBrightness(0.8);
        }
        if (value === 3) {
          Pix3D.setBrightness(0.7);
        }
        if (value === 4) {
          Pix3D.setBrightness(0.6);
        }
        ObjType.iconCache?.clear();
        this.redrawTitleBackground = true;
      }
      if (clientcode === 3) {
        const lastMidiActive = this.midiActive;
        if (value === 0) {
          this.midiVolume = 128;
          setMidiVolume(128);
          this.midiActive = true;
        }
        if (value === 1) {
          this.midiVolume = 96;
          setMidiVolume(96);
          this.midiActive = true;
        }
        if (value === 2) {
          this.midiVolume = 64;
          setMidiVolume(64);
          this.midiActive = true;
        }
        if (value === 3) {
          this.midiVolume = 32;
          setMidiVolume(32);
          this.midiActive = true;
        }
        if (value === 4) {
          this.midiActive = false;
        }
        if (this.midiActive !== lastMidiActive) {
          if (this.midiActive && this.currentMidi) {
            await this.setMidi(this.currentMidi, this.midiCrc, this.midiSize, false);
          } else {
            stopMidi(false);
          }
          this.nextMusicDelay = 0;
        }
      }
      if (clientcode === 4) {
        if (value === 0) {
          this.waveVolume = 128;
          setWaveVolume(128);
          this.waveEnabled = true;
        }
        if (value === 1) {
          this.waveVolume = 96;
          setWaveVolume(96);
          this.waveEnabled = true;
        }
        if (value === 2) {
          this.waveVolume = 64;
          setWaveVolume(64);
          this.waveEnabled = true;
        }
        if (value === 3) {
          this.waveVolume = 32;
          setWaveVolume(32);
          this.waveEnabled = true;
        }
        if (value === 4) {
          this.waveEnabled = false;
        }
      }
      if (clientcode === 5) {
        this.mouseButtonsOption = value;
      }
      if (clientcode === 6) {
        this.chatEffects = value;
      }
      if (clientcode === 8) {
        this.splitPrivateChat = value;
        this.redrawChatback = true;
      }
    }
  }
  handleChatMouseInput(_mouseX, mouseY) {
    let line = 0;
    for (let i = 0;i < 100; i++) {
      if (!this.messageText[i]) {
        continue;
      }
      const type = this.messageTextType[i];
      const y = this.chatScrollOffset + 70 + 4 - line * 14;
      if (y < -20) {
        break;
      }
      if (type === 0) {
        line++;
      }
      if ((type === 1 || type === 2) && (type === 1 || this.publicChatSetting === 0 || this.publicChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
        if (mouseY > y - 14 && mouseY <= y && this.localPlayer && this.messageTextSender[i] !== this.localPlayer.name) {
          if (this.rights) {
            this.menuOption[this.menuSize] = "Report abuse @whi@" + this.messageTextSender[i];
            this.menuAction[this.menuSize] = 34;
            this.menuSize++;
          }
          this.menuOption[this.menuSize] = "Add ignore @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 436;
          this.menuSize++;
          this.menuOption[this.menuSize] = "Add friend @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 406;
          this.menuSize++;
        }
        line++;
      }
      if ((type === 3 || type === 7) && this.splitPrivateChat === 0 && (type === 7 || this.privateChatSetting === 0 || this.privateChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
        if (mouseY > y - 14 && mouseY <= y) {
          if (this.rights) {
            this.menuOption[this.menuSize] = "Report abuse @whi@" + this.messageTextSender[i];
            this.menuAction[this.menuSize] = 34;
            this.menuSize++;
          }
          this.menuOption[this.menuSize] = "Add ignore @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 436;
          this.menuSize++;
          this.menuOption[this.menuSize] = "Add friend @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 406;
          this.menuSize++;
        }
        line++;
      }
      if (type === 4 && (this.tradeChatSetting === 0 || this.tradeChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
        if (mouseY > y - 14 && mouseY <= y) {
          this.menuOption[this.menuSize] = "Accept trade @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 903;
          this.menuSize++;
        }
        line++;
      }
      if ((type === 5 || type === 6) && this.splitPrivateChat === 0 && this.privateChatSetting < 2) {
        line++;
      }
      if (type === 8 && (this.tradeChatSetting === 0 || this.tradeChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
        if (mouseY > y - 14 && mouseY <= y) {
          this.menuOption[this.menuSize] = "Accept duel @whi@" + this.messageTextSender[i];
          this.menuAction[this.menuSize] = 363;
          this.menuSize++;
        }
        line++;
      }
    }
  }
  handlePrivateChatInput(mouseY) {
    if (this.splitPrivateChat === 0) {
      return;
    }
    let lineOffset = 0;
    if (this.systemUpdateTimer !== 0) {
      lineOffset = 1;
    }
    for (let i = 0;i < 100; i++) {
      if (this.messageText[i] !== null) {
        const type = this.messageTextType[i];
        if ((type === 3 || type === 7) && (type === 7 || this.privateChatSetting === 0 || this.privateChatSetting === 1 && this.isFriend(this.messageTextSender[i]))) {
          const y = 329 - lineOffset * 13;
          if (this.mouseX > 8 && this.mouseX < 520 && mouseY - 11 > y - 10 && mouseY - 11 <= y + 3) {
            if (this.rights) {
              this.menuOption[this.menuSize] = "Report abuse @whi@" + this.messageTextSender[i];
              this.menuAction[this.menuSize] = 2034;
              this.menuSize++;
            }
            this.menuOption[this.menuSize] = "Add ignore @whi@" + this.messageTextSender[i];
            this.menuAction[this.menuSize] = 2436;
            this.menuSize++;
            this.menuOption[this.menuSize] = "Add friend @whi@" + this.messageTextSender[i];
            this.menuAction[this.menuSize] = 2406;
            this.menuSize++;
          }
          lineOffset++;
          if (lineOffset >= 5) {
            return;
          }
        }
        if ((type === 5 || type === 6) && this.privateChatSetting < 2) {
          lineOffset++;
          if (lineOffset >= 5) {
            return;
          }
        }
      }
    }
  }
  handleInterfaceInput(com, mouseX, mouseY, x, y, scrollPosition) {
    if (com.comType !== 0 || !com.childId || com.hide || mouseX < x || mouseY < y || mouseX > x + com.width || mouseY > y + com.height || !com.childX || !com.childY) {
      return;
    }
    const children = com.childId.length;
    for (let i = 0;i < children; i++) {
      let childX = com.childX[i] + x;
      let childY = com.childY[i] + y - scrollPosition;
      const child = Component.instances[com.childId[i]];
      childX += child.x;
      childY += child.y;
      if ((child.overLayer >= 0 || child.overColour !== 0) && mouseX >= childX && mouseY >= childY && mouseX < childX + child.width && mouseY < childY + child.height) {
        if (child.overLayer >= 0) {
          this.lastHoveredInterfaceId = child.overLayer;
        } else {
          this.lastHoveredInterfaceId = child.id;
        }
      }
      if (child.comType === 0) {
        this.handleInterfaceInput(child, mouseX, mouseY, childX, childY, child.scrollPosition);
        if (child.scroll > child.height) {
          this.handleScrollInput(mouseX, mouseY, child.scroll, child.height, true, childX + child.width, childY, child);
        }
      } else if (child.comType === 2) {
        let slot = 0;
        for (let row = 0;row < child.height; row++) {
          for (let col = 0;col < child.width; col++) {
            let slotX = childX + col * (child.marginX + 32);
            let slotY = childY + row * (child.marginY + 32);
            if (slot < 20 && child.invSlotOffsetX && child.invSlotOffsetY) {
              slotX += child.invSlotOffsetX[slot];
              slotY += child.invSlotOffsetY[slot];
            }
            if (mouseX < slotX || mouseY < slotY || mouseX >= slotX + 32 || mouseY >= slotY + 32) {
              slot++;
              continue;
            }
            this.hoveredSlot = slot;
            this.hoveredSlotParentId = child.id;
            if (!child.invSlotObjId || child.invSlotObjId[slot] <= 0) {
              slot++;
              continue;
            }
            const obj = ObjType.get(child.invSlotObjId[slot] - 1);
            if (this.objSelected === 1 && child.interactable) {
              if (child.id !== this.objSelectedInterface || slot !== this.objSelectedSlot) {
                this.menuOption[this.menuSize] = "Use " + this.objSelectedName + " with @lre@" + obj.name;
                this.menuAction[this.menuSize] = 881;
                this.menuParamA[this.menuSize] = obj.id;
                this.menuParamB[this.menuSize] = slot;
                this.menuParamC[this.menuSize] = child.id;
                this.menuSize++;
              }
            } else if (this.spellSelected === 1 && child.interactable) {
              if ((this.activeSpellFlags & 16) === 16) {
                this.menuOption[this.menuSize] = this.spellCaption + " @lre@" + obj.name;
                this.menuAction[this.menuSize] = 391;
                this.menuParamA[this.menuSize] = obj.id;
                this.menuParamB[this.menuSize] = slot;
                this.menuParamC[this.menuSize] = child.id;
                this.menuSize++;
              }
            } else {
              if (child.interactable) {
                for (let op = 4;op >= 3; op--) {
                  if (obj.iop && obj.iop[op]) {
                    this.menuOption[this.menuSize] = obj.iop[op] + " @lre@" + obj.name;
                    if (op === 3) {
                      this.menuAction[this.menuSize] = 478;
                    } else if (op === 4) {
                      this.menuAction[this.menuSize] = 347;
                    }
                    this.menuParamA[this.menuSize] = obj.id;
                    this.menuParamB[this.menuSize] = slot;
                    this.menuParamC[this.menuSize] = child.id;
                    this.menuSize++;
                  } else if (op === 4) {
                    this.menuOption[this.menuSize] = "Drop @lre@" + obj.name;
                    this.menuAction[this.menuSize] = 347;
                    this.menuParamA[this.menuSize] = obj.id;
                    this.menuParamB[this.menuSize] = slot;
                    this.menuParamC[this.menuSize] = child.id;
                    this.menuSize++;
                  }
                }
              }
              if (child.usable) {
                this.menuOption[this.menuSize] = "Use @lre@" + obj.name;
                this.menuAction[this.menuSize] = 188;
                this.menuParamA[this.menuSize] = obj.id;
                this.menuParamB[this.menuSize] = slot;
                this.menuParamC[this.menuSize] = child.id;
                this.menuSize++;
              }
              if (child.interactable && obj.iop) {
                for (let op = 2;op >= 0; op--) {
                  if (obj.iop[op]) {
                    this.menuOption[this.menuSize] = obj.iop[op] + " @lre@" + obj.name;
                    if (op === 0) {
                      this.menuAction[this.menuSize] = 405;
                    } else if (op === 1) {
                      this.menuAction[this.menuSize] = 38;
                    } else if (op === 2) {
                      this.menuAction[this.menuSize] = 422;
                    }
                    this.menuParamA[this.menuSize] = obj.id;
                    this.menuParamB[this.menuSize] = slot;
                    this.menuParamC[this.menuSize] = child.id;
                    this.menuSize++;
                  }
                }
              }
              if (child.iops) {
                for (let op = 4;op >= 0; op--) {
                  if (child.iops[op]) {
                    this.menuOption[this.menuSize] = child.iops[op] + " @lre@" + obj.name;
                    if (op === 0) {
                      this.menuAction[this.menuSize] = 602;
                    } else if (op === 1) {
                      this.menuAction[this.menuSize] = 596;
                    } else if (op === 2) {
                      this.menuAction[this.menuSize] = 22;
                    } else if (op === 3) {
                      this.menuAction[this.menuSize] = 892;
                    } else if (op === 4) {
                      this.menuAction[this.menuSize] = 415;
                    }
                    this.menuParamA[this.menuSize] = obj.id;
                    this.menuParamB[this.menuSize] = slot;
                    this.menuParamC[this.menuSize] = child.id;
                    this.menuSize++;
                  }
                }
              }
              this.menuOption[this.menuSize] = "Examine @lre@" + obj.name;
              this.menuAction[this.menuSize] = 1773;
              this.menuParamA[this.menuSize] = obj.id;
              if (child.invSlotObjCount) {
                this.menuParamC[this.menuSize] = child.invSlotObjCount[slot];
              }
              this.menuSize++;
            }
            slot++;
          }
        }
      } else if (mouseX >= childX && mouseY >= childY && mouseX < childX + child.width && mouseY < childY + child.height) {
        if (child.buttonType === 1 /* BUTTON_OK */) {
          let override = false;
          if (child.clientCode !== 0) {
            override = this.handleSocialMenuOption(child);
          }
          if (!override && child.option) {
            this.menuOption[this.menuSize] = child.option;
            this.menuAction[this.menuSize] = 951;
            this.menuParamC[this.menuSize] = child.id;
            this.menuSize++;
          }
        } else if (child.buttonType === 2 /* BUTTON_TARGET */ && this.spellSelected === 0) {
          let prefix = child.actionVerb;
          if (prefix && prefix.indexOf(" ") !== -1) {
            prefix = prefix.substring(0, prefix.indexOf(" "));
          }
          this.menuOption[this.menuSize] = prefix + " @gre@" + child.action;
          this.menuAction[this.menuSize] = 930;
          this.menuParamC[this.menuSize] = child.id;
          this.menuSize++;
        } else if (child.buttonType === 3 /* BUTTON_CLOSE */) {
          this.menuOption[this.menuSize] = "Close";
          this.menuAction[this.menuSize] = 947;
          this.menuParamC[this.menuSize] = child.id;
          this.menuSize++;
        } else if (child.buttonType === 4 /* BUTTON_TOGGLE */ && child.option) {
          this.menuOption[this.menuSize] = child.option;
          this.menuAction[this.menuSize] = 465;
          this.menuParamC[this.menuSize] = child.id;
          this.menuSize++;
        } else if (child.buttonType === 5 /* BUTTON_SELECT */ && child.option) {
          this.menuOption[this.menuSize] = child.option;
          this.menuAction[this.menuSize] = 960;
          this.menuParamC[this.menuSize] = child.id;
          this.menuSize++;
        } else if (child.buttonType === 6 /* BUTTON_CONTINUE */ && !this.pressedContinueOption && child.option) {
          this.menuOption[this.menuSize] = child.option;
          this.menuAction[this.menuSize] = 44;
          this.menuParamC[this.menuSize] = child.id;
          this.menuSize++;
        }
      }
    }
  }
  handleSocialMenuOption(component) {
    let type = component.clientCode;
    if (type >= 1 /* CC_FRIENDS_START */ && type <= 200 /* CC_FRIENDS_UPDATE_END */) {
      if (type >= 101 /* CC_FRIENDS_UPDATE_START */) {
        type -= 101 /* CC_FRIENDS_UPDATE_START */;
      } else {
        type--;
      }
      this.menuOption[this.menuSize] = "Remove @whi@" + this.friendName[type];
      this.menuAction[this.menuSize] = 557;
      this.menuSize++;
      this.menuOption[this.menuSize] = "Message @whi@" + this.friendName[type];
      this.menuAction[this.menuSize] = 679;
      this.menuSize++;
      return true;
    } else if (type >= 401 /* CC_IGNORES_START */ && type <= 500 /* CC_IGNORES_END */) {
      this.menuOption[this.menuSize] = "Remove @whi@" + component.text;
      this.menuAction[this.menuSize] = 556;
      this.menuSize++;
      return true;
    }
    return false;
  }
  handleViewportOptions() {
    if (this.objSelected === 0 && this.spellSelected === 0) {
      this.menuOption[this.menuSize] = "Walk here";
      this.menuAction[this.menuSize] = 660;
      this.menuParamB[this.menuSize] = this.mouseX;
      this.menuParamC[this.menuSize] = this.mouseY;
      this.menuSize++;
    }
    let lastTypecode = -1;
    for (let picked = 0;picked < Model.pickedCount; picked++) {
      const typecode = Model.picked[picked];
      const x = typecode & 127;
      const z = typecode >> 7 & 127;
      const entityType = typecode >> 29 & 3;
      const typeId = typecode >> 14 & 32767;
      if (typecode === lastTypecode) {
        continue;
      }
      lastTypecode = typecode;
      if (entityType === 2 && this.scene && this.scene.getInfo(this.currentLevel, x, z, typecode) >= 0) {
        const loc = LocType.get(typeId);
        if (this.objSelected === 1) {
          this.menuOption[this.menuSize] = "Use " + this.objSelectedName + " with @cya@" + loc.name;
          this.menuAction[this.menuSize] = 450;
          this.menuParamA[this.menuSize] = typecode;
          this.menuParamB[this.menuSize] = x;
          this.menuParamC[this.menuSize] = z;
          this.menuSize++;
        } else if (this.spellSelected !== 1) {
          if (loc.op) {
            for (let op = 4;op >= 0; op--) {
              if (loc.op[op]) {
                this.menuOption[this.menuSize] = loc.op[op] + " @cya@" + loc.name;
                if (op === 0) {
                  this.menuAction[this.menuSize] = 285;
                }
                if (op === 1) {
                  this.menuAction[this.menuSize] = 504;
                }
                if (op === 2) {
                  this.menuAction[this.menuSize] = 364;
                }
                if (op === 3) {
                  this.menuAction[this.menuSize] = 581;
                }
                if (op === 4) {
                  this.menuAction[this.menuSize] = 1501;
                }
                this.menuParamA[this.menuSize] = typecode;
                this.menuParamB[this.menuSize] = x;
                this.menuParamC[this.menuSize] = z;
                this.menuSize++;
              }
            }
          }
          this.menuOption[this.menuSize] = "Examine @cya@" + loc.name;
          this.menuAction[this.menuSize] = 1175;
          this.menuParamA[this.menuSize] = typecode;
          this.menuParamB[this.menuSize] = x;
          this.menuParamC[this.menuSize] = z;
          this.menuSize++;
        } else if ((this.activeSpellFlags & 4) === 4) {
          this.menuOption[this.menuSize] = this.spellCaption + " @cya@" + loc.name;
          this.menuAction[this.menuSize] = 55;
          this.menuParamA[this.menuSize] = typecode;
          this.menuParamB[this.menuSize] = x;
          this.menuParamC[this.menuSize] = z;
          this.menuSize++;
        }
      }
      if (entityType === 1) {
        const npc = this.npcs[typeId];
        if (npc && npc.npcType && npc.npcType.size === 1 && (npc.x & 127) === 64 && (npc.z & 127) === 64) {
          for (let i = 0;i < this.npcCount; i++) {
            const other = this.npcs[this.npcIds[i]];
            if (other && other !== npc && other.npcType && other.npcType.size === 1 && other.x === npc.x && other.z === npc.z) {
              this.addNpcOptions(other.npcType, this.npcIds[i], x, z);
            }
          }
        }
        if (npc && npc.npcType) {
          this.addNpcOptions(npc.npcType, typeId, x, z);
        }
      }
      if (entityType === 0) {
        const player = this.players[typeId];
        if (player && (player.x & 127) === 64 && (player.z & 127) === 64) {
          for (let i = 0;i < this.npcCount; i++) {
            const other = this.npcs[this.npcIds[i]];
            if (other && other.npcType && other.npcType.size === 1 && other.x === player.x && other.z === player.z) {
              this.addNpcOptions(other.npcType, this.npcIds[i], x, z);
            }
          }
          for (let i = 0;i < this.playerCount; i++) {
            const other = this.players[this.playerIds[i]];
            if (other && other !== player && other.x === player.x && other.z === player.z) {
              this.addPlayerOptions(other, this.playerIds[i], x, z);
            }
          }
        }
        if (player) {
          this.addPlayerOptions(player, typeId, x, z);
        }
      }
      if (entityType === 3) {
        const objs = this.objStacks[this.currentLevel][x][z];
        if (!objs) {
          continue;
        }
        for (let obj = objs.tail();obj; obj = objs.prev()) {
          const type = ObjType.get(obj.index);
          if (this.objSelected === 1) {
            this.menuOption[this.menuSize] = "Use " + this.objSelectedName + " with @lre@" + type.name;
            this.menuAction[this.menuSize] = 217;
            this.menuParamA[this.menuSize] = obj.index;
            this.menuParamB[this.menuSize] = x;
            this.menuParamC[this.menuSize] = z;
            this.menuSize++;
          } else if (this.spellSelected !== 1) {
            for (let op = 4;op >= 0; op--) {
              if (type.op && type.op[op]) {
                this.menuOption[this.menuSize] = type.op[op] + " @lre@" + type.name;
                if (op === 0) {
                  this.menuAction[this.menuSize] = 224;
                }
                if (op === 1) {
                  this.menuAction[this.menuSize] = 993;
                }
                if (op === 2) {
                  this.menuAction[this.menuSize] = 99;
                }
                if (op === 3) {
                  this.menuAction[this.menuSize] = 746;
                }
                if (op === 4) {
                  this.menuAction[this.menuSize] = 877;
                }
                this.menuParamA[this.menuSize] = obj.index;
                this.menuParamB[this.menuSize] = x;
                this.menuParamC[this.menuSize] = z;
                this.menuSize++;
              } else if (op === 2) {
                this.menuOption[this.menuSize] = "Take @lre@" + type.name;
                this.menuAction[this.menuSize] = 99;
                this.menuParamA[this.menuSize] = obj.index;
                this.menuParamB[this.menuSize] = x;
                this.menuParamC[this.menuSize] = z;
                this.menuSize++;
              }
            }
            this.menuOption[this.menuSize] = "Examine @lre@" + type.name;
            this.menuAction[this.menuSize] = 1102;
            this.menuParamA[this.menuSize] = obj.index;
            this.menuParamB[this.menuSize] = x;
            this.menuParamC[this.menuSize] = z;
            this.menuSize++;
          } else if ((this.activeSpellFlags & 1) === 1) {
            this.menuOption[this.menuSize] = this.spellCaption + " @lre@" + type.name;
            this.menuAction[this.menuSize] = 965;
            this.menuParamA[this.menuSize] = obj.index;
            this.menuParamB[this.menuSize] = x;
            this.menuParamC[this.menuSize] = z;
            this.menuSize++;
          }
        }
      }
    }
  }
  addNpcOptions(npc, a, b, c) {
    if (this.menuSize >= 400) {
      return;
    }
    let tooltip = npc.name;
    if (npc.vislevel !== 0 && this.localPlayer) {
      tooltip = tooltip + this.getCombatLevelColorTag(this.localPlayer.combatLevel, npc.vislevel) + " (level-" + npc.vislevel + ")";
    }
    if (this.objSelected === 1) {
      this.menuOption[this.menuSize] = "Use " + this.objSelectedName + " with @yel@" + tooltip;
      this.menuAction[this.menuSize] = 900;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
    } else if (this.spellSelected !== 1) {
      let type;
      if (npc.op) {
        for (type = 4;type >= 0; type--) {
          if (npc.op[type] && npc.op[type]?.toLowerCase() !== "attack") {
            this.menuOption[this.menuSize] = npc.op[type] + " @yel@" + tooltip;
            if (type === 0) {
              this.menuAction[this.menuSize] = 728;
            } else if (type === 1) {
              this.menuAction[this.menuSize] = 542;
            } else if (type === 2) {
              this.menuAction[this.menuSize] = 6;
            } else if (type === 3) {
              this.menuAction[this.menuSize] = 963;
            } else if (type === 4) {
              this.menuAction[this.menuSize] = 245;
            }
            this.menuParamA[this.menuSize] = a;
            this.menuParamB[this.menuSize] = b;
            this.menuParamC[this.menuSize] = c;
            this.menuSize++;
          }
        }
      }
      if (npc.op) {
        for (type = 4;type >= 0; type--) {
          if (npc.op[type] && npc.op[type]?.toLowerCase() === "attack") {
            let action = 0;
            if (this.localPlayer && npc.vislevel > this.localPlayer.combatLevel) {
              action = 2000;
            }
            this.menuOption[this.menuSize] = npc.op[type] + " @yel@" + tooltip;
            if (type === 0) {
              this.menuAction[this.menuSize] = action + 728;
            } else if (type === 1) {
              this.menuAction[this.menuSize] = action + 542;
            } else if (type === 2) {
              this.menuAction[this.menuSize] = action + 6;
            } else if (type === 3) {
              this.menuAction[this.menuSize] = action + 963;
            } else if (type === 4) {
              this.menuAction[this.menuSize] = action + 245;
            }
            this.menuParamA[this.menuSize] = a;
            this.menuParamB[this.menuSize] = b;
            this.menuParamC[this.menuSize] = c;
            this.menuSize++;
          }
        }
      }
      this.menuOption[this.menuSize] = "Examine @yel@" + tooltip;
      this.menuAction[this.menuSize] = 1607;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
    } else if ((this.activeSpellFlags & 2) === 2) {
      this.menuOption[this.menuSize] = this.spellCaption + " @yel@" + tooltip;
      this.menuAction[this.menuSize] = 265;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
    }
  }
  addPlayerOptions(player, a, b, c) {
    if (player === this.localPlayer || this.menuSize >= 400) {
      return;
    }
    let tooltip = null;
    if (this.localPlayer) {
      tooltip = player.name + this.getCombatLevelColorTag(this.localPlayer.combatLevel, player.combatLevel) + " (level-" + player.combatLevel + ")";
    }
    if (this.objSelected === 1) {
      this.menuOption[this.menuSize] = "Use " + this.objSelectedName + " with @whi@" + tooltip;
      this.menuAction[this.menuSize] = 367;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
    } else if (this.spellSelected !== 1) {
      this.menuOption[this.menuSize] = "Follow @whi@" + tooltip;
      this.menuAction[this.menuSize] = 1544;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
      if (this.overrideChat === 0) {
        this.menuOption[this.menuSize] = "Trade with @whi@" + tooltip;
        this.menuAction[this.menuSize] = 1373;
        this.menuParamA[this.menuSize] = a;
        this.menuParamB[this.menuSize] = b;
        this.menuParamC[this.menuSize] = c;
        this.menuSize++;
      }
      if (this.wildernessLevel > 0) {
        this.menuOption[this.menuSize] = "Attack @whi@" + tooltip;
        if (this.localPlayer && this.localPlayer.combatLevel >= player.combatLevel) {
          this.menuAction[this.menuSize] = 151;
        } else {
          this.menuAction[this.menuSize] = 2151;
        }
        this.menuParamA[this.menuSize] = a;
        this.menuParamB[this.menuSize] = b;
        this.menuParamC[this.menuSize] = c;
        this.menuSize++;
      }
      if (this.worldLocationState === 1) {
        this.menuOption[this.menuSize] = "Fight @whi@" + tooltip;
        this.menuAction[this.menuSize] = 151;
        this.menuParamA[this.menuSize] = a;
        this.menuParamB[this.menuSize] = b;
        this.menuParamC[this.menuSize] = c;
        this.menuSize++;
      }
      if (this.worldLocationState === 2) {
        this.menuOption[this.menuSize] = "Duel-with @whi@" + tooltip;
        this.menuAction[this.menuSize] = 1101;
        this.menuParamA[this.menuSize] = a;
        this.menuParamB[this.menuSize] = b;
        this.menuParamC[this.menuSize] = c;
        this.menuSize++;
      }
    } else if ((this.activeSpellFlags & 8) === 8) {
      this.menuOption[this.menuSize] = this.spellCaption + " @whi@" + tooltip;
      this.menuAction[this.menuSize] = 651;
      this.menuParamA[this.menuSize] = a;
      this.menuParamB[this.menuSize] = b;
      this.menuParamC[this.menuSize] = c;
      this.menuSize++;
    }
    for (let i = 0;i < this.menuSize; i++) {
      if (this.menuAction[i] === 660) {
        this.menuOption[i] = "Walk here @whi@" + tooltip;
        return;
      }
    }
  }
  getCombatLevelColorTag(viewerLevel, otherLevel) {
    const diff = viewerLevel - otherLevel;
    if (diff < -9) {
      return "@red@";
    } else if (diff < -6) {
      return "@or3@";
    } else if (diff < -3) {
      return "@or2@";
    } else if (diff < 0) {
      return "@or1@";
    } else if (diff > 9) {
      return "@gre@";
    } else if (diff > 6) {
      return "@gr3@";
    } else if (diff > 3) {
      return "@gr2@";
    } else if (diff > 0) {
      return "@gr1@";
    } else {
      return "@yel@";
    }
  }
  handleInput() {
    if (this.objDragArea === 0) {
      this.menuOption[0] = "Cancel";
      this.menuAction[0] = 1252;
      this.menuSize = 1;
      this.handlePrivateChatInput(this.mouseY);
      this.lastHoveredInterfaceId = 0;
      if (this.mouseX > 8 && this.mouseY > 11 && this.mouseX < 520 && this.mouseY < 345) {
        if (this.viewportInterfaceId === -1) {
          this.handleViewportOptions();
        } else {
          this.handleInterfaceInput(Component.instances[this.viewportInterfaceId], this.mouseX, this.mouseY, 8, 11, 0);
        }
      }
      if (this.lastHoveredInterfaceId !== this.viewportHoveredInterfaceIndex) {
        this.viewportHoveredInterfaceIndex = this.lastHoveredInterfaceId;
      }
      this.lastHoveredInterfaceId = 0;
      if (this.mouseX > 562 && this.mouseY > 231 && this.mouseX < 752 && this.mouseY < 492) {
        if (this.sidebarInterfaceId !== -1) {
          this.handleInterfaceInput(Component.instances[this.sidebarInterfaceId], this.mouseX, this.mouseY, 562, 231, 0);
        } else if (this.tabInterfaceId[this.selectedTab] !== -1) {
          this.handleInterfaceInput(Component.instances[this.tabInterfaceId[this.selectedTab]], this.mouseX, this.mouseY, 562, 231, 0);
        }
      }
      if (this.lastHoveredInterfaceId !== this.sidebarHoveredInterfaceIndex) {
        this.redrawSidebar = true;
        this.sidebarHoveredInterfaceIndex = this.lastHoveredInterfaceId;
      }
      this.lastHoveredInterfaceId = 0;
      if (this.mouseX > 22 && this.mouseY > 375 && this.mouseX < 431 && this.mouseY < 471) {
        if (this.chatInterfaceId === -1) {
          this.handleChatMouseInput(this.mouseX - 22, this.mouseY - 375);
        } else {
          this.handleInterfaceInput(Component.instances[this.chatInterfaceId], this.mouseX, this.mouseY, 22, 375, 0);
        }
      }
      if (this.chatInterfaceId !== -1 && this.lastHoveredInterfaceId !== this.chatHoveredInterfaceIndex) {
        this.redrawChatback = true;
        this.chatHoveredInterfaceIndex = this.lastHoveredInterfaceId;
      }
      let done = false;
      while (!done) {
        done = true;
        for (let i = 0;i < this.menuSize - 1; i++) {
          if (this.menuAction[i] < 1000 && this.menuAction[i + 1] > 1000) {
            const tmp0 = this.menuOption[i];
            this.menuOption[i] = this.menuOption[i + 1];
            this.menuOption[i + 1] = tmp0;
            const tmp1 = this.menuAction[i];
            this.menuAction[i] = this.menuAction[i + 1];
            this.menuAction[i + 1] = tmp1;
            const tmp2 = this.menuParamB[i];
            this.menuParamB[i] = this.menuParamB[i + 1];
            this.menuParamB[i + 1] = tmp2;
            const tmp3 = this.menuParamC[i];
            this.menuParamC[i] = this.menuParamC[i + 1];
            this.menuParamC[i + 1] = tmp3;
            const tmp4 = this.menuParamA[i];
            this.menuParamA[i] = this.menuParamA[i + 1];
            this.menuParamA[i + 1] = tmp4;
            done = false;
          }
        }
      }
    }
  }
  showContextMenu() {
    let width = 0;
    if (this.fontBold12) {
      width = this.fontBold12.stringWidth("Choose Option");
      let maxWidth;
      for (let i = 0;i < this.menuSize; i++) {
        maxWidth = this.fontBold12.stringWidth(this.menuOption[i]);
        if (maxWidth > width) {
          width = maxWidth;
        }
      }
    }
    width += 8;
    const height = this.menuSize * 15 + 21;
    let x;
    let y;
    if (this.mouseClickX > 8 && this.mouseClickY > 11 && this.mouseClickX < 520 && this.mouseClickY < 345) {
      x = this.mouseClickX - (width / 2 | 0) - 8;
      if (x + width > 512) {
        x = 512 - width;
      } else if (x < 0) {
        x = 0;
      }
      y = this.mouseClickY - 11;
      if (y + height > 334) {
        y = 334 - height;
      } else if (y < 0) {
        y = 0;
      }
      this.menuVisible = true;
      this.menuArea = 0;
      this.menuX = x;
      this.menuY = y;
      this.menuWidth = width;
      this.menuHeight = this.menuSize * 15 + 22;
    }
    if (this.mouseClickX > 562 && this.mouseClickY > 231 && this.mouseClickX < 752 && this.mouseClickY < 492) {
      x = this.mouseClickX - (width / 2 | 0) - 562;
      if (x < 0) {
        x = 0;
      } else if (x + width > 190) {
        x = 190 - width;
      }
      y = this.mouseClickY - 231;
      if (y < 0) {
        y = 0;
      } else if (y + height > 261) {
        y = 261 - height;
      }
      this.menuVisible = true;
      this.menuArea = 1;
      this.menuX = x;
      this.menuY = y;
      this.menuWidth = width;
      this.menuHeight = this.menuSize * 15 + 22;
    }
    if (this.mouseClickX > 22 && this.mouseClickY > 375 && this.mouseClickX < 501 && this.mouseClickY < 471) {
      x = this.mouseClickX - (width / 2 | 0) - 22;
      if (x < 0) {
        x = 0;
      } else if (x + width > 479) {
        x = 479 - width;
      }
      y = this.mouseClickY - 375;
      if (y < 0) {
        y = 0;
      } else if (y + height > 96) {
        y = 96 - height;
      }
      this.menuVisible = true;
      this.menuArea = 2;
      this.menuX = x;
      this.menuY = y;
      this.menuWidth = width;
      this.menuHeight = this.menuSize * 15 + 22;
    }
  }
  tryMove(srcX, srcZ, dx, dz, type, locWidth, locLength, locAngle, locShape, forceapproach, tryNearest) {
    const collisionMap = this.levelCollisionMap[this.currentLevel];
    if (!collisionMap) {
      return false;
    }
    const sceneWidth = 104 /* SIZE */;
    const sceneLength = 104 /* SIZE */;
    for (let x2 = 0;x2 < sceneWidth; x2++) {
      for (let z2 = 0;z2 < sceneLength; z2++) {
        const index = CollisionMap.index(x2, z2);
        this.bfsDirection[index] = 0;
        this.bfsCost[index] = 99999999;
      }
    }
    let x = srcX;
    let z = srcZ;
    const srcIndex = CollisionMap.index(srcX, srcZ);
    this.bfsDirection[srcIndex] = 99;
    this.bfsCost[srcIndex] = 0;
    let steps = 0;
    let length = 0;
    this.bfsStepX[steps] = srcX;
    this.bfsStepZ[steps++] = srcZ;
    let arrived = false;
    let bufferSize = this.bfsStepX.length;
    const flags = collisionMap.flags;
    while (length !== steps) {
      x = this.bfsStepX[length];
      z = this.bfsStepZ[length];
      length = (length + 1) % bufferSize;
      if (x === dx && z === dz) {
        arrived = true;
        break;
      }
      if (locShape !== LocShape.WALL_STRAIGHT.id) {
        if ((locShape < LocShape.WALLDECOR_STRAIGHT_OFFSET.id || locShape === LocShape.CENTREPIECE_STRAIGHT.id) && collisionMap.reachedWall(x, z, dx, dz, locShape - 1, locAngle)) {
          arrived = true;
          break;
        }
        if (locShape < LocShape.CENTREPIECE_STRAIGHT.id && collisionMap.reachedWallDecoration(x, z, dx, dz, locShape - 1, locAngle)) {
          arrived = true;
          break;
        }
      }
      if (locWidth !== 0 && locLength !== 0 && collisionMap.reachedLoc(x, z, dx, dz, locWidth, locLength, forceapproach)) {
        arrived = true;
        break;
      }
      const nextCost = this.bfsCost[CollisionMap.index(x, z)] + 1;
      let index = CollisionMap.index(x - 1, z);
      if (x > 0 && this.bfsDirection[index] === 0 && (flags[index] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x - 1;
        this.bfsStepZ[steps] = z;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 2;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x + 1, z);
      if (x < sceneWidth - 1 && this.bfsDirection[index] === 0 && (flags[index] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x + 1;
        this.bfsStepZ[steps] = z;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 8;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x, z - 1);
      if (z > 0 && this.bfsDirection[index] === 0 && (flags[index] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x;
        this.bfsStepZ[steps] = z - 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 1;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x, z + 1);
      if (z < sceneLength - 1 && this.bfsDirection[index] === 0 && (flags[index] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x;
        this.bfsStepZ[steps] = z + 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 4;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x - 1, z - 1);
      if (x > 0 && z > 0 && this.bfsDirection[index] === 0 && (flags[index] & 2621710 /* BLOCK_SOUTH_WEST */) === 0 && (flags[CollisionMap.index(x - 1, z)] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */ && (flags[CollisionMap.index(x, z - 1)] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x - 1;
        this.bfsStepZ[steps] = z - 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 3;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x + 1, z - 1);
      if (x < sceneWidth - 1 && z > 0 && this.bfsDirection[index] === 0 && (flags[index] & 2621827 /* BLOCK_SOUTH_EAST */) === 0 && (flags[CollisionMap.index(x + 1, z)] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */ && (flags[CollisionMap.index(x, z - 1)] & 2621698 /* BLOCK_SOUTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x + 1;
        this.bfsStepZ[steps] = z - 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 9;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x - 1, z + 1);
      if (x > 0 && z < sceneLength - 1 && this.bfsDirection[index] === 0 && (flags[index] & 2621752 /* BLOCK_NORTH_WEST */) === 0 && (flags[CollisionMap.index(x - 1, z)] & 2621704 /* BLOCK_WEST */) === 0 /* OPEN */ && (flags[CollisionMap.index(x, z + 1)] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x - 1;
        this.bfsStepZ[steps] = z + 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 6;
        this.bfsCost[index] = nextCost;
      }
      index = CollisionMap.index(x + 1, z + 1);
      if (x < sceneWidth - 1 && z < sceneLength - 1 && this.bfsDirection[index] === 0 && (flags[index] & 2621920 /* BLOCK_NORTH_EAST */) === 0 && (flags[CollisionMap.index(x + 1, z)] & 2621824 /* BLOCK_EAST */) === 0 /* OPEN */ && (flags[CollisionMap.index(x, z + 1)] & 2621728 /* BLOCK_NORTH */) === 0 /* OPEN */) {
        this.bfsStepX[steps] = x + 1;
        this.bfsStepZ[steps] = z + 1;
        steps = (steps + 1) % bufferSize;
        this.bfsDirection[index] = 12;
        this.bfsCost[index] = nextCost;
      }
    }
    this.tryMoveNearest = 0;
    if (!arrived) {
      if (tryNearest) {
        let min = 100;
        for (let padding = 1;padding < 2; padding++) {
          for (let px = dx - padding;px <= dx + padding; px++) {
            for (let pz = dz - padding;pz <= dz + padding; pz++) {
              const index = CollisionMap.index(px, pz);
              if (px >= 0 && pz >= 0 && px < 104 /* SIZE */ && pz < 104 /* SIZE */ && this.bfsCost[index] < min) {
                min = this.bfsCost[index];
                x = px;
                z = pz;
                this.tryMoveNearest = 1;
                arrived = true;
              }
            }
          }
          if (arrived) {
            break;
          }
        }
      }
      if (!arrived) {
        return false;
      }
    }
    length = 0;
    this.bfsStepX[length] = x;
    this.bfsStepZ[length++] = z;
    let dir = this.bfsDirection[CollisionMap.index(x, z)];
    let next = dir;
    while (x !== srcX || z !== srcZ) {
      if (next !== dir) {
        dir = next;
        this.bfsStepX[length] = x;
        this.bfsStepZ[length++] = z;
      }
      if ((next & 2 /* EAST */) !== 0) {
        x++;
      } else if ((next & 8 /* WEST */) !== 0) {
        x--;
      }
      if ((next & 1 /* NORTH */) !== 0) {
        z++;
      } else if ((next & 4 /* SOUTH */) !== 0) {
        z--;
      }
      next = this.bfsDirection[CollisionMap.index(x, z)];
    }
    if (length > 0) {
      bufferSize = Math.min(length, 25);
      length--;
      const startX = this.bfsStepX[length];
      const startZ = this.bfsStepZ[length];
      if (type === 0) {
        this.out.p1isaac(181 /* MOVE_GAMECLICK */);
        this.out.p1(bufferSize + bufferSize + 3);
      } else if (type === 1) {
        this.out.p1isaac(165 /* MOVE_MINIMAPCLICK */);
        this.out.p1(bufferSize + bufferSize + 3 + 14);
      } else if (type === 2) {
        this.out.p1isaac(93 /* MOVE_OPCLICK */);
        this.out.p1(bufferSize + bufferSize + 3);
      }
      if (this.actionKey[5] === 1) {
        this.out.p1(1);
      } else {
        this.out.p1(0);
      }
      this.out.p2(startX + this.sceneBaseTileX);
      this.out.p2(startZ + this.sceneBaseTileZ);
      this.flagSceneTileX = this.bfsStepX[0];
      this.flagSceneTileZ = this.bfsStepZ[0];
      for (let i = 1;i < bufferSize; i++) {
        length--;
        this.out.p1(this.bfsStepX[length] - startX);
        this.out.p1(this.bfsStepZ[length] - startZ);
      }
      return true;
    }
    return type !== 1;
  }
  readPlayerInfo(buf, size) {
    this.entityRemovalCount = 0;
    this.entityUpdateCount = 0;
    this.readLocalPlayer(buf);
    this.readPlayers(buf);
    this.readNewPlayers(buf, size);
    this.readPlayerUpdates(buf);
    for (let i = 0;i < this.entityRemovalCount; i++) {
      const index = this.entityRemovalIds[i];
      const player = this.players[index];
      if (!player) {
        continue;
      }
      if (player.cycle !== this.loopCycle) {
        this.players[index] = null;
      }
    }
    if (buf.pos !== size) {
      console.error(`eek! Error packet size mismatch in getplayer pos:${buf.pos} psize:${size}`);
      throw new Error;
    }
    for (let index = 0;index < this.playerCount; index++) {
      if (!this.players[this.playerIds[index]]) {
        console.error(`eek! ${this.usernameInput} null entry in pl list - pos:${index} size:${this.playerCount}`);
        throw new Error;
      }
    }
  }
  readLocalPlayer(buf) {
    buf.bits();
    const hasUpdate = buf.gBit(1);
    if (hasUpdate !== 0) {
      const updateType = buf.gBit(2);
      if (updateType === 0) {
        this.entityUpdateIds[this.entityUpdateCount++] = 2047 /* LOCAL_PLAYER_INDEX */;
      } else if (updateType === 1) {
        const walkDir = buf.gBit(3);
        this.localPlayer?.step(false, walkDir);
        const hasMaskUpdate = buf.gBit(1);
        if (hasMaskUpdate === 1) {
          this.entityUpdateIds[this.entityUpdateCount++] = 2047 /* LOCAL_PLAYER_INDEX */;
        }
      } else if (updateType === 2) {
        const walkDir = buf.gBit(3);
        this.localPlayer?.step(true, walkDir);
        const runDir = buf.gBit(3);
        this.localPlayer?.step(true, runDir);
        const hasMaskUpdate = buf.gBit(1);
        if (hasMaskUpdate === 1) {
          this.entityUpdateIds[this.entityUpdateCount++] = 2047 /* LOCAL_PLAYER_INDEX */;
        }
      } else if (updateType === 3) {
        this.currentLevel = buf.gBit(2);
        const localX = buf.gBit(7);
        const localZ = buf.gBit(7);
        const jump = buf.gBit(1);
        this.localPlayer?.move(jump === 1, localX, localZ);
        const hasMaskUpdate = buf.gBit(1);
        if (hasMaskUpdate === 1) {
          this.entityUpdateIds[this.entityUpdateCount++] = 2047 /* LOCAL_PLAYER_INDEX */;
        }
      }
    }
  }
  readPlayers(buf) {
    const count = buf.gBit(8);
    if (count < this.playerCount) {
      for (let i = count;i < this.playerCount; i++) {
        this.entityRemovalIds[this.entityRemovalCount++] = this.playerIds[i];
      }
    }
    if (count > this.playerCount) {
      console.error(`eek! ${this.usernameInput} Too many players`);
      throw new Error;
    }
    this.playerCount = 0;
    for (let i = 0;i < count; i++) {
      const index = this.playerIds[i];
      const player = this.players[index];
      const hasUpdate = buf.gBit(1);
      if (hasUpdate === 0) {
        this.playerIds[this.playerCount++] = index;
        if (player) {
          player.cycle = this.loopCycle;
        }
      } else {
        const updateType = buf.gBit(2);
        if (updateType === 0) {
          this.playerIds[this.playerCount++] = index;
          if (player) {
            player.cycle = this.loopCycle;
          }
          this.entityUpdateIds[this.entityUpdateCount++] = index;
        } else if (updateType === 1) {
          this.playerIds[this.playerCount++] = index;
          if (player) {
            player.cycle = this.loopCycle;
          }
          const walkDir = buf.gBit(3);
          player?.step(false, walkDir);
          const hasMaskUpdate = buf.gBit(1);
          if (hasMaskUpdate === 1) {
            this.entityUpdateIds[this.entityUpdateCount++] = index;
          }
        } else if (updateType === 2) {
          this.playerIds[this.playerCount++] = index;
          if (player) {
            player.cycle = this.loopCycle;
          }
          const walkDir = buf.gBit(3);
          player?.step(true, walkDir);
          const runDir = buf.gBit(3);
          player?.step(true, runDir);
          const hasMaskUpdate = buf.gBit(1);
          if (hasMaskUpdate === 1) {
            this.entityUpdateIds[this.entityUpdateCount++] = index;
          }
        } else if (updateType === 3) {
          this.entityRemovalIds[this.entityRemovalCount++] = index;
        }
      }
    }
  }
  readNewPlayers(buf, size) {
    let index;
    while (buf.bitPos + 10 < size * 8) {
      index = buf.gBit(11);
      if (index === 2047) {
        break;
      }
      if (!this.players[index]) {
        this.players[index] = new PlayerEntity;
        const appearance = this.playerAppearanceBuffer[index];
        if (appearance) {
          this.players[index]?.read(appearance);
        }
      }
      this.playerIds[this.playerCount++] = index;
      const player = this.players[index];
      if (player) {
        player.cycle = this.loopCycle;
      }
      let dx = buf.gBit(5);
      if (dx > 15) {
        dx -= 32;
      }
      let dz = buf.gBit(5);
      if (dz > 15) {
        dz -= 32;
      }
      const jump = buf.gBit(1);
      if (this.localPlayer) {
        player?.move(jump === 1, this.localPlayer.routeFlagX[0] + dx, this.localPlayer.routeFlagZ[0] + dz);
      }
      const hasMaskUpdate = buf.gBit(1);
      if (hasMaskUpdate === 1) {
        this.entityUpdateIds[this.entityUpdateCount++] = index;
      }
    }
    buf.bytes();
  }
  readPlayerUpdates(buf) {
    for (let i = 0;i < this.entityUpdateCount; i++) {
      const index = this.entityUpdateIds[i];
      const player = this.players[index];
      if (!player) {
        continue;
      }
      let mask = buf.g1();
      if ((mask & 128 /* BIG_UPDATE */) !== 0) {
        mask += buf.g1() << 8;
      }
      this.readPlayerUpdatesBlocks(player, index, mask, buf);
    }
  }
  readPlayerUpdatesBlocks(player, index, mask, buf) {
    player.lastMask = mask;
    player.lastMaskCycle = this.loopCycle;
    if ((mask & 1 /* APPEARANCE */) !== 0) {
      const length = buf.g1();
      const data = new Uint8Array(length);
      const appearance = new Packet(data);
      buf.gdata(length, 0, data);
      this.playerAppearanceBuffer[index] = appearance;
      player.read(appearance);
    }
    if ((mask & 2 /* ANIM */) !== 0) {
      let seqId = buf.g2();
      if (seqId === 65535) {
        seqId = -1;
      }
      if (seqId === player.primarySeqId) {
        player.primarySeqLoop = 0;
      }
      const delay = buf.g1();
      if (seqId === -1 || player.primarySeqId === -1 || SeqType.instances[seqId].seqPriority > SeqType.instances[player.primarySeqId].seqPriority || SeqType.instances[player.primarySeqId].seqPriority === 0) {
        player.primarySeqId = seqId;
        player.primarySeqFrame = 0;
        player.primarySeqCycle = 0;
        player.primarySeqDelay = delay;
        player.primarySeqLoop = 0;
      }
    }
    if ((mask & 4 /* FACE_ENTITY */) !== 0) {
      player.targetId = buf.g2();
      if (player.targetId === 65535) {
        player.targetId = -1;
      }
    }
    if ((mask & 8 /* SAY */) !== 0) {
      player.chat = buf.gjstr();
      player.chatColor = 0;
      player.chatStyle = 0;
      player.chatTimer = 150;
      if (player.name) {
        this.addMessage(2, player.chat, player.name);
      }
    }
    if ((mask & 16 /* DAMAGE */) !== 0) {
      player.damage = buf.g1();
      player.damageType = buf.g1();
      player.combatCycle = this.loopCycle + 400;
      player.health = buf.g1();
      player.totalHealth = buf.g1();
    }
    if ((mask & 32 /* FACE_COORD */) !== 0) {
      player.targetTileX = buf.g2();
      player.targetTileZ = buf.g2();
      player.lastFaceX = player.targetTileX;
      player.lastFaceZ = player.targetTileZ;
    }
    if ((mask & 64 /* CHAT */) !== 0) {
      const colorEffect = buf.g2();
      const type = buf.g1();
      const length = buf.g1();
      const start = buf.pos;
      if (player.name) {
        const username = JString.toBase37(player.name);
        let ignored = false;
        if (type <= 1) {
          for (let i = 0;i < this.ignoreCount; i++) {
            if (this.ignoreName37[i] === username) {
              ignored = true;
              break;
            }
          }
        }
        if (!ignored && this.overrideChat === 0) {
          try {
            const uncompressed = WordPack.unpack(buf, length);
            const filtered = WordFilter.filter(uncompressed);
            player.chat = filtered;
            player.chatColor = colorEffect >> 8;
            player.chatStyle = colorEffect & 255;
            player.chatTimer = 150;
            if (type > 1) {
              this.addMessage(1, filtered, player.name);
            } else {
              this.addMessage(2, filtered, player.name);
            }
          } catch (e) {
          }
        }
      }
      buf.pos = start + length;
    }
    if ((mask & 256 /* SPOTANIM */) !== 0) {
      player.spotanimId = buf.g2();
      const heightDelay = buf.g4();
      player.spotanimOffset = heightDelay >> 16;
      player.spotanimLastCycle = this.loopCycle + (heightDelay & 65535);
      player.spotanimFrame = 0;
      player.spotanimCycle = 0;
      if (player.spotanimLastCycle > this.loopCycle) {
        player.spotanimFrame = -1;
      }
      if (player.spotanimId === 65535) {
        player.spotanimId = -1;
      }
    }
    if ((mask & 512 /* EXACT_MOVE */) !== 0) {
      player.forceMoveStartSceneTileX = buf.g1();
      player.forceMoveStartSceneTileZ = buf.g1();
      player.forceMoveEndSceneTileX = buf.g1();
      player.forceMoveEndSceneTileZ = buf.g1();
      player.forceMoveEndCycle = buf.g2() + this.loopCycle;
      player.forceMoveStartCycle = buf.g2() + this.loopCycle;
      player.forceMoveFaceDirection = buf.g1();
      player.routeLength = 0;
      player.routeFlagX[0] = player.forceMoveEndSceneTileX;
      player.routeFlagZ[0] = player.forceMoveEndSceneTileZ;
    }
  }
  readNpcInfo(buf, size) {
    this.entityRemovalCount = 0;
    this.entityUpdateCount = 0;
    this.readNpcs(buf);
    this.readNewNpcs(buf, size);
    this.readNpcUpdates(buf);
    for (let i = 0;i < this.entityRemovalCount; i++) {
      const index = this.entityRemovalIds[i];
      const npc = this.npcs[index];
      if (!npc) {
        continue;
      }
      if (npc.cycle !== this.loopCycle) {
        npc.npcType = null;
        this.npcs[index] = null;
      }
    }
    if (buf.pos !== size) {
      console.error(`eek! ${this.usernameInput} size mismatch in getnpcpos - pos:${buf.pos} psize:${size}`);
      throw new Error;
    }
    for (let i = 0;i < this.npcCount; i++) {
      if (!this.npcs[this.npcIds[i]]) {
        console.error(`eek! ${this.usernameInput} null entry in npc list - pos:${i} size:${this.npcCount}`);
        throw new Error;
      }
    }
  }
  readNpcs(buf) {
    buf.bits();
    const count = buf.gBit(8);
    if (count < this.npcCount) {
      for (let i = count;i < this.npcCount; i++) {
        this.entityRemovalIds[this.entityRemovalCount++] = this.npcIds[i];
      }
    }
    if (count > this.npcCount) {
      console.error(`eek! ${this.usernameInput} Too many npcs`);
      throw new Error;
    }
    this.npcCount = 0;
    for (let i = 0;i < count; i++) {
      const index = this.npcIds[i];
      const npc = this.npcs[index];
      const hasUpdate = buf.gBit(1);
      if (hasUpdate === 0) {
        this.npcIds[this.npcCount++] = index;
        if (npc) {
          npc.cycle = this.loopCycle;
        }
      } else {
        const updateType = buf.gBit(2);
        if (updateType === 0) {
          this.npcIds[this.npcCount++] = index;
          if (npc) {
            npc.cycle = this.loopCycle;
          }
          this.entityUpdateIds[this.entityUpdateCount++] = index;
        } else if (updateType === 1) {
          this.npcIds[this.npcCount++] = index;
          if (npc) {
            npc.cycle = this.loopCycle;
          }
          const walkDir = buf.gBit(3);
          npc?.step(false, walkDir);
          const hasMaskUpdate = buf.gBit(1);
          if (hasMaskUpdate === 1) {
            this.entityUpdateIds[this.entityUpdateCount++] = index;
          }
        } else if (updateType === 2) {
          this.npcIds[this.npcCount++] = index;
          if (npc) {
            npc.cycle = this.loopCycle;
          }
          const walkDir = buf.gBit(3);
          npc?.step(true, walkDir);
          const runDir = buf.gBit(3);
          npc?.step(true, runDir);
          const hasMaskUpdate = buf.gBit(1);
          if (hasMaskUpdate === 1) {
            this.entityUpdateIds[this.entityUpdateCount++] = index;
          }
        } else if (updateType === 3) {
          this.entityRemovalIds[this.entityRemovalCount++] = index;
        }
      }
    }
  }
  readNewNpcs(buf, size) {
    while (buf.bitPos + 21 < size * 8) {
      const index = buf.gBit(13);
      if (index === 8191) {
        break;
      }
      if (!this.npcs[index]) {
        this.npcs[index] = new NpcEntity;
      }
      const npc = this.npcs[index];
      this.npcIds[this.npcCount++] = index;
      if (npc) {
        npc.cycle = this.loopCycle;
        npc.npcType = NpcType.get(buf.gBit(11));
        npc.size = npc.npcType.size;
        npc.seqWalkId = npc.npcType.walkanim;
        npc.seqTurnAroundId = npc.npcType.walkanim_b;
        npc.seqTurnLeftId = npc.npcType.walkanim_r;
        npc.seqTurnRightId = npc.npcType.walkanim_l;
        npc.seqStandId = npc.npcType.readyanim;
      } else {
        buf.gBit(11);
      }
      let dx = buf.gBit(5);
      if (dx > 15) {
        dx -= 32;
      }
      let dz = buf.gBit(5);
      if (dz > 15) {
        dz -= 32;
      }
      if (this.localPlayer) {
        npc?.move(false, this.localPlayer.routeFlagX[0] + dx, this.localPlayer.routeFlagZ[0] + dz);
      }
      const update = buf.gBit(1);
      if (update === 1) {
        this.entityUpdateIds[this.entityUpdateCount++] = index;
      }
    }
    buf.bytes();
  }
  readNpcUpdates(buf) {
    for (let i = 0;i < this.entityUpdateCount; i++) {
      const id = this.entityUpdateIds[i];
      const npc = this.npcs[id];
      if (!npc) {
        continue;
      }
      const mask = buf.g1();
      npc.lastMask = mask;
      npc.lastMaskCycle = this.loopCycle;
      if ((mask & 2 /* ANIM */) !== 0) {
        let seqId = buf.g2();
        if (seqId === 65535) {
          seqId = -1;
        }
        if (seqId === npc.primarySeqId) {
          npc.primarySeqLoop = 0;
        }
        const delay = buf.g1();
        if (seqId === -1 || npc.primarySeqId === -1 || SeqType.instances[seqId].seqPriority > SeqType.instances[npc.primarySeqId].seqPriority || SeqType.instances[npc.primarySeqId].seqPriority === 0) {
          npc.primarySeqId = seqId;
          npc.primarySeqFrame = 0;
          npc.primarySeqCycle = 0;
          npc.primarySeqDelay = delay;
          npc.primarySeqLoop = 0;
        }
      }
      if ((mask & 4 /* FACE_ENTITY */) !== 0) {
        npc.targetId = buf.g2();
        if (npc.targetId === 65535) {
          npc.targetId = -1;
        }
      }
      if ((mask & 8 /* SAY */) !== 0) {
        npc.chat = buf.gjstr();
        npc.chatTimer = 100;
      }
      if ((mask & 16 /* DAMAGE */) !== 0) {
        npc.damage = buf.g1();
        npc.damageType = buf.g1();
        npc.combatCycle = this.loopCycle + 400;
        npc.health = buf.g1();
        npc.totalHealth = buf.g1();
      }
      if ((mask & 32 /* CHANGE_TYPE */) !== 0) {
        npc.npcType = NpcType.get(buf.g2());
        npc.seqWalkId = npc.npcType.walkanim;
        npc.seqTurnAroundId = npc.npcType.walkanim_b;
        npc.seqTurnLeftId = npc.npcType.walkanim_r;
        npc.seqTurnRightId = npc.npcType.walkanim_l;
        npc.seqStandId = npc.npcType.readyanim;
      }
      if ((mask & 64 /* SPOTANIM */) !== 0) {
        npc.spotanimId = buf.g2();
        const info = buf.g4();
        npc.spotanimOffset = info >> 16;
        npc.spotanimLastCycle = this.loopCycle + (info & 65535);
        npc.spotanimFrame = 0;
        npc.spotanimCycle = 0;
        if (npc.spotanimLastCycle > this.loopCycle) {
          npc.spotanimFrame = -1;
        }
        if (npc.spotanimId === 65535) {
          npc.spotanimId = -1;
        }
      }
      if ((mask & 128 /* FACE_COORD */) !== 0) {
        npc.targetTileX = buf.g2();
        npc.targetTileZ = buf.g2();
        npc.lastFaceX = npc.targetTileX;
        npc.lastFaceZ = npc.targetTileZ;
      }
    }
  }
  updatePlayers() {
    for (let i = -1;i < this.playerCount; i++) {
      let index;
      if (i === -1) {
        index = 2047 /* LOCAL_PLAYER_INDEX */;
      } else {
        index = this.playerIds[i];
      }
      const player = this.players[index];
      if (player) {
        this.updateEntity(player);
      }
    }
    Client.cyclelogic6++;
    if (Client.cyclelogic6 > 1406) {
      Client.cyclelogic6 = 0;
      this.out.p1isaac(219 /* ANTICHEAT_CYCLELOGIC6 */);
      this.out.p1(0);
      const start = this.out.pos;
      this.out.p1(162);
      this.out.p1(22);
      if ((Math.random() * 2 | 0) === 0) {
        this.out.p1(84);
      }
      this.out.p2(31824);
      this.out.p2(13490);
      if ((Math.random() * 2 | 0) === 0) {
        this.out.p1(123);
      }
      if ((Math.random() * 2 | 0) === 0) {
        this.out.p1(134);
      }
      this.out.p1(100);
      this.out.p1(94);
      this.out.p2(35521);
      this.out.psize1(this.out.pos - start);
    }
  }
  updateEntity(entity) {
    if (entity.x < 128 || entity.z < 128 || entity.x >= 13184 || entity.z >= 13184) {
      entity.primarySeqId = -1;
      entity.spotanimId = -1;
      entity.forceMoveEndCycle = 0;
      entity.forceMoveStartCycle = 0;
      entity.x = entity.routeFlagX[0] * 128 + entity.size * 64;
      entity.z = entity.routeFlagZ[0] * 128 + entity.size * 64;
      entity.routeLength = 0;
    }
    if (entity === this.localPlayer && (entity.x < 1536 || entity.z < 1536 || entity.x >= 11776 || entity.z >= 11776)) {
      entity.primarySeqId = -1;
      entity.spotanimId = -1;
      entity.forceMoveEndCycle = 0;
      entity.forceMoveStartCycle = 0;
      entity.x = entity.routeFlagX[0] * 128 + entity.size * 64;
      entity.z = entity.routeFlagZ[0] * 128 + entity.size * 64;
      entity.routeLength = 0;
    }
    if (entity.forceMoveEndCycle > this.loopCycle) {
      this.updateForceMovement(entity);
    } else if (entity.forceMoveStartCycle >= this.loopCycle) {
      this.startForceMovement(entity);
    } else {
      this.updateMovement(entity);
    }
    this.updateFacingDirection(entity);
    this.updateSequences(entity);
  }
  pushPlayers() {
    if (!this.localPlayer) {
      return;
    }
    if (this.localPlayer.x >> 7 === this.flagSceneTileX && this.localPlayer.z >> 7 === this.flagSceneTileZ) {
      this.flagSceneTileX = 0;
    }
    for (let i = -1;i < this.playerCount; i++) {
      let player;
      let id;
      if (i === -1) {
        player = this.localPlayer;
        id = 2047 /* LOCAL_PLAYER_INDEX */ << 14;
      } else {
        player = this.players[this.playerIds[i]];
        id = this.playerIds[i] << 14;
      }
      if (!player || !player.isVisibleNow()) {
        continue;
      }
      player.lowMemory = (Client.lowMemory && this.playerCount > 50 || this.playerCount > 200) && i !== -1 && player.secondarySeqId === player.seqStandId;
      const stx = player.x >> 7;
      const stz = player.z >> 7;
      if (stx < 0 || stx >= 104 /* SIZE */ || stz < 0 || stz >= 104 /* SIZE */) {
        continue;
      }
      if (!player.locModel || this.loopCycle < player.locStartCycle || this.loopCycle >= player.locStopCycle) {
        if ((player.x & 127) === 64 && (player.z & 127) === 64) {
          if (this.tileLastOccupiedCycle[stx][stz] === this.sceneCycle) {
            continue;
          }
          this.tileLastOccupiedCycle[stx][stz] = this.sceneCycle;
        }
        player.y = this.getHeightmapY(this.currentLevel, player.x, player.z);
        this.scene?.addTemporary(this.currentLevel, player.x, player.y, player.z, null, player, id, player.yaw, 60, player.seqStretches);
      } else {
        player.lowMemory = false;
        player.y = this.getHeightmapY(this.currentLevel, player.x, player.z);
        this.scene?.addTemporary2(this.currentLevel, player.x, player.y, player.z, player.minTileX, player.minTileZ, player.maxTileX, player.maxTileZ, null, player, id, player.yaw);
      }
    }
  }
  updateNpcs() {
    for (let i = 0;i < this.npcCount; i++) {
      const id = this.npcIds[i];
      const npc = this.npcs[id];
      if (npc && npc.npcType) {
        this.updateEntity(npc);
      }
    }
  }
  pushNpcs() {
    for (let i = 0;i < this.npcCount; i++) {
      const npc = this.npcs[this.npcIds[i]];
      const typecode = (this.npcIds[i] << 14) + 536870911 + 1 | 0;
      if (!npc || !npc.isVisibleNow()) {
        continue;
      }
      const x = npc.x >> 7;
      const z = npc.z >> 7;
      if (x < 0 || x >= 104 /* SIZE */ || z < 0 || z >= 104 /* SIZE */) {
        continue;
      }
      if (npc.size === 1 && (npc.x & 127) === 64 && (npc.z & 127) === 64) {
        if (this.tileLastOccupiedCycle[x][z] === this.sceneCycle) {
          continue;
        }
        this.tileLastOccupiedCycle[x][z] = this.sceneCycle;
      }
      this.scene?.addTemporary(this.currentLevel, npc.x, this.getHeightmapY(this.currentLevel, npc.x, npc.z), npc.z, null, npc, typecode, npc.yaw, (npc.size - 1) * 64 + 60, npc.seqStretches);
    }
  }
  pushProjectiles() {
    for (let proj = this.projectiles.head();proj; proj = this.projectiles.next()) {
      if (proj.projLevel !== this.currentLevel || this.loopCycle > proj.lastCycle) {
        proj.unlink();
      } else if (this.loopCycle >= proj.startCycle) {
        if (proj.projTarget > 0) {
          const npc = this.npcs[proj.projTarget - 1];
          if (npc) {
            proj.updateVelocity(npc.x, this.getHeightmapY(proj.projLevel, npc.x, npc.z) - proj.projOffsetY, npc.z, this.loopCycle);
          }
        }
        if (proj.projTarget < 0) {
          const index = -proj.projTarget - 1;
          let player;
          if (index === this.localPid) {
            player = this.localPlayer;
          } else {
            player = this.players[index];
          }
          if (player) {
            proj.updateVelocity(player.x, this.getHeightmapY(proj.projLevel, player.x, player.z) - proj.projOffsetY, player.z, this.loopCycle);
          }
        }
        proj.update(this.sceneDelta);
        this.scene?.addTemporary(this.currentLevel, proj.x | 0, proj.y | 0, proj.z | 0, null, proj, -1, proj.yaw, 60, false);
      }
    }
  }
  pushSpotanims() {
    for (let entity = this.spotanims.head();entity; entity = this.spotanims.next()) {
      if (entity.spotLevel !== this.currentLevel || entity.seqComplete) {
        entity.unlink();
      } else if (this.loopCycle >= entity.startCycle) {
        entity.update(this.sceneDelta);
        if (entity.seqComplete) {
          entity.unlink();
        } else {
          this.scene?.addTemporary(entity.spotLevel, entity.x, entity.y, entity.z, null, entity, -1, 0, 60, false);
        }
      }
    }
  }
  pushLocs() {
    for (let loc = this.locList.head();loc; loc = this.locList.next()) {
      let append = false;
      loc.seqCycle += this.sceneDelta;
      if (loc.seqFrame === -1) {
        loc.seqFrame = 0;
        append = true;
      }
      if (loc.seq.seqDelay) {
        while (loc.seqCycle > loc.seq.seqDelay[loc.seqFrame]) {
          loc.seqCycle -= loc.seq.seqDelay[loc.seqFrame] + 1;
          loc.seqFrame++;
          append = true;
          if (loc.seqFrame >= loc.seq.seqFrameCount) {
            loc.seqFrame -= loc.seq.replayoff;
            if (loc.seqFrame < 0 || loc.seqFrame >= loc.seq.seqFrameCount) {
              loc.unlink();
              append = false;
              break;
            }
          }
        }
      }
      if (append && this.scene) {
        const level = loc.heightmapSW;
        const x = loc.heightmapNE;
        const z = loc.heightmapNW;
        let typecode = 0;
        if (loc.heightmapSE === 0) {
          typecode = this.scene.getWallTypecode(level, x, z);
        } else if (loc.heightmapSE === 1) {
          typecode = this.scene.getDecorTypecode(level, z, x);
        } else if (loc.heightmapSE === 2) {
          typecode = this.scene.getLocTypecode(level, x, z);
        } else if (loc.heightmapSE === 3) {
          typecode = this.scene.getGroundDecorTypecode(level, x, z);
        }
        if (this.levelHeightmap && typecode !== 0 && (typecode >> 14 & 32767) === loc.index) {
          const heightmapSW = this.levelHeightmap[level][x][z];
          const heightmapSE = this.levelHeightmap[level][x + 1][z];
          const heightmapNE = this.levelHeightmap[level][x + 1][z + 1];
          const heightmapNW = this.levelHeightmap[level][x][z + 1];
          const type = LocType.get(loc.index);
          let seqId = -1;
          if (loc.seqFrame !== -1 && loc.seq.seqFrames) {
            seqId = loc.seq.seqFrames[loc.seqFrame];
          }
          if (loc.heightmapSE === 2) {
            const info = this.scene.getInfo(level, x, z, typecode);
            let shape = info & 31;
            const rotation = info >> 6;
            if (shape === LocShape.CENTREPIECE_DIAGONAL.id) {
              shape = LocShape.CENTREPIECE_STRAIGHT.id;
            }
            this.scene?.setLocModel(level, x, z, type.getModel(shape, rotation, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId));
          } else if (loc.heightmapSE === 1) {
            this.scene?.setWallDecorationModel(level, x, z, type.getModel(LocShape.WALLDECOR_STRAIGHT_NOOFFSET.id, 0, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId));
          } else if (loc.heightmapSE === 0) {
            const info = this.scene.getInfo(level, x, z, typecode);
            const shape = info & 31;
            const rotation = info >> 6;
            if (shape === LocShape.WALL_L.id) {
              const nextRotation = rotation + 1 & 3;
              this.scene?.setWallModels(x, z, level, type.getModel(LocShape.WALL_L.id, rotation + 4, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId), type.getModel(LocShape.WALL_L.id, nextRotation, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId));
            } else {
              this.scene?.setWallModel(level, x, z, type.getModel(shape, rotation, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId));
            }
          } else if (loc.heightmapSE === 3) {
            const info = this.scene.getInfo(level, x, z, typecode);
            const rotation = info >> 6;
            this.scene?.setGroundDecorationModel(level, x, z, type.getModel(LocShape.GROUND_DECOR.id, rotation, heightmapSW, heightmapSE, heightmapNE, heightmapNW, seqId));
          }
        } else {
          loc.unlink();
        }
      }
    }
  }
  updateEntityChats() {
    for (let i = -1;i < this.playerCount; i++) {
      let index;
      if (i === -1) {
        index = 2047 /* LOCAL_PLAYER_INDEX */;
      } else {
        index = this.playerIds[i];
      }
      const player = this.players[index];
      if (player && player.chatTimer > 0) {
        player.chatTimer--;
        if (player.chatTimer === 0) {
          player.chat = null;
        }
      }
    }
    for (let i = 0;i < this.npcCount; i++) {
      const index = this.npcIds[i];
      const npc = this.npcs[index];
      if (npc && npc.chatTimer > 0) {
        npc.chatTimer--;
        if (npc.chatTimer === 0) {
          npc.chat = null;
        }
      }
    }
  }
  updateForceMovement(entity) {
    const delta = entity.forceMoveEndCycle - this.loopCycle;
    const dstX = entity.forceMoveStartSceneTileX * 128 + entity.size * 64;
    const dstZ = entity.forceMoveStartSceneTileZ * 128 + entity.size * 64;
    entity.x += (dstX - entity.x) / delta | 0;
    entity.z += (dstZ - entity.z) / delta | 0;
    entity.seqTrigger = 0;
    if (entity.forceMoveFaceDirection === 0) {
      entity.dstYaw = 1024;
    }
    if (entity.forceMoveFaceDirection === 1) {
      entity.dstYaw = 1536;
    }
    if (entity.forceMoveFaceDirection === 2) {
      entity.dstYaw = 0;
    }
    if (entity.forceMoveFaceDirection === 3) {
      entity.dstYaw = 512;
    }
  }
  startForceMovement(entity) {
    if (entity.forceMoveStartCycle === this.loopCycle || entity.primarySeqId === -1 || entity.primarySeqDelay !== 0 || entity.primarySeqCycle + 1 > SeqType.instances[entity.primarySeqId].seqDelay[entity.primarySeqFrame]) {
      const duration = entity.forceMoveStartCycle - entity.forceMoveEndCycle;
      const delta = this.loopCycle - entity.forceMoveEndCycle;
      const dx0 = entity.forceMoveStartSceneTileX * 128 + entity.size * 64;
      const dz0 = entity.forceMoveStartSceneTileZ * 128 + entity.size * 64;
      const dx1 = entity.forceMoveEndSceneTileX * 128 + entity.size * 64;
      const dz1 = entity.forceMoveEndSceneTileZ * 128 + entity.size * 64;
      entity.x = (dx0 * (duration - delta) + dx1 * delta) / duration | 0;
      entity.z = (dz0 * (duration - delta) + dz1 * delta) / duration | 0;
    }
    entity.seqTrigger = 0;
    if (entity.forceMoveFaceDirection === 0) {
      entity.dstYaw = 1024;
    }
    if (entity.forceMoveFaceDirection === 1) {
      entity.dstYaw = 1536;
    }
    if (entity.forceMoveFaceDirection === 2) {
      entity.dstYaw = 0;
    }
    if (entity.forceMoveFaceDirection === 3) {
      entity.dstYaw = 512;
    }
    entity.yaw = entity.dstYaw;
  }
  updateFacingDirection(e) {
    if (e.targetId !== -1 && e.targetId < 32768) {
      const npc = this.npcs[e.targetId];
      if (npc) {
        const dstX = e.x - npc.x;
        const dstZ = e.z - npc.z;
        if (dstX !== 0 || dstZ !== 0) {
          e.dstYaw = (Math.atan2(dstX, dstZ) * 325.949 | 0) & 2047;
        }
      }
    }
    if (e.targetId >= 32768) {
      let index = e.targetId - 32768;
      if (index === this.localPid) {
        index = 2047 /* LOCAL_PLAYER_INDEX */;
      }
      const player = this.players[index];
      if (player) {
        const dstX = e.x - player.x;
        const dstZ = e.z - player.z;
        if (dstX !== 0 || dstZ !== 0) {
          e.dstYaw = (Math.atan2(dstX, dstZ) * 325.949 | 0) & 2047;
        }
      }
    }
    if ((e.targetTileX !== 0 || e.targetTileZ !== 0) && (e.routeLength === 0 || e.seqTrigger > 0)) {
      const dstX = e.x - (e.targetTileX - this.sceneBaseTileX - this.sceneBaseTileX) * 64;
      const dstZ = e.z - (e.targetTileZ - this.sceneBaseTileZ - this.sceneBaseTileZ) * 64;
      if (dstX !== 0 || dstZ !== 0) {
        e.dstYaw = (Math.atan2(dstX, dstZ) * 325.949 | 0) & 2047;
      }
      e.targetTileX = 0;
      e.targetTileZ = 0;
    }
    const remainingYaw = e.dstYaw - e.yaw & 2047;
    if (remainingYaw !== 0) {
      if (remainingYaw < 32 || remainingYaw > 2016) {
        e.yaw = e.dstYaw;
      } else if (remainingYaw > 1024) {
        e.yaw -= 32;
      } else {
        e.yaw += 32;
      }
      e.yaw &= 2047;
      if (e.secondarySeqId === e.seqStandId && e.yaw !== e.dstYaw) {
        if (e.seqTurnId !== -1) {
          e.secondarySeqId = e.seqTurnId;
          return;
        }
        e.secondarySeqId = e.seqWalkId;
      }
    }
  }
  updateSequences(e) {
    e.seqStretches = false;
    let seq;
    if (e.secondarySeqId !== -1) {
      seq = SeqType.instances[e.secondarySeqId];
      e.secondarySeqCycle++;
      if (seq.seqDelay && e.secondarySeqFrame < seq.seqFrameCount && e.secondarySeqCycle > seq.seqDelay[e.secondarySeqFrame]) {
        e.secondarySeqCycle = 0;
        e.secondarySeqFrame++;
      }
      if (e.secondarySeqFrame >= seq.seqFrameCount) {
        e.secondarySeqCycle = 0;
        e.secondarySeqFrame = 0;
      }
    }
    if (e.primarySeqId !== -1 && e.primarySeqDelay === 0) {
      seq = SeqType.instances[e.primarySeqId];
      e.primarySeqCycle++;
      while (seq.seqDelay && e.primarySeqFrame < seq.seqFrameCount && e.primarySeqCycle > seq.seqDelay[e.primarySeqFrame]) {
        e.primarySeqCycle -= seq.seqDelay[e.primarySeqFrame];
        e.primarySeqFrame++;
      }
      if (e.primarySeqFrame >= seq.seqFrameCount) {
        e.primarySeqFrame -= seq.replayoff;
        e.primarySeqLoop++;
        if (e.primarySeqLoop >= seq.replaycount) {
          e.primarySeqId = -1;
        }
        if (e.primarySeqFrame < 0 || e.primarySeqFrame >= seq.seqFrameCount) {
          e.primarySeqId = -1;
        }
      }
      e.seqStretches = seq.stretches;
    }
    if (e.primarySeqDelay > 0) {
      e.primarySeqDelay--;
    }
    if (e.spotanimId !== -1 && this.loopCycle >= e.spotanimLastCycle) {
      if (e.spotanimFrame < 0) {
        e.spotanimFrame = 0;
      }
      seq = SpotAnimType.instances[e.spotanimId].seq;
      e.spotanimCycle++;
      while (seq && seq.seqDelay && e.spotanimFrame < seq.seqFrameCount && e.spotanimCycle > seq.seqDelay[e.spotanimFrame]) {
        e.spotanimCycle -= seq.seqDelay[e.spotanimFrame];
        e.spotanimFrame++;
      }
      if (seq && e.spotanimFrame >= seq.seqFrameCount) {
        if (e.spotanimFrame < 0 || e.spotanimFrame >= seq.seqFrameCount) {
          e.spotanimId = -1;
        }
      }
    }
  }
  updateMovement(entity) {
    entity.secondarySeqId = entity.seqStandId;
    if (entity.routeLength === 0) {
      entity.seqTrigger = 0;
      return;
    }
    if (entity.primarySeqId !== -1 && entity.primarySeqDelay === 0) {
      const seq = SeqType.instances[entity.primarySeqId];
      if (!seq.walkmerge) {
        entity.seqTrigger++;
        return;
      }
    }
    const x = entity.x;
    const z = entity.z;
    const dstX = entity.routeFlagX[entity.routeLength - 1] * 128 + entity.size * 64;
    const dstZ = entity.routeFlagZ[entity.routeLength - 1] * 128 + entity.size * 64;
    if (dstX - x <= 256 && dstX - x >= -256 && dstZ - z <= 256 && dstZ - z >= -256) {
      if (x < dstX) {
        if (z < dstZ) {
          entity.dstYaw = 1280;
        } else if (z > dstZ) {
          entity.dstYaw = 1792;
        } else {
          entity.dstYaw = 1536;
        }
      } else if (x > dstX) {
        if (z < dstZ) {
          entity.dstYaw = 768;
        } else if (z > dstZ) {
          entity.dstYaw = 256;
        } else {
          entity.dstYaw = 512;
        }
      } else if (z < dstZ) {
        entity.dstYaw = 1024;
      } else {
        entity.dstYaw = 0;
      }
      let deltaYaw = entity.dstYaw - entity.yaw & 2047;
      if (deltaYaw > 1024) {
        deltaYaw -= 2048;
      }
      let seqId = entity.seqTurnAroundId;
      if (deltaYaw >= -256 && deltaYaw <= 256) {
        seqId = entity.seqWalkId;
      } else if (deltaYaw >= 256 && deltaYaw < 768) {
        seqId = entity.seqTurnRightId;
      } else if (deltaYaw >= -768 && deltaYaw <= -256) {
        seqId = entity.seqTurnLeftId;
      }
      if (seqId === -1) {
        seqId = entity.seqWalkId;
      }
      entity.secondarySeqId = seqId;
      let moveSpeed = 4;
      if (entity.yaw !== entity.dstYaw && entity.targetId === -1) {
        moveSpeed = 2;
      }
      if (entity.routeLength > 2) {
        moveSpeed = 6;
      }
      if (entity.routeLength > 3) {
        moveSpeed = 8;
      }
      if (entity.seqTrigger > 0 && entity.routeLength > 1) {
        moveSpeed = 8;
        entity.seqTrigger--;
      }
      if (entity.routeRun[entity.routeLength - 1]) {
        moveSpeed <<= 1;
      }
      if (moveSpeed >= 8 && entity.secondarySeqId === entity.seqWalkId && entity.seqRunId !== -1) {
        entity.secondarySeqId = entity.seqRunId;
      }
      if (x < dstX) {
        entity.x += moveSpeed;
        if (entity.x > dstX) {
          entity.x = dstX;
        }
      } else if (x > dstX) {
        entity.x -= moveSpeed;
        if (entity.x < dstX) {
          entity.x = dstX;
        }
      }
      if (z < dstZ) {
        entity.z += moveSpeed;
        if (entity.z > dstZ) {
          entity.z = dstZ;
        }
      } else if (z > dstZ) {
        entity.z -= moveSpeed;
        if (entity.z < dstZ) {
          entity.z = dstZ;
        }
      }
      if (entity.x === dstX && entity.z === dstZ) {
        entity.routeLength--;
      }
    } else {
      entity.x = dstX;
      entity.z = dstZ;
    }
  }
  getTopLevel() {
    let top = 3;
    if (this.cameraPitch < 310 && this.localPlayer) {
      let cameraLocalTileX = this.cameraX >> 7;
      let cameraLocalTileZ = this.cameraZ >> 7;
      const playerLocalTileX = this.localPlayer.x >> 7;
      const playerLocalTileZ = this.localPlayer.z >> 7;
      if (this.levelTileFlags && (this.levelTileFlags[this.currentLevel][cameraLocalTileX][cameraLocalTileZ] & 4) !== 0) {
        top = this.currentLevel;
      }
      let tileDeltaX;
      if (playerLocalTileX > cameraLocalTileX) {
        tileDeltaX = playerLocalTileX - cameraLocalTileX;
      } else {
        tileDeltaX = cameraLocalTileX - playerLocalTileX;
      }
      let tileDeltaZ;
      if (playerLocalTileZ > cameraLocalTileZ) {
        tileDeltaZ = playerLocalTileZ - cameraLocalTileZ;
      } else {
        tileDeltaZ = cameraLocalTileZ - playerLocalTileZ;
      }
      let delta;
      let accumulator;
      if (tileDeltaX > tileDeltaZ) {
        delta = tileDeltaZ * 65536 / tileDeltaX | 0;
        accumulator = 32768;
        while (cameraLocalTileX !== playerLocalTileX) {
          if (cameraLocalTileX < playerLocalTileX) {
            cameraLocalTileX++;
          } else if (cameraLocalTileX > playerLocalTileX) {
            cameraLocalTileX--;
          }
          if (this.levelTileFlags && (this.levelTileFlags[this.currentLevel][cameraLocalTileX][cameraLocalTileZ] & 4) !== 0) {
            top = this.currentLevel;
          }
          accumulator += delta;
          if (accumulator >= 65536) {
            accumulator -= 65536;
            if (cameraLocalTileZ < playerLocalTileZ) {
              cameraLocalTileZ++;
            } else if (cameraLocalTileZ > playerLocalTileZ) {
              cameraLocalTileZ--;
            }
            if (this.levelTileFlags && (this.levelTileFlags[this.currentLevel][cameraLocalTileX][cameraLocalTileZ] & 4) !== 0) {
              top = this.currentLevel;
            }
          }
        }
      } else {
        delta = tileDeltaX * 65536 / tileDeltaZ | 0;
        accumulator = 32768;
        while (cameraLocalTileZ !== playerLocalTileZ) {
          if (cameraLocalTileZ < playerLocalTileZ) {
            cameraLocalTileZ++;
          } else if (cameraLocalTileZ > playerLocalTileZ) {
            cameraLocalTileZ--;
          }
          if (this.levelTileFlags && (this.levelTileFlags[this.currentLevel][cameraLocalTileX][cameraLocalTileZ] & 4) !== 0) {
            top = this.currentLevel;
          }
          accumulator += delta;
          if (accumulator >= 65536) {
            accumulator -= 65536;
            if (cameraLocalTileX < playerLocalTileX) {
              cameraLocalTileX++;
            } else if (cameraLocalTileX > playerLocalTileX) {
              cameraLocalTileX--;
            }
            if (this.levelTileFlags && (this.levelTileFlags[this.currentLevel][cameraLocalTileX][cameraLocalTileZ] & 4) !== 0) {
              top = this.currentLevel;
            }
          }
        }
      }
    }
    if (this.localPlayer && this.levelTileFlags && (this.levelTileFlags[this.currentLevel][this.localPlayer.x >> 7][this.localPlayer.z >> 7] & 4) !== 0) {
      top = this.currentLevel;
    }
    return top;
  }
  getTopLevelCutscene() {
    if (!this.levelTileFlags) {
      return 0;
    }
    const y = this.getHeightmapY(this.currentLevel, this.cameraX, this.cameraZ);
    return y - this.cameraY >= 800 || (this.levelTileFlags[this.currentLevel][this.cameraX >> 7][this.cameraZ >> 7] & 4) === 0 ? 3 : this.currentLevel;
  }
  getHeightmapY(level, sceneX, sceneZ) {
    if (!this.levelHeightmap) {
      return 0;
    }
    const tileX = Math.min(sceneX >> 7, 104 /* SIZE */ - 1);
    const tileZ = Math.min(sceneZ >> 7, 104 /* SIZE */ - 1);
    let realLevel = level;
    if (level < 3 && this.levelTileFlags && (this.levelTileFlags[1][tileX][tileZ] & 2) === 2) {
      realLevel = level + 1;
    }
    const tileLocalX = sceneX & 127;
    const tileLocalZ = sceneZ & 127;
    const y00 = this.levelHeightmap[realLevel][tileX][tileZ] * (128 - tileLocalX) + this.levelHeightmap[realLevel][tileX + 1][tileZ] * tileLocalX >> 7;
    const y11 = this.levelHeightmap[realLevel][tileX][tileZ + 1] * (128 - tileLocalX) + this.levelHeightmap[realLevel][tileX + 1][tileZ + 1] * tileLocalX >> 7;
    return y00 * (128 - tileLocalZ) + y11 * tileLocalZ >> 7;
  }
  orbitCamera(targetX, targetY, targetZ, yaw, pitch, distance) {
    const invPitch = 2048 - pitch & 2047;
    const invYaw = 2048 - yaw & 2047;
    let x = 0;
    let z = 0;
    let y = distance;
    let sin;
    let cos;
    let tmp;
    if (invPitch !== 0) {
      sin = Pix3D.sin[invPitch];
      cos = Pix3D.cos[invPitch];
      tmp = z * cos - distance * sin >> 16;
      y = z * sin + distance * cos >> 16;
      z = tmp;
    }
    if (invYaw !== 0) {
      sin = Pix3D.sin[invYaw];
      cos = Pix3D.cos[invYaw];
      tmp = y * sin + x * cos >> 16;
      y = y * cos - x * sin >> 16;
      x = tmp;
    }
    this.cameraX = targetX - x;
    this.cameraY = targetY - z;
    this.cameraZ = targetZ - y;
    this.cameraPitch = pitch;
    this.cameraYaw = yaw;
  }
  updateOrbitCamera() {
    if (!this.localPlayer) {
      return;
    }
    const orbitX = this.localPlayer.x + this.cameraAnticheatOffsetX;
    const orbitZ = this.localPlayer.z + this.cameraAnticheatOffsetZ;
    if (this.orbitCameraX - orbitX < -500 || this.orbitCameraX - orbitX > 500 || this.orbitCameraZ - orbitZ < -500 || this.orbitCameraZ - orbitZ > 500) {
      this.orbitCameraX = orbitX;
      this.orbitCameraZ = orbitZ;
    }
    if (this.orbitCameraX !== orbitX) {
      this.orbitCameraX += (orbitX - this.orbitCameraX) / 16 | 0;
    }
    if (this.orbitCameraZ !== orbitZ) {
      this.orbitCameraZ += (orbitZ - this.orbitCameraZ) / 16 | 0;
    }
    if (this.actionKey[1] === 1) {
      this.orbitCameraYawVelocity += (-this.orbitCameraYawVelocity - 24) / 2 | 0;
    } else if (this.actionKey[2] === 1) {
      this.orbitCameraYawVelocity += (24 - this.orbitCameraYawVelocity) / 2 | 0;
    } else {
      this.orbitCameraYawVelocity = this.orbitCameraYawVelocity / 2 | 0;
    }
    if (this.actionKey[3] === 1) {
      this.orbitCameraPitchVelocity += (12 - this.orbitCameraPitchVelocity) / 2 | 0;
    } else if (this.actionKey[4] === 1) {
      this.orbitCameraPitchVelocity += (-this.orbitCameraPitchVelocity - 12) / 2 | 0;
    } else {
      this.orbitCameraPitchVelocity = this.orbitCameraPitchVelocity / 2 | 0;
    }
    this.orbitCameraYaw = (this.orbitCameraYaw + this.orbitCameraYawVelocity / 2 | 0) & 2047;
    this.orbitCameraPitch += this.orbitCameraPitchVelocity / 2 | 0;
    if (this.orbitCameraPitch < 128) {
      this.orbitCameraPitch = 128;
    }
    if (this.orbitCameraPitch > 383) {
      this.orbitCameraPitch = 383;
    }
    const orbitTileX = this.orbitCameraX >> 7;
    const orbitTileZ = this.orbitCameraZ >> 7;
    const orbitY = this.getHeightmapY(this.currentLevel, this.orbitCameraX, this.orbitCameraZ);
    let maxY = 0;
    if (this.levelHeightmap) {
      if (orbitTileX > 3 && orbitTileZ > 3 && orbitTileX < 100 && orbitTileZ < 100) {
        for (let x = orbitTileX - 4;x <= orbitTileX + 4; x++) {
          for (let z = orbitTileZ - 4;z <= orbitTileZ + 4; z++) {
            let level = this.currentLevel;
            if (level < 3 && this.levelTileFlags && (this.levelTileFlags[1][x][z] & 2) === 2) {
              level++;
            }
            const y = orbitY - this.levelHeightmap[level][x][z];
            if (y > maxY) {
              maxY = y;
            }
          }
        }
      }
    }
    let clamp = maxY * 192;
    if (clamp > 98048) {
      clamp = 98048;
    }
    if (clamp < 32768) {
      clamp = 32768;
    }
    if (clamp > this.cameraPitchClamp) {
      this.cameraPitchClamp += (clamp - this.cameraPitchClamp) / 24 | 0;
    } else if (clamp < this.cameraPitchClamp) {
      this.cameraPitchClamp += (clamp - this.cameraPitchClamp) / 80 | 0;
    }
  }
  applyCutscene() {
    let x = this.cutsceneSrcLocalTileX * 128 + 64;
    let z = this.cutsceneSrcLocalTileZ * 128 + 64;
    let y = this.getHeightmapY(this.currentLevel, this.cutsceneSrcLocalTileX, this.cutsceneSrcLocalTileZ) - this.cutsceneSrcHeight;
    if (this.cameraX < x) {
      this.cameraX += this.cutsceneMoveSpeed + ((x - this.cameraX) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraX > x) {
        this.cameraX = x;
      }
    }
    if (this.cameraX > x) {
      this.cameraX -= this.cutsceneMoveSpeed + ((this.cameraX - x) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraX < x) {
        this.cameraX = x;
      }
    }
    if (this.cameraY < y) {
      this.cameraY += this.cutsceneMoveSpeed + ((y - this.cameraY) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraY > y) {
        this.cameraY = y;
      }
    }
    if (this.cameraY > y) {
      this.cameraY -= this.cutsceneMoveSpeed + ((this.cameraY - y) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraY < y) {
        this.cameraY = y;
      }
    }
    if (this.cameraZ < z) {
      this.cameraZ += this.cutsceneMoveSpeed + ((z - this.cameraZ) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraZ > z) {
        this.cameraZ = z;
      }
    }
    if (this.cameraZ > z) {
      this.cameraZ -= this.cutsceneMoveSpeed + ((this.cameraZ - z) * this.cutsceneMoveAcceleration / 1000 | 0);
      if (this.cameraZ < z) {
        this.cameraZ = z;
      }
    }
    x = this.cutsceneDstLocalTileX * 128 + 64;
    z = this.cutsceneDstLocalTileZ * 128 + 64;
    y = this.getHeightmapY(this.currentLevel, this.cutsceneDstLocalTileX, this.cutsceneDstLocalTileZ) - this.cutsceneDstHeight;
    const deltaX = x - this.cameraX;
    const deltaY = y - this.cameraY;
    const deltaZ = z - this.cameraZ;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ) | 0;
    let pitch = (Math.atan2(deltaY, distance) * 325.949 | 0) & 2047;
    const yaw = (Math.atan2(deltaX, deltaZ) * -325.949 | 0) & 2047;
    if (pitch < 128) {
      pitch = 128;
    }
    if (pitch > 383) {
      pitch = 383;
    }
    if (this.cameraPitch < pitch) {
      this.cameraPitch += this.cutsceneRotateSpeed + ((pitch - this.cameraPitch) * this.cutsceneRotateAcceleration / 1000 | 0);
      if (this.cameraPitch > pitch) {
        this.cameraPitch = pitch;
      }
    }
    if (this.cameraPitch > pitch) {
      this.cameraPitch -= this.cutsceneRotateSpeed + ((this.cameraPitch - pitch) * this.cutsceneRotateAcceleration / 1000 | 0);
      if (this.cameraPitch < pitch) {
        this.cameraPitch = pitch;
      }
    }
    let deltaYaw = yaw - this.cameraYaw;
    if (deltaYaw > 1024) {
      deltaYaw -= 2048;
    }
    if (deltaYaw < -1024) {
      deltaYaw += 2048;
    }
    if (deltaYaw > 0) {
      this.cameraYaw += this.cutsceneRotateSpeed + (deltaYaw * this.cutsceneRotateAcceleration / 1000 | 0);
      this.cameraYaw &= 2047;
    }
    if (deltaYaw < 0) {
      this.cameraYaw -= this.cutsceneRotateSpeed + (-deltaYaw * this.cutsceneRotateAcceleration / 1000 | 0);
      this.cameraYaw &= 2047;
    }
    let tmp = yaw - this.cameraYaw;
    if (tmp > 1024) {
      tmp -= 2048;
    }
    if (tmp < -1024) {
      tmp += 2048;
    }
    if (tmp < 0 && deltaYaw > 0 || tmp > 0 && deltaYaw < 0) {
      this.cameraYaw = yaw;
    }
  }
  readZonePacket(buf, opcode) {
    const pos = buf.g1();
    let x = this.baseX + (pos >> 4 & 7);
    let z = this.baseZ + (pos & 7);
    if (opcode === 59 /* LOC_ADD_CHANGE */) {
      const info = buf.g1();
      const id = buf.g2();
      const shape = info >> 2;
      const angle = info & 3;
      const layer = LocShape.of(shape).layer;
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        this.appendLoc(-1, id, angle, layer, z, shape, this.currentLevel, x, 0);
      }
    } else if (opcode === 76 /* LOC_DEL */) {
      const info = buf.g1();
      const shape = info >> 2;
      const angle = info & 3;
      const layer = LocShape.of(shape).layer;
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        this.appendLoc(-1, -1, angle, layer, z, shape, this.currentLevel, x, 0);
      }
    } else if (opcode === 42 /* LOC_ANIM */) {
      const info = buf.g1();
      const shape = info >> 2;
      const layer = LocShape.of(shape).layer;
      const id = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */ && this.scene) {
        let typecode = 0;
        if (layer === 0 /* WALL */) {
          typecode = this.scene.getWallTypecode(this.currentLevel, x, z);
        } else if (layer === 1 /* WALL_DECOR */) {
          typecode = this.scene.getDecorTypecode(this.currentLevel, z, x);
        } else if (layer === 2 /* GROUND */) {
          typecode = this.scene.getLocTypecode(this.currentLevel, x, z);
        } else if (layer === 3 /* GROUND_DECOR */) {
          typecode = this.scene.getGroundDecorTypecode(this.currentLevel, x, z);
        }
        if (typecode !== 0) {
          const loc = new LocEntity(typecode >> 14 & 32767, this.currentLevel, layer, x, z, SeqType.instances[id], false);
          this.locList.addTail(loc);
        }
      }
    } else if (opcode === 223 /* OBJ_ADD */) {
      const id = buf.g2();
      const count = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        const obj = new ObjStackEntity(id, count);
        if (!this.objStacks[this.currentLevel][x][z]) {
          this.objStacks[this.currentLevel][x][z] = new LinkList;
        }
        this.objStacks[this.currentLevel][x][z]?.addTail(obj);
        this.sortObjStacks(x, z);
      }
    } else if (opcode === 49 /* OBJ_DEL */) {
      const id = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        const list = this.objStacks[this.currentLevel][x][z];
        if (list) {
          for (let next = list.head();next; next = list.next()) {
            if (next.index === (id & 32767)) {
              next.unlink();
              break;
            }
          }
          if (!list.head()) {
            this.objStacks[this.currentLevel][x][z] = null;
          }
          this.sortObjStacks(x, z);
        }
      }
    } else if (opcode === 69 /* MAP_PROJANIM */) {
      let dx = x + buf.g1b();
      let dz = z + buf.g1b();
      const target = buf.g2b();
      const spotanim = buf.g2();
      const srcHeight = buf.g1();
      const dstHeight = buf.g1();
      const startDelay = buf.g2();
      const endDelay = buf.g2();
      const peak = buf.g1();
      const arc = buf.g1();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */ && dx >= 0 && dz >= 0 && dx < 104 /* SIZE */ && dz < 104 /* SIZE */) {
        x = x * 128 + 64;
        z = z * 128 + 64;
        dx = dx * 128 + 64;
        dz = dz * 128 + 64;
        const proj = new ProjectileEntity(spotanim, this.currentLevel, x, this.getHeightmapY(this.currentLevel, x, z) - srcHeight, z, startDelay + this.loopCycle, endDelay + this.loopCycle, peak, arc, target, dstHeight);
        proj.updateVelocity(dx, this.getHeightmapY(this.currentLevel, dx, dz) - dstHeight, dz, startDelay + this.loopCycle);
        this.projectiles.addTail(proj);
      }
    } else if (opcode === 191 /* MAP_ANIM */) {
      const id = buf.g2();
      const height = buf.g1();
      const delay = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        x = x * 128 + 64;
        z = z * 128 + 64;
        const spotanim = new SpotAnimEntity(id, this.currentLevel, x, z, this.getHeightmapY(this.currentLevel, x, z) - height, this.loopCycle, delay);
        this.spotanims.addTail(spotanim);
      }
    } else if (opcode === 50 /* OBJ_REVEAL */) {
      const id = buf.g2();
      const count = buf.g2();
      const receiver = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */ && receiver !== this.localPid) {
        const obj = new ObjStackEntity(id, count);
        if (!this.objStacks[this.currentLevel][x][z]) {
          this.objStacks[this.currentLevel][x][z] = new LinkList;
        }
        this.objStacks[this.currentLevel][x][z]?.addTail(obj);
        this.sortObjStacks(x, z);
      }
    } else if (opcode === 23 /* LOC_MERGE */) {
      const info = buf.g1();
      const shape = info >> 2;
      const angle = info & 3;
      const layer = LocShape.of(shape).layer;
      const id = buf.g2();
      const start = buf.g2();
      const end = buf.g2();
      const pid = buf.g2();
      let east = buf.g1b();
      let south = buf.g1b();
      let west = buf.g1b();
      let north = buf.g1b();
      let player;
      if (pid === this.localPid) {
        player = this.localPlayer;
      } else {
        player = this.players[pid];
      }
      if (player && this.levelHeightmap) {
        this.appendLoc(start + this.loopCycle, -1, angle, layer, z, shape, this.currentLevel, x, end + this.loopCycle);
        const y0 = this.levelHeightmap[this.currentLevel][x][z];
        const y1 = this.levelHeightmap[this.currentLevel][x + 1][z];
        const y2 = this.levelHeightmap[this.currentLevel][x + 1][z + 1];
        const y3 = this.levelHeightmap[this.currentLevel][x][z + 1];
        const loc = LocType.get(id);
        player.locStartCycle = start + this.loopCycle;
        player.locStopCycle = end + this.loopCycle;
        player.locModel = loc.getModel(shape, angle, y0, y1, y2, y3, -1);
        let width = loc.width;
        let height = loc.length;
        if (angle === 1 /* NORTH */ || angle === 3 /* SOUTH */) {
          width = loc.length;
          height = loc.width;
        }
        player.locOffsetX = x * 128 + width * 64;
        player.locOffsetZ = z * 128 + height * 64;
        player.locOffsetY = this.getHeightmapY(this.currentLevel, player.locOffsetX, player.locOffsetZ);
        let tmp;
        if (east > west) {
          tmp = east;
          east = west;
          west = tmp;
        }
        if (south > north) {
          tmp = south;
          south = north;
          north = tmp;
        }
        player.minTileX = x + east;
        player.maxTileX = x + west;
        player.minTileZ = z + south;
        player.maxTileZ = z + north;
      }
    } else if (opcode === 151 /* OBJ_COUNT */) {
      const id = buf.g2();
      const oldCount = buf.g2();
      const newCount = buf.g2();
      if (x >= 0 && z >= 0 && x < 104 /* SIZE */ && z < 104 /* SIZE */) {
        const list = this.objStacks[this.currentLevel][x][z];
        if (list) {
          for (let next = list.head();next; next = list.next()) {
            if (next.index === (id & 32767) && next.count === oldCount) {
              next.count = newCount;
              break;
            }
          }
          this.sortObjStacks(x, z);
        }
      }
    }
  }
  updateTextures(cycle) {
    if (!Client.lowMemory) {
      if (Pix3D.textureCycle[17] >= cycle) {
        const texture = Pix3D.textures[17];
        if (!texture) {
          return;
        }
        const bottom = texture.width2d * texture.height2d - 1;
        const adjustment = texture.width2d * this.sceneDelta * 2;
        const src = texture.pixels;
        const dst = this.textureBuffer;
        for (let i = 0;i <= bottom; i++) {
          dst[i] = src[i - adjustment & bottom];
        }
        texture.pixels = dst;
        this.textureBuffer = src;
        Pix3D.pushTexture(17);
      }
      if (Pix3D.textureCycle[24] >= cycle) {
        const texture = Pix3D.textures[24];
        if (!texture) {
          return;
        }
        const bottom = texture.width2d * texture.height2d - 1;
        const adjustment = texture.width2d * this.sceneDelta * 2;
        const src = texture.pixels;
        const dst = this.textureBuffer;
        for (let i = 0;i <= bottom; i++) {
          dst[i] = src[i - adjustment & bottom];
        }
        texture.pixels = dst;
        this.textureBuffer = src;
        Pix3D.pushTexture(24);
      }
    }
  }
  updateFlames() {
    if (!this.flameBuffer3 || !this.flameBuffer2 || !this.flameBuffer0 || !this.flameLineOffset) {
      return;
    }
    const height = 256;
    for (let x = 10;x < 117; x++) {
      const rand = Math.random() * 100 | 0;
      if (rand < 50)
        this.flameBuffer3[x + (height - 2 << 7)] = 255;
    }
    for (let l = 0;l < 100; l++) {
      const x = (Math.random() * 124 | 0) + 2;
      const y = (Math.random() * 128 | 0) + 128;
      const index = x + (y << 7);
      this.flameBuffer3[index] = 192;
    }
    for (let y = 1;y < height - 1; y++) {
      for (let x = 1;x < 127; x++) {
        const index = x + (y << 7);
        this.flameBuffer2[index] = (this.flameBuffer3[index - 1] + this.flameBuffer3[index + 1] + this.flameBuffer3[index - 128] + this.flameBuffer3[index + 128]) / 4 | 0;
      }
    }
    this.flameCycle0 += 128;
    if (this.flameCycle0 > this.flameBuffer0.length) {
      this.flameCycle0 -= this.flameBuffer0.length;
      this.updateFlameBuffer(this.imageRunes[Math.random() * 12 | 0]);
    }
    for (let y = 1;y < height - 1; y++) {
      for (let x = 1;x < 127; x++) {
        const index = x + (y << 7);
        let intensity = this.flameBuffer2[index + 128] - (this.flameBuffer0[index + this.flameCycle0 & this.flameBuffer0.length - 1] / 5 | 0);
        if (intensity < 0) {
          intensity = 0;
        }
        this.flameBuffer3[index] = intensity;
      }
    }
    for (let y = 0;y < height - 1; y++) {
      this.flameLineOffset[y] = this.flameLineOffset[y + 1];
    }
    this.flameLineOffset[height - 1] = Math.sin(this.loopCycle / 14) * 16 + Math.sin(this.loopCycle / 15) * 14 + Math.sin(this.loopCycle / 16) * 12 | 0;
    if (this.flameGradientCycle0 > 0) {
      this.flameGradientCycle0 -= 4;
    }
    if (this.flameGradientCycle1 > 0) {
      this.flameGradientCycle1 -= 4;
    }
    if (this.flameGradientCycle0 === 0 && this.flameGradientCycle1 === 0) {
      const rand = Math.random() * 2000 | 0;
      if (rand === 0) {
        this.flameGradientCycle0 = 1024;
      } else if (rand === 1) {
        this.flameGradientCycle1 = 1024;
      }
    }
  }
  mix(src, alpha, dst) {
    const invAlpha = 256 - alpha;
    return ((src & 16711935) * invAlpha + (dst & 16711935) * alpha & 4278255360) + ((src & 65280) * invAlpha + (dst & 65280) * alpha & 16711680) >> 8;
  }
  drawFlames() {
    if (!this.flameGradient || !this.flameGradient0 || !this.flameGradient1 || !this.flameGradient2 || !this.flameLineOffset || !this.flameBuffer3) {
      return;
    }
    const height = 256;
    if (this.flameGradientCycle0 > 0) {
      for (let i = 0;i < 256; i++) {
        if (this.flameGradientCycle0 > 768) {
          this.flameGradient[i] = this.mix(this.flameGradient0[i], 1024 - this.flameGradientCycle0, this.flameGradient1[i]);
        } else if (this.flameGradientCycle0 > 256) {
          this.flameGradient[i] = this.flameGradient1[i];
        } else {
          this.flameGradient[i] = this.mix(this.flameGradient1[i], 256 - this.flameGradientCycle0, this.flameGradient0[i]);
        }
      }
    } else if (this.flameGradientCycle1 > 0) {
      for (let i = 0;i < 256; i++) {
        if (this.flameGradientCycle1 > 768) {
          this.flameGradient[i] = this.mix(this.flameGradient0[i], 1024 - this.flameGradientCycle1, this.flameGradient2[i]);
        } else if (this.flameGradientCycle1 > 256) {
          this.flameGradient[i] = this.flameGradient2[i];
        } else {
          this.flameGradient[i] = this.mix(this.flameGradient2[i], 256 - this.flameGradientCycle1, this.flameGradient0[i]);
        }
      }
    } else {
      for (let i = 0;i < 256; i++) {
        this.flameGradient[i] = this.flameGradient0[i];
      }
    }
    for (let i = 0;i < 33920; i++) {
      if (this.imageTitle0 && this.imageFlamesLeft)
        this.imageTitle0.pixels[i] = this.imageFlamesLeft.pixels[i];
    }
    let srcOffset = 0;
    let dstOffset = 1152;
    for (let y = 1;y < height - 1; y++) {
      const offset = this.flameLineOffset[y] * (height - y) / height | 0;
      let step = offset + 22;
      if (step < 0) {
        step = 0;
      }
      srcOffset += step;
      for (let x = step;x < 128; x++) {
        let value = this.flameBuffer3[srcOffset++];
        if (value === 0) {
          dstOffset++;
        } else {
          const alpha = value;
          const invAlpha = 256 - value;
          value = this.flameGradient[value];
          if (this.imageTitle0) {
            const background = this.imageTitle0.pixels[dstOffset];
            this.imageTitle0.pixels[dstOffset++] = ((value & 16711935) * alpha + (background & 16711935) * invAlpha & 4278255360) + ((value & 65280) * alpha + (background & 65280) * invAlpha & 16711680) >> 8;
          }
        }
      }
      dstOffset += step;
    }
    this.imageTitle0?.draw(0, 0);
    for (let i = 0;i < 33920; i++) {
      if (this.imageTitle1 && this.imageFlamesRight) {
        this.imageTitle1.pixels[i] = this.imageFlamesRight.pixels[i];
      }
    }
    srcOffset = 0;
    dstOffset = 1176;
    for (let y = 1;y < height - 1; y++) {
      const offset = this.flameLineOffset[y] * (height - y) / height | 0;
      const step = 103 - offset;
      dstOffset += offset;
      for (let x = 0;x < step; x++) {
        let value = this.flameBuffer3[srcOffset++];
        if (value === 0) {
          dstOffset++;
        } else {
          const alpha = value;
          const invAlpha = 256 - value;
          value = this.flameGradient[value];
          if (this.imageTitle1) {
            const background = this.imageTitle1.pixels[dstOffset];
            this.imageTitle1.pixels[dstOffset++] = ((value & 16711935) * alpha + (background & 16711935) * invAlpha & 4278255360) + ((value & 65280) * alpha + (background & 65280) * invAlpha & 16711680) >> 8;
          }
        }
      }
      srcOffset += 128 - step;
      dstOffset += 128 - step - offset;
    }
    this.imageTitle1?.draw(661, 0);
    if (this.isMobile) {
      MobileKeyboard2.draw();
    }
  }
}
export {
  Client
};

//# debugId=C42259C48550385564756E2164756E21
