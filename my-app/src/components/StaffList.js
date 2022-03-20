import React from 'react'; 
import { Card, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

//Function hiển thị ra danh sách nhân viên
function RenderStaffList({ nv, onClick }) {
    console.log("nv", nv)
    return (
      <Card>
        <Link to={`/nhanvien/${nv.id}`}>
          <CardImg width="100%" src={nv.image} alt={nv.name} />
          <div>
            <CardTitle>{nv.name}</CardTitle>
          </div>
        </Link>
      </Card>
    );
}

function StaffList(props) {
   const listNhanvien= props.staffs.map((nv)=>{  
       return (          
           <div className="col-lg-2 col-md-4 col-6" key={nv.id}>
               <RenderStaffList nv={nv} onClick={props.onClick} />
           </div>         
       )
   })
    return(
        <div className="container" >
            <div className="row">{listNhanvien}</div>

        </div>
    )
}

export default StaffList;