/*
 * @Author: czy0729
 * @Date: 2019-03-03 00:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:41:00
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import { Flex, Btn, Span } from '@components'
import { pad } from '@utils'
import './index.scss'

const cls = 'c-app-eps'

export default class AppEps extends Component {
  getType = ({ id, status }) => {
    const { userProgress } = this.props
    switch (userProgress[id]) {
      case '想看':
        return 'main'
      case '看过':
        return 'primary'
      case '抛弃':
        return 'disabled'
      default:
        break
    }
    switch (status) {
      case 'Air':
        return 'ghost-primary'
      case 'Today':
        return 'ghost-success'
      default:
        return 'ghost-plain'
    }
  }
  render() {
    const { className, style, items = [] } = this.props
    const itemsNormal = []
    const itemsSp = []
    items.forEach(item => {
      item.type === 1 ? itemsSp.push(item) : itemsNormal.push(item)
    })
    return (
      <Flex
        className={classNames(cls, className)}
        wrap='wrap'
        align='start'
        justify='start'
        style={style}
      >
        {itemsNormal.map(item => (
          <Btn
            key={item.id}
            className={`${cls}__btn`}
            type={this.getType(item)}
            ghost
            size='mini'
          >
            {pad(item.sort)}
          </Btn>
        ))}
        {!!itemsSp.length && (
          <Flex className={`${cls}__sp`} justify='center'>
            <Span type='sub' size={12}>
              SP
            </Span>
          </Flex>
        )}
        {itemsSp.map(item => (
          <Btn
            key={item.id}
            className={`${cls}__btn`}
            type={this.getType(item)}
            ghost
            size='mini'
          >
            {pad(item.sort)}
          </Btn>
        ))}
      </Flex>
    )
  }
}
