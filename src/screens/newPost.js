import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/my-camera/my-camera';


class NewPost extends Component {
  constructor() {
    super();
    this.state = {
        imagen: "",
        descripcion: "",
        comentarios: [],
        owner: "",
        likes: [],
        fecha: ""
    

    };
  }

  crearPost(){
    db.collection('posts')
          .add({
            owner: auth.currentUser.email,
            comentarios: this.state.comentarios,
            descripcion: this.state.descripcion,
            imagen:  this.state.imagen,
            likes: this.state.likes,
            fecha: Date.now(),
          })
          .then(() => {
            this.setState({
                descripcion: '',
                imagen: '',
            });
          })
          .catch((error) => console.log(error));
      }
    

  render() {
    return (
      <View>
        <Text >New Post</Text>
        <TextInput
         
          placeholder="Ingrese la descripcion"
          keyboardType="default"
          onChangeText={(text) => this.setState({ errors: '', descripcion: text })}
          value={this.state.descripcion}
        />
        <MyCamera />
        
                     
        
                <TouchableOpacity
                onPress={() => this.crearPost()}
                >
                <Text>Crear Post</Text>
                </TouchableOpacity>
        
      </View>
    );
  }
}


export default NewPost;

