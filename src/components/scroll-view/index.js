/*
 * @Author: czy0729
 * @Date: 2019-03-04 02:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-04 18:23:09
 */
import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import Component from '@components/component'
import { getWindowHeight } from '@utils/style'

export default class _ScrollView extends Component {
  render() {
    const { showTabBar, className } = this.props
    return (
      <ScrollView
        className={className}
        scrollY
        style={{ height: getWindowHeight(showTabBar) }}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
