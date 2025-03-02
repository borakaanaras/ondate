import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Animated } from "react-native";
import MainBackground from "../Background/MainBackground";
import Feather from '@expo/vector-icons/Feather';
import SearchBar from "../Components/SearchBar"; 
import PostCard from "../Components/PostCard";
import CustomHeader from "../Components/Header/Header";
import { fakeBackendService } from '../src/services/fakeBackend';

const HEADER_HEIGHT = 50; 
const HEADER_SCROLL_DISTANCE = 300;

const HomeScreen = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, 0],
        extrapolate: 'clamp'
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    // Firebase yerine fake backend'den veri çek
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Posts fetching başladı');
                const fetchedPosts = await fakeBackendService.getPosts();
                console.log('Fetched posts:', fetchedPosts);
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Gönderiler yüklenirken hata:", error);
            }
        };

        fetchPosts();
    }, [route.params?.refresh]); 

    const goToMap = () => {
        navigation.navigate('Map'); 
    };

    return (
        <MainBackground>
            <View style={{ flex: 1 }}>
                <CustomHeader
                    userName="Bora Kaan"
                    userSurname="Aras"
                    profileImage={require('../Components/Gorseller/borakaanaras.jpeg')}
                />
                {/* Arama Çubuğu */}
                <SearchBar 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                />
                
                {/* Animasyonlu secondHeader */}
                <Animated.View style={[
                    styles.secondHeader,
                    {
                        height: headerHeight,
                        opacity: headerOpacity
                    }
                ]}>
                    <Text style={styles.headerText}>Yakınındakiler🔥</Text>
                </Animated.View>
            
                <Animated.ScrollView 
                    showsVerticalScrollIndicator={false} 
                    style={styles.scrollView}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard 
                                key={post.id}
                                navigation={navigation}
                                eventTitle={post.title}
                                location={post.location}
                                place={post.place}
                                eventDate={new Date(post.date).toLocaleDateString('tr-TR', {
                                    weekday: 'short',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                eventImage={post.imageUrl.startsWith('http') 
                                    ? { uri: post.imageUrl } 
                                    : { uri: post.imageUrl }}
                                category={post.category}
                            />
                        ))
                    ) : (
                        <Text style={styles.noPostText}>Henüz paylaşılan etkinlik yok 😭 </Text>
                    )}
                    <PostCard 
                        navigation={navigation}
                        eventTitle="Mahmut Orhan | KALT" 
                        location="İzmir, Bornova"
                        place=" Kazım Dirik Mah. 372/32 Sok."
                        eventDate="Pzt, Mart 22, 18.00-23.00"  
                        eventImage={require('../Components/login1.jpg')}
                        category="Parti🥂 "
                    />
                    <PostCard 
                        navigation={navigation}
                        eventTitle="fred again.." 
                        location="Ankara, Türkiye"
                        place="Kızılcahamam"
                        eventDate="Sal, Nisan 10, 19.00-22.00"  
                        eventImage={require('../Components/Gorseller/postExample_3.png')}
                        category="Müzik 🎵 "
                    />
                    <PostCard 
                        navigation={navigation}
                        eventTitle="Çeşme Festivali" 
                        location="İzmir, Türkiye"
                        place="Çeşme, Cherry On Top"
                        eventDate="Çar, Mayıs 15, 10.00-16.00"  
                        eventImage={require('../Components/Gorseller/postExample_2.png')}
                        category="Kız neşesi 👯‍♀️ "
                    />
                    <PostCard 
                        navigation={navigation}
                        eventTitle="Yaz Atölyesi" 
                        location="Bodrum, Türkiye"
                        eventDate="Cum, Haziran 5, 14.00-18.00"  
                        eventImage={require('../Components/Gorseller/postExample_2.png')}
                        category="Atölye 🎨"
                    />
                </Animated.ScrollView>

                {/* Harita Butonu */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.map_button} onPress={goToMap}>
                        <Text style={styles.button_text}>Haritada Gör📍</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainBackground>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingVertical: 10,
    },
    secondHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '600',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    map_button: {
        width: '34%',
        height: 50,
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        flexDirection: 'row',
    },
    button_text: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 10,
    },
    noPostText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        color: '#666'
    },
});

export default HomeScreen;
