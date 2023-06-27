import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

const imageWidth = Dimensions.get('screen').width * 0.49;

const BookCard = ({ item, navigation }) => {

    function viewBook() {
        navigation.navigate('ViewBook', { item });
    }

    return (
        <TouchableOpacity style={styles.containerStyle} onPress={viewBook}>
            {item.coverImageUrl ? (
                <Image source={{ uri: item.coverImageUrl }} style={styles.imageStyle} />
            ) : (
                <View style={[styles.imageStyle, { alignItems: 'center', justifyContent: 'center' }]} >
                    <Image style={{ width: 23.18, height: 23.18 }} source={require('../../assets/photo_icon.png')} />
                </View>
            )}
            <Text style={styles.titleStyle}>{item.title}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.discountStyle}>{item.discountRate}%</Text>
                <Text style={styles.priceStyle}>{item.price}<Text style={{ color: '#1D232B', fontWeight: '500', fontSize: 14 }}>원</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginBottom: 18,
        height: 257,
        width: imageWidth,
        marginHorizontal: (Dimensions.get('screen').width * 0.01) / 2,
    },
    imageStyle: {
        width: imageWidth,
        height: undefined,
        backgroundColor: '#EDEEF3',
        aspectRatio: 1
    },
    titleStyle: {
        marginLeft: 15.5,
        marginTop: 8,
        color: '#1D232B',
        fontSize: 14,
        fontWeight: '500'
    },
    priceContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        marginLeft: 15.5,
        marginRight: 16.5
    },
    discountStyle: {
        color: '#FF003E',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'Roboto'
    },
    priceStyle: {
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#080A0C'
    }
});

export default BookCard;