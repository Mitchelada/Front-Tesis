 // TODO: Get aspects with importance pk
 const getAspectsImportancePK = (aspects) => {
  let aspectsImportance = []
  aspects.forEach((item, key) => {
    const { aspect_id, aspect_name, aspect_type } = item
    const importance = (aspects.length - key)
    let pk = (importance / aspects.length).toFixed(2)

    if(aspect_type === 'COST') {
      pk = -pk
    }else{
      pk = +pk
    }

    aspects[key].pk = pk

    const data = {
      aspect_id,
      aspect_name,
      importance,
      pk
    }

    aspectsImportance.push(data)
  })
  return aspectsImportance
}

export default getAspectsImportancePK