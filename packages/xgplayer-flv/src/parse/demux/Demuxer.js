import Log from '../../utils/Log'
import TransCoder from '../TransCoder'
export default class Demuxer extends TransCoder {
  dispatch (type, ...payload) {
    const prefix = 'demuxer_'
    this._observer.emit(`${prefix}${type}`, ...payload)
  }
  error (message) {
    const { CLASS_NAME = 'Demuxer' } = this
    Log.error(`[${CLASS_NAME} error] `, message)
  }

  info (message) {
    const { CLASS_NAME = 'Demuxer' } = this
    Log.info(`[${CLASS_NAME} info] `, message)
  }

  log (message) {
    const { CLASS_NAME = 'Demuxer' } = this
    Log.log(`[${CLASS_NAME} log] `, message)
  }

  warn (message) {
    const { CLASS_NAME = 'Demuxer' } = this
    Log.warn(`[${CLASS_NAME} warn] `, message)
  }
}
