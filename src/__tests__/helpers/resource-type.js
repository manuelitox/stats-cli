import {resourceType} from "src/helpers";

describe("Get resource type", () => {
  let stats;
  beforeEach(() => {
    stats = { isDirectory: jest.fn(() => true) };
  });

  it("should confirms that stats is a directory", () => {
    expect(resourceType(stats)).toEqual("directory");
  });

  it("should confirms that stats is a file", () => {
    stats = { isDirectory: jest.fn(() => false) };
    expect(resourceType(stats)).toEqual("file");
  })

  describe("Validates stats", () => {
    it("should return an error message when stats is undefined", () => {
      expect(resourceType()).toEqual("stats is undefined");
    })

    it("should return an error message when stats is not an object", () => {
      expect(resourceType("stats")).toEqual("stats has to be an object");
    })

    it("should return an error message when stats.isDirectory doesnt exists", () => {
      expect(resourceType({})).toEqual("stats.isDirectory doesnt exists");
    })

    it("should return an error message when stats.isDirectory is not a function", () => {
      expect(resourceType({ isDirectory: "isDirectory" })).toEqual("stats.isDirectory is not a function");
    })
  })
})