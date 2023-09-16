# Developer Reference

## Script Triggers

### Operable

Operable means you're within 1 tile of an object in a cardinal direction (not diagonal).

| Name        | Description                                           | Example                         |
|-------------|-------------------------------------------------------|---------------------------------|
| oploc1-5    | Used op1-5 on a loc                                   | "Open" "Close" "Mine" "Cut"     |
| oplocu      | Used an object on a loc                               |                                 |
| oploct      | Casting a spell on a loc                              |                                 |
| opnpc1-5    | Used op1-5 on a npc                                   | "Attack" "Talk-to" "Pickpocket" |
| opnpcu      | Used an obj on a npc                                  |                                 |
| opnpct      | Casting a spell on a npc                              |                                 |
| opobj1-5    | GROUND: Used op1-5 on a object in the world           | "Light"                         |
| opobju      | GROUND: Used an object on another object in the world | Tinderbox -> Logs on ground     |
| opobjt      | GROUND: Casting a spell on an object in the world     | Telegrab                        |
| opplayer1-5 | Used op1-5 on a player                                | "Follow" "Trade" "Attack"       |
| opplayeru   | Used an object on a player                            |                                 |
| opplayert   | Casting a spell on a player                           |                                 |

All of these, minus opheld, have ai_* versions from an NPC's perspective.

### Approachable

Approachable means you're interacting within 10 tiles of an object in any direction.

| Name        | Description                                           | Example                         |
|-------------|-------------------------------------------------------|---------------------------------|
| aploc1-5    | Used op1-5 on a loc                                   | "Open" "Close" "Mine" "Cut"     |
| aplocu      | Used an object on a loc                               |                                 |
| aploct      | Casting a spell on a loc                              |                                 |
| apnpc1-5    | Used op1-5 on a npc                                   | "Attack" "Talk-to" "Pickpocket" |
| apnpcu      | Used an obj on a npc                                  |                                 |
| apnpct      | Casting a spell on a npc                              |                                 |
| apobj1-5    | GROUND: Used op1-5 on a object in the world           | "Light"                         |
| apobju      | GROUND: Used an object on another object in the world | Tinderbox -> Logs on ground     |
| apobjt      | GROUND: Casting a spell on an object in the world     | Telegrab                        |
| applayer1-5 | Used op1-5 on a player                                | "Follow" "Trade" "Attack"       |
| applayeru   | Used an object on a player                            |                                 |
| applayert   | Casting a spell on a player                           |                                 |

All of these have ai_* versions from an NPC's perspective.

### Queues

| Name         | Description                      | Example                                        |
|--------------|----------------------------------|------------------------------------------------|
| weakqueue    |                                  |                                                |
| queue        |                                  |                                                |
| ai_queue1-20 | Generically programmable trigger | Damage dealt, retaliation, bind effects, death |

### Timers

| Name      | Description | Example |
|-----------|-------------|---------|
| softtimer |             |         |
| timer     |             |         |
| ai_timer  |             |         |

### Interfaces

| Name          | Description                                                  | Example                         |
|---------------|--------------------------------------------------------------|---------------------------------|
| if_button     | Button component clicked                                     | Playing a music track           |
| inv_button1-5 | option1-5 clicked on an inventory interface (not backpack)   | "Withdraw 5" "Sell 5" "Value"   |
| opheld1-5     | BACKPACK: Used iop1-5 on an object in your inventory         | "Eat" "Drop" "Equip" "Identify" |
| opheldu       | BACKPACK: Used an object on another object in your inventory | Guam -> Vial of Water           |
| opheldt       | BACKPACK: Casting a spell on an object in your inventory     | High Alchemy                    |
| inv_buttond   | Inventory object dragged to another slot                     |                                 |
| if_close      | Interface closed event                                       |                                 |

### Events

| Name            | Description                                           | Example         |
|-----------------|-------------------------------------------------------|-----------------|
| login           | Triggers when the player does login in the world      |                 |
| logout          | Triggers when the player does logout from the world   |                 |
| mapenter        | Every time you enter another mapsquare                |                 |
| if_flashing_tab |                                                       | Tutorial Island |
| move            |                                                       |                 |
| movecheck       |                                                       |                 |
| ai_movecheck    |                                                       |                 |
| levelup         | Triggers when the player levels a stat to a new level |                 |

## Syntax

### Types

