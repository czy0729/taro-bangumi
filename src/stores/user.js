/*
 * 用户
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:50:17
 */
import { observable, computed } from 'mobx'
import fetch from '@utils/fetch'
import { APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import { API_USER_COLLECTION, API_USER_PROGRESS } from '@constants/api'
import common, { dev } from './common'

class User extends common {
  @observable state = {
    userInfo: {
      access_token: '',
      expires_in: 0,
      refresh_token: '',
      scope: null,
      token_type: 'Bearer',
      user_id: 456208,
      _loaded: true
    },
    userCollection: {},
    userProgress: {}
  }

  // -------------------- get --------------------
  /**
   * 取是否登录
   */
  @computed get isLogin() {
    return !!this.state.userInfo.access_token
  }

  /**
   * 取自己用户Id
   */
  @computed get myUserId() {
    return this.state.userInfo.user_id
  }

  /**
   * 取自己用户信息
   */
  @computed get getUserInfo() {
    return this.state.userInfo
  }

  /**
   * 取某人的在看收藏
   * @param {*} userId
   */
  getUserCollection(userId = this.myUserId) {
    return computed(() => this.state.userCollection[userId] || {}).get()
  }

  /**
   * 取某人的观看进度
   * @param {*} subjectId
   * @param {*} userId
   */
  getUserProgress(subjectId, userId = this.myUserId) {
    return computed(
      () => this.state.userProgress[`${subjectId}|${userId}`] || {}
    ).get()
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
  fetchUserCollection(userId = this.myUserId) {
    return this.fetch(
      `${API_USER_COLLECTION(userId)}?cat=watching&ids=243916`,
      ['userCollection', userId]
    )
  }

  /**
   * 获取某人的观看进度
   * @param {*} subjectId
   * @param {*} userId
   */
  async fetchUserProgress(subjectId, userId = this.myUserId) {
    const res = fetch({
      url: API_USER_PROGRESS(userId),
      payload: {
        subject_id: subjectId
      },
      retryCb: () => this.fetchUserProgress(subjectId, userId)
    })
    const data = await res

    // NOTE 当用户没有观看进度, API_USER_PROGRESS接口服务器直接返回非标准格式null
    // 不入库
    if (data) {
      const userProgress = {}

      // 扁平化
      data.eps.forEach(item => (userProgress[item.id] = item.status.cn_name))
      this.setState({
        userProgress: {
          [`${subjectId}|${userId}`]: userProgress
        }
      })
    }
    return res
  }
}

const Store = new User()
dev('user', Store)

export default Store
