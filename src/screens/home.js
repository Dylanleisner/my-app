import React, { Component } from 'react';
import { View, Text, FlatList,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import UnPost from '../components/unPost';

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
    return (
      
      <View style = { styles.scroll} >
        <Text >Home</Text>
        <FlatList 
                    data={this.state.posts}
                    keyExtractor={ onePost => onePost.id.toString()}
                    renderItem={ ({item}) => <UnPost postData={item} navigation={this.props.navigation} />}
                />  
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scroll:{
    flex: 1
  }

})



export default Home;

