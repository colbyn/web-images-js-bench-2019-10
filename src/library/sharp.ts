import {samples} from "../media";
import sharp from "sharp";
import {basename} from "path";
import * as fs from "fs";

if (!fs.existsSync("assets/output/sharp")){
    fs.mkdirSync("assets/output/sharp", {recursive: true});
}

async function process(path: String): Promise<null> {
    const output_path = `assets/output/sharp/${basename(path as string, "jpeg")}.png`;
    return sharp(path as string)
        .resize(500, 500, {fit: "inside"})
        .toFile(output_path)
        .then(() => {
            return null;
        });
}

Promise
    .all(samples.map(path => process(path)))
    .then((xs) => console.log(xs.length));

