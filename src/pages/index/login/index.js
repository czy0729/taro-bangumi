/*
 * @Author: czy0729
 * @Date: 2019-02-27 06:28:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:49:49
 */
import Taro, { Component } from '@tarojs/taro'
import { Page, Btn, Span } from '@components'

const cls = 'home-login'

export default class HomeLogin extends Component {
  toLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  render() {
    return (
      <Page className={cls}>
        <Span type='sub' size={18}>
          使用Bangumi管理观看进度
        </Span>
        <Btn
          className='mt-sm'
          type='ghost'
          style={{
            width: Taro.pxTransform(200)
          }}
          onClick={this.toLogin}
        >
          现在登录
        </Btn>
      </Page>
    )
  }
}
