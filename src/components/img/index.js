/*
 * @Author: czy0729
 * @Date: 2019-02-28 06:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-10 04:33:53
 */
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

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
    onClick: null
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
    if (process.env.TARO_ENV === 'h5') {
      _style.backgroundImage = `url(${src})`
    }
    return (
      <View
        className={classNames(cls, className)}
        style={styles || style}
        onClick={onClick}
      >
        <Image
          className={classNames({
            [`${cls}--h5`]: process.env.TARO_ENV === 'h5'
          })}
          src={src}
          mode={mode}
          style={_style}
          lazyLoad
        />
      </View>
    )
  }
}
