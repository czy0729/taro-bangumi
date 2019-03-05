/*
 * @Author: czy0729
 * @Date: 2019-02-21 20:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-06 00:12:55
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, Web } from '@components'
import { ENV, APP_ID, OAUTH_URL, OAUTH_REDIRECT_URL } from '@constants'
import { userStore } from '@stores'
import { jump } from '@utils'
import Stage from './stage'

const cls = 'login'
const oauthUrl = `${OAUTH_URL}?response_type=code&client_id=${APP_ID}&redirect_uri=${OAUTH_REDIRECT_URL}`

@observer
export default class Login extends Component {
  config = {
    navigationBarTitleText: '登陆'
  }
  state = {
    clicked: false
  }
  onTour = () => {
    Taro.navigateBack()
  }
  onLogin = () => {
    if (ENV.H5) {
      // H5直接跳转
      window.location = oauthUrl
    } else if (ENV.RN) {
      // RN通过检测webview的url变化获取请求code的时机
      this.setState({
        clicked: true
      })
    } else {
      console.log('适配中')
    }
  }
  onNavigationStateChange = async ({ url = '', canGoBack }) => {
    if (canGoBack && url.indexOf(`${OAUTH_REDIRECT_URL}?`) === 0) {
      const code = url.replace(`${OAUTH_REDIRECT_URL}?code=`, '')
      if (code) {
        await userStore.fetchAccessToken(code)
        jump({ url: '/pages/index/index', method: 'switchTab' })
      }
    }
  }
  render() {
    const { clicked } = this.state
    if (!clicked) {
      return <Stage onLogin={this.onLogin} onTour={this.onTour} />
    }
    return (
      <Div className={cls}>
        <Web
          src={oauthUrl}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </Div>
    )
  }
}
