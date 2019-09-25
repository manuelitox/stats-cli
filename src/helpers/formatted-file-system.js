import path from "path";

export const formattedFileSystem = fileSystem => {
  if (!fileSystem) return "fileSystem is undefined";
  if (!Array.isArray(fileSystem)) return "fileSystem has to be an array";
  
  return fileSystem.map((file, index) => ({
    key: index,
    name: path.basename(file),
    value: file
  }))
};