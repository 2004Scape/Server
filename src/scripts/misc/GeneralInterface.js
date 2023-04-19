import Component from '#cache/Component.js';
import BaseScript from '#engine/Script.js';
import ScriptManager from '#engine/ScriptManager.js';
import { sleep } from '#util/Time.js';

class LogoutButton extends BaseScript {
    *run(player) {
        player.logout();
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 2458 }, LogoutButton);

// ----

class AcceptDesign extends BaseScript {
    *run(player) {
        player.closeModal();
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 3651 }, AcceptDesign);

// ----

class PlayerControls extends BaseScript {
    *run(player) {
        const { buttonId } = this.params;
        const c = Component.get(buttonId);

        if (c.script && c.script[0] && c.script[0][0] == 5) {
            let configIndex = c.script[0][1];
            let defaultValue = c.scriptCompareValue[0];

            if (buttonId === 152) {
                player.running = false;
            } else if (buttonId === 153) {
                player.running = true;
            } else if (buttonId === 150) {
                player.autoRetaliate = true;
            } else if (buttonId === 151) {
                player.autoRetaliate = false;
            }

            player.setVarp(configIndex, defaultValue);
        } else {
            if (buttonId === 168) {
                // 168: Yes
                this.anim(855);
            } else if (buttonId === 169) {
                // 169: No
                this.anim(856);
            } else if (buttonId === 162) {
                // 162: Think
                this.anim(857);
            } else if (buttonId === 164) {
                // 164: Bow
                this.anim(858);
            } else if (buttonId === 165) {
                // 165: Angry
                this.anim(859);
            } else if (buttonId === 161) {
                // 161: Cry
                this.anim(860);
            } else if (buttonId === 170) {
                // 170: Laugh
                this.anim(861);
            } else if (buttonId === 171) {
                // 171: Cheer
                this.anim(862);
            } else if (buttonId === 163) {
                // 163: Wave
                this.anim(863);
            } else if (buttonId === 167) {
                // 167: Beckon
                this.anim(864);
            } else if (buttonId === 172) {
                // 172: Clap
                this.anim(865);
            } else if (buttonId === 166) {
                // 166: Dance
                this.anim(866);
            }
        }
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 152 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 153 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 150 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 151 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 168 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 169 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 162 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 164 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 165 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 161 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 170 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 171 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 163 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 167 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 172 }, PlayerControls);
ScriptManager.register('IF_BUTTON', { buttonId: 166 }, PlayerControls);

// ----

class GameOptions extends BaseScript {
    *run(player) {
        const { buttonId } = this.params;
        const c = Component.get(buttonId);

        let configIndex = c.script[0][1];
        let defaultValue = c.scriptCompareValue[0];
        player.setVarp(configIndex, defaultValue);
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 906 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 908 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 910 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 912 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 914 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 913 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 915 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 916 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 957 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 958 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 930 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 931 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 932 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 933 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 934 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 941 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 942 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 943 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 944 }, GameOptions);
ScriptManager.register('IF_BUTTON', { buttonId: 945 }, GameOptions);

// ----

class MusicPlayer extends BaseScript {
    *run(player) {
        const { buttonId } = this.params;
        const c = Component.get(buttonId);

        if (buttonId == 6269 || buttonId == 6270) {
            let configIndex = c.script[0][1];
            let defaultValue = c.scriptCompareValue[0];
            player.setVarp(configIndex, defaultValue);

            if (buttonId == 6269) {
                // auto player
                if (!player.autoplay) {
                    player.autoplay = true;
                    player.lastSongX = -1;
                    player.lastSongZ = -1;
                }
            } else if (buttonId == 6270) {
                // manual player
                if (player.autoplay) {
                    player.autoplay = false;
                }
            }
        } else {
            let safeName = c.text.replaceAll(' ', '_').replaceAll('-', '').toLowerCase();

            if (c.script && c.script[0]) {
                let varp = c.script[0][1];
                let bit = c.script[0][2];

                if (player.getVarpBit(varp, bit) == 0) {
                    player.sendMessage('You have not unlocked this piece of music yet!');
                    return true;
                }
            }

            player.playMusic(safeName, true, c.text);
            player.autoplay = false;
            player.sendVarp(18, 0); // set music player to manual
        }

        return true;
    }
}

ScriptManager.register('IF_BUTTON', { buttonId: 6269 }, MusicPlayer);
ScriptManager.register('IF_BUTTON', { buttonId: 6270 }, MusicPlayer);

async function registerMusic() {
    while (!Component.instances[4262]) {
        await sleep(100);
    }

    let music = Component.instances[4262];
    for (let i = 0; i < music.children.length; i++) {
        let child = Component.instances[music.children[i]];
        if (child.type != 4) {
            continue;
        }

        ScriptManager.register('IF_BUTTON', { buttonId: child.id }, MusicPlayer);
    }
}

registerMusic();

// ----

class UpdateBackpackMove extends BaseScript {
    *run(player) {
        const { fromSlot, toSlot } = this.params;

        player.inv.swap(fromSlot, toSlot);
    }
}

ScriptManager.register('IF_BUTTOND', { interfaceId: 3214 }, UpdateBackpackMove);

// ----

class NoOpFallback extends BaseScript {
    *run(player) {
        player.sendMessage('Nothing interesting happens.');
    }
}

ScriptManager.register('OPHELDU', {}, NoOpFallback);

// ----

class ChoiceReader extends BaseScript {
    *run(player) {
        const { buttonId } = this.params;

        if (buttonId == 2461 || buttonId == 2471 || buttonId == 2482 || buttonId == 2494) {
            this.player.lastChoice = 1;
        } else if (buttonId == 2462 || buttonId == 2472 || buttonId == 2483 || buttonId == 2495) {
            this.player.lastChoice = 2;
        } else if (buttonId == 2473 || buttonId == 2484 || buttonId == 2496) {
            this.player.lastChoice = 3;
        } else if (buttonId == 2485 || buttonId == 2497) {
            this.player.lastChoice = 4;
        } else if (buttonId == 2498) {
            this.player.lastChoice = 5;
        }

        this.player.resumeInterface(true);
    }
}

// p_choice2
ScriptManager.register('IF_BUTTON', { buttonId: 2461 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2462 }, ChoiceReader);
// p_choice3
ScriptManager.register('IF_BUTTON', { buttonId: 2471 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2472 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2473 }, ChoiceReader);
// p_choice4
ScriptManager.register('IF_BUTTON', { buttonId: 2482 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2483 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2484 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2485 }, ChoiceReader);
// p_choice5
ScriptManager.register('IF_BUTTON', { buttonId: 2494 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2495 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2496 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2497 }, ChoiceReader);
ScriptManager.register('IF_BUTTON', { buttonId: 2498 }, ChoiceReader);
