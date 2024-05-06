import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import RandomAccessFile from '#lostcity/util/RandomAccessFile.js';

export default class JagStore {
    dat: RandomAccessFile;
    idx: RandomAccessFile[] = [];

    constructor(dir: string, createNew: boolean = false, readOnly: boolean = false) {
        if (createNew && fs.existsSync(`${dir}/main_file_cache.dat`)) {
            fs.unlinkSync(`${dir}/main_file_cache.dat`);

            for (let i: number = 0; i <= 4; i++) {
                if (fs.existsSync(`${dir}/main_file_cache.idx${i}`)) {
                    fs.unlinkSync(`${dir}/main_file_cache.idx${i}`);
                }
            }
        }

        this.dat = new RandomAccessFile(`${dir}/main_file_cache.dat`, readOnly);

        for (let i: number = 0; i <= 4; i++) {
            this.idx[i] = new RandomAccessFile(`${dir}/main_file_cache.idx${i}`, readOnly);
        }
    }

    count(index: number): number {
        if (index < 0 || index > this.idx.length || !this.idx[index]) {
            return 0;
        }

        return this.idx[index].length / 6;
    }

    read(index: number, file: number): Uint8Array | null {
        if (!this.dat) {
            return null;
        }

        if (index < 0 || index >= this.idx.length || !this.idx[index]) {
            return null;
        }

        if (file < 0 || file >= this.count(index)) {
            return null;
        }

        const idx: RandomAccessFile = this.idx[index];
        idx.pos = file * 6;
        const idxHeader: Packet = idx.gPacket(6);

        const size: number = idxHeader.g3();
        let sector: number = idxHeader.g3();
        // console.log(`read: index=${index} file=${file} size=${size} sector=${sector}`);

        if (size > 2000000) {
            return null;
        }

        if (sector <= 0 || sector > this.dat.length / 520) {
            return null;
        }

        const data: Packet = new Packet(new Uint8Array(size));
        for (let part: number = 0; data.pos < data.data.length; part++) {
            if (sector === 0) {
                break;
            }

            this.dat.pos = sector * 520;

            let available: number = size - data.pos;
            if (available > 512) {
                available = 512;
            }

            const header: Packet = this.dat.gPacket(available + 8);
            const sectorFile: number = header.g2();
            const sectorPart: number = header.g2();
            const nextSector: number = header.g3();
            const sectorIndex: number = header.g1();

            if (file !== sectorFile || part !== sectorPart || index !== sectorIndex - 1) {
                return null;
            }

            if (nextSector < 0 || nextSector > this.dat.length / 520) {
                return null;
            }

            data.pdata(header.data, header.pos, header.data.length);

            sector = nextSector;
        }

        return data.data;
    }

    write(index: number, file: number, data: Uint8Array | Buffer | Packet, overwrite: boolean = false): boolean {
        if (data instanceof Packet) {
            data = data.data;
        }

        if (!this.dat) {
            return false;
        }

        if (index < 0 || index > this.idx.length || !this.idx[index]) {
            return false;
        }

        const idx: RandomAccessFile = this.idx[index];
        let sector: number;

        if (overwrite) {
            idx.pos = file * 6;
            const idxHeader: Packet = idx.gPacket(6);
            idxHeader.pos = 3;
            sector = idxHeader.g3();

            if (sector <= 0 || sector > this.dat.length / 520) {
                return false;
            }
        } else {
            sector = Math.trunc((this.dat.length + 519) / 520);

            if (sector === 0) {
                sector = 1;
            }
        }

        idx.pos = file * 6;
        const idxHeader: Packet = new Packet(new Uint8Array(6));
        idxHeader.p3(data.length);
        idxHeader.p3(sector);
        idx.pdata(idxHeader);
        // console.log(`write: index=${index} file=${file} size=${data.length} sector=${sector}`);

        let written: number = 0;
        for (let part: number = 0; written < data.length; part++) {
            let nextSector: number = 0;

            if (overwrite) {
                this.dat.pos = sector * 520;
                const header: Packet = this.dat.gPacket(8);
                const sectorFile: number = header.g2();
                const sectorPart: number = header.g2();
                nextSector = header.g3();
                const sectorIndex: number = header.g1();

                if (sectorFile !== file || sectorPart !== part || sectorIndex !== index - 1) {
                    return false;
                }

                if (nextSector < 0 || nextSector > this.dat.length / 520) {
                    return false;
                }
            }

            if (nextSector === 0) {
                overwrite = false;
                nextSector = Math.trunc((this.dat.length + 519) / 520);

                if (nextSector === 0) {
                    nextSector++;
                }

                if (nextSector === sector) {
                    nextSector++;
                }
            }

            if (data.length - written <= 512) {
                nextSector = 0;
            }

            this.dat.pos = sector * 520;
            const header: Packet = new Packet(new Uint8Array(8));
            header.p2(file);
            header.p2(part);
            header.p3(nextSector);
            header.p1(index + 1);
            this.dat.pdata(header);

            let available: number = data.length - written;
            if (available > 512) {
                available = 512;
            }

            this.dat.pdata(data.slice(written, written + available));
            written += available;
            sector = nextSector;
        }

        return true;
    }
}
