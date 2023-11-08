import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      nombre_usuario: '',
      mini_bio: '',
      errors: '',
      foto_perfil: '',
      showCamera: false,
    };
  }
  registerUser(email, pass, nombre_usuario, mini_bio, foto_perfil) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        db.collection('usuarios')
          .add({
            owner: email,
            nombre_usuario: nombre_usuario,
            mini_bio: mini_bio,
            foto_perfil: foto_perfil,
            createdAt: Date.now(),
          })
          .then(() => {
            this.setState({
              email: '',
              pass: '',
              userName: '',
              bio: '',
              errors: '',
              showCamera: false,
            });
            this.props.navigation.navigate('Login');
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => this.setState({ errors: error }));
  }
  onImageUpload(url){
    this.setState({
        foto_perfil: url,
        showCamera: false,
    })
    
}


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>REGISTRO</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ errors: '', email: text })}
          value={this.state.email}
        />
        <TextInput
         style={styles.textInput}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ errors: '', pass: text })}
          value={this.state.pass}
        />
        <TextInput
         style={styles.textInput}
          placeholder="User name"
          keyboardType="default"
          onChangeText={(text) => this.setState({ errors: '', nombre_usuario: text })}
          value={this.state.nombre_usuario}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mini Bio"
          keyboardType="default"
          onChangeText={(text) => this.setState({ errors: '', mini_bio: text })}
          value={this.state.mini_bio}
        />
                     
        
                <TouchableOpacity
                style={styles.button}
                onPress={() =>
                this.registerUser(
                    this.state.email,
                    this.state.pass,
                    this.state.nombre_usuario,
                    this.state.mini_bio,
                    this.state.foto_perfil
                    )
                }
                >
                <Text>REGISTRARME</Text>
                </TouchableOpacity>
                 {/* } */}
        <Text style={styles.errorText}>{this.state.errors.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo blanco
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
  textInpu: {
    color: '#D32F2F',
    borderBottomWidth: 2,
    borderColor: '#D32F2F',
    borderRadius: 4,
    marginTop: 10,
    fontSize: 18,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#D32F2F',
    marginTop: 20,
    fontSize: 18,
  },
});

export default Register;
