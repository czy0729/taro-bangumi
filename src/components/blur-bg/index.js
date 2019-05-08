/*
 * @Author: czy0729
 * @Date: 2019-02-28 07:08:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-13 02:50:27
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-blur-bg'
const backgroundColor = {
  dark: 'rgba(0, 0, 0, 0.16)',
  light: 'rgba(255, 255, 255, 0.16)',
  xlight: 'rgba(255, 255, 255, 0.84)'
}
const ImageRN = process.env.TARO_ENV === 'rn' ? require('./rn').default : null

export default class BlurBg extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    theme: 'dark',
    src: ''
  }
  render() {
    const { className, style, styles, theme, src } = this.props

    if (process.env.TARO_ENV === 'rn') {
      return (
        <View className={classNames(cls, className)} style={styles || style}>
          {src && (
            <ImageRN
              src={src}
              blurRadius={10}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }}
            />
          )}
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: backgroundColor[theme]
            }}
          />
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
