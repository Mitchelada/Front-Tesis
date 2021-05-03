// TODO: Get aspects elements relation
const getAspectsElementsRelation = (array) => {

  const relations = {}
  const relationsKeys = Object.keys(relations)

  // TODO: Build aspects JSON
  array.forEach((item) => {
    if(relationsKeys.length === 0) {
      const aspect_name = item.aspect_name.replace(/ /g, '_')
      relations[aspect_name] = {}
    }else if(relationsKeys.length > 0) {
      const aspectIndex = relationsKeys.indexOf(item.aspect_name)

      if(aspectIndex === -1) {
        const aspect_name = item.aspect_name.replace(/ /g, '_')
        relations[aspect_name] = {}
      }

    }
  })

  // TODO: Build aspects with nested elements JSON
  let newRelationsKeys = Object.keys(relations)
  newRelationsKeys.forEach((item) => {
    
    const aspectData = array.filter(obj => obj.aspect_name.replace(/ /g, '_') === item)

    aspectData.forEach((item_aspect_data) => {
      
      const { element_id, element_name, element_priority } = item_aspect_data
      const element_priorityValue = element_priority === 'HIGH' ? 3 : element_priority === 'MEDIUM' ? 2 : 1

      relations[item][element_name.replace(/ /g, '_')] = {
        element_id,
        element_priority: element_priorityValue,
        requirements: []
      }

    })

  })

  return relations

}

export default getAspectsElementsRelation