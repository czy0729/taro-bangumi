/*
 * @Author: czy0729
 * @Date: 2019-02-22 04:24:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:35:45
 */
import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'
import classNames from 'classnames'
import Component from '@components/component'
import Text from '@components/text'
import './index.scss'

const cls = 'c-button'

export default class _Button extends Component {
  static defaultProps = {
    type: 'plain',
    size: undefined,
    loading: false,
    disabled: false,
    onClick: () => {}
  }
  render() {
    const {
      className,
      style,
      type,
      size,
      shadow,
      loading,
      disabled,
      onClick
    } = this.props

    // NOTE Taro提供的Button带有paddingHorizontal而且不能通过padding重置
    let _style
    if (process.env.TARO_ENV === 'rn') {
      _style = {
        paddingHorizontal: 0
      }
    }

    return (
      <Button
        className={classNames(
          cls,
          {
            [`${cls}--${type}`]: type,
            [`${cls}--${size}`]: size,
            [`${cls}--shadow`]: shadow
          },
          className
        )}
        loading={loading}
        disabled={disabled}
        style={this.composeStyle(_style, style)}
        onClick={onClick}
      >
        <Text
          className={classNames(`${cls}__text`, {
            [`${cls}__text--${type}`]: type,
            [`${cls}__text--${size}`]: size
          })}
        >
          {this.props.children}
        </Text>
      </Button>
    )
  }
}
