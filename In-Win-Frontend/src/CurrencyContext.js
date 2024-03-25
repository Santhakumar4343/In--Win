// import React, { createContext, useContext, useEffect, useState } from 'react';

// const Currency = createContext();

// function CurrencyContext({ children }) {
//     const [currency, setCurrency] = useState("INR");
//     const [exchangeRate, setExchangeRate] = useState(82); // Default exchange rate for INR to USD
//     useEffect(() => {
//         // Simulate fetching exchange rate from an API based on the selected currency
//         const fetchExchangeRate = async () => {
//             if (currency === 'USD') {
//                 // Fetch exchange rate for USD to INR
//                 const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
//                 const data = await response.json();
//                 setExchangeRate(data.rates.INR);
//             } else {
//                 setExchangeRate(1); // Default exchange rate for INR to INR
//             }
//         };

//         fetchExchangeRate();
//     }, [currency]);

//     return (
//         <Currency.Provider value={{ currency, setCurrency, exchangeRate }}>
//             {children}
//         </Currency.Provider>
//     );
// }

// export default CurrencyContext;

// export const CurrencyState = () => {
//     return useContext(Currency);
// }
import React, { createContext, useContext, useEffect, useState } from 'react';

const Currency = createContext();

function CurrencyContext({ children }) {
    const [currency, setCurrency] = useState("INR");
    const [exchangeRate, setExchangeRate] = useState(82); // Default exchange rate for INR to USD

    useEffect(() => {
        const fetchExchangeRate = async () => {
            let newExchangeRate = 1;

            switch (currency) {
                case 'USD':
                case 'EUR':
                case 'GBP':
                case 'AED': 
                case 'AUD': 
                    newExchangeRate = await fetchExchangeRateFromAPI(currency);
                    break;
               
                default:
                    newExchangeRate = 1;
                    break;
            }

            setExchangeRate(newExchangeRate);
        };

        fetchExchangeRate();
    }, [currency]);

    const fetchExchangeRateFromAPI = async (baseCurrency) => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            const data = await response.json();
            return data.rates.INR; // Assuming you want the exchange rate to INR for simplicity
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return 1; // Default to 1 if there's an error
        }
    };

    return (
        <Currency.Provider value={{ currency, setCurrency, exchangeRate }}>
            {children}
        </Currency.Provider>
    );
}

export default CurrencyContext;

export const CurrencyState = () => {
    return useContext(Currency);
};

