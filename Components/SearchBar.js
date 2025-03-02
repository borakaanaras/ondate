import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // İnce ikon kütüphanesini içe aktar

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={18} color="gray" style={styles.icon} /> 
            <TextInput
                placeholder="Etkinlikleri ara..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // İkon ve metin yan yana
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10, // İkon ile metin arasında boşluk
    },
    input: {
        height: 40,
        fontSize: 16,
        flex: 1, // Metin alanının genişlemesi için
    },
});

export default SearchBar;