import React, {useState} from 'react'; 
import { Button, Card, CardImg, CardTitle, Input 
  ,Modal ,ModalHeader,ModalBody , Form, FormGroup, Label, Col} from "reactstrap";
import { Link } from "react-router-dom";
// import { Control, LocalForm, Errors } from 'react-redux-form';

//Function hiển thị ra danh sách nhân viên
function RenderStaffList({ nv, onClick }) {
    // console.log("nv", nv)
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
  
  const [ten,setTen]=useState('')
   const listNhanvien= props.staffs.filter((nv)=>{
     
     if(ten===""){
       return nv;
     }else if ( 
       nv.name.toLowerCase().includes(ten.toLowerCase())
      ){
      return nv;

     }

   }).map((nv)=>{  
       return (          
           <div className="col-lg-2 col-md-4 col-6" key={nv.id}>
               <RenderStaffList nv={nv} onClick={props.onClick} />
           </div>         
       )
   })
    // console.log(ten)
  //  const [nhanvienmoi,setNhanvienmoi]= useState({
  //   name: "",
  //   doB: "",
  //   salaryScale: 1,
  //   startDate: "",
  //   department: 'sale',
  //   annualLeave: 0,
  //   overTime: 0,
  //   image: '/assets/images/alberto.png',
  //   touched:{
  //     name: false,
  //   doB:false,
  //   salaryScale: false,
  //   startDate: false,
  //   department: false,
  //   annualLeave:false,
  //   overTime:false,
  //   }
  //  }
  //  )

  //  function validate(name,doB ,alaryScale , startDate, department ,annualLeave ,overTime ) {
  //    const errors ={
  //     name: "",
  //     doB: "",
  //     salaryScale: "",
  //     startDate: "",
  //     department: "",
  //     annualLeave: "",
  //     overTime: "",
     
  //    }
  //    return errors ;
  //  }


    return(
        <div className="container" >

          <div className="row">
            <div className="col-12 col-md-6 md-3 ">
                <div className="row">
                  <div className="col-10 col-md-10">
                    <h3>Nhân viên</h3>

                  </div>
                  <div className="col-2 col-auto">
                    <Button outline  >
                      <span className="fa fa-plus fa-lg"></span>
                    </Button>
                  </div>
                </div>
            </div>
          <div className="col-12 col-md-6 mt-3">
            <Form >
             <div className="col-8 col-md-8">
             <Label htmlFor="timkiem" > </Label>
               
               <Input type="text" id="timkiem" name="timkiem"
               value={ten}
               onChange={e=> setTen(e.target.value)}
              placeholder="Hãy nhập tên nhân viên muốn tìm ..."
                />
             </div>
           
              {/* <div className="col-4 col-md4"  >
              <Button>Timkiem</Button>
              </div> */}
                
                
              
           
            </Form>
          </div>
         
          </div>
        

            <div className="row">{listNhanvien}</div>

        </div>
    )
}

export default StaffList;