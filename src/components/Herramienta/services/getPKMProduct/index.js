// TODO: PK * M
const getPKMProduct = (array, requirements, aspects_importance_pk) => {

  const arrayKeys = Object.keys(array)
  
  arrayKeys.forEach((item_aspect, key_aspect) => {

    const { g } = array[item_aspect]
    const { mSumatory } = array[item_aspect]
    const aspect_name = arrayKeys[key_aspect].replace(/_/g, ' ')

    mSumatory.forEach((item_sumatory, key_sumatory) => {

      const { requirement_name, m } = item_sumatory
      const { pk } = aspects_importance_pk.find(obj => obj.aspect_name === aspect_name)
      
      const r = pk*m

      const requirementIndex = requirements.findIndex(obj => obj.requirement_name === requirement_name)
      if(requirementIndex > -1) {

        const requirement = requirements[requirementIndex]

        if(requirement.hasOwnProperty('r')) {
          requirements[requirementIndex].r += r
        }else{
          requirements[requirementIndex].r = r
        }
      }

    })

  })

  return requirements

}

export default getPKMProduct