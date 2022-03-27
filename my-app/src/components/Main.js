import React, { Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import StaffList from './StaffList';
import StaffDetail from './StaffDetail';
import Department from './Department';
import Salary from './Salary';
import { Switch ,Route } from 'react-router-dom'
import {DEPARTMENTS ,STAFFS } from '../shared/staffs'
import newstaff from './StaffList';

class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
        staffs: STAFFS,
        departments: DEPARTMENTS
      };
      this.addStaff = this.addStaff.bind(this);
    }
  
    addStaff = (staff) => {
      const id = Math.floor(Math.random() * 10000 + 1);
      const newStaff = { id, ...staff };
      this.setState({
        staffs: [...this.state.staffs, newStaff]
      });
      console.log(newStaff);
      console.log(this.state.staffs);
    };

    render() {
        const StaffWithId =({match})=> {
            return (
                <StaffDetail nv={this.state.staffs.filter((item)=>item.id === parseInt(match.params.nhanvienId,10))[0] }  />
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                <Route exact  path="/nhanvien" component={()=> <StaffList addStaff={this.addStaff} staffs={ this.state.staffs } />} />
                <Route path="/nhanvien/:nhanvienId" component={StaffWithId}/>
                <Route exact path="/bophan" component={()=> <Department dept={this.state.departments} />}/>
                <Route exact path="/luong" component={()=> <Salary luong={this.state.staffs} />}/>
                </Switch>
                <Footer />
            </div>
        )
    

    }

}



export default Main;