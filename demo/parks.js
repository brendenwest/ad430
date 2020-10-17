import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

export const ParksScreen: () => React$Node = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //handling onPress action
  const getDetail = (item) => {
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
