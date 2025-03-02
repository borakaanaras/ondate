import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryTag from './Category/CategoryTag';
import { CATEGORIES } from '../Constants/Categories';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            {CATEGORIES.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    onPress={() => onSelectCategory(category)}
                    style={styles.categoryButton}
                >
                    <CategoryTag 
                        category={category.name}
                        isSelected={selectedCategory?.id === category.id}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    categoryButton: {
        marginRight: 10,
    }
});

export default CategorySelector; 