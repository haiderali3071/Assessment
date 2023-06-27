import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';
import BookCard from '../components/BookCard';
var axios = require('axios');

const getBooksURL = "http://10.0.2.2:3000/books/"

const ViewAllBooks = ({ navigation }) => {
    const [isRefresh, setRefresh] = useState(false);
    const [footerIndicator, setFooterIndicator] = useState(false);
    const [books, setBooks] = useState([]);

    function loadData(skip) {
        var config = {
            method: 'get',
            url: getBooksURL + skip,
        };

        return axios(config);
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await loadData(0);
                setBooks(data.books);
            }
            catch (err) {
                loadDummyData();
                Alert.alert('Error while loading books', 'Dummy data has been loaded');
            }
        })()
    }, [])

    function loadDummyData() {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                _id: Math.random(),
                title: '레이블라우스',
                description: 'Description of the book... \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                discountRate: 0,
                coverImageUrl: 'https://loremflickr.com/640/480',
                price: 1
            })
        }
        setBooks(data);
    }

    async function loadMoreResults() {
        try {
            setFooterIndicator(true);
            const { data } = await loadData(books.length);
            setBooks([...books, ...data.books]);
        }
        catch (err) {
            Alert.alert('Error occured');
        }
        finally {
            setFooterIndicator(false)
        }
    }

    async function refresh() {
        try {
            setRefresh(true);
            const { data } = await loadData(0);
            setBooks([...data.books]);
        }
        catch (err) {
            Alert.alert('Error occured');
        }
        finally {
            setRefresh(false)
        }
    }

    return (
        <View>
            <FlatList
                data={books}
                renderItem={({ item }) => <BookCard item={item} navigation={navigation} />}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.containerStyle}
                numColumns={2}
                columnWrapperStyle={{ flexShrink: 1 }}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    loadMoreResults();
                }}
                ListFooterComponent={<ActivityIndicator size="large" animating={footerIndicator} color={'#999999'} />}
                refreshing={isRefresh}
                onRefresh={refresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: 'white'
    }
});

export default ViewAllBooks;