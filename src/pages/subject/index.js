/*
 * @Author: czy0729
 * @Date: 2019-02-28 04:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:56:13
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Scroll } from '@components'
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

@inject('subjectStore', 'userStore', 'collectionStore')
@observer
export default class Subject extends Component {
  config = {
    navigationBarTitleText: '条目'
  }
  componentWillMount() {
    this.subjectId = this.$router.params.subjectId
  }
  componentDidMount() {
    const { subjectStore, collectionStore, userStore } = this.props
    queue([
      () => subjectStore.fetchSubject(this.subjectId),
      () => subjectStore.fetchSubjectEp(this.subjectId),
      () => collectionStore.fetchCollection(this.subjectId),
      () => userStore.fetchUserProgress(this.subjectId)
    ])
  }
  render() {
    return (
      <View className={cls}>
        <Scroll>
          <Head subjectId={this.subjectId} />
          <Box subjectId={this.subjectId} />
          <Ep subjectId={this.subjectId} />
          <Summary subjectId={this.subjectId} />
          <Ranting subjectId={this.subjectId} />
          <Character subjectId={this.subjectId} />
          <Staff subjectId={this.subjectId} />
        </Scroll>
      </View>
    )
  }
}
