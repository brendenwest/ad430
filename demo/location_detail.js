import React from 'react';
import {
  Text,
} from 'react-native';

export const DetailScreen = (data) => {
  let item = data.route.params.item;
  return <Text>Park Location: {item.name}</Text>;
};