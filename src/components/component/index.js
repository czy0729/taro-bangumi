/*
 * @Author: czy0729
 * @Date: 2019-03-04 18:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 07:46:33
 */
import Taro, { Component } from '@tarojs/taro'
import { ENV } from '@constants'

const objectToString = style => {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style && typeof style === 'string') {
    return style
  }
  return ''
}

/**
 * 把对象形式的style转为字符串
 * 微信小程序style要使用字面量
 * @param {*} style1
 * @param {*} style2
 */
const mergeStyle = (style1, style2) => {
  if (
    style1 &&
    typeof style1 === 'object' &&
    (style2 && typeof style2 === 'object')
  ) {
    return Object.assign({}, style1, style2)
  }
  return objectToString(style1) + objectToString(style2)
}

export default class _Component extends Component {
  static options = {
    addGlobalClass: true
  }

  // static externalClasses = process.env.TARO_ENV === 'weapp' ? ['cls'] : null
  /**
   * [废弃] externalClasses不建议使用, 小程序跟其他端暂时没有较好办法统一
   * @param {*} className
   */
  // mergeClassName(className) {
  //   if (process.env.TARO_ENV === 'weapp') {
  //     return 'cls'
  //   }
  //   return classNames(className, this.props.className || this.props.cls)
  // }

  /**
   * RN className样式到达子组件会通过style传递StyleSheet维护的数字, 比如301
   * RN就拼接成数组, 如[{...}, 301]
   * H5直接合并对象, 小程序转成字面量
   * @param {*} style1
   * @param {*} style2
   */
  composeStyle(style1, style2) {
    if (!style1 && !style2) {
      return
    }
    if ((!style1 && style2) || (style1 && !style2)) {
      if (ENV.WEAPP) {
        return mergeStyle(style1 || style2)
      }
      return style1 || style2
    }
    if (ENV.RN) {
      if (Array.isArray(style2)) {
        return [style1, ...style2]
      }
      return [style1, style2]
    }
    if (ENV.WEAPP) {
      return mergeStyle(style1, style2)
    }
    return {
      ...style1,
      ...style2
    }
  }
}
