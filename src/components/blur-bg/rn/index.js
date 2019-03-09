/*
 * @Author: czy0729
 * @Date: 2019-03-08 10:42:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 21:45:02
 */
import Taro, { Component } from '@tarojs/taro'
import { Image } from 'react-native'

export default class ImageRN extends Component {
  render() {
    const { src, blurRadius, style } = this.props
    return <Image source={{ uri: src }} blurRadius={blurRadius} style={style} />
  }
}
