import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryTag from '../Components/Category/CategoryTag';

const PostDetail = ({ route, navigation }) => {
    const { eventTitle, location, place, eventDate, eventImage, category } = route.params;
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const currentUser = {
        username: 'Kullanici Adi',
        profileImage: require('../Components/Gorseller/borakaanaras.jpeg')
    };

    const [comments, setComments] = useState([
        {
            id: '1',
            user: {
                username: 'Bora Kaan Aras',
                profileImage: require('../Components/Gorseller/borakaanaras.jpeg')
            },
            text: 'orda olucam ;)',
            timestamp: '2 saat önce',
            likes: 5
        },
        // Daha fazla örnek yorum eklenebilir
    ]);

    const handleAddComment = () => {
        if (commentText.trim()) {
            const newComment = {
                id: Date.now().toString(),
                user: currentUser,
                text: commentText,
                timestamp: 'Şimdi',
                likes: 0
            };
            setComments([newComment, ...comments]);
            setCommentText('');
        }
    };

    const handleLikeComment = (commentId) => {
        setComments(comments.map(comment => 
            comment.id === commentId 
                ? {...comment, likes: comment.likes + 1}
                : comment
        ));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.mainContainer}
            >
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.headerIcon}>
                                <Icon name="heart-outline" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.headerIcon}>
                                <Icon name="share-variant" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image source={eventImage} style={styles.image} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{eventTitle}</Text>
                        
                        <View style={styles.categoryContainer}>
                            <CategoryTag category={category} />
                            <View style={styles.attendeesContainer}>
                                <View style={styles.avatarStack}>
                                    {/* Avatar stack buraya gelecek */}
                                </View>
                                <Text style={styles.attendeesText}>20,000+ going</Text>
                            </View>
                        </View>

                        <View style={styles.eventInfo}>
                            <View style={styles.infoRow}>
                                <Icon name="calendar" size={24} color="#584CF4" />
                                <View style={styles.infoText}>
                                    <Text style={styles.infoTitle}>{eventDate}</Text>
                                    <Text style={styles.infoSubtitle}>21:00 - 23:00 PM (GMT +03:00)</Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <Icon name="map-marker" size={24} color="#584CF4" />
                                <View style={styles.infoText}>
                                    <Text style={styles.infoTitle}>{location}</Text>
                                    <Text style={styles.infoSubtitle}>{place}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.locationButton}>
                            <Text style={styles.locationButtonText}>Haritada Gör</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book Event</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentsSection}>
                        <TouchableOpacity 
                            style={styles.commentsHeader}
                            onPress={() => setShowComments(!showComments)}
                        >
                            <Text style={styles.commentsTitle}>
                                Yorumlar ({comments.length})
                            </Text>
                            <Icon 
                                name={showComments ? "chevron-up" : "chevron-down"} 
                                size={24} 
                                color="#584CF4" 
                            />
                        </TouchableOpacity>

                        {showComments && (
                            <View style={styles.commentsList}>
                                {comments.map((comment) => (
                                    <View key={comment.id} style={styles.commentItem}>
                                        <Image 
                                            source={comment.user.profileImage} 
                                            style={styles.commentAvatar}
                                        />
                                        <View style={styles.commentContent}>
                                            <View style={styles.commentHeader}>
                                                <Text style={styles.commentUsername}>
                                                    {comment.user.username}
                                                </Text>
                                                <Text style={styles.commentTime}>
                                                    {comment.timestamp}
                                                </Text>
                                            </View>
                                            <Text style={styles.commentText}>
                                                {comment.text}
                                            </Text>
                                            <TouchableOpacity 
                                                style={styles.likeButton}
                                                onPress={() => handleLikeComment(comment.id)}
                                            >
                                                <Icon name="heart-outline" size={16} color="#666" />
                                                <Text style={styles.likeCount}>
                                                    {comment.likes}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.commentInputContainer}>
                    <Image 
                        source={currentUser.profileImage}
                        style={styles.inputAvatar}
                    />
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Yorum yaz..."
                        value={commentText}
                        onChangeText={setCommentText}
                        multiline
                    />
                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={handleAddComment}
                    >
                        <Icon name="send" size={24} color="#584CF4" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 20,
    },
    headerRight: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 20,
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height * 0.5,
    },
    content: {
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    attendeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarStack: {
        flexDirection: 'row',
        marginRight: 8,
    },
    attendeesText: {
        color: '#666',
        fontSize: 14,
    },
    eventInfo: {
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoText: {
        marginLeft: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    infoSubtitle: {
        color: '#666',
        fontSize: 14,
    },
    locationButton: {
        backgroundColor: '#F0EFFE',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    locationButtonText: {
        color: '#584CF4',
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: '#584CF4',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    commentsSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    commentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    commentsList: {
        marginTop: 10,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    commentUsername: {
        fontWeight: '500',
    },
    commentTime: {
        color: '#666',
        fontSize: 12,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    likeCount: {
        marginLeft: 5,
        color: '#666',
        fontSize: 12,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: 'white',
    },
    inputAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 10,
        padding: 5,
    },
});

export default PostDetail;