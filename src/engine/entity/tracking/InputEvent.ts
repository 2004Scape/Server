import { InputTrackingEventType } from '#/network/rs225/client/handler/EventTrackingHandler.js';

export default class InputTrackingEvent {

    readonly type: InputTrackingEventType;
    readonly seq: number;
    readonly delta: number;
    readonly mouseX?: number;
    readonly mouseY?: number;
    readonly keyPress?: number;
    readonly coord?: number;

    constructor(type: InputTrackingEventType, seq: number, delta: number, mouseX?: number, mouseY?: number, keyPress?: number, coord?: number) {
        this.seq = seq;
        this.type = type;
        this.delta = delta;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.keyPress = keyPress;
        this.coord = coord;
    }
}