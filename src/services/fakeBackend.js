let posts = [];

export const fakeBackendService = {
    createPost: (postData) => {
        const newPost = {
            id: Date.now().toString(),
            ...postData,
            createdAt: new Date().toISOString(),
            likes: [],
            attendees: [],
            comments: []
        };
        posts.unshift(newPost);
        console.log('Fake backend - Tüm postlar:', posts); // Debug için
        return Promise.resolve(newPost);
    },

    getPosts: () => {
        console.log('Fake backend - Posts getting:', posts); // Debug için
        return Promise.resolve([...posts]);
    }
}; 