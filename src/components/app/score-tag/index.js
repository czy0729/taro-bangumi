/*
 * @Author: czy0729
 * @Date: 2019-03-02 22:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:41:20
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import Component from '@components/component'
import { Div, Span } from '@components'
import './index.scss'

const cls = 'c-app-score-tag'

export default class AppScoreTag extends Component {
  get getLabel() {
    const score = parseInt(this.props.score || 0)
    if (score >= 9.5) return '超神作'
    if (score >= 8.5) return '神作'
    if (score >= 7.5) return '力荐'
    if (score >= 6.5) return '推荐'
    if (score >= 5.5) return '还行'
    if (score >= 4.5) return '不过不失'
    if (score >= 3.5) return '较差'
    if (score >= 2.5) return '差'
    if (score >= 1.5) return '很差'
    return '不忍直视'
  }
  render() {
    const { className, style } = this.props
    return (
      <Div className={classNames(cls, className)} style={style}>
        <Span type='plain' size={10}>
          {this.getLabel}
        </Span>
      </Div>
    )
  }
}
