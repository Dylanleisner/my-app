import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';
import UnPost from '../components/unPost';




class Profile extends Component {
  constructor() {
    super();
    this.state = {
      minibio : '',
      nombreUsuario : '',
      mail : '',
      fotoPerfil : '',
      posts : [],
      miPerfil : false,

    };
  }
  
componentDidMount(){
  console.log(this.props.route.params)

  let usuario = this.props.route.params === undefined ? auth.currentUser.email : this.props.route.params.mail

  db.collection('usuarios').where('owner', '==',  usuario).onSnapshot(

    documentos => {
      let usuarios = [];
      documentos.forEach(doc => {
        usuarios.push({
          id: doc.id,
          data: doc.data(),
        });

        this.setState({
          mail: usuarios[0].data.owner,
          minibio :  usuarios[0].data.mini_bio,
          nombreUsuario :  usuarios[0].data.nombre_usuario,
          fotoPerfil :  usuarios[0].data.foto_perfil,
          miPerfil :  usuarios[0].data.owner === auth.currentUser.email ? true : false

        });
      });
    })
  db.collection('posts').where('owner', '==',  usuario).onSnapshot(
        documentos => {
          let posts = [];
          documentos.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
            this.setState({
              posts: posts,
            });
          });
        }
      )

}

  desloguearte(){
    firebase.auth().signOut().then(()=>{this.props.navigation.navigate('Login')})
  }

  render() {
    console.log(this.state,)
    return (
      <View style={styles.container} >
        <Text >Profile</Text>
        <Text >minibio : {this.state.minibio}</Text>
        <Text >mail : {this.state.mail}</Text>
        <Text >nombreUsuario : {this.state.nombreUsuario}</Text>
        <Image
          style={styles.foto}
          source={{ uri: this.state.foto_perfil}}
          resizeMode='cover'
        />

        <FlatList
          data={this.state.posts}
          keyExtractor={onePost => onePost.id.toString()}
          renderItem={({ item }) => <UnPost postData={item} navigation={this.props.navigation} />}
        />

        {this.state.miPerfil === true ?         
        <TouchableOpacity onPress={() => this.desloguearte()}> 
          <Text>Desloguear</Text>
        </TouchableOpacity> : <></>}


      </View>
    );
  }
}

const styles = StyleSheet.create({

  foto: {
    height: 300,
    width: '100%',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo negro
  },

});

export default Profile;

