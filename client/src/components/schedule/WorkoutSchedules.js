import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput
} from 'react-native';
import NavigationActions from 'react-navigation';
import axios from 'axios';

class WorkoutSchedules extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addWorkoutModalVisible: false, title: '' };
  }

  addSchedule() {
    this.setState({ addWorkoutModalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.addWorkoutModalVisible}
          animationType={'none'}
          transparent
          onRequestClose={() => setState({ addWorkoutModalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>Title:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={title => this.setState({ title })}
              />
              <Button
                color="#fff"
                onPress={this.addSchedule.bind(this)}
                title="Add Schedule"
              />
            </View>
          </View>
        </Modal>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'Dashboard'
                })
              );
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ addWorkoutModalVisible: true });
            }}
          >
            <Text
              style={{
                marginTop: -24,
                fontSize: 56,
                fontWeight: '100',
                color: '#fff'
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default WorkoutSchedules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#51c1ab',
    paddingTop: 50
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 200
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#51c1ab'
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 3,
    margin: 5
  }
});
