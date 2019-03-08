/*
 * @Author: czy0729
 * @Date: 2019-02-26 02:16:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 00:54:17
 */
import Taro from '@tarojs/taro'
import { userStore } from '@stores'
import { APP_ID } from '@constants'
import { urlStringify, sleep, log } from './index'

const STATUS_SUCCESS = 200
const STATUS_ACCEPTED = 202
const STATUS_NOT_MODIFIED = 304
// const STATUS_BAD_REQUEST = 400
// const STATUS_UNAUTHORIZED = 401
// const STATUS_NOT_FOUND = 404
// const STATUS_METHOD_NOT_ALLOWED = 405

/**
 * 统一请求方法
 * 若GET请求异常, 500ms后重试retryCb, 直到成功
 * @version 190303 1.2
 * @param {*} param
 */
const retryCount = {}
export default function fetch({ url, payload = {}, method = 'GET', retryCb }) {
  const { token_type, access_token } = userStore.getUserInfo()
  const header = {
    Authorization: `${token_type} ${access_token}`
  }
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  const config = {
    url,
    header,
    method,
    data: {
      app_id: APP_ID,
      ...payload
    }
  }

  return Taro.request(config)
    .then(({ statusCode, data }) => {
      if (
        statusCode === STATUS_SUCCESS ||
        statusCode === STATUS_ACCEPTED ||
        statusCode === STATUS_NOT_MODIFIED
      ) {
        // 成功后清除失败计数
        const key = `${url}|${urlStringify(payload)}`
        if (retryCount[key]) {
          retryCount[key] = 0
        }
        return data
      }
      return Promise.reject(statusCode)
    })
    .catch(async err => {
      // NOTE Bangumi的接口代理经常报错, 我也就只能一直请求到成功为止了hhh
      if (method === 'GET' && typeof retryCb === 'function') {
        await sleep(500)

        const key = `${url}|${urlStringify(payload)}`
        retryCount[key] = (retryCount[key] || 0) + 1
        log('re-fetch', `${retryCount[key]} time`, url, config)

        return retryCb()
      }
      return Promise.reject(err)
    })
}

/**
 * // TODO
 * 接口防并发请求问题严重, 暂时延迟一下, 2个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs = []) {
  const [
    f1 = Function.prototype,
    f2 = Function.prototype,
    f3 = Function.prototype,
    f4 = Function.prototype
  ] = fetchs
  await Promise.all([f1(), f2()])
  return Promise.all([f3(), f4()])
}
