import User from '../models/User.js'

const ensureAuthenticated = async (req, res, next) => {
  const userId = req.headers['x-user-id']

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(401).json({ message: 'Invalid user' })
  }

  req.user = user
  next()
}

export default ensureAuthenticated
