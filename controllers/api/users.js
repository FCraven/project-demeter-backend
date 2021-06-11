const { User } = require('../../db');
const router = require('express').Router();

// /api/users

router.get('/', async (req,res,next)=> {
  try {
    const users = await User.find({}, { select: '-password' });
    if(!users) {
      res.send('No users found')
    }
    res.json(users)
  }catch(err) {
    next(err)
  }
})

router.get('/:id', async (req,res,next)=> {
  try {
    const user = await User.findById(req.params.id, { select: '-password'})
    res.json(user)
  } catch(err) {
      next(err)
  }
})

router.post('/', async (req,res,next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser)
  } catch(err) {
      console.log(err)
      next(err);
  }
})

router.put('/:id', async (req,res,next)=> {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!updatedUser) {
      res.send('There was a problem updating the user. Please try again.')
    }
    res.json(updatedUser)
  } catch (err) {
      next(err)
  }
})


router.delete('/:id', async (req,res,next)=> {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id, { select: '-password'});
    if(!deletedUser) {
      return res.send('There is no user by that id to delete.')
    }
    res.json(deletedUser)
  } catch(err) {
      next(err)
  }
})


module.exports = router;
