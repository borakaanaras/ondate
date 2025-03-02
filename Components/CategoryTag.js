import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryTag = ({ category }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {typeof category === 'object' ? category.name : category}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#584CF4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    }
});

export default CategoryTag; 