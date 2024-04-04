const fs = require("fs");
const crypto = require("crypto");

function getLocalFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      resolve(fileHash);
    });
  });
}


async function getFileHashfrmURL(url) {
    const res = await fetch(url)
    const arBuf = await res.arrayBuffer()
    const hash = crypto.createHash('sha256');
    hash.update(Buffer.from(arBuf));
    return hash.digest('hex');
}

