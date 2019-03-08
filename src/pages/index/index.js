/*
 * @Author: czy0729
 * @Date: 2019-02-23 15:41:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 04:33:31
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Loading } from '@components'
import { sleep } from '@utils'
import Login from './login'
import List from './list'

const cls = 'home'

@inject('userStore', 'subjectStore')
@observer
export default class Home extends Component {
  config = {
    navigationBarTitleText: '进度管理'
  }
  state = {
    loading: true
  }
  async componentDidMount() {
    const { userStore, subjectStore } = this.props
    if (userStore.isLogin()) {
      const data = await Promise.all([
        userStore.fetchUserCollection(),
        userStore.fetchUserProgress()
      ])
      if (data[1]) {
        // 由于Bangumi没提供一次性查询多个章节信息的Api
        // 暂时只能每一项都发一次请求
        for (const item of data[1]) {
          await subjectStore.fetchSubjectEp(item.subject_id)
          await sleep(100)
        }
      }
    }
    this.setState({
      loading: false
    })
  }
  render() {
    const { userStore } = this.props
    if (!userStore.isLogin()) {
      return <Login />
    }

    const { loading } = this.state
    if (loading) {
      return <Loading />
    }

    return (
      <View className={cls}>
        <List />
      </View>
    )
  }
}
