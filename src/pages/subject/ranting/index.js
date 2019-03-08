/*
 * @Author: czy0729
 * @Date: 2019-03-01 03:12:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:53:47
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'
import { Div, P, Flex, FlexItem } from '@components'
import { subjectStore } from '@stores'
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

@observer
export default class SubjectRanting extends Component {
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
    const { subjectId } = this.props
    const { rating = initialRating, rank } = subjectStore.getSubject(subjectId)
    return (
      <Div className={cls} wrap='inner'>
        <P size={24}>评分分布</P>
        <Flex className='mt-md'>
          {Object.keys(rating.count)
            .reverse()
            .map((item, index) => (
              <FlexItem
                key={item}
                className={classNames({
                  'ml-xs': index > 0
                })}
              >
                <Flex className={`${cls}__item`} align='end'>
                  <Div
                    className={`${cls}__item-fill`}
                    styles={{
                      height: this.getHeight(rating.total, rating.count[item])
                    }}
                  />
                </Flex>
                <P
                  className='mt-xs t-c'
                  type='desc'
                  size={10}
                  styles={{
                    textAlign: 'center'
                  }}
                >
                  {item}
                </P>
              </FlexItem>
            ))}
        </Flex>
        <Flex className='mt-sm'>
          <P type='main' size={14}>
            {rating.score}
          </P>
          <P className='ml-xs' type='desc' size={14}>
            / {rating.total} votes
          </P>
          <P className='ml-xs' type='desc' size={14}>
            / Ranked:
          </P>
          <P className='ml-xs' type='main' size={14}>
            #{rank}
          </P>
        </Flex>
      </Div>
    )
  }
}
