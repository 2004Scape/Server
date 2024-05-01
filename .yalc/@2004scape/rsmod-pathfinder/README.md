# rsmod-pathfinder
A breadth-first search path finder.

Ported from Kotlin: https://github.com/rsmod/rsmod/tree/master/game/pathfinder

## Installing (Consuming)
https://www.npmjs.com/package/@2004scape/rsmod-pathfinder

```shell
npm i @2004scape/rsmod-pathfinder
```

## Publishing (Local Development)
https://github.com/wclr/yalc

```shell
npm run asbuild:debug # Builds the wasm bundle.
yalc publish --push # Publishes to the local repo and pushes to all projects it has been added to.
yalc add @2004scape/rsmod-pathfinder # Adds the published library to your project. 
```

## Publishing (Release)
```shell
npm run asbuild:release # Builds the wasm bundle.
# update package.json version
# commit and push to main
npm publish --access public # Publishes the version of this to npm.
```

## First Time Cloning  (Local Development)
```shell
npm run prepare
```

If you are on a Mac:
```shell
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```