| Name       | Description | Example |
|------------|-------------|---------|
| int        |             |         |
| boolean    |             |         |
| string     |             |         |
| loc        |             |         |
| npc        |             |         |
| obj        |             |         |
| coord      |             |         |
| namedobj   |             |         |
| player_uid |             |         |
| npc_uid    |             |         |
| stat       |             |         |
| component  |             |         |
| interface  |             |         |
| inv        |             |         |
| enum       |             |         |
| struct     |             |         |
| param      |             |         |
| dbtable    |             |         |
| dbrow      |             |         |
| dbcolumn   |             |         |
| varp       |             |         |
| mesanim    |             |         |

def_`type`: Define a local variable of `type`.

### Comparators

```js
! - not equal
= - equal
< - less than
> - greater than

if ($var = 1) {
    // do something
}

// equivalent to $var = -1 on ints
if ($var = null) {
    // do something
}
```

You don't compare strings.

### Math

```js
def_int $i = 0;

// incrementing:
$i = calc($i + 1);

// multiplying:
$i = calc($i * 2);

// fractionally scaling (floors):
$i = scale(3, 2, $i); // 1.5x
$i = scale(60, 100, $i); // 0.6x
```

### String Interop

`<...>` is used to escape a variable name in a string. It only accepts strings, so other types must be converted to strings to use it.

```js
def_string $var1 = "1":
def_int $var2 = 2;
def_string $str = "<var1> <tostring(var2)>";
```

## Concepts

### Delays

### Queues

#### Strong-queued Scripts

### Weak Queues

### Timers

### Soft Timers

- TODO: Explain what "soft" means

### Protected

- TODO: Explain commands prefixed with p_, and why this exists

### Active

- TODO: Explain commands prefixed with obj_, npc_, loc_, and the `.` verion of commands

## Table of Commands

These can be found in their signature format as `data/src/scripts/engine.rs2`.

### Core language

| Name                          | Description                                                             | Example               |
|-------------------------------|-------------------------------------------------------------------------|-----------------------|
| push_constant_int             |                                                                         |                       |
| push_constant_string          |                                                                         |                       |
| push_varp                     |                                                                         |                       |
| pop_varp                      |                                                                         |                       |
| push_varbit                   |                                                                         |                       |
| pop_varbit                    |                                                                         |                       |
| push_int_local                |                                                                         |                       |
| pop_int_local                 |                                                                         |                       |
| push_string_local             |                                                                         |                       |
| pop_string_local              |                                                                         |                       |
| branch                        |                                                                         | if (), while ()       |
| branch_not                    |                                                                         | if ($int1 ! $int2)    |
| branch_equals                 |                                                                         | if ($int1 = $int2)    |
| branch_less_than              |                                                                         | if ($int1 < $int2)    |
| branch_greater_than           |                                                                         | if ($int1 > $int2)    |
| branch_less_than_or_equals    |                                                                         | if ($int1 <= $int2)   |
| branch_greater_than_or_equals |                                                                         | if ($int1 >= $int2)   |
| pop_int_discard               |                                                                         |                       |
| pop_string_discard            |                                                                         |                       |
| return                        |                                                                         | if (1 > 0) return;    |
| join_string                   |                                                                         |                       |
| gosub                         | Call a subroutine and continue in the original function when it returns |                       |
| gosub_with_params             |                                                                         |                       |
| jump                          | Jump to a subroutine and continue the rest of the script from there     |                       |
| jump_with_params              |                                                                         |                       |
| define_array                  |                                                                         |                       |
| push_array_int                |                                                                         |                       |
| pop_array_int                 |                                                                         |                       |
| switch                        |                                                                         | switch_int ($int1) {} |

### Server

