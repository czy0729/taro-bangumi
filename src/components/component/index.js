/*
 * @Author: czy0729
 * @Date: 2019-03-04 18:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 02:18:35
 */
import Taro, { Component } from '@tarojs/taro'
import classNames from 'classnames'

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

export default class _Component extends Component {
  static options = {
    addGlobalClass: true
  }

  // static externalClasses = process.env.TARO_ENV === 'weapp' ? ['cls'] : undefined

  mergeClassName(className) {
    if (process.env.TARO_ENV === 'weapp') {
      console.log(this.props, className)
      return 'cls c-text--14'
    }
    return classNames(className, this.props.className || this.props.cls)
  }

  mergeStyle(style1, style2) {
    if (
      style1 &&
      typeof style1 === 'object' &&
      (style2 && typeof style2 === 'object')
    ) {
      return Object.assign({}, style1, style2)
    }
    return objectToString(style1) + objectToString(style2)
  }

  /**
   * RN className样式到达子组件会通过style传递StyleSheet维护的数字
   * H5和小程序直接合并对象, RN就拼接成数组
   */
  composeStyle(style1, style2) {
    if (!style1 && !style2) {
      return
    }
    if ((!style1 && style2) || (style1 && !style2)) {
      return style1 || style2
    }
    if (process.env.TARO_ENV === 'rn') {
      return [style1, ...style2]
    }
    return {
      ...style1,
      ...style2
    }
  }
}
