import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { deleteExerciseFromSchedule } from '../../actions';

class ScheduleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  componentDidMount() {
    this.setState({ title: this.props.title });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            fontSize: 24,
            borderColor: '#eee',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            padding: 3,
            textAlign: 'center'
          }}
          onChangeText={title => this.setState({ title })}
          // onEndEditing={() => {
          //   this.props.editWorkout(
          //     this.props.user.id,
          //     this.props.user.token,
          //     this.props.id,
          //     this.state.title
          //   );
          //   this.props.fetchWorkouts(
          //     this.props.user.id,
          //     this.props.user.token
          //   );
          // }}
          returnKeyLabel="Save"
          clearButtonMode="while-editing"
          spellCheck={false}
          value={this.state.title}
        />
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
                    this.props.deleteExerciseFromSchedule(
                      item.id,
                      this.props.user.id
                    );
                  }}
                >
                  <Image
                    source={require('../../../assets/delete.png')}
                    style={{ width: 20, height: 20, margin: 5 }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <TouchableOpacity onPress={() => console.log('Add')}>
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

export default connect(mapStateToProps, { deleteExerciseFromSchedule })(
  ScheduleCard
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRadius: 3
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
