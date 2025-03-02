import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Favpost = ({ navigation, eventTitle, location, place, eventDate, eventImage, category }) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate('PostDetail', { 
                eventTitle, 
                location, 
                place, 
                eventDate, 
                eventImage, 
                category 
            })}
        >
            <Image source={eventImage} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{eventTitle}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.place}>{place}</Text>
                <Text style={styles.date}>{eventDate}</Text>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        borderRadius: 15,
        marginBottom: 15,
        width: '90%',
        height: 150,
        overflow: 'hidden',
    },
    image: {
        width: '40%',
        borderRadius: 25,
        height: 150,
        alignSelf: 'left',
        resizeMode: 'contain',
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        color: '#999',
        marginBottom: 3,
    },
    place: {
        fontSize: 14,
        color: '#999',
        marginBottom: 3,
    },
    date: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
    },
    categoryContainer: {
        backgroundColor: '#584CF4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    category: {
        color: 'white',
        fontSize: 12,
    }
});

export default Favpost;

