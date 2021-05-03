import React, { Fragment, useState } from 'react'
import ReactFlow, { addEdge, Background, MiniMap, removeElements } from 'react-flow-renderer';

import { useDispatch, useSelector } from 'react-redux'
import { addRelation, removeRelation } from '../../redux/tools/duck'

import {
  PasosProvider
} from '../Pasos/Provider'

import { Controls } from './components'
import helpers from './helpers'

const onLoad = (reactFlowInstance) =>{
    reactFlowInstance.fitView();
}

const onElementClick = (event, element) => {
	console.log('element ', element)
	element.style={stroke: '#f00'}
};

const Herramienta = () => {
	
	const [aspects, setAspects] = useState([])
	const [projectId, setProjectId] = useState(null)

	const dispatch = useDispatch()
	const diagram_data = useSelector(state => state.projects.diagram_data)

	// TODO: Build hook aspects for ReactFlow datasource 'elements'
	helpers.BuildDiagram(diagram_data, aspects, setAspects)

	const onConnect = params =>{

		const { source, target } = params
		const elementId = source.split("_")[1]
		const requirementId = target.split("_")[1]

		params.type = "straight"
		params.style = { strokeWidth: 3 }

		const data = {
			projectId,
			elementId,
			requirementId
		}

		dispatch(addRelation(data))
		setAspects(elements=> addEdge(params,elements))

	}

	const onRemove = params =>{
		const data = {
			id: params[0].source.split("_")[1]
		}
		dispatch(removeRelation(data))
		setAspects(elements=> removeElements(params,elements))
	}	

	return(
		<>
			<PasosProvider>
				<Controls 
					projectId={projectId} 
					setProjectId={setProjectId}
					setAspects={setAspects}
					diagram_data={diagram_data}/>

				<Fragment>
						<ReactFlow
								elements={aspects}
								onLoad={onLoad}
								style={{width:'100%',height: '85vh'}}
								onConnect={onConnect}
								connectionLineStyle={{strokeWidth:10, strokeLinecap: 'round', stroke: 'green'}}
								connectionLineType="straight"
								snapToGrid={true}
								snapGrid={[16,16]}
								deleteKeyCode={8}
								onElementClick={onElementClick}
								onElementsRemove={onRemove}
								doubleTap={false}
								animate={true}
						>   

								<Background 
										color="#888"
										gap={16}
										size={0.5}
								/>
								<MiniMap
										nodeColor={n =>{
												if(n.type === 'input') return 'blue';
												return '#ffcc00'
										}}
								/>

						</ReactFlow>
				
				</Fragment>
			</PasosProvider>
		</>
	)
}

export default Herramienta