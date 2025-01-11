<div align="center">
<h1>Lost City - May 18, 2004</h1>
</div>

> [!NOTE]
> Learn about our history and ethos on our forum: https://lostcity.rs/t/faq-what-is-lost-city/16

## Getting Started

> [!IMPORTANT]
> If you run into issues please see our [common issues](#common-issues).

> [!TIP]
> Windows users: We have a script called `quickstart.bat` that will launch the server for you, which combines steps 3 and 4 below.

1. Download and extract this repo somewhere on your computer
2. Install our [Dependencies](#environment-dependencies)
3. Open the folder you downloaded in a command prompt
4. Run `npm start`

Once it tells you the world has started, open up [http://localhost](http://localhost) in your browser and play!

> [!TIP]
> Advanced users: You can customize your setup by copying the `.env.example` file to `.env`. This is not necessary to connect and develop.

## Dependencies

- [NodeJS 22](https://nodejs.org/)
- [Java 17](https://adoptium.net/) - later LTS versions are also fine.

> [!TIP]
> If you're using VS Code (recommended), [we have an extension to install on the marketplace.](https://marketplace.visualstudio.com/items?itemName=2004scape.runescriptlanguage)

## Workflow

Content developers should run `npm start`. The server will watch for changes to scripts and configs, then automatically repack everything.

Engine developers should run `npm run dev`. This does what `npm start` does above, but also completely restarts the server when engine code has changed.

## Common Issues

* `bad option: --import`  
You are using an older version of Node. Reinstall and re-run.

* `'"java"' is not recognized as an internal or external command`  
You do not have Java installed.

* `has been compiled by a more recent version of the Java Runtime (class file version 61.0), this version of the Java Runtime only recognizes class file versions up to 52.0`  
You are using Java 8 or Java 11. If you have multiple java versions, you are now an "advanced user," go ahead and set `JAVA_PATH=path-to-java.exe` in your .env file.
