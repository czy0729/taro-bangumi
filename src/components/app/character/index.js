/*
 * @Author: czy0729
 * @Date: 2019-03-02 04:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 01:51:35
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import { Div, P, Flex, Img } from '@components'
import './index.scss'

const cls = 'c-app-character'

export default class AppCharacter extends Component {
  static defaultProps = {
    title: null,
    items: [],
    className: ''
  }
  render() {
    const { title, items, className } = this.props
    return (
      <Div className={classNames(cls, className)} wrap='inner-no-side'>
        <P size={24}>{title}</P>
        <Flex wrap='wrap' align='start'>
          {items.map(item => (
            <Div key={item.id || item.name} className={`${cls}__item`}>
              <Img
                className={`${cls}__item-image`}
                width={152}
                src={item.image}
              />
              <P
                className={`${cls}__item-desc mt-xsm`}
                type='desc'
                size={14}
                numberOfLines={2}
              >
                {item.name}
              </P>
              <P
                className={`${cls}__item-sub mt-xs`}
                type='sub'
                size={12}
                numberOfLines={1}
              >
                {item.desc}
              </P>
            </Div>
          ))}
        </Flex>
      </Div>
    )
  }
}
