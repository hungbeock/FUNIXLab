import React, { Component } from 'react'; 
import { Button, Card, CardImg, CardTitle, Input 
  ,Modal ,ModalHeader,ModalBody , Form, FormGroup, Row,Label, Col, FormFeedback} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

//Function hiển thị ra danh sách nhân viên
function RenderStaffList({ nv, onClick }) {
    // console.log("sao the no")
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

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nameF: "",
      modalOpen: false,
      doB: "",
      startDate: "",
      touched: {
        doB: false,
        startDate: false
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.timNhanvien = this.timNhanvien.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (value) => {
    const newStaff = {
      name: value.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: value.department,
      salaryScale: value.salaryScale,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png"
    };
    if (!this.state.doB || !this.state.startDate)
      this.setState({
        touched: { doB: true, startDate: true }
      });
    else this.props.addStaff(newStaff);
  };

validate(doB, startDate) {
  const errors = {
    doB: "",
    startDate: ""
  };

  if (this.state.touched.doB && doB.length < 1) errors.doB = "Yêu cầu nhập";
  if (this.state.touched.startDate && startDate.length < 1)
    errors.startDate = "Yêu cầu nhập";

  return errors;
}

toggleModal(){
  this.setState({
    modalOpen :!this.state.modalOpen
  })
}
 /* Hàm tìm kiếm từ khóa tên nhân viên và render ra kết quả tìm kiếm nhân viên  */
timNhanvien(event){
    event.preventDefault();
    const nameS=event.target.nameS.value;
    this.setState({nameF:nameS} );
    }

render() {
  const errors = this.validate(
      this.state.doB,
      this.state.startDate
      );
  
   const staffList= this.props.staffs.filter((nv)=>{
    if(this.state.nameF ===""){
      return nv;
     }else if ( 
      nv.name.toLowerCase().includes(this.state.nameF.toLowerCase())
     ){
     return nv;
      }
     }).map((nv)=>{  
       return (          
           <div className="col-lg-2 col-md-4 col-6" key={nv.id}>
               <RenderStaffList nv={nv}  />
           </div>         
       )
     })
     return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className="row">
              <div className="col-10 col-md-10">
                <h3>Nhân viên</h3>
              </div>
              <div className="col-2 col-auto">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <form onSubmit={this.timNhanvien} className="form-group row">
              <div className="col-8 col-md-8">
                <input
                  type="text"
                  name="nameS"
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên ..."
                />
              </div>
              <div className="col-4 col-md-4">
                <button className="btn btn-success" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>

        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="control-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30)
                    }}
                  />
                  <Errors
                    model=".name"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu  ",
                      minLength: "nhập nhiều hơn 3 ký tự",
                      maxLength: "Yêu cầu nhập ít hơn 30 ký tự"
                    }}
                  />
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="doB"
                    id="doB"
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    id="department"
                    defaultValue="Sale"
                    className="form-control"
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    validators={{
                      required,
                      isNumber
                    }}
                    defaultValue="1"
                    className="form-control"
                  />
                  <Errors
                    model=".salaryScale"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số"
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".annualLeave"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số"
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".overTime"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số"
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="success" onClick={this.toggleModal} >
                    Thêm
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>

        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;