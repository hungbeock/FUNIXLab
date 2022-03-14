import React, { Component }from 'react';
import logo from './logo.svg';
import { Navbar,NavbarBrand  } from 'reactstrap';
import Menu from './components/MenuCompinent';
import './App.css';
import {STAFFS ,DEPARTMENTS} from './shared/staffs';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      staffs:STAFFS,
      deparments : DEPARTMENTS 
    };
  };
  render(){
  return (
    <div className="App">
     <Navbar dark color="primary" >
       <div className="container">
         <NavbarBrand href="/"> Ứng dụng quản lý nhân sự V1.0 </NavbarBrand>
       </div>
       </Navbar>
       <Menu staffs={this.state.staffs} />
       
    </div>
  );
}
}

export default App;
