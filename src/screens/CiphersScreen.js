import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import CipherButton from '../components/CipherButton';

const CiphersScreen = ({ navigation }) => {
    const screenList = [{key: '1'}, {}]

    return (
        <View>
            <Text>Hello there!</Text>
            <Text>CiphersScreen</Text>
            <View style={styles.buttonContainer}>
                {/* <CipherButton title="K-Rail Fence Cipher"/> */}
                <Button title='K-Rail Fence Cipher' onPress={() => navigation.push("CipherTabScreen")}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'yellow',
        alignSelf: 'baseline'
    },
    button: {
        flex: 1,
        backgroundColor: "purple"
    },
    buttonTitle: {
        color: 'pink'
    }
});

export default CiphersScreen;