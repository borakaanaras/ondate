import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ userName, userSurname, profileImage }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Image source={profileImage} style={styles.profileImage} />
                <View style={{}}>
                    <Text style={{color:'gray'}}>Günaydın! 🌞</Text>
                    <Text style={styles.userName}>{userName} {userSurname}</Text>
                </View>
            </View>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ChatScreen')}
                style={styles.notificationButton}
            >
                <FontAwesome5 name="paper-plane" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    notificationButton: {
        justifyContent: 'center', // İçeriği dikey olarak ortala
        alignItems: 'center', // İçeriği yatay olarak ortala
        
        padding: 5,
        width: 40,
        height: 40,
        backgroundColor: 'white', // Butonun arka plan rengi
        borderColor: '#F5F5F5', // Butonun kenar rengi
    },
});

export default CustomHeader;