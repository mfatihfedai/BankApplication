import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './LoginScreen.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../../component/Input';
export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/loginScreen.png')}>
        <View style={styles.container}>
          <Input
            label={'TC / Hesap Numarası'}
            hint={'TC veya hesap numaranızı giriniz'}
            text={null}
          />
          <Input label={'Şifre'} hint={'Şifrenizi giriniz'} text={null} />
          <TouchableOpacity onPress={null}>
            <Image
              style={styles.login}
              source={require('./../../assets/login-button.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
