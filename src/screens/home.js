import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: []

      
    };
  }
  componentDidMount(){
    db.collection('posts').orderBy('fecha', 'desc').onSnapshot(
      documentos => {
        let posts = [];
        documentos.forEach( doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
            this.setState({
                posts: posts
            })
    })
      })
          
  }

  render() { 
    console.log(this.state.posts)
    return (
      <View>
        <Text >Home</Text>
        
      </View>
    );
  }
}


export default Home;

