import Linkable from '#jagex2/datastruct/Linkable.js';
import ServerProt from '#lostcity/server/ServerProt.js';

export default class CameraInfo extends Linkable {

    readonly type: ServerProt;
    readonly localX : number;
    readonly localZ : number;
    readonly height : number;
    readonly rotationSpeed : number;
    readonly rotationMultiplier : number;

    constructor(type: ServerProt, localX : number, localZ : number, height : number, rotationSpeed : number, rotationMultiplier : number) {
        super();
        this.type = type;
        this.localX = localX;
        this.localZ = localZ;
        this.height = height;
        this.rotationSpeed = rotationSpeed;
        this.rotationMultiplier = rotationMultiplier;
    }

}
