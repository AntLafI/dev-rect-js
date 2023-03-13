import React from 'react';
import ReactDOM from 'react-dom/client';

var tasks = [{"title":"1.Idée","isChecked":true},{"title":"2.Marché","isChecked":true},{"title":"3.Wireframe","isChecked":true},{"title":"4.Design","isChecked":true},{"title":"5.Landingpage","isChecked":true},{"title":"6.Développement","isChecked":false},{"title":"7.Publish","isChecked":false},{"title":"8.Pub","isChecked":false},{"title":"9.Feedback","isChecked":false}]
localStorage.setItem('tasks',JSON.stringify(tasks))



class ToDoApp extends React.Component {


  render(){
    <Header />;
    <ToDoBoard />;
    <Footer />
  }
}

class Header extends React.Component {

}

class ToDoBoard extends React.Component {
  render () {
    <Tasks />
  }
}

class Footer extends React.Component {

}

class Tasks extends React.Component {

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoApp />);


