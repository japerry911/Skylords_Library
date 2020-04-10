import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Button } from 'native-base';
import Colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LearnMoreScreen = ({ navigation }) => {
    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.imageViewStyle}>
                <Image
                    style={styles.imageStyle}
                    source={require('../../assets/DogBookPets.jpg')}
                />
                <Text style={styles.imageOverlayTextStyle}>
                    Discover and Share books you love
                    <MaterialCommunityIcons
                        name='paw'
                        size={20}
                        color={Colors.primaryOrange}
                    />
                </Text>
            </View>
            <View style={styles.subViewStyle}>
                <View style={styles.contentViewStyle}>
                    <Text style={styles.headerTextStyle}>
                        Who We Are
                    </Text>
                    <Text style={styles.contentTextStyle}>
                        At Skylord's Library, we believe a good book goes a long way. Our mission is to help you 
                        find and share book you love.
                    </Text>
                    <Text style={styles.headerTextStyle}>
                        Our History
                    </Text>
                    <Text style={styles.contentTextStyle}>
                        In April 2020, Jack Perry - an avid bookworm and dog lover - decided to rethink how we discover
                        good books. He was scouring online review for a new book with his dog Skylord, when it hit him:
                        friends should connect eachother with good reads.
                    </Text>
                    <Text style={styles.headerTextStyle}>
                        What You Can Do
                    </Text>
                    <Text style={styles.contentTextStyle}>
                        <Text style={styles.bulletStyle}>{'\u2022' + ' '}</Text>See what your friends are reading{'\n'}
                        <Text style={styles.bulletStyle}>{'\u2022' + ' '}</Text>Save books you would like to read{'\n'}
                        <Text style={styles.bulletStyle}>{'\u2022' + ' '}</Text>Help your friends find new books
                    </Text>
                </View>
                <Button
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Sign Up')}
                >
                    <Text style={styles.buttonText}>
                        Sign Up
                    </Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageViewStyle: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageOverlayTextStyle: {
        color: Colors.accentLightWhite,
        fontFamily: 'Avenir_bold',
        position: 'absolute',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: '10%'
        
    },
    bulletStyle: {
        color: Colors.primaryOrange
    },
    buttonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: '2%',
        width: '50%',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir_bold',
        fontSize: 20,
        marginTop: '3%',
        color: Colors.accentLightWhite
    },
    contentTextStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 14,
        fontFamily: 'Avenir_medium'
    },
    headerTextStyle: {
        fontSize: 22,
        fontFamily: 'Avenir_bold',
        marginTop: 10,
        color: Colors.accentLightGrayText
    },
    contentViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        width: '85%',
        marginTop: '5%',
        padding: 10,
        borderRadius: 10
    },
    subViewStyle: {
        backgroundColor: Colors.accentLightGray,
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    mainViewStyle: {
        backgroundColor: 'black',
        alignItems: 'center',
        flex: 1
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        opacity: .5,
        position: 'absolute'
    }
});

export default LearnMoreScreen;