import Packet from '#/io/Packet.js';
import MessageDecoder from '#/network/game/client/codec/MessageDecoder.js';
import ClientProt225 from '#/network/game/client/codec/rs225/ClientProt225.js';
import EventTracking from '#/network/game/client/model/EventTracking.js';

export default class EventTrackingDecoder extends MessageDecoder<EventTracking> {
    prot = ClientProt225.EVENT_TRACKING;

    decode(buf: Packet, len: number): EventTracking {
        const bytes: Uint8Array = new Uint8Array(len);
        buf.gdata(bytes, 0, len);
        return new EventTracking(bytes);
    }
}
