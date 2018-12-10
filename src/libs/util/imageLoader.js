let images = {}

class ImageLoader {
  static setImages(imagesInfo) {
    images = imagesInfo
  }

  static loadSrc = (imagePath) => {
    const image = images[imagePath]
    if(image === undefined)
      return "image not found"
    // data:image/<png|jpg>;base64,<base64 encoded data>の生成
    return `data:image/${image.type};base64,${image.data}`
  }
}

export default ImageLoader