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

import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function FixedDeposits() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [fixedDeposit, setFixedDeposit] = useState([]);
  const [selectedFixedDeposit, setSelectedFixedDeposit] = useState(null);
  const { exchangeRate ,currency} = CurrencyState();
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const handleEdit = (fixedDeposit) => {
    setSelectedFixedDeposit(fixedDeposit);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedFixedDeposit) return;
    setNewFDData({
      id: selectedFixedDeposit.id,
      name: selectedFixedDeposit.name,
      years:selectedFixedDeposit.years,
      bankName:selectedFixedDeposit.bankName,
      totalAmount: selectedFixedDeposit.totalAmount,
      fixedDate: selectedFixedDeposit.fixedDate,
      premium: selectedFixedDeposit.premium,
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedFixedDeposit]);

  const [newFDData, setNewFDData] = useState({
    id: '',
    name: '',
    years:"",
    bankName: '',
    fixedDate:"",
    totalAmount: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { // Check if userData and userName are defined
      fetchInsurance(); // Fetch stocks only if userName is available
    }
  }, [userData]);
  const fetchInsurance = () => {
    axios.get(`${BASE_URl}/api/fixedDeposits/getFixedDepositForUser/${userData.owner}`)
      .then(response => {
        setFixedDeposit(response.data);
      })
      .catch(error => {
        console.error('Error fetching fixedDeposit:', error);
      });
  };

  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFDData({ ...newFDData, [name]: value });
  };




  const handleDeleteStock = (fdId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this  fixedDeposit.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/fixedDeposits/deleteFixedDeposit/${fdId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'FixedDeposit Deleted',
                text: 'The fixedDeposit has been deleted successfully.',
              });
              fetchInsurance();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete fixedDeposit',
                text: 'An error occurred while deleting the fixedDeposit. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting fixedDeposit:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Realestate',
              text: 'An error occurred while deleting the fixedDeposit. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newFDData.id) {
      axios.put(`${BASE_URl}/api/fixedDeposits/updateFixedDeposit/${newFDData.id}`, newFDData)
        .then(response => {
          console.log('FixedDeposit updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'FixedDeposit Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating fixedDeposit:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/fixedDeposits/save`, newFDData)
        .then(response => {
          console.log('FixedDeposit saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'FixedDeposit Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving fixedDeposit:', error);
        });
    }
  };

  return (
    <div>
       <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {fixedDeposit.map((fixedDeposit, index) => (
          <div className="col-md-4 mb-3" key={fixedDeposit.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundColor: index < titleColors.length ? titleColors[index] : titleColors[index % titleColors.length] }}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "white" }}>{fixedDeposit.name}</h5>
                <p style={{ color: "white" }}><strong>BankName:</strong> {fixedDeposit.bankName}</p>
                <p style={{ color: "white" }}><strong>Years:</strong> {fixedDeposit.years}</p>
                <p style={{ color: "white" }}><strong>Fixed Date:</strong> {moment(fixedDeposit.fixedDate).format("DD-MM-YYYY")}</p>
                <p style={{ color: "white" }}><strong>Total Amount:</strong> {renderPrice(fixedDeposit.totalAmount)} {currency}</p>
                <p style={{ color: "white" }}><strong>Last Update Date:</strong> {moment(fixedDeposit.lastUpdateDate).format("DD-MM-YYYY")}</p>
              </div>
              {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(fixedDeposit) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(fixedDeposit.id) }}></DeleteForeverIcon>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newFDData.id ? 'Edit' : 'Add'} F/D</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>F/D Name </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  className='border border-dark mb-2'
                  value={newFDData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label>Bank Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="bankName"
                  placeholder='SBI/AXIS/UNION'
                  className='border border-dark mb-2'
                  value={newFDData.bankName}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Years</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="years"
                  placeholder='6yrs/10yrs'
                  className='border border-dark mb-2'
                  value={newFDData.years}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Fixed Date</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="date"
                  name="fixedDate"
                  className='border border-dark mb-2'
                  value={newFDData.fixedDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Total Amount</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  className='border border-dark mb-2'
                  value={newFDData.totalAmount}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newFDData.id ? 'Update' : 'Save'} FixedDeposit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FixedDeposits;
