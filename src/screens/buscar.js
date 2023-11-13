import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';



class Buscar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: [],
      usuarioFiltrado: [],
      usuarioFiltradoMail: [],
      textoUsuario: '',
      search: false
    }
  }

//   componentDidMount() {
//     db.collection('usuarios').onSnapshot(
//       docs => {
//         let user = [];
//         docs.forEach(docu => {
//           user.push({
//             id: docu.id,
//             data: docu.data()
//           })
//           this.setState({
//             users: user
//           })
//         })
//       }
//     )
//   }

//   buscar(text) {
//     this.setState({
//       usuarioFiltrado: this.state.usuario.filter(usuario => usuario.data.nombre_usuario.toLowerCase().includes(text.toLowerCase())),
//         usuarioFiltradoMail: this.state.usuario.filter(usuario=> usuario.data.owner.toLowerCase().includes(text.toLowerCase())),
//         search: true,
//         textoUsuario: text
//     })
// }

// controlarCambios(event) {
//   this.setState({
//       textoUsuario: event.target.value
//   })
// }

// borrarBuscador() {
//   this.setState({
//       usuarioFiltrado: '',
//       usuarioFiltradoMail: '',
//       textoUsuario: ''
//   })
// }



  render() {
    return (
      <View>
        <Text >buscar</Text>
        {/* <TextInput
                placeholder='Buscar un usuario'
                keyboardType='default'
              
                onChangeText={text => this.buscar(text)}
                value={this.state.textoUsuario}
            />
            
            { this.state.usuarioFiltrado.length == 0 && this.state.usuarioFiltradoMail.length == 0 && this.state.search == true ?
                <Text > Ese usuario no existe </Text> 
                :
                <View >
                    <FlatList
                        data={this.state.usuarioFiltrado}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('My profile', { email: item.data.owner })}>
                                <View>  
                                    <Text  > User name: </Text>
                                    <Text  >{item.data.nombre_usuario}</Text>
                                </View>  
                            </TouchableOpacity>
                            
            }/>
                    <FlatList
                        data={this.state.usuarioFiltradoMail}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('My profile', { email: item.data.owner })}>
                                <View >  
                                    <Text > Email: </Text>
                                    <Text  >{item.data.owner}</Text>
                                </View>     
                            </TouchableOpacity>
            }/>
                </View>
        } */}
        </View>
    )}

}


export default Buscar;

