import React from 'react'
import { Button, View, Text } from 'react-native'

export default class HomeScreen extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title='Go to Article Details'
                    onPress={() => this.props.navigation.navigate('ArticleDetails')}
                />
                <Button
                    title='Create a new article'
                    onPress={() => this.props.navigation.navigate('NewArticle')}
                />
                <Button
                    title='Login to existing account'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title='Signup and create a new account'
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
                <Button
                    title='Edit your profile settings'
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}
