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
                 this.setState({
                     permisos: true
                 })
             } )
             .catch( e => console.log(e)) 
     } 
    render(){
        return(
            <View style={ styles.container}>
                <Camera 
                    type={Camera.Constants.Type.front}
                    ref= { metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                    style = { styles.cameraBody }
                />
                <TouchableOpacity  style = { styles.button }>
                    <Text>Sacar Foto</Text>
                </TouchableOpacity>
            </View>
        )


}
    

}

const styles = StyleSheet.create({
    container:{
        //flex:1,
    },
    cameraBody: {
        flex:4
    },
    button:{
        flex:1,
    }
})

 
  

export default MyCamera