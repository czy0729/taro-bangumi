/*
 * @Author: czy0729
 * @Date: 2019-02-28 05:50:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:34:35
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { BlurBg, Flex, FlexItem, Div, Span, Img } from '@components'
import { ScoreTag } from '@components/app'
import { subjectStore } from '@stores'
import './index.scss'

const cls = 'subject-head'

@observer
export default class SubjectHead extends Component {
  render() {
    const { subjectId } = this.props
    const {
      name = '',
      name_cn = '',
      images = {},
      rating = {}
    } = subjectStore.getSubject(subjectId)
    return (
      <BlurBg className={cls} src={images.common}>
        <Flex>
          <Img className={`${cls}__thumb`} src={images.common} width={240} />
          <FlexItem className='ml-sm'>
            <Flex
              direction='column'
              justify='between'
              align='start'
              style={{
                height: Taro.pxTransform(240)
              }}
            >
              <Div>
                <Div>
                  <Span type='plain' size={name_cn.length > 16 ? 10 : 12}>
                    {name}
                  </Span>
                </Div>
                <Div className='mt-xs'>
                  <Span type='plain' size={name_cn.length > 16 ? 16 : 24}>
                    {name_cn}
                  </Span>
                </Div>
              </Div>
              <Flex align='end'>
                <Span type='main' size={24} lineHeight={24}>
                  {rating.score}
                </Span>
                {rating.score !== undefined && (
                  <ScoreTag className='ml-sm' score={rating.score} />
                )}
              </Flex>
            </Flex>
          </FlexItem>
        </Flex>
      </BlurBg>
    )
  }
}
