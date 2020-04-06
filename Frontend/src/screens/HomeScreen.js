import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Body, Footer, Text } from 'native-base';
import Colors from '../constants/colors';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const user = navigation.getParam('user');

    return (
        <Container style={styles.mainContainerStyle}>
            <Body style={styles.bodyStyle}>
                <Text style={styles.greetingMessageStyle}>
                    Hello, {user.username}!
                </Text>
                <Text style={styles.subtitleGreetingStyle}>
                    Let's find your new favorite book.
                </Text>
                <View style={styles.bodyIconViewStyle}>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <SimpleLineIcons
                                name='book-open'
                                style={styles.iconStyle}
                                size={25}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <FontAwesome
                                name='pencil-square-o'
                                style={styles.iconStyle}
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <MaterialCommunityIcons
                                name='fire'
                                style={styles.iconStyle}
                                size={27}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <MaterialIcons 
                                name='message'
                                style={styles.iconStyle}
                                size={28}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Body>
            <Footer style={styles.footerStyle}>

            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    iconViewStyle: {
        backgroundColor: Colors.accentLightGray,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: Colors.accentLightGrayText,
        borderWidth: 1,
    },
    iconStyle: {
        color: Colors.primaryOrange,
    },
    bodyIconViewStyle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%' ,
        justifyContent: 'space-evenly'
    },
    greetingMessageStyle: {
        marginTop: '10%',
        fontSize: 20,
        fontFamily: 'Avenir_bold',
    },
    subtitleGreetingStyle: {
        fontFamily: 'Avenir_next',
        color: Colors.accentLightGrayText,
        fontSize : 16,
        marginTop: '3%'
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
    },
    bodyStyle: {
        backgroundColor: Colors.accentLightWhite,
        width: '90%',
        height: '100%',
        borderRadius: 10,
        marginTop: '5%',
    },
    footerStyle: {
        backgroundColor: Colors.accentLightGray
    }
});

export default HomeScreen;