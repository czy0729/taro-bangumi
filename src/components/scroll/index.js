/*
 * @Author: czy0729
 * @Date: 2019-03-04 02:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-07 05:34:07
 */
import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import Component from '@components/component'
import classNames from 'classnames'
import { getWindowHeight } from '@utils/style'

const cls = 'c-scroll'

export default class Scroll extends Component {
  static defaultProps = {
    showTabBar: false,
    className: ''
  }
  render() {
    const { showTabBar, className } = this.props
    return (
      <ScrollView
        className={classNames(cls, className)}
        scrollY
        style={{ height: getWindowHeight(showTabBar) }}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
