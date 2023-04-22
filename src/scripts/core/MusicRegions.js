import { Position } from '#util/Position.js';

const MusicList = [
    { x: 36, z: 52, name: 'tree_spirits' },
    { x: 36, z: 53, name: 'gnome_village2' },
    { x: 36, z: 54, name: 'gnomeball' },
    { x: 37, z: 49, name: 'serenade' },
    { x: 37, z: 51, name: 'moody' },
    { x: 37, z: 52, name: 'tree_spirits' },
    { x: 37, z: 53, name: 'gnome_village2' },
    { x: 37, z: 54, name: 'gnomeball' },
    { x: 37, z: 55, name: 'gnomeball' },
    { x: 38, z: 49, name: 'serenade' },
    { x: 38, z: 50, name: 'expecting' },
    { x: 38, z: 51, name: 'moody' },
    { x: 38, z: 52, name: 'neverland' },
    { x: 38, z: 53, name: 'gnome_village' },
    { x: 38, z: 54, name: 'gnome_king' },
    { x: 38, z: 55, name: 'gnome_king' },
    { x: 39, z: 46, name: 'soundscape' },
    { x: 39, z: 47, name: 'gaol' },
    { x: 39, z: 48, name: 'big_chords' },
    { x: 39, z: 49, name: 'emotion' },
    { x: 39, z: 50, name: 'attack1' },
    { x: 39, z: 51, name: 'sad_meadow' },
    { x: 39, z: 52, name: 'march2' },
    { x: 39, z: 53, name: 'waterfall' },
    { x: 39, z: 54, name: 'voyage' },
    { x: 39, z: 55, name: 'legion' },
    { x: 40, z: 46, name: 'grumpy' },
    { x: 40, z: 47, name: 'in_the_manor' },
    { x: 40, z: 48, name: 'magic_dance' },
    { x: 40, z: 49, name: 'attack4' },
    { x: 40, z: 50, name: 'ballad_of_enchantment' },
    { x: 40, z: 51, name: 'knightly' },
    { x: 40, z: 52, name: 'the_tower' },
    { x: 40, z: 53, name: 'mellow' },
    { x: 40, z: 54, name: 'theme' },
    { x: 41, z: 46, name: 'chompy_hunt' },
    { x: 41, z: 48, name: 'long_ago' },
    { x: 41, z: 49, name: 'fanfare3' },
    { x: 41, z: 50, name: 'upcoming' },
    { x: 41, z: 51, name: 'baroque' },
    { x: 41, z: 52, name: 'wonderous' },
    { x: 41, z: 53, name: 'lasting' },
    { x: 41, z: 54, name: 'talking_forest' },
    { x: 41, z: 55, name: 'lullaby' },
    { x: 42, z: 49, name: 'landlubber' },
    { x: 42, z: 50, name: 'jungly2' },
    { x: 42, z: 51, name: 'riverside' },
    { x: 42, z: 52, name: 'trinity' },
    { x: 42, z: 53, name: 'magical_journey' },
    { x: 42, z: 54, name: 'overture' },
    { x: 42, z: 55, name: 'monarch_waltz' },
    { x: 43, z: 45, name: 'spooky_jungle' },
    { x: 43, z: 46, name: 'jungly1' },
    { x: 43, z: 47, name: 'jungly3' },
    { x: 43, z: 48, name: 'nomad' },
    { x: 43, z: 49, name: 'high_seas' },
    { x: 43, z: 50, name: 'jollyr' },
    { x: 43, z: 51, name: 'fishing' },
    { x: 43, z: 52, name: 'background2' },
    { x: 43, z: 53, name: 'lightwalk' },
    { x: 43, z: 54, name: 'camelot' },
    { x: 43, z: 55, name: 'camelot' },
    { x: 44, z: 45, name: 'jungle_island' },
    { x: 44, z: 46, name: 'ambient_jungle' },
    { x: 44, z: 47, name: 'tribal' },
    { x: 44, z: 48, name: 'tribal_background' },
    { x: 44, z: 49, name: 'jungle_island' },
    { x: 44, z: 50, name: 'the_shadow' },
    { x: 44, z: 51, name: 'the_shadow' },
    { x: 44, z: 52, name: 'background2' },
    { x: 44, z: 53, name: 'fishing' },
    { x: 44, z: 54, name: 'ice_melody' },
    { x: 44, z: 55, name: 'ice_melody' },
    { x: 45, z: 45, name: 'reggae' },
    { x: 45, z: 46, name: 'tribal2' },
    { x: 45, z: 47, name: 'reggae2' },
    { x: 45, z: 48, name: 'spooky_jungle' },
    { x: 45, z: 49, name: 'sea_shanty' },
    { x: 45, z: 50, name: 'emperor' },
    { x: 45, z: 51, name: 'miles_away' },
    { x: 45, z: 52, name: 'arrival' },
    { x: 45, z: 53, name: 'horizon' },
    { x: 45, z: 54, name: 'splendour' },
    { x: 45, z: 55, name: 'splendour' },
    { x: 46, z: 45, name: 'reggae' },
    { x: 46, z: 46, name: 'tribal2' },
    { x: 46, z: 47, name: 'fanfare2' },
    { x: 46, z: 49, name: 'attention' },
    { x: 46, z: 50, name: 'long_way_home' },
    { x: 46, z: 51, name: 'nightfall' },
    { x: 46, z: 52, name: 'fanfare' },
    { x: 46, z: 53, name: 'scape_soft' },
    { x: 46, z: 54, name: 'gnome' },
    { x: 46, z: 55, name: 'wonder' },
    { x: 46, z: 56, name: 'lightness' },
    { x: 46, z: 57, name: 'troubled' },
    { x: 46, z: 58, name: 'wilderness4' },
    { x: 46, z: 59, name: 'deep_wildy' },
    { x: 46, z: 60, name: 'sad_meadow' },
    { x: 46, z: 61, name: 'serene' },
    { x: 47, z: 47, name: 'newbie_melody' },
    { x: 47, z: 48, name: 'newbie_melody' },
    { x: 47, z: 49, name: 'tomorrow' },
    { x: 47, z: 50, name: 'sea_shanty2' },
    { x: 47, z: 51, name: 'wander' },
    { x: 47, z: 52, name: 'workshop' },
    { x: 47, z: 53, name: 'gnome_theme' },
    { x: 47, z: 54, name: 'alone' },
    { x: 47, z: 55, name: 'inspiration' },
    { x: 47, z: 56, name: 'army_of_darkness' },
    { x: 47, z: 57, name: 'legion' },
    { x: 47, z: 58, name: 'gaol' },
    { x: 47, z: 59, name: 'wilderness3' },
    { x: 47, z: 60, name: 'forever' },
    { x: 47, z: 61, name: 'book_of_spells' },
    { x: 48, z: 47, name: 'newbie_melody' },
    { x: 48, z: 48, name: 'newbie_melody' },
    { x: 48, z: 49, name: 'vision' },
    { x: 48, z: 50, name: 'unknown_land' },
    { x: 48, z: 51, name: 'start' },
    { x: 48, z: 52, name: 'spooky2' },
    { x: 48, z: 53, name: 'dark2' },
    { x: 48, z: 54, name: 'forever' },
    { x: 48, z: 55, name: 'dangerous' },
    { x: 48, z: 56, name: 'deep_wildy' },
    { x: 48, z: 57, name: 'undercurrent' },
    { x: 48, z: 58, name: 'wilderness2' },
    { x: 48, z: 59, name: 'wilderness3' },
    { x: 48, z: 60, name: 'forever' },
    { x: 48, z: 61, name: 'mage_arena' },
    { x: 49, z: 47, name: 'the_desert' },
    { x: 49, z: 48, name: 'newbie_melody' },
    { x: 49, z: 49, name: 'book_of_spells' },
    { x: 49, z: 50, name: 'dream1' },
    { x: 49, z: 51, name: 'flute_salad' },
    { x: 49, z: 52, name: 'greatness' },
    { x: 49, z: 53, name: 'spirit' },
    { x: 49, z: 54, name: 'doorways' },
    { x: 49, z: 55, name: 'lightness' },
    { x: 49, z: 56, name: 'moody' },
    { x: 49, z: 57, name: 'wilderness3' },
    { x: 49, z: 58, name: 'close_quarters' },
    { x: 49, z: 59, name: 'wolf_mountain' },
    { x: 49, z: 60, name: 'scape_wild1' },
    { x: 49, z: 61, name: 'expanse' },
    { x: 50, z: 47, name: 'the_desert' },
    { x: 50, z: 48, name: 'arabian3' },
    { x: 50, z: 49, name: 'yesteryear' },
    { x: 50, z: 50, name: 'harmony' },
    { x: 50, z: 51, name: 'autumn_voyage' },
    { x: 50, z: 52, name: 'expanse' },
    { x: 50, z: 53, name: 'garden' },
    { x: 50, z: 54, name: 'adventure' },
    { x: 50, z: 55, name: 'crystal_sword' },
    { x: 50, z: 56, name: 'underground' },
    { x: 50, z: 57, name: 'scape_wild1' },
    { x: 50, z: 58, name: 'shining' },
    { x: 50, z: 59, name: 'wolf_mountain' },
    { x: 50, z: 60, name: 'scape_wild1' },
    { x: 50, z: 61, name: 'nightfall' },
    { x: 51, z: 46, name: 'desert_voyage' },
    { x: 51, z: 47, name: 'desert_voyage' },
    { x: 51, z: 48, name: 'egypt' },
    { x: 51, z: 49, name: 'al_kharid' },
    { x: 51, z: 50, name: 'arabian' },
    { x: 51, z: 51, name: 'arabian2' },
    { x: 51, z: 52, name: 'still_night' },
    { x: 51, z: 53, name: 'medieval' },
    { x: 51, z: 54, name: 'parade' },
    { x: 51, z: 55, name: 'forbidden' },
    { x: 51, z: 56, name: 'underground' },
    { x: 51, z: 57, name: 'dark2' },
    { x: 51, z: 58, name: 'witching' },
    { x: 51, z: 59, name: 'dangerous' },
    { x: 51, z: 60, name: 'scape_sad1' },
    { x: 51, z: 61, name: 'regal2' },
    { x: 52, z: 47, name: 'desert_voyage' },
    { x: 52, z: 48, name: 'egypt' },
    { x: 52, z: 49, name: 'al_kharid' },
    { x: 52, z: 50, name: 'duel_arena' },
    { x: 52, z: 51, name: 'shine' },
    { x: 52, z: 52, name: 'venture' },
    { x: 52, z: 53, name: 'lullaby' },
    { x: 52, z: 54, name: 'parade' },
    { x: 52, z: 55, name: 'forbidden' },
    { x: 52, z: 56, name: 'underground' },
    { x: 52, z: 57, name: 'dark2' },
    { x: 52, z: 58, name: 'witching' },
    { x: 52, z: 59, name: 'dangerous' },
    { x: 52, z: 60, name: 'scape_sad1' },
    { x: 52, z: 61, name: 'regal2' },
    { x: 29, z: 75, name: 'trawler' },
    { x: 30, z: 75, name: 'trawler_minor' },
    { x: 31, z: 75, name: 'trawler_minor' },
    { x: 33, z: 71, name: 'iban' },
    { x: 33, z: 72, name: 'iban' },
    { x: 33, z: 73, name: 'iban' },
    { x: 33, z: 75, name: 'quest' },
    { x: 34, z: 75, name: 'quest' },
    { x: 37, z: 73, name: 'voodoo_cult' },
    { x: 37, z: 75, name: 'understanding' },
    { x: 39, z: 75, name: 'heart_and_mind' },
    { x: 40, z: 75, name: 'quest' },
    { x: 41, z: 73, name: 'miles_away' },
    { x: 41, z: 75, name: 'quest' },
    { x: 42, z: 75, name: 'zealot' },
    { x: 43, z: 73, name: 'emotion' },
    { x: 43, z: 75, name: 'miracle_dance' },
    { x: 44, z: 75, name: 'serene' },
    { x: 45, z: 75, name: 'rune_essence' },
    { x: 36, z: 153, name: 'intrepid' },
    { x: 36, z: 154, name: 'intrepid' },
    { x: 37, z: 147, name: 'expedition' },
    { x: 37, z: 149, name: 'upass1' },
    { x: 37, z: 150, name: 'upass1' },
    { x: 37, z: 151, name: 'cursed' },
    { x: 38, z: 150, name: 'expecting' },
    { x: 38, z: 151, name: 'cursed' },
    { x: 39, z: 147, name: 'gaol' },
    { x: 39, z: 150, name: 'scape_sad1' },
    { x: 39, z: 153, name: 'waterfall' },
    { x: 39, z: 155, name: 'legion' },
    { x: 40, z: 147, name: 'attack6' },
    { x: 40, z: 148, name: 'cavern' },
    { x: 40, z: 149, name: 'attack4' },
    { x: 40, z: 150, name: 'alone' },
    { x: 40, z: 151, name: 'scape_sad1' },
    { x: 40, z: 154, name: 'theme' },
    { x: 41, z: 146, name: 'chompy_hunt' },
    { x: 41, z: 152, name: 'chain_of_command' },
    { x: 41, z: 153, name: 'chain_of_command' },
    { x: 41, z: 154, name: 'chain_of_command' },
    { x: 42, z: 151, name: 'escape' },
    { x: 42, z: 152, name: 'trinity' },
    { x: 42, z: 153, name: 'attack5' },
    { x: 43, z: 145, name: 'voodoo_cult' },
    { x: 43, z: 146, name: 'jungly1' },
    { x: 43, z: 153, name: 'arabique' },
    { x: 44, z: 148, name: 'tribal_background' },
    { x: 44, z: 149, name: 'attack2' },
    { x: 44, z: 150, name: 'attack2' },
    { x: 44, z: 152, name: 'underground' },
    { x: 44, z: 153, name: 'arabique' },
    { x: 44, z: 154, name: 'beyond' },
    { x: 44, z: 155, name: 'beyond' },
    { x: 45, z: 145, name: 'beyond' },
    { x: 45, z: 146, name: 'oriental' },
    { x: 45, z: 148, name: 'spooky_jungle' },
    { x: 45, z: 151, name: 'royale' },
    { x: 45, z: 152, name: 'dunjun' },
    { x: 45, z: 153, name: 'arabique' },
    { x: 45, z: 154, name: 'arabique' },
    { x: 46, z: 149, name: 'starlight' },
    { x: 46, z: 152, name: 'dunjun' },
    { x: 46, z: 153, name: 'cave_background1' },
    { x: 47, z: 149, name: 'starlight' },
    { x: 47, z: 152, name: 'cave_background1' },
    { x: 47, z: 153, name: 'cave_background1' },
    { x: 47, z: 160, name: 'attack3' },
    { x: 47, z: 161, name: 'cavern' },
    { x: 48, z: 148, name: 'scape_cave' },
    { x: 48, z: 149, name: 'vision' },
    { x: 48, z: 153, name: 'dark2' },
    { x: 48, z: 154, name: 'forever' },
    { x: 48, z: 155, name: 'forever' },
    { x: 48, z: 156, name: 'forever' },
    { x: 49, z: 148, name: 'faerie' },
    { x: 49, z: 149, name: 'faerie' },
    { x: 49, z: 153, name: 'cellar_song1' },
    { x: 49, z: 154, name: 'scape_cave' },
    { x: 50, z: 149, name: 'crystal_cave' },
    { x: 50, z: 150, name: 'harmony2' },
    { x: 50, z: 152, name: 'garden' },
    { x: 50, z: 153, name: 'garden' },
    { x: 50, z: 154, name: 'scape_cave' },
    { x: 51, z: 147, name: 'lonesome' },
    { x: 51, z: 154, name: 'scape_cave' },
    { x: 52, z: 152, name: 'venture2' },
    { x: 52, z: 153, name: 'venture2' }
];

