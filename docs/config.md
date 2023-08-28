# Configs

ID <-> name mapping is handled inside `data/pack/<ext>.pack`.

All configs are loaded recursively from the `data/src/scripts` directory. They can be split up or organized in any subfolder, and will be loaded based on their extension. Ordering is preserved by maintaing a .pack file.  
Each config gets exposed to the script engine using the named identifier inside square brackets.

All boolean values use "yes" and "no" instead of true and false.
You do not need to specify a value if it's already the default.

The basic format is:
```
[config name]
configkey,value
```

## Floor

Overlay/underlay colors and textures. Underlays do not support textures.

extension: flo

| Config   | Description                        | Values                                     | Default |
|----------|------------------------------------|--------------------------------------------|---------|
| rgb      | Color to display on a tile         | RGB hex color code                         | 0       |
| texture  | Texture to display on a tile       | Name of texture under src/binary/textures/ |         |
| overlay  | Type to display in editor (unused) | Boolean                                    | no      |
| occlude  |                                    | Boolean                                    | yes     |
| editname | Name to display in editor (unused) | String                                     |         |

```
[example]
rgb=0x00FF00
texture=water
overlay=yes
occlude=no
editname=example
```

## Identity Kit

Player body parts.

extension: idk

| Config    | Description                                                    | Values                                                        | Default       |
|-----------|----------------------------------------------------------------|---------------------------------------------------------------|---------------|
| type      | Bodypart type                                                  | man_, woman_ followed by: hair, jaw, torso, arms, hands, legs | -1            |
| model(n)  | Set a model for index n                                        | Model                                                         | Empty Array   |
| head(n)   | Set a chathead model for index n                               | Model                                                         | Array(10){-1} |
| disable   | Prevent the player from selecting this in the design interface | Boolean                                                       | no            |
| recol(n)s | Source color                                                   | RS2 HSL                                                       | Array(10){0}  |
| recol(n)d | Destination color                                              | RS2 HSL                                                       | Array(10){0}  |

```
[example]
type=man_hair
model1=model_1000
head1=model_1001
disable=yes
recol1s=0
recol1d=1
```

## Location

3D objects in the world.

extension: loc

| Config        | Description                                                                      | Values                                                                               | Default                   |
|---------------|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------|
| model         | Sets the world model, see below*                                                 | Model                                                                                | Empty Array               |
| name          | Sets the display name                                                            | String                                                                               |                           |
| desc          | Sets the examine text                                                            | String                                                                               |                           |
| width         | Sets the length of this config in tiles                                          | 1 to 255                                                                             | 1                         |
| length        | Sets the width of this config in tiles                                           | 1 to 255                                                                             | 1                         |
| blockwalk     | Blocks line of walk checks                                                       | Boolean                                                                              | yes                       |
| blockrange    | Blocks line of sight checks                                                      | Boolean                                                                              | yes                       |
| active        | Overrides if an object can be interacted/examined regardless of its type/options | Boolean                                                                              | Derived from type/options |
| hillskew      | Adjust model to fit terrain                                                      | Boolean                                                                              | no                        |
| sharelight    | Share vertex lighting with nearby connected models                               | Boolean                                                                              | no                        |
| occlude       |                                                                                  | Boolean                                                                              | no                        |
| anim          | Default animation to loop                                                        | Sequence                                                                             | -1                        |
| hasalpha      | Prevent client from caching alpha frames                                         | Boolean                                                                              | no                        |
| walloff       | Offset from wall                                                                 | Powers of 2                                                                          | 16                        |
| ambient       | Lighting parameter                                                               | -128 to 127                                                                          | 0                         |
| contrast      | Lighting parameter                                                               | -128 to 127                                                                          | 0                         |
| op(n)         | Interaction option                                                               | String, or "hidden" to hide from the client so the server can trigger it in a script | Empty Array               |
| recol(n)s     | Source color                                                                     | RS2 HSL                                                                              | Empty Array               |
| recol(n)d     | Destination color                                                                | RS2 HSL                                                                              | Empty Array               |
| mapfunction   | Minimap icon (shops, banks, etc)                                                 | Sprite tile index inside src/sprites/mapfunction.png                                 | -1                        |
| mirror        | Flip object                                                                      | Boolean                                                                              | no                        |
| shadow        | Calculate shadowmap                                                              | Boolean                                                                              | yes                       |
| resizex       | Resize model on X axis                                                           | 0-65535                                                                              | 128                       |
| resizey       | Resize model on Y axis                                                           | 0-65535                                                                              | 128                       |
| resizez       | Resize model on Z axis                                                           | 0-65535                                                                              | 128                       |
| mapscene      | Minimap icon (trees, rocks, etc)                                                 | Sprite tile index inside src/sprites/mapscene.png                                    | -1                        |
| forceapproach | Pathfinder hint                                                                  | north, east, south, west                                                             | 0                         |
| xoff          | x offset from tile origin                                                        | -32768 to 32767                                                                      | 0                         |
| yoff          | y offset from tile origin                                                        | -32768 to 32767                                                                      | 0                         |
| zoff          | z offset from tile origin                                                        | -32768 to 32767                                                                      | 0                         |
| forcedecor    |                                                                                  | Boolean                                                                              | no                        |
| category      |                                                                                  | String                                                                               | -1                        |
| param         | Parameter for scripts, must link to defined param                                | key,value                                                                            | Empty Map                 |

