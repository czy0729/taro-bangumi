/*
 * @Author: czy0729
 * @Date: 2019-02-28 22:00:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:11:00
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P } from '@components'
import { Eps } from '@components/app'
import './index.scss'

const cls = 'subject-ep'

@inject('subjectStore', 'userStore')
@observer
export default class SubjectEp extends Component {
  static defaultProps = {
    subjectId: null
  }
  render() {
    const { subjectId, subjectStore, userStore } = this.props
    const { eps = [] } = subjectStore.getSubjectEp(subjectId)
    const userProgress = userStore.getUserProgress(subjectId)
    return (
      <View className={`${cls} p-v p-l`}>
        <P size={24} text='章节' />
        <Eps className='mt-md' items={eps} userProgress={userProgress} />
      </View>
    )
  }
}
