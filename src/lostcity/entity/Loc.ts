import Entity from '#lostcity/entity/Entity.js';

export default class Loc extends Entity {
    static ANIM = 0x2;
    static FACE_ENTITY = 0x4;
    static FORCED_CHAT = 0x8;
    static DAMAGE = 0x10;
    static TRANSMOGRIFY = 0x20;
    static SPOTANIM = 0x40;
    static FACE_COORD = 0x80;

    type = -1;
    shape = 10;
    rotation = 0;

    // temp
    width = 1;
    length = 1;
}
