import { describe, expect, it, beforeEach } from 'vitest';
import Zone from './Zone.js';
import ZoneManager from './ZoneManager.js';
import Player from '#lostcity/entity/Player.js';
import { fromBase37, toBase37 } from '#jagex2/jstring/JString.js';
import Obj from '#lostcity/entity/Obj.js';
import ServerProt from '#lostcity/server/ServerProt.js';
import World from '#lostcity/engine/World.js';

function createPlayer(name: string, uid: number, pid: number) {
    const name37 = toBase37(name);
    const safeName = fromBase37(name37);

    const player = new Player(safeName, name37);
    player.uid = uid;
    player.pid = pid;

    return player;
}

function simulateCycle(zone: Zone) {
    // we do the cleanup at the "start" of the cycle, because the tests are
    // running in the period between the zone being cycled and the player
    // observing the update 
    zone.cleanup();

    zone.cycle();
    World.currentTick++;
}

/**
 * Set to `true` to run the test suite for every tile in the zone.
 */
const TEST_ALL_ZONE_TILES = false;
const TEST_ZONE_COORDS = TEST_ALL_ZONE_TILES
    ? (Array.from({ length: 8 }, (_, i) => i).flatMap(i => Array.from({ length: 8 }, (_, j) => [i, j])) as [number, number][])
    : [[0, 0], [2, 2], [3, 4], [7, 0], [0, 7]];

