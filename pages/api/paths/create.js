const Path = require('../../../lib/models/Path')

export default async function (req, res) {
  if (req.method === 'GET') { // Convert back to POST
    // Get the parameters from the request
    // Include the other params later
    const { query: { tldr } } = req

    // Create the Path in the DB
    const p = new Path({ tldr, owner: '6056235b1c8b7b01c375eb9a', body: { hello: 'world' }, nsfw: false, parent: null })
    await p.save()
    return res.status(201).json(p) 
  } 
  return res.status(404)
}