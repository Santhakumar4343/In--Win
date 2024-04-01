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
import DiamondImage from "../../assets/Diamond1.jpg"
import DiamondImage2 from "../../assets/diamond.jpg"
import DiamondImage3 from "../../assets/Diamond2.jpg"
function Diamonds() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [diamond, setDiamond] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const { exchangeRate ,currency} = CurrencyState(); 
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802","#f2a04e"];
 const diamondPics=[DiamondImage, DiamondImage2,DiamondImage3];
 const backgroundImageStyle = (index) => {
  return {
      backgroundImage: `url(${diamondPics[index % diamondPics.length]})`,
      backgroundSize: 'cover',
      backgroundColor: titleColors[index % titleColors.length], 
     
  };
};
  const populateModal = () => {
    if (!selectedDiamond) return; 
    setNewDiamondData({
      id: selectedDiamond.id,
      name: selectedDiamond.name,
      shape: selectedDiamond.shape,
      carat: selectedDiamond.carat,
      purchasePrice: selectedDiamond.purchasePrice,
      buyDate: selectedDiamond.buyDate,
      quantity: selectedDiamond.quantity,
    });
  };

  
  useEffect(() => {
    populateModal(selectedDiamond);
}, [selectedDiamond]);

  const [newDiamondData, setNewDiamondData] = useState({
    id: '',
    name: '',
    shape:'',
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
    axios.get(`${BASE_URl}/api/diamond/getDiamondForUser/${userData.userName}`)
      .then(response => {
        setDiamond(response.data);
      })
      .catch(error => {
        console.error('Error fetching Diamond:', error);
      });
  };

  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNewDiamondData({
      id: '',
    name: '',
    shape:'',
    carat:"",
    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiamondData({ ...newDiamondData, [name]: value });
  };
 
  const handleDeleteGold = (diamondId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Diamond.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/diamond/deleteDiamond/${diamondId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Diamond Deleted',
                text: 'The Diamond has been deleted successfully.',
              });
              fetchGold();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Diamond',
                text: 'An error occurred while deleting the Diamond. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Diamond:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Diamond',
              text: 'An error occurred while deleting the gold. Please try again later.',
            });
          });
      }
    });
  };
  
  const handleSaveGold = () => {
    if (newDiamondData.id) {
      axios.put(`${BASE_URl}/api/diamond/updateDiamond/${newDiamondData.id}`, newDiamondData)
        .then(response => {
          console.log('Diamond updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Diamond Updated',
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
      axios.post(`${BASE_URl}/api/diamond/save`, newDiamondData)
        .then(response => {
          console.log('Diamond saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Diamond Created',
            showConfirmButton: false,
            timer: 1500
          });
          fetchGold();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving Diamond:', error);
        });
    }
  };
  const handleEdit = (diamond) => {
    setSelectedDiamond(diamond);
    setShowModal(true);
  };
 

  useEffect(() => {
      fetchGoldPrice();
  }, []);

  const [goldPrice, setDiamondPrice] = useState({ perGramPrice24K: 0, perGramPrice22K: 0 });

const fetchGoldPrice = async () => {
    try {
        const response = await axios.get(`${BASE_URl}/api/gold/gold-price`);
        const { perGramPrice24K, perGramPrice22K } = response.data; 
        
        // Store both prices separately in the state
        setDiamondPrice({ perGramPrice24K, perGramPrice22K });
    } catch (error) {
        console.error('Error fetching gold price:', error);
    }
};

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Diamond</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 " style={{marginTop:"1px"}}>
        {diamond.map((diamond, index) => (
          <div className="col-md-4 mb-3" key={diamond.id}>
            <div className="card h-100 d-flex flex-column border border-dark"  style={backgroundImageStyle(index)}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{color:"white"}}>{diamond.name}</h5>
                <p style={{color:"white"}}>Shape:<strong> {diamond.shape}</strong></p>
                <p style={{color:"white"}}>Carat:<strong> {diamond.carat}</strong></p>
                <p style={{color:"white"}}>Purchase Price:<strong> {renderPrice(diamond.purchasePrice)} {currency}</strong></p>
                <p style={{color:"white"}}>Buy Date:<strong> {moment(diamond.buyDate).format("DD-MM-YYYY")}</strong></p>
                <p style={{color:"white"}}>Quantity:<strong> {diamond.quantity}</strong></p>
                <p style={{color:"white"}}>Current Price:<strong> {renderPrice(diamond.currentPrice)} {currency}</strong> </p>
                <p style={{color:"white"}}>Last Update Date:<strong> {moment(diamond.lastUpdateDate).format("DD-MM-YYYY")}</strong></p>
             
              </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => {handleEdit(diamond)}} style={{color:"white"}}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => {handleDeleteGold(diamond.id)}} style={{color:"white"}}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newDiamondData.id ? 'Edit' : 'Add'} Diamond</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder=''
                  className='border border-dark mb-2'
                  value={newDiamondData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Shape</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  name="shape"
                  placeholder=''
                  className='border border-dark mb-2'
                  value={newDiamondData.shape}
                  onChange={handleInputChange}
                >
                  <option value="">Select Shape</option>
                        <option value="Round">Round</option>
                        <option value="Oval">Oval</option>
                        <option value="Emerald">Emerald</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Diamond Carat</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  type="text"
                  name="carat"
                  placeholder='22,24'
                  className='border border-dark mb-2'
                  value={newDiamondData.carat}
                  onChange={handleInputChange}
                  >
                  <option value="">Select Carat</option>
                        <option value="0.5">0.5 Carat</option>
                        <option value="1.0">1 Carat </option>
                        <option value="2.0">2 Carat </option>
                       
               </Form.Select> 
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
                  value={newDiamondData.purchasePrice}
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
                  value={newDiamondData.buyDate}
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
                  value={newDiamondData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary "  onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveGold}>{newDiamondData.id ? 'Update' : 'Save'} Diamond</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Diamonds;
