/*
 * @Author: czy0729
 * @Date: 2019-02-27 23:37:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 02:21:58
 */
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from '@components/component'
import './index.scss'

const rootClassName = 'c-text'

export default class _Text extends Component {
  static propTypes = {
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
    color: undefined,
    size: 14,
    lineHeight: undefined
  }
  render() {
    const { type, size, lineHeight, style } = this.props
    let _style
    if (lineHeight) {
      _style = {
        lineHeight: Taro.pxTransform(lineHeight * 2)
      }
    }
    return (
      <Text
        className={classNames(
          rootClassName,
          {
            [`${rootClassName}--${type}`]: type,
            [`${rootClassName}--${size}`]: size
          },
          this.props.className
        )}
        style={this.composeStyle(_style, style)}
      >
        {this.props.children}
      </Text>
    )
  }
}