| Name            | Description                                                               | Example                                                            |
|-----------------|---------------------------------------------------------------------------|--------------------------------------------------------------------|
| map_clock       | # of ticks the world has been up                                          | if (%skill_clock < map_clock) {}                                   |
| map_members     | Returns if the player is inside a members of free to play world           | if (map_members = true) {}                                         |
| map_playercount | Returns the current number of players in the world                        |                                                                    |
| huntall         |                                                                           |                                                                    |
| huntnext        |                                                                           |                                                                    |
| inarea          |                                                                           |                                                                    |
| inzone          |                                                                           |                                                                    |
| lineofwalk      | Returns if the player has line of walk to a coord                         | def_boolean $west = lineofwalk(coord, movecoord(coord, -1, 0, 0)); |
| objectverify    | Returns if the input obj and last verify obj are the same or not          | if (objectverify($item, last_verifyobj) = false) {}                |
| stat_random     | Interpolates a stat success chance. Used for gathering skills             | if (stat_random(stat(cooking), $low, $high) = true) {}             |
| spotanim_map    | Plays a spot anim directly on the world. Imps use this when they teleport | spotanim_map(spotanim_111, coord, 100, 0);                         |
| distance        | Returns the number of tiles distance between two coords                   | def_int $distance = distance($coord1, $coord2);                    |
| movecoord       | Move an input coord with input offsets                                    | def_coord $coord = movecoord(coord, -1, 0, 0);                     |
| seqlength       | Returns the length of a sequence in the number of client ticks            | def_int $client_ticks = seqlength(emote_dance);                    |
| split_init      |                                                                           |                                                                    |
| split_pagecount |                                                                           |                                                                    |
| split_get       |                                                                           |                                                                    |
| split_linecount |                                                                           |                                                                    |
| split_getanim   |                                                                           |                                                                    |
| struct_param    |                                                                           |                                                                    |
| coordx          | Extract the X component from a coord                                      | def_int $x = coordx($coord);                                       |
| coordy          | Extract the level component from a coord                                  | def_int $level = coordy($coord);                                   |
| coordz          | Extract the Z component from a coord                                      | def_int $z = coordz($coord);                                       |

### Player

