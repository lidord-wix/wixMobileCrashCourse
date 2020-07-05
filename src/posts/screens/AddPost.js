/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import * as postActions from '../posts.actions';

class AddPost extends Component {

    static propTypes = {
        componentId: PropTypes.string
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            title: '',
            text: ''
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSavePressed = this.onSavePressed.bind(this);
    }

    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Add Post',
                },
                rightButtons: [{
                    id: 'saveBtn',
                    text: 'Save',
                    enabled: false
                }],
                leftButtons: [{
                    id: 'cancelBtn',
                    icon: require('../../icons/x.png')
                }]
            }
        };
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'cancelBtn') {
            Navigation.dismissModal(this.props.componentId);
        } else if (buttonId === 'saveBtn'){
            this.onSavePressed();
        }
    }

    onChangeTitle(title) {
        this.setState({title});
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    id: 'saveBtn',
                    text: 'Save',
                    enabled: !!title
                }]
            }
        });
    };
    
    onChangeText(text) {
        this.setState({text})
    };

    onSavePressed = () => {
        Navigation.dismissModal(this.props.componentId);
        const randomImageNumber = Math.floor((Math.random() * 500) + 1);
        postActions.addPost({
            title: this.state.title,
            text: this.state.text,
            img: `https://picsum.photos/200/200/?image=${randomImageNumber}`
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>AddPost Screen</Text>
                <TextInput placeholder="Add a Catchy Title" value={this.state.title} onChangeText={this.onChangeTitle}/>
                <TextInput placeholder="This is a beginning of a great post" value={this.state.text} onChangeText={this.onChangeText}/>
            </View>
        );
    }
}

export default AddPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F7EF',
    },
    text: {
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
    }
});
