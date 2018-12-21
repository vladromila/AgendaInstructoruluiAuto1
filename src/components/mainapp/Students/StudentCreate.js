import React, { Component } from 'react'
import { Text, View, TextInput, Image, Dimensions, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo'
import ActionSheet from 'react-native-actionsheet'
import { Header } from 'react-navigation'
const dimensions = Dimensions.get('window');


export default class StudentCreate extends Component {
    static navigationOptions = {
        title: "Adauga un elev",
        headerStyle: {
            backgroundColor: '#1E6EC7'
        }
    }
    state = {
        image: null,
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }
    _takeImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }
    render() {
        let { image } = this.state;
        return (
            <ScrollView>
                <Text style={{ fontSize: 19, alignSelf: 'center' }}>Poza de profil/Copie buletin</Text>
                <View style={{ justifyContent: 'center', alignContent: 'center', borderColor: '#1E6EC7', borderWidth: 1, alignSelf: 'center', marginTop: '2%' }}>

                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={{ padding: '4%', marginTop: 2 }} onPress={() => {
                        this.ActionSheet.show();
                    }}>
                        <Image source={this.state.image ? { uri: image } : require('../../../../assets/user.png')} style={{ height: dimensions.width * 3 / 5, width: dimensions.width * 3 / 5, alignSelf: 'center' }} />
                    </TouchableHighlight>
                </View>
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
                <Text style={{ alignSelf: "flex-start", fontSize: 21, fontWeight: 'bold', marginLeft: 3 }}>Nume</Text>
                <TextInput style={{ padding: 10, fontSize: 19, width: '100%', borderColor: '#1E6EC7', borderWidth: 1, margin: 5 }} />
            </ScrollView>
        )
    }
}
