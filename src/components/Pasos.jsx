import React, {useState} from 'react'
import { AlignCenterOutlined, OrderedListOutlined, UnorderedListOutlined, CheckCircleOutlined,ClusterOutlined } from '@ant-design/icons';
import { DragDrop } from './DragDrop'
import { Aspectos } from './Aspectos'
import Data from '../data/Proyectos'
import { Select, Row, Col, Button, Steps } from 'antd';
import { Elementos } from './Elementos';
import 'antd/dist/antd.css'

const { Option } = Select;
const { Step } = Steps;


export const Pasos = () => {

    const [current, setCurrent] = useState(0);

    const handleCurrent = (current) => {
        setCurrent(current)
    }

    return (
        <div>
            <Steps current={current} onChange={handleCurrent} style={{width:"95%"}}>
                <Step  title="Select a project" icon={<ClusterOutlined />} />
                <Step  title="Order Requirements" icon={<AlignCenterOutlined />} />
                <Step  title="Aspects" icon={<OrderedListOutlined />} />
                <Step  title="Elements" icon={<UnorderedListOutlined />} />
                <Step  title="Done" icon={<CheckCircleOutlined />} />
            </Steps>

            <hr/>
            <br/>

            <Row>
                <Col span={3} style={{width: "80%"}}>
                    <header className="App-header">
                        <h2>Select a Project</h2>
                    </header>
                    <Select defaultValue="--Select a Project--" style={{ width: "72%" }}>
                        <Option value="--Select a Project--">--Select a Project--</Option>
                        {
                            Data.map(proyecto => (
                                <Option value={proyecto.nameProject} key={proyecto.id}>{proyecto.nameProject}</Option>
                                ))}
                    </Select>
                </Col>

                <Col span={5}>
                    <DragDrop/>
                </Col>

                <Col span={5}>
                    <Aspectos/>
                </Col>

                <Col span={9}>
                    <Elementos/>
                </Col>

                <Col span={2}>
                <header className="App-header">
                    <h2>Load Work</h2>
                </header>
                    <Button style={{width:"100%"}}>
                            Submit
                    </Button>
                </Col>

            </Row>

        
        </div>
    )
}
