const path = require("path");

const formattedFileSystem = fileSystem => ( 
  fileSystem.map((file, index) => ({
    key: index,
    name: path.basename(file),
    value: file
  }))
);

module.exports = formattedFileSystem;