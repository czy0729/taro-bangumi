/*
 * @Author: czy0729
 * @Date: 2019-02-23 15:42:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-11 20:23:23
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Scroll } from '@components'
import Item from '../item'
import './index.scss'

const cls = 'home-list'

@inject('userStore')
@observer
export default class HomeList extends Component {
  render() {
    const { userStore } = this.props
    const collection = userStore.getUserCollection()
    return (
      <Scroll className={cls} showTabBar>
        <View className='p-vh'>
          {collection.map(item => (
            <Item
              key={item.subject_id}
              subjectId={item.subject_id}
              subject={item.subject}
              epStatus={item.ep_status}
            />
          ))}
        </View>
      </Scroll>
    )
  }
}
