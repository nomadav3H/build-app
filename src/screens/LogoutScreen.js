import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native';



export default function LogoutScreen() {

const navigation = useNavigation();


  return (
    <Background>
      <Logo />
      <Header>Come Back Soon!</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
