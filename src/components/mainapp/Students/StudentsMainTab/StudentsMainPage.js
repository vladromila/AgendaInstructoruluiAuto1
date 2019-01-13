import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, Modal, Dimensions, StatusBar, BackAndroid } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base'
import { Header, Button, SearchBar } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'
import ListItemFS from '../../reusable/ListItemFS';
import { studentOHDeleteModal, studentDelete, studentOHToInModal, studentToInStudent } from '../../../../actions'
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import QRCode from 'react-native-qrcode-svg';
import firebase from 'firebase';
import SearchHeader from 'react-native-search-header';
import _ from 'lodash';

const size = Dimensions.get('screen').width * 2 / 3;
class StudentsMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQRCodeModalVisible: false,
            selectedStudent: {},
            students: this.props.students
        }
        this.onListItemProfilePress.bind(this);
    }
    static navigationOptions = {
        header: null,
        title: "Elevi Activi"
    }
    onListItemProfilePress(student) {
        this.setState({ selectedStudent: student })
        this.props.navigation.navigate('StudentProfile', student);
    }
    async componentWillReceiveProps(nextProps) {
        this.setState({ students: nextProps.students });
    }
    onViewFinishedClassesPress(item) {
        if (item.doneClassesTotal)
            if (item.extraClassesTotal) {
                let finishedNClasses = _.toArray(item.doneClassesTotal);
                let finishedEClasses = _.toArray(item.extraClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, finishedEClasses, nume: item.nume })
            }
            else {
                let finishedNClasses = _.toArray(item.doneClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, nume: item.nume })
            }
        else
            if (item.extraClassesTotal) {
                let finishedEClasses = _.toArray(item.extraClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedEClasses, nume: item.nume })
            }
            else {
                this.props.navigation.navigate('StudentFinishedClasses', { nume: item.nume })
            }
    }
    onViewCanceledClassesPress(item) {
        if (item.canceledClasses) {
            let canceledClasses = _.toArray(item.canceledClasses);
            this.props.navigation.navigate('StudentCanceledClasses', { canceledClasses, nume: item.nume })
        }
        else
            this.props.navigation.navigate('StudentCanceledClasses', { nume: item.nume })
    }

    onInpuChange(input) {
        let search = input.toLowerCase()
        let students = this.props.students
        let filteredStudents = students.filter((item) => {
            return item.nume.toLowerCase().match(search)
        })
        this.setState({ students: filteredStudents })
    }

    render() {
        return (<Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
            <Header
                leftComponent={<Icon name="search" onPress={() => {
                    this.searchHeader.show();
                }} />}
                innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Elevi</Text>}
                rightComponent={<Icon name="add" fontSize={40} onPress={() => this.props.navigation.navigate('StudentCreate')} />}
            />
            <SearchHeader
                ref={(searchHeader) => {
                    this.searchHeader = searchHeader;
                }}
                placeholder='Search...'
                placeholderColor='gray'
                onClear={() => { this.onInpuChange('') }}
                onEnteringSearch={(input) => {
                    this.onInpuChange(input.nativeEvent.text);
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={this.state.students}
                    keyExtractor={(item, i) => `${i}`}
                    extraData={this.state.students}
                    renderItem={({ item }) => {
                        return <ListItemFS
                            isInactive={false}
                            student={item}
                            onListItemProfilePress={() => this.onListItemProfilePress(item)}
                            onLongPress={() => {
                                this.setState({ selectedStudent: item })
                                this.ActionSheet.show();
                            }}
                            onViewCanceledClassesPress={() => this.onViewCanceledClassesPress(item)}
                            onViewFinishedClassesPress={() => this.onViewFinishedClassesPress(item)}
                        />
                    }}
                />
                <Modal
                    visible={this.state.isQRCodeModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => { this.setState({ isQRCodeModalVisible: false }) }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ alignSelf: 'center', width: '100%', height: size + 200, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}>

                            <View style={{ alignSelf: 'center', marginBottom: 20 }}>
                                <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: 'bold' }}>{this.state.selectedStudent.nume}:</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 19, fontWeight: 'bold' }}>QRCode-ul pentru Aplicatia Elevului</Text>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <QRCode
                                    value={`${firebase.auth().currentUser.uid}+${this.state.selectedStudent.uid}`}
                                    size={size}
                                />
                            </View>
                            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                                <Button
                                    backgroundColor="#1E6EC7"
                                    title="Gata"
                                    onPress={() => {
                                        this.setState({ isQRCodeModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{ fontSize: 21, color: '#1E6EC7', fontWeight: 'bold' }}>{this.state.selectedStudent.nume}:</Text>}
                    options={['Vizuealizeaza codul QR', 'Seteaza ca inactiv', 'Vizualizeaza profilul', 'Editeaza Profilul', 'Sterge Elevul', 'Anuleaza']}
                    cancelButtonIndex={5}
                    destructiveButtonIndex={5}
                    onPress={(index) => {
                        if (index == 0)
                            this.setState({ isQRCodeModalVisible: true })
                        if (index === 1)
                            this.props.studentOHToInModal();
                        if (index === 3) {
                            this.props.navigation.navigate('StudentEdit', this.state.selectedStudent);
                        }
                        if (index === 2) {
                            this.props.navigation.navigate('StudentProfile', this.state.selectedStudent);
                        }
                        if (index === 4)
                            this.props.studentOHDeleteModal();
                    }}
                />
                <Modal
                    animationType="slide"
                    visible={this.props.isToInStudentModalVisible}
                    onRequestClose={() => this.props.studentOHToInModal()}
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{ width: '95%', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: 20, alignSelf: 'center' }}>
                                <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '300', fontSize: 21, textAlign: 'center' }}>Doriti sa setati elevul <Text style={{ color: 'black', fontWeight: '800', fontSize: 21, }}>{this.state.selectedStudent.nume}</Text> ca inactiv?</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    containerViewStyle={{ width: '30%' }}
                                    backgroundColor="#1E6EC7"
                                    title="Da"
                                    loading={this.props.inLoading}
                                    onPress={() => {
                                        const { selectedStudent } = this.state;
                                        this.props.studentToInStudent({ student: selectedStudent })
                                    }}
                                />
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    containerViewStyle={{ width: '30%' }}
                                    backgroundColor="#1E6EC7"
                                    title="Nu"
                                    onPress={() => this.props.studentOHToInModal()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={this.props.isDeleteStudentModalVisible}
                    onRequestClose={() => this.props.studentOHDeleteModal()}
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{ width: '95%', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: 20, alignSelf: 'center' }}>
                                <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '300', fontSize: 21, textAlign: 'center' }}>Doriti sa stergeti elevul <Text style={{ color: 'black', fontWeight: '800', fontSize: 21, }}>{this.state.selectedStudent.nume}</Text>? Daca inca apare in aceasta sectiune inseamna ca inca nu a primit calificativul admis la un examen!</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    containerViewStyle={{ width: '30%' }}
                                    backgroundColor="#1E6EC7"
                                    title="Da"
                                    loading={this.props.deleteLoading}
                                    onPress={() => {
                                        const { selectedStudent } = this.state;
                                        this.props.studentDelete({ student: selectedStudent })
                                    }}
                                />
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    containerViewStyle={{ width: '30%' }}
                                    backgroundColor="#1E6EC7"
                                    title="Nu"
                                    onPress={() => this.props.studentOHDeleteModal()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { students } = state.FetchedData
    const { deleteLoading, deleteSuccess, isDeleteStudentModalVisible, inLoading, inSuccess, isToInStudentModalVisible } = state.StudentsReducer;
    return { students, deleteLoading, deleteSuccess, isDeleteStudentModalVisible, inLoading, inSuccess, isToInStudentModalVisible };
}
export default connect(mapStateToProps, { studentOHDeleteModal, studentDelete, studentOHToInModal, studentToInStudent })(StudentsMainPage)