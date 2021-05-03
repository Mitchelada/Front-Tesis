import React, { useEffect } from 'react'
import { Select } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { 
	getProjectsAction, 
	getAspectsAndElementsFromProject, 
	getRequirementsFromProject 
} from '../../../../redux/projects/duck'

const { Option } = Select

const SelectProject = ({
	projectId,
	setProjectId
}) => {

	const dispatch = useDispatch()
	const projects = useSelector(state => state.projects.projects)

	useEffect(() => {
		dispatch(getProjectsAction())
	}, [])

	const handleChange = (value) => {
		setProjectId(value)
		dispatch(getAspectsAndElementsFromProject(value))
		dispatch(getRequirementsFromProject(value))
	}

	return (
		<Select defaultValue="Select a Project" style={{ width: 120 }} onChange={handleChange}>
			<Option value="Select a Project">Select a Project</Option>
			{
				projects.map((item) => (
					<Option value={item.id} key={item.id}>{item.name}</Option>
				))
			}
		</Select>
	)

}

export default SelectProject