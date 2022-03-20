import React from 'react'; 
import {Card ,CardImg,CardText,CardTitle ,BreadcrumbItem,Breadcrumb} from 'reactstrap'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'

function StaffDetail(props) {
   if ( props.nv != null ) { 
       console.log( 'sao', props.nv)
       return(
          
           <div className=" container"  >
               <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to='/nhanvien' > Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active > {props.nv.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.nv.name}</h3>
                    <hr/>
                </div>
                <div className="row mb-3">
                    <RenderStaff staff={props.nv}/>
               
                </div>
               </div>

           </div>
       )
   } else { 
       return(
           <div></div>
       )
   }
}
//function dùng để hiển thị chi tiết thông tin về nhân viên
function RenderStaff(staff) {
    console.log(staff)
    if(staff!=null) { 
        return(
            <div className="col-12">
                <div className="row">   
                    <div className="col-3">
                        <CardImg width="100%" src={ staff.staff.image} alt={staff.name} />
                    </div>
                    <div className="col-9">
                        <CardTitle >Họ và tên: {staff.staff.name}</CardTitle>
                        <CardText >Ngày sinh: {dateFormat( staff.doB ,"dd/MM/yyyy")}</CardText>
                        <CardText >Ngày vào công ty: {dateFormat( staff.startDate,"dd/MM/yyyy")}</CardText> 
                        <CardText >Phòng ban: {staff.staff.department.name}</CardText>
                        <CardText >Số ngày nghỉ còn lại: {staff.staff.annualLeave}</CardText>
                        <CardText >Số ngày đã làm thêm: {staff.staff.overTime}</CardText>
                       
                    </div>
                </div>
            </div>
        )
        }else{
            return(
                <div></div>
            )
        }
    
}

export default StaffDetail;