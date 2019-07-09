import Base from "chart-base";

export default class Bar extends Base{
  constructor(id) {
    super()
    this.id = id
  }
  destroy() {
    console.log('i am bar destroy');
  }
}
