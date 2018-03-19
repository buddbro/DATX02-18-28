import React from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
  setActiveSchedule,
  deleteSchedule,
  deleteExerciseFromSchedule,
  editSchedule,
  setExerciseListType
} from '../../actions';
import NavigationActions from 'react-navigation';

class ScheduleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  componentDidMount() {
    this.setState({ title: this.props.title });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.title });
  }

  deleteScheduleAlert() {
    Alert.alert(
      'Are you sure?',
      "This can't be undone",
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteSchedule(this.props.id);
          }
        }
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <TextInput
            style={styles.titleTextInput}
            onChangeText={title => this.setState({ title })}
            onEndEditing={() =>
              this.props.editSchedule(this.props.id, this.state.title)}
            returnKeyLabel="Save"
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            spellCheck={false}
            value={this.state.title}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={{ flex: 3 }}
            onPress={() => {
              this.deleteScheduleAlert();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#d33',
                width: 180,
                margin: 10
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.exercises}
          keyExtractor={(item, index) => `exercise${index}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItemContainer}>
                <Text style={styles.nameText}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.deleteExerciseFromSchedule(item.id);
                  }}
                >
                  <Image
                    source={require('../../../assets/delete.png')}
                    style={styles.deleteButton}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.setExerciseListType('schedule');
            this.props.setActiveSchedule(this.props.id, this.props.title);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ExerciseList'
              })
            );
          }}
        >
          <View
            style={[
              styles.listItemContainer,
              { justifyContent: 'space-around' }
            ]}
          >
            <Text style={[styles.nameText, { fontWeight: '600' }]}>
              Add exercise
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, {
  setActiveSchedule,
  deleteSchedule,
  deleteExerciseFromSchedule,
  editSchedule,
  setExerciseListType
})(ScheduleCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f5',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRadius: 3
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleTextInput: {
    height: 40,
    fontSize: 24,
    borderColor: '#eee',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 3,
    textAlign: 'center',
    flex: 9
  },
  deleteButton: {
    width: 20,
    height: 20,
    margin: 5
  },
  listItemContainer: {
    backgroundColor: '#7ad9c6',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '300',
    textAlign: 'center'
  }
});
