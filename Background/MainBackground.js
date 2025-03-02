import React from "react";
import { View, StyleSheet,SafeAreaView } from "react-native";

export default function MainBackground({ children }) {
    return (
        <SafeAreaView style={styles.background}>
            {children} 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: '#FEFEFE',
    },
});