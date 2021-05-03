// TODO: Get requirements with importance vk
const getRequirementsVK = (requirements) => {
    
  const totalRequirements = requirements.length

  let vk = requirements.map((item, key) => {

    let position = key + 1
    const result = ((100 - (( position - 1 ) * (Math.log10(totalRequirements) * 10)/(totalRequirements-1))) / 100).toFixed(2)

    requirements[key].v = +result

    return {
      ...item,
      result
    }

  })

  return vk

}

export default getRequirementsVK