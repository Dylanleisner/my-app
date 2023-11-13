import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Comentario extends Component {
  constructor() {
    super();
    this.state = {
      comentario: '',
      listaComentarios: [],
    };
  }

  crearComentario() {
    db.collection('posts')
      .doc(this.props.route.params.info.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comentario: this.state.comentario,
        }),
      })
      .then(() => {
        let Array = this.state.listaComentarios;
        Array.push({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comentario: this.state.comentario,
        });

        this.setState({
          listaComentarios: Array,
          comentario: '',
        });
      });
  }

  componentDidMount() {
    this.setState({
      listaComentarios: this.props.route.params.info.data.comentarios,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>

        {this.state.listaComentarios.length === 0 ? (
          <Text style={styles.noCommentsText}>No hay comentarios</Text>
        ) : (
          <FlatList
            data={this.state.listaComentarios}
            keyExtractor={(oneComment) => oneComment.owner.toString() + oneComment.createdAt.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{item.comentario}</Text>
                <Text style={styles.commentOwner}>{item.owner}</Text>
              </View>
            )}
          />
        )}

        <TextInput
          placeholder="Agregar comentario"
          keyboardType="default"
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
          style={styles.input}
        />

        <TouchableOpacity onPress={() => this.crearComentario()} style={styles.button}>
          <Text style={styles.buttonText}>Crear comentario</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#D32F2F',
  },
  noCommentsText: {
    fontSize: 16,
    color: '#D32F2F',
  },
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
    paddingBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: '#D32F2F',
  },
  commentOwner: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: '#D32F2F',
  },
  button: {
    backgroundColor: '#D32F2F',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Comentario;
