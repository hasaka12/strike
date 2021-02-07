import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Screen3 = () => (
  <View style={styles.screen}>
    <Text>Screen 3</Text>
  </View>
);

export default Screen3;
