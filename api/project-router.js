const express = require('express')
//import DB
const projectsDB = require('../data/helpers/projectModel.js');
const router = express.Router();

// Main Get request to get current data --> /
router.get('/', async (req, res) => {
    try {
      const project = await projectsDB.get();
      res.status(200).json(project);
      // console.log(project)
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The requested projects could not be retrieved',
      });
    }
  });

   //  Get request for project by id --> /:id
   router.get('/:id', async (req, res) => {
    try {
      const projectID = await projectsDB.get(req.params.id);

      projectID ? res.status(200).json(projectID) : res.status(404).json({ message: "The projects with the specified ID does not exist." })
        // console.log(projectID)
    } catch (error) {
      // log error to database
      res.status(500).json({
        message: "The projects information could not be retrieved."
      });
    }
  });

   //  Get request for project's actions by id --> /:id
  router.get('/:id', async (req, res) => {
    const projectId = req.params.project_id;
    try {
      const actionsProject = await projectsDB.getProjectActions(projectId);

      projectId.length !== 0 ? response.status(200).json(actionsProject) : res.status(404).json({ message: "The project's action with the specified user ID does not exist." })
    } catch (error) {
      response.status(500).json({
        error: 'Could not retrieve the actions from the project in database.'
      });
    }
  });
  

  // Post request to add new project --> /
  router.post('/', async (req, res) => {
    const newProject = req.body
        try {
            const project= await projectsDB.insert(newProject);
            res.status(201).json(project)
            console.log(newProject)
          } catch (error) {
            // log error to database
            res.status(500).json({
              message: "There was an error while saving the project to the database" 
            })
    }
  });


  // Delete request to delete project --> /:id
  router.delete('/:id', async (req, res) => {
    try {
      const project = await projectsDB.remove(req.params.id);
      project > 0 ? res.status(204).end() : res.status(404).json({ message: "The project with the specified ID does not exist."  });
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The project could not be removed"
      });
    }
  })


  // Put request to edit project --> /:id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const project = await projectsDB.update(id, req.body);
      project ? res.status(200).json(req.body) : res.status(404).json({ message: "The project with the specified ID does not exist." });
      }
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The project information could not be modified."
      });
    }
  });


module.exports = router;