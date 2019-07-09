const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
// const multiEntry = require("rollup-plugin-multi-entry")
const json = require('rollup-plugin-json')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify').uglify

const postcss = require('rollup-plugin-postcss')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')

const pkg = require('./package.json')
const version = process.env.VERSION || pkg.version
const env = process.env.NODE_ENV
const year = new Date().getFullYear()
const banner = `/*!\n * ${pkg.componentName} v${version}\n * LICENSE : ${pkg.license}\n * (c) 2019-${year}\n */`
const outro = `typeof console !== 'undefined' && console.log('${pkg.componentName} v${version}')`

module.exports = {
  // input: ['src/index.js', 'packages/**/index.js'],
  input: 'src/index.js',
  plugins: [
    // multiEntry(),
    postcss({
      extensions: ['.css'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano()
      ]
    }),
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true, // Default: true
      browser: true // Default: false
    }),
    json(),
    babel({
      exclude: 'node_modules/**', // 排除node_modules 下的文件
      runtimeHelpers: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    (env === 'production' && uglify())
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
