const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const multiEntry = require("rollup-plugin-multi-entry")
const json = require('rollup-plugin-json')

const pkg = require('./package.json')

const year = new Date().getFullYear()
const banner = `/*!\n * ${pkg.componentName} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2019-${year}\n */`
const outro = `typeof console !== 'undefined' && console.log('${pkg.componentName} v${pkg.version}')`

module.exports = {
  // input: ['src/index.js', 'packages/**/index.js'],
  input: 'src/index.js',
  plugins: [
    // multiEntry(),
    resolve({
      module: true,
      jsnext: true,
      main: true
    }),
    json(),
    commonjs(),
    babel()
  ],
  output: [
    {
      sourcemap: false,
      format: 'umd',
      name: pkg.componentName,
      banner,
      outro,
      file: pkg.devMain
    },
    {
      sourcemap: false,
      format: 'es',
      banner,
      file: pkg.module
    }
  ]
}
