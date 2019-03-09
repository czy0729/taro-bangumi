/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 19:14:32
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Scroll } from '@components'
import List from './list'
import './index.scss'

const cls = 'search'

@inject('subjectStore')
@observer
export default class Search extends Component {
  config = {
    navigationBarTitleText: '发现'
  }
  componentDidMount() {
    const { subjectStore } = this.props
    subjectStore.fetchCalendar()
  }
  render() {
    return (
      <View className={cls}>
        <Scroll showTabBar>
          <List />
        </Scroll>
      </View>
    )
  }
}
