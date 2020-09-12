import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    KeyboardAvoidingView,
    Dimensions,
    Modal,
    TextInput,
    Keyboard
} from 'react-native';
import _ from 'lodash'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, Button } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet'
import { ImagePicker } from 'expo'
import { studentCreate } from '../../../actions/'
import { connect } from 'react-redux';
import { Header } from 'react-navigation'
import * as Permissions from 'expo-permissions';

class StudentCreate extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            blob: null,
            text: 'ahjsdf38uashd82',
            isNameModalVisible: false,
            isTelModalVisible: false,
            isCNPModalVisible: false,
            isRegistruModalVisible: false,
            isSerieModalVisible: false,
            nume: '',
            phone: '',
            registru: '',
            serie: '',
            cnp: '',
            keyboardSpace: 0,
            pressed: false,
            sds: 0,
            sdp: 0,
            generatedSds: [],
            generatedSdp: []
        }
        Keyboard.addListener('keyboardDidShow', (frames) => {
            if (!frames.endCoordinates) return;
            this.setState({ keyboardSpace: frames.endCoordinates.height });
        });
        Keyboard.addListener('keyboardDidHide', (frames) => {
            this.setState({ keyboardSpace: 0 });
        });
    }
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#1E6EC7'
        },
        title: "Adauga un elev",
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.createSuccess === true) {
            this.props.navigation.goBack();
        }
    }

    selectImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1]
        })
        if (!image.cancelled) {
            this.setState({ image: image.uri })
            this.uploadImage(image.uri);
        }
    }
    uploadImage = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        this.setState({ blob: blob })
    }
    takeImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let image = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            allowsEditing: true,
        });
        if (!image.cancelled) {
            this.setState({ image: image.uri })
            this.uploadImage(image.uri);
        }
    }
    onCreateStudentPress = async () => {
        this.setState({ pressed: true })
        if (this.state.pressed === false) {
            const { nume, phone, cnp, registru, serie, blob, generatedSds, generatedSdp } = this.state;
            this.props.studentCreate({ nume, phone, cnp, registru, serie, blob, generatedSds, generatedSdp })
        }
    }
    render() {
        console.log(this.state.generatedSdp)
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableHighlight style={{ padding: 0, margin: 0 }} onPress={() => {
                        this.ActionSheet.show();
                    }
                    }>
                        <View style={styles.box}>
                            <Image source={this.state.image ? { uri: this.state.image } : require('../../../../assets/user.png')} style={[styles.profileImage, this.state.image ? { opacity: 1 } : { opacity: 0.6 }]} />
                        </View>
                    </TouchableHighlight>
                    <List containerStyle={{ marginTop: 0 }}>
                        <ListItem
                            underlayColor='rgba(30, 110, 199,0.9)'
                            onPress={() => this.setState({ isNameModalVisible: true })}
                            title={
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                                    Nume: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 18 }}>{this.state.nume}</Text>
                                </Text>} containerStyle={{ backgroundColor: '#1E6EC7', }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='edit' size={30} color='white' />} />
                        <ListItem
                            underlayColor='rgba(30, 110, 199,0.9)'
                            onPress={() => this.setState({ isTelModalVisible: true })}
                            title={
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                                    Numar de Telefon: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 18 }}>{this.state.phone}</Text>
                                </Text>
                            } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='edit' size={30} color='white' />} />
                        <ListItem
                            underlayColor='rgba(30, 110, 199,0.9)'
                            onPress={() => this.setState({ isCNPModalVisible: true })}
                            title={
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                                    CNP: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 18 }}>{this.state.cnp}</Text>
                                </Text>
                            } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='edit' size={30} color='white' />} />
                        <ListItem
                            underlayColor='rgba(30, 110, 199,0.9)'
                            onPress={() => this.setState({ isRegistruModalVisible: true })}
                            title={
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                                    Numar Registru: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 18 }}>{this.state.registru}</Text>
                                </Text>
                            } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='edit' size={30} color='white' />} />
                        <ListItem
                            underlayColor='rgba(30, 110, 199,0.9)'
                            onPress={() => this.setState({ isSerieModalVisible: true })}
                            title={
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                                    Serie: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 18 }}>{this.state.serie}</Text>
                                </Text>
                            } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='edit' size={30} color='white' />} />
                        <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#1E6EC7', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center' }}>Genereaza sedinte de scolarizare:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableHighlight onPress={() => {
                                    if (this.state.sds > 0) {
                                        let generatedSds = this.state.generatedSds;
                                        generatedSds.pop();
                                        this.setState({ generatedSds: generatedSds });
                                        this.setState({ sds: this.state.sds - 1 })
                                    }
                                }}
                                    underlayColor={'rgba(0,0,0,0.3)'} style={{ height: 50, width: 50, borderRadius: 25, alignContent: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                                    <Text style={{ fontSize: 50, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', color: 'white' }}>-</Text>
                                </TouchableHighlight>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 30, fontWeight: 'bold' }}>{this.state.sds}</Text>
                                <TouchableHighlight onPress={() => {
                                    let date = new Date();
                                    if (this.state.sds < 15) {
                                        let generatedSds = this.state.generatedSds;
                                        generatedSds.push({ tip: "normala", day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), hour: Math.floor(((this.state.sds + 1) * 90) / 60), minutes: (this.state.sds + 1) * 90 - Math.floor(((this.state.sds + 1) * 90) / 60) * 60 })
                                        this.setState({ generatedSds })
                                        this.setState({ sds: this.state.sds + 1 })
                                    }
                                }} underlayColor={'rgba(0,0,0,0.3)'} style={{ height: 50, width: 50, borderRadius: 25, alignContent: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                                    <Text style={{ fontSize: 50, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', color: 'white' }}>+</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#1E6EC7' }}>
                            <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center' }}>Genereaza sedinte de scolarizare:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableHighlight onPress={() => {
                                    if (this.state.sdp > 0) {
                                        this.setState({ sdp: this.state.sdp - 1 })
                                        let generatedSdp = this.state.generatedSdp;
                                        generatedSdp.pop();
                                        this.setState({ generatedSdp: generatedSdp });
                                    }
                                }}
                                    underlayColor={'rgba(0,0,0,0.3)'} style={{ height: 50, width: 50, borderRadius: 25, alignContent: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                                    <Text style={{ fontSize: 50, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', color: 'white' }}>-</Text>
                                </TouchableHighlight>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 30, fontWeight: 'bold' }}>{this.state.sdp}</Text>
                                <TouchableHighlight onPress={() => {
                                    let date = new Date();
                                    if (this.state.sdp < 15) {
                                        let generatedSdp = this.state.generatedSdp;
                                        generatedSdp.push({ tip: "suplimentara", day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), hour: Math.floor(((this.state.sdp + 1) * 90) / 60), minutes: (this.state.sdp + 1) * 90 - Math.floor(((this.state.sdp + 1) * 90) / 60) * 60 })
                                        this.setState({ generatedSdp })
                                        this.setState({ sdp: this.state.sdp + 1 })
                                    }
                                }} underlayColor={'rgba(0,0,0,0.3)'} style={{ height: 50, width: 50, borderRadius: 25, alignContent: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
                                    <Text style={{ fontSize: 50, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', color: 'white' }}>+</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Button
                            title="Adauga"
                            backgroundColor="#1E6EC7"
                            containerViewStyle={{ marginTop: 10 }}
                            loading={this.props.createLoading}
                            onPress={() => {
                                this.onCreateStudentPress();
                            }}
                        />
                    </List>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Cum doriti sa adaugati o copie dupa buletin?'}
                        options={['Selecteaza o poza', 'Fa o poza', 'Anuleaza']}
                        cancelButtonIndex={2}
                        onPress={(index) => {
                            if (index == 0) { this.selectImage(); }
                            if (index == 1) { this.takeImage(); }
                        }}
                    />
                    <Modal
                        visible={this.state.isNameModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ isNameModalVisible: false })}
                        animationType='slide'
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: 350, backgroundColor: 'white' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '700' }} >Numele elevului:</Text>
                                <TextInput value={this.state.nume} textContentType="name" onChangeText={(nume) => this.setState({ nume })} style={{ borderColor: '#1E6EC7', borderWidth: 2, width: '90%', fontSize: 19, padding: 8, borderRadius: 10, alignSelf: 'center' }} />
                                <Button
                                    title="Gata"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isNameModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={this.state.isTelModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ isTelModalVisible: false })}
                        animationType='slide'
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: 350, backgroundColor: 'white' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '700' }} >Nr. de telefon:</Text>
                                <TextInput value={this.state.phone} keyboardType="phone-pad" textContentType="name" onChangeText={(phone) => this.setState({ phone })} style={{ borderColor: '#1E6EC7', borderWidth: 2, width: '90%', fontSize: 19, padding: 8, borderRadius: 10, alignSelf: 'center' }} />
                                <Button
                                    title="Gata"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isTelModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={this.state.isCNPModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ isCNPModalVisible: false })}
                        animationType='slide'
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: 350, backgroundColor: 'white' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '700' }} >CNP-ul elevului:</Text>
                                <TextInput value={this.state.cnp} keyboardType="number-pad" textContentType="telephoneNumber" onChangeText={(cnp) => this.setState({ cnp })} style={{ borderColor: '#1E6EC7', borderWidth: 2, width: '90%', fontSize: 19, padding: 8, borderRadius: 10, alignSelf: 'center' }} />
                                <Button
                                    title="Gata"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isCNPModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={this.state.isRegistruModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ isRegistruModalVisible: false })}
                        animationType='slide'
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: 350, backgroundColor: 'white' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '700' }} >Registrul elevului:</Text>
                                <TextInput value={this.state.registru} keyboardType="number-pad" textContentType="name" onChangeText={(registru) => this.setState({ registru })} style={{ borderColor: '#1E6EC7', borderWidth: 2, width: '90%', fontSize: 19, padding: 8, borderRadius: 10, alignSelf: 'center' }} />
                                <Button
                                    title="Gata"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isRegistruModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={this.state.isSerieModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setState({ isSerieModalVisible: false })}
                        animationType='slide'
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: 350, backgroundColor: 'white' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '700' }} >Seria elevului:</Text>
                                <TextInput value={this.state.serie} keyboardType="number-pad" textContentType="name" onChangeText={(serie) => this.setState({ serie })} style={{ borderColor: '#1E6EC7', borderWidth: 2, width: '90%', fontSize: 19, padding: 8, borderRadius: 10, alignSelf: 'center' }} />
                                <Button
                                    title="Gata"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isSerieModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        );
    }
}
mapStateToProps = (state) => {
    const { createLoading, createSuccess } = state.StudentsReducer;
    return { createLoading, createSuccess };
}
export default connect(mapStateToProps, { studentCreate })(StudentCreate);

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    box: {
        backgroundColor: '#1E6EC7',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        paddingTop: 10
    },
    profileImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    name: {
        fontSize: 25,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    }
}); 