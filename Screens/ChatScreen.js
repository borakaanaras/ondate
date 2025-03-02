import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import MainBackground from "../Background/MainBackground";
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
    // Örnek mesaj verileri
    const messages = [
        {
            id: '1',
            sender: 'Bora Kaan',
            message: 'Merhaba, nasılsın?',
            time: '14:30',
            isSender: true
        },
        {
            id: '2',
            sender: 'Ayşe',
            message: 'İyiyim, teşekkürler! Sen nasılsın?',
            time: '14:31',
            isSender: false
        },
        {
            id: '3',
            sender: 'Bora Kaan',
            message: 'Ben de iyiyim. Bu akşam Container Hall\'daki etkinliğe gelecek misin?',
            time: '14:32',
            isSender: true
        },
        {
            id: '4',
            sender: 'Ayşe',
            message: 'Evet, gelmeyi düşünüyorum! Saat kaçta orada olacaksın?',
            time: '14:33',
            isSender: false
        }
    ];

    const renderMessage = ({ item }) => (
        <View style={[
            styles.messageContainer,
            item.isSender ? styles.senderMessage : styles.receiverMessage
        ]}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    return (
        <MainBackground>
            <SafeAreaView style={styles.container}>
                {/* Başlık */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Ayşe</Text>
                    <Text style={styles.statusText}>Çevrimiçi</Text>
                </View>

                {/* Mesajlar */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    style={styles.messagesList}
                />

                {/* Mesaj Gönderme Alanı */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mesaj yazın..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Ionicons name="send" size={24} color="#584CF4" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </MainBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    statusText: {
        fontSize: 14,
        color: '#4CAF50',
        marginTop: 2,
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
        marginVertical: 5,
    },
    senderMessage: {
        backgroundColor: '#584CF4',
        alignSelf: 'flex-end',
        borderTopRightRadius: 5,
    },
    receiverMessage: {
        backgroundColor: '#333',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 5,
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    timeText: {
        color: '#DDD',
        fontSize: 12,
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#1a1a1a',
    },
    input: {
        flex: 1,
        backgroundColor: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        color: 'white',
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: '#333',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatScreen;