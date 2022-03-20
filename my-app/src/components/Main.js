import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import StaffList from './StaffList';
import StaffDetail from './StaffDetail';
import Department from './Department';
import Salary from './Salary';
import { Switch ,Route } from 'react-router-dom'
import {DEPARTMENTS ,STAFFS } from '../shared/staffs'

function Main(){
    const [nhanvien,setNhanvien] = useState({
        staffs:STAFFS,
        departments:DEPARTMENTS
    })

const StaffWithId =({match})=> {
    return (
        <StaffDetail nv={nhanvien.staffs.filter((item)=>item.id === parseInt(match.params.nhanvienId,10))[0] }  />
    )
}

    return (
        <div>
            <Header />
            <Switch>
            <Route exact  path="/nhanvien" component={()=> <StaffList staffs={nhanvien.staffs} />} />
            <Route path="/nhanvien/:nhanvienId" component={StaffWithId}/>
            <Route exact path="/bophan" component={()=> <Department dept={nhanvien.departments} />}/>
            <Route exact path="/luong" component={()=> <Salary luong={nhanvien.staffs} />}/>
            </Switch>
            <Footer />
        </div>
    )

}
export default Main;