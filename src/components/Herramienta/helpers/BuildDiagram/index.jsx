import { useEffect } from 'react'

const BuildDiagram = (diagram_data, aspects, setAspects) => {

  useEffect(() => {
		const elements = []
		
		if(Object.keys(diagram_data).length > 0) {
			let positionAspect = {
				x: 200,
				y: 300
			}
	
			let positionElement = {
				x: 450,
				y: 100
			}

			let positionRequirement = {
				x: 800,
				y: 0
			}
	
			let aspects = []

			const aspects_and_elements = diagram_data.allAspectsAndElementsFromProject
			const requirements = diagram_data.allRequirementsFromProject
			const ehr = diagram_data.allEHR

			aspects_and_elements.forEach((item) => {
	
				const indexAspect = aspects.findIndex(obj => obj.key === `ka_${item.aspect_id}`)
				if(indexAspect === -1) {
					aspects.push({
						key: `ka_${item.aspect_id}`,
						id: `a_${item.aspect_id}`,
						type: 'input',
						data: {
							label: item.aspect_name
						},
						draggable:false,
						position: positionAspect,
						sourcePosition:"right",
					})

					positionAspect = {
						x: positionAspect.x,
						y: positionAspect.y + 60
					}
				}
	
				const indexElement = aspects.findIndex(obj => obj.key === `ke_${item.element_id}`)

				let priority = item.element_priority === 'HIGH' ? 'H' : item.element_priority === 'MEDIUM' ? 'M' : 'L'

				if(indexElement === -1) {
					aspects.push({
						key: `ke_${item.element_id}`,
						id: `e_${item.element_id}`,
						type: 'default',
						data: {
							label: `${item.element_name} (${priority})`
						},
						position: positionElement,
						sourcePosition:"right",
						targetPosition: 'left',
						draggable:false
					})
					
					aspects.push({
						id: `a_${item.aspect_id}:e_${item.element_id}`,
						source: `a_${item.aspect_id}`,
						target: `e_${item.element_id}`,
						type: 'straight',
						style:{strokeWidth:3}
					})
					
					positionElement = {
						x: positionElement.x,
						y: positionElement.y + 60
					}
				}

				elements.push(item.element_id)

			})
			
			requirements.forEach((item) => {
				const indexRequirement = aspects.findIndex(obj => obj.key === `kr_${item.requirement_id}`)
				if(indexRequirement === -1) {

					const element = {
						key: `kr_${item.requirement_id}`,
						id: `r_${item.requirement_id}`,
						type: 'output',
						data: {
							label: item.requirement_name
						},
						position: positionRequirement,
						targetPosition:"left",
					}

					aspects.push(element)
					positionRequirement = {
						x: positionRequirement.x,
						y: positionRequirement.y + 60
					}
				
				}
			})

			ehr.forEach((item) => {
				aspects.push({
					id: `e_${item.ElementId}:r_${item.RequirementId}`,
					source: `e_${item.ElementId}`,
					target: `r_${item.RequirementId}`,
					type: 'straight',
					style:{strokeWidth:3}
				})
			})

			setAspects(aspects)
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [diagram_data])

}

export default BuildDiagram