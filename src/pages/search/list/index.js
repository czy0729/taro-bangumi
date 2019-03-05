/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:13:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:08:24
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'
import { Div, Span, Flex } from '@components'
import { subjectStore } from '@stores'
import Item from '../item'
import './index.scss'

const cls = 'search-list'

@observer
export default class SearchList extends Component {
  render() {
    const { calendar } = subjectStore.state
    return (
      <Div className={cls}>
        {calendar.map((item, index) => (
          <Div
            key={item.weekday.cn}
            className={classNames({
              'mt-md': index > 0
            })}
          >
            <Span size={24}>{item.weekday.cn}</Span>
            <Flex className='mt-sm' wrap='wrap' align='start'>
              {item.items.map(i => (
                <Item
                  key={i.id}
                  subjectId={i.id}
                  images={i.images}
                  name={i.name}
                  nameCn={i.name_cn}
                />
              ))}
            </Flex>
          </Div>
        ))}
      </Div>
    )
  }
}
