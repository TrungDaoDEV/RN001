import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AppControlFlow() {
  return (
    <View>
      <Text>AppControlFlow</Text>
      <TouchableOpacity
        onPress={() => {
          // eslint-disable-next-line no-alert
          alert('dfdf');
        }}>
        <Text>HELLO WORLLD</Text>
      </TouchableOpacity>
    </View>
  );
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
