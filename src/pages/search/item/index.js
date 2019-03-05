/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:15:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:42:00
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Div, Span, Img } from '@components'
import { jump } from '@utils'
import './index.scss'

const cls = 'search-item'

@observer
export default class SearchItem extends Component {
  onClick = () => {
    const { subjectId, name, nameCn } = this.props
    jump({
      url: '/pages/subject/index',
      payload: {
        subjectId
      },
      title: nameCn || name
    })
  }
  render() {
    const { images, name, nameCn } = this.props
    return (
      <Div className={cls} onClick={this.onClick}>
        <Img className={`${cls}__thumb`} width={208} src={images.medium} />
        <Span className={`${cls}__name`} numberOfLines={2}>
          {nameCn || name}
        </Span>
      </Div>
    )
  }
}
