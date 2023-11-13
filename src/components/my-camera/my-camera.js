import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { storage } from '../../firebase/config';

class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: false,
      urlInternaFoto: '',
      mostrarCamara: true,
    };
    this.metodosDeCamara = '';
  }

  componentDidMount() {
    // Pedir permisos para uso del hardware.
    Camera.requestCameraPermissionsAsync()
      .then(() => {
        this.setState({
          permisos: true,
        });
      })
      .catch((e) => console.log(e));
  }

  SacarFoto() {
    console.log('sacando foto...');
    this.metodosDeCamara.takePictureAsync()
      .then((photo) => {
        this.setState({
          urlInternaFoto: photo.uri,
          mostrarCamara: false,
        });
      })
      .catch((e) => console.log(e));
  }

  guardarFoto() {
    fetch(this.state.urlInternaFoto)
      .then((res) => res.blob()) //.blob() recupera datos binarios. Las fotos son archivos binarios.
      .then((image) => {
        const ruta = storage.ref(`photos/${Date.now()}.jpg`);
        ruta.put(image)
          .then(() => {
            ruta.getDownloadURL() //La url de guardado de la foto.
              .then((url) => {
                //Necesitamos guardar la url en internet como un dato más del posteo.
                this.props.traerUrlDeFoto(url);
                //Borra la url temporal del estado.
                this.setState({
                  urlInternaFoto: '',
                });
              });
          });
      })
      .catch((e) => console.log(e));
  }

  cancelar() {
    this.setState({
      urlInternaFoto: '',
      mostrarCamara: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.permisos ? (
          this.state.mostrarCamara === false ? (
            // Preview
            <React.Fragment>
              <Image
                source={{ uri: this.state.urlInternaFoto }}
                style={styles.previewImage}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.guardarFoto()} style={styles.button}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.cancelar()} style={styles.button}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : (
            // Cámara.
            <React.Fragment>
              <Camera
                type={Camera.Constants.Type.front}
                ref={(metodosDeCamara) => (this.metodosDeCamara = metodosDeCamara)}
                style={styles.cameraBody}
              />
              <TouchableOpacity onPress={() => this.SacarFoto()} style={styles.captureButton}>
                <Text style={styles.buttonText}>Sacar Foto</Text>
              </TouchableOpacity>
            </React.Fragment>
          )
        ) : (
          <Text style={styles.errorText}>La cámara no tiene permisos</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D32F2F', // Fondo rojo
    padding: 10,
  },
  button: {
    flex: 1,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    backgroundColor: '#D32F2F', // Fondo rojo
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  cameraBody: {
    flex: 1,
  },
  captureButton: {
    backgroundColor: '#D32F2F', // Fondo rojo
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignSelf: 'center',
  },
});

export default MyCamera;
