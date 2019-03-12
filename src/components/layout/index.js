/*
 * @Author: czy0729
 * @Date: 2019-03-10 06:47:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 04:46:12
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@components/component'
import Menu from '@components/menu'
import { uiStore } from '@stores'
import './index.scss'

const cls = 'c-layout'

@observer
export default class Layout extends Component {
  static defaultProps = {
    className: '',
    styles: null
  }
  hidePopover = () => {
    uiStore.hidePopover()
  }
  contentClick = e => {
    e.stopPropagation()
  }
  render() {
    const { className, style, styles } = this.props
    const { popover } = uiStore

    let content
    if (popover.show && popover.content.component === 'Menu') {
      content = (
        <Menu
          title={popover.content.props.title}
          data={popover.content.props.data}
          width={popover.content.props.width}
          onClick={popover.content.props.onClick}
        />
      )
    }
    console.log(popover, content)
    return (
      <View className={classNames(cls, className)} style={styles || style}>
        {this.props.children}
        {popover.show && (
          <View className={`${cls}__popover`} onClick={this.hidePopover}>
            <View
              className={classNames(`${cls}__popover-content`, {
                [`${cls}__popover-content--${
                  popover.position
                }`]: popover.position
              })}
              style={this.composeStyle({
                top: popover.top,
                right: popover.right,
                bottom: popover.bottom,
                left: popover.left
              })}
              onClick={this.contentClick}
            >
              {content}
            </View>
          </View>
        )}
      </View>
    )
  }
}
