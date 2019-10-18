import Jimp from "jimp";
import {samples} from "../media";
import {basename} from "path";
import * as fs from "fs";

if (!fs.existsSync("assets/output/jimp")) {
    fs.mkdirSync("assets/output/jimp", {recursive: true});
}


async function process(path: String): Promise<null> {
    const output_path = `assets/output/jimp/${basename(path as string, "jpeg")}.png`;
    return Jimp.read(path as string)
        .then(x => x.resize(500, 500))
        .then(x => x.write(output_path))
        .then((_) => {
            return null;
        });
}

Promise
    .all(samples.map(path => process(path)))
    .then((xs) => console.log(xs.length));

