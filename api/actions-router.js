const express = require('express')
//import DB
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

// Main Get request to get current data --> /
router.get('/', async (req, res) => {
    try {
      const action = await actionsDB.get();
      res.status(200).json(action);
      console.log(action)
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The requested action could not be retrieved',
      });
    }
  });

   //  Get request for actions by id --> /:id
   router.get('/:id', async (req, res) => {
    try {
      const actionID = await actionsDB.get(req.params.id);

      actionID ? res.status(200).json(actionID) : res.status(404).json({ message: "The action with the specified ID does not exist." })
        console.log(actionID)
    } catch (error) {
      // log error to database
      res.status(500).json({
        message: "The action information for this user could not be retrieved."
      });
    }
  });

  // action request to add new actions --> /
  router.post('/', async (req, res) => {
    const newAction = req.body;
        try {
            const action = await actionsDB.insert(newAction);
            res.status(201).json(action)
            console.log(req.body)
          } catch (error) {
            // log error to database
            res.status(500).json({
              message: "There was an error while saving the action to the database" 
            })
    }
  });


  // Delete request to delete actions --> /:id
  router.delete('/:id', async (req, res) => {
    try {
      const action = await actionsDB.remove(req.params.id);
    action > 0 ? res.status(204).end() : res.status(404).json({ message: "The action with the specified ID does not exist."  });
      
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The action could not be removed"
      });
    }
  })


  // Put request to edit actions --> /:id
  router.put('/:id', async (req, res) => {
    const newAction = req.body
    try {
      const { id } = req.params
      const action = await actionsDB.update(id, newAction);
      action ? res.status(200).json(newAction) : res.status(404).json({ message: "The action with the specified ID does not exist." });
      }
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The action information could not be modified."
      });
    }
  });


module.exports = router;