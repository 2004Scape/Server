import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';

export default class IfType {
    static TYPE_LAYER = 0;
    static TYPE_UNUSED = 1;
    static TYPE_INVENTORY = 2;
    static TYPE_RECT = 3;
    static TYPE_TEXT = 4;
    static TYPE_SPRITE = 5;
    static TYPE_MODEL = 6;
    static TYPE_INVENTORY_TEXT = 7;

    static NO_BUTTON = 0;
    static BUTTON = 1;
    static TARGET_BUTTON = 2;
    static CLOSE_BUTTON = 3;
    static TOGGLE_BUTTON = 4;
    static SELECT_BUTTON = 5;
    static PAUSE_BUTTON = 6;

    static componentNames = new Map();
    static components = [];

    static load(dir) {
        IfType.configNames = new Map();
        IfType.configs = [];

        if (!fs.existsSync(`${dir}/interface.dat`)) {
            console.log('Warning: No interface.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/interface.dat`);
        let count = dat.g2();

        let rootLayer = -1;
        while (dat.available > 0) {
            let id = dat.g2();
            if (id === 65535) {
                rootLayer = dat.g2();
                id = dat.g2();
            }

            let com = new IfType();
            com.id = id;
            com.rootLayer = rootLayer;
            com.comName = dat.gjstr();

            com.type = dat.g1();
            com.buttonType = dat.g1();
            com.clientCode = dat.g2();
            com.width = dat.g2();
            com.height = dat.g2();

            com.overLayer = dat.g1();
            if (com.overLayer == 0) {
                com.overLayer = -1;
            } else {
                com.overLayer = (com.overLayer - 1 << 8) + dat.g1();
            }

            let comparatorCount = dat.g1();
            if (comparatorCount > 0) {
                com.scriptComparator = new Array(comparatorCount).fill(0);
                com.scriptOperand = new Array(comparatorCount).fill(0);

                for (let i = 0; i < comparatorCount; i++) {
                    com.scriptComparator[i] = dat.g1();
                    com.scriptOperand[i] = dat.g2();
                }
            }

            let scriptCount = dat.g1();
            if (scriptCount > 0) {
                com.scripts = new Array(scriptCount).fill(null);

                for (let i = 0; i < scriptCount; i++) {
                    let opcodeCount = dat.g2();

                    com.scripts[i] = new Array(opcodeCount).fill(0);
                    for (let j = 0; j < opcodeCount; j++) {
                        com.scripts[i][j] = dat.g2();
                    }
                }
            }

            if (com.type == 0) {
                com.scroll = dat.g2();
                com.hide = dat.gbool();

                let childCount = dat.g1();
                com.childId = new Array(childCount).fill(-1);
                com.childX = new Array(childCount).fill(0);
                com.childY = new Array(childCount).fill(0);

                for (let i = 0; i < childCount; i++) {
                    com.childId[i] = dat.g2();
                    com.childX[i] = dat.g2s();
                    com.childY[i] = dat.g2s();
                }
            }

            if (com.type == 2) {
                com.draggable = dat.gbool();
                com.interactable = dat.gbool();
                com.usable = dat.gbool();
                com.marginX = dat.g1();
                com.marginY = dat.g1();

                com.inventorySlotOffsetX = new Array(20).fill(0);
                com.inventorySlotOffsetY = new Array(20).fill(0);
                com.inventorySlotGraphic = new Array(20).fill(null);

                for (let i = 0; i < 20; i++) {
                    if (dat.gbool()) {
                        com.inventorySlotOffsetX[i] = dat.g2s();
                        com.inventorySlotOffsetY[i] = dat.g2s();
                        com.inventorySlotGraphic[i] = dat.gjstr();
                    }
                }

                com.inventoryOptions = new Array(5).fill(null);
                for (let i = 0; i < 5; i++) {
                    com.inventoryOptions[i] = dat.gjstr();
                }
            }

            if (com.type == 3) {
                com.fill = dat.gbool();
            }

            if (com.type == 4) {
                com.center = dat.gbool();
                com.font = dat.g1();
                com.shadowed = dat.gbool();
                com.text = dat.gjstr();
                com.activeText = dat.gjstr();
            }

            if (com.type == 3 || com.type == 4) {
                com.colour = dat.g4();
                com.activeColour = dat.g4();
                com.overColour = dat.g4();
            }

            if (com.type == 5) {
                com.graphic = dat.gjstr();
                com.activeGraphic = dat.gjstr();
            }

            if (com.type == 6) {
                com.model = dat.g1();
                if (com.model != 0) {
                    com.model = ((com.model - 1) << 8) + dat.g1();
                }

                com.activeModel = dat.g1();
                if (com.activeModel != 0) {
                    com.activeModel = ((com.activeModel - 1) << 8) + dat.g1();
                }

                com.anim = dat.g1();
                if (com.anim == 0) {
                    com.anim = -1;
                } else {
                    com.anim = (com.anim - 1 << 8) + dat.g1();
                }

                com.activeAnim = dat.g1();
                if (com.activeAnim == 0) {
                    com.activeAnim = -1;
                } else {
                    com.activeAnim = (com.activeAnim - 1 << 8) + dat.g1();
                }

                com.zoom = dat.g2();
                com.xan = dat.g2();
                com.yan = dat.g2();
            }

            if (com.type == 7) {
                com.center = dat.gbool();
                com.font = dat.g1();
                com.shadowed = dat.gbool();
                com.colour = dat.g4();
                com.marginX = dat.g2s();
                com.marginY = dat.g2s();
                com.interactable = dat.gbool();

                com.inventoryOptions = new Array(5).fill(null);
                for (let i = 0; i < 5; i++) {
                    com.inventoryOptions[i] = dat.gjstr();
                }
            }

            if (com.buttonType == 2 || com.type == 2) {
                com.actionVerb = dat.gjstr();
                com.action = dat.gjstr();
                com.actionTarget = dat.g2();
            }

            if (com.buttonType == 1 || com.buttonType == 4 || com.buttonType == 5 || com.buttonType == 6) {
                com.option = dat.gjstr();
            }

            IfType.components[id] = com;

            if (com.comName) {
                IfType.componentNames.set(com.comName, id);
            }
        }
    }

    static get(id) {
        return IfType.components[id];
    }

    static getId(name) {
        return IfType.componentNames.get(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    id = -1;
    rootLayer = -1;
    comName = null;
    type = -1;
    buttonType = -1;
    clientCode = 0;
    width = 0;
    height = 0;
    overLayer = -1;
    scriptComparator = null;
    scriptOperand = null;
    scripts = null;
    scroll = 0;
    hide = false;
    draggable = false;
    interactable = false;
    usable = false;
    marginX = 0;
    marignY = 0;
    inventorySlotOffsetX = [];
    inventorySlotOffsetY = [];
    inventorySlotGraphic = [];
    inventoryOptions = [];
    fill = false;
    center = false;
    font = 0;
    shadowed = false;
    text = null;
    activeText = null;
    colour = 0;
    activeColour = 0;
    overColour = 0;
    graphic = null;
    activeGraphic = null;
    model = -1;
    activeModel = -1;
    anim = -1;
    activeAnim = -1;
    zoom = 0;
    xan = 0;
    yan = 0;
    actionVerb = null;
    action = null;
    actionTarget = -1;
    option = null;
}
