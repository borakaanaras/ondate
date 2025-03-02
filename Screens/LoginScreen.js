import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, Platform, TextInput } from 'react-native';
import LoginWallpp from '../Components/LoginWallpp';
import { auth } from '../src/firebaseConfig';
import { GoogleAuthProvider, signInWithCredential, OAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import Register from './Register';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "YOUR_ANDROID_CLIENT_ID",
        iosClientId: "YOUR_IOS_CLIENT_ID",
        expoClientId: "YOUR_EXPO_CLIENT_ID"
    });

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await promptAsync();
            if (result?.type === 'success') {
                // Google'dan gelen token ile Firebase'de oturum açma işlemi
                const credential = GoogleAuthProvider.credential(
                    result.authentication.idToken,
                    result.authentication.accessToken
                );
                await signInWithCredential(auth, credential);
                navigation.navigate('Main');
            }
        } catch (error) {
            console.error('Google giriş hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        try {
            setLoading(true);
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            // Firebase ile Apple kimlik doğrulaması
            if (credential.identityToken) {
                const provider = new OAuthProvider('apple.com');
                const oAuthCredential = provider.credential({
                    idToken: credential.identityToken,
                    rawNonce: credential.nonce,
                });

                await signInWithCredential(auth, oAuthCredential);
                navigation.navigate('Main');
            }
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
                console.log('Kullanıcı giriş işlemini iptal etti');
            } else {
                console.error('Apple giriş hatası:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleEmailLogin = async () => {
        try {
            setLoading(true);
            
            // E-posta ve şifre boş kontrolü
            if (!formData.email || !formData.password) {
                alert('Lütfen e-posta ve şifre alanlarını doldurun.');
                return;
            }

            // Firebase ile giriş kontrolü
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigation.navigate('Main');
            
        } catch (error) {
            console.error('Giriş hatası:', error);
            
            // Hata mesajlarını Türkçeleştirme
            let errorMessage = 'Giriş sırasında bir hata oluştu.';
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Hatalı şifre girdiniz.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Geçersiz e-posta adresi.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Bu kullanıcı hesabı devre dışı bırakılmış.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Çok fazla başarısız giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyin.';
                    break;
            }
            
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginWallpp>
            <SafeAreaView>
                <Text style={styles.ondate}>On Date.</Text>
            </SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Let's explore events with people around you!</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-posta"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.email}
                        onChangeText={(text) => setFormData({...formData, email: text})}
                        maxLength={40}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) => setFormData({...formData, password: text})}
                        maxLength={20}
                    />

                    <TouchableOpacity 
                        style={styles.loginButton} 
                        onPress={handleEmailLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Text>
                    </TouchableOpacity>
                </View>

                

                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity 
                        style={[styles.socialButton, styles.googleButton]} 
                        onPress={handleGoogleLogin}
                        disabled={loading}
                    >
                        <Image source={require('../assets/logo/google.png')} style={styles.logo} />
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>

                    {Platform.OS === 'ios' && (
                        <TouchableOpacity 
                            style={[styles.socialButton, styles.appleButton]} 
                            onPress={handleAppleLogin}
                            disabled={loading}
                        >
                            <Image source={require('../assets/logo/apple.png')} style={styles.logo} />
                            <Text style={styles.socialButtonText}>Apple</Text>
                        </TouchableOpacity>
                    )}
                </View>
                    <View style={styles.dividerContainer}>
                                        <View style={styles.divider} />
                                        <Text style={styles.dividerText}>YA DA</Text>
                                        <View style={styles.divider} />
                                    </View>
                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Hesabın yok mu? Kaydol</Text>
                </TouchableOpacity>
            </View>
        </LoginWallpp>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 100,
        marginBottom: 100,
        width: '100%',
    },
    title: {
        fontSize: 36,
        color: 'white',
        marginBottom: 30,
        textAlign: 'center',
        width: 340,
    },
    inputContainer: {
        width: '90%',
        maxWidth: 350,
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        padding: 15,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
        width: '100%',
        height: 50,
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        height: 50,
        width: '90%',
    },
    loginButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        maxWidth: 300,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
        opacity: 0.6
    },
    dividerText: {
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
        width: '100%',
        maxWidth: 300,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 25,
        width: 130,
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    socialButtonText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
    },
    logo: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    registerButton: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        padding: 15,
        width: 200,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 14,
    },
    ondate: {
        color: 'white',
        justifyContent: 'flex-start',
        paddingBlockStart: 30,
        fontSize: 20
    },
});

export default LoginScreen;