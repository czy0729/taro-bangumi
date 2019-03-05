/*
 * @Author: czy0729
 * @Date: 2019-02-28 07:08:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-04 06:37:34
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import View from '@components/view'
import './index.scss'

const cls = 'c-blur-bg'

export default class BlurBg extends Component {
  render() {
    const { src, className, style } = this.props

    // TODO RN
    if (process.env.TARO_ENV === 'rn') {
      return (
        <View className={classNames(cls, className)} style={style}>
          {this.props.children}
        </View>
      )
    }

    return (
      <View className={classNames(cls, className)}>
        <View className={`${cls}__wrap`}>
          <View
            className={`${cls}__wrap-bg`}
            style={{
              backgroundImage: `url(${src})`,
              ...style
            }}
          />
        </View>
        <View className={`${cls}__content`}>{this.props.children}</View>
      </View>
    )
  }
}
