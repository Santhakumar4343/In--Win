import React, { useState, useEffect } from 'react';
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';
import { useLocation } from "react-router-dom";
import "../Summary/Summary.css";

function Summary() {
  const location = useLocation();
  const { state: { userData } = {} } = location;
  const { exchangeRate, currency } = CurrencyState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [realestatePrice, setRealestateprice] = useState(null);
  const [fixedDeposit, setFixedDeposit] = useState(null);
  const [antiquePieces, setAntiquePieces] = useState(null);
  const [loans, setLoans] = useState(null);
  const [loansPaid, setLoansPaid] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [insurances, setInsurances] = useState(null);
  const [totalPropertyValue, setTotalPropertyValue] = useState(0);
  const [assets, setAssets] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [bills, setBills] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [pfAmount, setPFAmount] = useState(0);
  const [jewelleryPrice,setJewelleryPrice ] = useState(0);
  const [metalPrices,setMetalPrices]=useState(0);
  const [silverPrice,setSilverPrice]=useState(0);
  const[platinumPrice,setPlatinumPrice]=useState(0);
  const[diamondPrice,setDiamondPrice]=useState(0);
  const renderPrice = (price) => {
    return (price / exchangeRate).toFixed(2);
  };
 //for DiamondPirce
 useEffect(() => {
  fetch(`${BASE_URl}/api/diamond/totalDiamondPrice/${userData.owner}`)
    .then(response => response.json())
    .then(data => {
      setDiamondPrice(data.totalDiamondPrice);
    })
    .catch(error => {
      console.error('Error fetching PF amount :', error);
    });
}, [userData.owner]);
//for Platinum Price
useEffect(() => {
  fetch(`${BASE_URl}/api/platinum/totalPlatinumPrice/${userData.owner}`)
    .then(response => response.json())
    .then(data => {
      setPlatinumPrice(data.totalPlatinumPrice);
    })
    .catch(error => {
      console.error('Error fetching PF amount :', error);
    });
}, [userData.owner]);
  //for silverPrice
  useEffect(() => {
    fetch(`${BASE_URl}/api/silver/totalSilverPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setSilverPrice(data.totalSilverPrice);
      })
      .catch(error => {
        console.error('Error fetching Silver amount :', error);
      });
  }, [userData.owner]);
  //for jewelleryPrice
useEffect(() => {
  fetch(`${BASE_URl}/api/jewellery/totalJewelleryPrice/${userData.owner}`)
    .then(response => response.json())
    .then(data => {
      setJewelleryPrice(data.totalPrice);
    })
    .catch(error => {
      console.error('Error fetching Jewellery amount :', error);
    });
}, [userData.owner]);
  useEffect(() => {
    fetch(`${BASE_URl}/api/users/totalPFAmount/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setPFAmount(data.totalPf);
      })
      .catch(error => {
        console.error('Error fetching PF amount:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/monthlyExpenses/totalmonthlyExpenditurePrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setBills(data.totalPrice);
        setMonthlyExpenses(userData.ctc - data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total Bills price:', error);
      });
  }, [userData.owner, userData.ctc]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/loans/loanStatus/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setLoans(data.totalRemainingAmount);
        setLoansPaid(data.totalPaidAmount);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/insurance/totalPermiumPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setInsurances(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/vehicles/totalVehiclesPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setVehicles(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/antiquePieces/totalAPPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setAntiquePieces(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/fixedDeposits/totalFDPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setFixedDeposit(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/realestate/totalRealestatePrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setRealestateprice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/gold/totalGoldPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setGoldPrice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    fetch(`${BASE_URl}/api/stocks/totalStocksPrice/${userData.owner}`)
      .then(response => response.json())
      .then(data => {
        setTotalPrice(data.totalPrice);
      })
      .catch(error => {
        console.error('Error fetching total stocks price:', error);
      });
  }, [userData.owner]);

  useEffect(() => {
    const totalAssets = totalPrice + goldPrice + realestatePrice + antiquePieces + vehicles + pfAmount + loansPaid;
    const totalLiabilities = loans + insurances + bills;
    const totalMetalPrices=jewelleryPrice+goldPrice+silverPrice+platinumPrice+diamondPrice;
    setMetalPrices(totalMetalPrices);
    setMonthlyExpenses(userData.ctc - bills);
    setAssets(totalAssets);
    setLiabilities(totalLiabilities);
    const totalMinusLoansAndInsurances = totalAssets - loans - insurances;
    setTotalPropertyValue(totalMinusLoansAndInsurances);
  }, [totalPrice, goldPrice, realestatePrice, antiquePieces, vehicles, loans, insurances, userData.ctc, bills]);

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="table-responsive">
            <h5 className='text-center'>Net Worth</h5>
            <table className="table table-sm" style={{ textAlign: 'center' }}>
              <thead>
              </thead>
              <tbody>
                <tr className='border border-dark'>
                  <th className='border border-dark'>All Properties</th>
                  <th className='border border-dark'>Current Value In {currency}</th>
                </tr>

                <tr className='border border-dark'>
                  <th className='border border-dark'>Total</th>
                  <td className={`border border-dark ${totalPropertyValue >= 0 ? 'text-success' : 'text-danger'}`}>{renderPrice(totalPropertyValue.toFixed(2))} {currency}</td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h5 className='text-center'>Assets</h5>
          <table className="table table-striped mt-3" style={{ textAlign: "center" }}>
            <thead>
            </thead>
            <tbody>
              <tr className='border border-dark'>
                <th scope="" className='border border-dark'>Property</th>
                <th className='border border-dark'>Current Value In {currency}</th>
              </tr>
              <tr className='border border-dark'>
                <th scope="row" className='border border-dark'>Stocks</th>
                <td className='border border-dark'>{renderPrice(totalPrice && totalPrice.toFixed(2))}</td>
              </tr>

              <tr className='border border-dark'>
                <th className='border border-dark'>Metal</th>
                <td className='border border-dark'>{renderPrice(metalPrices)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Realestate</th>
                <td className='border border-dark'>{renderPrice(realestatePrice)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Fixed Deposit</th>
                <td className='border border-dark'>{renderPrice(fixedDeposit)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Antique Pieces</th>
                <td className='border border-dark'>{renderPrice(antiquePieces)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Vehicles</th>
                <td className='border border-dark'>{renderPrice(vehicles)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Insurance</th>
                <td className='border border-dark'>{renderPrice(insurances)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Loans</th>
                <td className='border border-dark'>{renderPrice(loansPaid)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>PF Amount</th>
                <td className='border border-dark'>{renderPrice(pfAmount)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Total</th>
                <td className={`border border-dark text-success`}>{renderPrice(assets.toFixed(2))} {currency}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5 className='text-center'>Liabilities</h5>
          <table className="table table-striped mt-3" style={{ textAlign: "center" }}>
            <thead>
            </thead>
            <tbody>
              <tr className='border border-dark'>
                <th scope="" className='border border-dark'>Property</th>
                <th className='border border-dark'>Current Value In {currency}</th>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Insurance</th>
                <td className='border border-dark'>{renderPrice(insurances)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Loans</th>
                <td className='border border-dark'>{renderPrice(loans)}</td>
              </tr>
              <tr className='border border-dark'>
                <th className='border border-dark'>Total</th>
                <td className={`border border-dark text-danger`}>{renderPrice(liabilities.toFixed(2))} {currency}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='col-md-6'>
        <h5 className='text-center'>Monthly Expenses </h5>
        <table className="table table-sm" style={{ textAlign: 'center' }}>
          <thead>
          </thead>
          <tbody>
            <tr className='border border-dark'>
              <th className='border border-dark'>CTC</th>
              <td className='border border-dark'>{renderPrice(userData.ctc)}</td>
            </tr>
            <tr className='border border-dark'>
              <th className='border border-dark'>Monthly Bills</th>
              <td className='border border-dark'>{renderPrice(bills)}</td>
            </tr>
            <tr className='border border-dark'>
              <th className='border border-dark'>Total</th>
              <td className={`border border-dark ${monthlyExpenses >= 0 ? 'text-success' : 'text-danger'}`}>{renderPrice(monthlyExpenses.toFixed(2))} {currency}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;
