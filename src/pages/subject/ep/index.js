/*
 * @Author: czy0729
 * @Date: 2019-02-28 22:00:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:52:57
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, P } from '@components'
import { Eps } from '@components/app'
import { subjectStore, userStore } from '@stores'

const cls = 'subject-ep'

@observer
export default class SubjectEp extends Component {
  render() {
    const { subjectId } = this.props
    const { eps = [] } = subjectStore.getSubjectEp(subjectId)
    const userProgress = userStore.getUserProgress(subjectId)
    return (
      <Div className={cls} wrap='inner-no-side'>
        <P size={24}>章节</P>
        <Eps className='mt-md' items={eps} userProgress={userProgress} />
      </Div>
    )
  }
}
