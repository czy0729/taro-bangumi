/*
 * @Author: czy0729
 * @Date: 2019-02-22 11:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-11 23:10:15
 */
import Taro from '@tarojs/taro'

const NAVIGATOR_HEIGHT = 44
const TAB_BAR_HEIGHT = 50

/**
 * // NOTE Taro 可用高度的计算有问题，H5、RN 上返回的是窗口高度，暂且简单兼容下
 * @param {*} showTabBar
 */
export function getWindowHeight(showTabBar) {
  const info = Taro.getSystemInfoSync()
  const { windowHeight, statusBarHeight } = info
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0

  if (process.env.TARO_ENV === 'rn') {
    return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
  }

  if (process.env.TARO_ENV === 'h5') {
    return windowHeight - tabBarHeight
  }

  return windowHeight
}

/**
 * // NOTE 样式在编译时会通过 postcss 进行处理，但 js 中的 style 可能需要运行时处理
 * 例如加 prefix，或者对 RN 样式的兼容，又或是在此处统一处理 Taro.pxTransform
 * 此处只做演示，若需要做完善点，可以借助 https://github.com/postcss/postcss-js
 */
export function postcss(style) {
  console.log(style)
  if (!style) {
    return style
  }
  const { background, ...restStyle } = style
  const newStyle = {}
  if (background) {
    // NOTE 如 RN 不支持 background，只支持 backgroundColor
    newStyle.backgroundColor = background
  }

  return { ...restStyle, ...newStyle }
}

/**
 * RN className样式到达子组件会通过style传递StyleSheet维护的数字
 * H5和小程序直接合并对象, RN就拼接成数组
 */
export function composeStyle(style, otherStyle) {
  if (!style && !otherStyle) {
    return
  }
  if ((!style && otherStyle) || (style && !otherStyle)) {
    return style || otherStyle
  }
  if (process.env.TARO_ENV === 'rn') {
    return [style, ...otherStyle]
  }
  return {
    ...style,
    ...otherStyle
  }
}
