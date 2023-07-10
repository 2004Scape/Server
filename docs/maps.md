Some maps were extracted from revision 254 (lack of data), and v2+ were "fixed up" to work here:

- v1: l30_75, l31_75, l32_70, l32_71, l32_72, l32_73, l33_70, l33_71, l33_72, l33_73, l34_70, l34_71, l34_72, l34_73, l35_20, l35_76, l36_149, l36_150, l36_152, l36_153, l36_154, l36_52, l36_53, l36_54, l36_72, l36_73, l36_74, l36_75, l36_76, l37_149, l37_150, l37_151, l37_152, l37_153, l37_154, l37_72, l37_73, l37_74, l37_75, l38_149, l38_150, l38_151, l38_152, l38_153, l38_154, l38_155, l38_45, l38_46, l38_72, l38_73, l39_147, l39_148, l39_149, l39_150, l39_151, l39_152, l39_153, l39_154, l39_155, l39_72, l39_73, l40_148, l40_149, l40_72, l40_73, l41_149, l41_56, l41_72, l41_73, l42_144, l42_44, l42_45, l42_46, l42_47, l42_48, l42_56, l42_72, l42_73, l43_144, l43_145, l43_146, l43_44, l43_45, l43_72, l43_73, l44_144, l44_145, l44_146, l44_44, l44_72, l44_73, l45_145, l45_146, l45_44, l45_62, l45_73, l46_161, l46_44, l46_45, l46_46, l46_62, l47_160, l47_161, l47_44, l47_45, l47_46, l47_62, l47_75, l48_156, l48_45, l48_46, l48_62, l49_156, l49_46, l49_62, l50_62, l51_62, l52_152, l52_62, m31_75, m32_70, m32_71, m32_72, m32_73, m33_70, m33_71, m33_72, m34_70, m34_71, m34_72, m34_73, m35_20, m35_76, m36_149, m36_150, m36_152, m36_153, m36_154, m36_52, m36_53, m36_54, m36_72, m36_73, m36_74, m36_75, m36_76, m37_149, m37_150, m37_151, m37_152, m37_153, m37_154, m37_72, m37_73, m37_74, m37_75, m38_149, m38_150, m38_152, m38_153, m38_154, m38_155, m38_45, m38_46, m38_72, m38_73, m39_147, m39_148, m39_149, m39_150, m39_151, m39_152, m39_153, m39_154, m39_155, m39_72, m40_148, m40_149, m40_72, m40_73, m41_149, m41_56, m41_72, m41_73, m42_144, m42_44, m42_45, m42_46, m42_47, m42_48, m42_56, m42_72, m42_73, m43_144, m43_145, m43_146, m43_44, m43_45, m43_72, m44_144, m44_145, m44_146, m44_44, m44_72, m44_73, m45_145, m45_146, m45_44, m45_62, m45_73, m46_161, m46_44, m46_45, m46_46, m46_62, m47_160, m47_161, m47_44, m47_45, m47_46, m47_62, m47_75, m48_156, m48_45, m48_46, m48_62, m49_156, m49_46, m49_62, m50_62, m51_147, m51_62, m52_152, m52_62
- v2: l29_75, l35_75, l46_47, l51_147, m29_75, m30_75, m35_75, m38_151, m39_73, m43_73, m46_47, m53_52, m53_53
- v3: l43_56, l53_52, l53_53, m33_73
- v6: m43_56

v1 maps were the first version identified in the client for June 1 2004, and we're targeting May 18 2004, so it should be pretty much identical.

## Map Format

extension: jm2

There are 4 sections: `MAP`, `LOC`, `NPC`, and `OBJ`. Each are split by `==== NAME ====` and may be omitted if not used.  
The MAP section contains information about tiles: heightmaps, overlays, flags, and underlays.  
The LOC section contains a list of locs: loc ID, "shape" (type), and rotation  
The NPC section contains a list of npcs: npc ID  
The OBJ section contains a list of objs: obj ID and amount

This format is not meant to be written by hand, but can be until tooling is created.

### MAP section

`level x z: (h)X (o)X;X;X (f)X (u)X`

h = heightmap
o = overlay;shape;rotation
f = flags
u = underlay

### LOC section

`level x z: id shape (rotation)`

### NPC section

`level x z: id`

### OBJ section

`level x z: id count`
