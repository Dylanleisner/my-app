import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import UnPost from '../components/unPost';
import firebase from 'firebase';



class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user:[],
      currentEmail: '',
      posts:[],
      modalVisible: false,
      pass: '',
      errors:''
    };
  }
  

  // ESTO ROMPE --> LO DEJE ACA PARA PODER ANALISARLO
  // componentDidMount(){
  //   const profileEmail = this.props.route.params.email;

  //   db.collection('posts').where('owner', '==', profileEmail).onSnapshot( 
  //       docs => {
  //           let posts = [];
  //           docs.forEach( doc => {
  //               posts.push({
  //                   id: doc.id,
  //                   data: doc.data()
  //               })
  //               this.setState({
  //                   posts: posts
  //               })
  //           }) 
  //       }
  //   )}



  render() {
    return (
      <View>
        <Text >Profile</Text>
        
      </View>
    );
  }
}


export default Profile;

