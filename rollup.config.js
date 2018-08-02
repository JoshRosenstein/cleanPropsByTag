
import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'


const deafultBabel=(additions = {}) => ({
  exclude: 'node_modules/**',
  babelrc: false,
  presets: [['env', { loose: true, modules: false }], 'react', 'stage-0'],
  plugins: ['external-helpers'],
  ...additions
})

const treeshake={pureExternalModules:true,
}

const outputs = [
  {external:[  ...Object.keys(pkg.peerDependencies || {})],
    format: 'umd',
    name: 'cleanPropsbyTag',
    file: pkg.browser,
    plugins: [resolve(),commonjs(),terser()],

  },
  {
    format: 'cjs',
    interop:false,
    plugins: [cleanup()],
    file: 'dist/index.min.js',
  },
  {
    format: 'es',
    interop:false,
    plugins: [cleanup()],
    file: 'dist/index.es.js',
  }
]


export default outputs.map(({ fileExt,external=['@roseys/futils'] ,plugins = [],babelc={},...output }) => ({
  input: 'temp/index.js',
  output,
  treeshake,
  external,
  plugins: [
    babel(deafultBabel(babelc)), ...plugins, filesize()]
}))
