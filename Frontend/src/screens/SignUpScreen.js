import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Label, Input, Button, Text } from 'native-base';

const onFormSubmit = (username, age, password) => {
    
};

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <Container style={styles.screenStyle}>
            <Header />
            <Content>
                <Form style={styles.formStyle}>
                    <Item floatingLabel>
                        <Label>Enter a Username</Label>
                        <Input 
                            value={username}
                            onChangeText={newUsername => setUsername(newUsername)}
                        /> 
                    </Item>
                    <Item floatingLabel>
                        <Label>Enter your age</Label>
                        <Input 
                            keyboardType='numeric' 
                            value={age}
                            onChangeText={newAge => setAge(newAge)}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Enter a password</Label>
                        <Input 
                            secureTextEntry={true}
                            value={password}
                            onChangeText={newPassword => setPassword(newPassword)}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Confirm your password</Label>
                        <Input
                            secureTextEntry={true}
                            value={confirmedPassword}
                            onChangeText={newConfirmedPassword => setConfirmedPassword(newConfirmedPassword)}
                        />
                    </Item>
                    <Button 
                        style={styles.buttonStyle}
                        onPress={() => navigation.navigate('Welcome')}
                    >
                        <Text>GO BACK</Text>
                    </Button>
                    <Button style={styles.buttonStyle}>
                        <Text>SIGN UP {username}!</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        margin: 10
    },
    screenStyle: {
        flex: 1
    },
    formStyle: {
        
    }
});

export default SignUpScreen;