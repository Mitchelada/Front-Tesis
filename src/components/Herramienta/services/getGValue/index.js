// TODO: Calculate G Value
const getGValue = (array) => {

  const arrayKeys = Object.keys(array)
  
  arrayKeys.forEach((item_aspect, key_aspect) => {

    const { g } = array[item_aspect]
    const elements = array[item_aspect]
    const elementsKeys = Object.keys(elements)

    elementsKeys.forEach((item_element, key_element) => {

      const { requirements, element_priority } = array[item_aspect][item_element]
      
      if(requirements) {
        const gValue = requirements.length/g
        array[item_aspect][item_element].g = +gValue.toFixed(2)

        requirements.forEach((item_requirement, key_requirement) => {
          array[item_aspect][item_element].requirements[key_requirement].i = +(gValue + element_priority)
        })  
      }

    })

  })

  return array

}

export default getGValue