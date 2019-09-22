import generateItems from "src/generate-items";

jest.mock("inquirer", () => ({
  prompt: questions => questions
}))

describe("generate items", () => {
  let fileSystem, rootPath;
  beforeEach(() => {
    fileSystem = [
      "path/to/file1.js",
      "path/to/file2.js",
      "path/to/file3.js"
    ];
    rootPath = "root/path";
  });

  it("should return the inquirer setup object", () => {
    expect(generateItems(fileSystem, rootPath)).toEqual([
      {
        "choices": [
          {"key": 4, "name": "← back to root path", "value": "root/path"}, 
          {"key": 0, "name": "file1.js", "value": "path/to/file1.js"}, 
          {"key": 1, "name": "file2.js", "value": "path/to/file2.js"}, 
          {"key": 2, "name": "file3.js", "value": "path/to/file3.js"}
        ], 
        "message": "Select a resource", 
        "name": "resource", 
        "type": "list"
      }
    ])
  });


  describe("Validates fileSystem", () => {
    it("should return an error message when fileSystem is undefined", () => {
      expect(generateItems(undefined, rootPath)).toEqual("fileSystem is undefined");
    })

    it("should return an error message when fileSystem is not an array", () => {
      expect(generateItems("fileSystem", rootPath)).toEqual("fileSystem has to be an array");
    })
  });

  describe("Validates rootPath", () => {
    it("should return an error message when rootPath is undefined", () => {
      expect(generateItems(fileSystem)).toEqual("rootPath is undefined");
    })

    it("should return an error message when rootPath is not a string", () => {
      expect(generateItems(fileSystem, 123)).toEqual("rootPath has to be a string");
    })
  })
});