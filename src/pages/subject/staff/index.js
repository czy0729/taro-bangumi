/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:12:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 22:15:44
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import Component from '@common/component'
import { Character } from '@components/app'

const cls = 'subject-staff'
const defaultSrc = 'https://bangumi.tv/img/info_only.png'

@inject('subjectStore')
@observer
export default class SubjectStaff extends Component {
  static defaultProps = {
    subjectId: null
  }
  get items() {
    const { subjectId, subjectStore } = this.props
    const { staff = [] } = subjectStore.getSubject(subjectId)
    return staff.map(({ id, images = {}, name, name_cn, jobs = [] }) => ({
      id: id,
      image: (images && images.grid) || defaultSrc,
      name: name_cn || name,
      desc: jobs[0]
    }))
  }
  render() {
    return <Character className={cls} title='制作人员' items={this.items} />
  }
}
