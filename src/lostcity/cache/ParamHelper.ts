import Packet from "#jagex2/io/Packet.js";

export type ParamMap = Map<number, number | string>

export interface ParamHolder {
    params: ParamMap | null;
}

export namespace ParamHelper {
    export function getStringParam(id: number, holder: ParamHolder, defaultValue: string | null): string {
        let value = holder.params?.get(id);
        if (typeof value !== 'string') {
            return defaultValue ?? "null";
        }
        return value;
    }

    export function getIntParam(id: number, holder: ParamHolder, defaultValue: number): number {
        let value = holder.params?.get(id);
        if (typeof value !== 'number') {
            return defaultValue;
        }
        return value;
    }

    export function decodeParams(packet: Packet): Map<number, number | string> {
        let count = packet.g1();
        let params = new Map<number, number | string>()
        for (let i = 0; i < count; i++) {
            let key = packet.g3();
            let isString = packet.gbool();

            if (isString) {
                params.set(key, packet.gjstr());
            } else {
                params.set(key, packet.g4s());
            }
        }
        return params;
    }
}
