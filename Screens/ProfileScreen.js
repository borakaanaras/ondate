import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, Image, FlatList, ScrollView } from "react-native";
import MainBackground from "../Background/MainBackground";

import PostCard from "../Components/PostCard";

const ProfileScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState({
        username: "Bora Kaan",
        profileImage: require('../Components/Gorseller/borakaanaras.jpeg'),
        bio: "Creator",
        followers: [],
        following: [],
    });

    const [userPosts, setUserPosts] = useState([
        { id: '1', title: 'Event 1', location: 'Location 1', date: '2023-01-01', image: 'https://example.com/event1.jpg' },
        { id: '2', title: 'Event 2', location: 'Location 2', date: '2023-02-01', image: 'https://example.com/event2.jpg' },
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Yükleme durumu ve kullanıcı bilgilerini ayarlama
        setLoading(false);
    }, []);


    return (
        <MainBackground>
            <SafeAreaView style={styles.container}>
                {userProfile && (
                    <>
                        <View style={styles.profileHeader}>
                        <Image 
                          source={userProfile.profileImage} 
                            style={styles.profileImage} 
                                />

                            <Text style={styles.username}>{userProfile.username}</Text>
                            <Text style={styles.bio}>{userProfile.bio}</Text>
                        </View>

                        <View style={styles.stats_All}>
                            <Text style={styles.stats} >Takipçi: {userProfile.followers.length}</Text>
                            <View style={styles.statsDivided}></View>
                            <Text style={styles.stats}>Takip: {userProfile.following.length}</Text>
                            <View style={styles.statsDivided}></View>
                            <Text style={styles.stats}>Etkinlikler: {userPosts.length}</Text>
                        </View>

                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:25, fontWeight:'600' }}>Planlanan etkinlikler 🤩</Text>
                        </View>
                        <ScrollView>
                        <PostCard 
                        navigation={navigation}
                        eventTitle="Mahmut Orhan | KALT" 
                        location="📍İzmir, Bornova"
                        eventDate="Pzt, Mart 22, 18.00-23.00"  
                        eventImage={require('../Components/login1.jpg')}
                        category="Parti🥂 "
                    />
                    <PostCard 
                        navigation={navigation}
                        eventTitle="fred again.." 
                        location="📍Ankara, Türkiye"
                        eventDate="Sal, Nisan 10, 19.00-22.00"  
                        eventImage={require('../Components/Gorseller/postExample_3.png')}
                        category="Müzik 🎵 "
                    />
                    <PostCard 
                        navigation={navigation}
                        eventTitle="Yaz Semineri" 
                        location="📍İzmir, Türkiye"
                        eventDate="Çar, Mayıs 15, 10.00-16.00"  
                        eventImage={require('../Components/Gorseller/postExample_2.png')}
                        category="Kız neşesi 👯‍♀️ "
                    />
                    </ScrollView>
                    </>
                )}
            </SafeAreaView>
        </MainBackground>
    );
};


const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 70,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    bio: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginTop: 4,
    },
    stats_All: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        alignItems: 'center',
    },
    stats:{
        fontWeight: '500',
        fontSize: 16,
    },
    statsDivided:{
        height: 30,
        width: 1,
        backgroundColor: '#ccc',
        
    }

};


export default ProfileScreen;
