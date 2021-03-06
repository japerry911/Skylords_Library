import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';
import { Context as FavoriteContext } from '../contexts/favoriteContext';
import { Context as UserContext } from '../contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';
import FavoriteListItem from '../components/FavoriteListItem';
import Spinner from '../components/Spinner';

const FavoritesScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentFavorites, setCurrentFavorites] = useState([]);

    const favoriteContext = useContext(FavoriteContext);
    const userContext = useContext(UserContext);

    const { state: favoriteState, getFavorites, deleteFavorite } = favoriteContext;
    const { state: userState } = userContext;

    useFocusEffect(useCallback(() => {
        getFavorites(userState.user.token);
        
        return () => setIsLoading(true);
    }, []));

    useEffect(() => {
        setCurrentFavorites(favoriteState.favorites.filter(favorite => favorite.user.id === userState.user.id));
        setIsLoading(false);
    }, [favoriteState.favorites]);

    return (
        <>
            {isLoading ? <Spinner /> 
            :
            <View style={styles.mainViewStyle}>
                <View style={styles.headerViewStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <MaterialIcons 
                            name='chevron-left'
                            size={40}
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerTextViewStyle}>
                        <Text style={styles.headerTitleStyle}>
                            Your Books
                        </Text>
                        <Text style={styles.subtitleTitleStyle}>
                            Check our your saved books.
                        </Text>
                    </View>
                </View>
                <View style={styles.bodyViewStyle}>
                    <FlatList 
                        data={currentFavorites}
                        keyExtractor={favorite => favorite.id}
                        renderItem={({ item }) => <FavoriteListItem
                                                    title={item.book.title}
                                                    author={item.book.author.name}
                                                    imageUrl={item.book.image_url}
                                                    handleDeleteFavorite={deleteFavorite}
                                                    token={userState.user.token}
                                                    id={item.id}
                                                />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
    },
    subtitleTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 14,
        fontFamily: 'Avenir_medium'
    },
    backIconStyle: {
        color: Colors.primaryOrange
    },
    headerViewStyle: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
    },
    headerTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 24,
        fontFamily: 'Avenir_bold'
    },
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1, 
        marginBottom: '2%',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        borderRadius: 10
    }
});

export default FavoritesScreen;