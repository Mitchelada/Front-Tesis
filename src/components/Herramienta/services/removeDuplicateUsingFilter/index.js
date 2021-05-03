// TODO: Remove duplicates from array
const removeDuplicateUsingFilter = (arr, table, field) => {
  const uniqueArray = []

  arr.forEach((item) => {
    const index = uniqueArray.findIndex(obj => obj[field] === item[field])
    if(index === -1) {
      if(table === 'aspect') {
        uniqueArray.push({
          aspect_id: item.aspect_id,
          aspect_name: item.aspect_name,
          aspect_type: item.aspect_type,
        })
      }
    }
  })

  return uniqueArray
}

export default removeDuplicateUsingFilter