import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform } from 'react-native';

import BotaoMais from '../components/BotaoMais';
import Home from './Home/Home';
import Doacoes from './Doacoes/Doacoes';
import Mais from './Mais/Mais';
import Mensagens from './Mensagens/Mensagens';
import Eventos from './Eventos/Eventos';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007CE0',
          tabBarInactiveTintColor: '#007CE0',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'white',
            borderTopColor: '#CCCCCC', // Cor da borda superior
            borderTopWidth: .7, // Largura da borda superior
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            height: 60, // Altura da TabBar
            paddingHorizontal: 35,
            shadowColor: '#AAAAAA',
            shadowOpacity: 0.1,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Doacoes"
          component={Doacoes}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="package" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Mais"
          component={Mais}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <BotaoMais size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Mensagens"
          component={Mensagens}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="message-square" size={22} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Eventos"
          component={Eventos}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="smile" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

export default Routes;
