/*
 * @Author: czy0729
 * @Date: 2019-02-27 06:42:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-05 04:54:50
 */
import Taro, { Component } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import classNames from 'classnames'
import { Div, Span, Img, Flex, FlexItem } from '@components'
import './index.scss'

const cls = 'home-item'

@observer
export default class HomeItem extends Component {
  render() {
    const {
      subjectId,
      subject = { images: {}, collection: {} },
      index
    } = this.props
    return (
      <Div
        key={subjectId}
        className={classNames(cls, {
          [`${cls}--first`]: index === 0
        })}
      >
        <Flex align='start'>
          <Img
            className={`${cls}__thumb`}
            width={160}
            src={subject.images.medium}
          />
          <FlexItem>
            <Div>
              <Span size={18}>{subject.name_cn || subject.name}</Span>
            </Div>
            <Div>
              <Span type='desc' size={14}>
                {subject.collection.doing}人在看
              </Span>
            </Div>
          </FlexItem>
        </Flex>
      </Div>
    )
  }
}