| Name                | Description                                                                                                                                | Example                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| finduid             |                                                                                                                                            |                                                                             |
| p_finduid           |                                                                                                                                            |                                                                             |
| strongqueue         | Enqueue a script into the queue with type=strong                                                                                           | strongqueue(finish_bury, 1);                                                |
| weakqueue           | Enqueue a script into the weak queue                                                                                                       | weakqueue(start_smelting_ore, calc(%skill_clock - map_clock - 1), $struct); |
| anim                | Play an animation on the active player                                                                                                     | anim(human_cooking, 0);                                                     |
| buffer_full         | Mostly used for when text is being transmitted to an if so that the text can be broken up a bit rather than being transmitted all at once. | if (buffer_full = true) p_delay(0);                                         |
| buildappearance     | Build the player appearance from a specified inv                                                                                           | buildappearance(worn);                                                      |
| cam_lookat          |                                                                                                                                            |                                                                             |
| cam_moveto          |                                                                                                                                            |                                                                             |
| cam_reset           |                                                                                                                                            |                                                                             |
| coord               | Get the active player's coord                                                                                                              | def_coord $coord = coord;                                                   |
| displayname         |                                                                                                                                            |                                                                             |
| facesquare          | Make the player face a specified coord                                                                                                     | facesquare(npc_coord);                                                      |
| healenergy          |                                                                                                                                            |                                                                             |
| if_close            |                                                                                                                                            | if_close;                                                                   |
| if_opensubmodal     |                                                                                                                                            |                                                                             |
| if_opensuboverlay   |                                                                                                                                            |                                                                             |
| last_com            |                                                                                                                                            |                                                                             |
| last_int            | Returns the numerical input entered by a p_countdialog; command                                                                            | def_int $input = last_int;                                                  |
| last_item           |                                                                                                                                            |                                                                             |
| last_slot           |                                                                                                                                            |                                                                             |
| last_useitem        |                                                                                                                                            |                                                                             |
| last_useslot        |                                                                                                                                            |                                                                             |
| last_verifyobj      |                                                                                                                                            |                                                                             |
| mes                 | Say a chat box message                                                                                                                     | mes("Welcome to RuneScape.");                                               |
| name                | Get the active player's name                                                                                                               |                                                                             |
| p_aprange           | Set the range for approachable ops to become triggered                                                                                     | p_aprange(2);                                                               |
| p_arrivedelay       | Make the player wait until they reach the correct distance before interacting                                                              |                                                                             |
| p_countdialog       | Opens the input X chat dialogue to enter a numerical input                                                                                 | p_countdialog;                                                              |
| p_delay             | Set a delay on the active player, starting at `World.currentTick + n`. "0" will produce a 1-tick delay                                     | p_delay(0);                                                                 |
| p_opheld            | Set the current interaction to opheld(x) for the next tick                                                                                 |                                                                             |
| p_oploc             | Set the current interaction to oploc(x) for the next tick                                                                                  |                                                                             |
| p_opnpc             | Set the current interaction to opnpc(x) for the next tick                                                                                  |                                                                             |
| p_pausebutton       |                                                                                                                                            |                                                                             |
| p_stopaction        |                                                                                                                                            |                                                                             |
| p_telejump          | Teleport and jump the player to a specified jagex coord. Does not use walk animations                                                      | p_telejump(1_41_51_41_57);                                                  |
| p_walk              | Walk the player somewhere with full pathfinding support                                                                                    | p_walk(movecoord(coord, 0, 0, 1));                                          |
| say                 | Make the player force say something                                                                                                        |                                                                             |
| sound_synth         | Play a synth to the player                                                                                                                 | sound_synth(found_gem, 0, 0);                                               |
| staffmodlevel       | Checks the staff level of the player                                                                                                       | 0, 1, 2                                                                     |
| stat                | Return the player stat you want                                                                                                            | def_stat $cooking = stat(cooking);                                          |
| stat_base           | Return the base stat level of the player you want                                                                                          | def_int $level = stat_base(magic);                                          |
| stat_heal           |                                                                                                                                            |                                                                             |
| uid                 | Gets the current player UID in the world                                                                                                   |                                                                             |
| p_logout            | Logout the player from the world                                                                                                           |                                                                             |
| if_setcolour        | Change the color of an if child                                                                                                            | if_setcolour($component, 0x07E0);                                           |
| if_openbottom       |                                                                                                                                            | if_openbottom(levelup_magic);                                               |
| if_opensub          |                                                                                                                                            | if_opensub(bank, bank_deposit);                                             |
| if_sethide          |                                                                                                                                            | if_sethide(crafting_jewelry:amulets_layer, false);                          |
| if_setobject        |                                                                                                                                            | if_setobject(crafting_jewelry:rings1, sapphire_ring, 105);                  |
| if_settabactive     |                                                                                                                                            |                                                                             |
| if_setmodel         |                                                                                                                                            |                                                                             |
| if_setmodelcolour   |                                                                                                                                            |                                                                             |
| if_settabflash      |                                                                                                                                            |                                                                             |
| if_closesub         |                                                                                                                                            |                                                                             |
| if_setanim          |                                                                                                                                            | if_setanim(player_line1:com_0, split_getanim($page));                       |
| if_settab           |                                                                                                                                            | if_settab(inventory, 3);                                                    |
| if_opentop          |                                                                                                                                            | if_opentop(xplamp);                                                         |
| if_opensticky       |                                                                                                                                            |                                                                             |
| if_opensidebar      |                                                                                                                                            |                                                                             |
| if_setplayerhead    |                                                                                                                                            | if_setplayerhead(player_line1:com_0);                                       |
| if_settext          |                                                                                                                                            | if_settext(quest_complete:com_3, $questmessage);                            |
| if_setnpchead       |                                                                                                                                            | if_setnpchead(npc_line1:com_0, npc_type);                                   |
| if_setposition      |                                                                                                                                            |                                                                             |
| if_multizone        |                                                                                                                                            |                                                                             |
| givexp              | Give experience in a specified stat to the player                                                                                          | givexp(cooking, 3000);                                                      |
| damage              |                                                                                                                                            |                                                                             |
| if_setresumebuttons |                                                                                                                                            |                                                                             |
| text_gender         |                                                                                                                                            |                                                                             |
| midi_song           | Play a song to the player                                                                                                                  |                                                                             |
| midi_jingle         | Play a single to the player                                                                                                                | midi_jingle(^treasure_hunt_win_jingle, ^treasure_hunt_win_jingle_millis);   |
| last_inv            |                                                                                                                                            |                                                                             |
| hintcoord           |                                                                                                                                            |                                                                             |
| cam_shake           |                                                                                                                                            |                                                                             |
| softtimer           |                                                                                                                                            |                                                                             |
| cleartimer          |                                                                                                                                            |                                                                             |
| stat_add            |                                                                                                                                            |                                                                             |
| stat_sub            |                                                                                                                                            |                                                                             |
| spotanim_pl         |                                                                                                                                            |                                                                             |
| hint_stop           |                                                                                                                                            |                                                                             |
| if_closesticky      |                                                                                                                                            |                                                                             |
| inv_clear           | Completely clear an inv of objs                                                                                                            |                                                                             |
| p_exactmove         | Force walk the player somewhere                                                                                                            | p_exactmove(0_49_51_61_13, 0_49_51_61_12, 30, 64, ^exact_west);             |
| queue               |                                                                                                                                            |                                                                             |
| busy                | Checks if the player has open interfaces and is currently delayed                                                                          | if (busy = true) {}                                                         |
| getqueue            |                                                                                                                                            |                                                                             |
| getweakqueue        |                                                                                                                                            |                                                                             |
| p_locmerge          | Merge the player with a loc. Mostly used for Agility                                                                                       | p_locmerge(30, 64, 0_49_51_61_12, 0_49_51_61_13);                           |
| last_login_info     | Sends the last login information to the player containing the last ip their account was logged in from.                                    | last_login_info;                                                            |
| p_teleport          | Teleport the player to a specified jagex coord. Enables walk animation if the distance is short enough                                     | p_teleport(movecoord(coord, 0, 0, 1));                                      |

