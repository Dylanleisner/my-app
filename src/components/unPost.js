import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class UnPost extends Component {
  constructor() {
    super();
    this.state = {
      likes: [],
    };
  }

  componentDidMount() {
    this.setState({
      likes: this.props.postData.data.likes,
    });
  }

  darLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        let Array = this.state.likes;
        Array.push(auth.currentUser.email);
        this.setState({
          likes: Array,
        });
      })
      .catch(e => console.log(e));
  }

  sacarLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        let Array = this.state.likes;
        let ArrayFiltrado = Array.filter(usuario => usuario !== auth.currentUser.email);

        this.setState({
          likes: ArrayFiltrado,
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    console.log(this.props.postData.data.comentario);
    return (
      <View style={styles.container}>
        <Image
          style={styles.foto}
          source={{ uri: this.props.postData.data.imagen }}
          resizeMode='cover'
        />

        <Text style={styles.text}>{this.props.postData.data.descripcion}</Text>

        <Text style={styles.textLike}>{this.state.likes !== undefined ? this.state.likes.length : 0} likes</Text>

        {this.state.likes.includes(auth.currentUser.email) ? (
          <TouchableOpacity style={styles.button} onPress={() => this.sacarLike()}>
            <Text style={styles.buttonText}>Sacar like</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => this.darLike()}>
            <Text style={styles.buttonText}>Dar like</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Comments', { info: this.props.postData })}
        >
          <Text style={styles.buttonText}>
            Cantidad de comentarios: {this.props.postData.data.comentarios !== undefined ? this.props.postData.data.comentarios.length : 0}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#1a1a1a', 
    borderRadius: 8,
    padding: 10,
  },
  foto: {
    height: 300,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  textLike: {
    color: '#D32F2F',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UnPost;


