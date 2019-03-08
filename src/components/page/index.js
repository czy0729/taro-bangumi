/*
 * @Author: czy0729
 * @Date: 2019-02-26 02:11:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:41:19
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import classNames from 'classnames'
import './index.scss'

const prefixCls = 'c-page'

export default class Page extends Component {
  static defaultProps = {
    className: '',
    styles: null
  }
  render() {
    const { className, styles } = this.props
    return (
      <View className={classNames(prefixCls, className)} style={styles}>
        {this.props.children}
      </View>
    )
  }
}
