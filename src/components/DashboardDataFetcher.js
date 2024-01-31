import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DashboardDataFetcher( ) {

  const [amount, setAmount] = useState(null); // Initialize the amount in local state

  useEffect(() => {
    // Replace 'your_api_endpoint_here' with your actual API endpoint

    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (token) {
          const requestHeaders = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Other headers as needed
          };

          fetch('https://patopay.xyz/api/user_cash', {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({
              // Request body data if needed
            }),
          })
            .then((response) => {
              if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              // Assuming the response contains the 'amount' key
              const parsedAmount = parseInt(data.amount);
              setAmount(parsedAmount); // Store the amount in local state
              //onAmountUpdate(parsedAmount); // Update the amount in the parent component
            })
            .catch((error) => {
              console.error('API request error:', error);
            });
        } else {
          // Handle the case where the token is not found in AsyncStorage
          console.error('Token not found in AsyncStorage');
        }
      })
      .catch((error) => {
        console.error('Error retrieving token from AsyncStorage:', error);
      });
  }, []);

  return amount;
}

export default DashboardDataFetcher;
