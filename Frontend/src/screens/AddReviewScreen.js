import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Input, Label, Item, CheckBox, Textarea, Button, Icon } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { Context as UserContext } from '../contexts/userContext';
import { Context as ReviewContext } from '../contexts/reviewContext';
import { Context as AuthorContext } from '../contexts/authorContext';
import { Context as BookContext } from '../contexts/bookContext';
import AuthedFooter from '../components/AuthedFooter';
import Spinner from '../components/Spinner';

const AddReviewScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [addBookCheck, setAddBookCheck] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState(null);
    const [existingTitle, setExistingTitle] = useState(false);
    const [validUpload, setValidUpload] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const firstUpdate = useRef(true);

    const userContext = useContext(UserContext);
    const reviewContext = useContext(ReviewContext);
    const authorContext = useContext(AuthorContext);
    const bookContext = useContext(BookContext);

    const { state: userState } = userContext;
    const { addReview } = reviewContext;
    const { state: authorState, getAuthors, addAuthor } = authorContext;
    const { state: bookState, getBooks, addBook } = bookContext;

    const onFormSubmit = async () => {
        let bookId;

        if (addBookCheck) {
            // Create the new Author if doesn't exist and then create the new Book
    
            // Pull all authors
            await getAuthors(userState.user.token);
            const authorsList = authorState.authors.map(authorObject => {
                return(
                    { name: authorObject.name, id: authorObject.id }
                );
            });
    
            // Check if Author currently exists in database, if not, create a new entry
            let authorId;
            const authorExists = authorsList.find(authorObject => authorObject.name === author) !== undefined; 
            
            if (!authorExists) {
                // Author Creation: 
                authorId = await addAuthor(userState.user.token, author);
            } else {
                authorId = authorsList.find(authorObject => authorObject.name === author).id; 
            }

            // Create the Book
            bookId = await addBook(userState.user.token, title, authorId, null, imageUrl);
        } else {
            // Look Up Book Id by comparing to array of all books & ids
            const booksList = bookState.books.map(bookObject => {
                return (
                    { id: bookObject.id, title: bookObject.title }
                );
            })
    
            bookId = booksList.find(bookObject => bookObject.title === title).id;
        }
    
        const userId = userState.user.id;

        //Posting of the Review with userId (from UserContext) and previously obtained bookId 
        addReview(userState.user.token, bookId, userId, rating, description);

        navigation.dispatch(DrawerActions.jumpTo('Home'));
    };

    // Resets the screen on blur & sets screen/gets all books on focus
    useFocusEffect(useCallback(() => {
        getBooks(userState.user.token);
        setTitle(route.params === undefined ? '' : route.params.params.title);
        setExistingTitle(route.params === undefined ? false : route.params.params.existingBool);
        setIsLoading(false);
        console.log('here');
        return () => {
            route.params = undefined;
            setIsLoading(true);
            setTitle('');
            setAuthor('');
            setRating(0);
            setDescription(null);
            setImageUrl('');
            setAddBookCheck(false);
        };
    }, [route.params]));

    // Check if the book is in the title list, if it is change existingTitle to true
    useEffect(() => {
        if (!firstUpdate.current) {
            if (addBookCheck) {
                setExistingTitle(true);
            } else {
                setExistingTitle(bookState.books.find(book => book.title === title) === undefined ? false : true);
            }
        } else {
            firstUpdate.current = false;
        }
    }, [title, addBookCheck]);

    // Once the Existing Title is true, look up an author to autofill author box (only if the title exists)
    useEffect(() => {
        if (!existingTitle) return;

        const bookDetails = bookState.books.find(book => book.title === title);
        if (bookDetails) {
            setAuthor(bookDetails.author.name);
        }
    }, [existingTitle]);

    // Check for Valid submission
    useEffect(() => {
        if (existingTitle && !addBookCheck && rating > 0) {
            setValidUpload(true);
        } else if (existingTitle && addBookCheck && author !== '' && imageUrl !== '' && rating > 0) {
            setValidUpload(true);
        } else {
            setValidUpload(false);
        }
    }, [existingTitle, addBookCheck, rating, author, imageUrl]);
    
    return (
        <>
            {isLoading ? <Spinner /> :
            <View style={styles.mainViewStyle}>
                <View style={styles.headerViewStyle}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home');
                    }}>
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
                            id='test'
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
                            minValue={1}
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
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <Button 
                        style={styles.postButtonStyle}
                        onPress={() => onFormSubmit()}
                        disabled={!validUpload}
                    >
                        <Text style={styles.buttonText}>
                            Post
                        </Text>
                        <Icon name={validUpload ? 'checkmark-circle' : 'close-circle'} />
                    </Button>
                </View>
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
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
        paddingTop: 5,
        color: Colors.accentLightWhite
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
        flex: 1,
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
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
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