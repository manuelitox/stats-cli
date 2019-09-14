import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import builtins from 'rollup-plugin-node-builtins';

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    external: [
      "fs",
      "glob", 
      "chalk", 
      "moment", 
      "inquirer", 
      "commander", 
      "@babel/runtime/regenerator",
      "@babel/runtime/helpers/typeof",
      "@babel/runtime/helpers/asyncToGenerator"
    ],
    output: [{
      file: pkg.main,
      format: "cjs",
      globals: {
        "@babel/runtime/regenerator": "_renegerator",
        "@babel/runtime/helpers/asyncToGenerator": "_asyncToGenerator",
        "@babel/runtime/helpers/typeof": "_typeof",
        "glob": "glob",
        "commander": "commander",
        "chalk": "chalk",
        "moment": "moment",
        "inquirer": "inquirer"
      }
    }],
    plugins: [
      json(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      resolve({
        browser: true,
        modulesOnly: true,
        preferBuiltins: true,
      }), 
      commonjs(), 
      minify(),
      builtins()
    ]
  }
];
