
import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const external = Object.keys(pkg.dependencies)
const plugins=[  babel({
  exclude: 'node_modules/**',
  babelrc: false,
  presets: [['env', { loose: true, modules: false }], 'react', 'stage-0'],
  plugins: ['external-helpers'],
})]

const pluginslib=[  babel({
  plugins:[['transform-imports', {
    '@roseys/futils': {
      'transform': '@roseys/futils/lib/${member}'
    }
  }]]
})]

const pluginsES=[  babel({
  plugins:[['transform-imports', {
    '@roseys/futils': {
      'transform': '@roseys/futils/es/${member}'
    }
  }]]
})]


const treeshake={pureExternalModules:true,
}

const umdConfig={
  input: 'temp/index.js',
  treeshake,
  output: [
    { file: pkg.browser, format: 'umd', name: 'name', sourcemap: false ,exports:'named'}
  ],
  plugins:[ resolve(),commonjs(),...plugins,terser(),filesize()]
}

const mainConfig = {
  input: 'src/index.js',
  treeshake,
  external,
  output: [
    { file: pkg.main, format: 'cjs',  exports:'named',interop:false },


  ],
  plugins:[...plugins,...pluginslib,cleanup(),filesize()]
}

const esConfig = {
  input: 'src/index.js',
  treeshake,
  external,
  output: [

    { file: pkg.module, format: 'es', exports:'named'  },
  ],
  plugins:[...plugins,...pluginsES,cleanup(),filesize()]
}


export default [umdConfig,mainConfig,esConfig]
