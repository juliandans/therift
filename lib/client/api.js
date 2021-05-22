const axios = require('axios')

const createPath = async ({ body, parentId,tldr }) => {
  console.log(`BODY:`)
  console.log(body)
  console.log(`Parent ID`)
  console.log(parentId)
  console.log("TLDR:")
  console.log(tldr.target.value)
  const result = await axios.post('/api/paths/create', { body, parentId, tldr:tldr.target.value }) // <--
  console.log("INSIDE THE AXIOS CALL")
  console.log(result)
  return { path: result.data }
}

module.exports = {
  createPath
}