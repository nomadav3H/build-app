import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingCircle from '../components/LoadingCircle';


function Confirmation({ onPinConfirmed }) {
  const [pin, setPin] = useState('');
  const [filledCircles, setFilledCircles] = useState(0);
  const [authToken, setAuthToken] = useState(null); // State to store the auth token
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [incorrectPinEntered, setIncorrectPinEntered] = useState(false); // State for incorrect PIN message



  // useEffect to retrieve the auth token from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (token) {
          setAuthToken(token);
        }
      })
      .catch((error) => {
        console.error('Error retrieving authToken:', error);
      });
  }, []);




  const handlePayPress = () => {
    if (pin.length === 4) {
      setLoading(true);
      const data = { pin: pin };

      try {
        fetch('https://patopay.xyz/api/confirm-pin', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data', data)
            if (data.message === 'PIN confirmed successfully') {
              // Send true to the parent component to indicate PIN confirmation
              onPinConfirmed(true);
            } else {
              // Send false to the parent component to indicate incorrect PIN
              onPinConfirmed(false);
              setIncorrectPinEntered(true); // Set state to display incorrect PIN message
              setPin('');
              setFilledCircles(0);
              setLoading(false);

            }
          })
          .catch((error) => {
            console.error('Error:', error);
            // Send false to the parent component in case of an error
            onPinConfirmed(false);
            setIncorrectPinEntered(true); // Set state to display incorrect PIN message

            setLoading(false); 
            setPin('');
            setFilledCircles(0);
          });
      } catch (error) {
        console.error('Error:', error);
        // Send false to the parent component in case of an error
        onPinConfirmed(false);
        setIncorrectPinEntered(true); // Set state to display incorrect PIN message
        setLoading(false); 
      }
    } else {
      console.log('Please enter a 4-digit PIN.');
    }
  };









  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number.toString());
      setFilledCircles(pin.length + 1);
    }
  };

  const handleBackspacePress = () => {
    if (pin.length > 0) {
      setPin((prevPin) => prevPin.slice(0, -1));
      setFilledCircles(filledCircles - 1);
    }
  };

  const handleClearPress = () => {
    setPin('');
    setFilledCircles(0);
  };


  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.circle,
            i < filledCircles ? styles.filledCircle : null,
          ]}
        />
      );
    }
    return circles;
  };

return (
  <View style={styles.container}>
      {incorrectPinEntered && (
        <Text style={styles.errorText}>Incorrect PIN. Please try again.</Text>
      )}

    <View style={styles.circlesContainer}>{renderCircles()}</View>
    {!loading ? (  // If not loading, render the number pad
      <View style={styles.numberPad}>
        <View style={styles.row}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.numberButton}
              onPress={() => handleNumberPress(number)}
            >
              <Text style={styles.numberButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.numberButton}
              onPress={() => handleNumberPress(number)}
            >
              <Text style={styles.numberButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.numberButton}
              onPress={() => handleNumberPress(number)}
            >
              <Text style={styles.numberButtonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearPress}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress(0)}>
            <Text style={styles.numberButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backspaceButton} onPress={handleBackspacePress}>
            <Text style={styles.backspaceButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (  // If loading, render the loading circle
      <LoadingCircle />
    )}
    <View style={styles.buttonContainer}>
      <Button mode="outlined" style={styles.payButton} onPress={handlePayPress}>
        Confirm
      </Button>
    </View>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  circlesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 5,
  },
  filledCircle: {
    backgroundColor: 'blue',
  },
  numberPad: {
    width: '85%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberButton: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    margin: 5,
  },
  numberButtonText: {
    color: 'blue',
    fontSize: 24,
    textAlign: 'center',
  },
  clearButton: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    margin: 5,
  },
  clearButtonText: {
    color: 'blue',
    fontSize: 24,
    textAlign: 'center',
  },
  backspaceButton: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    margin: 5,
  },
  backspaceButtonText: {
    color: 'blue',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  payButton: {
    width: '45%',
    margin: 5,
  },
});

export default Confirmation;
