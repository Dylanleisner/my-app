import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false, 
            urlInternaFoto: '', 
            mostrarCamara: true,
        }
        this.metodosDeCamara = '' 
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
             .then( () => {
                console.log("renderizado")
                 this.setState({
                     permisos: true
                 })
             } )
             .catch( e => console.log(e)) 
     } 
     sacarFoto(){
        this.metodosDeCamera.takePictureAsync()
        .then(foto => {
            console.log("foto", foto)
            this.setState({
            
                urlInternaFoto: foto.uri,
                mostrarCamara: false
            })
        })
        .catch(e => console.log(e))
     }
     Sacarfoto(){
        this.metodosDeCamara.takePictureAsync()
         .then(photo =>{
            this.setState({
                urlInternaFoto: photo.uri, //ruta interna foto
                mostrarCamara: false //escondemos camara p mostrar preview foto usuario
                
            })
         })

         .catch( e => console.log(e))
     }
    render(){
        return(
            <View style={ styles.container}>
                {
                    this.state.permisos?
                    <React.Fragment> 
                        <Camera 
                        type={Camera.Constants.Type.front}
                        ref= { metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        style = { styles.cameraBody } 
                />
                  {/* <Image
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover' 
                        /> */}
                    <TouchableOpacity onPress={(this.sacarFoto)} style = { styles.button }>
                        <Text >Sacar Foto</Text>
                    </TouchableOpacity>
                    </React.Fragment>
                    :
                    <Text> La camara no tiene permiso </Text>

                } 
            </View>
        )


}
    

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cameraBody: {
        flex:4
    },
    button:{
        flex:1,
    }
})

 
  

export default MyCamera
