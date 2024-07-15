import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

export const PRELOADED = new Map<string, Uint8Array>();
export const PRELOADED_CRC = new Map<string, number>();

export function preloadClient() {
    //console.log('Preloading client data');
    //console.time('Preloaded client data');
    const allMaps = fs.readdirSync('data/pack/client/maps');
    for (let i = 0; i < allMaps.length; i++) {
        const name = allMaps[i];

        const map = new Uint8Array(fs.readFileSync(`data/pack/client/maps/${name}`));
        const crc = Packet.getcrc(map, 0, map.length);

        PRELOADED.set(name, map);
        PRELOADED_CRC.set(name, crc);
    }

    const allSongs = fs.readdirSync('data/pack/client/songs');
    for (let i = 0; i < allSongs.length; i++) {
        const name = allSongs[i];

        const song = new Uint8Array(fs.readFileSync(`data/pack/client/songs/${name}`));
        const crc = Packet.getcrc(song, 0, song.length);

        PRELOADED.set(name, song);
        PRELOADED_CRC.set(name, crc);
    }

    const allJingles = fs.readdirSync('data/pack/client/jingles');
    for (let i = 0; i < allJingles.length; i++) {
        const name = allJingles[i];

        // Strip off bzip header.
        const jingle = new Uint8Array(fs.readFileSync(`data/pack/client/jingles/${name}`).subarray(4));
        const crc = Packet.getcrc(jingle, 0, jingle.length);

        PRELOADED.set(name, jingle);
        PRELOADED_CRC.set(name, crc);
    }
    //console.timeEnd('Preloaded client data');
}

