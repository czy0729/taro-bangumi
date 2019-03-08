/*
 * @Author: czy0729
 * @Date: 2019-03-01 12:25:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:54:02
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, P } from '@components'
import { subjectStore } from '@stores'

const cls = 'subject-summary'

@observer
export default class SubjectSummary extends Component {
  render() {
    const { subjectId } = this.props
    const { summary } = subjectStore.getSubject(subjectId)
    return (
      <Div className={cls} wrap='inner'>
        <P size={24}>简介</P>
        <P className='mt-sm' type='desc' size={16} lineHeight={32}>
          {summary}
        </P>
      </Div>
    )
  }
}
