/*
 * @Author: czy0729
 * @Date: 2019-03-10 07:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 22:16:39
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-menu'

export default class Menu extends Component {
  static defaultProps = {
    className: '',
    styles: null,
    title: [],
    data: [],
    width: Taro.getSystemInfoSync().width / 2,
    onClick: Function.prototype
  }
  render() {
    const { className, style, styles, title, data, width, onClick } = this.props
    const _style = {
      width
    }
    return (
      <View
        className={classNames(cls, className)}
        style={this.composeStyle(_style, styles || style)}
      >
        {title.length !== 0 && (
          <View className={`${cls}__title`}>
            {title.map((item, index) => (
              <Text
                key={item}
                className={classNames(`${cls}__title-item flex flex-column`, {
                  'mt-xs': index > 0
                })}
              >
                {item}
              </Text>
            ))}
          </View>
        )}
        {data.map((item, index) => (
          <View
            key={item}
            className={classNames(`${cls}__item flex flex-column`, {
              [`${cls}__item--first`]: index === 0
            })}
            onClick={onClick.bind(this, index)}
          >
            <Text className={`${cls}__item-text`}>{item}</Text>
          </View>
        ))}
      </View>
    )
  }
}
