import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Profile from '../screens/profile';
import NewPost from '../screens/newPost';
import Home from '../screens/home';
import Buscar from '../screens/buscar';

import { TouchableOpacity } from 'react-native';

import { auth } from '../firebase/config';
import { Component } from 'react';

const Tab = createBottomTabNavigator();


class HomeMenu extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    component={ Home }  
                    options={
                        {
                            // tabBarIcon: ()=> <FontAwesome name="home" size={26} color="#926F5B" />,
                            headerShown: false
                        }                     
                    } />
  <Tab.Screen 
                    name="My profile" 
                    component={ Profile }  
                    options={
                        {
                            // tabBarIcon: ()=> <Ionicons name="person-circle" size={26} color="#926F5B" />,
                            headerShown: false,
                            
                        }
                    }/>
                
                <Tab.Screen 
                    name="NewPost" 
                    component={ NewPost }  
                    options={
                        {
                            // tabBarIcon: ()=> <MaterialIcons name="add-a-photo" size={26} color="#926F5B" />,
                            headerShown: false,
                        }
                    }/>
                
                <Tab.Screen 
                    name="Buscar" component={ Buscar }  
                    options={
                        {
                            // tabBarIcon: ()=> <FontAwesome name="search" size={26} color="#926F5B" />,
                            headerShown: false,
                        } 
                    } />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;