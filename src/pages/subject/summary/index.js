/*
 * @Author: czy0729
 * @Date: 2019-03-01 12:25:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 18:57:41
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P } from '@components'
import './index.scss'

const cls = 'subject-summary'

@inject('subjectStore')
@observer
export default class SubjectSummary extends Component {
  static defaultProps = {
    subjectId: null
  }
  render() {
    const { subjectId, subjectStore } = this.props
    const { name, summary } = subjectStore.getSubject(subjectId)
    return (
      <View className={`${cls} p-vh`}>
        <P size={24} text='简介' />
        <P
          className='mt-sm'
          type='desc'
          size={16}
          lineHeight={28}
          text={name ? summary || '(空)' : summary}
        />
      </View>
    )
  }
}
