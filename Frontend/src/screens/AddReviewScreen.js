import React, { useState } from 'react';
import { Container, Text, Form, Input, Label, Item } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const AddReviewScreen = () => {
    const [title, setTitle] = useState('');

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
                <Form>
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
                </Form>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    formItemStyle: {
        width: '80%'
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        height: '80%',
        marginHorizontal: '7%',
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