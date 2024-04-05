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
import StockImage1 from  "../../../src/assets/Sotck.jpg";
import StockImage2 from  "../../../src/assets/Stock_2.jpg";
import StockImage3 from  "../../../src/assets/Stock_3.jpg";
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Stocks() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const { exchangeRate,currency } = CurrencyState(); 
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802","#f2a04e"];
  const stockImages=[StockImage1,StockImage3,StockImage2];
  const backgroundImageStyle = (index) => {
    return {
        backgroundImage: `url(${stockImages[index % stockImages.length]})`,
        backgroundSize: 'cover',
        //  
      
      
    };
};
  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedStock) return; 
    setNewStockData({
      id: selectedStock.id,
      name: selectedStock.name,
      symbol: selectedStock.symbol,
      purchasePrice: selectedStock.purchasePrice,
      buyDate: selectedStock.buyDate,
      quantity: selectedStock.quantity,
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedStock]);

  const [newStockData, setNewStockData] = useState({
    id: '',
    name: '',
    symbol: '',
    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { // Check if userData and userName are defined
      fetchStocks(); // Fetch stocks only if userName is available
    }
  }, [userData]);
  const fetchStocks = () => {
    axios.get(`${BASE_URl}/api/stocks/getStocksForUser/${userData.userName}`)
        .then(response => {
            setStocks(response.data);
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
    setNewStockData({
    id: '',
    name: '',
    symbol: '',
    purchasePrice: '',
    buyDate: '',
    quantity: '',
    currentPrice: '',
    lastUpdateDate: '',
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStockData({ ...newStockData, [name]: value });
  };
 
  
 
  
  const handleDeleteStock = (stockId) => {
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
        axios.delete(`${BASE_URl}/api/stocks/deleteStock/${stockId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Stock Deleted',
                text: 'The stock has been deleted successfully.',
              });
              fetchStocks();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Stock',
                text: 'An error occurred while deleting the stock. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting stock:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Stock',
              text: 'An error occurred while deleting the stock. Please try again later.',
            });
          });
      }
    });
  };
  
  const handleSaveStock = () => {
    if (newStockData.id) {
      axios.put(`${BASE_URl}/api/stocks/updateStock/${newStockData.id}`, newStockData)
        .then(response => {
          console.log('Stock updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Stock Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchStocks();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating stock:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/stocks/save`, newStockData)
        .then(response => {
          console.log('Stock saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Stock Created',
            showConfirmButton: false,
            timer: 1500
          });
         
          fetchStocks();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving stock:', error);
        });
    }
  };
  
  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Stock</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {stocks.map((stock, index) => (
          <div className="col-md-4 mb-3" key={stock.id}>
           <div className="card h-100 d-flex flex-column border border-dark" style={ backgroundImageStyle(index)}>

              <div className="card-body">
                <h5 className="card-title text-center" style={{color:"white"}}>{stock.name}</h5>
                <p style={{color:"white"}}>Symbol:<strong> {stock.symbol}</strong></p>
                <p style={{color:"white"}}>Purchase Price:<strong> {renderPrice(stock.purchasePrice)} {currency}</strong></p>
                <p style={{color:"white"}}>Buy Date:<strong> {moment(stock.buyDate).format("DD-MM-YYYY")}</strong></p>
                <p style={{color:"white"}}>Quantity:<strong> {stock.quantity}</strong></p>
                <p style={{color:"white"}}>Current Price:<strong> {renderPrice(stock.currentPrice)} {currency}</strong></p>
                <p style={{color:"white"}}>Last Update Date:<strong> {moment(stock.lastUpdateDate).format("DD-MM-YYYY")}</strong></p>
              </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' style={{color:"white"}}  onClick={() => {handleEdit(stock)}}></EditIcon>
                <DeleteForeverIcon className='fs-4' style={{color:"white"}} onClick={() => {handleDeleteStock(stock.id)}}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newStockData.id ? 'Edit' : 'Add'} Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Stock Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder='Ex ONiE Soft'
                  className='border border-dark mb-2'
                  value={newStockData.name}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Stock Symbol</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="symbol"
                  placeholder='ONiE'
                  className='border border-dark mb-2'
                  value={newStockData.symbol}
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
                  value={newStockData.purchasePrice}
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
                  value={newStockData.buyDate}
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
                  value={newStockData.quantity}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary "  onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newStockData.id ? 'Update' : 'Save'} Stock</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Stocks;
