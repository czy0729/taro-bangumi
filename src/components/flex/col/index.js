/*
 * @Author: czy0729
 * @Date: 2019-03-07 05:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 00:57:11
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import './index.scss'

const cls = 'c-flex'

export default class FlexCol extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    col: PropTypes.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    auto: PropTypes.bool,
    offset: PropTypes.oneOf([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: '',
    styles: null,
    col: true,
    auto: false,
    offset: null,
    onClick: null
  }
  render() {
    const { className, styles, col, auto, offset, onClick } = this.props
    return (
      <View
        className={classNames(
          {
            [`${cls}-col`]: col,
            [`${cls}-col-${col}`]: col !== true,
            [`${cls}-col-1 ${cls}-col--auto`]: auto,
            [`${cls}-col__offset-${offset}`]: offset
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
