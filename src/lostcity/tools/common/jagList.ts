import Jagfile from '#jagex2/io/Jagfile.js';

const args = process.argv.slice(2);

if (args.length < 1) {
    console.log('Usage: node jagList.js <path/to/file.jag>');
    process.exit(1);
}

const jag = Jagfile.load(args[0]);
console.log(jag.fileCount, jag.fileName);
