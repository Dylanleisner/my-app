import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import UnPost from '../components/unPost';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts').orderBy('fecha', 'desc').onSnapshot(
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
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Home</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={onePost => onePost.id.toString()}
          renderItem={({ item }) => <UnPost postData={item} navigation={this.props.navigation} />}
        />
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
  scroll: {
    flex: 1,
  },
});

export default Home;


