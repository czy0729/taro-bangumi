/*
 * @Author: czy0729
 * @Date: 2019-02-28 19:36:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:35:13
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, Span, Btn } from '@components'
import { collectionStore } from '@stores'

const cls = 'subject-box'

@observer
export default class SubjectBox extends Component {
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
    const { subjectId } = this.props
    const {
      status = { name: '未收藏' },
      tag = []
    } = collectionStore.getCollection(subjectId)
    return (
      <Div className={cls} wrap='inner'>
        <Span size={24}>收藏盒</Span>
        <Btn className='mt-md' type={this.getType(status.name)} shadow>
          {status.name}
        </Btn>
        {!!tag.length && (
          <Div className='mt-sm'>
            <Span size={14} type='sub'>
              {tag.join(' / ')}
            </Span>
          </Div>
        )}
      </Div>
    )
  }
}