```
[example]
model=model_1000
name=Example
desc=This is an example.
width=2
length=2
blockwalk=no
blockrange=no
active=yes
hillskew=yes
sharelight=yes
occlude=yes
anim=seq_1
hasalpha=yes
walloff=8
ambient=50
contrast=50
op1=Open
recol1s=0
recol1d=1
mapfunction=10
mirror=yes
shadow=yes
resizex=140
resizey=140
resizez=140
mapscene=10
forceapproach=north
xoff=140
yoff=140
zoff=140
forcedecor=yes
category=category_1
param=test,1234
```

\* locs have multiple "shapes" to identify itself as a wall, decor, roof, etc. and that shape comes from the model filename. If multiple files are found for model_loc_0 then all of them are added to the loc.

### Model Suffixes

A loc model without a suffix will be treated as centrepiece_straight.

| Suffix | Shape                          | Layer        | Value |
|--------|--------------------------------|--------------|-------|
| 1      | wall_straight                  | wall         | 0     |
| 2      | wall_diagonalcorner            | wall         | 1     |
| 3      | wall_l                         | wall         | 2     |
| 4      | wall_squarecorner              | wall         | 3     |
| 5      | wall_diagonal                  | ground       | 9     |
| q      | walldecor_straight_nooffset    | wall_decor   | 4     |
| w      | walldecor_straight_offset      | wall_decor   | 5     |
| e      | walldecor_diagonal_offset      | wall_decor   | 6     |
| r      | walldecor_diagonal_nooffset    | wall_decor   | 7     |
| t      | walldecor_diagonal_both        | wall_decor   | 8     |
| 8      | centrepiece_straight (default) | ground       | 10    |
| 9      | centrepiece_diagonal           | ground       | 11    |
| 0      | grounddecor                    | ground_decor | 22    |
| a      | roof_straight                  | ground       | 12    |
| s      | roof_diagonal_with_roofedge    | ground       | 13    |
| d      | roof_diagonal                  | ground       | 14    |
| f      | roof_l_concave                 | ground       | 15    |
| g      | rool_l_convex                  | ground       | 16    |
| h      | roof_flat                      | ground       | 17    |
| z      | roofedge_straight              | ground       | 18    |
| x      | roofedge_diagonalcorner        | ground       | 19    |
| c      | roofedge_l                     | ground       | 20    |
| v      | roofedge_squarecorner          | ground       | 21    |

## NPC

Non-playable characters in the world.

extension: npc

