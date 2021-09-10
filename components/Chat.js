import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { name, color } = this.props.route.params;
		this.props.navigation.setOptions({ title: name });

		return (
			<View style={[styles.container, { backgroundColor: color }]}>
				<Text style={styles.text}>Hello {name}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'center'
	}
});