### Npc

| Name            | Description                                                      | Example                                       |
|-----------------|------------------------------------------------------------------|-----------------------------------------------|
| npc_finduid     |                                                                  |                                               |
| npc_add         | Add an npc to a specified coord                                  | npc_add($coord, npc_494, 0);                  |
| npc_anim        | Make an npc play a seq                                           | npc_anim(seq_401, 0);                         |
| npc_basestat    |                                                                  |                                               |
| npc_category    | Returns the category of an npc                                   | if (npc_category = banker) {}                 |
| npc_coord       | Returns the coord of an npc                                      | def_coord $coord = npc_coord;                 |
| npc_del         | Delete an npc from the world                                     | if (npc_type = restless_ghost) npc_del;       |
| npc_delay       | Delay an npc                                                     | npc_delay(2);                                 |
| npc_facesquare  | Make an npc face a coord                                         | npc_facesquare(coord);                        |
| npc_findexact   |                                                                  |                                               |
| npc_findhero    | Returns who killed this npc                                      |                                               |
| npc_param       | Returns an npc param                                             | %shop_sell = npc_param(shop_sell_multiplier); |
| npc_queue       |                                                                  |                                               |
| npc_range       | Returns the distance of an npc from a coord                      | if (npc_range(coord) > 1) {}                  |
| npc_say         | Make an npc force say something                                  | npc_say("Quack!");                            |
| npc_sethunt     |                                                                  |                                               |
| npc_sethuntmode |                                                                  |                                               |
| npc_setmode     |                                                                  |                                               |
| npc_stat        |                                                                  |                                               |
| npc_statheal    |                                                                  |                                               |
| npc_type        | Returns the config type for an npc                               | if (npc_type = doric) {}                      |
| npc_damage      |                                                                  |                                               |
| npc_name        | Returns the name of an npc                                       | if (npc_name = "Doric") {}                    |
| npc_uid         |                                                                  |                                               |
| npc_settimer    |                                                                  |                                               |
| spotanim_npc    |                                                                  |                                               |
| npc_findallzone | Finds all npcs within the zone of a jagex coord                  | npc_findallzone(coord);                       |
| npc_findnext    | Iterates through the found npcs within the zone of a jagex coord | while (npc_findnext = true) {}                |
| npc_tele        | Teleport an npc to a specified jagex coord                       | npc_tele(movecoord($coord, 0, 0, 2));         |

### Loc

| Name            | Description                                                      | Example                                            |
|-----------------|------------------------------------------------------------------|----------------------------------------------------|
| loc_add         | Add a loc to a specified coord                                   | loc_add(0_45_153_8_38, loc_1546, 3, loc_shape, 2); |
| loc_angle       | Returns the angle of a loc                                       | def_int $angle = loc_angle;                        |
| loc_anim        | Make a loc play a seq                                            | loc_anim(spinningwheel);                           |
| loc_category    | Returns the category of a loc                                    | if (loc_category = taverly_dungeon_prison_door) {} |
| loc_change      |                                                                  |                                                    |
| loc_coord       | Returns the coord of a loc                                       | def_coord $coord = loc_coord;                      |
| loc_del         | Deletes a loc from the world                                     | loc_del;                                           |
| loc_find        | Returns if a loc at a coord is found or not                      | if (loc_find(coord, loc_type) = true) {}           |
| loc_findallzone | Finds all locs within the zone of a jagex coord                  | loc_findallzone(coord);                            |
| loc_findnext    | Iterates through the found locs within the zone of a jagex coord | while (loc_findnext = true) {}                     |
| loc_param       | Returns a param of a loc                                         | def_int $is_empty = loc_param(mining_rock_empty);  |
| loc_type        | Returns the config type for a loc                                | if (loc_type = loc_818) {}                         |
| loc_name        | Returns the name of a loc                                        | if (loc_name = "Magic Tree") {}                    |
| loc_shape       | Returns the shape of a loc                                       | if (loc_shape = centrepiece_straight) {}           |

