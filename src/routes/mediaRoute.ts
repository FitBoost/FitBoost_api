import { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

export default (app: Express) => {
  app.get("/api/video/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    const array = __dirname.split("\\");
    const replacement = "media";
    array[array.length - 1] = replacement;
    const videoPath = path.join(...array, `${id}.mp4`);
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
};
