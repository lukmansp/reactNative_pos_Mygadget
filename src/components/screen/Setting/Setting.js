import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
class SettingScreen extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
        <Text>Setting</Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SettingScreen;
