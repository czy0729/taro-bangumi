/*
 * @Author: czy0729
 * @Date: 2019-03-06 01:29:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 07:33:03
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import classNames from 'classnames'
import './index.scss'

const cls = 'c-progress-bar'

export default class ProgressBar extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    percent: 0
  }
  render() {
    const { className, style, styles, percent } = this.props
    const _style = {
      width: `${percent}%`
    }
    return (
      <View className={classNames(cls, className)} style={styles || style}>
        <View className={`${cls}__bar`} style={_style} />
      </View>
    )
  }
}
