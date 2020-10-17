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

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  Colors,
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
          <Button
            onPress={() => login(text)}
            title="Sign In"
            color="#a3d6d7"
          />
        </View>
      </>
    )
}

const ParksScreen: () => React$Node = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //handling onPress action
  getDetail = (item) => {
    navigation.navigate('Detail', { item })
  }

  const renderItem = ({ item }) => (
    <TouchableHighlight onPress={getDetail.bind(this, item)} underlayColor="white">
        <View style={styles.item} >
          <Text style={styles.title}>{item.name} - {item.zip_code}</Text>
        </View>
    </TouchableHighlight>
  );

  useEffect(() => {
    fetch('https://data.seattle.gov/resource/v5tj-kqhc.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View >
              {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                      data={data}
                      keyExtractor={item => item.pmaid}
                      renderItem={renderItem}
                    />
              )}
            </View>
        </View>
      </SafeAreaView>
      </>
  );
};

const DetailScreen = (data) => {
  let item = data.route.params.item;
  return <Text>Park Location: {item.name}</Text>;
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  item: {
    backgroundColor: '#a3d6d7',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    color: Colors.black
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
