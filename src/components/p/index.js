/*
 * @Author: czy0729
 * @Date: 2019-02-27 23:37:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 07:40:51
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ENV } from '@constants'
import './index.scss'

const cls = 'c-p'

export default class P extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.oneOf([
      'plain',
      'desc',
      'sub',
      'main',
      'primary',
      'success',
      'danger',
      'warning'
    ]),
    size: PropTypes.number,
    lineHeight: PropTypes.number
  }
  static defaultProps = {
    className: '',
    styles: null,
    type: null,
    size: 14,
    lineHeight: null
  }
  render() {
    const { className, style, styles, type, size, lineHeight } = this.props
    let _style

    // 小于等于2的lineHeight用作比率
    if (lineHeight) {
      _style = {
        lineHeight: Taro.pxTransform(
          lineHeight <= 2 ? 2 * size * lineHeight : 2.86 * lineHeight
        )
      }
    }

    if (ENV.RN) {
      return (
        <Text
          className={classNames(
            cls,
            {
              [`${cls}--${type}`]: type,
              [`${cls}--${size}`]: size
            },
            className
          )}
          style={this.composeStyle(_style, styles || style)}
        >
          {this.props.children}
        </Text>
      )
    }

    // H5和小程序Text不是块, 模拟跟RN保持一致
    return (
      <View className={className}>
        <Text
          className={classNames(cls, {
            [`${cls}--${type}`]: type,
            [`${cls}--${size}`]: size
          })}
          style={this.composeStyle(_style, styles || style)}
        >
          {this.props.children}
        </Text>
      </View>
    )
  }
}
