import React from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements';
import Gradient from 'react-native-css-gradient';
import { months } from '../../../variables';

class FinishedStudentsList extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#1E6EC7'
        },
        title: "Elevi Admisi",
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        }
    }

    constructor() {
        super();
        this.state = {
            selectedUid: null
        }
    }

    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
                <FlatList
                    data={this.props.finishedStudents}
                    keyExtractor={(item, i) => `${i}`}
                    extraData={[this.props, this.state]}
                    renderItem={({ item }) => {
                        return <View><ListItem
                            title={<Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>{item.nume}</Text>}
                            underlayColor={'rgba(30, 110, 199,0.5)'}
                            onPress={() => {
                                if (this.state.selectedUid === item.uid)
                                    this.setState({ selectedUid: null })
                                else
                                    this.setState({ selectedUid: item.uid })
                            }
                            }
                            containerStyle={{ backgroundColor: 'rgba(30, 110, 199,0.4)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                            rightIcon={<Icon name={this.state.selectedUid === item.uid ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={30} />}
                        />
                            {this.state.selectedUid === item.uid ?
                                <View style={{ backgroundColor: 'rgba(30, 110, 199,0.3)', marginLeft: 10, marginRight: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 20, padding: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Date despre examen:</Text>
                                    <Text style={{ fontSize: 16 }}>Nume Politist: <Text style={{ fontWeight: 'bold' }}>{item.examData.numePolitist}</Text></Text>
                                    <Text style={{ fontSize: 16 }}>Data Examenului: <Text style={{ fontWeight: 'bold' }}>{item.examData.day} {months[item.examData.month]} {item.examData.year}</Text></Text>
                                </View> : null}
                        </View>
                    }}
                />
            </Gradient>
        );
    }
}

mapStateToProps = (state) => {
    const { finishedStudents } = state.FetchedData;
    return { finishedStudents };
}

export default connect(mapStateToProps)(FinishedStudentsList);