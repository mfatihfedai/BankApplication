import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './Input.style';

export default function Input({label, hint, text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.yazi}
          placeholder={hint}
          placeholderTextColor={'lightgrey'}
          onChangeText={text}
        />
      </View>
    </View>
  );
}

export function PasswordInput({label, hint, text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.yazi}
          placeholder={hint}
          placeholderTextColor={'lightgrey'}
          onChangeText={text}
          secureTextEntry={true} // Karakterleri gizlemek için
        />
      </View>
    </View>
  );
}
