import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
constructor() {
  super();

  this.state = {
    projects: []
  }
}

componentDidMount() {
  const url = 'http://localhost:5000/api/projects'
axios.get(`${url}`).then( res => {
  this.setState({
    projects: res.data
  })
  console.log("Users:",res)
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

            </div>
          ))}
        </div>
       
      </div>
    );
  }
}

export default App;
