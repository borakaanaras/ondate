import React from 'react';
import { 
    View, 
    StyleSheet, 
    ActivityIndicator, 
    Text,
    Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>onDate.</Text>
            <ActivityIndicator 
                size="large" 
                color="white" 
                style={styles.spinner}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: 400,
        color: 'white',
        marginBottom: 20,
    },
    spinner: {
        marginTop: 20,
    }
});

export default LoadingScreen; 