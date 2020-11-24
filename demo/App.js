/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getEmail, setEmail } from './auth_service';
import { ParksScreen } from './parks';
import { DetailScreen } from './location_detail';
import { styles } from './styles';
import { AppButton } from './components';

import { credentials } from './credentials.js'

// show credentials
console.log(credentials)
console.log(credentials.secret_id)

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const login = async (text) => {
    try {
        await setEmail(text);
    } catch (error) {
        console.log(error)
    }
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'React Native Demo' }}
        />
        <Stack.Screen name="Parks" options={{ title: 'Seattle Parks' }} component={ParksScreen} />
        <Stack.Screen name="Detail" options={{ title: 'Park Details' }} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen: () => React$Node = ({ navigation }) => {
  const [text, setText] = useState('');

  let value = "Enter Email";
    _retrieveData = async () => {
      try {
        const value = await getEmail();
        if (value !== null) {
          // We have data!!
          console.log(value);
          setText(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };

  return (
      <>
        <TouchableHighlight onPress={() => navigation.navigate('Parks')} underlayColor="white">
            <View>
              <Text style={styles.item}>Parks</Text>
            </View>
        </TouchableHighlight>
        <View>
          <TextInput
            style={{height: 40}}
            placeholder={value}
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
        <View style={styles.button}>
          <AppButton
            onPress={() => login(text)}
            title="Sign In"
          />
        </View>
        </View>
      </>
    )
}

export default App;
