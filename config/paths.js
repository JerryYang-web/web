const fs = require('fs')
const path = require('path')

const _dirname = fs.realpathSync(process.cwd()); //Node Process working directory
const resolveDir = paths => path.resolve(_dirname, paths)

module.exports = {
   src: resolveDir('src'),
   html: resolveDir('src/index.html'),
   tsConfig: resolveDir('tsConfig.json'),
   entry: resolveDir('src/index.tsx'),
   output: resolveDir('build'),
   ico: resolveDir('favicon.ico')
}
