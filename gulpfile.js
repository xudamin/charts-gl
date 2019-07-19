const gulp = require('gulp')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const pkg = require('./package.json')

gulp.task('help', () => {
  console.log('gulp help: gulp自定义命令帮助列表')
  console.log('gulp server: 开启静态服务')
  console.log('gulp minify: js文件压缩&&二进制压缩')
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: './example/index.html'
    }
  })
  gulp.watch(`./dist/index.js`).on('change', browserSync.reload)
  gulp.watch(`./example/*.html`).on('change', browserSync.reload)
})

gulp.task('clean', () => {
  return gulp.src('./dist/*')
    .pipe(clean())
})

gulp.task('minify', async() => {
  const code = fs.readFileSync('./dist/index.min.js').toString('utf-8')
  const gzipped = zlib.gzipSync(code)
  await fs.writeFileSync(`./dist/${name}.min.js.gz`, gzipped)
})
