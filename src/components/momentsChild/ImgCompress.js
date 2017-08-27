const readableSize = (size) => {
  return size / 1024 > 1024 ? (~~(10 * size / 1024 / 1024)) / 10 + 'MB' : ~~(size / 1024) + 'KB'
}

export default (imgFile, callback, maxWidthOrHeight, maxSize) => {
  /**
   * 图片压缩方法
   * 如果宽度或者高度超过1000，直接设置为1000，然后等比缩放。之后判断大小是不是超过了2MB，超过就进行质量压缩
   * @param {File} imgFile 图片内容
   * @param {string} imgType 图片类型
   * @return {Blob} 压缩后的图片内容
   * */

  maxWidthOrHeight = maxWidthOrHeight || 1000
  maxSize = maxSize || 2 * 1024 * 1024
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()

  img.src = URL.createObjectURL(imgFile)
  img.onload = function () {
    let radio = 1
    if (Math.min(this.height, this.width) > 1000) {
      radio = Math.max(this.height / 1000, this.width / 1000)
    }
    canvas.height = this.height / radio
    canvas.width = this.width / radio

    if (imgFile.type === 'image/jpeg') {
      ctx.fillStyle = '#fff'
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    canvas.toBlob(function (b) {
      console.log('original: ', readableSize(imgFile.size), 'compressed: ', readableSize(b.size), 'rate: ', ~~(100 * (imgFile.size - b.size) / imgFile.size) + '%')
      callback(b)
    }, imgFile.type)
  }

}

