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
import InsuranceImage from "../../assets/Insurance.jpg"
import InsuranceImage1 from "../../assets/Insurance_1.jpg"
import InsuranceImage2 from "../../assets/Insurance_2.jpg"
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Insurance() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [insurance, setInsurance] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const { exchangeRate ,currency} = CurrencyState();
  const InsurancePics=[InsuranceImage,InsuranceImage1,InsuranceImage2];
  const backgroundImageStyle = (index) => {
    return {
        backgroundImage: `url(${InsurancePics[index % InsurancePics.length]})`,
        backgroundSize: 'cover',
      
    };
};
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const handleEdit = (insurance) => {
    setSelectedInsurance(insurance);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedInsurance) return;
    setNewInsuranceData({
      id: selectedInsurance.id,
      name: selectedInsurance.name,
      totalAmount: selectedInsurance.totalAmount,
      buyDate: selectedInsurance.buyDate,
      premium: selectedInsurance.premium,
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedInsurance]);

  const [newInsuranceData, setNewInsuranceData] = useState({
    id: '',
    name: '',
    premium:"",
    buyDate: '',
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
    axios.get(`${BASE_URl}/api/insurance/getInsuranceForUser/${userData.userName}`)
      .then(response => {
        setInsurance(response.data);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
      });
  };

  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNewInsuranceData({    id: '',
    name: '',
    premium:"",
    buyDate: '',
    totalAmount: '',
    lastUpdateDate: '',})
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInsuranceData({ ...newInsuranceData, [name]: value });
  };




  const handleDeleteStock = (insuranceId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this stock.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/insurance/deleteInsurance/${insuranceId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Insurance Deleted',
                text: 'The Insurance has been deleted successfully.',
              });
              fetchInsurance();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Insurance',
                text: 'An error occurred while deleting the Insurance. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Insurance:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Realestate',
              text: 'An error occurred while deleting the Insurance. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newInsuranceData.id) {
      axios.put(`${BASE_URl}/api/insurance/updateInsurance/${newInsuranceData.id}`, newInsuranceData)
        .then(response => {
          console.log('Insurance updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Insurance Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Realestate:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/insurance/save`, newInsuranceData)
        .then(response => {
          console.log('Stock saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Stock Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving stock:', error);
        });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Insurance</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {insurance.map((insurance, index) => (
          <div className="col-md-4 mb-3" key={insurance.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={backgroundImageStyle(index)}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "white" }}>{insurance.name}</h5>
                <p style={{ color: "white" }}>Premium:<strong> {renderPrice(insurance.premium)} {currency}</strong></p>
                <p style={{ color: "white" }}>Buy Date:<strong> {moment(insurance.buyDate).format("DD-MM-YYYY")}</strong></p>
                <p style={{ color: "white" }}>Total Price:<strong> {renderPrice(insurance.totalAmount)} {currency}</strong></p>
                <p style={{ color: "white" }}>Last Update Date:<strong> {moment(insurance.lastUpdateDate).format("DD-MM-YYYY")}</strong></p>
              </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(insurance) }} style={{ color: "white" }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(insurance.id) }} style={{ color: "white" }}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newInsuranceData.id ? 'Edit' : 'Add'} Insurance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Insurance Type</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder='Health/Term'
                  className='border border-dark mb-2'
                  value={newInsuranceData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label>Premium</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="premium"
                  placeholder='50₹'
                  className='border border-dark mb-2'
                  value={newInsuranceData.premium}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Buy Date</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="date"
                  name="buyDate"
                  className='border border-dark mb-2'
                  value={newInsuranceData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Total Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  className='border border-dark mb-2'
                  value={newInsuranceData.totalAmount}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newInsuranceData.id ? 'Update' : 'Save'} Insurance</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Insurance;
