/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 22:14:26
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import Component from '@common/component'
import { Character } from '@components/app'

const cls = 'subject-character'

@inject('subjectStore')
@observer
export default class SubjectCharacter extends Component {
  static defaultProps = {
    subjectId: null
  }
  get items() {
    const { subjectId, subjectStore } = this.props
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
