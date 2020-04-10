import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Spinner = () => {
    return (
        <View style={styles.spinnerViewStyle}>
            <ActivityIndicator 
                size={'large'} 
                color={Colors.primaryOrange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Spinner;