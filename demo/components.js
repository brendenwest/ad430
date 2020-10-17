import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

export const AppButton = ({onPress, title}) => {
    return (
        <View style={styles.button}>
          <Button
            onPress={onPress}
            title={title}
          />
        </View>
    )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 6,
  },
});