| Config       | Description                                                          | Values                                                                               | Default            |
|--------------|----------------------------------------------------------------------|--------------------------------------------------------------------------------------|--------------------|
| model(n)     | Set a model for index n                                              | Model                                                                                | Empty Array        |
| head(n)      | Set a chathead model for index n                                     | Model                                                                                | Empty Array        |
| name         | Sets the display name                                                | String                                                                               |                    |
| desc         | Sets the examine text                                                | String                                                                               |                    |
| size         | NPC size in tiles: n*n                                               | 1-255                                                                                | 1                  |
| readyanim    | Idle animation                                                       | Sequence                                                                             | -1                 |
| walkanim     | Walking animation                                                    | Sequence                                                                             | -1                 |
| walkanims    | Walking anim, turn around animation, left turn anim, right turn anim | Sequences                                                                            | -1                 |
| hasalpha     | Prevent client from caching alpha frames                             | Boolean                                                                              | no                 |
| op(n)        | Interaction option                                                   | String, or "hidden" to hide from the client so the server can trigger it in a script | Empty Array        |
| recol(n)s    | Source color                                                         | RS2 HSL                                                                              | Empty Array        |
| recol(n)d    | Destination color                                                    | RS2 HSL                                                                              | Empty Array        |
| code90       | unused, likely planned to be resizex                                 | 0 to 65535                                                                           | -1                 |
| code91       | unused, likely planned to be resizey                                 | 0 to 65535                                                                           | -1                 |
| code92       | unused, likely planned to be resizez                                 | 0 to 65535                                                                           | -1                 |
| visonmap     | Override mapdot visibility on minimap                                | Boolean                                                                              | yes                |
| vislevel     | Visible combat level                                                 | 1 to 65535, "hide" / 0                                                               | -1                 |
| resizeh      | Resize horizontally (x)                                              | 0 to 65535                                                                           | 128                |
| resizev      | Resize vertically (y)                                                | 0 to 65535                                                                           | 128                |
| wanderrange  | The random walk wandering range from their spawn coord               | 0 to 255                                                                             | 5                  |
| maxrange     | The wax range allowed to walk before retreating                      | 0 to 255                                                                             | 5                  |
| huntrange    |                                                                      | 0 to 255                                                                             | 5                  |
| timer        |                                                                      | 0 to 65535                                                                           | -1                 |
| respawnrate  | The respawn timer in server ticks                                    | 0 to 65535                                                                           | 100                |
| stats        |                                                                      | Array                                                                                | [1, 1, 1, 1, 1, 1] |
| moverestrict | The movement restriction                                             | normal, blocked, blocked_normal, indoors, outdoors, nomove, passthru                 | normal             |
| category     |                                                                      | String                                                                               | -1                 |
| param        | Parameter for scripts, must link to defined param                    | key,value                                                                            | Empty Map          |

```
[example]
model1=model_1000
model2=model_1001
head1=model_1002
name=Example
desc=This is an example.
size=2
readyanim=seq_1
walkanim=seq_2
walkanim_b=seq_3
walkanim_r=seq_4
walkanim_l=seq_5
hasalpha=yes
op1=Talk-to
recol1s=0
recol1d=1
visonmap=hide
resizeh=140
resizev=140
category=category_1
param=test,1234
```

## Objects

Items.

extension: obj