const TrackList = {
    "adventure": {
        "name": "Adventure",
        "varp": 20,
        "bit": 0
    },
    "al_kharid": {
        "name": "Al Kharid",
        "varp": 20,
        "bit": 1
    },
    "alone": {
        "name": "Alone",
        "varp": 20,
        "bit": 2
    },
    "ambient_jungle": {
        "name": "Ambient Jungle",
        "varp": 20,
        "bit": 3
    },
    "arabian": {
        "name": "Arabian",
        "varp": 20,
        "bit": 4
    },
    "arabian2": {
        "name": "Arabian2",
        "varp": 20,
        "bit": 5
    },
    "arabian3": {
        "name": "Arabian3",
        "varp": 20,
        "bit": 6
    },
    "arabique": {
        "name": "Arabique",
        "varp": 20,
        "bit": 7
    },
    "army_of_darkness": {
        "name": "Army Of Darkness",
        "varp": 20,
        "bit": 8
    },
    "arrival": {
        "name": "Arrival",
        "varp": 20,
        "bit": 9
    },
    "attack1": {
        "name": "Attack1",
        "varp": 20,
        "bit": 10
    },
    "attack2": {
        "name": "Attack2",
        "varp": 20,
        "bit": 11
    },
    "attack3": {
        "name": "Attack3",
        "varp": 20,
        "bit": 12
    },
    "attack4": {
        "name": "Attack4",
        "varp": 20,
        "bit": 13
    },
    "attack5": {
        "name": "Attack5",
        "varp": 20,
        "bit": 14
    },
    "attack6": {
        "name": "Attack6",
        "varp": 20,
        "bit": 15
    },
    "attention": {
        "name": "Attention",
        "varp": 20,
        "bit": 16
    },
    "autumn_voyage": {
        "name": "Autumn Voyage",
        "varp": 20,
        "bit": 17
    },
    "background2": {
        "name": "Background2",
        "varp": 20,
        "bit": 18
    },
    "ballad_of_enchantment": {
        "name": "Ballad Of Enchantment",
        "varp": 20,
        "bit": 19
    },
    "baroque": {
        "name": "Baroque",
        "varp": 20,
        "bit": 20
    },
    "beyond": {
        "name": "Beyond",
        "varp": 20,
        "bit": 21
    },
    "big_chords": {
        "name": "Big Chords",
        "varp": 20,
        "bit": 22
    },
    "book_of_spells": {
        "name": "Book Of Spells",
        "varp": 20,
        "bit": 23
    },
    "camelot": {
        "name": "Camelot",
        "varp": 20,
        "bit": 24
    },
    "cave_background1": {
        "name": "Cave Background1",
        "varp": 20,
        "bit": 25
    },
    "cavern": {
        "name": "Cavern",
        "varp": 20,
        "bit": 26
    },
    "chain_of_command": {
        "name": "Chain Of Command",
        "varp": 20,
        "bit": 27
    },
    "crystal_cave": {
        "name": "Crystal Cave",
        "varp": 20,
        "bit": 28
    },
    "crystal_sword": {
        "name": "Crystal Sword",
        "varp": 20,
        "bit": 29
    },
    "dangerous": {
        "name": "Dangerous",
        "varp": 20,
        "bit": 30
    },
    "dark2": {
        "name": "Dark2",
        "varp": 20,
        "bit": 31
    },
    "deep_wildy": {
        "name": "Deep Wildy",
        "varp": 21,
        "bit": 0
    },
    "desert_voyage": {
        "name": "Desert Voyage",
        "varp": 21,
        "bit": 1
    },
    "doorways": {
        "name": "Doorways",
        "varp": 21,
        "bit": 2
    },
    "dream1": {
        "name": "Dream1",
        "varp": 21,
        "bit": 3
    },
    "dunjun": {
        "name": "Dunjun",
        "varp": 21,
        "bit": 4
    },
    "egypt": {
        "name": "Egypt",
        "varp": 21,
        "bit": 5
    },
    "emotion": {
        "name": "Emotion",
        "varp": 21,
        "bit": 6
    },
    "expanse": {
        "name": "Expanse",
        "varp": 21,
        "bit": 8
    },
    "expecting": {
        "name": "Expecting",
        "varp": 21,
        "bit": 9
    },
    "faerie": {
        "name": "Faerie",
        "varp": 21,
        "bit": 11
    },
    "fanfare": {
        "name": "Fanfare",
        "varp": 21,
        "bit": 12
    },
    "fanfare2": {
        "name": "Fanfare2",
        "varp": 25,
        "bit": 2
    },
    "fanfare3": {
        "name": "Fanfare3",
        "varp": 21,
        "bit": 13
    },
    "fishing": {
        "name": "Fishing",
        "varp": 21,
        "bit": 14
    },
    "flute_salad": {
        "name": "Flute Salad",
        "varp": 21,
        "bit": 15
    },
    "forever": {
        "name": "Forever",
        "varp": 21,
        "bit": 16
    },
    "gaol": {
        "name": "Gaol",
        "varp": 21,
        "bit": 17
    },
    "garden": {
        "name": "Garden",
        "varp": 21,
        "bit": 18
    },
    "gnome_king": {
        "name": "Gnome King",
        "varp": 21,
        "bit": 19
    },
    "gnome_theme": {
        "name": "Gnome Theme",
        "varp": 21,
        "bit": 20
    },
    "gnome_village": {
        "name": "Gnome Village",
        "varp": 21,
        "bit": 21
    },
    "gnome_village2": {
        "name": "Gnome Village2",
        "varp": 21,
        "bit": 22
    },
    "gnome": {
        "name": "Gnome",
        "varp": 21,
        "bit": 23
    },
    "gnomeball": {
        "name": "Gnomeball",
        "varp": 21,
        "bit": 24
    },
    "greatness": {
        "name": "Greatness",
        "varp": 21,
        "bit": 25
    },
    "harmony": {
        "name": "Harmony",
        "varp": 21,
        "bit": 26
    },
    "high_seas": {
        "name": "High Seas",
        "varp": 21,
        "bit": 27
    },
    "horizon": {
        "name": "Horizon",
        "varp": 21,
        "bit": 28
    },
    "iban": {
        "name": "Iban",
        "varp": 21,
        "bit": 29
    },
    "in_the_manor": {
        "name": "In The Manor",
        "varp": 21,
        "bit": 30
    },
    "inspiration": {
        "name": "Inspiration",
        "varp": 21,
        "bit": 31
    },
    "intrepid": {
        "name": "Intrepid",
        "varp": 22,
        "bit": 0
    },
    "jollyr": {
        "name": "Jolly-R",
        "varp": 22,
        "bit": 1
    },
    "jungle_island": {
        "name": "Jungle Island",
        "varp": 22,
        "bit": 2
    },
    "jungly1": {
        "name": "Jungly1",
        "varp": 22,
        "bit": 3
    },
    "jungly2": {
        "name": "Jungly2",
        "varp": 22,
        "bit": 4
    },
    "jungly3": {
        "name": "Jungly3",
        "varp": 22,
        "bit": 5
    },
    "knightly": {
        "name": "Knightly",
        "varp": 22,
        "bit": 6
    },
    "lasting": {
        "name": "Lasting",
        "varp": 22,
        "bit": 7
    },
    "legion": {
        "name": "Legion",
        "varp": 22,
        "bit": 8
    },
    "lightness": {
        "name": "Lightness",
        "varp": 22,
        "bit": 9
    },
    "lightwalk": {
        "name": "Lightwalk",
        "varp": 22,
        "bit": 10
    },
    "long_ago": {
        "name": "Long Ago",
        "varp": 22,
        "bit": 11
    },
    "long_way_home": {
        "name": "Long Way Home",
        "varp": 22,
        "bit": 12
    },
    "march2": {
        "name": "March2",
        "varp": 22,
        "bit": 17
    },
    "lullaby": {
        "name": "Lullaby",
        "varp": 22,
        "bit": 13
    },
    "mage_arena": {
        "name": "Mage Arena",
        "varp": 22,
        "bit": 14
    },
    "magic_dance": {
        "name": "Magic Dance",
        "varp": 22,
        "bit": 15
    },
    "magical_journey": {
        "name": "Magical Journey",
        "varp": 22,
        "bit": 16
    },
    "medieval": {
        "name": "Medieval",
        "varp": 22,
        "bit": 18
    },
    "mellow": {
        "name": "Mellow",
        "varp": 22,
        "bit": 19
    },
    "miles_away": {
        "name": "Miles Away",
        "varp": 22,
        "bit": 20
    },
    "miracle_dance": {
        "name": "Miracle Dance",
        "varp": 22,
        "bit": 21
    },
    "monarch_waltz": {
        "name": "Monarch Waltz",
        "varp": 22,
        "bit": 22
    },
    "moody": {
        "name": "Moody",
        "varp": 22,
        "bit": 23
    },
    "newbie_melody": {
        "name": "Newbie Melody",
    },
    "neverland": {
        "name": "Neverland",
        "varp": 22,
        "bit": 24
    },
    "nightfall": {
        "name": "Nightfall",
        "varp": 22,
        "bit": 26
    },
    "oriental": {
        "name": "Oriental",
        "varp": 22,
        "bit": 27
    },
    "overture": {
        "name": "Overture",
        "varp": 22,
        "bit": 28
    },
    "parade": {
        "name": "Parade",
        "varp": 22,
        "bit": 29
    },
    "quest": {
        "name": "Quest",
        "varp": 22,
        "bit": 30
    },
    "regal2": {
        "name": "Regal2",
        "varp": 22,
        "bit": 31
    },
    "reggae": {
        "name": "Reggae",
        "varp": 23,
        "bit": 0
    },
    "reggae2": {
        "name": "Reggae2",
        "varp": 23,
        "bit": 1
    },
    "riverside": {
        "name": "Riverside",
        "varp": 23,
        "bit": 2
    },
    "royale": {
        "name": "Royale",
        "varp": 23,
        "bit": 3
    },
    "rune_essence": {
        "name": "Rune Essence",
        "varp": 23,
        "bit": 4
    },
    "sad_meadow": {
        "name": "Sad Meadow",
        "varp": 23,
        "bit": 5
    },
    "scape_cave": {
        "name": "Scape Cave",
        "varp": 23,
        "bit": 6
    },
    "scape_sad1": {
        "name": "Scape Sad1",
        "varp": 23,
        "bit": 8
    },
    "scape_wild1": {
        "name": "Scape Wild1",
        "varp": 23,
        "bit": 9
    },
    "sea_shanty": {
        "name": "Sea Shanty",
        "varp": 23,
        "bit": 10
    },
    "sea_shanty2": {
        "name": "Sea Shanty2",
        "varp": 23,
        "bit": 11
    },
    "serenade": {
        "name": "Serenade",
        "varp": 23,
        "bit": 12
    },
    "serene": {
        "name": "Serene",
        "varp": 23,
        "bit": 13
    },
    "shine": {
        "name": "Shine",
        "varp": 23,
        "bit": 14
    },
    "soundscape": {
        "name": "Soundscape",
        "varp": 23,
        "bit": 15
    },
    "spirit": {
        "name": "Spirit",
        "varp": 23,
        "bit": 16
    },
    "splendour": {
        "name": "Splendour",
        "varp": 23,
        "bit": 17
    },
    "spooky2": {
        "name": "Spooky2",
        "varp": 23,
        "bit": 18
    },
    "spooky_jungle": {
        "name": "Spooky Jungle",
        "varp": 23,
        "bit": 19
    },
    "starlight": {
        "name": "Starlight",
        "varp": 23,
        "bit": 20
    },
    "still_night": {
        "name": "Still Night",
        "varp": 23,
        "bit": 22
    },
    "the_desert": {
        "name": "The Desert",
        "varp": 23,
        "bit": 24
    },
    "the_shadow": {
        "name": "The Shadow",
        "varp": 23,
        "bit": 25
    },
    "the_tower": {
        "name": "The Tower",
        "varp": 23,
        "bit": 26
    },
    "trawler": {
        "name": "Trawler",
        "varp": 23,
        "bit": 28
    },
    "trawler_minor": {
        "name": "Trawler Minor",
        "varp": 23,
        "bit": 29
    },
    "tree_spirits": {
        "name": "Tree Spirits",
        "varp": 23,
        "bit": 30
    },
    "tribal_background": {
        "name": "Tribal Background",
        "varp": 23,
        "bit": 31
    },
    "tribal": {
        "name": "Tribal",
        "varp": 24,
        "bit": 0
    },
    "tribal2": {
        "name": "Tribal2",
        "varp": 24,
        "bit": 1
    },
    "trinity": {
        "name": "Trinity",
        "varp": 24,
        "bit": 2
    },
    "troubled": {
        "name": "Troubled",
        "varp": 24,
        "bit": 3
    },
    "underground": {
        "name": "Underground",
        "varp": 24,
        "bit": 4
    },
    "unknown_land": {
        "name": "Unknown Land",
        "varp": 24,
        "bit": 5
    },
    "upass1": {
        "name": "Upass1",
        "varp": 24,
        "bit": 6
    },
    "upcoming": {
        "name": "Upcoming",
        "varp": 24,
        "bit": 7
    },
    "venture": {
        "name": "Venture",
        "varp": 24,
        "bit": 8
    },
    "vision": {
        "name": "Vision",
        "varp": 24,
        "bit": 9
    },
    "voodoo_cult": {
        "name": "Voodoo Cult",
        "varp": 24,
        "bit": 10
    },
    "voyage": {
        "name": "Voyage",
        "varp": 24,
        "bit": 11
    },
    "wander": {
        "name": "Wander",
        "varp": 24,
        "bit": 12
    },
    "waterfall": {
        "name": "Waterfall",
        "varp": 24,
        "bit": 13
    },
    "wilderness2": {
        "name": "Wilderness2",
        "varp": 24,
        "bit": 14
    },
    "wilderness3": {
        "name": "Wilderness3",
        "varp": 24,
        "bit": 15
    },
    "wilderness4": {
        "name": "Wilderness4",
        "varp": 24,
        "bit": 16
    },
    "witching": {
        "name": "Witching",
        "varp": 24,
        "bit": 17
    },
    "wonder": {
        "name": "Wonder",
        "varp": 24,
        "bit": 18
    },
    "wonderous": {
        "name": "Wonderous",
        "varp": 24,
        "bit": 19
    },
    "workshop": {
        "name": "Workshop",
        "varp": 24,
        "bit": 20
    },
    "start": {
        "name": "Start",
        "varp": 23,
        "bit": 21
    },
    "talking_forest": {
        "name": "Talking Forest",
        "varp": 23,
        "bit": 23
    },
    "theme": {
        "name": "Theme",
        "varp": 23,
        "bit": 27
    },
    "expedition": {
        "name": "Expedition",
        "varp": 21,
        "bit": 10
    },
    "emperor": {
        "name": "Emperor",
        "varp": 21,
        "bit": 7
    },
    "scape_soft": {
        "name": "Scape Soft",
        "varp": 24,
        "bit": 31
    },
    "yesteryear": {
        "name": "Yesteryear",
        "varp": 25,
        "bit": 1
    },
    "shining": {
        "name": "Shining",
        "varp": 25,
        "bit": 0
    },
    "lonesome": {
        "name": "Lonesome",
        "varp": 24,
        "bit": 21
    },
    "tomorrow": {
        "name": "Tomorrow",
        "varp": 25,
        "bit": 3
    },
    "duel_arena": {
        "name": "Duel Arena",
        "varp": 25,
        "bit": 4
    },
    "ice_melody": {
        "name": "Ice Melody",
        "varp": 25,
        "bit": 5
    },
    "wolf_mountain": {
        "name": "Wolf Mountain",
        "varp": 25,
        "bit": 6
    },
    "harmony2": {
        "name": "Harmony2",
        "varp": 25,
        "bit": 7
    },
    "venture2": {
        "name": "Venture2",
        "varp": 25,
        "bit": 8
    },
    "landlubber": {
        "name": "Landlubber",
        "varp": 25,
        "bit": 9
    },
    "undercurrent": {
        "name": "Undercurrent",
        "varp": 25,
        "bit": 10
    },
    "zealot": {
        "name": "Zealot",
        "varp": 25,
        "bit": 12
    },
    "cellar_song1": {
        "name": "Cellar Song1",
        "varp": 25,
        "bit": 13
    },
    "escape": {
        "name": "Escape",
        "varp": 25,
        "bit": 16
    },
    "close_quarters": {
        "name": "Close Quarters",
        "varp": 25,
        "bit": 15
    },
    "heart_and_mind": {
        "name": "Heart and Mind",
        "varp": 25,
        "bit": 14
    },
    "nomad": {
        "name": "Nomad",
        "varp": 25,
        "bit": 11
    },
    "chompy_hunt": {
        "name": "Chompy Hunt",
        "varp": 25,
        "bit": 18
    },
    "grumpy": {
        "name": "Grumpy",
        "varp": 25,
        "bit": 17
    },
    "forbidden": {
        "name": "Forbidden",
        "varp": 25,
        "bit": 25
    },
    "cursed": {
        "name": "Cursed",
        "varp": 25,
        "bit": 26
    },
    "understanding": {
        "name": "Understanding",
        "varp": 25,
        "bit": 27
    }
};

export default class MusicRegions {
    execute(player) {
        if ((player.lastSongX == -1 && player.lastSongZ == -1) || (Position.mapsquare(player.lastSongX) != Position.mapsquare(player.x) || Position.mapsquare(player.lastSongZ) != Position.mapsquare(player.z))) {
            let fileX = Position.mapsquare(player.x);
            let fileZ = Position.mapsquare(player.z);

            let song = MusicList.find(song => song.x == fileX && song.z == fileZ);
            if (song) {
                const track = TrackList[song.name];

                if (track.varp) {
                    if (player.getVarpBit(track.varp, track.bit) == 0) {
                        player.setVarpBit(track.varp, track.bit, 1);
                        player.sendMessage(`You have unlocked a new music track: ${track.name}`);
                    }
                }

                if (player.autoplay || (player.lastSongX == -1 && player.lastSongZ == -1)) {
                    player.playMusic(song.name);
                    player.setInterfaceText(4439, track.name);
                }

                player.lastSong = track.name;
            }

            player.lastSongX = player.x;
            player.lastSongZ = player.z;
        }
    }
}
