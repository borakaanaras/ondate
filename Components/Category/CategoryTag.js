import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryTag = ({ category, isSelected }) => {
    return (
        <View style={[
            styles.container,
            isSelected && styles.selectedContainer
        ]}>
            <Text style={[
                styles.text,
                isSelected && styles.selectedText
            ]}>{category}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EFFE',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        opacity: 0.8,  
    },
    selectedContainer: {
        backgroundColor: '#584CF4',
        
    },
    text: {
        color: '#584CF4',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedText: {
        color: 'white',
    }
});

export default CategoryTag;