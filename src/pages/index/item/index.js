/*
 * @Author: czy0729
 * @Date: 2019-02-27 06:42:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 04:41:40
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { BlurBg, P, Img, Ico, ProgressBar } from '@components'
import { Eps } from '@components/app'
import { uiStore } from '@stores'
import { getStorage, updateStorage, jump } from '@utils'
import './index.scss'

const cls = 'home-item'
const initSubject = { images: {}, collection: {}, eps_count: 0 }

@inject('userStore', 'subjectStore')
@observer
export default class HomeItem extends Component {
  static defaultProps = {
    subjectId: null,
    subject: initSubject,
    epStatus: '-'
  }
  state = {
    expand: false
  }
  async componentWillMount() {
    const { subjectId } = this.props
    const state = await getStorage(`${cls}|${subjectId}|state`)
    if (state) {
      this.setState(state)
    }
  }
  onClick = () => {
    const { subjectId } = this.props
    jump({
      url: '/pages/subject/index',
      payload: {
        subjectId
      }
    })
  }
  onItemClick = (a = {}, e) => {
    const { id, sort, name, name_cn, airdate, comment } = a
    const data = {
      component: 'Menu',
      props: {
        title: [
          `ep.${sort} ${name || name_cn}`,
          `${airdate} 讨论数：${comment}`
        ],
        data: ['看过', '看到', '本集讨论'],
        width: Taro.pxTransform(376),
        onClick: index => {
          uiStore.hidePopover()
          console.log(index)
        }
      }
    }
    if (process.env.TARO_ENV === 'weapp') {
      data.weapp = {
        offsetWidth: 28,
        offsetHeight: 28
      }
    }
    uiStore.showPopover(e, data, true)
  }
  toggleExpand = () => {
    const { subjectId } = this.props
    const { expand } = this.state
    this.setState(
      {
        expand: !expand
      },
      () => {
        updateStorage(`${cls}|${subjectId}|state`, this.state)
      }
    )
  }
  showModal = () => {}
  watchedNextEp = () => {}
  get eps() {
    const { subjectStore, subjectId } = this.props
    const { eps = [] } = subjectStore.getSubjectEp(subjectId)
    return eps
  }
  get userProgress() {
    const { userStore, subjectId } = this.props
    return userStore.getUserProgress(subjectId)
  }
  get isToday() {
    return this.eps.findIndex(item => item.status === 'Today') !== -1
  }
  get percent() {
    const { subject } = this.props
    if (!subject.eps_count || !this.eps.length) {
      return 0
    }

    // 排除SP章节
    let watchedCount = 0
    this.eps
      .filter(item => item.type === 0)
      .forEach(item => {
        if (this.userProgress[item.id] === '看过') {
          watchedCount += 1
        }
      })
    return (watchedCount / subject.eps_count) * 100
  }
  get nextCheckEp() {
    const index = this.eps
      .filter(item => item.type === 0)
      .findIndex(item => this.userProgress[item.id] !== '看过')
    if (index === -1) {
      return
    }
    return this.eps[index].sort
  }
  render() {
    const { subject, epStatus } = this.props
    const { expand } = this.state
    return (
      <BlurBg className={cls} theme='xlight' src={subject.images.medium}>
        <View className='flex flex-align-start p-v p-l'>
          <View className={`${cls}__thumb`}>
            <Img
              width={160}
              src={subject.images.medium}
              onClick={this.onClick}
            />
          </View>
          <View className='flex-item p-l'>
            <View className='flex flex-align-start p-r'>
              <View className='flex-item'>
                <P size={18} text={subject.name_cn || subject.name} />
                <P
                  className='mt-xs'
                  type='sub'
                  size={12}
                  text={`${subject.collection.doing} 人在看`}
                />
              </View>
              {this.isToday && (
                <P type='success' size={12} lineHeight={18} text='放送中' />
              )}
            </View>
            {expand && (
              <Eps
                className='mt-md'
                items={this.eps}
                userProgress={this.userProgress}
                onClick={this.onItemClick}
              />
            )}
            <View className='flex mt-md'>
              <View className='flex-item'>
                {!expand && (
                  <View className='flex flex-align-end'>
                    <P
                      type='primary'
                      size={22}
                      lineHeight={1}
                      text={epStatus}
                    />
                    <P
                      className='ml-xs'
                      type='sub'
                      size={12}
                      text={`/ ${subject.eps_count || '-'}`}
                    />
                  </View>
                )}
              </View>
              <View className='flex'>
                <View className={`${cls}__btn`} onClick={this.toggleExpand}>
                  <Ico type={expand ? 'expand-active' : 'expand'} />
                </View>
                <View className={`${cls}__btn`} onClick={this.showModal}>
                  <Ico type='favor' />
                </View>
                {this.nextCheckEp && (
                  <View
                    className={`${cls}__btn flex`}
                    onClick={this.watchedNextEp}
                  >
                    <Ico type='check' />
                    <P
                      className='ml-xs'
                      type='sub'
                      size={12}
                      lineHeight={1}
                      text={`EP.${this.nextCheckEp || '-'}`}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <ProgressBar percent={this.percent} />
      </BlurBg>
    )
  }
}