| Config       | Description                                                                | Values                                                                                        | Default     |
|--------------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|-------------|
| model        | Set visible model                                                          | Model                                                                                         | 0           |
| name         | Sets the display name                                                      | String                                                                                        | "null"      |
| desc         | Sets the examine text                                                      | String                                                                                        |             |
| 2dxof        | 2d x offset for icon                                                       | -32767 to 32768                                                                               | 0           | 
| 2dyof        | 2d y offset for icon                                                       | -32767 to 32768                                                                               | 0           |
| 2dzoom       | 2d zoom for icon                                                           | 0 to 65535                                                                                    | 2000        |
| 2dxan        | 2d x angle for icon                                                        | 0 to 65535                                                                                    | 0           |
| 2dyan        | 2d y angle for icon                                                        | 0 to 65535                                                                                    | 0           |
| 2dzan        | 2d z angle for icon                                                        | 0 to 65535                                                                                    | 0           |
| code9        |                                                                            | Boolean                                                                                       | no          |
| code10       |                                                                            | Sequence                                                                                      | -1          |
| stackable    | If this item should stack                                                  | Boolean                                                                                       | no          |
| cost         | Item value in shops                                                        | 0 to 2,147,483,647                                                                            | 1           |
| member       | Indicates if this is a members-only item                                   | Boolean                                                                                       | no          |
| manwear      | Male model slot when equipped, along with offset                           | Model, Offset                                                                                 | -1          |
| manwear2     | Secondary model slot when equipped                                         | Model                                                                                         | -1          |
| manwear3     | Tertiary model slot when equipped                                          | Model                                                                                         | -1          |
| manhead      | Male chathead slot when equipped                                           | Model                                                                                         | -1          |
| manhead2     | Secondary chathead slot when equipped                                      | Model                                                                                         | -1          |
| womanwear    | Female model slot when equipped, along with offset                         | Model, Offset                                                                                 | -1          |
| womanwear2   | Secondary model slot when equipped                                         | Model                                                                                         | -1          |
| womanwear3   | Tertiary model slot when equipped                                          | Model                                                                                         | -1          |
| womanhead    | Female chathead slot when equipped                                         | Model                                                                                         | -1          |
| womanhead2   | Secondary chathead slot when equipped                                      | Model                                                                                         | -1          |
| op(n)        | Ground interaction option                                                  | String                                                                                        | Empty Array |
| iop(n)       | Interface interaction option                                               | String                                                                                        | Empty Array |
| recol(n)s    | Source color                                                               | RS2 HSL                                                                                       | Empty Array |
| recol(n)d    | Destination color                                                          | RS2 HSL                                                                                       | Empty Array |
| certlink     | Linked object to inherit and draw                                          | Object                                                                                        | -1          |
| certtemplate | Template object to draw behind model (noted paper)                         | Object                                                                                        | -1          |
| count(n)     | Templates to replace this item's properties with if above a certain amount | Object, followed by Amount (0 to 65535)                                                       | Empty Array |
| weight       | Weight of item in a given unit, converts to grams internally               | Grams (g), Kilograms (kg), Ounces (oz), and Pounds (lb)                                       | 0           |
| wearpos      | Slot to equip into                                                         | hat, back, front, righthand, body, lefthand, arms, legs, head, hands, feet, jaw, ring, quiver | -1          |
| wearpos2     | Equip slot to override                                                     | hat, back, front, righthand, body, lefthand, arms, legs, head, hands, feet, jaw, ring, quiver | -1          |
| wearpos3     | Equip slot to override                                                     | hat, back, front, righthand, body, lefthand, arms, legs, head, hands, feet, jaw, ring, quiver | -1          |
| dummyitem    |                                                                            | inv_only, graphic_only                                                                        | 0           |
| tradeable    |                                                                            | Boolean                                                                                       | no          |
| respawnrate  | The respawn timer in server ticks                                          | 0 to 65535                                                                                    | 100         |
| category     |                                                                            | String                                                                                        | -1          |
| param        | Parameter for scripts, must link to defined param                          | key,value                                                                                     | Empty Map   |

```
[example]
model=model_1000
name=Example
desc=This is an example.
2dxof=-4
2dyof=12
2dzoom=1780
2dyan=436
2dxan=320
stackable=yes
cost=1000
member=yes
manwear=model_1001,0
manwear2=model_1002
manwear3=model_1003
manhead=model_1004
manhead2=model_1005
womanwear=model_1006,6
womanwear2=model_1007
womanwear3=model_1008
womanhead=model_1009
womanhead2=model_1010
op4=Light
iop2=Wear
recol1s=0
recol1d=1
certlink=obj_1
certtemplate=obj_2
count1=obj_3,2
count2=obj_4,3
weight=10kg
wearpos=righthand
wearpos2=lefthand
wearpos3=arms
category=category_1
param=test,1234
```

## Sequence

Sequences of animation frames to play.

extension: seq

