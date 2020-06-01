import React from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements';
import { months } from '../../../variables';
import _ from 'lodash';

class FinishedStudentsList extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#1E6EC7'
        },
        title: "Elevi Respinsi",
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
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.rStudents}
                    keyExtractor={(item, i) => `${i}`}
                    extraData={[this.props, this.state]}
                    renderItem={({ item }) => {
                        return <View><ListItem
                            title={<Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>}
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
                                <View style={{ backgroundColor: 'rgba(30, 110, 199,0.3)', marginLeft: 50, marginRight: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 20, padding: 5 }}>
                                    <Text style={{ fontSize: 19, fontWeight: "bold" }}>Istoricul Examenelor:</Text>
                                    {_.toArray(item.attempts).map((ex, i) => {
                                        return <ListItem
                                            containerStyle={{ borderBottomColor: 'black' }}
                                            key={i}
                                            title={<View style={{ flexDirection: 'column' }}><Text style={{ fontSize: 17 }}>Data: <Text style={{ fontWeight: 'bold' }}>{ex.day} {months[ex.month]} {ex.year}</Text></Text>{ex.numePolitist != "" ? <Text style={{ fontSize: 15 }}>Politist Examinator: <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{ex.numePolitist}</Text></Text> : null}</View>}
                                        />
                                    })}
                                </View> : null}
                        </View>
                    }}
                />
            </View>
        );
    }
}

mapStateToProps = (state) => {
    const { rStudents } = state.FetchedData;
    return { rStudents };
}

export default connect(mapStateToProps)(FinishedStudentsList);