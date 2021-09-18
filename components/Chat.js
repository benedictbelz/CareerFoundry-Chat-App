import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firebase from 'firebase';
require('firebase/firestore');

export default class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			uid: 0,
			user: {
				_id: '',
				name: ''
			}
		};

		const firebaseConfig = {
			apiKey: 'AIzaSyDMAytTWCgYVtCa0wSDP_iNtPMXnIWMas4',
			authDomain: 'chat-app-40a4c.firebaseapp.com',
			projectId: 'chat-app-40a4c',
			storageBucket: 'chat-app-40a4c.appspot.com',
			messagingSenderId: '911661793973',
			appId: '1:911661793973:web:e3b0e362ecaeb2fbf0b4fc',
			measurementId: 'G-N0Q50QLVYS'
		};

		if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
		this.referenceChatMessages = firebase.firestore().collection('messages');
		this.referenceMessageUser = null;
	}

	componentDidMount() {
		// SET OPTIONS
		const { name } = this.props.route.params;
		this.props.navigation.setOptions({ title: name });
		// AUTHENTICATION
		this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (!user) firebase.auth().signInAnonymously();
			
			this.setState({
				uid: user.uid,
				messages: [],
				user: {
					_id: user.uid,
					name: name,
			  	}
			});

			this.referenceMessagesUser = firebase
				.firestore()
				.collection('messages')
				.where('uid', '==', this.state.uid);
			this.unsubscribe = this.referenceChatMessages
				.orderBy('createdAt', 'desc')
				.onSnapshot(this.onCollectionUpdate);
		});
	}

	componentWillUnmount() {
		this.authUnsubscribe();
	}

	addMessages() {
		const message = this.state.messages[0];
		this.referenceChatMessages.add({
			uid: this.state.uid,
			_id: message._id,
			createdAt: message.createdAt,
			text: message.text,
			user: message.user,
		});
	}

	onCollectionUpdate = querySnapshot => {
		const messages = [];
		querySnapshot.forEach(document => {
		  	let data = document.data();
		  	messages.push({
				_id: data._id,
				createdAt: data.createdAt.toDate(),
				text: data.text,
				user: {
			  		_id: data.user._id,
			  		name: data.user.name,
				},
		  	});
		});
		this.setState({ messages });
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}), () => this.addMessages());
	}
	
	renderBubble(props) {
		return <Bubble {...props} wrapperStyle={{ 
			//left: { backgroundColor: '#2F2F2F' },
			right: { backgroundColor: '#000000' }
		}} />;
	}

	render() {
		const { color } = this.props.route.params;

		return (
			<View style={[styles.container, {backgroundColor: color}]}>
				<GiftedChat
					isTyping={true}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					renderBubble={this.renderBubble.bind(this)}
					user={this.state.user}
				/>
				{Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	}
});
