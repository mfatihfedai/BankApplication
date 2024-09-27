import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import LoginScreen from './src/pages/LoginScreen';
import CreditScreen from './src/pages/CreditScreen';
import ExchangeScreen from './src/pages/ExchangeScreen/ExchangeScreen';

//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LoginScreen"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 10, // Tab barı yukarı çekmek için
            left: 50, // Ekranın solundan uzaklaştırmak için
            right: 50, // Ekranın sağından uzaklaştırmak için
            borderRadius: 20, // Köşelere radius vermek için
            height: 60, // Tab barın yüksekliğini ayarlamak için
            backgroundColor: '#ffffff', // Arkaplan rengi
            shadowColor: '#000', // Gölge rengi
            shadowOffset: {width: 0, height: 10}, // Gölge ofseti
            shadowOpacity: 0.25, // Gölge opaklığı
            shadowRadius: 3.5, // Gölge radius
            elevation: 5, // Android için elevation (gölge)
          },
        })}>
        <Tab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            tabBarLabel: 'Giriş',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/login.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? 'red' : 'grey',
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="CreditScreen"
          component={CreditScreen}
          options={{
            tabBarLabel: 'Kredi Hesaplama',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/credit.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? 'red' : 'grey',
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="ExchangeScreen"
          component={ExchangeScreen}
          options={{
            tabBarLabel: 'Kredi Hesaplama',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('./src/assets/exchange.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? 'red' : 'grey',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
