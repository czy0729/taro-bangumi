/*
 * @Author: czy0729
 * @Date: 2019-03-02 09:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 00:57:04
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import classNames from 'classnames'
// import './index.scss'

const cls = 'c-flex-item'

export default class FlexItem extends Component {
  render() {
    const { className, style } = this.props
    return (
      <View className={classNames(cls, className)} style={style}>
        {this.props.children}
      </View>
    )
  }
}
