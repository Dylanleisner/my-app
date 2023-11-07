import {camera} from "expo-camera"

componentDidMount() 
{
    Camera.requestCameraPermissionsAsync()
      .then(()=>{
           this.setState({
               permission: true,
           })
      })
      .catch( e => console.log(e))          
  }

render() {
    return (

    );
  }
  