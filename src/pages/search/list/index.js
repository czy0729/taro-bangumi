/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:13:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 19:17:37
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P } from '@components'
import Item from '../item'
import './index.scss'

const cls = 'search-list'

@inject('subjectStore')
@observer
export default class SearchList extends Component {
  render() {
    const {
      subjectStore: { calendar }
    } = this.props
    return (
      <View className={`${cls} p-v p-l`}>
        {calendar.map((item, index) => (
          <View
            key={item.weekday.cn}
            className={classNames({
              'mt-md': index > 0
            })}
          >
            <P size={24} text={item.weekday.cn} />
            <View className='flex flex-wrap flex-align-start mt-sm'>
              {item.items.map(i => (
                <Item
                  key={i.id}
                  subjectId={i.id}
                  images={i.images}
                  name={i.name}
                  nameCn={i.name_cn}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
