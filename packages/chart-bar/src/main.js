import Base from "chart-base";

// #TODO
// import MyWorker from 'worker!./demo.worker.js'

export default class Bar extends Base{
  constructor(id) {
    super()
    this.id = id
    // this.initWorker()
  }
  destroy() {
    console.log('i am bar destroy');
  }
  // initWorker() {
  //   let worker = new MyWorker()

  //   worker.postMessage('Hello World')

  //   worker.onmessage = function (event) {
  //     console.log('Received message ' + event.data);
  //     console.log('finish')
  //   }
  // }
}
