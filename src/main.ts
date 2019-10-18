import * as child_process from "child_process";
// import * as report from "./report";


///////////////////////////////////////////////////////////////////////////////
// HELPERS
///////////////////////////////////////////////////////////////////////////////

function to_seconds(duration: number): number {
    const round_number = (number: number) => {
        let x = number.toFixed(12);
        return Number(x);
    };
    const seconds = duration / 1000;
    // const milliseconds = duration % 1000;
    return round_number(seconds);
}


function run_for(name: string) {
    const go = () => {
        const {status, output: [_, stdout, stderr]} = child_process.spawnSync("node", [`${__dirname}/library/${name}.js`], {
            shell: true,
            encoding: "utf8"
        });
        // console.log(stdout);
        // console.log(stderr);
        console.assert(status == 0);
    };
    let results: Array<number> = [];
    for (let _ in new Array(10).fill(0)) {
        const start = new Date();
        go();
        const end = new Date();
        const diff = +end - +start;
        results.push(diff);
    }
    let sum = results.reduce((previous, current) => current += previous);
    let avg = sum / results.length;
    console.info("%s: %d seconds", name, to_seconds(avg));
}



///////////////////////////////////////////////////////////////////////////////
// BENCHMARKS
///////////////////////////////////////////////////////////////////////////////


// run_for("jimp");
run_for("web_images");
// run_for("sharp");


