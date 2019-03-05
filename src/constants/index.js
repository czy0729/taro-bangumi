/*
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-06 00:05:08
 */
// dev
export const APP_ID = 'bgm8885c4d524cd61fc'
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

// oauth
export const OAUTH_URL = 'https://bgm.tv/oauth/authorize'
export const OAUTH_REDIRECT_URL = 'https://bgm.tv/oauth'
// export const OAUTH_REDIRECT_URL = 'https://wap.baidu.com/'

// models
// 条目类型
export const MODEL_SUBJECT_TYPE = [
  {
    label: 'book',
    value: '1'
  },
  {
    label: 'anime',
    value: '2'
  },
  {
    label: 'music',
    value: '3'
  },
  {
    label: 'game',
    value: '4'
  },
  {
    label: 'real',
    value: '6'
  }
]

// 环境
export const ENV = {
  H5: process.env.TARO_ENV === 'h5',
  RN: process.env.TARO_ENV === 'rn',
  WEAPP: process.env.TARO_ENV === 'weapp'
}
