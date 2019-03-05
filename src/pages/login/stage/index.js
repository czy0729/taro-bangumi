/*
 * @Author: czy0729
 * @Date: 2019-02-23 05:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 05:05:11
 */
import Taro, { Component } from '@tarojs/taro'
import { Page, Img, Btn } from '@components'
import compose from './assets/compose.png'

const cls = 'login-stage'

export default class LoginStage extends Component {
  render() {
    const { onLogin, onTour } = this.props
    return (
      <Page className={cls}>
        <Img width={320} height={256} src={compose} />
        <Btn
          className='mt-md'
          type='main'
          style={{
            width: Taro.pxTransform(400),
          }}
          onClick={onLogin}
        >
          登录
        </Btn>
        <Btn
          className='mt-sm'
          type='plain'
          style={{
            width: Taro.pxTransform(400),
          }}
          onClick={onTour}
        >
          游客访问
        </Btn>
      </Page>
    )
  }
}
