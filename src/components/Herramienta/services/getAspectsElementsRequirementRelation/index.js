// TODO: Get aspects, elements and requirements relation
const getAspectsElementsRequirementRelation = (aspects_elements_relation, allEHR) => {

  if(allEHR) {

    const aspects_elements_relationKeys = Object.keys(aspects_elements_relation)

    aspects_elements_relationKeys.forEach((item_aspect, key_aspect) => {
      
      const elements = aspects_elements_relation[item_aspect]
      const elementsKeys = Object.keys(elements)

      elementsKeys.forEach((item_element, key_element) => {
        
        const { element_id } = elements[item_element]
        
        let requirements = allEHR.filter(obj => obj.ElementId === element_id)
  
        requirements.forEach((item_requirement, key_requirement) => {

          const { requirement_name } = item_requirement

          aspects_elements_relation[item_aspect][item_element] = {
            ...aspects_elements_relation[item_aspect][item_element],
            requirements: [
              ...aspects_elements_relation[item_aspect][item_element]['requirements'],
              {
                requirement_name
              }
            ]
          }

        })

      })


    })

    return aspects_elements_relation
  }

}

export default getAspectsElementsRequirementRelation