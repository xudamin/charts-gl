const path = require('path')

function resolveFile(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = {
  resolveFile: resolveFile
}
