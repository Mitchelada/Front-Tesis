import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'

import {
  addRanking, getAspectsAndElementsFromProject
} from '../../../../redux/projects/duck'

import services from '../'

const AddRanking = (
  setAspects, 
  projectId,
  triggerAddRanking
) => {

  const dispatch = useDispatch()
  const diagram_data = useSelector(state => state.projects.diagram_data)

  useEffect(() => {
    dispatch(getAspectsAndElementsFromProject(projectId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerAddRanking])

  useEffect(() => {
    if(Object.keys(diagram_data).length === 0) setAspects([])
    else {
  
      const {
        allAspectsAndElementsFromProject,
        allEHR,
        allRequirementsFromProject: requirements
      } = diagram_data
  
      const aspects = services.removeDuplicateUsingFilter(allAspectsAndElementsFromProject, 'aspect', 'aspect_id')
  
      const aspects_importance_pk = services.getAspectsImportancePK(aspects)
      services.getRequirementsVK(requirements)
      const aspects_elements_relation = services.getAspectsElementsRelation(allAspectsAndElementsFromProject)
      const aspects_elements_requirements_relation = services.getAspectsElementsRequirementRelation(aspects_elements_relation, allEHR)
      const aspects_elements_requirements_g = services.getAspectsElementsRequirementsG(aspects_elements_requirements_relation)
      const calculate_g_value = services.getGValue(aspects_elements_requirements_g)
      const calculate_m_value = services.getMValue(calculate_g_value, requirements)
      const sumatory_m_value = services.getSumatoryMValue(calculate_m_value, requirements)
      const get_pkm_producto = services.getPKMProduct(sumatory_m_value, requirements, aspects_importance_pk)
  
      const data = {
        projectId,
        get_pkm_producto
      }
  
      console.log('get_pkm_producto ', get_pkm_producto)
      dispatch(addRanking(data))
  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram_data])

}

export default AddRanking