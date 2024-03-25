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

function Stocks() {
    const location = useLocation();
    const { state: { userData } = {} } = location;

    const [stocks, setStocks] = useState([]);

    const { exchangeRate } = CurrencyState();
    console.log(exchangeRate)
    const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];

    useEffect(() => {
        if (userData && userData.owner) {
            fetchStocks();
        }
    }, [userData]);
    const fetchStocks = () => {
        axios.get(`${BASE_URl}/api/stocks/getStocksForUser/${userData.owner}`)
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
    return (
        <div>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {stocks.map((stock, index) => (
                    <div className="col-md-4 mb-3" key={stock.id}>
                        <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundColor: index < titleColors.length ? titleColors[index] : titleColors[index % titleColors.length] }}>
                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ color: "white" }}>{stock.name}</h5>
                                <p style={{ color: "white" }}><strong >Symbol:</strong> {stock.symbol}</p>
                                <p style={{ color: "white" }}><strong>Purchase Price:</strong> {renderPrice(stock.purchasePrice)} {stock.currency}</p>
                                <p style={{ color: "white" }}><strong>Buy Date:</strong> {moment(stock.buyDate).format("DD-MM-YYYY")}</p>
                                <p style={{ color: "white" }}><strong>Quantity:</strong> {stock.quantity}</p>
                                <p style={{ color: "white" }}><strong>Current Price:</strong> {renderPrice(stock.currentPrice)} {stock.currency}</p>
                                <p style={{ color: "white" }}><strong>Last Update Date:</strong> {moment(stock.lastUpdateDate).format("DD-MM-YYYY")}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stocks;
