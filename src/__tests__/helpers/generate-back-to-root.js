import {generateBackToRoot} from "src/helpers";

describe("Generate back to root link", () => {
  let choices, rootPath;
  beforeEach(() => {
    choices = [];
    rootPath = "root/path"
  })

  it("should return an object with the back to root link", () => {
    expect(generateBackToRoot(choices, rootPath)).toEqual([{
      key: 1,
      name: "← back to root path",
      value: "root/path"
    }]);
  });

  describe("Validates choices", () => {
    it("should return an error message when choices is undefined", () => {
      expect(generateBackToRoot(undefined, rootPath)).toEqual("choices is undefined");
    });

    it("should return an error message when choices is not an array", () => {
      expect(generateBackToRoot("string", rootPath)).toEqual("choices has to be an array");
    })
  });

  describe("Validates rootPath", () => {
    it("should return an error message when rootPath is undefined", () => {
      expect(generateBackToRoot(choices)).toEqual("rootPath is undefined");
    })

    it("should return an error message when rootPath is not a string", () => {
      expect(generateBackToRoot(choices, 123)).toEqual("rootPath has to be a string");
    })
  })
});