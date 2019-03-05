/*
 * @Author: czy0729
 * @Date: 2019-02-21 19:57:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-04 18:24:59
 */
import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import Component from '@components/component'
import View from '@components/view'
import './index.scss'

const prefixCls = 'c-web-view'

/**
 * // NOTE Taro 的 RN 端还未提供 WebView 组件，这种情况需要自己根据环境引入原生组件
 * 要注意引入写法，按如下方式才行，这样只会在相应环境引入，其他环境不会引入
 */
const WebViewRN = process.env.TARO_ENV === 'rn' ? require('./rn').default : null

export default class _WebView extends Component {
  render() {
    const { src, onNavigationStateChange } = this.props
    return (
      <View className={prefixCls}>
        {process.env.TARO_ENV === 'rn' ? (
          <WebViewRN
            src={src}
            onNavigationStateChange={onNavigationStateChange}
          />
        ) : (
          <WebView src={src} />
        )}
      </View>
    )
  }
}
