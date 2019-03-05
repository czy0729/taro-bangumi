/*
 * @Author: czy0729
 * @Date: 2019-03-04 05:28:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 03:08:28
 */
import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Component from '@components/component'
import View from '@components/view'
import './index.scss'

const cls = 'c-flex'

export default class Flex extends Component {
  static propTypes = {
    direction: PropTypes.oneOf([
      'row',
      'row-reverse',
      'column',
      'column-reverse'
    ]),
    wrap: PropTypes.oneOf(['wrap', 'nowrap']),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline'])
  }
  static defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center'
  }
  render() {
    const { direction, wrap, justify, align, className, style } = this.props
    return (
      <View
        className={classNames(
          cls,
          {
            [`${cls}__direction--${direction}`]: !!direction,
            [`${cls}__${wrap}`]: !!wrap,
            [`${cls}__justify--${justify}`]: !!justify,
            [`${cls}__align--${align}`]: !!align
          },
          className
        )}
        style={style}
      >
        {this.props.children}
      </View>
    )
  }
}
