import fs from "fs";
import stats from "src/stats";

jest.mock("fs", () => ({
  statSync: path => ({
    size: 495,
    mtime: "2019-08-06T18:33:15.507Z",
    isDirectory: jest.fn(() => "file")
  })
}))

jest.mock("glob", () => ({
  sync: () => ([
    "project-name/path-1",
    "project-name/path-2"
  ])
}))

describe("Stats", () => {
  let myEmitter, pathResolved;
  beforeEach(() => {
    myEmitter = {
      emit: (event, filesPath) => `emit an ${event} event with this ${filesPath}`
    };
    pathResolved = "absolute/path/project-name/sub-folder"
  })

  it("should invoke myEmitter correctly", () => {
    const myStats = stats(pathResolved, myEmitter)
    expect(myStats).toEqual("emit an event event with this project-name/path-1,project-name/path-2")
  });

  it("should invoke console.log and display the file information", () => {
    console.log = jest.fn();
    fs.statSync = () => ({
      size: 495,
      mtime: "2019-08-06T18:33:15.507Z",
      isDirectory: null
    })
    pathResolved = "absolute/path/project-name/file.txt";
    stats(pathResolved, myEmitter); 
    expect(console.log).toHaveBeenCalled()
  })
});