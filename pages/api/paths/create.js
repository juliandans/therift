const Path = require('../../../lib/models/Path')
import { getSession } from 'next-auth/client'

export default async function (req, res) {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    const { body: { body, parentId } } = req
    const p = new Path({ body, tldr: 'test tldr', owner: session.userId, parent: parentId })
    await p.save()
    return res.status(201).json(p) 
  } 
  
  return res.status(404)
}