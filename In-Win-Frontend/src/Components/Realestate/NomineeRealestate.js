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

function Realestate() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [realestate, setRealestate] = useState([]);
  const [selectedRealestate, setSelectedRealestate] = useState(null);
  const { exchangeRate,currency } = CurrencyState();
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const handleEdit = (realestate) => {
    setSelectedRealestate(realestate);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedRealestate) return;
    setNewRealestateData({
      id: selectedRealestate.id,
      name: selectedRealestate.name,
      purchasePrice: selectedRealestate.purchasePrice,
      buyDate: selectedRealestate.buyDate,
      quantity: selectedRealestate.quantity,
      currentPrice:selectedRealestate.currentPrice
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedRealestate]);

  const [newRealestateData, setNewRealestateData] = useState({
    id: '',
    name: '',

    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { // Check if userData and userName are defined
      fetchRealestate(); // Fetch stocks only if userName is available
    }
  }, [userData]);
  const fetchRealestate = () => {
    axios.get(`${BASE_URl}/api/realestate/getRealestateForUser/${userData.owner}`)
      .then(response => {
        setRealestate(response.data);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRealestateData({ ...newRealestateData, [name]: value });
  };




  const handleDeleteStock = (realestateId) => {
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
        axios.delete(`${BASE_URl}/api/realestate/deleteRealestate/${realestateId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Realestate Deleted',
                text: 'The Realestate has been deleted successfully.',
              });
              fetchRealestate();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Realestate',
                text: 'An error occurred while deleting the Realestate. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Realestate:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Realestate',
              text: 'An error occurred while deleting the Realestate. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newRealestateData.id) {
      axios.put(`${BASE_URl}/api/realestate/updateRealestate/${newRealestateData.id}`, newRealestateData)
        .then(response => {
          console.log('Realestate updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Realestate Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchRealestate();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Realestate:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/realestate/save`, newRealestateData)
        .then(response => {
          console.log('Stock saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Stock Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchRealestate();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving stock:', error);
        });
    }
  };

  return (
    <div>
     <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {realestate.map((realestate, index) => (
          <div className="col-md-4 mb-3" key={realestate.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundColor: index < titleColors.length ? titleColors[index] : titleColors[index % titleColors.length] }}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "white" }}>{realestate.name}</h5>
                <p style={{ color: "white" }}><strong>Purchase Price:</strong> {renderPrice(realestate.purchasePrice)} {currency}</p>
                <p style={{ color: "white" }}><strong>Buy Date:</strong> {moment(realestate.buyDate).format("DD-MM-YYYY")}</p>
                <p style={{ color: "white" }}><strong>Quantity:</strong> {realestate.quantity}</p>
                <p style={{ color: "white" }}><strong>Current Price:</strong> {renderPrice(realestate.currentPrice)} {currency}</p>
                <p style={{ color: "white" }}><strong>Last Update Date:</strong> {moment(realestate.lastUpdateDate).format("DD-MM-YYYY")}</p>
              </div>
              {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(realestate) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(realestate.id) }}></DeleteForeverIcon>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newRealestateData.id ? 'Edit' : 'Add'} Realestate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Realestate Type</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder='Flat/House/Land'
                  className='border border-dark mb-2'
                  value={newRealestateData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label>Purchase Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="purchasePrice"
                  placeholder='50₹'
                  className='border border-dark mb-2'
                  value={newRealestateData.purchasePrice}
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
                  value={newRealestateData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Quantity</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="quantity"
                  className='border border-dark mb-2'
                  value={newRealestateData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            {selectedRealestate && selectedRealestate.id && (
              <Row>
                <Col md={4}>
                  <Form.Label>current Price</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="number"
                    name="currentPrice"
                    className='border border-dark mb-2'
                    value={newRealestateData.currentPrice}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newRealestateData.id ? 'Update' : 'Save'} Realestate</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Realestate;
