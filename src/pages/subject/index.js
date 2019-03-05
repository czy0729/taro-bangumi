/*
 * @Author: czy0729
 * @Date: 2019-02-28 04:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:31:02
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, Scroll } from '@components'
import { subjectStore, userStore, collectionStore } from '@stores'
import { queue } from '@utils/fetch'
import Head from './head'
import Box from './box'
import Ep from './ep'
import Summary from './summary'
import Ranting from './ranting'
import Character from './character'
import Staff from './staff'
import './index.scss'

const cls = 'subject'

@observer
export default class Subject extends Component {
  config = {
    navigationBarTitleText: '条目'
  }
  componentWillMount() {
    this.subjectId = this.$router.params.subjectId
  }
  componentDidMount() {
    queue([
      () => subjectStore.fetchSubject(this.subjectId),
      () => subjectStore.fetchSubjectEp(this.subjectId),
      () => collectionStore.fetchCollection(this.subjectId),
      () => userStore.fetchUserProgress(this.subjectId)
    ])
  }
  render() {
    return (
      <Div className={cls}>
        <Scroll>
          <Head subjectId={this.subjectId} />
          <Box subjectId={this.subjectId} />
          <Ep subjectId={this.subjectId} />
          <Summary subjectId={this.subjectId} />
          <Ranting subjectId={this.subjectId} />
          <Character subjectId={this.subjectId} />
          <Staff subjectId={this.subjectId} />
        </Scroll>
      </Div>
    )
  }
}
