import React from 'react';
import { StyleSheet, View } from 'react-native';

// Creating a container component which is used on every page of the app so that the look and feel is unified everywhere within the app
export default Container = (props) => {
  return <View style={{ ...styles.boxContainer, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
});
