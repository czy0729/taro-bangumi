/*
 * @Author: czy0729
 * @Date: 2019-02-27 06:28:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 04:29:32
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
        <P type='sub' size={18}>
          管理Bangumi观看进度
        </P>
        <Btn
          className='mt-sm'
          type='ghost'
          styles={{
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
