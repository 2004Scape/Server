<div align="center">

<h1>2004Scape Server - May 18, 2004</h1>

[Website](https://2004scape.org) | [Discord](https://discord.2004scape.org) | [Rune-Server](https://www.rune-server.ee/runescape-development/rs2-server/projects/701698-lost-city-225-emulation.html) | [Getting Started](#getting-started)

**status: alpha, in-development**  
Contributors are welcome to help out!

**All server code has been written from scratch for this project.**  
**Jagex has never had any source code leaks.**
</div>

## Mission Statement

> [!IMPORTANT]
> Our goal is to authentically, accurately, and precisely emulate old RuneScape to our best knowledge. There are countless hours behind adding and quadruple-checking every bit of logic that goes into this.

Caches and clients are sourced from old PCs that played the game at a given time. That gives us the original maps, models, and NPC / Item / Scenery configurations. Then we can unpack that data into a readable and workable format based on what we've been able to observe Jagex doing, as outsiders.

The server side (engine, quests, combat, skills) was not preserved and that's what we're recreating here. The engine takes a lot of effort and is not perfected, but you should consider it our best interpretation of behaviors we can measure.

We try to take very little liberties when it comes to guessing, our sources are era-videos, era-screenshots, and RS3/OSRS/RSC.

Our content language of choice is a recreation of RuneScript: this gives us the same limitations, and the opportunity to recreate bugs out of the same circumstances. We don't simply see a bug and add it as an edge case, we have the script and engine work together to reproduce the exact reasons behind the bug.

## Getting Started

1. Download this repo to your computer
2. Install our list of [dependencies](#environment-dependencies)
3. Open the folder you downloaded in a command prompt
4. Run `npm start`

Now open [http://localhost](http://localhost) in your browser and play!

> [!IMPORTANT]
> If you run into issues please see our [common issues](#common-issues) or hop in Discord.

> [!TIP]
> Windows users: We have a script called `quickstart.bat` that will launch the server for you, combining steps 3 and 4 above.

> [!TIP]
> Advanced users: You can customize your setup by copying the `.env.example` file to `.env`. This is not necessary for a simple localhost setup.

### Using the DevContainer

An alternative way to set up your environment is to utilize a [Development Container](https://containers.dev/). In order to start the Dev Container, you'll need to install [Docker](https://www.docker.com/products/docker-desktop/). If you're running Windows, I suggest getting Docker Desktop. Linux users can use whatever means they prefer to install Docker. Once docker is installed, install the VSCode extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

Follow these steps:

1. Make sure Docker is running
2. Open VSCode and run `Dev Containers: Clone Repository in Container Volume`
3. Select `GitHub` as the remote Source
4. Find your fork of this repo
5. Select the branch you want to work from
6. Once the startup script is finished, run `npm start`

Once the container starts, it automatically starts running `setup.sh`. You can cancel this and do the [Getting Started](#getting-started) steps manually as well.

## Environment Dependencies

- [NodeJS 20.6+](https://nodejs.org/) (22 is fine as well)
- [Java 17+](https://adoptium.net/)

> [!TIP]
> If you're using VS Code (recommended), [we have an extension to install on the marketplace.](https://marketplace.visualstudio.com/items?itemName=2004scape.runescriptlanguage)

## Development Workflow

Content developers (likely you!) can run `npm start` to start the server. This will watch for changes to the config and script files as well as automatically rebuild them.

Engine developers can run `npm run dev` to start the server. This does what `npm start` does above, but also restarts the world when any TypeScript code has changed.

### Running tests

We use `vitest` for unit tests.

- You can run the tests with `npm test`.

Test files should be colocated with the source files, i.e. `src/foo.ts` should have a test file `src/foo.test.ts`.

### Running linter

We use `eslint` for linting this project.

- You can run the linter with `npm run lint`.
- To run the eslint auto-fixer, you can use `npm run lint -- --fix`.

It's recommended to install a suitable plugin/extension for your IDE, to show you lint results inline.

**Please aim to avoid warnings!** They are rules that we eventually want to switch to errors.

Configuration for the linter can be found in `.eslintrc.cjs`.

## Common Issues

* `bad option: --import`  
You are using an older version of Node (maybe 18). We are targeting 20.6+

* `'"java"' is not recognized as an internal or external command`  
You do not have Java 17 installed.

* `has been compiled by a more recent version of the Java Runtime (class file version 61.0), this version of the Java Runtime only recognizes class file versions up to 52.0`  
You are likely using Java 8 or Java 11. You can either reinstall Java 17 or become an advanced user, and set `JAVA_PATH=path-to-java.exe` in your .env file.

## Credits

Thanks to all the current contributors, every PR you submit gets us closer and closer to feature completeness.

Thanks to these indirect or external contributors
- Kris: for all your help theorycrafting and testing, and to his sources as well for teaching him
- Walied: for your work on understanding the client assets (worked on cache formats)
- Dane: for your work on understanding the client (worked on client refactors)

If anyone is not listed here, whether that's intentional to remain anonymous or an oversight, thank you for your help.  
This type of project has been a long time coming and I hope to see the trend continue.
