/*
 * @Author: czy0729
 * @Date: 2019-02-28 06:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 03:57:39
 */
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Component from '@components/component'
import { composeStyle } from '@utils/style'

const cls = 'c-image'

export default class _Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    mode: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    src: undefined,
    mode: 'aspectFill',
    width: undefined,
    height: undefined
  }
  render() {
    const { src, mode, width, height, className, style } = this.props
    const _style = {
      width: Taro.pxTransform(width),
      height: Taro.pxTransform(height || width)
    }
    return (
      <Image
        className={classNames(cls, className)}
        src={src}
        mode={mode}
        style={composeStyle(_style, style)}
      />
    )
  }
}