### Obj

| Name       | Description                        | Example                         |
|------------|------------------------------------|---------------------------------|
| obj_add    | Add an obj to a specified coord    | obj_add(coord, needle, 1, 200); |
| obj_addall |                                    |                                 |
| obj_param  | Returns a param of an obj          |                                 |
| obj_name   | Returns the name of an obj         | if (obj_name = "Coins") {}      |
| obj_del    | Deletes an obj from the world      | obj_del;                        |
| obj_count  |                                    | def_int $count = obj_count;     |
| obj_type   | Returns the config type for an obj | if (obj_type = coins) {}        |

### Npc config

| Name         | Description                             | Example                                     |
|--------------|-----------------------------------------|---------------------------------------------|
| nc_name      | Returns the name of an npc              | if (nc_name(doric) = "Doric") {}            |
| nc_param     | Returns a param of an npc               |                                             |
| nc_category  | Returns a category of an npc            | if (nc_category(npc_494) = banker) {}       |
| nc_desc      | Returns the description of an npc       | def_string $desc = nc_desc(hans);           |
| nc_debugname | Returns the leaked debug name of an npc | def_string $debugname = nc_debugname(hans); |

### Loc config

| Name         | Description                            | Example                                                     |
|--------------|----------------------------------------|-------------------------------------------------------------|
| lc_name      | Returns the name of a loc              | if (lc_name(magic_tree) = "Magic Tree") {}                  |
| lc_param     | Returns a param of a loc               |                                                             |
| lc_category  | Returns a category of a loc            | if (lc_category(loc_2143) = taverly_dungeon_prison_door) {} |
| lc_desc      | Returns the description of a loc       | def_string $desc = lc_desc(magic_tree);                     |
| lc_debugname | Returns the leaked debug name of a loc | def_string $debugname = lc_debugname(magic_tree);           |

### Obj config

| Name         | Description                                     | Example                                          |
|--------------|-------------------------------------------------|--------------------------------------------------|
| oc_name      | Returns the name of an obj                      | if (oc_name(coins) = "Coins") {}                 |
| oc_param     | Returns a param of an obj                       | def_coord $coord = oc_param($clue, trail_coord); |
| oc_category  | Returns a category of an obj                    | if (oc_category($clue) = trail_clue_easy) {}     |
| oc_desc      | Returns the description of an obj               | def_string $desc = oc_desc(coins);               |
| oc_members   | Returns if an obj is members or not             | if (oc_members($chocolate) = true) {}            |
| oc_weight    | Returns the weight of an obj                    | def_int $weight = oc_weight(coins);              |
| oc_wearpos   | Returns the primary slot of an obj              |                                                  |
| oc_wearpos2  | Returns the secondary override slot of an obj   |                                                  |
| oc_wearpos3  | Returns the secondary override 2 slot of an obj |                                                  |
| oc_debugname | Returns the leaked debug name of an obj         | def_string $debugname = oc_debugname(coins);     |
| oc_cert      | Returns the cert of an obj                      | def_namedobj $cert_logs = oc_cert(logs);         |
| oc_uncert    | Returns the uncert of an obj                    | def_namedobj $logs = oc_uncert(cert_logs);       |
| oc_stackable | Returns if an obj is stackable or not           | def_boolean $stackable = oc_stackable(coins);    |

### Inventory

