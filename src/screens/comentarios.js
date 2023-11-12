import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {db, auth} from "../firebase/config"
import firebase from 'firebase';



class Comentario extends Component {
  constructor() {
    super();
    this.state = {
      comentario: '',
      listaComentarios: [],

    };
  }
  crearComentario(){
    db.collection('posts')
        .doc(this.props.route.params.info.id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({ 
                owner:auth.currentUser.email,
                createdAt: Date.now(),
                comentario: this.state.comentario, 
            })  
        })
        .then(() => {
            let Array = this.state.listaComentarios
            Array.push({owner:auth.currentUser.email,
                createdAt: Date.now(),
                comentario: this.state.comentario})
            
            this.setState({

                comentario: '',     
            }) 
        })

  }
componentDidMount(){
    this.setState({
        listaComentarios: this.props.route.params.info.data.comentarios
    })
}
 
  render() {
    return (
      <View>
        <Text >comentario</Text>
        {
            this.state.listaComentarios.length === 0 ? <Text > no hay comentarios</Text>

            :
            <FlatList 
            data={this.state.listaComentarios}
            keyExtractor={ oneComment => oneComment.owner.toString() + oneComment.createdAt.toString()}
            renderItem={ ({item}) => <Text> {item.comentario}</Text>}
        />  
        

        }
         <TextInput 
                    placeholder='Agregar comentario'
                    
                    keyboardType='default'
                    onChangeText={text=> this.setState({comentario:text})}
                    value={this.state.comentario}
                />
        <TouchableOpacity  onPress={() => this.crearComentario()}>
      <Text> Crear comentario </Text>
          </TouchableOpacity>
        

       
        
      </View>
    );
  }
}


export default Comentario;