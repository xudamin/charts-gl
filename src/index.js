import ChartBase from '../packages/chart-base/index'
import ChartBar from '../packages/chart-bar/index'

import debug from 'debug'
const log = debug('app:log')

if (process.env.NODE_ENV !== 'production') {
  debug.enable('*')
  log('Logging is enabled!')
} else {
  debug.disable()
}

log(ChartBase)
const Charts = {
  ChartBase,
  ChartBar
}

export default Charts
