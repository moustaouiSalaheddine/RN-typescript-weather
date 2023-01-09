import React, { FC, useState, } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import Axios from 'axios';
import moment from 'moment';
import imageDictionary from "../core/utils/imageDictionary";
import { WEATHER_APP_ID } from "../core/utils/constants";

const SCREEN = Dimensions.get("screen");
const PADDING_HORIZONTAL = 15;
const SIZE_IMAGE = SCREEN.width * .6 - PADDING_HORIZONTAL * 2;
const TODAY = moment(new Date()).format("YYYY-MM-DD")
const Home: FC = () => {
    const [data, setData] = useState<any>(
        {
            "base": "stations",
            "clouds": { "all": 0 },
            "cod": 200,
            "coord": { "lat": 31.6315, "lon": -8.0083 },
            "dt": 1673014147, "id": 2542997,
            "main": {
                "feels_like": 68.31, "humidity": 37, "pressure": 1025, "temp": 69.87,
                "temp_max": 69.87,
                "temp_min": 69.87
            },
            "name": "Marrakesh",
            "sys": { "country": "MA", "id": 2409, "sunrise": 1672990342, "sunset": 1673026959, "type": 1 },
            "timezone": 3600,
            "visibility": 10000,
            "weather": [{ "description": "clear sky", "icon": "01d", "id": 800, "main": "Clear" }],
            "wind": { "deg": 0, "speed": 4.61 }
        }
    );
    const [location, setLocation] = useState<any>('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${WEATHER_APP_ID}`;

    const searchLocation = () => {
        Axios.get(url).then((response: any) => {
            setData(response.data)
        })
        setLocation('')
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: .2, justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: SCREEN.width - PADDING_HORIZONTAL * 2, height: 47, }}>
                    <TextInput
                        style={styles.textInput}
                        value={location}
                        onChangeText={text => setLocation(text)}
                        placeholder='Enter Location'
                    />
                    <TouchableOpacity activeOpacity={.7} style={{ backgroundColor: "#272343e0", width: 41, height: 41, position: "absolute", zIndex: 1, right: 3, top: 3, justifyContent: "center", alignItems: "center", borderRadius: 6 }}
                        onPress={() => searchLocation()}>
                        <Image style={{ width: 30, height: 30, tintColor: "white" }} source={imageDictionary["search"]} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
                <View style={{ flex: 2, }}>
                    <View style={{ width: SIZE_IMAGE, height: SIZE_IMAGE }}>
                        <Image style={{ width: SIZE_IMAGE, height: SIZE_IMAGE }} source={imageDictionary["01d"]} />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 15 }}>
                        <Text style={styles.textBold}>{data?.name || "City"}, {data?.sys?.country || "Country"}</Text>
                        <Text style={[styles.text, { marginTop: 7 }]}>{moment(data?.sys?.dt).format("YYYY-MM-DD") || TODAY} {moment(data?.sys?.dt).format('LTS') || ""}</Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 15, }}>
                        <Text style={[styles.textBold, { fontSize: 30, }]}>{data?.main?.temp} ºC</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={styles.maxWidth}>
                        <Text style={styles.textBold}>Humidity</Text>
                        <Text style={styles.textBold}>{data?.main?.humidity}</Text>
                    </View>
                    <View style={styles.maxWidth}>
                        <Text style={styles.textBold}>Min Temperature</Text>
                        <Text style={styles.textBold}>{data?.main?.temp_min}</Text>
                    </View>
                    <View style={styles.maxWidth}>
                        <Text style={styles.textBold}>Max Temperature</Text>
                        <Text style={styles.textBold}>{data?.main?.temp_max}</Text>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-around", width: SCREEN.width - PADDING_HORIZONTAL * 2 }}>
                        <View style={{ alignItems: "center" }}>
                            <Image style={{ width: 40, height: 40 }} source={imageDictionary["sunrise"]} />
                            <Text style={styles.text}>sunrise</Text>
                            <Text style={styles.textBold}>{moment(data?.sys?.sunrise).format('LT') || "-"}</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image style={{ width: 40, height: 40 }} source={imageDictionary["sunset"]} />
                            <Text style={styles.text}>sunset</Text>
                            <Text style={styles.textBold}>{moment(data?.sys?.sunset).format('LT') || "-"}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#272343e0", paddingTop: StatusBar.currentHeight || 42 },
    textInput: { borderWidth: 1, borderColor: "white", color: "black", backgroundColor: "white", width: SCREEN.width - PADDING_HORIZONTAL * 2, height: 47, padding: PADDING_HORIZONTAL, borderRadius: 7 },
    text: { color: "white", fontSize: 16, },
    textBold: { color: "white", fontSize: 16, fontWeight: "bold" },
    maxWidth: { flexDirection: "row", justifyContent: "space-between", width: SCREEN.width - PADDING_HORIZONTAL * 4, marginTop: 15 },
});

export default Home;
