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
import GoldImage from  "../../assets/gold.jpeg";
function Gold() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [gold, setGold] = useState([]);
  const [selectedGold, setSelectedGold] = useState(null);
  const { exchangeRate ,currency} = CurrencyState(); 
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802","#f2a04e"];
 
  const populateModal = () => {
    if (!selectedGold) return; 
    setNewGoldData({
      id: selectedGold.id,
      name: selectedGold.name,
      symbol: selectedGold.symbol,
      carat: selectedGold.carat,
      purchasePrice: selectedGold.purchasePrice,
      buyDate: selectedGold.buyDate,
      quantity: selectedGold.quantity,
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedGold, populateModal]);

  const [newGoldData, setNewGoldData] = useState({
    id: '',
    name: '',
    symbol: "XAU",
    carat:"",
    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { 
      fetchGold(); 
    }
  }, [userData]);

  const fetchGold = () => {
    axios.get(`${BASE_URl}/api/gold/getGoldForUser/${userData.owner}`)
      .then(response => {
        setGold(response.data);
      })
      .catch(error => {
        console.error('Error fetching gold:', error);
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
    setNewGoldData({ ...newGoldData, [name]: value });
  };
 
  const handleDeleteGold = (stockId) => {
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
        axios.delete(`${BASE_URl}/api/gold/deleteGold/${stockId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Gold Deleted',
                text: 'The stock has been deleted successfully.',
              });
              fetchGold();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Gold',
                text: 'An error occurred while deleting the gold. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting gold:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Gold',
              text: 'An error occurred while deleting the gold. Please try again later.',
            });
          });
      }
    });
  };
  
  const handleSaveGold = () => {
    if (newGoldData.id) {
      axios.put(`${BASE_URl}/api/gold/updateGold/${newGoldData.id}`, newGoldData)
        .then(response => {
          console.log('Gold updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Gold Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchGold();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Gold:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/gold/save`, newGoldData)
        .then(response => {
          console.log('Gold saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Gold Created',
            showConfirmButton: false,
            timer: 1500
          });
          fetchGold();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving Gold:', error);
        });
    }
  };
  const handleEdit = (goldItem) => {
    setSelectedGold(goldItem);
    setShowModal(true);
  };
 

  useEffect(() => {
      fetchGoldPrice();
  }, []);

  const [goldPrice, setGoldPrice] = useState({ perGramPrice24K: 0, perGramPrice22K: 0 });

const fetchGoldPrice = async () => {
    try {
        const response = await axios.get(`${BASE_URl}/api/gold/gold-price`);
        const { perGramPrice24K, perGramPrice22K } = response.data; 
        
        // Store both prices separately in the state
        setGoldPrice({ perGramPrice24K, perGramPrice22K });
    } catch (error) {
        console.error('Error fetching gold price:', error);
    }
};

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4 " style={{marginTop:"1px"}}>
        {gold.map((goldItem, index) => (
          <div className="col-md-4 mb-3" key={goldItem.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundImage: `url(${GoldImage})`, backgroundSize: 'cover' }}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{color:"black"}}>{goldItem.name}</h5>
                <p style={{color:"black"}}><strong >Symbol:</strong> {goldItem.symbol}</p>
                <p style={{color:"black"}}><strong >Carat:</strong> {goldItem.carat}</p>
                <p style={{color:"black"}}><strong>Purchase Price:</strong> {renderPrice(goldItem.purchasePrice)} {currency}</p>
                <p style={{color:"black"}}><strong>Buy Date:</strong> {moment(goldItem.buyDate).format("DD-MM-YYYY")}</p>
                <p style={{color:"black"}}><strong>Quantity:</strong> {goldItem.quantity}</p>
                <p style={{color:"black"}}>
                <strong>Current Price:</strong> 
                {goldPrice  && goldItem.carat == 22 ? renderPrice(goldPrice.perGramPrice22K) : renderPrice(goldPrice.perGramPrice24K)} {currency}  <strong>/gram</strong>
            </p>
                <p style={{color:"black"}}><strong>Last Update Date:</strong> {moment(goldItem.lastUpdateDate).format("DD-MM-YYYY")}</p>
             
              </div>
              {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => {handleEdit(goldItem)}}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => {handleDeleteGold(goldItem.id)}}></DeleteForeverIcon>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newGoldData.id ? 'Edit' : 'Add'} gold</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>gold Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder='Ex ONiE Soft'
                  className='border border-dark mb-2'
                  value={newGoldData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Gold Carat</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="carat"
                  placeholder='22,24'
                  className='border border-dark mb-2'
                  value={newGoldData.carat}
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
                  value={newGoldData.purchasePrice}
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
                  value={newGoldData.buyDate}
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
                  placeholder='In grams'
                  name="quantity"
                  className='border border-dark mb-2'
                  value={newGoldData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Gold;
