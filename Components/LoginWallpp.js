import React from "react";
import { View, StyleSheet, Image, } from "react-native";

export default function LoginWallpp({ children }) {
    return (
        <View style={styles.container}>
            <Image source={require('../Components/login1.jpg')} style={styles.background} />
            {children} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // İçeriği dikeyde ortalamak için
        alignItems: 'center', // İçeriği yatayda ortalamak için
    },
    background: {
        position: 'absolute', // Resmi arka planda konumlandırmak için
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Resmin boyutunu kaplamak için
    },
});