/*
 * @Author: czy0729
 * @Date: 2019-03-12 15:18:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-13 01:32:45
 */
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import Component from '@common/component'
import { Popover, Menu } from '@components'
import { uiStore } from '@stores'

const cls = 'home-menu'

@observer
export default class HomeMenu extends Component {
  static defaultProps = {}
  onHide = () => {
    uiStore.hidePopover()
  }
  render() {
    const { popover } = uiStore
    const { props = {} } = popover
    return (
      <Popover
        className={cls}
        show={popover.show}
        showTabBar
        contentStyle={popover.contentStyle}
        contentPosition={popover.contentPosition}
        onHide={this.onHide}
      >
        <Menu
          title={props.title}
          data={props.data}
          width={props.width}
          onClick={props.onClick}
        />
      </Popover>
    )
  }
}
