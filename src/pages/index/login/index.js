/*
 * @Author: czy0729
 * @Date: 2019-02-27 06:28:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 18:04:13
 */
import Taro from '@tarojs/taro'
import Component from '@common/component'
import { Page, Btn, P } from '@components'
import './index.scss'

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
        <P type='sub' size={18} text='管理Bangumi观看进度' />
        <Btn
          className='mt-sm'
          type='ghost'
          text='现在登录'
          styles={{
            width: Taro.pxTransform(200)
          }}
          onClick={this.toLogin}
        />
      </Page>
    )
  }
}
