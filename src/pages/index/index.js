/*
 * @Author: czy0729
 * @Date: 2019-02-23 15:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:55:09
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div } from '@components'
import { userStore } from '@stores'
import Login from './login'
import List from './list'
import './index.scss'

const prefixCls = 'home'

@observer
export default class Home extends Component {
  config = {
    navigationBarTitleText: '进度管理'
  }
  componentDidMount() {
    if (userStore.isLogin) {
      userStore.fetchCollection()
      userStore.getUserProgress()
    }
  }
  render() {
    if (!userStore.isLogin) {
      return <Login />
    }
    return (
      <Div className={prefixCls}>
        <List />
      </Div>
    )
  }
}
