/*
 * @Author: czy0729
 * @Date: 2019-03-10 06:43:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 04:48:38
 */
import Taro from '@tarojs/taro'
import { observable, computed } from 'mobx'
import { getWindowHeight } from '@utils/style'
import common, { dev } from './common'

const initPopover = {
  show: false,
  top: 0,
  left: 0,
  position: '',
  content: {
    name: '',
    props: {},
    onClick: Function.prototype
  }
}

class UI extends common {
  @observable state = {
    popover: initPopover
  }

  @computed get popover() {
    return this.state.popover
  }

  showPopover = (e, data, showTabBar) => {
    // let {
    //   pageX,
    //   pageY,
    //   layerX,
    //   layerY,
    //   currentTarget: { offsetWidth, offsetHeight }
    // } = e
    console.log(e)
    // if (process.env.TARO_ENV === 'weapp') {
    //   pageX = e.detail.x
    //   pageY = e.detail.y
    //   layerX = e.target.offsetLeft
    //   layerY = e.target.offsetTop
    //   offsetWidth = data.weapp.offsetWidth
    //   offsetHeight = data.weapp.offsetHeight
    // }
    // const popover = {
    //   show: true,
    //   content: {
    //     component: data.component,
    //     props: data.props
    //   }
    // }

    // // 以点击元素左下角的点坐标, 判断放置方向
    // const { windowWidth } = Taro.getSystemInfoSync()
    // const windowHeight = getWindowHeight(showTabBar)
    // const left = pageX - layerX
    // if (left <= windowWidth / 2) {
    //   popover.left = `${left}PX`
    //   popover.right = 'auto'
    //   popover.position = 'left'
    // } else {
    //   popover.right = `${windowWidth - pageX + layerX - offsetWidth}PX`
    //   popover.left = 'auto'
    //   popover.position = 'right'
    // }

    // const bottom = pageY + offsetHeight - layerY
    // if (bottom <= windowHeight / 2) {
    //   popover.top = `${bottom}PX`
    //   popover.bottom = 'auto'
    //   popover.position = popover.position + '-bottom'
    // } else {
    //   popover.bottom = `${windowHeight - pageY + layerY}PX`
    //   popover.top = 'auto'
    //   popover.position = popover.position + '-top'
    // }

    // this.setState({ popover })

    this.setState({
      popover: {
        show: true,
        content: {
          component: 'Menu',
          props: {
            title: [`ep.1 123123`, `123123 讨论数：123123`],
            data: ['看过', '看到', '本集讨论'],
            width: Taro.pxTransform(376),
            onClick: index => {
              this.hidePopover()
              console.log(index)
            }
          }
        },
        top: 100,
        left: 100
      }
    })
  }

  hidePopover = () => {
    this.setState({
      popover: initPopover
    })
  }
}

const Store = new UI()
dev('ui', Store)

export default Store
