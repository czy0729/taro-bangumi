/*
 * @Author: czy0729
 * @Date: 2019-03-03 00:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 17:04:54
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { Btn, P } from '@components'
import { pad } from '@utils'
import './index.scss'

const cls = 'c-app-eps'

export default class AppEps extends Component {
  static defaultProps = {
    className: '',
    items: [],
    userProgress: {}
  }
  getType = ({ id, status }) => {
    const { userProgress = {} } = this.props
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
      <View
        className={classNames(cls, 'flex flex-wrap', className)}
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
          <View
            className={`${cls}__sp flex flex-justify-center`}
            justify='center'
          >
            <P type='sub' size={12} text='SP' />
          </View>
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
      </View>
    )
  }
}
