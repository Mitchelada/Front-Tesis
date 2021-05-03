// TODO: Sumatory M Value
const getSumatoryMValue = (array, requirements) => {

  const arrayKeys = Object.keys(array)

  arrayKeys.forEach((item_array, key_array) => {

    const aspect_name = item_array
    const ms = array[aspect_name].ms
    array[aspect_name].mSumatory = []

    ms.forEach((item_m, key_m) => {

      const foundRequirement = requirements.find(obj => obj.requirement_name === item_m.requirement_name)
      
      if(Object.keys(foundRequirement).length > 0) {

        const { requirement_name, m } = item_m
        const findMSumatoryRequirement = array[aspect_name].mSumatory.filter(obj => obj.requirement_name === requirement_name)

        if(findMSumatoryRequirement.length === 0) {
          array[aspect_name].mSumatory.push({
            requirement_name,
            m
          })
        }else{

          const findMSumatoryRequirementIndex = array[aspect_name].mSumatory.findIndex(obj => obj.requirement_name === requirement_name)
          array[aspect_name].mSumatory[findMSumatoryRequirementIndex].m += m

        }

      }
      

    })

  })

  return array

}

export default getSumatoryMValue