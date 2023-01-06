import React, { FC, type PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text>React native app with TypeScript</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
