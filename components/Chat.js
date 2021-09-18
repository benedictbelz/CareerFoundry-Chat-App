import React from 'react';
import {StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
		};
	}

	componentDidMount() {
		// SET OPTIONS
		let { name } = this.props.route.params;
		this.props.navigation.setOptions({ title: name });

		this.setState({ messages: [{
				_id: 1,
				text: 'Hello ' + name,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				}
			},
			{
				_id: 2,
				text: 'Welcome to Chat App',
				createdAt: new Date(),
				system: true,
			}
		]});
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}))
	}

	renderBubble(props) {
		return <Bubble {...props} wrapperStyle={{ 
			right: { backgroundColor: '#000' }
		}} />;
	}

	render() {
		let { color } = this.props.route.params;

		return (
			<View style={[styles.container, {backgroundColor: color}]}>
				<GiftedChat
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{ _id: 1 }}
				/>
				{Platform.OS === 'android'
					? <KeyboardAvoidingView behavior='height' />
					: null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'center',
	},
});
