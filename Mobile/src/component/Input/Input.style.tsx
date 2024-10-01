import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 10,
  },
  input_container: {
    margin: 3,
    marginHorizontal: 10,
    //padding: 8,  //-> ios ayarı
    borderRadius: 5,
    borderWidth: 1,
    height: 40, // ios 35,
    borderColor: '#bdbdbd',
    color: '#bdbdbd',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 15,
    paddingLeft: 10,
    color: 'white',
  },
  yazi: {
    color: 'black',
  },
});
