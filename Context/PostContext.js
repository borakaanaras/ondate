import React, { createContext, useState, useEffect } from 'react';
import { db } from '../src/firebaseConfig'; // Firebase config dosyasını içe aktar
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; // Firebase Firestore fonksiyonlarını içe aktar

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // Firestore'dan postları al
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
            const postsArray = querySnapshot.docs.map(doc => doc.data());
            setPosts(postsArray); // Veriyi state'e kaydet
        });

        // Cleanup function: Component unmount olduğunda dinleyiciyi temizle
        return () => unsubscribe();
    }, []);

    // Yeni post ekleme fonksiyonu
    const addPost = async (newPost) => {
        try {
            await addDoc(collection(db, "posts"), newPost); // Firestore'a yeni post ekle
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};
