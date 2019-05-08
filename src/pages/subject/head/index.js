/*
 * @Author: czy0729
 * @Date: 2019-02-28 05:50:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-23 08:53:56
 */
import Taro from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Component from '@common/component'
import { BlurBg, P, Img } from '@components'
import { ScoreTag } from '@components/app'
import './index.scss'

const cls = 'subject-head'

@inject('subjectStore')
@observer
export default class SubjectHead extends Component {
  static defaultProps = {
    subjectId: null
  }
  render() {
    const { subjectId, subjectStore } = this.props
    const { name, name_cn, images, rating } = subjectStore.getSubject(subjectId)
    return (
      <BlurBg className={cls} src={images.common}>
        <View className='flex'>
          <Img className={`${cls}__thumb`} src={images.common} width={240} />
          <View
            className='flex-item flex flex-column flex-justify-between flex-align-start ml-sm'
            style={{
              height: Taro.pxTransform(240)
            }}
          >
            <View>
              <P type='plain' size={name.length > 16 ? 10 : 12} text={name} />
              <P
                className='mt-xs'
                type='plain'
                size={name_cn.length > 16 ? 16 : 20}
                text={name_cn}
              />
            </View>
            <View className='flex flex-align-end' align='end'>
              <P type='main' size={24} lineHeight={1} text={rating.score} />
              {rating.score !== undefined && (
                <ScoreTag className='ml-sm' score={rating.score} />
              )}
            </View>
          </View>
        </View>
      </BlurBg>
    )
  }
}
