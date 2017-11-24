export default class BookData {
  static getData(filename) {
    switch (filename) {
    case 'tools_of_titans.json':
      return require('../../assets/tools_of_titans.json');
    case 'world.json':
      return require('../../assets/world.json');
    }
  }
}