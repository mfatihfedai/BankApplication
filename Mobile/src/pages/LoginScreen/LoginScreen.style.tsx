import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container: {
    margin: 20,
    marginVertical: 'auto',
    marginBottom: 200,
    paddingVertical: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
  },
  login: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    tintColor: 'darkred',
  },
});
