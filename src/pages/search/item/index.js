/*
 * @Author: czy0729
 * @Date: 2019-02-27 08:15:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-09 19:21:35
 */
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { P, Img } from '@components'
import { jump } from '@utils'
import './index.scss'

const cls = 'search-item'

@observer
export default class SearchItem extends Component {
  static defaultProps = {
    subjectId: null,
    name: '',
    nameCn: '',
    images: {}
  }
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
      <View className={cls} onClick={this.onClick}>
        <View className={`${cls}__shadow`}>
          <Img className={`${cls}__thumb`} width={208} src={images.medium} />
        </View>
        <P className={`${cls}__name`} numberOfLines={2} text={nameCn || name} />
      </View>
    )
  }
}
