// MapScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;