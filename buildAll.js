const fs = require('fs-extra')

function fileHandler(path, platform) {
  fs.writeFile(path + '/settings.json', `{"app": "${platform}"}`)
  //   fs.open(path + '/settings.json', 'w', (err) => {
  //     if (err) throw err
  //     console.log('File created')
  //   })
}

fs.stat('server', function (err) {
  if (!err) {
    fs.emptyDirSync('server')
    console.log('Директория SERVER очищена')

    fs.mkdirSync('server/cws')
    fs.mkdirSync('server/fb')
    fs.mkdirSync('server/ok')
    fs.mkdirSync('server/vk')
    fs.mkdirSync('server/vkm')
    fs.mkdirSync('server/win')
    console.log('Директории соц-сетей созданы')

    fs.copySync('build', 'server', { dereference: true })
    fs.copySync('build', 'server/cws', { dereference: true })
    fs.copySync('build', 'server/fb', { dereference: true })
    fs.copySync('build', 'server/ok', { dereference: true })
    fs.copySync('build', 'server/vk', { dereference: true })
    fs.copySync('build', 'server/vkm', { dereference: true })
    fs.copySync('build', 'server/win', { dereference: true })
    // fs.copySync('public', 'server/android', { dereference: true })
    console.log('Плеера соцсетей собраны')

    fileHandler('server/fb', 'fb')
    fileHandler('server/vk', 'vk')
    fileHandler('server/vkm', 'vkm')
    // fileHandler('server', 'android')
    console.log('Последние настройки закончены')
  } else if (err.code === 'ENOENT') {
    fs.mkdirSync('server')
    console.log('директория SERVER создана')
  }
})
