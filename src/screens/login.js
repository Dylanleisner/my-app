import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      errors: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }

  loginUser(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(res => {
        this.props.navigation.navigate('HomeMenu');
      })
      .then(this.setState({
        email: '',
        pass: '',
      }))
      .catch(error => this.setState({ errors: error }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>LOGIN</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => this.setState({ errors: '', email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={text => this.setState({ errors: '', pass: text })}
          value={this.state.pass}
        />
        {this.state.errors == '' ? (
          <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.pass)}>
            <Text style={styles.button}> Ingresar</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.notificacion}>{this.state.errors.message}</Text>
        )}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.register}>Ir a registro</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro
  },
  titulo: {
    color: '#D32F2F', // Texto rojo
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
  },
  textInput: {
    color: '#D32F2F',
    borderBottomWidth: 2,
    borderColor: '#D32F2F',
    borderRadius: 4,
    marginTop: 10,
    fontSize: 18,
    width: '80%',
  },
  button: {
    marginTop: 20,
    height: 32,
    color: 'black',
    backgroundColor: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 6,
    width: '100%',
  },
  notificacion: {
    color: '#D32F2F',
    marginTop: 20,
    fontSize: 20,
  },
  register: {
    color: '#D32F2F',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;