describe('Zone', () => {
    beforeEach(() => {
        World.currentTick = 0;
    });

    describe('obj tests', () => {
        describe('when a zone has one player', () => {
            let zone: Zone;
            let player: Player;

            beforeEach(() => {
                zone = new Zone(ZoneManager.zoneIndex(0, 0, 0), 0);

                player = createPlayer('Test User', 1, 1);

                zone.enter(player);
            });

            it('should contain the player', () => {
                expect(zone.players).toContain(player.uid);
            });

            describe('when the player leaves', () => {
                beforeEach(() => {
                    zone.leave(player);
                });

                it('should not contain the player', () => {
                    expect(zone.players).not.toContain(player.uid);
                });
            });

            describe('when `receiver` is set to player', () => {
                let receiver: Player;

                beforeEach(() => {
                    receiver = player;
                });

                describe.each(TEST_ZONE_COORDS)('when an obj is added at %d,%d', (x: number, z: number) => {
                    let obj: Obj;
                    const duration = 5;

                    beforeEach(() => {
                        obj = new Obj(0, x, z, 995, 1);

                        zone.addObj(obj, receiver, duration);
                    });

                    it('should contain the OBJ_ADD packet in state', () => {
                        const packets = zone.getDynamicObjState(player);

                        expect(packets.length).toBe(1);

                        const packet = packets[0];
                        expect(packet).toBeTruthy();
                        packet.pos = 0;

                        const opcode = packet.g1();

                        expect(opcode).toBe(ServerProt.OBJ_ADD.id);

                        const packedCoords = packet.g1();
                        const objId = packet.g2();
                        const count = packet.g2();

                        const packedX = (packedCoords >> 4) & 0x7;
                        const packedZ = packedCoords & 0x7;

                        expect(packedX).toBe(x);
                        expect(packedZ).toBe(z);
                        expect(objId).toBe(995);
                        expect(count).toBe(1);
                    });

                    describe('when the obj is removed', () => {
                        beforeEach(() => {
                            zone.cleanup();
                            zone.removeObj(obj, receiver);
                        });

                        it('should contain the OBJ_DEL packet', () => {
                            const packet = zone.getEvents(player);

                            expect(packet).toBeTruthy();
                            packet.pos = 0;

                            const opcode = packet.g1();

                            expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                            const packedCoords = packet.g1();
                            const objId = packet.g2();

                            const packedX = (packedCoords >> 4) & 0x7;
                            const packedZ = packedCoords & 0x7;

                            expect(packedX).toBe(x);
                            expect(packedZ).toBe(z);
                            expect(objId).toBe(995);
                        });

                        it('should not contain the OBJ_ADD packet in state', () => {
                            const packets = zone.getDynamicObjState(player);

                            expect(packets.length).toBe(0);
                        });
                    });

                    describe('when `duration` cycles have passed', () => {
                        beforeEach(() => {
                            for (let i = 0; i < duration + 1; i++) {
                                simulateCycle(zone);
                            }
                        });

                        it('should contain the OBJ_DEL packet', () => {
                            const packet = zone.getEvents(player);

                            expect(packet).toBeTruthy();
                            packet.pos = 0;

                            const opcode = packet.g1();

                            expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                            const packedCoords = packet.g1();
                            const objId = packet.g2();

                            const packedX = (packedCoords >> 4) & 0x7;
                            const packedZ = packedCoords & 0x7;

                            expect(packedX).toBe(x);
                            expect(packedZ).toBe(z);
                            expect(objId).toBe(995);
                        });

                        it('should not contain the OBJ_ADD packet in state', () => {
                            const packets = zone.getDynamicObjState(player);

                            expect(packets.length).toBe(0);
                        });
                    });
                });
            });

            describe('when `receiver` is not set to player', () => {
                let receiver: Player;

                beforeEach(() => {
                    receiver = createPlayer('Not In Zone', 3, 3);
                });

                describe.each(TEST_ZONE_COORDS)('when an obj is added at %d,%d', (x: number, z: number) => {
                    let obj: Obj;
                    const duration = 5;

                    beforeEach(() => {
                        obj = new Obj(0, x, z, 995, 1);

                        zone.addObj(obj, receiver, duration);
                    });

                    it('should not contain the OBJ_ADD packet in state', () => {
                        const packets = zone.getDynamicObjState(player);

                        expect(packets.length).toBe(0);
                    });

                    describe('when the obj is removed', () => {
                        beforeEach(() => {
                            zone.removeObj(obj, receiver);
                        });

                        it('should not contain the OBJ_DEL packet', () => {
                            const packets = zone.getEvents(player);

                            expect(packets.length).toBe(0);
                        });

                        it('should not contain the OBJ_ADD packet in state', () => {
                            const packets = zone.getDynamicObjState(player);

                            expect(packets.length).toBe(0);
                        });
                    });

                    describe('when `duration` cycles have passed', () => {
                        beforeEach(() => {
                            for (let i = 0; i < duration + 1; i++) {
                                simulateCycle(zone);
                            }
                        });

                        it('should not contain the OBJ_DEL packet', () => {
                            const packets = zone.getEvents(player);

                            expect(packets.length).toBe(0);
                        });

                        it('should not contain the OBJ_ADD packet in state', () => {
                            const packets = zone.getDynamicObjState(player);

                            expect(packets.length).toBe(0);
                        });
                    });
                });
            });
        });

        describe('when a zone has two players', () => {
            let zone: Zone;
            let player1: Player;
            let player2: Player;

            beforeEach(() => {
                zone = new Zone(ZoneManager.zoneIndex(0, 0, 0), 0);

                player1 = createPlayer('Test User', 1, 1);
                player2 = createPlayer('Other User', 2, 2);

                zone.enter(player1);
                zone.enter(player2);
            });

            it('should contain both players', () => {
                expect(zone.players).toHaveLength(2);
                expect(zone.players).toContain(player1.uid);
                expect(zone.players).toContain(player2.uid);
            });

            describe('when `receiver` is set to player1', () => {
                let receiver: Player;

                beforeEach(() => {
                    receiver = player1;
                });

                describe('when duration is less than private lifetime', () => {
                    const duration = Zone.OBJ_PRIVATE_LIFETIME_CYCLES - 1;

                    describe.each(TEST_ZONE_COORDS)('when an obj is added at %d,%d', (x: number, z: number) => {
                        let obj: Obj;

                        beforeEach(() => {
                            obj = new Obj(0, x, z, 995, 1);

                            zone.addObj(obj, receiver, duration);
                        });

                        describe('when viewed by player1', () => {
                            let viewer: Player;

                            beforeEach(() => {
                                viewer = player1;
                            });

                            it('should contain the OBJ_ADD packet in state', () => {
                                const packets = zone.getDynamicObjState(viewer);

                                expect(packets.length).toBe(1);

                                const packet = packets[0];
                                expect(packet).toBeTruthy();
                                packet.pos = 0;

                                const opcode = packet.g1();

                                expect(opcode).toBe(ServerProt.OBJ_ADD.id);

                                const packedCoords = packet.g1();
                                const objId = packet.g2();
                                const count = packet.g2();

                                const packedX = (packedCoords >> 4) & 0x7;
                                const packedZ = packedCoords & 0x7;

                                expect(packedX).toBe(x);
                                expect(packedZ).toBe(z);
                                expect(objId).toBe(995);
                                expect(count).toBe(1);
                            });
                        });

                        describe('when the obj is removed', () => {
                            beforeEach(() => {
                                zone.cleanup();
                                zone.removeObj(obj, receiver);
                            });

                            describe('when viewed by player1', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player1;
                                });

                                it('should contain the OBJ_DEL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });

                            describe('when viewed by player2', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player2;
                                });

                                it('should not contain the OBJ_DEL packet', () => {
                                    const packets = zone.getEvents(viewer);

                                    expect(packets.length).toBe(0);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });
                        });

                        describe('when `duration` cycles have passed', () => {
                            beforeEach(() => {
                                for (let i = 0; i < duration + 1; i++) {
                                    simulateCycle(zone);
                                }
                            });

                            describe('when viewed by player1', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player1;
                                });

                                it('should contain the OBJ_DEL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });

                            describe('when viewed by player2', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player2;
                                });

                                it('should not contain the OBJ_DEL packet', () => {
                                    const packets = zone.getEvents(viewer);

                                    expect(packets.length).toBe(0);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });
                        });
                    });
                });

                describe('when duration is more than private lifetime', () => {
                    const duration = Zone.OBJ_PRIVATE_LIFETIME_CYCLES + 10;

                    describe.each(TEST_ZONE_COORDS)('when an obj is added at %d,%d', (x: number, z: number) => {
                        let obj: Obj;

                        beforeEach(() => {
                            obj = new Obj(0, x, z, 995, 1);

                            zone.addObj(obj, receiver, duration);
                        });

                        describe('when viewed by player1', () => {
                            let viewer: Player;

                            beforeEach(() => {
                                viewer = player1;
                            });

                            it('should contain the OBJ_ADD packet in state', () => {
                                const packets = zone.getDynamicObjState(viewer);

                                expect(packets.length).toBe(1);

                                const packet = packets[0];
                                expect(packet).toBeTruthy();
                                packet.pos = 0;

                                const opcode = packet.g1();

                                expect(opcode).toBe(ServerProt.OBJ_ADD.id);

                                const packedCoords = packet.g1();
                                const objId = packet.g2();
                                const count = packet.g2();

                                const packedX = (packedCoords >> 4) & 0x7;
                                const packedZ = packedCoords & 0x7;

                                expect(packedX).toBe(x);
                                expect(packedZ).toBe(z);
                                expect(objId).toBe(995);
                                expect(count).toBe(1);
                            });
                        });

                        describe('when viewed by player2', () => {
                            let viewer: Player;

                            beforeEach(() => {
                                viewer = player2;
                            });

                            it('should not contain the OBJ_ADD packet in state', () => {
                                const packets = zone.getDynamicObjState(viewer);

                                expect(packets.length).toBe(0);
                            });
                        });

                        describe('when the obj is removed', () => {
                            beforeEach(() => {
                                zone.cleanup();
                                zone.removeObj(obj, receiver);
                            });

                            describe('when viewed by player1', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player1;
                                });

                                it('should contain the OBJ_DEL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });

                            describe('when viewed by player2', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player2;
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });

                                it('should not contain the OBJ_DEL packet', () => {
                                    const packets = zone.getEvents(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });
                        });

                        describe('when `private lifetime` cycles have passed', () => {
                            beforeEach(() => {
                                for (let i = 0; i < Zone.OBJ_PRIVATE_LIFETIME_CYCLES + 1; i++) {
                                    simulateCycle(zone);
                                }
                            });

                            describe('when viewed by player1', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player1;
                                });

                                it('should still contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(1);

                                    const packet = packets[0];
                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_ADD.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();
                                    const count = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                    expect(count).toBe(1);
                                });
                            });

                            describe('when viewed by player2', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player2;
                                });

                                it('should contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(1);

                                    const packet = packets[0];
                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_ADD.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();
                                    const count = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                    expect(count).toBe(1);
                                });

                                it('should contain the OBJ_REVEAL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_REVEAL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();
                                    const count = packet.g2();
                                    const receiverPid = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                    expect(count).toBe(1);
                                    expect(receiverPid).toBe(player1.pid);
                                });
                            });

                            describe('on the next cycle', () => {
                                beforeEach(() => {
                                    simulateCycle(zone);
                                });

                                describe('when viewed by player1', () => {
                                    let viewer: Player;
    
                                    beforeEach(() => {
                                        viewer = player1;
                                    });

                                    it('should contain the OBJ_ADD packet in state', () => {
                                        const packets = zone.getDynamicObjState(viewer);
    
                                        expect(packets.length).toBe(1);
    
                                        const packet = packets[0];
                                        expect(packet).toBeTruthy();
                                        packet.pos = 0;
    
                                        const opcode = packet.g1();
    
                                        expect(opcode).toBe(ServerProt.OBJ_ADD.id);
    
                                        const packedCoords = packet.g1();
                                        const objId = packet.g2();
                                        const count = packet.g2();
    
                                        const packedX = (packedCoords >> 4) & 0x7;
                                        const packedZ = packedCoords & 0x7;
    
                                        expect(packedX).toBe(x);
                                        expect(packedZ).toBe(z);
                                        expect(objId).toBe(995);
                                        expect(count).toBe(1);
                                    });

                                    it('should not contain the OBJ_REVEAL packet', () => {
                                        const packets = zone.getEvents(viewer);

                                        expect(packets.length).toBe(0);
                                    });
                                });
                            });
                        });

                        describe('when `duration` cycles have passed', () => {
                            beforeEach(() => {
                                for (let i = 0; i < duration + 1; i++) {
                                    simulateCycle(zone);
                                }
                            });

                            describe('when viewed by player1', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player1;
                                });

                                it('should contain the OBJ_DEL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });

                            describe('when viewed by player2', () => {
                                let viewer: Player;

                                beforeEach(() => {
                                    viewer = player2;
                                });

                                it('should contain the OBJ_DEL packet', () => {
                                    const packet = zone.getEvents(viewer);

                                    expect(packet).toBeTruthy();
                                    packet.pos = 0;

                                    const opcode = packet.g1();

                                    expect(opcode).toBe(ServerProt.OBJ_DEL.id);

                                    const packedCoords = packet.g1();
                                    const objId = packet.g2();

                                    const packedX = (packedCoords >> 4) & 0x7;
                                    const packedZ = packedCoords & 0x7;

                                    expect(packedX).toBe(x);
                                    expect(packedZ).toBe(z);
                                    expect(objId).toBe(995);
                                });

                                it('should not contain the OBJ_ADD packet in state', () => {
                                    const packets = zone.getDynamicObjState(viewer);

                                    expect(packets.length).toBe(0);
                                });
                            });
                        });
                    });
                });
            });

            describe('when player1 leaves', () => {
                beforeEach(() => {
                    zone.leave(player1);
                });

                it('should not contain player1', () => {
                    expect(zone.players).not.toContain(player1.uid);
                });

                it('should still contain player2', () => {
                    expect(zone.players).toHaveLength(1);
                    expect(zone.players).toContain(player2.uid);
                });
            });
        });
    });
});
