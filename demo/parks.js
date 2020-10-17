import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import {
  Platform,
  Dimensions,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { AppButton } from './components';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 47.6168776;
const LONGITUDE = -122.3376114;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapStyles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   width: width,
   height: height,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export const ParksScreen: () => React$Node = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mapview, setMapview] = useState(true);

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
          <View style={styles.container}>
              <AppButton
                onPress={() => setMapview(true)}
                title="Map"
              />
                <AppButton
                  onPress={() => setMapview(false)}
                  title="List"
                />
          </View>
          <View >
              {isLoading ? <ActivityIndicator/> : mapview ?
              (
               <View style={mapStyles.container}>
                 <MapView
                   provider={PROVIDER_GOOGLE}
                   style={mapStyles.map}
                   initialRegion={{
                     latitude: LATITUDE,
                     longitude: LONGITUDE,
                     latitudeDelta: LATITUDE_DELTA,
                     longitudeDelta: LONGITUDE_DELTA,
                   }}
                   initialCamera={{
                    center: {
                      latitude: LATITUDE,
                      longitude: LONGITUDE,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 1000,
                    zoom: 11,
                  }}
                 >
                 </MapView>
               </View>
              ) :
              (
                    <FlatList
                      data={data}
                      keyExtractor={item => item.pmaid}
                      renderItem={renderItem}
                    />
              )

              }
            </View>
        </View>
      </SafeAreaView>
      </>
  );
};
