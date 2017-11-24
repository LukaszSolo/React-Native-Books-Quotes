export default class BookImagesData {
  static getData(filename) {
    switch (filename) {
      case "world.jpg":
        return require('../../assets/covers/world.jpeg');
    default:
      return require('../../assets/covers/default-book-cover.png');
    }
  }
}