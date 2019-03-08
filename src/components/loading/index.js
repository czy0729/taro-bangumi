/*
 * @Author: czy0729
 * @Date: 2019-03-06 07:07:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:40:50
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-loading'

export default class Loading extends Component {
  render() {
    return (
      <View className={cls}>
        <View className={`${cls}__line ${cls}__line--1`} />
        <View className={`${cls}__line ${cls}__line--2`} />
        <View className={`${cls}__line ${cls}__line--3`} />
        <View className={`${cls}__line ${cls}__line--4`} />
        <View className={`${cls}__line ${cls}__line--5`} />
      </View>
    )
  }
}
