/*
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-03 01:01:12
 */
import { observable, computed } from 'mobx'
import { API_COLLECTION } from '@constants/api'
import common, { dev } from './common'

class Collection extends common {
  @observable state = {
    collection: {}
  }

  // -------------------- get --------------------
  /**
   * 条目收藏信息
   * @param {*} subjectId
   */
  getCollection(subjectId) {
    return computed(() => this.state.collection[subjectId] || {}).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取指定条目收藏信息
   * @param {*} subjectId
   */
  fetchCollection(subjectId) {
    return this.fetch(API_COLLECTION(subjectId), ['collection', subjectId])
  }
}

const Store = new Collection()
dev('collection', Store)

export default Store
