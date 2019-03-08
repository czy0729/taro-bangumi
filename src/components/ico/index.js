/*
 * @Author: czy0729
 * @Date: 2019-03-06 02:19:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 05:33:32
 */
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components'
import Component from '@components/component'
import classNames from 'classnames'
import Check from './assets/check.png'
import Expand from './assets/expand.png'
import ExpandActive from './assets/expand-active.png'
import Favor from './assets/favor.png'
import FavorActive from './assets/favor-active.png'

const cls = 'c-ico'
const assets = {
  check: Check,
  expand: Expand,
  'expand-active': ExpandActive,
  favor: Favor,
  'favor-active': FavorActive
}

export default class Ico extends Component {
  static defaultProps = {
    type: '',
    size: 32,
    className: ''
  }
  render() {
    const { type, size, className } = this.props
    const style = {
      width: Taro.pxTransform(size),
      height: Taro.pxTransform(size)
    }
    return (
      <Image
        className={classNames(cls, className)}
        src={assets[type]}
        style={style}
      />
    )
  }
}