| Config      | Description                              | Values           | Default     |
|-------------|------------------------------------------|------------------|-------------|
| frame(n)    | Frames to play                           |                  | Empty Array |
| iframe(n)   | Frames to play on interfaces (chatheads) |                  | Empty Array |
| delay(n)    |                                          |                  | Empty Array |
| replayoff   |                                          |                  | -1          |
| walkmerge   |                                          |                  | Empty Array |
| stretches   |                                          | Boolean          | no          |
| priority    |                                          |                  | 5           |
| mainhand    | Override mainhand (righthand) appearance | Object or "hide" | -1          |
| offhand     | Override offhand (lefthand) appearance   | Object or "hide" | -1          |
| replaycount |                                          |                  | 99          |
| duration    |                                          |                  | 0           |

```
[example]
frame1=anim_1234
iframe1=anim_1235
delay1=400
replayoff=yes
walkmerge=label_1,label_2
stretches=yes
priority=6
mainhand=obj_1
offhand=obj_2
replaycount=4
```

## Spotanim

Graphical animated effects intended to play in a spot in the world.

extension: spotanim

| Config      | Description                              | Values      | Default |
|-------------|------------------------------------------|-------------|---------|
| model       | Sets the world model                     | Model       |         |
| anim        | Default animation to loop                | Sequence    |         |
| hasalpha    | Prevent client from caching alpha frames | Boolean     | no      |
| resizeh     | Resize horizontally (x)                  | 0 to 65535  | 128     |
| resizev     | Resize vertically (y)                    | 0 to 65535  | 128     |
| orientation | Degrees to rotate                        | 0 to 360    | 0       |
| ambient     | Lighting parameter                       | -128 to 127 | 0       |
| contrast    | Lighting parameter                       | -128 to 127 | 0       |
| recol(n)s   | Source color                             | RS2 HSL     |         |
| recol(n)d   | Destination color                        | RS2 HSL     |         |

```
[example]
model=model_1
anim=seq_1
hasalpha=yes
resizeh=100
resizev=100
orientation=270
ambient=50
contrast=50
recol1s=0
recol1d=1
```

## Player Variable

Variables stored on the player, used for client interfaces, quest progression, or inside scripts.

extension: varp

| Config     | Description                          | Values | Default |
|------------|--------------------------------------|--------|---------|
| scope      |                                      |        |         |
| type       |                                      |        |         |
| code3      |                                      |        |         |
| protect    |                                      |        |         |
| clientcode | Link to hardcoded variable in client | 1 to 8 | 0       |
| transmit   |                                      |        |         |
| code7      |                                      |        |         |
| code8      |                                      |        |         |
| code10     |                                      |        |         |

```
[example]
clientcode=7
transmit=yes
```

# Server-Only Configs

## Param

extension: param

| Config  | Description   | Values                                 | Default |
|---------|---------------|----------------------------------------|---------|
| type    | Data type     | int, string, any config type, namedobj |         |
| default | Default value |                                        |         |

```
[example]
type=int
default=1
```

## Enum

extension: enum

| Config     | Description      | Values                                 | Default |
|------------|------------------|----------------------------------------|---------|
| inputtype  | Input data type  | int, string, any config type, namedobj | int     |
| outputtype | Output data type | int, string, any config type, namedobj | int     |
| default    | Default value    |                                        | null    |
| val        | Value            |                                        |         |

```
[auto_example]
inputtype=autoint
outputtype=namedobj
default=obj_0
val=obj_1
val=obj_3
val=obj_5

[example]
inputtype=int
outputtype=namedobj
default=null
val=0,obj_0
val=1,obj_1
val=2,obj_2
val=3,obj_3
```

## Struct

Structs are param maps exactly how obj/npc/loc have, but not tied to anything specifically.

extension: struct

| Config | Description                                       | Values    | Default   |
|--------|---------------------------------------------------|-----------|-----------|
| param  | Parameter for scripts, must link to defined param | key,value | Empty Map |

```
[example]
param=example1,1
param=example2,obj_0
```
