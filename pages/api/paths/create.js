const Path = require('../../../lib/models/Path')
import { getSession } from 'next-auth/client'
import mongoose from 'mongoose'

export default async function (req, res) {
  const session = await getSession({ req }) 

  if (req.method === 'POST') {
    const { body: { body, parentId, tldr } } = req
    const p = new Path({ body, tldr, owner: session.userId, parent: mongoose.Types.ObjectId(parentId) })
    await p.save()
    return res.status(201).json(p) 
  } 
  
  return res.status(404)
}