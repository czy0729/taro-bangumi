/*
 * @Author: czy0729
 * @Date: 2019-02-26 02:11:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-04 06:38:37
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import View from '@components/view'
import './index.scss'

const prefixCls = 'c-page'

export default class Page extends Component {
  render() {
    const { className, style } = this.props
    return (
      <View className={classNames(prefixCls, className)} style={style}>
        {this.props.children}
      </View>
    )
  }
}
