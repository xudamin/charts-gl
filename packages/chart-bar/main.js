import Base from "chart-base";

import Worker from 'worker!./src/workers/demo.worker.js'

export default class Bar extends Base{
  constructor(id) {
    super()
    this.id = id
    this.initWorker()
  }
  destroy() {
    console.log('i am bar destroy');
  }
  initWorker() {
    let worker = new Worker()

    worker.postMessage('Hello World')

    worker.onmessage = function (event) {
      console.log('Received message ' + event.data);
      console.log('finish')
    }
  }
}
