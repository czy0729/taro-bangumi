/*
 * @Author: czy0729
 * @Date: 2019-02-28 07:08:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 07:28:31
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-blur-bg'

export default class BlurBg extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    theme: 'dark',
    src: ''
  }
  render() {
    const { className, style, styles, theme, src } = this.props

    // TODO RN
    if (process.env.TARO_ENV === 'rn') {
      return (
        <View className={classNames(cls, className)} style={styles || style}>
          {this.props.children}
        </View>
      )
    }

    return (
      <View className={classNames(cls, className)}>
        <View
          className={classNames(`${cls}__wrap`, {
            [`${cls}__wrap--${theme}`]: theme
          })}
        >
          <View
            className={`${cls}__wrap-bg`}
            style={{
              backgroundImage: `url(${src})`,
              ...(styles || style)
            }}
          />
        </View>
        <View className={`${cls}__content`}>{this.props.children}</View>
      </View>
    )
  }
}
