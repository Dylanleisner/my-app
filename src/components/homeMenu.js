import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';


import Profile from '../screens/profile';
import NewPost from '../screens/newPost';
import ProfileNav from './profileNav';
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
                    component={ ProfileNav }  
                    options={
                        {
                            
                            headerShown: false
                        }                     
                    } />
  <Tab.Screen 
                    name="My profile" 
                    component={ Profile }  
                    options={
                        {
                            
                            headerShown: false,
                            
                        }
                    }/>
                
                <Tab.Screen 
                    name="NewPost" 
                    component={ NewPost }  
                    options={
                        {
                        
                            headerShown: false,
                        }
                    }/>
                
                <Tab.Screen 
                    name="Buscar" component={ Buscar }  
                    options={
                        {
                          
                            headerShown: false,
                        } 
                    } />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;