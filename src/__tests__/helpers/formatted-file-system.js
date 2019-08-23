import {formattedFileSystem} from "src/helpers";

describe("formatted file system", () => {
  let fileSystem;
  beforeEach(() => {
    fileSystem = [
      "path/to/file1.js",
      "path/to/file2.js",
      "path/to/file3.js"
    ]
  })

  it("should return an array with the file system formatted", () => {
    expect(formattedFileSystem(fileSystem)).toEqual([
      {
        "key": 0, 
        "name": "file1.js", 
        "value": "path/to/file1.js"
      }, 
      {
        "key": 1, 
        "name": "file2.js", 
        "value": "path/to/file2.js"
      }, 
      {
        "key": 2, 
        "name": "file3.js", 
        "value": "path/to/file3.js"
      }
    ])
  })

  describe("Validates fileSystem", () => {
    it("should return an error message when fileSystem is undefined", () => {
      expect(formattedFileSystem()).toEqual("fileSystem is undefined");
    })

    it("should return an error message when fileSystem is not an array", () => {
      expect(formattedFileSystem("fileSystem")).toEqual("fileSystem has to be an array");
    })
  })
})