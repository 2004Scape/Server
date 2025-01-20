import fs from 'fs';
import { loadPack } from '#/util/NameMap.js';

const sounds = [
    'bat_death',
    'bat_attack',
    'bat_hit',
    'imp_death',
    'imp_attack',
    'imp_hit',
    'rat_death',
    'rat_hit',
    'rat_attack',
    'bear_attack',
    'bear_death',
    'bear_hit',
    'bird_death',
    'bird_attack',
    'bird_hit',
    'duck_hit',
    'duck_death',
    'quack',
    null,
    35,
    null,
    37,
    null, // loopable
    'kingicebreath', // loopable
    'lightningbreath', // loopable
    'toxicbreath', // loopable
    'animated_death',
    'animated_hit',
    44,
    48,
    49,
    'giant_hit',
    'giant_death',
    'giant_attack',
    'ghost_hit',
    'ghost_death',
    'ghost_attack',
    'human_death',
    'human_hit_7',
    'shark_death',
    'shark_hit',
    'shark_attack',
    'snake_death',
    'snaketest1',
    'snake_attack',
    'snake_hit',
    'skeleton_attack',
    109,
    'skelly_hit',
    114,
    115,
    116,
    'babydragon_attack',
    'babydragon_death',
    'babydragon_hit',
    'goblin_attack',
    'goblin_hit',
    'goblin_death',
    'growl3',
    'growl4',
    'growl5',
    'growl6',
    'growl',
    'growl2',
    133,
    134,
    136,
    'monkey_hit',
    'otherworld_hit',
    'otherworld_attack',
    'otherworld_death',
    'zombie_hit',
    'zombie_death',
    'zombie_attack',
    'chicken_death',
    'chicken_hit',
    'chicken_attack',
    155, // loopable
    155, // loopable
    'zap',
    'vulnerability_all', // loopable
    'bind_all', // loopable
    160, // loopable
    'fire_blast_all', // loopable
    null, // loopable
    'fire_wave_all', // loopable
    165, // loopable
    'fire_bolt_all', // loopable
    null, // loopable
    'fire_wave_fail', // loopable
    'selfheal',
    'heal',
    'stun_all', // loopable
    172, // loopable
    'wind_wave_all', // loopable
    174, // loopable
    175, // loopable
    'wind_wave_fail', // loopable
    177, // loopable
    178, // loopable
    179, // loopable
    'confuse_all', // loopable
    'curse_all', // loopable
    'earth_wave_fail', // loopable
    183, // loopable
    'earth_wave_all', // loopable
    185, // loopable
    186, // loopable
    null, // loopable
    188, // loopable
    null, // loopable
    'snare_all', // loopable
    'water_wave_fail', // loopable
    'water_strike_fail', // loopable
    193, // loopable
    'water_wave_all', // loopable
    null, // loopable
    null, // loopable
    197, // loopable
    198, // loopable
    'undead_rot', // loopable
    'telegrab_all', // loopable
    'teleport_reverse',
    'teleport_all',
    'enchant_dragon_amulet',
    'enchant_diamond_amulet',
    'enchant_ruby_amulet',
    'enchant_emerald_amulet',
    'enchant_sapphire_amulet',
    'charge_earth_orb',
    'charge_air_orb',
    'charge_water_orb',
    'charge_fire_orb',
    'superheat_all',
    'superheat_fail',
    'enfeeble_all', // loopable
    'entangle_all', // loopable
    'summon_zombie',
    'high_alchemy',
    'low_alchemy',
    'weaken_all', // loopable
    'crumble_all', // loopable
    'bones_to_bananas_all',
    'lava_bridge',
    229,
    'lockeddoor',
    'fire_teleport',
    'explosion',
    234,
    'fuse',
    'whistle',
    'throw',
    null,
    'iban_lightning',
    'mcannon_fire',
    'machine2',
    'demon_approach',
    'machinery',
    'flames_of_zamorak', // loopable
    'claws_of_guthix', // loopable
    'charge_gone',
    'charge',
    'saradomin_strike', // loopable
    'pool_plop',
    'smokepuff',
    'smokepuff2',
    'bullroarer',
    'door_open',
    'lever',
    'chest_open',
    'cupboard_open',
    'locked',
    'door_close',
    'cupboard_close',
    'chest_close',
    336,
    'millstones',
    'oven', // loopable
    'pick2',
    'fry',
    'pick',
    'hopperlever',
    'javelin',
    'longbow',
    'shortbow',
    'outofammo',
    'throwingknife',
    'thrown',
    'throwingaxe',
    'crossbow',
    'dart',
    'arrowlaunch2',
    'tap_fill', // loopable
    'grind',
    'fire_lit', // loopable
    'tinderbox_strike',
    'put_down',
    'fishing_cast',
    'bones_down',
    'mace_stab',
    'mace_crush',
    'staff_hit',
    null,
    'staff_stab',
    'hacksword_slash',
    'hacksword_crush',
    'hacksword_stab',
    'baxe_slash',
    'baxe_crush',
    null,
    'stabsword_crush',
    'stabsword_stab',
    null,
    null,
    'sword_hit2',
    null,
    null,
    null,
    null,
    null,
    null,
    'unarmed_punch',
    'unarmed_kick',
    '2H_slash',
    '2H_crush',
    '2H_stab',
    null,
    'mine_quick',
    'found_gem',
    'prospect',
    null,
    'prayer_drain',
    'prayer_recharge',
    'prayer_boost',
    459, // loopable
    'sand_bucket',
    'stringing',
    'pottery',
    'chisel',
    'anvil',
    'anvil2',
    null, // loopable
    'anvil_4',
    'furnace', // loopable
    'anothercry',
    'woodchop_quick',
    'woodchop',
    'woodchop_4',
    'pop1',
    'pop2',
    'bubbling', // loopable
    'monkey_attack',
    'monkey_death',
    'cry1',
    'goblin2',
    'cry3',
    'terrorbird_attack',
    'terrorbird_hit',
    'terrorbird_death',
    'cow_death',
    'cow_attack',
    'cow_hit',
    'barklike',
    'leak',
    'gnome_attack',
    'gnome_death',
    'gnome_hit',
    'firework',
    'arrow_launch',
    'black_demon_death',
    'black_demon_hit',
    'black_demon_attack',
    'ice_warrior_death',
    'ice_warrior_hit',
    null, // loopable
    'whirlpool',
    'swarm_attack',
    'swarm_appear',
    'lost_pickaxe',
    'zombie_moan',
    'triffid_attack',
    'cavein',
    'gas_explosion',
    'triffid_appear',
    'genie_appear',
    'dryad_appear',
    null,
    'sizzle',
    'jump_no_land',
    'squeeze_in',
    'squeeze_out',
    'watersplash',
    379,
    'liquid',
    'eat',
    'smash_gem',
    'fish_swim',
    'paralyze', // loopable
    null,
    'gas_hiss',
    'coffin_open',
    'coffin_close',
    'mid_plop',
    'stunned',
    'mammoth_hit',
    'mammoth_death',
    'mammoth_attack',
    'penguin_hit',
    'penguin_death',
    'penguin_attack',
    'golem_attack',
    'golem_hit',
    'golem_death',
    'mummy_death',
    'mummy_attack',
    'mummy_hit',
    'orc_attack',
    'orc_death',
    'orc_hit',
    'grate_close',
    'tanglevine_appear',
    'tremor',
    'rock_spirit_appear',
    'rock_spirit',
    'birdlike',
    'grate_open',
    null,
    'ghost_hit2',
    'lizardman_attack',
    'lizardman_death',
    'lizardman_hit',
    'scream',
    'dwarf_whistle',
    'sourhog_death_collapse',
    'cavernous',
    'protect_items',
    'protect_from_melee',
    'superhuman_strength',
    'cancel_prayer',
    'clarity',
    'protect_from_magic',
    'steel_skin',
    'incredible_reflexes',
    'rock_skin',
    'rapid_heal',
    'protect_from_missiles',
    'thick_skin',
    'prayer_off',
    'improved_reflexes',
    'strength_burst',
    'ultimate_strength',
    'rapid_restore',
    'flames_of_zamorak_fail', // loopable
    'claws_of_guthix_fail', // loopable
    'saradomin_strike_fail', // loopable
    'enchant_ruby_ring',
    'enchant_emerald_ring',
    'enchant_sapphire_ring',
    'enchant_dragon_ring',
    'enchant_diamond_ring',
    null,
    'nasty_tree_attack',
    null,
    null,
    'human_hit3',
    'human_hit4',
    'human_hit2',
    'female_hit',
    'female_hit2',
    'female_death',
    'chompy_bird_attack',
    'chompy_bird_hit',
    'chompy_bird_death',
    'howl1',
    'lycanthropy',
    'holy_water_pour',
    'toad_burst',
    'ogre_bellows',
    'swamp', // loopable
    'spit_roast',
    'ogre_bow',
    'biglever',
    'chompy_bird_squak',
    'chompy_bird_screech',
    'toad_croak',
    'toad_hiss', // loopable
    'fire_elemental_attack', // loopable
    'fire_elemental_death', // loopable
    'fire_elemental_hit', // loopable
    'toad_attack',
    'toad_death',
    'toad_hit',
    'toad2',
    'squeaky_valve_gush',
    'squeaky_valve',
    288,
    'ogre_bellows_suck',
    'shield_appear',
    'cleave',
    'puncture',
    'shatter',
    'shove',
    null,
    null,
    'sanctuary',
    'rampage', // loopable
    'powershot',
    'knock_knock',
    'earth_elemental_attack',
    'earth_elemental_death',
    'well_fill',
    'earth_elemental_hit',
    'water_elemental_hit',
    'air_elemental_hit',
    'air_elemental_death',
    'water_elemental_attack',
    null,
    'air_elemental_attack',
    'water_elemental_death',
    'half_werewolf_death',
    'half_werewolf_hit',
    'horse_hit',
    'slide_puzzle',
    'bear_death_undead',
    'lava_bowl_fill', // loopable
    'water_wheel_stop',
    'lava_bowl_pour',
    'sluice_gate',
    'water_wheel_start',
    'dice_shake',
    'dice_roll',
    'unlock_and_move',
    'snapshot',
    'impale',
    'neptune_blast'
];

const pack = loadPack('data/src/pack/sound.pack');

fs.readdirSync('data/src/sounds').forEach(f => {
    const id = f.split('.')[0].split('_')[1];
    const match = sounds[id as unknown as number];

    if (typeof match === 'string') {
        pack[id as unknown as number] = match;
        fs.renameSync(`data/src/sounds/${f}`, `data/src/sounds/${match}.synth`);
    }
});

fs.writeFileSync('data/src/pack/sound.pack', pack.map((value, index) => `${index}=${value}`).join('\n'));
