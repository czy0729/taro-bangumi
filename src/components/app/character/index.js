/*
 * @Author: czy0729
 * @Date: 2019-03-02 04:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:40:15
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import { Div, Span, Flex, Img } from '@components'
import './index.scss'

const cls = 'c-app-character'

export default class AppCharacter extends Component {
  render() {
    const { title, items = [], className, style } = this.props
    return (
      <Div
        className={classNames(cls, className)}
        wrap='inner-no-side'
        style={style}
      >
        <Span size={24}>{title}</Span>
        <Flex wrap='wrap' align='start'>
          {items.map(item => (
            <Div key={item.id || item.name} className={`${cls}__item`}>
              <Img
                className={`${cls}__item-image`}
                width={152}
                src={item.image}
              />
              <Div className='mt-xsm'>
                <Span
                  className={`${cls}__item-desc`}
                  type='desc'
                  size={14}
                  numberOfLines={2}
                >
                  {item.name}
                </Span>
              </Div>
              <Div className='mt-xs'>
                <Span
                  className={`${cls}__item-sub`}
                  type='sub'
                  size={12}
                  numberOfLines={1}
                >
                  {item.desc}
                </Span>
              </Div>
            </Div>
          ))}
        </Flex>
      </Div>
    )
  }
}
