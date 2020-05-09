import { Tabs } from 'ii-ui'
import './index.less'
import First from './first'
import Second from './second'

const TabPane = Tabs.TabPane

const BasedataThreatList = (props) => {
  const { type = '' } = props.match.params
  return (
    <div className='basedata-vulnerability'>
      <Tabs
        defaultActiveKey={!type ? 'first' : type}
        type='card'
      >
        <TabPane tab='一级威胁' key='first'>
          <First></First>
        </TabPane>
        <TabPane tab='二级威胁' key='second'>
          <Second></Second>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default BasedataThreatList