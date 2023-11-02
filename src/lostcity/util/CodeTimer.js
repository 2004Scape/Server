export function codeTimer(stepName) {
    let stopped = false;
    const start = performance.now();

    function stop() {
        if (stopped) throw new Error('Timer already stopped');

        stopped = true;
        const time = performance.now() - start;

        console.log(`[${stepName}] complete in ${(time / 1000).toFixed(2)}s`);
        console.log('');
    }

    return { stop };
}
