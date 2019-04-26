import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
constructor() {
  super();

  this.state = {
    projects: [],
    actions: []
  }
}

componentDidMount() {
  const url = 'http://localhost:5000'
  // Get Projects
axios.get(`${url}/api/projects`).then( res => {
  this.setState({
    projects: res.data
  })
  console.log("Projects:",res)
}).catch(err => {
  console.log('Something went wrong..', err)
})

// Get Actions
axios.get(`${url}/api/actions`).then( res => {
  this.setState({
    actions: res.data
  })
  console.log("Actions:",res)
}).catch(err => {
  console.log('Something went wrong..', err)
})
}

  render() {
    return (
      <div className="App">
        <h1>Current Projects</h1>
        <div>

          {this.state.projects.map(project => (
            <div key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              {project.completed ? (<div>
                <span>Completed?</span><i class="fas fa-check"></i>
              </div>) :(<div>
                <span>Completed?</span><i class="fas fa-times"></i>
              </div>)}
            </div>
          ))}
        </div>
       
      </div>
    );
  }
}

export default App;
