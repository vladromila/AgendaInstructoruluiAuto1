import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  LayoutAnimation,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { studentDelete, studentOHDeleteModal } from '../../../actions/'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements';
import { ProgressCircle } from 'react-native-svg-charts'
import ImageViewer from 'react-native-image-zoom-viewer';


class StudentProfile extends Component {
  constructor() {
    super()
    this.state = {
      isImageModalVisible: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Profil: ${navigation.state.params.nume}`,
      headerStyle: {
        backgroundColor: '#1E6EC7'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <TouchableHighlight style={{ padding: 0, margin: 0 }} onPress={() => {
              this.setState({ isImageModalVisible: true });
            }
            }>
              <View style={styles.box}>
                <Image source={this.state.image ? { uri: this.state.image } : this.props.navigation.state.params.uri ? { uri: this.props.navigation.state.params.uri } : require('../../../../assets/user.png')} style={[styles.profileImage, this.state.image ? { opacity: 1 } : this.props.navigation.state.params.uri ? { opacity: 1 } : { opacity: 0.6 }]} />
              </View>
            </TouchableHighlight>
            <Text style={styles.name}>{this.props.navigation.state.params.nume}</Text>
            <List containerStyle={{ marginTop: 0 }}>
              <ListItem hideChevron title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Nume: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.nume}</Text>
                </Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={{}} />
              <ListItem hideChevron title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Numar de Telefon: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.phone}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem hideChevron title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  CNP: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.cnp}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem hideChevron title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Numar Registru: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.registru}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem hideChevron title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Serie: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.serie}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem
                underlayColor={'rgba(30, 110, 199,0.9)'}
                onPress={() => {
                  let item = this.props.navigation.state.params;
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
                title={
                  <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                    Numarul de ore complete: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.doneClassesTotal ? this.props.navigation.state.params.extraClassesTotal ? (Object.keys(this.props.navigation.state.params.doneClassesTotal).length || 0) + (Object.keys(this.props.navigation.state.params.extraClassesTotal).length || 0) : (Object.keys(this.props.navigation.state.params.doneClassesTotal).length || 0) : this.props.navigation.state.params.extraClassesTotal ? (Object.keys(this.props.navigation.state.params.extraClassesTotal).length || 0) : 0}</Text>
                  </Text>
                } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }}
                rightIcon={<Icon1 name='list-ol' style={{ paddingRight: 10, color: 'white' }} size={27} />}
              />
              <ListItem
                underlayColor={'rgba(30, 110, 199,0.9)'}
                title={
                  <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                    Istoricul orelor anulate:
                </Text>
                } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }}
                rightIcon={<Icon1 name='history' onPress={() => {
                  if (this.props.navigation.state.params.canceledClasses) {
                    let canceledClasses = _.toArray(this.props.navigation.state.params.canceledClasses);
                    this.props.navigation.navigate('StudentCanceledClasses', { canceledClasses, nume: this.props.navigation.state.params.nume })
                  }
                  else
                    this.props.navigation.navigate('StudentCanceledClasses', { nume: this.props.navigation.state.params.nume })
                }} style={{ paddingRight: 10, color: 'white' }} size={27} />}
              /><ListItem title={'Progres:'} titleStyle={{ color: 'white', alignSelf: 'center' }} hideChevron containerStyle={{ backgroundColor: '#1E6EC7', borderBottomColor: '#1E6EC7' }} />
              <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, backgroundColor: '#1E6EC7' }}>
                <ProgressCircle
                  style={{ height: 200, elevation: 10 }}
                  progress={this.props.navigation.state.params.doneClasses ?Object.keys(this.props.navigation.state.params.doneClasses).length/15:0}
                  progressColor={'white'}
                  backgroundColor={'black'}
                /></View>
            </List>
            {this.props.navigation.state.params.isInactive === true ? null :
              <List>
                <ListItem
                  underlayColor={'rgba(30, 110, 199,0.9)'}
                  onPress={() => {
                    this.props.navigation.navigate('StudentEdit', this.props.navigation.state.params)
                  }}
                  title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Editeaza Elev</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} onPress={() => { this.props.navigation.navigate('StudentEdit', { ...this.props.navigation.state.params }) }}
                  rightIcon={<Icon1 name='edit' color='white' style={{ paddingRight: 10 }} size={30} />} />
                <ListItem
                  onPress={() => {
                    this.props.studentOHDeleteModal();
                  }}
                  underlayColor={'rgba(30, 110, 199,0.9)'}
                  title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Sterge Elev</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='times' color='red' style={{ paddingRight: 10 }} size={30} />} />
              </List>}
          </View>
        </ScrollView>
        <Modal visible={this.state.isImageModalVisible} transparent={false} onRequestClose={() => this.setState({ isImageModalVisible: false })}>
          <ImageViewer imageUrls={[{ url: this.props.navigation.state.params.uri }]} />
        </Modal>
      </View >
    );
  }
}
mapStateToProps = state => {
  return { sry: true }
}
export default connect(mapStateToProps, { studentDelete, studentOHDeleteModal })(StudentProfile);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  box: {
    backgroundColor: '#1E6EC7',
    marginTop: 0,
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