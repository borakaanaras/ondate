import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import LoginWallpp from '../Components/LoginWallpp';
import { auth } from '../src/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebaseConfig';
import { storage } from '../src/firebaseConfig';

const Register = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        fullName: '',
        bio: '',
        profileImage: null
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);
            
            // Firebase Auth ile kullanıcı oluştur
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            // Profil fotoğrafını yükle
            let profileImageUrl = '';
            if (formData.profileImage) {
                const imageRef = ref(storage, `profileImages/${userCredential.user.uid}`);
                await uploadBytes(imageRef, formData.profileImage);
                profileImageUrl = await getDownloadURL(imageRef);
            }

            // Firestore'da kullanıcı dokümanı oluştur
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                username: formData.username,
                fullName: formData.fullName,
                email: formData.email,
                bio: formData.bio,
                profileImage: profileImageUrl,
                createdAt: serverTimestamp(),
                followers: [],
                following: []
            });

            navigation.navigate('Main');
        } catch (error) {
            console.error('Kayıt hatası:', error);
            alert('Kayıt sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginWallpp>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Kayıt Ol</Text>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ad"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={formData.name}
                            onChangeText={(text) => setFormData({...formData, name: text})}
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Soyad"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={formData.surname}
                            onChangeText={(text) => setFormData({...formData, surname: text})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="E-posta"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => setFormData({...formData, email: text})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Şifre"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => setFormData({...formData, password: text})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Telefon"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({...formData, phone: text})}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.registerButton} 
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.loginLink} 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginLinkText}>
                            Zaten hesabın var mı? Giriş yap
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LoginWallpp>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: 'white',
        marginBottom: 40,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        maxWidth: 300,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 15,
        width: '100%',
        maxWidth: 200,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
    },
    loginLinkText: {
        color: 'white',
        fontSize: 14,
    },
});

export default Register; 