| Name                | Description                                                     | Example                                                                                          |
|---------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| inv_add             | Add an obj to an inv                                            | inv_add(bank, coins, ^max_32bit_int);                                                            |
| inv_changeslot      |                                                                 |                                                                                                  |
| inv_del             | Delete an obj from an inv                                       | inv_del(inv, coins, 10);                                                                         |
| inv_getobj          | Return an obj from an inv                                       | def_obj $amulet = inv_getobj(worn, 2);                                                           |
| inv_itemspace2      | Returns an overflow for adding an obj to an inv                 | def_int $overflow = inv_itemspace2($inv, $cert_or_uncert, $amount, inv_size($inv));              |
| inv_moveitem        | Moves an obj from one inv to another inv                        | inv_moveitem(bank, $inv, $obj, sub($amount, $overflow));                                         |
| inv_resendslot      | Refreshes an inv from the input slot to the inv capacity        | inv_resendslot(bank, 0);                                                                         |
| inv_setslot         | Sets the slot of an inv with an obj                             | inv_setslot(crafting_rings, 3, null, 0);                                                         |
| inv_size            | Returns the capacity of an inv                                  | inv_size(bank);                                                                                  |
| inv_total           | Returns the total amount of an obj in an inv                    | if (inv_total(inv, coins) < 10) {}                                                               |
| inv_transmit        | Transmits an inv to another inv                                 | inv_transmit(inv, bank_deposit:inv);                                                             |
| inv_stoptransmit    | Stops transmits of an inv to another inv                        | inv_stoptransmit(inv, shop_sell:inv);                                                            |
| inv_swap            | Swap an inv slot to another slot                                | inv_swap(inv, last_slot, last_useslot);                                                          |
| inv_itemspace       | Returns if there is overflow or not for adding an obj to an inv | if (inv_itemspace(inv, $slotobj, inv_total(reward_inv, $slotobj), inv_freespace(inv)) = true) {} |
| inv_freespace       | Returns if there is any free space in an inv                    | if (inv_freespace(inv) = 0) {}                                                                   |
| inv_allstock        | Returns if an inv is an allstock. Used for shop type invs       | if (inv_allstock = false) {}                                                                     |
| inv_exists          | Returns if an obj exists in an inv                              | def_boolean $exists = inv_exists(inv, coins);                                                    |
| inv_getnum          | Returns the number of an obj in an inv                          | def_int $slot_count = inv_getnum(bank, $count);                                                  |
| inv_moveitem_cert   | Moves an obj from one inv to another inv forcing cert           | inv_moveitem_cert(bank, $inv, $obj, sub($amount, $overflow));                                    |
| inv_moveitem_uncert | Moves an obj from one inv to another inv forcing uncert         | inv_moveitem_uncert($inv, bank, $obj, sub($amount, $overflow));                                  |

### Enum

| Name                | Description | Example |
|---------------------|-------------|---------|
| enum                |             |         |
| enum_getoutputcount |             |         |

### String

| Name                  | Description | Example |
|-----------------------|-------------|---------|
| append_num            |             |         |
| append                |             |         |
| append_signnum        |             |         |
| lowercase             |             |         |
| tostring              |             |         |
| compare               |             |         |
| append_char           |             |         |
| string_length         |             |         |
| substring             |             |         |
| string_indexof_char   |             |         |
| string_indexof_string |             |         |
| uppercase             |             |         |

### Number

| Name               | Description | Example |
|--------------------|-------------|---------|
| add                |             |         |
| sub                |             |         |
| multiply           |             |         |
| divide             |             |         |
| random             |             |         |
| randominc          |             |         |
| interpolate        |             |         |
| setbit             |             |         |
| testbit            |             |         |
| modulo             |             |         |
| pow                |             |         |
| invpow             |             |         |
| and                |             |         |
| or                 |             |         |
| max                |             |         |
| min                |             |         |
| scale              |             |         |
| bitcount           |             |         |
| togglebit          |             |         |
| setbit_range       |             |         |
| clearbit_range     |             |         |
| getbit_range       |             |         |
| setbit_range_toint |             |         |
| sin_deg            |             |         |
| cos_deg            |             |         |
| atan2_deg          |             |         |
| abs                |             |         |

### DB

| Name                      | Description | Example |
|---------------------------|-------------|---------|
| db_find_with_count        |             |         |
| db_findnext               |             |         |
| db_getfield               |             |         |
| db_getfieldcount          |             |         |
| db_listall_with_count     |             |         |
| db_getrowtable            |             |         |
| db_findbyindex            |             |         |
| db_find_refine_with_count |             |         |
| db_find                   |             |         |
| db_find_refine            |             |         |
| db_listall                |             |         |

### Debug

| Name           | Description | Example |
|----------------|-------------|---------|
| error          |             |         |
| active_npc     |             |         |
| .active_npc    |             |         |
| active_player  |             |         |
| .active_player |             |         |
| active_loc     |             |         |
| .active_loc    |             |         |
| active_obj     |             |         |
| .active_obj    |             |         |
