# Developer Reference

## Script Triggers

### Operable

Operable means you're within 1 tile of an object in a cardinal direction (not diagonal).

| Name | Description | Example |
| - | - | - |
| oploc1-5 | Used op1-5 on a loc | "Open" "Close" "Mine" "Cut" |
| oplocu | Used an object on a loc | |
| oploct | Casting a spell on a loc | |
| opnpc1-5 | Used op1-5 on a npc | "Attack" "Talk-to" "Pickpocket" |
| opnpcu | Used an obj on a npc | |
| opnpct | Casting a spell on a npc | |
| opobj1-5 | GROUND: Used op1-5 on a object in the world | "Light" |
| opobju | GROUND: Used an object on another object in the world | Tinderbox -> Logs on ground |
| opobjt | GROUND: Casting a spell on an object in the world | Telegrab |
| opplayer1-5 | Used op1-5 on a player | "Follow" "Trade" "Attack" |
| opplayeru | Used an object on a player | |
| opplayert | Casting a spell on a player | |

All of these, minus opheld, have ai_* versions from an NPC's perspective.

### Approachable

Approachable means you're interacting within 10 tiles of an object in any direction.

| Name | Description | Example |
| - | - | - |
| aploc1-5 | Used op1-5 on a loc | "Open" "Close" "Mine" "Cut" |
| aplocu | Used an object on a loc | |
| aploct | Casting a spell on a loc | |
| apnpc1-5 | Used op1-5 on a npc | "Attack" "Talk-to" "Pickpocket" |
| apnpcu | Used an obj on a npc | |
| apnpct | Casting a spell on a npc | |
| apobj1-5 | GROUND: Used op1-5 on a object in the world | "Light" |
| apobju | GROUND: Used an object on another object in the world | Tinderbox -> Logs on ground |
| apobjt | GROUND: Casting a spell on an object in the world | Telegrab |
| applayer1-5 | Used op1-5 on a player | "Follow" "Trade" "Attack" |
| applayeru | Used an object on a player | |
| applayert | Casting a spell on a player | |

All of these have ai_* versions from an NPC's perspective.

### Queues

| Name | Description | Example |
| - | - | - |
| weakqueue | | |
| queue | | |
| ai_queue1-20 | Generically programmable trigger | Damage dealt, retaliation, bind effects, death |

### Timers

| Name | Description | Example |
| - | - | - |
| softtimer | | |
| timer | | |
| ai_timer | | |

### Interfaces

| Name | Description | Example |
| - | - | - |
| if_button | Button component clicked | Playing a music track |
| if_button1-5 | option1-5 clicked on an inventory interface (not backpack) | "Withdraw 5" "Sell 5" "Value" |
| opheld1-5 | BACKPACK: Used iop1-5 on an object in your inventory | "Eat" "Drop" "Equip" "Identify" |
| opheldu | BACKPACK: Used an object on another object in your inventory | Guam -> Vial of Water |
| opheldt | BACKPACK: Casting a spell on an object in your inventory | High Alchemy |
| if_buttond | Inventory object dragged to another slot | |
| if_close | Interface closed event | |

### Events

| Name | Description | Example |
| - | - | - |
| login | | |
| logout | | |
| mapenter | Every time you enter another mapsquare | |
| if_flashing_tab | | Tutorial Island |

## Syntax

### Types

| Name | Description | Example |
| - | - | - |
| int | | |
| boolean | | |
| string | | |
| loc | | |
| npc | | |
| obj | | |
| coord | | |
| namedobj | | |
| player_uid | | |
| npc_uid | | |
| stat | | |
| component | | |
| interface | | |
| inv | | |
| enum | | |
| struct | | |
| param | | |
| dbtable | | |
| dbrow | | |
| dbcolumn | | |
| varp | | |
| mesanim | | |

### Syntax

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

### Strong Queues

### Weak Queues

### Timers

### Soft Timers

### Protected

- TODO: Explain commands prefixed with p_, and why this exists

### Active

- TODO: Explain commands prefixed with obj_, npc_, loc_, and the `.` verion of commands

## Table of Commands

### Core language ops

| Name | Description | Example |
| - | - | - |
| gosub | | |
| jump | | |

### Server ops

| Name | Description | Example |
| - | - | - |
| map_clock | | |
| map_members | | |
| map_playercount | | |
| huntall | | |
| huntnext | | |
| inarea | | |
| inzone | | |
| lineofwalk | | |
| objectverify | | |
| stat_random | | |
| spotanim_map | | |
| distance | | |
| movecoord | | |
| seqlength | | |
| split_init | | |
| split_pagecount | | |
| split_get | | |
| split_linecount | | |
| split_getanim | | |
| struct_param | | |
| coordx | | |
| coordy | | |
| coordz | | |

### Player ops

