/*
 * @Author: czy0729
 * @Date: 2019-03-07 05:50:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-08 00:57:01
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import './index.scss'

const cls = 'c-flex'

export default class FlexRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    wrap: PropTypes.oneOf(['wrap', 'no-wrap']),
    direction: PropTypes.oneOf(['row', 'column']),
    align: PropTypes.oneOf(['start', 'end', 'center']),
    justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around']),
    alignContent: PropTypes.oneOf([
      null,
      'start',
      'end',
      'center',
      'between',
      'around',
      'stretch'
    ]),
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: '',
    styles: null,
    wrap: 'no-wrap',
    direction: 'row',
    align: 'center',
    justify: 'start',
    alignContent: null,
    onClick: null
  }
  render() {
    const {
      className,
      styles,
      wrap,
      direction,
      align,
      justify,
      alignContent,
      onClick
    } = this.props
    return (
      <View
        className={classNames(
          {
            [`${cls}-row`]: true,
            [`${cls}-row--${wrap}`]: wrap,
            [`${cls}-row__direction--${direction}`]: direction,
            [`${cls}-row__align--${align}`]: align,
            [`${cls}-row__justify--${justify}`]: justify,
            [`${cls}-row__align-content`]: alignContent
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
