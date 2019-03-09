/*
 * @Author: czy0729
 * @Date: 2019-03-02 04:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:04:23
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import { P, Img } from '@components'
import './index.scss'

const cls = 'c-app-character'

export default class AppCharacter extends Component {
  static defaultProps = {
    className: '',
    title: null,
    items: []
  }
  render() {
    const { className, style, title, items } = this.props
    return (
      <View className={classNames(cls, 'p-v p-l', className)} style={style}>
        <P size={24} text={title} />
        <View className='flex flex-wrap flex-align-start'>
          {items.map(item => (
            <View key={item.id || item.name} className={`${cls}__item`}>
              <View className={`${cls}__item-shadow`}>
                <Img
                  className={`${cls}__item-image`}
                  width={152}
                  src={item.image}
                />
              </View>
              <P
                className={`${cls}__item-desc mt-xsm`}
                type='desc'
                size={14}
                numberOfLines={2}
                text={item.name}
              />
              <P
                className={`${cls}__item-sub mt-xs`}
                type='sub'
                size={12}
                numberOfLines={1}
                text={item.desc}
              />
            </View>
          ))}
        </View>
      </View>
    )
  }
}
