import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';

class AddPost extends Component {

    static propTypes = {
        componentId: PropTypes.string
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

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

    onChangeText = text => {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    id: 'saveBtn',
                    text: 'Save',
                    enabled: !!text
                }]
            }
        });
    }

    onSavePressed() {
        Navigation.dismissModal(this.props.componentId);

        setTimeout(() => {
            alert('post was saved');
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>AddPost Screen</Text>
                <TextInput placeholder="start writing to enable the save btn" onChangeText={this.onChangeText}/>
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
