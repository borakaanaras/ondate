// MapScreen.js
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SearchBar from "../Components/SearchBar";
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    const entertainmentPlaces = [
        {
            id: 1,
            name: "Container Hall",
            coordinate: {
                latitude: 38.4622,
                longitude: 27.2176
            },
            description: "Konser & Etkinlik Mekanı"
        },
        {
            id: 2,
            name: "Hangout",
            coordinate: {
                latitude: 38.4326,
                longitude: 27.1428
            },
            description: "Bar & Gece Kulübü"
        },
        {
            id: 3,
            name: "Ooze Venue",
            coordinate: {
                latitude: 38.4623,
                longitude: 27.2177
            },
            description: "Konser Mekanı"
        },
        {
            id: 4,
            name: "Bios Bar",
            coordinate: {
                latitude: 38.4329,
                longitude: 27.1426
            },
            description: "Bar"
        },
        {
            id: 5,
            name: "Kült Alsancak",
            coordinate: {
                latitude: 38.4375,
                longitude: 27.1430
            },
            description: "Performans Mekanı"
        }
    ];

    return (
        <View style={styles.container}>   
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: 38.4192,
                    longitude: 27.1287,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {entertainmentPlaces.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={place.coordinate}
                        title={place.name}
                        description={place.description}
                        pinColor="#584CF4"
                    />
                ))}
            </MapView>
            <View style={styles.searchBarContainer}>
                <SearchBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchBarContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        zIndex: 1,
    }
});

export default MapScreen;