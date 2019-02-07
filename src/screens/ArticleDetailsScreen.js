import React from 'react'
import { Button, View, Text } from 'react-native'

export default class ArticleDetailsScreen extends React.PureComponent {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title='Go to Details... again'
                    onPress={() => this.props.navigation.push('ArticleDetails')}
                />
                <Button
                    title='Go to Home'
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title='Go back'
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}
