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
import BankImage from  "../../assets/Bank.jpeg"
import BankImage1 from  "../../assets/Bank_1.jpeg"

import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function BankACs() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { exchangeRate } = CurrencyState();
  console.log(exchangeRate)
  const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
  const bankImages=[BankImage,BankImage1];
  const backgroundImageStyle = (index) => {
    return {
        backgroundImage: `url(${bankImages[index % bankImages.length]})`,
        backgroundSize: 'cover',
      
    };
};
  const handleEdit = (insurance) => {
    setSelectedAccount(insurance);
    setShowModal(true);
  };

  const populateModal = () => {
    if (!selectedAccount) return;
    setNewAccountDate({
      id: selectedAccount.id,
      bankName: selectedAccount.bankName,
      accountHolderName: selectedAccount.accountHolderName,
      accountNumber: selectedAccount.accountNumber,
      ifscCode: selectedAccount.ifscCode,
      branch: selectedAccount.branch,
      accountType:selectedAccount.accountType
    });
  };

  useEffect(() => {
    populateModal();
  }, [selectedAccount]);

  const [newAccountDate, setNewAccountDate] = useState({
    id: '',
    bankName: '',
    accountHolderName:"",
    accountNumber: '',
    ifscCode: '',
    branch: '',
    accountType:"",
    userName: userData ? userData.userName : ''
  });

  useEffect(() => {
    if (userData && userData.userName) { // Check if userData and userName are defined
      fetchInsurance(); // Fetch stocks only if userName is available
    }
  }, [userData]);
  const fetchInsurance = () => {
    axios.get(`${BASE_URl}/api/accounts/getBankAccountsForUser/${userData.userName}`)
      .then(response => {
        setAccount(response.data);
      })
      .catch(error => {
        console.error('Error fetching Bank Accounts:', error);
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
    setNewAccountDate({ ...newAccountDate, [name]: value });
  };




  const handleDeleteStock = (accountId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URl}/api/accounts/deleteBankAccount/${accountId}`)
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Account Deleted',
                text: 'The Account has been deleted successfully.',
              });
              fetchInsurance();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed to Delete Account',
                text: 'An error occurred while deleting the Account. Please try again later.',
              });
            }
          })
          .catch(error => {
            console.error('Error deleting Account:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to Delete Account',
              text: 'An error occurred while deleting the Account. Please try again later.',
            });
          });
      }
    });
  };

  const handleSaveStock = () => {
    if (newAccountDate.id) {
      axios.put(`${BASE_URl}/api/accounts/updateBankAccount/${newAccountDate.id}`, newAccountDate)
        .then(response => {
          console.log('Account updated successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Account Updated',
            showConfirmButton: false,
            timer: 1500
          });
          // Update local state after successful update
          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Account:', error);
        });
    } else {
      axios.post(`${BASE_URl}/api/accounts/save`, newAccountDate)
        .then(response => {
          console.log('Account saved successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Account Created',
            showConfirmButton: false,
            timer: 1500
          });

          fetchInsurance();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error saving Account:', error);
        });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Account</Button>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {account.map((account, index) => (
          <div className="col-md-4 mb-3" key={account.id}>
            <div className="card h-100 d-flex flex-column border border-dark" style={backgroundImageStyle(index)}>
              <div className="card-body">
                <h5 className="card-title text-center" style={{ color: "white" }}>{account.bankName}</h5>
                <p style={{ color: "white" }}>Account Type:<strong> {account.accountType}</strong></p>
                <p style={{ color: "white" }}>A/C Holder Name:<strong> {account.accountHolderName}</strong></p>
                <p style={{ color: "white" }}>A/C Number  :<strong> {account.accountNumber}</strong></p>
                <p style={{ color: "white" }}>IFSC Code:<strong> {account.ifscCode}</strong></p>
                <p style={{ color: "white" }}>Branch:<strong> {account.branch}</strong></p>
                 </div>
              <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(account) }}></EditIcon>
                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(account.id) }}></DeleteForeverIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{newAccountDate.id ? 'Edit' : 'Add'} Bank A/c</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Label>Bank Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="bankName"
                  placeholder='SBI/HDFC'
                  className='border border-dark mb-2'
                  value={newAccountDate.bankName}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Account Type</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="accountType"
                  placeholder='SBI/HDFC'
                  className='border border-dark mb-2'
                  value={newAccountDate.accountType}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label>Account Holder Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="accountHolderName"
                  className='border border-dark mb-2'
                  value={newAccountDate.accountHolderName}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>Account Number</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="accountNumber"
                  className='border border-dark mb-2'
                  value={newAccountDate.accountNumber}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>IFSC Code </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="ifscCode"
                  className='border border-dark mb-2'
                  value={newAccountDate.ifscCode}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label> Branch </Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="branch"
                  className='border border-dark mb-2'
                  value={newAccountDate.branch}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center '>
          <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveStock}>{newAccountDate.id ? 'Update' : 'Save'}  Account</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BankACs;
