/*
 * 条目
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-06 04:01:49
 */
import { observable, computed } from 'mobx'
import { API_SUBJECT, API_SUBJECT_EP, API_CALENDAR } from '@constants/api'
import common, { dev } from './common'

class Subject extends common {
  @observable state = {
    subject: {},
    subjectEp: {},
    calendar: []
  }

  // -------------------- get --------------------
  /**
   * 取条目信息
   * @param {*} subjectId
   */
  getSubject(subjectId) {
    return computed(() => this.state.subject[subjectId] || {}).get()
  }

  /**
   * 取章节数据
   * @param {*} subjectId
   */
  getSubjectEp(subjectId) {
    return computed(() => this.state.subjectEp[subjectId] || {}).get()
  }

  /**
   * 取每日放送
   */
  @computed get getCalendar() {
    return this.state.calendar
  }

  // -------------------- fetch --------------------
  /**
   * 条目信息
   * @param {*} subjectId
   */
  fetchSubject(subjectId) {
    return this.fetch(
      {
        url: API_SUBJECT(subjectId),
        payload: {
          responseGroup: 'large'
        }
      },
      ['subject', subjectId]
    )
  }

  /**
   * 章节数据
   * @param {*} subjectId
   */
  fetchSubjectEp(subjectId) {
    return this.fetch(API_SUBJECT_EP(subjectId), ['subjectEp', subjectId])
  }

  /**
   * 每日放送
   */
  fetchCalendar() {
    return this.fetch(API_CALENDAR(), 'calendar')
  }
}

const Store = new Subject()
dev('subject', Store)

export default Store
