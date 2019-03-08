/**
 * React Native 原生组件
 * @Author: czy0729
 * @Date: 2019-02-21 19:51:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-02-22 00:32:17
 */
import Taro, { Component } from '@tarojs/taro'
import { WebView } from 'react-native'

export default class WebViewRN extends Component {
  render() {
    return (
      <WebView
        style={{ height: '100%' }}
        originWhitelist={['*']}
        source={{ uri: this.props.src }}
        onNavigationStateChange={this.props.onNavigationStateChange}
      />
    )
  }
}
