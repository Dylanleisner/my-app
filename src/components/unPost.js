import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';



class UnPost extends Component {
  constructor() {
    super();
    this.state = {
      likes: []

    };
  }
  componentDidMount() {
    this.setState({
      likes: this.props.postData.data.likes
    })
  }

  darLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => {
        let Array = this.state.likes
        Array.push(auth.currentUser.email)
        this.setState({
          likes: Array

        })
      })
      .catch(e => console.log(e))
  }


  sacarLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => {
        let Array = this.state.likes
        let ArrayFiltrado = Array.filter((usuario) => usuario != auth.currentUser.email)

        this.setState({
          likes: ArrayFiltrado

        })
      }
      )
      .catch(e => console.log(e))
  }




render() {
  return (
    <View>
      <Image
        style={styles.foto}
        source={{ uri: this.props.postData.data.imagen }}
        resizeMode='cover'
      />

      <Text style={styles.text} > {this.props.postData.data.descripcion}</Text>


      <Text style={styles.textLike}> {this.state.likes != undefined ? this.state.likes.length : 0} likes </Text>
      {
        this.state.likes.includes(auth.currentUser.email) ?


          <TouchableOpacity style={styles.button} onPress={() => this.sacarLike()}>
            <Text> Sacar like</Text>
          </TouchableOpacity>
          :

          <TouchableOpacity style={styles.button} onPress={() => this.darLike()}>
            <Text> dar like</Text>
          </TouchableOpacity>


      }




    </View>
  )
}
}
const styles = StyleSheet.create({

  foto: {
    height: 400,
    width: 400,
    border: '2px solid #ddd',
    borderRadius: 4,
    padding: 5,
    alignItems: 'center'
  },

})


export default UnPost;

