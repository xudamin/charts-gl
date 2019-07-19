const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const replace = require('rollup-plugin-replace')
const terser = require('rollup-plugin-terser').terser

const postcss = require('rollup-plugin-postcss')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')

const env = process.env.NODE_ENV

function formatBanner(pkg) {
  const banner = `/*!
  * ${pkg.name}.js v${pkg.version}
  * ${pkg.homepage}
  * (c) ${new Date().getFullYear()} ${pkg.name}.js Contributors
  * Released under the MIT License
  */`
  return banner
}

function formatOutro(pkg) {
  const outro = `typeof console !== 'undefined' && console.log('${pkg.name} v${pkg.version}')`
  return outro
}

const pluginsDev = [
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
    // mainFields: ['jsnext', 'main', 'browser'],
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
  })
]

function pluginsProd(banner) {
  return [
    postcss({
      extensions: ['.css'],
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano({ minimize: true })
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
    terser({
      output: {
        preamble: banner
      }
    })
  ]
}

module.exports = {
  formatBanner: formatBanner,
  formatOutro: formatOutro,
  env: env,
  pluginsDev: pluginsDev,
  pluginsProd: pluginsProd
}
