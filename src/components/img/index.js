/*
 * @Author: czy0729
 * @Date: 2019-02-28 06:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 07:30:27
 */
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import Component from '@components/component'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const cls = 'c-img'

export default class Img extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    src: PropTypes.string,
    mode: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: '',
    styles: null,
    src: '',
    mode: 'aspectFill',
    width: null,
    height: null,
    onClick: Function.prototype
  }
  render() {
    const {
      className,
      style,
      styles,
      src,
      mode,
      width,
      height,
      onClick
    } = this.props
    const _style = {
      width: Taro.pxTransform(width),
      height: Taro.pxTransform(height || width)
    }
    return (
      <Image
        className={classNames(cls, className)}
        src={src}
        mode={mode}
        style={this.composeStyle(_style, styles || style)}
        onClick={onClick}
      />
    )
  }
}
