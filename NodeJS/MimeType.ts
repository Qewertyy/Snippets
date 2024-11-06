type file = {
    ext: string;
    mime: string
}

//ref = https://github.com/Qewertyy/Icons8-Upscaler/blob/main/src/index.ts#L100
function guessMimeType(file: Buffer){
  const signature = file.toString("hex", 0, 4);
  const signatureExtended = file.toString("hex", 0, 12); // Used for WebP and HEIC/HEIF files
  const sigAscii = file.toString("ascii", 8, 12);
  const invalid = "Invalid file type";
  let fileType : file | string;
  if (signature === "89504e47") {
      fileType = {
          ext: "png",
          mime: "image/png",
      };
  } else if (["ffd8ffe0","ffd8ffe1"].includes(signature) || signature.startsWith("ffd8")) { // may have different sub-signatures
      fileType = {
          ext: "jpg",
          mime: "image/jpeg",
      };
  } else if (signatureExtended.startsWith("00000018") || signatureExtended.startsWith("0000001c")) {
    if (["heic","heix"].includes(sigAscii)) {
      fileType = {
        ext: "heic",
        mime: "image/heic",
      };
    } else if (["mif1","msf1","heif"].includes(sigAscii)) {
      fileType = {
        ext: "heif",
        mime: "image/heif",
      };
    }else{
      return invalid;
    };
  } else if (signatureExtended.startsWith("52494646") && sigAscii === "WEBP") {
    // WebP files (RIFF-based)
    fileType = {
      ext: "webp",
      mime: "image/webp",
    };
  } else {
      return invalid;
  };
  return fileType;
};
