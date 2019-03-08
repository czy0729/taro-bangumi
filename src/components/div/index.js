/*
 * @Author: czy0729
 * @Date: 2019-03-03 23:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 06:01:44
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.scss'

const cls = 'c-div'

export default class Div extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    wrap: PropTypes.oneOf([null, 'inner', 'inner--no-side', 'outer']), // 简便布局
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: '',
    styles: null,
    wrap: null,
    onClick: null
  }
  render() {
    const { className, styles, wrap, onClick } = this.props
    return (
      <View
        className={classNames(
          cls,
          {
            [`${cls}--wrap-${wrap}`]: wrap
          },
          className
        )}
        style={styles}
        onClick={onClick}
      >
        {this.props.children}
      </View>
    )
  }
}
