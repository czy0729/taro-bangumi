/*
 * @Author: czy0729
 * @Date: 2019-02-23 15:42:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:55:21
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Scroll } from '@components'
import { userStore } from '@stores'
import Item from '../item'
import './index.scss'

const cls = 'home-list'

@observer
export default class HomeList extends Component {
  render() {
    const { myCollection } = userStore
    return (
      <Scroll className={cls} showTabBar>
        {myCollection.map((item, index) => (
          <Item
            key={item.subject_id}
            subjectId={item.subject_id}
            subject={item.subject}
            index={index}
          />
        ))}
      </Scroll>
    )
  }
}
