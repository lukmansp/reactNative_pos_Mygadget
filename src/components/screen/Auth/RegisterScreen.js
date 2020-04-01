import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import {login, register} from '../../redux/actions/auth';
import axios from 'axios';
import {connect} from 'react-redux';
class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    state = {
      name: '',
      email: '',
      password: '',
    };
  }
  onSubmit = async e => {
    await this.props.dispatch(register(this.state));
    this.props.navigation.navigate('Home');
  };
  onChangeEmail = event => {
    this.setState({
      email: event,
    });
  };

  onChangePass = event => {
    this.setState({
      password: event,
    });
  };
  onChangeName = event => {
    this.setState({
      name: event,
    });
  };
  render() {
    LayoutAnimation.easeInEaseOut;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require('../../../../images/logomygadget.png')}
          style={styles.logo}
        />
        <Image
          source={require('../../../../images/menu2.png')}
          style={{
            position: 'absolute',
            bottom: -450,
            right: -305,
          }}
        />
        <Text style={styles.greeting}>Create your account </Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}> Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={this.onChangeName}></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}> Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={this.onChangeEmail}></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}> Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={this.onChangePass}></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={{color: '#FFF', fontWeight: '500'}}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}}>
          <Text
            style={{color: '#414959', fontSize: 12}}
            onPress={() => this.props.navigation.navigate('Login')}>
            Have Account?{' '}
            <Text style={{fontWeight: '500', color: '#E9446A'}}>Login !</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
const styles = StyleSheet.create({
  logo: {
    marginTop: -120,
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  greeting: {
    marginBottom: 50,
  },

  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 300,
    fontSize: 15,
    backgroundColor: '#d0cfd6',
    borderRadius: 10,
    color: '#161F3D',
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#05afca',
    borderRadius: 4,
    height: 35,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps)(RegisterScreen);