| Name | Description | Example |
| - | - | - |
| finduid | | |
| p_finduid | | |
| strongqueue | | |
| weakqueue | | |
| anim | | |
| buffer_full | | |
| buildappearance | | |
| cam_lookat | | |
| cam_moveto | | |
| cam_reset | | |
| coord | | |
| displayname | | |
| facesquare | | |
| healenergy | | |
| if_close | | |
| if_opensubmodal | | |
| if_opensuboverlay | | |
| last_com | | |
| last_int | | |
| last_item | | |
| last_slot | | |
| last_useitem | | |
| last_useslot | | |
| last_verifyobj | | |
| mes | | |
| name | | |
| p_aprange | | |
| p_arrivedelay | | |
| p_countdialog | | |
| p_delay | | |
| p_opheld | | |
| p_oploc | | |
| p_opnpc | | |
| p_pausebutton | | |
| p_stopaction | | |
| p_telejump | | |
| p_walk | | |
| say | | |
| sound_synth | | |
| staffmodlevel | | |
| stat | | |
| stat_base | | |
| stat_heal | | |
| uid | | |
| p_logout | | |
| if_setcolour | | |
| if_openbottom | | |
| if_opensub | | |
| if_sethide | | |
| if_setobject | | |
| if_settabactive | | |
| if_setmodel | | |
| if_setmodelcolour | | |
| if_settabflash | | |
| if_closesub | | |
| if_setanim | | |
| if_settab | | |
| if_opentop | | |
| if_opensticky | | |
| if_opensidebar | | |
| if_setplayerhead | | |
| if_settext | | |
| if_setnpchead | | |
| if_setposition | | |
| if_multizone | | |
| givexp | | |
| damage | | |
| if_setresumebuttons | | |
| text_gender | | |
| midi_song | | |
| midi_jingle | | |
| last_inv | | |
| rebuildappearance | | |

### Npc ops

| Name | Description | Example |
| - | - | - |
| npc_finduid | | |
| npc_add | | |
| npc_anim | | |
| npc_basestat | | |
| npc_category | | |
| npc_coord | | |
| npc_del | | |
| npc_delay | | |
| npc_facesquare | | |
| npc_findexact | | |
| npc_findhero | | |
| npc_param | | |
| npc_queue | | |
| npc_range | | |
| npc_say | | |
| npc_sethunt | | |
| npc_sethuntmode | | |
| npc_setmode | | |
| npc_stat | | |
| npc_statheal | | |
| npc_type | | |
| npc_damage | | |
| npc_name | | |
| npc_uid | | |

### Loc ops

| Name | Description | Example |
| - | - | - |
| loc_add | | |
| loc_angle | | |
| loc_anim | | |
| loc_category | | |
| loc_change | | |
| loc_coord | | |
| loc_del | | |
| loc_find | | |
| loc_findallzone | | |
| loc_findnext | | |
| loc_param | | |
| loc_type | | |
| loc_name | | |

### Obj ops

| Name | Description | Example |
| - | - | - |
| obj_add | | |
| obj_addall | | |
| obj_param | | |
| obj_name | | |

### Npc config ops

| Name | Description | Example |
| - | - | - |
| nc_name | | |
| nc_param | | |
| nc_category | | |
| nc_desc | | |
| nc_debugname | | |

### Loc config ops

| Name | Description | Example |
| - | - | - |
| lc_name | | |
| lc_param | | |
| lc_category | | |
| lc_desc | | |
| lc_debugname | | |

### Obj config ops

| Name | Description | Example |
| - | - | - |
| oc_name | | |
| oc_param | | |
| oc_category | | |
| oc_desc | | |
| oc_members | | |
| oc_weight | | |
| oc_wearpos | | |
| oc_wearpos2 | | |
| oc_wearpos3 | | |
| oc_debugname | | |

### Inventory ops

| Name | Description | Example |
| - | - | - |
| inv_add | | |
| inv_changeslot | | |
| inv_del | | |
| inv_getobj | | |
| inv_itemspace2 | | |
| inv_moveitem | | |
| inv_resendslot | | |
| inv_setslot | | |
| inv_size | | |
| inv_total | | |
| inv_transmit | | |
| inv_stoptransmit | | |
| inv_swap | | |
| inv_itemspace | | |
| inv_freespace | | |

### Enum ops

| Name | Description | Example |
| - | - | - |
| enum | | |
| enum_getoutputcount | | |

### String ops

| Name | Description | Example |
| - | - | - |
| append_num | | |
| append | | |
| append_signnum | | |
| lowercase | | |
| tostring | | |
| compare | | |
| append_char | | |
| string_length | | |
| substring | | |
| string_indexof_char | | |
| string_indexof_string | | |
| uppercase | | |

### Number ops

| Name | Description | Example |
| - | - | - |
| add | | |
| sub | | |
| multiply | | |
| divide | | |
| random | | |
| randominc | | |
| interpolate | | |
| setbit | | |
| testbit | | |
| modulo | | |
| pow | | |
| invpow | | |
| and | | |
| or | | |
| max | | |
| min | | |
| scale | | |
| bitcount | | |
| togglebit | | |
| setbit_range | | |
| clearbit_range | | |
| getbit_range | | |
| setbit_range_toint | | |
| abs | | |

### DB ops

| Name | Description | Example |
| - | - | - |
| db_find_with_count | | |
| db_findnext | | |
| db_getfield | | |
| db_getfieldcount | | |
| db_listall_with_count | | |
| db_getrowtable | | |
| db_findbyindex | | |
| db_find_refine_with_count | | |
| db_find | | |
| db_find_refine | | |
| db_listall | | |

### Debug ops

| Name | Description | Example |
| - | - | - |
| error | | |
| active_npc | | |
| .active_npc | | |
| active_player | | |
| .active_player | | |
| active_loc | | |
| .active_loc | | |
| active_obj | | |
| .active_obj | | |
