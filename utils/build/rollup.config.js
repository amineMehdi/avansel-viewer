import tsPlugin from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import {dts} from "rollup-plugin-dts";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: 'src/Avansel/Avansel.ts',
    output: {
      file: 'build/avansel.js',
      sourcemap: true
    },
    plugins: [
      tsPlugin(),
      json(),
      nodeResolve({ preferBuiltins: true })
    ],
  }, {
    input: 'src/main.js',
    output: {
      file: 'build/main.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      tsPlugin(),
      nodeResolve({ preferBuiltins: true })
    ]
  },
  // {
  //   input: 'src/Avansel/Avansel.ts',
  //   output: {
  //     file: '../suite/src/assets/js/avansel.min.js',
  //     format: 'umd',
  //     name: 'Avansel',
  //     esModule: false,
  //   },
  //   plugins: [
  //     json(),
  //     typescript(),
  //     terser(),
  //   ],
  // },
  {
    input: 'build/Avansel/Avansel.d.ts',
    output: [{
      file: '../suite/src/assets/js/libs/Avansel/avansel.d.ts',
      format: 'es'
    }],
    plugins: [dts()]
  },
  {
    input: 'src/Avansel/Avansel.ts',
    output: {
      file: '../suite/src/assets/js/libs/Avansel/avansel.js',
      sourcemap: true
    },
    plugins: [
      tsPlugin(),
      json(),
      nodeResolve({ preferBuiltins: true })
    ],
  },
]