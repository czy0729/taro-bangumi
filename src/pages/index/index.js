/*
 * @Author: czy0729
 * @Date: 2019-02-23 15:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 15:50:50
 */
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Loading } from '@components'
import { userStore, subjectStore } from '@stores'
import { sleep } from '@utils'
import Login from './login'
import List from './list'
import Menu from './menu'
import './index.scss'

const cls = 'home'

@observer
export default class Home extends Component {
  config = {
    navigationBarTitleText: '进度管理'
  }
  state = {
    loading: true
  }
  async componentDidMount() {
    const { isLogin } = userStore
    if (isLogin) {
      const data = await Promise.all([
        userStore.fetchUserCollection(),
        userStore.fetchUserProgress()
      ])
      this.setState({
        loading: false
      })

      if (data[1]) {
        // 由于Bangumi没提供一次性查询多个章节信息的Api
        // 暂时只能每一项都发一次请求
        for (const item of data[1]) {
          await subjectStore.fetchSubjectEp(item.subject_id)
          await sleep(100)
        }
      }
    }
  }
  render() {
    const { isLogin } = userStore
    const { loading } = this.state
    return (
      <View className={cls}>
        {isLogin ? loading ? <Loading /> : <List /> : <Login />}
        <Menu />
      </View>
    )
  }
}
