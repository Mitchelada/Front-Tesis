import { Button, Col, notification, Row } from 'antd'
import React, { useState } from 'react'

import { SelectProject } from '../'

import services from '../../services'

const Controls = ({
	projectId,
	setProjectId,
	setAspects,
	diagram_data
}) => {

	const [triggerAddRanking, setTriggerAddRanking] = useState(false)
	services.AddRanking(setAspects, projectId, triggerAddRanking)

	const notify = () => {
		notification.success({
			placement: 'bottomRight',
			message: 'Oh right!',
			description:
				`The ranking of your project is ready, now you can check it in the rankings module`,
			duration: 5000
		});
	}

	return (
		<Row>
			<Col span={12}>
				<SelectProject projectId={projectId} setProjectId={setProjectId}/>
			</Col>
			<Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={() => {
					setTriggerAddRanking(!triggerAddRanking)
					notify()
				}}>Cargar datos</Button>
			</Col>
		</Row>
	)

}

export default Controls