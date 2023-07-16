# 2004scape Server

[Website](https://2004scape.org) | [Discord](https://discord.gg/hN3tHUmZEN) | [Rune-Server](https://www.rune-server.ee/runescape-development/rs2-server/projects/701698-lost-city-225-emulation.html)

**disclaimer: All server code has been written from scratch for this project, Jagex has never had any source code leaks.**

**status: in-development, not ready for players**. Contributors are welcome to help out.

---

This project aims to replicate an authentic RuneScape experience from May 2004. It should be considered an emulator first and foremost, as replicating behaviors by emulating the underlying systems is the biggest focus. The config system and scripting system is as close to authentic as we understand it, and is continually refined as we learn more info.

---

*To Jagex*: This project comes out of love for the game. As MMOs age, their previous versions are lost to history. An experience becomes ephemeral and time-limited. We're aware that you have no backups for this era and so we're putting in the effort to recreate what we can.  
It won't ever profit off your trademarks. Without this project, this version of the game only lives in our memories. Screenshots and videos are scarce, and the original data is lost to time. This is no easy task.

*To players*: So happy to have you interested! RuneScape 2 launched on March 29, 2004. We have no copies of that revision, but we do have some client caches from May 2004. This project emulates *May 18, 2004*, which was live until June 1 of that year. It has Treasure Trails and Big Chompy Bird Hunting. The next revision after this added Elemental Workshop I.

## Environment Dependencies

- [NodeJS 18/19](https://nodejs.org/en)
- [Java 17+](https://adoptium.net/)

Java is required for JagCompress.jar (a small 1:1 compression utility) and RuneScriptCompiler.jar (the content language compiler).

You can download JagCompress and RuneScriptCompiler from the [#dev-resources](https://discord.com/channels/953326730632904844/1125601647574396978) Discord channel. Place the jar files in the root directory of the project.  

[JagCompress is also available on GitHub](https://github.com/2004scape/JagCompress/releases). RuneScriptCompiler is not yet open-source, sorry for any inconvenience.

## Getting Started

1. Clone the repo
2. Install [environment dependencies](#environment-dependencies)
3. Run `npm ci` to install code dependencies
4. Copy the file `.env.example` to `.env`
5. Run `npm run client:pack` to create the client cache. This may take a few minutes the first time
6. Run `npm run server:build` to build all of the server files (packs cache, generates symbols, compiles scripts)
7. Run `npm start` to start the server

## Development Workflow

Developers should have two terminals/tabs open:
1. One that runs `npm start`, which will start the server and watch for changes to the js/ts source.
2. One that runs `npm run server:watch`, which will watch for changes to the config or script files and rebuild things as necessary.
3. Whenever you make a change to a config or script file while the server is running you can hotload loaded data by running `::reload` in-game.

### Running tests

We use `jest` for unit tests.

- You can run the tests with `npm test`.

Test files should be colocated with the source files, i.e. `src/foo.ts` should have a test file `src/foo.test.ts`.

Configuration for the tests can be found in `jest.config.ts`.

### Running linter

We use `eslint` for linting this project.

- You can run the linter with `npm run lint`.
- To run the eslint auto-fixer, you can use `npm run lint -- --fix`.

It's recommended to install a suitable plugin/extension for your IDE, to show you lint results inline.

**Please aim to avoid warnings!** They are rules that we eventually want to switch to errors.

Configuration for the linter can be found in `.eslintrc.cjs`.
