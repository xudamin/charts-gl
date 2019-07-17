import './styles/base.css'
import {name, version} from '../package.json'

export default class Base{
  constructor(id) {
    this.id = id
    this.init()
  }
  init() {
    console.log(`i am running ${name} ----> ${version}`)
  }
  destroy() {
    console.log('i am destroy');
  }
}
