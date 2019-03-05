/*
 * @Author: czy0729
 * @Date: 2019-03-03 23:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:42:22
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import Component from '@components/component'
import './index.scss'

const cls = 'c-view'

export default class _View extends Component {
  render() {
    const { wrap, onClick, className, style } = this.props
    return (
      <View
        className={classNames(
          cls,
          {
            [`${cls}--wrap-${wrap}`]: wrap
          },
          className
        )}
        style={style}
        onClick={onClick}
      >
        {this.props.children}
      </View>
    )
  }
}
