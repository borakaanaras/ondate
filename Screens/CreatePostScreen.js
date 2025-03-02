import React, { useState, useEffect, useContext } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    ScrollView,
    Platform,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategorySelector from '../Components/CategorySelector';
import { CATEGORIES } from '../Constants/Categories';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PostContext } from '../Context/PostContext';
import * as ExpoImagePicker from 'expo-image-picker';
import { fakeBackendService } from '../src/services/fakeBackend';

const CreatePostScreen = ({ navigation }) => {
    const context = useContext(PostContext);
    console.log('PostContext:', context);
    const { addPost } = context || {};
    const [eventTitle, setEventTitle] = useState('');
    const [location, setLocation] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [eventImage, setEventImage] = useState(null);
    const [tempDate, setTempDate] = useState(new Date());
    const [mode, setMode] = useState('date');

    useEffect(() => {
        (async () => {
            try {
                const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'İzin Gerekli',
                        'Fotoğraf seçebilmek için galeri izni gerekiyor.',
                        [{ text: 'Tamam' }]
                    );
                }
            } catch (error) {
                console.log('İzin hatası:', error);
            }
        })();
    }, []);

    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setTempDate(selectedDate);
        }
    };

    const handleConfirmDate = () => {
        const newDate = new Date(tempDate);
        if (mode === 'date') {
            newDate.setHours(date.getHours());
            newDate.setMinutes(date.getMinutes());
        } else {
            const currentDate = new Date(date);
            currentDate.setHours(newDate.getHours());
            currentDate.setMinutes(newDate.getMinutes());
            newDate.setTime(currentDate.getTime());
        }
        setDate(newDate);
        setShowDatePicker(false);
        setShowTimePicker(false);
    };

    const handleCancelDate = () => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        setTempDate(date);
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
        setTempDate(date);
        if (currentMode === 'date') {
            setShowDatePicker(true);
            setShowTimePicker(false);
        } else {
            setShowDatePicker(false);
            setShowTimePicker(true);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSelectImage = async () => {
        try {
            console.log('Fotoğraf seçme başlatılıyor...');

            const result = await ExpoImagePicker.launchImageLibraryAsync({
                mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            });

            console.log('Picker sonucu:', result);

            if (!result.canceled) {
                console.log('Seçilen fotoğraf:', result.assets[0].uri);
                setEventImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Fotoğraf seçme hatası:', error);
            Alert.alert(
                'Hata',
                'Fotoğraf seçilirken bir hata oluştu. Lütfen tekrar deneyin.',
                [{ text: 'Tamam' }]
            );
        }
    };

    const handlePost = async () => {
        try {
            if (!eventTitle || !location || !date || !selectedCategory || !eventImage) {
                Alert.alert("Uyarı", "Lütfen tüm alanları doldurun");
                return;
            }

            
            const postData = {
                userId: "fakeUserId",
                title: eventTitle,
                location: location,
                place: place || location,
                date: date.toISOString(),
                category: selectedCategory.name,
                imageUrl: eventImage,
                createdAt: new Date().toISOString()
            };

            // Fake backend'e kaydet
            await fakeBackendService.createPost(postData);

            Alert.alert(
                "Başarılı",
                "Etkinlik paylaşıldı!",
                [{ 
                    text: "Tamam", 
                    onPress: () => navigation.navigate('Home', { refresh: true }) 
                }]
            );

        } catch (error) {
            console.error('Post paylaşma hatası:', error);
            Alert.alert(
                "Hata", 
                "Etkinlik paylaşılırken bir hata oluştu"
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="dark" />
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.container}
                    keyboardVerticalOffset={0}
                >
                    <ScrollView 
                        style={styles.scrollView}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Yeni Etkinlik</Text>
                            <TouchableOpacity 
                                style={[styles.postButton, {
                                    backgroundColor: 
                                        eventTitle && location && date && selectedCategory && place
                                        ? '#584CF4'
                                        : '#E0E0E0'
                                }]}
                                onPress={handlePost}
                                disabled={!eventTitle || !location || !date || !selectedCategory || !place}
                            >
                                <Text style={styles.postButtonText}>Paylaş</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>
                            {eventImage ? (
                                <Image source={{ uri: eventImage }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Icon name="image-plus" size={40} color="#666" />
                                    <Text style={styles.imagePlaceholderText}>Fotoğraf Ekle</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Etkinlik Başlığı"
                                value={eventTitle}
                                onChangeText={setEventTitle}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Konum"
                                value={location}
                                onChangeText={setLocation}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Cadde, Mahalle, Mekan"
                                value={place}
                                onChangeText={setPlace}
                            />

                            <View style={styles.dateTimeContainer}>
                                <TouchableOpacity 
                                    style={[styles.input, styles.dateInput]}
                                    onPress={() => showMode('date')}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {formatDate(date)}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[styles.input, styles.dateInput]}
                                    onPress={() => showMode('time')}
                                >
                                    <Text style={styles.dateTimeText}>
                                        {formatTime(date)}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Modal
                                visible={showDatePicker || showTimePicker}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={handleCancelDate}
                            >
                                <TouchableWithoutFeedback onPress={handleCancelDate}>
                                    <View style={styles.modalOverlay}>
                                        <TouchableWithoutFeedback>
                                            <View style={styles.modalContent}>
                                                <View style={styles.modalHeader}>
                                                    <Text style={styles.modalTitle}>
                                                        {mode === 'date' ? 'Tarih Seç' : 'Saat Seç'}
                                                    </Text>
                                                    <TouchableOpacity onPress={handleCancelDate}>
                                                        <Text style={styles.closeButton}>✕</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={tempDate}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    onChange={onDateChange}
                                                    minimumDate={new Date()}
                                                    locale="tr-TR"
                                                    style={styles.datePicker}
                                                />

                                                <TouchableOpacity 
                                                    style={styles.confirmButton}
                                                    onPress={handleConfirmDate}
                                                >
                                                    <Text style={styles.confirmButtonText}>Tamam</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>

                            <Text style={styles.sectionTitle}>Kategori</Text>
                            <CategorySelector
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    postButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    postButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    imageContainer: {
        height: 350,
        marginVertical: 16,
        marginHorizontal: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 8,
        color: '#666',
    },
    form: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    dateInput: {
        flex: 0.48,
        justifyContent: 'center',
    },
    dateTimeText: {
        fontSize: 16,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
    },
    datePicker: {
        width: '100%',
        backgroundColor: 'white',
    },
    confirmButton: {
        backgroundColor: '#584CF4',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CreatePostScreen;
