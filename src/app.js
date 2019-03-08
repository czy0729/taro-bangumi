/*
 * @Author: czy0729
 * @Date: 2019-02-21 00:22:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 00:39:18
 */
import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import { collectionStore, subjectStore, userStore } from '@stores'
import Home from './pages/search'
import './app.scss'

const store = {
  collectionStore,
  subjectStore,
  userStore
}

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
      'pages/search/index',
      'pages/subject/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Bangumi',
      navigationBarTextStyle: 'black',
      backgroundColor: '#f7f7f7'
    },
    tabBar: {
      color: '#666',
      selectedColor: '#b4282d',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: './assets/tabBar/bangumi.png',
          selectedIconPath: './assets/tabBar/bangumi-active.png',
          text: '发现'
        },
        {
          pagePath: 'pages/search/index',
          iconPath: './assets/tabBar/bangumi.png',
          selectedIconPath: './assets/tabBar/bangumi-active.png',
          text: '进度管理'
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
