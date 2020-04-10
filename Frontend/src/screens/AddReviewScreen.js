import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Container, Text, Input, Label, Item, CheckBox, Textarea, Button, Footer, Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import FooterIconButton from '../components/FooterIconButton';
import axios from 'axios';
import railsServer from '../api/railsServer';
import { Context as UserContext } from '../contexts/userContext';
import { DrawerActions } from '@react-navigation/native';
import { Context as ReviewContext } from '../contexts/reviewContext';

const AddReviewScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params === undefined ? '' : route.params.params.title);
    const [author, setAuthor] = useState(route.params === undefined ? '' : route.params.params.author);
    const [addBookCheck, setAddBookCheck] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState(null);
    const [existingTitle, setExistingTitle] = useState(route.params === undefined ? false : route.params.params.existingBool );
    const [existingBooksList, setExistingBooksList] = useState([]);

    const firstUpdate = useRef(true);

    const userContext = useContext(UserContext);
    const reviewContext = useContext(ReviewContext);
    const { state: userState } = userContext;
    const { addReview } = reviewContext;

    const onFormSubmit = async () => {
        let bookId;

        if (addBookCheck) {
            // Create the new Author if doesn't exist and then create the new Book
    
            // Pull all authors
            const authorsResponse = await railsServer.get('/authors');
            const authorsList = authorsResponse.data.authors.map(authorObject => {
                return(
                    { name: authorObject.name, id: authorObject.id }
                );
            });
    
            // Check if Author currently exists in database, if not, create a new entry
            let authorId;
            const authorExists = authorsList.find(authorObject => authorObject.name === author) !== undefined; 
            
            if (!authorExists) {
                // Author Creation: 
                const authorResponse = await railsServer.post('/authors', { author: { name: author }});
                authorId = authorResponse.data.id;
            } else {
                authorId = authorsList.find(authorObject => authorObject.name === author).id; 
            }
    
            // Create the Book
            const bookResponse = await railsServer.post('/books', 
            { book: { title, author_id: authorId, description: null, image_url: imageUrl }});
            bookId = bookResponse.data.book.id;
        } else {
            // Look Up Book Id by comparing to array of all books & ids
            const bookResponse = await railsServer.get('/books');
            const booksList = bookResponse.data.books.map(bookObject => {
                return (
                    { id: bookObject.id, title: bookObject.title }
                );
            })
    
            bookId = booksList.find(bookObject => bookObject.title === title).id;
        }
    
        const userId = userState.user.id;

        //Posting of the Review with userId (from UserContext) and previously obtained bookId 
        addReview(bookId, userId, rating, description);

        navigation.dispatch(DrawerActions.jumpTo('Home'));
    };

    // Pull all existing books into state array on first/only first render
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source()

        try {
            railsServer.get('/books', { cancelToken: source.token })
                .then(response => response.data.books)
                .then(books => setExistingBooksList(books.map(book => {
                    return (
                        { title: book.title, author: book.author.name }
                    );
                })));
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Canceled');
            } else {
                throw error;
            }
        }

        
    }, []);

    // Check if the book is in the title list, if it is change existingTitle to true
    useEffect(() => {
        if (!firstUpdate.current) {
            if (addBookCheck) {
                setExistingTitle(true);
            } else {
                setExistingTitle(existingBooksList.find(book => book.title === title) === undefined ? false : true);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [title, addBookCheck]);

    // Once the Existing Title is true, look up an author to autofill author box (only if the title exists)
    useEffect(() => {
        if (!existingTitle) return;

        const bookDetails = existingBooksList.find(book => book.title === title);
        if (bookDetails) {
            setAuthor(bookDetails.author);
        }
    }, [existingTitle]);

    return (
        <Container style={styles.mainContainerStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
                        success={existingTitle}
                        error={!existingTitle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter Book Title</Label>
                        <Input 
                            value={title}
                            onChangeText={newTitle => setTitle(newTitle)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Icon name={existingTitle ? 'checkmark-circle' : 'close-circle'} />
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
                        <Item
                            floatingLabel
                            style={styles.formImageItemStyle}
                        >
                        <Label style={styles.formImageLabelStyle}>Enter Book Image URL</Label>
                        <Input
                            autoCapitalize='none'
                            autoCorrect={false}
                            disabled={!addBookCheck}
                            value={imageUrl}
                            onChangeText={newImageUrl => setImageUrl(newImageUrl)}
                        />          
                        </Item>                  
                    </View>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter Book Author</Label>
                        <Input 
                            value={author}
                            onChangeText={newAuthor => setAuthor(newAuthor)}
                            autoCapitalize='none'
                            autoCorrect={false}
                            disabled={!addBookCheck}
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
                            value={description}
                            onChangeText={newDescription => setDescription(newDescription)}
                        />
                    </View>
                    <Button 
                        style={styles.postButtonStyle}
                        onPress={() => onFormSubmit()}
                    >
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
                    iconComponent={<AntDesign
                                        name='book'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => navigation.navigate('Books')}
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
    textAreaStyle: {
        minWidth: '95%'
    },
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
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '50%'
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
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        height: '10%'
    },
    checkBoxTextStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 13,
        marginLeft: '6%'
    },
    formItemStyle: {
        width: '95%'
    },
    formImageItemStyle: {
        width: '50%',
        marginLeft: '15%',
        alignSelf: 'flex-end'
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    formImageLabelStyle: {
        fontSize: 13,
        color: Colors.accentLightGrayText
    }, 
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        height: '80%',
        marginHorizontal: '4%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: '2%'
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