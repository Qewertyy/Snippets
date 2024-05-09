type file = {
    ext: string;
    mime: string
}

//ref = https://github.com/Qewertyy/Icons8-Upscaler/blob/main/src/index.ts#L100
function guessMimeType(file: Buffer){
  const signature = file.toString("hex", 0, 4);
    let fileType: file;
    if (signature === "89504e47") {
        fileType = {
            ext: "png",
            mime: "image/png",
        };
    } else if (signature === "ffd8ffe0" || signature === "ffd8ffe1") {
        fileType = {
            ext: "jpg",
            mime: "image/jpeg",
        };
    } else {
        return "Invalid file type";
    };
    return fileType;
};
