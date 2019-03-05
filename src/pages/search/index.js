/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:06:27
 */
import Taro, { Component } from '@tarojs/taro'
import { Div, Scroll } from '@components'
import { subjectStore } from '@stores'
import List from './list'
import './index.scss'

const cls = 'search'

export default class Search extends Component {
  config = {
    navigationBarTitleText: '发现'
  }
  componentDidMount() {
    subjectStore.fetchCalendar()
  }
  render() {
    return (
      <Div className={cls}>
        <Scroll showTabBar>
          <List />
        </Scroll>
      </Div>
    )
  }
}
