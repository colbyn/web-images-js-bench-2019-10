import {samples} from "../media";
import {Image, ThumbnailArgs, ResizeArgs} from "web-images";
import {basename} from "path";
import * as fs from "fs";

if (!fs.existsSync("assets/output/web-images")){
    fs.mkdirSync("assets/output/web-images", {recursive: true});
}

async function process(path: String): Promise<null> {
    const output_path = `assets/output/web-images/${basename(path as string, "jpeg")}.png`;
    return Image
        .open(path as string)
        .then(x => x.thumbnail({
            width: 500,
            height: 500,
            resize_exact: false
        }))
        .then(x => x.save(output_path))
        .then((_) => {
            return null;
        });
}


Promise
    .all(samples.map(path => process(path)))
    .then((xs) => console.log(xs.length));
