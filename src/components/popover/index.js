/*
 * @Author: czy0729
 * @Date: 2019-03-12 15:18:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-13 01:35:44
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@components/component'
import { getWindowHeight } from '@utils/style'
import './index.scss'

const cls = 'c-popover'

@observer
export default class Popover extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    show: false,
    showTabBar: false,
    contentStyle: {},
    contentPosition: 'left-bottom',
    onHide: () => {}
  }
  onContentClick = evt => {
    evt.stopPropagation()
  }
  render() {
    const {
      className,
      style,
      styles,
      show,
      showTabBar,
      contentStyle,
      contentPosition,
      onHide
    } = this.props
    if (!show) {
      return null
    }
    const _style = {
      height: getWindowHeight(showTabBar)
    }
    return (
      <View
        className={classNames(cls, className)}
        style={this.composeStyle(_style, styles || style)}
        onClick={onHide}
      >
        <View
          className={classNames(`${cls}__content`, {
            [`${cls}__content--${contentPosition}`]: contentPosition
          })}
          style={this.composeStyle(contentStyle)}
          onClick={this.onContentClick}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}
