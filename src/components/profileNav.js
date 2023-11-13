import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Home from '../screens/home';
import Comentario from '../screens/comentarios';
import Profile from '../screens/profile';

const Stack = createNativeStackNavigator();

function ProfileNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options={{headerShown: false}}/>  
        <Stack.Screen  name="Perfil" component={ Profile } options={{headerShown: false}}/>
        <Stack.Screen name="Comments" component={ Comentario } />  

    </Stack.Navigator>
  );
}

export default ProfileNav;