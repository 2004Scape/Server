import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import { AnimPack, ObjPack, SeqPack } from '#/util/PackFile.js';

export function parseSeqConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    // prettier-ignore
    const numberKeys = [
        'replayoff', 'priority', 'replaycount'
    ];
    // prettier-ignore
    const booleanKeys = [
        'stretches'
    ];

    if (stringKeys.includes(key)) {
        if (value.length > 1000) {
            // arbitrary limit
            return null;
        }

        return value;
    } else if (numberKeys.includes(key)) {
        let number;
        if (value.startsWith('0x')) {
            // check that the string contains only hexadecimal characters, and minus sign if applicable
            if (!/^-?[0-9a-fA-F]+$/.test(value.slice(2))) {
                return null;
            }

            number = parseInt(value, 16);
        } else {
            // check that the string contains only numeric characters, and minus sign if applicable
            if (!/^-?[0-9]+$/.test(value)) {
                return null;
            }

            number = parseInt(value);
        }

        if (Number.isNaN(number)) {
            return null;
        }

        if (key === 'replayoff' && (number < 0 || number > 1000)) {
            return null;
        }

        if (key === 'priority' && (number < 0 || number > 10)) {
            return null;
        }

        if (key === 'replaycount' && (number < 0 || number > 1000)) {
            return null;
        }

        return number;
    } else if (booleanKeys.includes(key)) {
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
    } else if (key.startsWith('frame')) {
        const index = AnimPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else if (key.startsWith('iframe')) {
        const index = AnimPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else if (key.startsWith('delay')) {
        const parsed = parseInt(value);
        if (isNaN(parsed)) {
            return null;
        }

        return parsed;
    } else if (key === 'walkmerge') {
        const parts = value.split(',');

        const labels = [];
        for (let i = 0; i < parts.length; i++) {
            // not tracking labels by name currently
            labels.push(parseInt(parts[i].substring(parts[i].indexOf('_') + 1)));
        }

        return labels;
    } else if (key === 'righthand') {
        if (value === 'hide') {
            return 0;
        }

        const index = ObjPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index + 512;
    } else if (key === 'lefthand') {
        if (value === 'hide') {
            return 0;
        }

        const index = ObjPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index + 512;
    } else {
        return undefined;
    }
}

export function packSeqConfigs(configs: Map<string, ConfigLine[]>): { client: PackedData, server: PackedData } {
    const client: PackedData = new PackedData(SeqPack.size);
    const server: PackedData = new PackedData(SeqPack.size);

    for (let i = 0; i < SeqPack.size; i++) {
        const debugname = SeqPack.getById(i);
        const config = configs.get(debugname)!;

        // collect these to write at the end
        const frames: number[] = [];
        const iframes: number[] = [];
        const delays: number[] = [];

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];
            if (key.startsWith('frame')) {
                const index = parseInt(key.substring('frame'.length)) - 1;
                frames[index] = value as number;
            } else if (key.startsWith('iframe')) {
                const index = parseInt(key.substring('iframe'.length)) - 1;
                iframes[index] = value as number;
            } else if (key.startsWith('delay')) {
                const index = parseInt(key.substring('delay'.length)) - 1;
                delays[index] = value as number;
            } else if (key === 'replayoff') {
                client.p1(2);
                client.p2(value as number);
            } else if (key === 'walkmerge') {
                client.p1(3);

                const labels = value as number[];
                client.p1(labels.length);
                for (let i = 0; i < labels.length; i++) {
                    client.p1(labels[i]);
                }
            } else if (key === 'stretches') {
                if (value === true) {
                    client.p1(4);
                }
            } else if (key === 'priority') {
                client.p1(5);
                client.p1(value as number);
            } else if (key === 'righthand') {
                client.p1(6);
                client.p2(value as number);
            } else if (key === 'lefthand') {
                client.p1(7);
                client.p2(value as number);
            } else if (key === 'replaycount') {
                client.p1(8);
                client.p1(value as number);
            }
        }

        if (frames.length > 0) {
            client.p1(1);

            client.p1(frames.length);
            for (let j = 0; j < frames.length; j++) {
                client.p2(frames[j]);

                if (typeof iframes[j] !== 'undefined') {
                    client.p2(iframes[j]);
                } else {
                    client.p2(-1);
                }

                if (typeof delays[j] !== 'undefined') {
                    client.p2(delays[j]);
                } else {
                    client.p2(0);
                }
            }
        }

        server.p1(250);
        server.pjstr(debugname);

        client.next();
        server.next();
    }

    return { client, server };
}
