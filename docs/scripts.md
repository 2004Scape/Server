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

## Types

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

## Math

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

## String Interop

`<...>` is used to escape a variable name in a string. It only accepts strings, so other types must be converted to strings to use it.

```js
def_string $var1 = "1":
def_int $var2 = 2;
def_string $str = "<var1> <tostring(var2)>";
```

## Table of Commands

| Name | Description | Example |
| - | - | - |
