/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:37:11
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Character } from '@components/app'
import { subjectStore } from '@stores'

const cls = 'subject-character'

@observer
export default class SubjectCharacter extends Component {
  get items() {
    const { subjectId } = this.props
    const { crt = [] } = subjectStore.getSubject(subjectId)
    return crt.map(({ id, images, name, name_cn, role_name, actors }) => ({
      id,
      image: images && images.grid,
      name: name_cn || name,
      desc: (actors && actors[0] && actors[0].name) || role_name
    }))
  }
  render() {
    return <Character className={cls} title='角色' items={this.items} />
  }
}
