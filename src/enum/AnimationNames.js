const animations = [];

/*
554,555,556,557,562,563,564,565,566,567,568,569,570,571,572,573,574,
575,576,577,578,579,588,589,590,591,592,593,594,595,596,597,598,599,
600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617

[chat_human_sleep]
[chatang1] // angry
[chatang2]
[chatang3]
[chatang4]
[chatbored1]
[chatbored2]
[chatbored3]
[chatbored4]
[chatchant1]
[chatcon1] // content
[chatcon2]
[chatcon3]
[chatcon4]
[chatdrunk1]
[chatdrunk2]
[chatdrunk3]
[chatdrunk4]
[chatent1]
[chatent2]
[chatent3]
[chatent4]
[chatgoblin1]
[chatgoblin2]
[chatgoblin3]
[chatgoblin4]
[chathand1]
[chathand2]
[chathand3]
[chathand4]
[chathap1] // happy
[chathap2]
[chathap3]
[chathap4]
[chatidleneu1] // idle neutral
[chatlaugh1]
[chatlaugh2]
[chatlaugh3]
[chatlaugh4]
[chatneu1] // neutral
[chatneu2]
[chatneu3]
[chatneu4]
[chatquiz1] // quizzical
[chatquiz2]
[chatquiz3]
[chatquiz4]
[chatsad1]
[chatsad2]
[chatsad3]
[chatsad4]
[chatscared1]
[chatscared2]
[chatscared3]
[chatscared4]
[chatshifty1]
[chatshifty2]
[chatshifty3]
[chatshifty4]
[chatshock1]
[chatshock2]
[chatshock3]
[chatshock4]
[chatskull1]
[chatskull2]
[chatskull3]
[chatskull4]*/

// chathead animations
animations[591] = 'chatcon1';

// general
animations[829] = 'human_eat';
animations[830] = 'human_dig';
animations[831] = 'human_dig_long';
animations[836] = 'human_death';
animations[827] = 'human_reachforladder'; // burying bones too?
animations[828] = 'human_reachforladdertop';

// diango
animations[918] = 'human_playhorsey_brown';
animations[919] = 'human_playhorsey_white';
animations[920] = 'human_playhorsey_black';
animations[921] = 'human_playhorsey_grey';

// herblore
animations[363] = 'human_herbing_vial';
animations[364] = 'human_herbing_grind';

// magic
animations[714] = 'human_castteleport';

// fishing
animations[618] = 'human_harpoon';
animations[619] = 'human_lobster';
animations[620] = 'human_largenet';
animations[621] = 'human_smallnet';
animations[622] = 'human_fishing_casting';
// animations[623] = 'rod_loop';

// mining
animations[624] = 'human_mining_rune_pickaxe';
animations[625] = 'human_mining_bronze_pickaxe';
animations[626] = 'human_mining_iron_pickaxe';
animations[627] = 'human_mining_steel_pickaxe';
animations[628] = 'human_mining_adamant_pickaxe';
animations[629] = 'human_mining_mithril_pickaxe';
// animations[642] = 'pickhead_lost';

// woodcutting
// animations[644] = 'axehead_lost';
animations[867] = 'human_woodcutting_rune_axe';
// animations[868] = 'rune_axe_fall';
animations[869] = 'human_woodcutting_adamant_axe';
// animations[870] = 'adamant_axe_fall';
animations[871] = 'human_woodcutting_mithril_axe';
// animations[872] = 'mithril_axe_fall';
animations[873] = 'human_woodcutting_black_axe';
// animations[874] = 'black_axe_fall';
animations[875] = 'human_woodcutting_steel_axe';
// animations[876] = 'steel_axe_fall';
animations[877] = 'human_woodcutting_iron_axe';
// animations[878] = 'iron_axe_fall';
animations[879] = 'human_woodcutting_bronze_axe';
// animations[880] = 'bronze_axe_fall';

// firemaking
animations[733] = 'human_createfire';

// thieving
animations[832] = 'human_picklock_chest'; // assumed
animations[833] = 'human_pickuptable'; // assumed, could be swapped ^
animations[881] = 'human_pickpocket';

// crafting
animations[884] = 'human_glassblowing';
animations[885] = 'human_dragonstonecutting';
animations[886] = 'human_diamondcutting';
animations[887] = 'human_rubycutting';
animations[888] = 'human_sapphirecutting';
animations[889] = 'human_emeraldcutting';
animations[890] = 'human_opalcutting';
animations[891] = 'human_jadecutting';
animations[892] = 'human_redtopazcutting';
animations[894] = 'human_spinningwheel';

// cooking
animations[896] = 'human_cooking';
animations[897] = 'human_firecooking';

// smithing
animations[898] = 'human_hammer_hit';
animations[899] = 'human_furnace';

// runecrafting
animations[791] = 'human_runecraft';

// fletching
// human_woodcrafting_knife

export default animations;
