import React, { useState } from 'react';
import {Card, CardTitle, CardBody, CardText, Button, BreadcrumbItem, Breadcrumb } from 'reactstrap'
import { Link } from 'react-router-dom';


function RenderSalaRy({ salary, colorSalary }) {
    return (
        <Card  >
            <CardTitle className="p-3 bg-white rounded m-2">
                {salary.name}
            </CardTitle>
            <CardBody>
                <CardText>Mã nhân viên: {salary.id}</CardText>
                <CardText>Hệ số lương: {salary.salaryScale}</CardText>
                <CardText>Số giờ làm thêm: {salary.overTime}</CardText>
                <CardText>Lương: {" "} {(salary.salaryScale * 3000000 + salary.overTime * 200000).toFixed(0)}
                </CardText>
            </CardBody>
        </Card>
    )
}

// Function sử dụng để hiển thị Salary của tất cả nhân viên 
function Salary(props) {
    const [staffList, setStaffList] = useState(props.luong);

    // Function sử dụng để tính toán lương của nhân viên với đầu vào là : salaryScale and overTime
    function salaryCalc(salaryScale, overTime) {
        const basicSalary = 3000000;
        const overTimeSalary = 200000;
        return salaryScale * basicSalary + overTime * overTimeSalary;
    }

    // Function sử dụng để sort lương của list nhân viên từ cao xuống thấp hoặc từ thấp lên cao 
    function sortSalary(sorttype) {
        let sortedStaffList = [...staffList];
        let salaryA = 0;
        let salaryB = 0;

        // Sort theo thứ tự tăng dần
        if (sorttype === "increase") {
            sortedStaffList.sort(function (a, b) {
                salaryA = salaryCalc(a.salaryScale, a.overTime);
                salaryB = salaryCalc(b.salaryScale, b.overTime);
                return salaryA - salaryB;
            });
        }

        // Sort theo thứ tự giảm dần 
        if (sorttype === "decrease") {
            sortedStaffList.sort(function (a, b) {
                salaryA = salaryCalc(a.salaryScale, a.overTime);
                salaryB = salaryCalc(b.salaryScale, b.overTime);
                return salaryB - salaryA;
            });
        }

        setStaffList(sortedStaffList);
    }

    // Sử dụng để hiển thị lương nhân viên dự theo list nhân viên 
    const salary = staffList.map((ss) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2"
                key={ss.id}>
                <RenderSalaRy salary={ss} />
            </div>
        )
    }
    )
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/nhanvien" > Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active> Bảng lương
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div id="sort" className="row">
                <div className="col-12">
                    <h5>Sắp Xếp Lương Theo </h5>
                </div>
                <div className="col-12">
                    <Button class="btn btn-success" onClick={() => sortSalary("increase")}>
                        <i class="fa fa-sort-amount-asc" aria-hidden="true"></i> Lương thấp
                    </Button>

                    <Button class="btn btn-info" onClick={() => sortSalary("decrease")}>
                        <i class="fa fa-sort-amount-desc" aria-hidden="true"></i> Lương cao
                    </Button>
                </div>
            </div>
            <div className="row shadow mb-3">{salary}</div>
        </div>
    )
}
export default Salary;