/*
 * @Author: czy0729
 * @Date: 2019-03-01 03:12:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:12:30
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P } from '@components'
import './index.scss'

const cls = 'subject-ranting'
const initialRating = {
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  },
  score: 0,
  total: 0
}

@inject('subjectStore')
@observer
export default class SubjectRanting extends Component {
  static defaultProps = {
    subjectId: null
  }
  getHeight = (total, current) => {
    if (!total) {
      return 0
    }
    let percent = current / total
    if (percent > 0 && percent < 0.01) {
      percent = 0.01
    }
    return `${percent * 100}%`
  }
  render() {
    const { subjectId, subjectStore } = this.props
    const { rating = initialRating, rank } = subjectStore.getSubject(subjectId)
    return (
      <View className={`${cls} p-vh`}>
        <P size={24} text='评分分布' />
        <View className='flex mt-md'>
          {Object.keys(rating.count)
            .reverse()
            .map((item, index) => (
              <View
                key={item}
                className={classNames('flex-item', {
                  'ml-xs': index > 0
                })}
              >
                <View className={`${cls}__item flex flex-align-end`}>
                  <View
                    className={`${cls}__item-fill`}
                    style={{
                      height: this.getHeight(rating.total, rating.count[item])
                    }}
                  />
                </View>
                <P className='mt-xs t-c' type='desc' size={12} text={item} />
              </View>
            ))}
        </View>
        <View className='flex mt-sm'>
          <P type='main' size={14} text={rating.score} />
          <P
            className='ml-xs'
            type='desc'
            size={14}
            text={` / ${rating.total} votes`}
          />
          <P className='ml-xs' type='desc' size={14} text='/ Ranked:' />
          <P className='ml-xs' type='main' size={14} text={`#${rank}`} />
        </View>
      </View>
    )
  }
}
