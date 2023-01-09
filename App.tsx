import React, { FC, type PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Home } from "./src/screens";

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Home />
  );
};

const styles = StyleSheet.create({

});

export default App;
