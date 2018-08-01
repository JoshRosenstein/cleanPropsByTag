
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const plugins = [
  resolve(),
  commonjs(),

  babel({
    babelrc: false,
    presets: [
      [
        'env',
        {
          'targets': {
            'browsers': [
              'last 2 versions',
              'ie >= 9'
            ]
          },
          'modules': false
        }
      ],
      'stage-0'
    ],
    'plugins': ['external-helpers'],
    runtimeHelpers: true
  }),
  terser(),
  filesize()
]

const configBase = {
  input: 'src/index.js',
  treeshake: true,
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    { file: pkg.main, format: 'cjs', sourcemap: true },
  ],
  plugins,
}

const UMDBase = {
  input: 'src/index.js',
  treeshake: true,
  output: [
    { file: pkg.browser, format: 'umd', name: pkg.moduleName },
  ],

  plugins:[...plugins,uglify()]

}

export default [configBase,UMDBase]
