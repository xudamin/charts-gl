const {formatBanner, formatOutro, env, pluginsDev, pluginsProd} = require('./rollup.base.config')
const {resolveFile} = require('./rollup.util')

const pkg = require('../package.json')
const banner = formatBanner(pkg)
const outro = formatOutro(pkg)

let buildConfig = [
  {
    input: resolveFile('./src/main.js'),
    plugins: pluginsDev,
    output: [
      {
        sourcemap: false,
        format: 'umd',
        name: pkg.name,
        banner: banner,
        indent: false,
        file: resolveFile(`./dist/index.js`)
      }
    ]
  },
  {
    input: resolveFile('./src/main.js'),
    plugins: pluginsProd(banner),
    output: [
      {
        format: 'umd',
        name: pkg.name,
        banner: banner,
        outro: outro,
        indent: false,
        file: resolveFile(`./dist/index.min.js`)
      }
    ]
  }
]

module.exports = buildConfig
