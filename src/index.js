import React from 'react';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom/client';



class ToDoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')),
      newTask: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  handleChange(event) {
    this.setState({newTask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newTask !== '') {
      const newTask = {
        title: this.state.newTask,
        isChecked: false
      };

      const tasks = [...this.state.tasks, newTask];

      this.setState({
        tasks: tasks,
        newTask: ''
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  handleCheck(event) {
    const index = event.target.value;
    const tasks = this.state.tasks;
    tasks[index].isChecked = event.target.checked;
    
    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleDelete(event) {
    const index = event.target.value;
    const tasks = this.state.tasks;
    tasks.splice(index, 1);
    
    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleUp(event) {
    const index = event.target.value;
    const tasks = this.state.tasks;
    if (index > 0) {
      const temp = tasks[index];
      tasks[index] = tasks[index - 1];
      tasks[index - 1] = temp;
    }

    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleDown(event) {
    const index = parseInt(event.target.value);
    const tasks = this.state.tasks;
    if (index < tasks.length - 1) {
      const temp = tasks[index];
      tasks[index] = tasks[index + 1];
      tasks[index + 1] = temp;
    }
  
    this.setState({
      tasks: tasks
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  //filter tasks by search
  handleSearch(event) {
    const search = event.target.value;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
    this.setState({
      tasks: filteredTasks
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1 className="title">ToDo App</h1>
          <p className="progress">Progression: {this.state.tasks.filter(task => task.isChecked).length}/{this.state.tasks.length}</p>
        </div>
        <div className="content">
          <ul>
            {this.state.tasks.map((task, index) => (
              <li key={index}>
                <input type="checkbox" checked={task.isChecked} value={index} onChange={this.handleCheck} />
                <span className={task.isChecked ? 'checked' : ''}>{task.title}</span>
                <button value={index} onClick={this.handleDelete}>Suppr</button>
                <button value={index} onClick={this.handleUp}>^</button>
                <button value={index} onClick={this.handleDown}>v</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer">
          <input type="text" onChange={this.handleSearch} placeholder="rechercher"/>
          <Popup trigger={<button> Ajouter </button>} modal nested>{
            close => (
              <div className="modal">
                <div className="header"> Ajouter une tache </div>
                <div className="content">
                  <input type="text" value={this.state.newTask} onChange={this.handleChange} />
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={this.handleSubmit}
                  >
                    Ajouter
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      close();
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )
          }
          </Popup>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//create link node element linking index.js to index.css
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "style.css";
link.type = "text/css";
document.head.appendChild(link);
root.render(<ToDoApp />);


