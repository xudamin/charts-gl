export default class Base{
  constructor(id) {
      this.id = id
  }
  init() {
    console.log('i am init')
  }
  destroy() {
    console.log('i am destroy');
  }
}
