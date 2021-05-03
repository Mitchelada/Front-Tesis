// TODO: Get elements G value
const getAspectsElementsRequirementsG = (array) => {

  const arrayKeys = Object.keys(array)
  
  arrayKeys.forEach((item_aspect, key_aspect) => {

    const elements = array[item_aspect]
    const elementsKeys = Object.keys(elements)


    let requirementLength = 0
    elementsKeys.forEach((item_element, key_element) => {

      const { requirements } = array[item_aspect][item_element]
      if(requirements.length > requirementLength) {
        requirementLength = requirements.length
        array[item_aspect].g = requirements.length
      }

    })
    

  })

  return array

}

export default getAspectsElementsRequirementsG