import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useLocation } from "react-router-dom";
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";


function Profile() {
    const Navigate = useNavigate();
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [showProfessionalModal, setShowProfessionalModal] = useState(false);
    const { exchangeRate,currency } = CurrencyState(); 
    const renderPrice = (price) => {
        return (price / exchangeRate).toFixed(2);
      };
    const [editedUserData, setEditedUserData] = useState({
        userName: userData ? userData.userName : "",
        email: userData ? userData.email : "",
        password: userData ? userData.password : "",
        mobileNumber: userData ? userData.mobileNumber : "",
        gender: userData ? userData.gender : "",
        fatherName: userData ? userData.fatherName : "",
        dob: userData ? moment(userData.dob).format('YYYY-MM-DD') : "",
        panNumber: userData ? userData.panNumber : "",
        aadhar: userData ? userData.aadhar : "",
       relation: userData ? userData.relation : "",
        voterId: userData ? userData.voterId : "",
        presentAddress: userData ? userData.presentAddress : "",
        permanentAddress: userData ? userData.permanentAddress : ""
    });

   
  

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
   

    const handleCloseModal = () => {
        setShowModal(false);
    };

    

    const handleSaveUserDetails = () => {
        axios.put(`${BASE_URl}/api/nominees/updateNominee-personal/${userData.id}`, editedUserData)
            .then(response => {
                console.log('User details updated successfully:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Your Details Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    };
   
    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout'
        }).then((result) => {
          if (result.isConfirmed) {
            window.history.replaceState(null, '', '/');
            Navigate('/');
          }
        });
      }
      

    
    return (
        <div>
            <Button variant="primary" onClick={handleEdit}>Edit Personal Details</Button>
           
            <LogoutIcon variant="primary" style={{marginLeft:"970px",fontSize:"36px"}}  onClick={handleLogout}></LogoutIcon>
            <h5 >Personal Details</h5>
            <table class="table table-striped mt-3" style={{borderRadius:"10px"}}>
                <thead>
                </thead>
                <tbody  >
                 
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>User Name</th>
                        <td className='border border-dark'>{userData.userName}</td>
                        <th className='border border-dark'>Email</th>
                        <td className='border border-dark'>{userData.email}</td>
                        <th className='border border-dark'>Password</th>
                        <td className='border border-dark'>{userData.password}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Mobile Number </th>
                        <td className='border border-dark'>{userData.mobileNumber}</td>
                        <th className='border border-dark'>Gender</th>
                        <td className='border border-dark'>{userData.gender}</td>
                        <th className='border border-dark'>Father Name</th>
                        <td className='border border-dark'>{userData.fatherName}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'> D-O-B </th>
                        <td className='border border-dark'>{userData.dob}</td>
                        <th className='border border-dark'>PAN Number</th>
                        <td className='border border-dark'>{userData.panNumber}</td>
                        <th className='border border-dark'> Aadhar Number</th>
                        <td className='border border-dark'>{userData.aadhar}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Voter ID</th>
                        <td className='border border-dark'>{userData.voterId}</td>
                        <th className='border border-dark'> Present Address</th>
                        <td className='border border-dark'>{userData.presentAddress}</td>
                        <th className='border border-dark'> Permanent Address </th>
                        <td className='border border-dark'>{userData.permanentAddress}</td>
                  
                    </tr>
                         
                   
                </tbody>
            </table>
          

            
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    className='border border-dark mb-2'
                                    value={editedUserData.userName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className='border border-dark mb-2'
                                    value={editedUserData.email}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className='border border-dark mb-2'
                                    value={editedUserData.password}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Mobile Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="mobileNumber"
                                    className='border border-dark mb-2'
                                    value={editedUserData.mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Relation to Owner</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="relation"
                                    className='border border-dark mb-2'
                                    value={editedUserData.relation}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Gender</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    className='border border-dark mb-2'
                                    value={editedUserData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Father's Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="fatherName"
                                    className='border border-dark mb-2'
                                    value={editedUserData.fatherName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Date of Birth</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    className='border border-dark mb-2'
                                    value={editedUserData.dob}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                       
                        <Row>
                            <Col md={4}>
                                <Form.Label>PAN Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="panNumber"
                                    className='border border-dark mb-2'
                                    value={editedUserData.panNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Aadhar Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="aadhar"
                                    className='border border-dark mb-2'
                                    value={editedUserData.aadhar}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Voter ID</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="voterId"
                                    className='border border-dark mb-2'
                                    value={editedUserData.voterId}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                       
                        <Row>
                            <Col md={4}>
                                <Form.Label>Present Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="presentAddress"
                                    className='border border-dark mb-2'
                                    value={editedUserData.presentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Permanent Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="permanentAddress"
                                    className='border border-dark mb-2'
                                    value={editedUserData.permanentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer  className='d-flex justify-content-center align-items-center'>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveUserDetails}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        
               
        </div>
    );
}

export default Profile;
