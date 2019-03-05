/*
 * @Author: czy0729
 * @Date: 2019-03-02 09:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-04 06:38:22
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import View from '@components/view'
import './index.scss'

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
