/*
 * @Author: czy0729
 * @Date: 2019-02-28 19:36:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:06:45
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P, Btn } from '@components'
import './index.scss'

const cls = 'subject-box'

@inject('collectionStore')
@observer
export default class SubjectBox extends Component {
  static defaultProps = {
    subjectId: null
  }
  getType = name => {
    switch (name) {
      case '想看':
        return 'main'
      case '看过':
        return 'warning'
      case '在看':
        return 'primary'
      case '搁置':
        return 'wait'
      case '抛弃':
        return 'disabled'
      default:
        return 'plain'
    }
  }
  render() {
    const { subjectId, collectionStore } = this.props
    const {
      status = { name: '未收藏' },
      tag = []
    } = collectionStore.getCollection(subjectId)
    return (
      <View className={`${cls} p-vh`}>
        <P size={24} text='收藏盒' />
        <Btn
          className='mt-md'
          type={this.getType(status.name)}
          shadow
          text={status.name}
        />
        {!!tag.length && (
          <P className='mt-sm' size={14} type='sub' text={tag.join(' / ')} />
        )}
      </View>
    )
  }
}
