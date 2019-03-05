/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:12:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:38:16
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Character } from '@components/app'
import { subjectStore } from '@stores'

const cls = 'subject-staff'
const defaultSrc = 'https://bangumi.tv/img/info_only.png'

@observer
export default class SubjectStaff extends Component {
  get items() {
    const { subjectId } = this.props
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
