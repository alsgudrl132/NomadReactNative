import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
    const [city, setCity] = useState('Loading...');
    const [location, setLocation] = useState();
    const [ok, setOk] = useState(true);
    const ask = async () => {
        const granted = (await Location.requestForegroundPermissionsAsync()).granted;
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const locationArray = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
        const resultCity = locationArray[0].city;
        setCity(resultCity);
        console.log(city);
    };

    useEffect(() => {
        ask();
    });

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={styles.weather}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBE3D5',
    },
    city: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 68,
        fontWeight: 'bold',
    },
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    temp: {
        marginTop: 50,
        fontSize: 178,
    },
    description: {
        marginTop: -30,
        fontSize: 60,
    },
});
