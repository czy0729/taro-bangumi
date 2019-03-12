/*
 * @Author: czy0729
 * @Date: 2019-02-22 04:24:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 04:37:40
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { Button, Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-btn'

export default class Btn extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    type: 'plain',
    size: '',
    shadow: false,
    loading: false,
    disabled: false,
    text: '',
    onClick: Function.prototype
  }
  render() {
    const {
      className,
      style,
      styles,
      type,
      size,
      shadow,
      loading,
      disabled,
      text,
      onClick
    } = this.props
    return (
      <Button
        className={classNames(
          cls,
          {
            // NOTE Taro提供的Button带有paddingHorizontal而且不能通过padding重置
            [`${cls}--rn`]: process.env.TARO_ENV === 'rn',
            [`${cls}--${type}`]: type,
            [`${cls}--${size}`]: size,
            [`${cls}--shadow`]: shadow
          },
          className
        )}
        loading={loading}
        disabled={disabled}
        style={styles || style}
        onClick={onClick}
      >
        <Text
          className={classNames(`${cls}__text`, {
            [`${cls}__text--${type}`]: type,
            [`${cls}__text--${size}`]: size
          })}
        >
          {text || this.props.children}
        </Text>
      </Button>
    )
  }
}
