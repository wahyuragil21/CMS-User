if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const express = require('express');
const usersController = require('./controllers/userController');
const app = express()
const port = 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: false }));

app.post('/register', usersController.register)
app.post('/login', usersController.login)
app.get('/all-users', usersController.getUser)
app.get('/user', usersController.getUserById)
app.put('/update-user', usersController.updateProfile)
app.delete('/del-user', usersController.deleteUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})