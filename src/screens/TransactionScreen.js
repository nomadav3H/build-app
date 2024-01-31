import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background2'



function TransactionScreen() {
  const [transactions, setTransactions] = useState([]); // Store transactions instead of amount


  return (
    <Background>

    </Background>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 15,
  },
  column: {
  flex: 1,
  alignItems: 'flex-start',
},
});


export default TransactionScreen;





