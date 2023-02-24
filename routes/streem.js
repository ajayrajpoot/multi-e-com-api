const express = require('express');
const router = express.Router();
const fs = require('fs');
/* GET users listing. */
router.get('/streem', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/videoplayer', (req, res) => {
    const range = req.headers.range
    const videoPath = './sample-10s.mp4';
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})
module.exports = router;
