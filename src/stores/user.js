/*
 * 用户
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 00:54:23
 */
import { observable, computed } from 'mobx'
import fetch from '@utils/fetch'
import { APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import { API_USER_COLLECTION, API_USER_PROGRESS } from '@constants/api'
import common, { dev } from './common'

class User extends common {
  @observable state = {
    userInfo: {
      access_token: '486828fff084d92c5062661f0c9c86f88e0d8f3c',
      expires_in: 604800,
      token_type: 'Bearer',
      scope: null,
      user_id: 456208,
      refresh_token: '1d57ed8e5f3ab8c20d9687d8be1b7dd77a92b58a',
      _loaded: true
    },
    userCollection: {},
    userProgress: {}
  }

  // -------------------- get --------------------
  /**
   * 取自己用户信息
   */
  getUserInfo() {
    return this.state.userInfo
  }

  /**
   * 取某人的在看收藏
   * @param {*} userId
   */
  getUserCollection(userId = this.getMyUserId()) {
    return computed(() => this.state.userCollection[userId] || []).get()
  }

  /**
   * 取某人的收视进度
   * @param {*} subjectId
   * @param {*} userId
   */
  getUserProgress(subjectId, userId = this.getMyUserId()) {
    return computed(
      () => this.state.userProgress[`${userId}|${subjectId}`] || {}
    ).get()
  }

  /**
   * 取自己用户Id
   */
  getMyUserId() {
    return this.getUserInfo().user_id
  }

  /**
   * 取是否登录
   */
  isLogin() {
    return !!this.getUserInfo().access_token
  }

  // -------------------- fetch --------------------
  /**
   * oauth获取access_token
   * @param {*} code 回调获取的 code
   */
  fetchAccessToken(code) {
    return this.fetch(
      {
        method: 'POST',
        url: 'https://bgm.tv/oauth/access_token',
        payload: {
          grant_type: 'authorization_code',
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code,
          redirect_uri: OAUTH_REDIRECT_URL
        }
      },
      'userInfo'
    )
  }

  /**
   * 获取某人的在看收藏
   * @param {*} userId
   */
  fetchUserCollection(userId = this.getMyUserId()) {
    return this.fetch(
      `${API_USER_COLLECTION(userId)}?cat=watching&ids=243916`,
      ['userCollection', userId]
    )
  }

  /**
   * 获取某人的收视进度
   * @param {*} subjectId
   * @param {*} userId
   */
  async fetchUserProgress(subjectId, userId = this.getMyUserId()) {
    const config = {
      url: API_USER_PROGRESS(userId),
      payload: {},
      retryCb: () => this.fetchUserProgress(subjectId, userId)
    }
    if (subjectId) {
      config.payload.subject_id = subjectId
    }
    const res = fetch(config)
    const data = await res

    // NOTE 当用户没有收视进度, API_USER_PROGRESS接口服务器直接返回null
    // 注意请求单个返回对象, 多个返回数组
    if (data) {
      // 统一结构
      const _data = Array.isArray(data) ? data : [data]

      // 扁平化
      _data.forEach(item => {
        const userProgress = {}
        item.eps.forEach(i => (userProgress[i.id] = i.status.cn_name))
        this.setState({
          userProgress: {
            [`${userId}|${item.subject_id}`]: userProgress
          }
        })
      })
    }
    return res
  }
}

const Store = new User()
dev('user', Store)

export default Store
