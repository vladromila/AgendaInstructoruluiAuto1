import React from 'react';
import { View, Text, ScrollView, FlatList, Modal } from 'react-native';
import Gradient from 'react-native-css-gradient'
import { Header, Button } from 'react-native-elements'
import { studentOHInToAModal, studentInToA } from '../../../../actions/'
import { connect } from 'react-redux'
import ListItemFS from '../../reusable/ListItemFS';
import _ from 'lodash';
import ActionSheet from 'react-native-actionsheet';

class InStudentsHome extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedStudent: {},
            selectedStudentUid: ''
        }
    }
    static navigationOptions = {
        header: null,
        title: "Elevi inactivi"
    }
    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Elevi Inactivi</Text>}
                />
                <ScrollView>
                    <FlatList
                        data={this.props.inStudents}
                        keyExtractor={(item, i) => `${i}`}
                        extraData={[this.props]}
                        renderItem={({ item }) => {
                            return <ListItemFS
                                isInactive={true}
                                student={item}
                                onPress={() => {
                                    if (this.state.selectedStudentUid === item.uid)
                                        this.setState({ selectedStudentUid: null })
                                    else
                                        this.setState({ selectedStudentUid: item.uid })
                                }}
                                selectedStudentUid={this.state.selectedStudentUid}
                                onLongPress={() => {
                                    this.setState({ selectedStudent: item })
                                    this.ActionSheet.show();
                                }}
                                onListItemProfilePress={() => { this.props.navigation.navigate('StudentProfile', { ...item, isInactive: true }) }}
                                onViewCanceledClassesPress={() => {
                                    if (item.canceledClasses) {
                                        let canceledClasses = _.toArray(item.canceledClasses);
                                        this.props.navigation.navigate('StudentCanceledClasses', { canceledClasses, nume: item.nume })
                                    }
                                    else
                                        this.props.navigation.navigate('StudentCanceledClasses', { nume: item.nume })
                                }}
                                onViewFinishedClassesPress={() => {
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
                                }}
                            />
                        }}
                    />
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{ fontSize: 21, fontWeight: 'bold', color: '#1E6EC7' }}>{this.state.selectedStudent.nume}:</Text>}
                    options={['Seteaza ca activ', 'Vizualizeaza profilul', 'Anuleaza']}
                    destructiveButtonIndex={2}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        if (index === 0)
                            this.props.studentOHInToAModal();
                        if (index === 1) {
                            this.props.navigation.navigate('StudentProfile', { ...this.state.selectedStudent, isInactive: true })
                        }
                    }}
                />
                <Modal
                    animationType="slide"
                    visible={this.props.isInToAStudentModalVisible}
                    onRequestClose={() => this.props.studentOHInToAModal()}
                    transparent={true}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{ width: '95%', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: 20, alignSelf: 'center' }}>
                                <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '300', fontSize: 21, textAlign: 'center' }}>Doriti sa setati elevul <Text style={{ color: 'black', fontWeight: '800', fontSize: 21, }}>{this.state.selectedStudent.nume}</Text> ca activ? Daca da, in ce mod doriti sa il activati></Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    backgroundColor="#1E6EC7"
                                    title="Pastrati nr. sed."
                                    loading={this.props.inToALoading === true && this.props.loadingButton === 1 ? true : false}
                                    onPress={() => {
                                        const { selectedStudent } = this.state;
                                        this.props.studentInToA({ student: selectedStudent, cs: 1 })
                                    }}
                                />
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ marginTop: 5 }}
                                    title="Resetati nr. sed. suplimentare"
                                    loading={this.props.inToALoading === true && this.props.loadingButton === 2 ? true : false}
                                    onPress={() => {
                                        const { selectedStudent } = this.state;
                                        this.props.studentInToA({ student: selectedStudent, cs: 2 })
                                    }}
                                />
                                <Button
                                    textStyle={{ fontWeight: 'bold' }}
                                    containerViewStyle={{ marginTop: 10 }}
                                    backgroundColor="#1E6EC7"
                                    title="Nu"
                                    onPress={() => this.props.studentOHInToAModal()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </Gradient>
        );
    }
}

mapStateToProps = (state) => {
    const { inStudents } = state.FetchedData;
    const { inToALoading, inToASuccess, isInToAStudentModalVisible, loadingButton } = state.StudentsReducer;
    return { inStudents, inToALoading, inToASuccess, isInToAStudentModalVisible, loadingButton };
}

export default connect(mapStateToProps, { studentOHInToAModal, studentInToA })(InStudentsHome);