/*
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-03 06:04:46
 */
import { configure, extendObservable, action, autorun, toJS } from 'mobx'
// import { log } from '@utils'
import fetch from '@utils/fetch'

configure({ enforceActions: 'observed' })

class Common {
  /**
   * 统一setState方法
   * @version 190226 v1.0
   */
  @action
  setState(state) {
    Object.keys(state).forEach(key => {
      const data = state[key]
      if (!this.state[key]) {
        // 键值不存在时需手动创建观察
        extendObservable(this.state, {
          [key]: data
        })
      } else if (typeof data === 'object' && !Array.isArray(data)) {
        this.state[key] = {
          ...this.state[key],
          ...data
        }
      } else {
        this.state[key] = data
      }
    })
  }

  /**
   * 请求并入库, 请求失败后会在1秒后递归重试
   * @version 190227 v1.0
   * @param {*} urlOrConfig
   * @param {*} stateKey
   * @return {Promise}
   */
  async fetch(urlOrConfig, stateKey) {
    let config = {}
    if (typeof urlOrConfig === 'object') {
      config = {
        ...urlOrConfig
      }
    } else {
      config.url = urlOrConfig
    }
    config.retryCb = () => this.fetch(urlOrConfig, stateKey)

    const res = fetch(config)
    const data = await res
    if (Array.isArray(stateKey)) {
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: data
        }
      })
    } else {
      this.setState({
        [stateKey]: data || this.state[stateKey]
      })
    }
    return res
  }

  /**
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS(key) {
    return toJS(this.state[key] || this.state)
  }
}

/**
 * h5测试
 * 190228 v1.0
 * @param {*} config
 * @param {*} stateKey
 * @return {Promise}
 */
export function dev(key, store) {
  if (process.env.TARO_ENV === 'h5') {
    if (!window.Stores) {
      window.Stores = {}
    }
    window.Stores[key] = store

    autorun(() => {
      // log('autorun', key, '', toJS(store.state))
    })
  }
}

export default Common
