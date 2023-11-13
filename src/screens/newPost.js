import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/my-camera/my-camera';

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      imagen: '',
      descripcion: '',
      comentarios: [],
      owner: '',
      likes: [],
      fecha: '',
    };
  }

  crearPost() {
    console.log(this.state);
    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        comentarios: this.state.comentarios,
        descripcion: this.state.descripcion,
        imagen: this.state.imagen,
        likes: this.state.likes,
        fecha: Date.now(),
      })
      .then(() => {
        this.setState({
          descripcion: '',
          imagen: '',
        });
      })
      .catch(error => console.log(error));
  }

  onImageUpload(url) {
    this.setState({
      imagen: url,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>New Post</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ingrese la descripción"
          keyboardType="default"
          onChangeText={text => this.setState({ errors: '', descripcion: text })}
          value={this.state.descripcion}
        />

        {this.state.imagen == '' ? (
          <MyCamera traerUrlDeFoto={url => this.onImageUpload(url)} />
        ) : (
          <Text style={styles.text}>Imagen Subida</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={() => this.crearPost()}>
          <Text style={styles.buttonText}>Crear Post</Text>
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
    backgroundColor: 'black', // Fondo negro
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
  text: {
    color: '#D32F2F',
    fontSize: 18,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewPost;
