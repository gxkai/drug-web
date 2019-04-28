var fs = require('fs')
var stat = fs.stat

var copy = function (src, dst) {
  // 读取目录
  fs.readdir(src, function (err, paths) {
    console.log(paths)
    if (err) {
      throw err
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path
      var _dst = dst + '/' + path
      var readable
      var writable
      stat(_src, function (err, st) {
        if (err) {
          throw err
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src)// 创建读取流
          writable = fs.createWriteStream(_dst)// 创建写入流
          readable.pipe(writable)
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      })
    })
  })
}

var exists = function (src, dst, callback) {
  // 测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) { // 存在
      callback(src, dst)
    } else { // 不存在
      fs.mkdir(dst, function () { // 创建目录
        callback(src, dst)
      })
    }
  })
}

function copyIt (from, to) {
  fs.writeFileSync(to, fs.readFileSync(from))
  // fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}

exists('server', 'dist/server', copy)
copyIt('nuxt.config.js', 'dist/nuxt.config.js')
copyIt('package.json', 'dist/package.json')
