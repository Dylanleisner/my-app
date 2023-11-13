import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

class Buscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: [],
      usuarioFiltrado: [],
      usuarioFiltradoMail: [],
      textoUsuario: '',
      search: false,
    };
  }

  componentDidMount() {
    db.collection('usuarios').onSnapshot((docs) => {
      let user = [];
      docs.forEach((docu) => {
        user.push({
          id: docu.id,
          data: docu.data(),
        });
        this.setState({
          usuario: user,
        });
      });
    });
  }

  buscar(text) {
    console.log(this.state.usuario)
    this.setState({
      usuarioFiltrado: this.state.usuario.filter((usuario) =>
        usuario.data.nombre_usuario.toLowerCase().includes(text.toLowerCase())
      ),
      usuarioFiltradoMail: this.state.usuario.filter((usuario) => usuario.data.owner.toLowerCase().includes(text.toLowerCase())),
      search: true,
      textoUsuario: text,
    });
  }

  borrarBuscador() {
    this.setState({
      usuarioFiltrado: [],
      usuarioFiltradoMail: [],
      textoUsuario: '',
      search: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscar</Text>
        <TextInput
          style={styles.input}
          placeholder='Buscar un usuario'
          keyboardType='default'
          onChangeText={(text) => this.buscar(text)}
          value={this.state.textoUsuario}
        />

        {this.state.usuarioFiltrado.length === 0 &&
          this.state.usuarioFiltradoMail.length === 0 &&
          this.state.search === true ? (
          <Text style={styles.errorText}>Ese usuario no existe</Text>
        ) : (
          <View>
            <FlatList
              data={this.state.usuarioFiltrado}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('My profile', {
                      email: item.data.owner,
                    })
                  }
                >
                  <View style={styles.userContainer}>
                    <Text style={styles.userInfo} >Nombre de usuario:</Text>
                    <Text style={styles.userColor}>{item.data.nombre_usuario}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <FlatList
              data={this.state.usuarioFiltradoMail}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('My profile', {
                      email: item.data.owner,
                    })
                  }
                >
                  <View style={styles.userContainer}>
                    <Text style={styles.userInfo}>Email:</Text>
                    <Text style={styles.userColor}>{item.data.owner}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    color: '#D32F2F',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
  },
  userContainer: {
    marginBottom: 16,
  },
  userInfo: {
    color: '#D32F2F',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userColor:{
    color: '#FFEBEE',
  }
});

export default Buscar;
