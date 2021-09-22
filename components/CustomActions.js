import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import firebase from 'firebase';

export default class CustomActions extends React.Component {

    onPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        return this.pickImage();
                    case 1:
                        return this.takePhoto();
                    case 2:
                        return this.getLocation();
                    default:
                }
            },
        );
    };

    pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images' }).catch(error => console.log(error));
            if (!result.cancelled) {
                const imageUrl = await this.uploadImageFetch(result.uri);
                this.props.onSend({ image: imageUrl });
            }
        }
    }

    takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({ mediaTypes: 'Images' }).catch(error => console.log(error));
            if (!result.cancelled) {
                const imageUrl = await this.uploadImageFetch(result.uri);
                this.props.onSend({ image: imageUrl });
            }
        }
    }

    getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const result = await Location.getCurrentPositionAsync({ enableHighAccuracy: true }).catch((error) => console.log(error));
            if (result) {
                this.props.onSend({ location: { longitude: JSON.stringify(result.coords.longitude), latitude: JSON.stringify(result.coords.latitude) } });
            }
        }
    }

    uploadImageFetch = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = (error) => reject (new TypeError("Network Request Failed"));
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const ref = firebase.storage().ref().child('images/' + imageName);
        const snapshot = await ref.put(blob);

        blob.close();
        return await snapshot.ref.getDownloadURL();
    };

    render() {
        return (
            <TouchableOpacity style={[styles.container]} onPress={this.onPress} accessible={true} accessibilityLabel="Chat Options" accessibilityHint="Lets you take photos, send photos or share your location">
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.text, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 10,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    text: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};
