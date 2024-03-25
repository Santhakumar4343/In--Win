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

function AntiquePiecesNominee() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [antiquePiece, setAntiquePiece] = useState([]);
  const [selectedAntiquePiece, setSelectedAntiquePiece] = useState(null);
  const { exchangeRate,currency } = CurrencyState();
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const handleEdit = (antiquePiece) => {
    setSelectedAntiquePiece(antiquePiece);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedAntiquePiece) return;
    setNewAntiquePieceData({
      id: selectedAntiquePiece.id,
      name: selectedAntiquePiece.name,
      years:selectedAntiquePiece.years,
      buyDate:selectedAntiquePiece.buyDate,
      price: selectedAntiquePiece.price,
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedAntiquePiece]);

  const [newAntiquePieceData, setNewAntiquePieceData] = useState({
    id: '',
    name: '',
    years:"",
    buyDate: '',
    price:"",
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
    axios.get(`${BASE_URl}/api/antiquePieces/getAntiquePiecesForUser/${userData.owner}`)
      .then(response => {
        setAntiquePiece(response.data);
      })
      .catch(error => {
        console.error('Error fetching antiquePieces:', error);
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
    setNewAntiquePieceData({ ...newAntiquePieceData, [name]: value });
  };




  const handleDeleteStock = (fdId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this  antiquePieces.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/antiquePieces/deleteAntiquePiece/${fdId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'AntiquePieces Deleted',
                text: 'The AntiquePieces has been deleted successfully.',
              });
              fetchInsurance();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete antiquePieces',
                text: 'An error occurred while deleting the antiquePieces. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting antiquePieces:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete antiquePieces',
              text: 'An error occurred while deleting the antiquePieces. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newAntiquePieceData.id) {
      axios.put(`${BASE_URl}/api/antiquePieces/updateAntiquePiece/${newAntiquePieceData.id}`, newAntiquePieceData)
        .then(response => {
          console.log('FixedDeposit updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'FixedDeposit Updated',
            showConfirmButton: false,
            timer: 1500
          });
         
          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating fixedDeposit:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/antiquePieces/save`, newAntiquePieceData)
        .then(response => {
          console.log('AntiquePiece saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'AntiquePieces Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving antiquePiece:', error);
        });
    }
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {antiquePiece.map((antiquePiece, index) => (
          <div className="col-md-4 mb-3" key={antiquePiece.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundColor: index < titleColors.length ? titleColors[index] : titleColors[index % titleColors.length] }}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "white" }}>{antiquePiece.name}</h5>
    
                <p style={{ color: "white" }}><strong>Years old:</strong> {antiquePiece.years}</p>
                <p style={{ color: "white" }}><strong>Buy Date:</strong> {moment(antiquePiece.buyDate).format("DD-MM-YYYY")}</p>
                <p style={{ color: "white" }}><strong>Price:</strong> {renderPrice(antiquePiece.price)} {currency}</p>
                <p style={{ color: "white" }}><strong>Last Update Date:</strong> {moment(antiquePiece.lastUpdateDate).format("DD-MM-YYYY")}</p>
              </div>
              {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(antiquePiece) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(antiquePiece.id) }}></DeleteForeverIcon>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newAntiquePieceData.id ? 'Edit' : 'Add'} Antique Piece</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Antique Piece Name </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  className='border border-dark mb-2'
                  value={newAntiquePieceData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label>Years old</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="years"
                  placeholder='500/years'
                  className='border border-dark mb-2'
                  value={newAntiquePieceData.years}
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
                  value={newAntiquePieceData.buyDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Price</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  name="price"
                  className='border border-dark mb-2'
                  value={newAntiquePieceData.price}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newAntiquePieceData.id ? 'Update' : 'Save'} AntiquePiece</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AntiquePiecesNominee;
