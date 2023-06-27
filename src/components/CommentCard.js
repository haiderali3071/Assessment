import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


const CommentCard = ({ style, item }) => {
    return (
        <View style={style}>
            <View style={styles.profile}>
                <Image style={styles.profileImage} source={require('../../assets/profile.png')} />
                <Text style={styles.userName}>{item.userName}</Text>
                {
                    item.isVerified && (
                        <View style={{ width: 14, height: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#01B99F', borderRadius: 50, marginLeft: 5 }}>
                            <Image style={{ width: 7.83, height: 6.08 }} source={require('../../assets/check_small.png')} />
                        </View>
                    )
                }
                <Text style={{ marginLeft: 5, color: '#919EB6', fontSize: 10, fontWeight: '500' }}>1일전</Text>
                <Image source={require('../../assets/dots.png')} style={{ marginLeft: 'auto' }} />
            </View>
            <Text style={{ marginLeft: 40, marginTop: 10, fontWeight: '400', fontSize: 12, color: '#313B49' }}>{item.comment}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 10, alignItems: 'center' }}>
                <Image style={{ width: 15.62, height: 13.54 }} source={require('../../assets/heart.png')} />
                <Text style={styles.countStyle}>{item.likes}</Text>
                {
                    item.replies && (
                        <>
                            <Image style={{ marginLeft: 10, width: 14.58, height: 14.46 }} source={require('../../assets/comment.png')} />
                            <Text style={styles.countStyle}>{item.replies.length}</Text>
                        </>
                    )
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    profile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: 'lightgrey',
    },
    userName: {
        color: '#1D232B',
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 8
    },
    countStyle: {
        marginLeft: 3,
        fontSize: 9.35,
        fontWeight: '400',
        color: '#919EB6'
    }
});

export default CommentCard;