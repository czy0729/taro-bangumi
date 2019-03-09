/*
 * @Author: czy0729
 * @Date: 2019-02-23 05:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 19:03:47
 */
import Taro from '@tarojs/taro'
import Component from '@common/component'
import { Page, Img, Btn } from '@components'
import compose from './assets/compose.png'
import './index.scss'

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
          text='登录'
          styles={{
            width: Taro.pxTransform(400)
          }}
          onClick={onLogin}
        />
        <Btn
          className='mt-sm'
          type='plain'
          text='游客访问'
          styles={{
            width: Taro.pxTransform(400)
          }}
          onClick={onTour}
        />
      </Page>
    )
  }
}
