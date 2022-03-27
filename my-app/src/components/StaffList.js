import React, { Component } from 'react'; 
import { Button, Card, CardImg, CardTitle, Input 
  ,Modal ,ModalHeader,ModalBody , Form, FormGroup, Row,Label, Col, FormFeedback} from "reactstrap";
import { Link } from "react-router-dom";


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

// Presentational component (const)
class StaffList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false
      },

      nameF: "",
      modalOpen: false
    };

    this.timNhanvien = this.timNhanvien.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

handleSubmit=(event) => {
  event.preventDefault()

  const newStaff = {
    name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image
  }
  console.log('fsf',newStaff)
  this.props.addStaff(newStaff);
  
}

validate(
  name,
  department,
  salaryScale,
  doB,
  startDate,
  annualLeave,
  overTime
) {
  const errors = {
    name: "",
    department: "",
    doB: "",
    startDate: "",
    salaryScale: "",
    annualLeave: "",
    overTime: ""
  };
  if (this.state.touched.name && name.length < 3)
    errors.name = "Name should be >= 3 characters";
  else if (this.state.touched.name && name.length > 50)
    errors.name = "Name should be <= 10 characters";
  if (this.state.touched.department && department.length < 1)
    errors.department = "Yêu cầu nhập";
  if (this.state.touched.salaryScale && salaryScale.length < 1)
    errors.salaryScale = "Yêu cầu nhập";
  if (this.state.touched.annualLeave && annualLeave.length < 1)
    errors.annualLeave = "Yêu cầu nhập";
  if (this.state.touched.overTime && overTime.length < 1)
    errors.overTime = "Yêu cầu nhập";
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
    this.state.name,
    this.state.department,
    this.state.salaryScale,
    this.state.doB,
    this.state.startDate,
    this.state.annualLeave,
    this.state.overTime
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
            <Form onSubmit={this.handleSubmit}>
              <Row className="control-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
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
                    value={this.state.doB}
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
                  <Input
                    type="select"
                    name="department"
                    id="department"
                    className="form-control"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onBlur={this.handleBlur("department")}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    className="form-control"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    className="form-control"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="success">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

        <div className="row shadow mb-5 mt-5">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
