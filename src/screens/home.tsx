import React, { FC, } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

const Home: FC = () => {

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text>React native app with TypeScript</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Home;
