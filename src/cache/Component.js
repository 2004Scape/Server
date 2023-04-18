import Packet from '#util/Packet.js';

export default class Component {
    static TYPE_PARENT = 0;
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

    static dat = null;
    static count = 0;
    static instances = [];
    static ids = [];

    static unpack(data) {
        Component.count = data.g2();

        let parent = -1;
        while (data.available) {
            let id = data.g2();
            if (id === 65535) {
                parent = data.g2();
                id = data.g2();
            }

            let i = {
                id,
                parent,
                type: data.g1(),
                buttonType: data.g1(),
                contentType: data.g2(),
                width: data.g2(),
                height: data.g2(),
                hoverParentIndex: data.g1()
            };

            if (i.hoverParentIndex !== 0) {
                i.hoverParentIndex = ((i.hoverParentIndex - 1) << 8) + data.g1();
            } else {
                i.hoverParentIndex = -1;
            }

            let comparatorCount = data.g1();
            if (comparatorCount > 0) {
                i.scriptCompareType = [];
                i.scriptCompareValue = [];
                for (let n = 0; n < comparatorCount; ++n) {
                    i.scriptCompareType[n] = data.g1();
                    i.scriptCompareValue[n] = data.g2();
                }
            }

            let scriptCount = data.g1();
            if (scriptCount > 0) {
                i.script = [];
                for (let script = 0; script < scriptCount; ++script) {
                    let opcodeCount = data.g2();
                    i.script[script] = [];
                    for (let opcode = 0; opcode < opcodeCount; ++opcode) {
                        i.script[script][opcode] = data.g2();
                    }
                }
            }

            if (i.type === Component.TYPE_PARENT) {
                i.scrollHeight = data.g2();
                i.hidden = data.gbool();
                let n = data.g1();
                i.children = [];
                i.childX = [];
                i.childY = [];
                for (let m = 0; m < n; ++m) {
                    i.children[m] = data.g2();
                    i.childX[m] = data.g2s();
                    i.childY[m] = data.g2s();
                }
            }

            if (i.type === Component.TYPE_UNUSED) {
                i.unusedInt = data.g2();
                i.unusedBoolean = data.gbool();
            }

            if (i.type === Component.TYPE_INVENTORY) {
                i.inventoryIndices = [];
                i.inventoryAmount = [];

                i.inventoryDummy = data.gbool();
                i.inventoryHasOptions = data.gbool();
                i.inventoryIsUsable = data.gbool();
                i.inventoryMarginX = data.g1();
                i.inevntoryMarginY = data.g1();
                i.inventoryOffsetX = [];
                i.inventoryOffsetY = [];
                i.inventorySprite = [];

                for (let n = 0; n < 20; ++n) {
                    if (data.gbool()) {
                        i.inventoryOffsetX[n] = data.g2s();
                        i.inventoryOffsetY[n] = data.g2s();
                        i.inventorySprite[n] = data.gjstr();
                    }
                }

                i.inventoryOptions = [];
                for (let n = 0; n < 5; ++n) {
                    i.inventoryOptions[n] = data.gjstr();
                    if (i.inventoryOptions[n].length === 0) {
                        delete i.inventoryOptions[n];
                    }
                }
            }

            if (i.type === Component.TYPE_RECT) {
                i.fill = data.gbool();
            }

            if (i.type === Component.TYPE_TEXT || i.type === Component.TYPE_UNUSED) {
                i.center = data.gbool();
                i.font = data.g1();
                i.shadow = data.gbool();
            }

            if (i.type === Component.TYPE_TEXT) {
                i.text = data.gjstr();
                i.activeText = data.gjstr();
                if (i.activeText.length === 0) {
                    delete i.activeText;
                }
            }

            if (i.type === Component.TYPE_UNUSED || i.type === Component.TYPE_RECT || i.type === Component.TYPE_TEXT) {
                i.color = data.g4();
            }

            if (i.type === Component.TYPE_RECT || i.type === Component.TYPE_TEXT) {
                i.colorEnabled = data.g4();
                i.hoverColor = data.g4();
            }

            if (i.type === Component.TYPE_SPRITE) {
                i.image = data.gjstr();
                i.activeImage = data.gjstr();
                if (i.activeImage.length === 0) {
                    delete i.activeImage;
                }
            }

            if (i.type === Component.TYPE_MODEL) {
                let temp = data.g1();
                if (temp !== 0) {
                    i.modelDisabled = ((temp - 1) << 8) + data.g1();
                }

                temp = data.g1();
                if (temp !== 0) {
                    i.modelEnabled = ((temp - 1) << 8) + data.g1();
                }

                temp = data.g1();
                if (temp !== 0) {
                    i.seqId = ((temp - 1) << 8) + data.g1();
                } else {
                    i.seqId = -1;
                }

                temp = data.g1();
                if (temp !== 0) {
                    i.activeSeqId = ((temp - 1) << 8) + data.g1();
                } else {
                    i.activeSeqId = -1;
                }

                i.modelZoom = data.g2();
                i.modelEyePitch = data.g2();
                i.modelYaw = data.g2();
            }

            if (i.type === Component.TYPE_INVENTORY_TEXT) {
                i.inventoryIndices = [];
                i.inventoryAmount = [];

                i.center = data.gbool();
                i.font = data.g1();
                i.shadow = data.gbool();
                i.color = data.g4();

                i.inventoryMarginX = data.g2s();
                i.inventoryMarginY = data.g2s();
                i.inventoryHasOptions = data.gbool();

                i.inventoryOptions = [];
                for (let n = 0; n < 5; ++n) {
                    i.inventoryOptions[n] = data.gjstr();
                    if (i.inventoryOptions[n].length === 0) {
                        delete i.inventoryOptions[n];
                    }
                }
            }

            if (i.buttonType === Component.TARGET_BUTTON || i.type === Component.TYPE_INVENTORY) {
                i.optionCircumfix = data.gjstr();
                i.optionSuffix = data.gjstr();
                i.optionFlags = data.g2();
            }

            if (i.buttonType === Component.BUTTON || i.buttonType === Component.TOGGLE_BUTTON ||
                i.buttonType === Component.SELECT_BUTTON || i.buttonType === Component.PAUSE_BUTTON) {
                i.option = data.gjstr();
                if (i.option.length === 0) {
                    if (i.buttonType === Component.BUTTON) {
                        i.option = "Ok";
                    } else if (i.buttonType === Component.TOGGLE_BUTTON) {
                        i.option = "Select";
                    } else if (i.buttonType === Component.SELECT_BUTTON) {
                        i.option = "Select";
                    } else if (i.buttonType === Component.PAUSE_BUTTON) {
                        i.option = "Continue";
                    }
                }
            }

            Component.instances[id] = i;
        }
    }

    static load(jagfile) {
        const data = new Packet(jagfile.read('data'));

        this.unpack(data);
    }

    static get(id) {
        return Component.instances[id];
    }
}
