import Hashes from '#enum/Hashes.js';
import Packet from '#util/Packet.js';

function genHash(name) {
    let hash = new DataView(new ArrayBuffer(4));
    name = name.toUpperCase();
    for (let i = 0; i < name.length; ++i) {
        hash.setInt32(0, hash.getInt32() * 61 + name.charCodeAt(i) - 32);
    }
    return hash.getInt32();
}

export default class Jagfile {
    static fromFile(path) {
        return new Jagfile(Packet.fromFile(path));
    }

    files = [];

    constructor(src) {
        if (!src) {
            return;
        }

        if (src instanceof ArrayBuffer || src instanceof Buffer) {
            src = new Packet(src);
        }

        if (src instanceof Packet) {
            src.pos = 0;
        }

        let unpackedSize = src.g3();
        let packedSize = src.g3();

        let isCompressedWhole = unpackedSize !== packedSize;

        let data = src.gPacket(packedSize);
        if (isCompressedWhole) {
            data = new Packet(data.bunzip2());
        }

        let count = data.g2();
        let pos = data.pos + (count * (4 + 3 + 3));
        for (let i = 0; i < count; ++i) {
            let hashName = data.g4s()
            let unpackedSize = data.g3();
            let packedSize = data.g3();

            let file = {
                hashName,
                name: Hashes.find(x => hashName == genHash(x)),
                data: data.gdata(packedSize, pos, false)
            };
            if (!isCompressedWhole) {
                file.data = Packet.bunzip2(file.data);
            }
            this.files.push(file);

            pos += packedSize;
        }
    }

    read(name, wrapped = true) {
        let hashName = genHash(name);
        let file = this.files.find(x => x.hashName === hashName);
        if (!file) {
            return null;
        }

        if (wrapped) {
            return new Packet(file.data);
        } else {
            return file.data;
        }
    }

    write(name, data) {
        let hashName = genHash(name);

        let index = this.files.findIndex(x => x.hashName === hashName);
        if (index === -1) {
            index = this.files.length;
        }

        let file = {
            hashName,
            name,
            data
        };
        this.files[index] = file;
    }

    pack() {
        let data = new Packet();

        let isCompressedWhole = this.files.length <= 1;

        data.p2(this.files.length);
        for (let file of this.files) {
            data.p4(file.hashName);
            data.p3(file.data.length);

            if (!isCompressedWhole) {
                file.compressed = Packet.bzip2(file.data, 0, file.data.length, false);
                data.p3(file.compressed.length);
            } else {
                data.p3(file.data.length);
            }
        }

        for (let file of this.files) {
            if (file.compressed) {
                data.pdata(file.compressed);
                delete file.compressed;
            } else {
                data.pdata(file.data);
            }
        }

        let jagfile = new Packet();
        jagfile.p3(data.length);
        
        if (isCompressedWhole) {
            data = Packet.bzip2(data, 0, data.length, false);
        }

        jagfile.p3(data.length);
        jagfile.pdata(data);
        return jagfile;
    }
}
