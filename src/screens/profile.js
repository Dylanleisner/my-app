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
  

  render() {
    return (
      <View>
        <Text >Profile</Text>
        
      </View>
    );
  }
}


export default Profile;

