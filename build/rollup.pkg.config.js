const {formatBanner, formatOutro, env, pluginsDev, pluginsProd} = require('./rollup.base.config')

const packageName = process.env.NODE_PACKAGE
const pkg = require(`../packages/${packageName}/package.json`)
const banner = formatBanner(pkg)
const outro = formatOutro(pkg)

const input = './src/main.js'

let buildConfig = [
  {
    input: input,
    plugins: pluginsDev,
    output: [
      {
        sourcemap: false,
        format: 'umd',
        name: pkg.name,
        banner: banner,
        indent: false,
        file: './dist/index.js'
      }
    ]
  },
  {
    input: input,
    plugins: pluginsProd(banner),
    output: [
      {
        format: 'umd',
        name: pkg.name,
        banner: banner,
        outro: outro,
        indent: false,
        file: './dist/index.min.js'
      }
    ]
  }
]

module.exports = buildConfig
