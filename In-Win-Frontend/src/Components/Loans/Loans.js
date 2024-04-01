import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stocks/Stock.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation } from "react-router-dom";
import LoanImage from "../../assets/Loan.jpg"
import LoanImage1 from "../../assets/Loan_1.jpg"
import LoanImage2 from "../../assets/Loan_2.jpg"

import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Loans() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [loan, setLoan] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { exchangeRate,currency } = CurrencyState();
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const loanImages=[LoanImage,LoanImage1,LoanImage2];
  const backgroundImageStyle = (index) => {
    return {
        backgroundImage: `url(${loanImages[index % loanImages.length]})`,
        backgroundSize: 'cover',
      
    };
};
  const handleEdit = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedLoan) return;
    setNewLoanData({
      id: selectedLoan.id,
      loanName: selectedLoan.loanName,
      bankName: selectedLoan.bankName,
      loanType: selectedLoan.loanType,
      tenureInYears: selectedLoan.tenureInYears,
      rateOfInterest: selectedLoan.rateOfInterest,
      loanAmount: selectedLoan.loanAmount,
      monthlyEMI: selectedLoan.monthlyEMI,
      buyDate: selectedLoan.buyDate,

    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedLoan]);

  const [newLoanData, setNewLoanData] = useState({
    id: '',
    loanName: "",
    bankName: "",
    loanType: "",
    tenureInYears: "",
    rateOfInterest: "",
    loanAmount: '',
    monthlyEMI: "",
    buyDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { 
      fetchLoans(); 
    }
  }, [userData]);
  const fetchLoans = () => {
    axios.get(`${BASE_URl}/api/loans/getLoansForUser/${userData.userName}`)
      .then(response => {
        setLoan(response.data);
      })
      .catch(error => {
        console.error('Error fetching Loan:', error);
      });
  };

  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNewLoanData({
      id: '',
      loanName: "",
      bankName: "",
      loanType: "",
      tenureInYears: "",
      rateOfInterest: "",
      loanAmount: '',
      monthlyEMI: "",
      buyDate: '',
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoanData({ ...newLoanData, [name]: value });
  };




  const handleDeleteStock = (loanId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this loan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/loans/deleteLoan/${loanId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'loan Deleted',
                text: 'The loan has been deleted successfully.',
              });
              fetchLoans();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Loan',
                text: 'An error occurred while deleting the Loan. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Loan:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Loan',
              text: 'An error occurred while deleting the Loan. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newLoanData.id) {
      axios.put(`${BASE_URl}/api/loans/updateLoan/${newLoanData.id}`, newLoanData)
        .then(response => {
          console.log('Loan updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Loan Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchLoans();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Loan:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/loans/save`, newLoanData)
        .then(response => {
          console.log('Loan saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Loan Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchLoans();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving stock:', error);
        });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Loan</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-0">
        {loan.map((loan, index) => (
          <div className="col-md-4 mb-3" key={loan.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={backgroundImageStyle(index)}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "black" }}>{loan.loanName}</h5>
                <p style={{ color: "black" }}> Loan type:<strong>{loan.loanType}</strong></p>
                <p style={{ color: "black" }}>Bank Name:<strong>{loan.bankName}</strong></p>
                <p style={{ color: "black" }}>Rate Of Interest:<strong>{loan.rateOfInterest} %</strong></p>
              
                <p style={{ color: "black" }}>Loan Amount:<strong> {renderPrice(loan.loanAmount)} {currency}</strong></p>
                <p style={{ color: "black" }}>Tenure In Years:<strong>{loan.tenureInYears}</strong></p>
                <p style={{ color: "black" }}>Take Date:<strong> {moment(loan.buyDate).format("DD-MM-YYYY")}</strong></p>
                <p style={{ color: "black" }}>Monthly EMI:<strong> {renderPrice(loan.monthlyEMI)} {currency}</strong></p>
                <p style={{ color: "black" }}>Last Update Date:<strong> {moment(loan.lastUpdateDate).format("DD-MM-YYYY")}</strong></p>
              </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(loan) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(loan.id) }}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newLoanData.id ? 'Edit' : 'Add'} Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Loan Type</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="loanType"
                  placeholder='Home/Personal'
                  className='border border-dark mb-2'
                  value={newLoanData.loanType}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col md={4}>
                <Form.Label>Loan Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="loanName"
                  placeholder='Home/Personal'
                  className='border border-dark mb-2'
                  value={newLoanData.loanName}
                  onChange={handleInputChange}
                />
              </Col>
            </Row> */}
            <Row>
              <Col md={4}>
                <Form.Label>Bank Name </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="bankName"
                  placeholder='SBI/HDFC'
                  className='border border-dark mb-2'
                  value={newLoanData.bankName}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Loan Amount </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="loanAmount"
                  placeholder='23/lacs'
                  className='border border-dark mb-2'
                  value={newLoanData.loanAmount}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Rate Of Interest</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="rateOfInterest"
                  placeholder='7%'
                  className='border border-dark mb-2'
                  value={newLoanData.rateOfInterest}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Tenure In Years </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="tenureInYears"
                  className='border border-dark mb-2'
                  value={newLoanData.tenureInYears}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Monthly EMI</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="monthlyEMI"
                  className='border border-dark mb-2'
                  value={newLoanData.monthlyEMI}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label> Taken Date</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="date"
                  name="buyDate"
                  className='border border-dark mb-2'
                  value={newLoanData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>


          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newLoanData.id ? 'Update' : 'Save'} Loan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Loans;
