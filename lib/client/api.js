const axios = require('axios')

const createPath = async ({ body, parentId }) => {
  const result = await axios.post('/api/paths/create', { body, parentId })
  console.log("INSIDE THE AXIOS CALL")
  console.log(result)
  return { path: result.data }
}

module.exports = {
  createPath
}