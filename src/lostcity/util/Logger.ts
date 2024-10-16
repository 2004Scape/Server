import kleur from 'kleur';

export function printInfo(message: string) {
    const now = new Date();

    console.log(kleur.magenta(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}\t`), kleur.green('INFO\t'), message);
}

export function printWarning(message: string) {
    const now = new Date();

    console.log(kleur.magenta(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}\t`), kleur.yellow('WARN\t'), message);
}

export function printError(message: string) {
    const now = new Date();

    console.log(kleur.magenta(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}\t`), kleur.red('ERROR\t'), message);
}

export function printDebug(message: string) {
    const now = new Date();

    // todo: print based on env variable
    console.log(kleur.magenta(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}\t`), kleur.cyan('DEBUG\t'), message);
}
