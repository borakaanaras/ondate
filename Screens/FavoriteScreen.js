import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainBackground from '../Background/MainBackground';
import Favpost from '../Components/Favpost';
const FavoriteScreen = () => {
    return (
        <MainBackground>
            <View style={styles.container}>
                <Text style={styles.text}>Henüz favori etkinlik bulunmamaktadır. 😭</Text>

               
            </View>
        </MainBackground>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
});
