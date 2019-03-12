/*
 * @Author: czy0729
 * @Date: 2019-03-04 02:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-12 03:47:28
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
    const { showTabBar, className, style } = this.props
    const _style = {
      height: getWindowHeight(showTabBar)
    }
    return (
      <ScrollView
        className={classNames(cls, className)}
        scrollY
        style={this.composeStyle(_style, style)}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
