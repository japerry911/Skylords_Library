import React, { useState } from 'react';
import { Container, Text, Form, Input, Label, Item, CheckBox, Textarea, Button, Footer } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import FooterIconButton from '../components/FooterIconButton';

const AddReviewScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [addBookCheck, setAddBookCheck] = useState(false);
    const [rating, setRating] = useState(0);

    return (
        <Container style={styles.mainContainerStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>
                    Leave a Review
                </Text>
            </View>
            <View style={styles.bodyViewStyle}>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter Book Title</Label>
                        <Input 
                            value={title}
                            onChangeText={newTitle => setTitle(newTitle)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </Item>
                    <View style={styles.checkBoxViewStyle}>
                        <CheckBox 
                            checked={addBookCheck} 
                            onPress={() => setAddBookCheck(!addBookCheck)}
                            color={Colors.primaryOrange}
                        />
                        <Text style={styles.checkBoxTextStyle}>
                            Add Book
                        </Text>
                    </View>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter Book Author</Label>
                        <Input 
                            value={title}
                            onChangeText={newTitle => setTitle(newTitle)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </Item>
                    <View style={styles.ratingViewStyle}>
                        <Text style={styles.formElementTitleStyle}>
                            My Rating: {rating}
                        </Text>
                        <Rating 
                            type='star'
                            startingValue={rating}
                            imageSize={25}
                            tintColor={Colors.accentLightGray}
                            selectedColor={Colors.primaryOrange}
                            type='custom'
                            ratingColor={Colors.primaryOrange}
                            onFinishRating={newRating => setRating(newRating)}
                            fractions={2}
                        />
                    </View>
                    <View style={styles.descriptionViewStyle}>
                        <Text style={styles.formElementTitleStyle}>
                            What did you think?
                        </Text>
                        <Textarea 
                            style={styles.textAreaStyle} 
                            rowSpan={5}
                            bordered
                            placeholder='Enter your review (optional)'
                            placeholderTextColor={Colors.accentLightGrayText}
                        />
                    </View>
                    <Button style={styles.postButtonStyle}>
                        <Text style={styles.buttonText}>
                            Post
                        </Text>
                    </Button>
            </View>
            <Footer style={styles.footerStyle}>
                <FooterIconButton
                    iconComponent={<MaterialCommunityIcons
                                        name='home-outline'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => navigation.navigate('Home')}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='star-o'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='bookmark-o'
                                        size={32}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='user-o'
                                        size={32}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    footerIconStyle: {
        marginTop: 5,
        color: Colors.primaryOrange
    },
    footerStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accentLightGray
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: 5
    },
    postButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '50%',
    },
    formElementTitleStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_bold',
        fontSize: 14,
        paddingBottom: '1%'
    },
    ratingViewStyle: {
        marginTop: '10%',
        alignItems: 'center'
    },
    descriptionViewStyle: {
        marginTop: '7%',
        alignItems: 'center'
    },
    checkBoxViewStyle: {
        marginTop: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    checkBoxTextStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 13,
        marginLeft: '6%'

    },
    formItemStyle: {
        width: '95%'
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        height: '80%',
        marginHorizontal: '4%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        alignItems: 'center'
    },
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray,
    },
    headerViewStyle: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    headerTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 24,
        fontFamily: 'Avenir_bold'
    }
});

export default AddReviewScreen;