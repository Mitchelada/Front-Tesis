 // TODO: Calculate M Value
 const getMValue = (array, requirements) => {

  const arrayKeys = Object.keys(array)

  arrayKeys.forEach((item_array, key_array) => {

    const aspect_name = item_array
    const keys_elements = Object.keys(array[aspect_name])

    array[aspect_name].ms = []
    
    keys_elements.forEach((item_element, key_element) => {

      if(item_element !== 'g') {
        
        const element_name = item_element
        const element_requirements = array[aspect_name][element_name].requirements

        element_requirements.forEach((item_requirement, key_requirement) => {

          const { requirement_name, i } = item_requirement
          const foundRequirement = requirements.find(obj => obj.requirement_name === requirement_name)
          const { v } = foundRequirement

          if(Object.keys(foundRequirement).length > 0) {

            const iv = +i * +v
            array[aspect_name].ms.push({
              requirement_name,
              m: iv
            })

          }

        })

      }

    })

  })

  return array

}

export default getMValue