export async function preloadClientAsync() {
    //console.log('Preloading client data');
    //console.time('Preloaded client data');
    const allMaps = ['l29_75', 'l30_75', 'l31_75', 'l32_70', 'l32_71', 'l32_72', 'l32_73', 'l32_74', 'l32_75', 'l33_70', 'l33_71', 'l33_72', 'l33_73', 'l33_74', 'l33_75', 'l33_76', 'l34_70', 'l34_71', 'l34_72', 'l34_73', 'l34_74', 'l34_75', 'l34_76', 'l35_20', 'l35_75', 'l35_76', 'l36_146', 'l36_147', 'l36_148', 'l36_149', 'l36_150', 'l36_153', 'l36_154', 'l36_52', 'l36_53', 'l36_54', 'l36_72', 'l36_73', 'l36_74', 'l36_75', 'l36_76', 'l37_146', 'l37_147', 'l37_148', 'l37_149', 'l37_150', 'l37_151', 'l37_152', 'l37_153', 'l37_154', 'l37_48', 'l37_49', 'l37_50', 'l37_51', 'l37_52', 'l37_53', 'l37_54', 'l37_55', 'l37_72', 'l37_73', 'l37_74', 'l37_75', 'l38_146', 'l38_147', 'l38_148', 'l38_149', 'l38_150', 'l38_151', 'l38_152', 'l38_153', 'l38_154', 'l38_155', 'l38_45', 'l38_46', 'l38_47', 'l38_48', 'l38_49', 'l38_50', 'l38_51', 'l38_52', 'l38_53', 'l38_54', 'l38_55', 'l38_72', 'l38_73', 'l38_74', 'l39_147', 'l39_148', 'l39_149', 'l39_150', 'l39_151', 'l39_152', 'l39_153', 'l39_154', 'l39_155', 'l39_45', 'l39_46', 'l39_47', 'l39_48', 'l39_49', 'l39_50', 'l39_51', 'l39_52', 'l39_53', 'l39_54', 'l39_55', 'l39_72', 'l39_73', 'l39_74', 'l39_75', 'l39_76', 'l40_147', 'l40_148', 'l40_149', 'l40_150', 'l40_151', 'l40_152', 'l40_153', 'l40_154', 'l40_45', 'l40_46', 'l40_47', 'l40_48', 'l40_49', 'l40_50', 'l40_51', 'l40_52', 'l40_53', 'l40_54', 'l40_55', 'l40_72', 'l40_73', 'l40_74', 'l40_75', 'l40_76', 'l41_146', 'l41_149', 'l41_151', 'l41_152', 'l41_153', 'l41_154', 'l41_45', 'l41_46', 'l41_47', 'l41_48', 'l41_49', 'l41_50', 'l41_51', 'l41_52', 'l41_53', 'l41_54', 'l41_55', 'l41_56', 'l41_72', 'l41_73', 'l41_74', 'l41_75', 'l42_144', 'l42_145', 'l42_146', 'l42_151', 'l42_152', 'l42_153', 'l42_49', 'l42_50', 'l42_51', 'l42_52', 'l42_53', 'l42_54', 'l42_55', 'l42_56', 'l42_72', 'l42_73', 'l42_74', 'l42_75', 'l43_144', 'l43_145', 'l43_146', 'l43_153', 'l43_154', 'l43_45', 'l43_46', 'l43_47', 'l43_48', 'l43_49', 'l43_50', 'l43_51', 'l43_52', 'l43_53', 'l43_54', 'l43_55', 'l43_56', 'l43_72', 'l43_73', 'l43_74', 'l43_75', 'l44_144', 'l44_145', 'l44_146', 'l44_148', 'l44_149', 'l44_150', 'l44_151', 'l44_152', 'l44_153', 'l44_154', 'l44_155', 'l44_45', 'l44_46', 'l44_47', 'l44_48', 'l44_49', 'l44_50', 'l44_51', 'l44_52', 'l44_53', 'l44_54', 'l44_55', 'l44_72', 'l44_73', 'l44_74', 'l44_75', 'l45_145', 'l45_146', 'l45_148', 'l45_150', 'l45_151', 'l45_152', 'l45_153', 'l45_154', 'l45_155', 'l45_45', 'l45_46', 'l45_47', 'l45_48', 'l45_49', 'l45_50', 'l45_51', 'l45_52', 'l45_53', 'l45_54', 'l45_55', 'l45_56', 'l45_57', 'l45_58', 'l45_59', 'l45_60', 'l45_61', 'l45_62', 'l45_73', 'l45_74', 'l45_75', 'l45_76', 'l46_149', 'l46_150', 'l46_152', 'l46_153', 'l46_154', 'l46_161', 'l46_45', 'l46_46', 'l46_47', 'l46_48', 'l46_49', 'l46_50', 'l46_51', 'l46_52', 'l46_53', 'l46_54', 'l46_55', 'l46_56', 'l46_57', 'l46_58', 'l46_59', 'l46_60', 'l46_61', 'l46_62', 'l46_75', 'l47_148', 'l47_149', 'l47_150', 'l47_152', 'l47_153', 'l47_160', 'l47_161', 'l47_47', 'l47_48', 'l47_49', 'l47_50', 'l47_51', 'l47_52', 'l47_53', 'l47_54', 'l47_55', 'l47_56', 'l47_57', 'l47_58', 'l47_59', 'l47_60', 'l47_61', 'l47_62', 'l47_75', 'l48_148', 'l48_149', 'l48_152', 'l48_153', 'l48_154', 'l48_155', 'l48_156', 'l48_47', 'l48_48', 'l48_49', 'l48_50', 'l48_51', 'l48_52', 'l48_53', 'l48_54', 'l48_55', 'l48_56', 'l48_57', 'l48_58', 'l48_59', 'l48_60', 'l48_61', 'l48_62', 'l49_148', 'l49_149', 'l49_153', 'l49_154', 'l49_155', 'l49_156', 'l49_46', 'l49_47', 'l49_48', 'l49_49', 'l49_50', 'l49_51', 'l49_52', 'l49_53', 'l49_54', 'l49_55', 'l49_56', 'l49_57', 'l49_58', 'l49_59', 'l49_60', 'l49_61', 'l49_62', 'l50_149', 'l50_150', 'l50_152', 'l50_153', 'l50_154', 'l50_46', 'l50_47', 'l50_48', 'l50_49', 'l50_50', 'l50_51', 'l50_52', 'l50_53', 'l50_54', 'l50_55', 'l50_56', 'l50_57', 'l50_58', 'l50_59', 'l50_60', 'l50_61', 'l50_62', 'l51_147', 'l51_154', 'l51_46', 'l51_47', 'l51_48', 'l51_49', 'l51_50', 'l51_51', 'l51_52', 'l51_53', 'l51_54', 'l51_55', 'l51_56', 'l51_57', 'l51_58', 'l51_59', 'l51_60', 'l51_61', 'l51_62', 'l52_152', 'l52_153', 'l52_154', 'l52_46', 'l52_47', 'l52_48', 'l52_49', 'l52_50', 'l52_51', 'l52_52', 'l52_53', 'l52_54', 'l52_55', 'l52_56', 'l52_57', 'l52_58', 'l52_59', 'l52_60', 'l52_61', 'l52_62', 'l53_49', 'l53_50', 'l53_51', 'l53_52', 'l53_53', 'm29_75', 'm30_75', 'm31_75', 'm32_70', 'm32_71', 'm32_72', 'm32_73', 'm32_74', 'm32_75', 'm33_70', 'm33_71', 'm33_72', 'm33_73', 'm33_74', 'm33_75', 'm33_76', 'm34_70', 'm34_71', 'm34_72', 'm34_73', 'm34_74', 'm34_75', 'm34_76', 'm35_20', 'm35_75', 'm35_76', 'm36_146', 'm36_147', 'm36_148', 'm36_149', 'm36_150', 'm36_153', 'm36_154', 'm36_52', 'm36_53', 'm36_54', 'm36_72', 'm36_73', 'm36_74', 'm36_75', 'm36_76', 'm37_146', 'm37_147', 'm37_148', 'm37_149', 'm37_150', 'm37_151', 'm37_152', 'm37_153', 'm37_154', 'm37_48', 'm37_49', 'm37_50', 'm37_51', 'm37_52', 'm37_53', 'm37_54', 'm37_55', 'm37_72', 'm37_73', 'm37_74', 'm37_75', 'm38_146', 'm38_147', 'm38_148', 'm38_149', 'm38_150', 'm38_151', 'm38_152', 'm38_153', 'm38_154', 'm38_155', 'm38_45', 'm38_46', 'm38_47', 'm38_48', 'm38_49', 'm38_50', 'm38_51', 'm38_52', 'm38_53', 'm38_54', 'm38_55', 'm38_72', 'm38_73', 'm38_74', 'm39_147', 'm39_148', 'm39_149', 'm39_150', 'm39_151', 'm39_152', 'm39_153', 'm39_154', 'm39_155', 'm39_45', 'm39_46', 'm39_47', 'm39_48', 'm39_49', 'm39_50', 'm39_51', 'm39_52', 'm39_53', 'm39_54', 'm39_55', 'm39_72', 'm39_73', 'm39_74', 'm39_75', 'm39_76', 'm40_147', 'm40_148', 'm40_149', 'm40_150', 'm40_151', 'm40_152', 'm40_153', 'm40_154', 'm40_45', 'm40_46', 'm40_47', 'm40_48', 'm40_49', 'm40_50', 'm40_51', 'm40_52', 'm40_53', 'm40_54', 'm40_55', 'm40_72', 'm40_73', 'm40_74', 'm40_75', 'm40_76', 'm41_146', 'm41_149', 'm41_151', 'm41_152', 'm41_153', 'm41_154', 'm41_45', 'm41_46', 'm41_47', 'm41_48', 'm41_49', 'm41_50', 'm41_51', 'm41_52', 'm41_53', 'm41_54', 'm41_55', 'm41_56', 'm41_72', 'm41_73', 'm41_74', 'm41_75', 'm42_144', 'm42_145', 'm42_146', 'm42_151', 'm42_152', 'm42_153', 'm42_49', 'm42_50', 'm42_51', 'm42_52', 'm42_53', 'm42_54', 'm42_55', 'm42_56', 'm42_72', 'm42_73', 'm42_74', 'm42_75', 'm43_144', 'm43_145', 'm43_146', 'm43_153', 'm43_154', 'm43_45', 'm43_46', 'm43_47', 'm43_48', 'm43_49', 'm43_50', 'm43_51', 'm43_52', 'm43_53', 'm43_54', 'm43_55', 'm43_56', 'm43_72', 'm43_73', 'm43_74', 'm43_75', 'm44_144', 'm44_145', 'm44_146', 'm44_148', 'm44_149', 'm44_150', 'm44_151', 'm44_152', 'm44_153', 'm44_154', 'm44_155', 'm44_45', 'm44_46', 'm44_47', 'm44_48', 'm44_49', 'm44_50', 'm44_51', 'm44_52', 'm44_53', 'm44_54', 'm44_55', 'm44_72', 'm44_73', 'm44_74', 'm44_75', 'm45_145', 'm45_146', 'm45_148', 'm45_150', 'm45_151', 'm45_152', 'm45_153', 'm45_154', 'm45_155', 'm45_45', 'm45_46', 'm45_47', 'm45_48', 'm45_49', 'm45_50', 'm45_51', 'm45_52', 'm45_53', 'm45_54', 'm45_55', 'm45_56', 'm45_57', 'm45_58', 'm45_59', 'm45_60', 'm45_61', 'm45_62', 'm45_73', 'm45_74', 'm45_75', 'm45_76', 'm46_149', 'm46_150', 'm46_152', 'm46_153', 'm46_154', 'm46_161', 'm46_45', 'm46_46', 'm46_47', 'm46_48', 'm46_49', 'm46_50', 'm46_51', 'm46_52', 'm46_53', 'm46_54', 'm46_55', 'm46_56', 'm46_57', 'm46_58', 'm46_59', 'm46_60', 'm46_61', 'm46_62', 'm46_75', 'm47_148', 'm47_149', 'm47_150', 'm47_152', 'm47_153', 'm47_160', 'm47_161', 'm47_47', 'm47_48', 'm47_49', 'm47_50', 'm47_51', 'm47_52', 'm47_53', 'm47_54', 'm47_55', 'm47_56', 'm47_57', 'm47_58', 'm47_59', 'm47_60', 'm47_61', 'm47_62', 'm47_75', 'm48_148', 'm48_149', 'm48_152', 'm48_153', 'm48_154', 'm48_155', 'm48_156', 'm48_47', 'm48_48', 'm48_49', 'm48_50', 'm48_51', 'm48_52', 'm48_53', 'm48_54', 'm48_55', 'm48_56', 'm48_57', 'm48_58', 'm48_59', 'm48_60', 'm48_61', 'm48_62', 'm49_148', 'm49_149', 'm49_153', 'm49_154', 'm49_155', 'm49_156', 'm49_46', 'm49_47', 'm49_48', 'm49_49', 'm49_50', 'm49_51', 'm49_52', 'm49_53', 'm49_54', 'm49_55', 'm49_56', 'm49_57', 'm49_58', 'm49_59', 'm49_60', 'm49_61', 'm49_62', 'm50_149', 'm50_150', 'm50_152', 'm50_153', 'm50_154', 'm50_46', 'm50_47', 'm50_48', 'm50_49', 'm50_50', 'm50_51', 'm50_52', 'm50_53', 'm50_54', 'm50_55', 'm50_56', 'm50_57', 'm50_58', 'm50_59', 'm50_60', 'm50_61', 'm50_62', 'm51_147', 'm51_154', 'm51_46', 'm51_47', 'm51_48', 'm51_49', 'm51_50', 'm51_51', 'm51_52', 'm51_53', 'm51_54', 'm51_55', 'm51_56', 'm51_57', 'm51_58', 'm51_59', 'm51_60', 'm51_61', 'm51_62', 'm52_152', 'm52_153', 'm52_154', 'm52_46', 'm52_47', 'm52_48', 'm52_49', 'm52_50', 'm52_51', 'm52_52', 'm52_53', 'm52_54', 'm52_55', 'm52_56', 'm52_57', 'm52_58', 'm52_59', 'm52_60', 'm52_61', 'm52_62', 'm53_49', 'm53_50', 'm53_51', 'm53_52', 'm53_53'];
    for (let i = 0; i < allMaps.length; i++) {
        const name = allMaps[i];
        console.log(name);

        const map = new Uint8Array(await (await fetch(`data/pack/client/maps/${name}`)).arrayBuffer());
        const crc = Packet.getcrc(map, 0, map.length);

        PRELOADED.set(name, map);
        PRELOADED_CRC.set(name, crc);
    }

    const allSongs = ['adventure.mid', 'al_kharid.mid', 'alone.mid', 'ambience_2.mid', 'ambience_3.mid', 'ambience_4.mid', 'ambient_jungle.mid', 'arabian.mid', 'arabian2.mid', 'arabian3.mid', 'arabique.mid', 'army_of_darkness.mid', 'arrival.mid', 'attack1.mid', 'attack2.mid', 'attack3.mid', 'attack4.mid', 'attack5.mid', 'attack6.mid', 'attention.mid', 'autumn_voyage.mid', 'background2.mid', 'ballad_of_enchantment.mid', 'baroque.mid', 'beyond.mid', 'big_chords.mid', 'book_of_spells.mid', 'camelot.mid', 'cave_background1.mid', 'cavern.mid', 'cellar_song1.mid', 'chain_of_command.mid', 'chompy_hunt.mid', 'close_quarters.mid', 'crystal_cave.mid', 'crystal_sword.mid', 'cursed.mid', 'dangerous.mid', 'dark2.mid', 'deep_wildy.mid', 'desert_voyage.mid', 'doorways.mid', 'dream1.mid', 'duel_arena.mid', 'dunjun.mid', 'egypt.mid', 'emotion.mid', 'emperor.mid', 'escape.mid', 'expanse.mid', 'expecting.mid', 'expedition.mid', 'fade_test.mid', 'faerie.mid', 'fanfare.mid', 'fanfare2.mid', 'fanfare3.mid', 'fishing.mid', 'flute_salad.mid', 'forbidden.mid', 'forever.mid', 'game_intro_1.mid', 'gaol.mid', 'garden.mid', 'gnome.mid', 'gnome_king.mid', 'gnome_theme.mid', 'gnome_village.mid', 'gnome_village2.mid', 'gnomeball.mid', 'greatness.mid', 'grumpy.mid', 'harmony.mid', 'harmony2.mid', 'heart_and_mind.mid', 'high_seas.mid', 'horizon.mid', 'iban.mid', 'ice_melody.mid', 'in_the_manor.mid', 'inspiration.mid', 'intrepid.mid', 'jolly-r.mid', 'jungle_island.mid', 'jungly1.mid', 'jungly2.mid', 'jungly3.mid', 'knightly.mid', 'landlubber.mid', 'lasting.mid', 'legion.mid', 'lightness.mid', 'lightwalk.mid', 'lonesome.mid', 'long_ago.mid', 'long_way_home.mid', 'lullaby.mid', 'mage_arena.mid', 'magic_dance.mid', 'magical_journey.mid', 'march2.mid', 'medieval.mid', 'mellow.mid', 'miles_away.mid', 'miracle_dance.mid', 'monarch_waltz.mid', 'moody.mid', 'neverland.mid', 'newbie_melody.mid', 'nightfall.mid', 'nomad.mid', 'null.mid', 'organ_music_1.mid', 'organ_music_2.mid', 'oriental.mid', 'overture.mid', 'parade.mid', 'quest.mid', 'regal2.mid', 'reggae.mid', 'reggae2.mid', 'riverside.mid', 'royale.mid', 'rune_essence.mid', 'sad_meadow.mid', 'scape_cave.mid', 'scape_main.mid', 'scape_sad1.mid', 'scape_soft.mid', 'scape_wild1.mid', 'sea_shanty.mid', 'sea_shanty2.mid', 'serenade.mid', 'serene.mid', 'shine.mid', 'shining.mid', 'silence.mid', 'soundscape.mid', 'spirit.mid', 'splendour.mid', 'spooky2.mid', 'spooky_jungle.mid', 'starlight.mid', 'start.mid', 'still_night.mid', 'talking_forest.mid', 'the_desert.mid', 'the_shadow.mid', 'the_tower.mid', 'theme.mid', 'tomorrow.mid', 'trawler.mid', 'trawler_minor.mid', 'tree_spirits.mid', 'tribal.mid', 'tribal2.mid', 'tribal_background.mid', 'trinity.mid', 'troubled.mid', 'undercurrent.mid', 'underground.mid', 'understanding.mid', 'unknown_land.mid', 'upass1.mid', 'upcoming.mid', 'venture.mid', 'venture2.mid', 'vision.mid', 'voodoo_cult.mid', 'voyage.mid', 'wander.mid', 'waterfall.mid', 'wilderness2.mid', 'wilderness3.mid', 'wilderness4.mid', 'witching.mid', 'wolf_mountain.mid', 'wonder.mid', 'wonderous.mid', 'workshop.mid', 'yesteryear.mid', 'zealot.mid'];
    for (let i = 0; i < allSongs.length; i++) {
        const name = allSongs[i];
        console.log(name);

        const song = new Uint8Array(await (await fetch(`data/pack/client/songs/${name}`)).arrayBuffer());
        const crc = Packet.getcrc(song, 0, song.length);

        PRELOADED.set(name, song);
        PRELOADED_CRC.set(name, crc);
    }

    const allJingles = ['advance agility.mid', 'advance attack.mid', 'advance attack2.mid', 'advance cooking.mid', 'advance cooking2.mid', 'advance crafting.mid', 'advance crafting2.mid', 'advance defense.mid', 'advance defense2.mid', 'advance firemarking.mid', 'advance firemarking2.mid', 'advance fishing.mid', 'advance fishing2.mid', 'advance fletching.mid', 'advance fletching2.mid', 'advance herblaw.mid', 'advance herblaw2.mid', 'advance hitpoints.mid', 'advance hitpoints2.mid', 'advance magic.mid', 'advance magic2.mid', 'advance mining.mid', 'advance mining2.mid', 'advance prayer.mid', 'advance prayer2.mid', 'advance ranged.mid', 'advance ranged2.mid', 'advance runecraft.mid', 'advance runecraft2.mid', 'advance smithing.mid', 'advance smithing2.mid', 'advance strength.mid', 'advance strength2.mid', 'advance thieving.mid', 'advance thieving2.mid', 'advance woodcutting.mid', 'advance woodcutting2.mid', 'death.mid', 'death2.mid', 'dice lose.mid', 'dice win.mid', 'duel start.mid', 'duel win2.mid', 'quest complete 1.mid', 'quest complete 2.mid', 'quest complete 3.mid', 'sailing journey.mid', 'treasure hunt win.mid'];
    for (let i = 0; i < allJingles.length; i++) {
        const name = allJingles[i];
        console.log(name);

        // Strip off bzip header.
        const jingle = new Uint8Array(await (await fetch(`data/pack/client/jingles/${name}`)).arrayBuffer()).subarray(4);
        const crc = Packet.getcrc(jingle, 0, jingle.length);

        PRELOADED.set(name, jingle);
        PRELOADED_CRC.set(name, crc);
    }
    //console.timeEnd('Preloaded client data');
}
