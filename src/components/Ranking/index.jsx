import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Table,
  Space,
  Select
} from 'antd'

import {
  getRanking
} from '../../redux/projects/duck'

import services from './services'
import Column from 'antd/lib/table/Column'

const { Option } = Select

const RankingTable = () => {

  const [projectId, setProjectId] = useState(null)
  const dispatch = useDispatch()
  const proyectos = useSelector(store => store.projects.projects_ranking)
  const rankings = useSelector(store => store.projects.rankings)

  const handleChange = (value) => {
    setProjectId(value)
  }

  useEffect(() => {

    if(Number.isInteger(projectId)) {
      dispatch(getRanking(projectId))
    }else{
      dispatch(getRanking(null))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  return (
    <Row>
      <Col span={24}>
        
        <Select defaultValue="select a project" onChange={handleChange}>
          <Option value="select a project">Select a Project</Option>
          {
            proyectos.map((item) => (
              <Option value={item.project_id}>{item.project_name}</Option>
            ))
          }
        </Select>

      </Col>
      <Col span={24}>

      <Table 
          bordered="true" 
          dataSource={rankings} 
          style={{ 
              width: '85%', 
              position:"absolute", 
              paddingTop:"10px" 
          }} 
          scroll={{ 
              y: 450 
          }} 
          pagination={false}>

            <Column 
              title="Requirement"
              dataIndex="name"
              key="name"
              sorter={{

                compare: (a, b) =>{ if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;}
              }
              }
              render={(text, record) => {
                return (
                  <Space size="middle" >
                    <p>{record.name}</p>
                  </Space>
                )
              }}/>

            <Column 
              title="Score"
              dataIndex="score"
              key="score"
              sorter={{      compare: (a, b) => a.score - b.score,
              }}
              render={(text, record) => {
                return (
                  <Space size="middle" >
                    <p>{record.score}</p>
                  </Space>
                )
              }}/>

        </Table>
        
      </Col>

    </Row>
  )
}

const Ranking = () => {

  services.getAllProjectsRanking()

  return (
    <Row>

      <Col span={24}>
        <div>
          <h1>Ranking</h1>
          <hr/>
        </div>
      </Col>
      <Col span={24}>
        <RankingTable/>
      </Col>

    </Row>
  )

}

export default Ranking