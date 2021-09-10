import React from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Start extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			color: ''
		}
	}

	render() {
		return (
			<ImageBackground
				style={styles.background}
				resizeMode="cover"
				source={require("../assets/background.png")}
			>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							Chat App
						</Text>
					</View>
					<View style={styles.optionContainer}>
						<TextInput 
							style={styles.input}
							onChangeText={name => this.setState({ name })}
							value={this.state.name}
							placeholder='Your Name'
						/>
						<View style={styles.colorContainer}>
							<Text style={styles.colorText}>
								Choose Background Color:
							</Text>
							<View style={styles.colorPicker}>
								<TouchableOpacity
									activeOpacity={0.5}
									style={[styles.color, styles.colorBlack]}
									onPress={() => this.setState({ color: '#090C08' })}
								/>
								<TouchableOpacity 
									activeOpacity={0.5}
									style={[styles.color, styles.colorGrey]}
									onPress={() => this.setState({ color: '#474056' })}
								/>
								<TouchableOpacity
									activeOpacity={0.5}
									style={[styles.color, styles.colorBlue]}
									onPress={() => this.setState({ color: '#8A95A5' })}
								/>
								<TouchableOpacity
									activeOpacity={0.5}
									style={[styles.color, styles.colorGreen]}
									onPress={() => this.setState({ color: '#B9C6AE' })}
								/>
							</View>
						</View>
						<TouchableOpacity 
							style={styles.button}
							onPress={() => {
								this.props.navigation.navigate('Chat', {
									name: this.state.name,
									color: this.state.color
								})
							}}
						>
							<Text style={styles.buttonText}>
								Start Chatting
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 20
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: '#FFFFFF',
		fontSize: 45,
		fontWeight: '600',
		letterSpacing: 5,
		textAlign: 'center'
	},
	optionContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
	},
	input: {
		color: '#755083',
		fontSize: 16,
		fontWeight: '300',
		padding: 20,
		borderColor: '#000000',
		borderWidth: 1,
		borderRadius: 10,
		margin: 20,
		marginBottom: 40
	},
	colorContainer: {
		marginLeft: 20,
		marginRight: 20
	},
	colorText: {
		fontSize: 20,
	},
	colorPicker: {
		flexDirection: 'row',
		paddingTop: 20,
	},
	color: {
		width: 60,
		height: 60,
		borderRadius: 60,
		marginRight: 10
	},
	colorBlack: {
		backgroundColor: '#090C08'
	},
	colorGrey: {
		backgroundColor: '#474056'
	},
	colorBlue: {
		backgroundColor: '#8A95A5'
	},
	colorGreen: {
		backgroundColor: '#B9C6AE'
	},
	button: {
		backgroundColor: '#757083',
		padding: 20,
		margin: 20,
		marginTop: 40,
		borderRadius: 10
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center'
	}
});

