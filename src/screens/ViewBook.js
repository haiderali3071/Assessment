import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TextInput,
    Keyboard
} from 'react-native';
import CommentCard from '../components/CommentCard';
import { useHeaderHeight } from '@react-navigation/elements';


const ViewBook = ({ route, navigation }) => {
    const headerHeight = useHeaderHeight();
    const { item } = route.params;
    const [offset, setOffset] = useState(0);
    const [text, setText] = useState('');
    const [comments, setComments] = useState([
        {
            userName: '안녕 나 응애',
            profileUrl: '',
            isVerified: true,
            comment: '어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭 우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도 아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니 꼭 봐주세용~!',
            likes: 5,
            replies: [
                {
                    userName: 'ㅇㅅㅇ',
                    profileUrl: '',
                    isVerified: false,
                    comment: '오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다',
                    likes: 5,
                }
            ]

        }
    ]); // comments' dummy data

    navigation.setOptions({
        title: item.title
    })

    function addComment() {
        setComments([...comments, {
            userName: 'Haider Ali',
            profileUrl: '',
            isVerified: true,
            comment: text,
            likes: 0,
            replies: []
        }]);
        setText('');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView>
                {item.coverImageUrl ? (
                    <Image source={{ uri: item.coverImageUrl }} style={styles.imageStyle} />
                ) : (
                    <View style={[styles.imageStyle, { alignItems: 'center', justifyContent: 'center' }]} >
                        <Image style={{ width: 44.31, height: 44.31 }} source={require('../../assets/photo_icon.png')} />
                    </View>
                )}

                <View style={styles.descriptionContainer}>
                    <Text style={styles.titleStyle}>{item.title}</Text>
                    <Text style={styles.descriptionStyle}>{item.description}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountStyle}>{item.discountRate}%</Text>
                        <Text style={styles.priceStyle}>{item.price}<Text style={{ color: '#1D232B', fontWeight: '500', fontSize: 14 }}>원</Text></Text>
                    </View>
                </View>

                {/* Comments View */}
                <View style={styles.commentsContainer}>
                    {
                        comments.map((item) => {
                            return (
                                <>
                                    <CommentCard style={{ marginBottom: 20 }} item={item} />
                                    {
                                        item.replies.map((reply) => {
                                            return <CommentCard style={{ marginLeft: 40 }} item={reply} />
                                        })
                                    }
                                </>
                            )
                        })
                    }
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            {Platform.OS === 'android' && (
                <KeyboardAvoidingView
                    style={styles.keyboardStyle}
                    behavior={'height'}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/photo_icon.png')} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={'댓글을 남겨주세요.'}
                            placeholderTextColor={'#AFB9CA'}
                            style={styles.msgInput}
                            returnKeyType={'send'}
                            onSubmitEditing={addComment}
                            value={text}
                            onChangeText={setText}
                        />
                        <TouchableOpacity onPress={addComment}>
                            <Text>등록</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}


            {Platform.OS === 'ios' && (
                <KeyboardAvoidingView
                    style={styles.keyboardStyle}
                    behavior={'padding'}
                    keyboardVerticalOffset={offset}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: text_box_vertical_padding }}>
                        <TouchableOpacity>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/photo_icon.png')} />
                        </TouchableOpacity>
                        <TextInput
                            onFocus={() => {
                                setOffset(headerHeight);
                            }}
                            onBlur={() => {
                                setOffset(0);
                            }}
                            placeholder={'댓글을 남겨주세요.'}
                            placeholderTextColor={'#AFB9CA'}
                            style={styles.msgInput}
                            returnKeyType={'send'}
                            onSubmitEditing={addComment}
                            value={text}
                            onChangeText={setText}
                        />
                        <TouchableOpacity onPress={addComment}>
                            <Text>등록</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    descriptionContainer: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#F7F8FA',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    descriptionStyle: {
        paddingTop: 10,
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
    },
    priceContainer: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between'
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
    },
    commentsContainer: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
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
    },
    msgInput: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 12,
        fontWeight: '400',
        color: '#AFB9CA'
    },
    keyboardStyle: {
        borderTopWidth: 1,
        backgroundColor: '#F7F8FA',
        borderColor: '#F7F8FA',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        marginTop: 'auto'
    },

    imageStyle: {
        width: '100%',
        height: undefined,
        backgroundColor: '#EDEEF3',
        aspectRatio: 0.85
    },
});

export default ViewBook;