import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat, { masks } from "dateformat";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }
    onDishSelect(staff) {
        this.setState({ selectedDish: staff });
    }
    renderDish(staff) {
        if (staff != null) {
            console.log('nhân vien', staff);
            let startDate = new Date(staff.startDate);
            return (
                // <Card>
                // <Card className="col-12 col-md-5 m-1" >
                //     <CardImg width="100%" object src={staff.image} alt={staff.name} />
                //     <CardBody >
                //     <CardTitle>{staff.name}</CardTitle>
                //     <CardText>{staff.description}</CardText>
                //         </CardBody>  
                // </Card>
                // <Card  className="col-12 col-md-5 m-1" >
                //     <CardTitle>{staff.name}</CardTitle>
                // </Card>
                // </Card>

                <div className="col-12 col-md-5 m-1" >
                    <h3> Họ và tên : {staff.name}</h3>
                    <p> Ngày vào công ty : {startDate.toLocaleDateString()}</p>
                    <p> Phòng ban: {staff.department.name}</p>
                    <p> Số ngày nghỉ còn lại : {staff.annualLeave}</p>
                    <p> Số ngày đã làm thêm : {staff.overTime}</p>

                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        const menu = this.props.staffs.map((staff) => {
            return (
                <div style={{ "color": "gray", "fontSize": "20px" }} onClick={() => this.onDishSelect(staff)} className="col-12 col-md-5 m-1"  >
                    <p style={{ textAlign: 'left' }}> {staff.name}</p>
                </div>
                // <div key={staff.id} className="col-12 col-md-5 m-1">
                //     <Card onClick={() => this.onDishSelect(staff)}  >

                //             <CardImg width="100%" object src={staff.image} alt={staff.name} />


                //         <CardImgOverlay>
                //                 <CardTitle>{staff.name}</CardTitle>

                //             </CardImgOverlay>
                //     </Card>
                // </div>
            )
        })

        return (
            <div className="container">
                <div className="row">

                    {menu}

                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)};
                </div>
            </div>
        )
    }
}
export default Menu;