import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';   
import CategoryTag from './Category/CategoryTag';

const PostCard = ({ navigation, eventTitle, location, place, eventDate, eventImage, category }) => {
    const [isFavorite, setIsFavorite] = useState(false); // Favori durumu için state

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); 
    };

    const handlePress = () => {
        navigation.navigate('PostDetail', {
            eventTitle,
            location,
            place: place || "Mekan bilgisi yok",
            eventDate,
            eventImage,
            category,
        });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}> 
            <Image source={eventImage} style={styles.image} />
            <View style={styles.categoryPosition}>
                <CategoryTag 
                    category={typeof category === 'object' ? category.name : category} 
                />
            </View>
            <View style={styles.overlay}>
                <Text style={styles.title}>{eventTitle}</Text>
                <Text style={styles.date}>{eventDate}</Text>
                <Text style={styles.location}>📍{location}</Text>
                <Text style={styles.place}>🏠{place}</Text>
            </View>
            
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <MaterialIcons 
                    name={isFavorite ? "favorite" : "favorite-border"} 
                    size={28} 
                    color={isFavorite ? "red" : "black"} // Favori durumuna göre renk değişimi
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        borderWidth: 0,
        width: '96%',
        height: 430,
        overflow: 'hidden',
        backgroundColor: '#F8F8F8',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 10,
        shadowRadius: 4,
        margin: 10,
        position: 'relative',
        alignSelf: 'center',
    },
    image: {
        width: '94%',
        height: 300,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 25,
    },
    categoryPosition: {
        position: 'absolute',
        top: 25,
        right: 15,
    },
    overlay: {
        position: 'absolute',
        bottom: 60,
        left: 5,
        right: 0,
        padding: 10,
        bottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#584CF4',
        marginVertical: 5,
        top: 5,
    },
    location: {
        fontSize: 14,
        color: 'gray',
        top: 15,
    },
    place: {
        fontSize: 14,
        color: 'gray',
        top: 20
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 15,
        right: 20,
    },
});

export default PostCard;
