const express = require("express");
const initModels = require("./models/initModels");
const app = express();
const db = require("./utils/database");
const responseHandlers = require('./utils/handleResponses')
const conversationsRouter = require('./conversations/conversations.router')
const messagesRouter = require('./messages/messages.router')
const participantsRouter = require ('./participants/participants.router')
const usersRouter = require('./users/users.router')

app.use(express.json());

db.authenticate()
  .then(()=>{
    responseHandlers.success({
      message: 'Database authenticated successfully'
    })}
    
  )
  .catch(err => {
    responseHandlers.error({
      data: err,
      message: 'An error occurred with the database autentication'
    })
  })

db.sync()
  .then(()=>{
    responseHandlers.success({
      message: 'Database synced successfully'
    })
  })
  .catch(err => {
    responseHandlers.error({
      data: err,
      message: 'An error occurred with the database synchronization'
    })
  })

initModels()

app.get('/', (req, res) => {
  responseHandlers.success({
    res,
    status:200,
    message: 'Servidor inicializado correctamente',
    data: {
      "users": "http://localhost:900/api/v1/users",
      "conversations": "http://localhost:900/api/v1/conversations"
    }
  })
});

app.use('/api/v1', conversationsRouter)
app.use('/api/v1', messagesRouter)
app.use('/api/v1', participantsRouter)
app.use('/api/v1', usersRouter)

app.use('*', (req, res) => {
  responseHandlers.error({
    res, 
    status: 404,
    message: 'URL not found, please try with http://localhost:9000/'

  })
})
app.listen(9000, () => {
  console.log("Server started at port 9000");
});

