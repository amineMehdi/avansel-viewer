import tsPlugin from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import {dts} from "rollup-plugin-dts";

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
    // For personal use
  {
    external: ['three'],
    input: 'build/Avansel/Avansel.d.ts',
    output: [{
      file: '../suite/src/assets/js/libs/Avansel/avansel.d.ts',
      format: 'es'
    }],
    plugins: [dts()]
  },
  {
    external: ['three'],
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
  }
]