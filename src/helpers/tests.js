export function runSagasTests(rootSaga, tests) {
    const testsToRun = [];

    rootSaga().next().value.forEach(item => {
        const [ effect, gen ] = item.FORK.args;
        tests.forEach(item => {
            if (item.effect === effect) {
                testsToRun.push({
                    name: item.name, 
                    fn: item.fn,
                    sagaGenerator: gen,
                });
            }
        })
    });

    testsToRun.forEach(item => it(item.name, item.fn(item.sagaGenerator)));

}