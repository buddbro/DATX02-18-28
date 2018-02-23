import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import {
  getSetsForExercise,
  viewSet,
  addSetToExercise,
  getExerciseDescription,
  clearExercise
} from "../../../actions";
import NavigationActions from "react-navigation";
import { BarChart } from "react-native-svg-charts";

import ExerciseSet from "./ExerciseSet";

class BarChartExample extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];
    const barData = [
      {
        values: data,
        positive: {
          fill: fillColor
          // other react-native-svg supported props
        },
        negative: {
          fill: fillColorNegative
          // other react-native-svg supported props
        }
      }
    ];

    return (
      <BarChart
        style={{ height: 200 }}
        data={barData}
        contentInset={{ top: 30, bottom: 30 }}
      />
    );
  }
}

class ViewExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = { accordionToggled: false, reps: "", weight: "" };
  }

  setReps(reps) {
    this.setState({ reps });
  }

  setWeight(weight) {
    this.setState({ weight });
  }

  addSetToExercise() {
    if (!this.state.reps || !this.state.weight) {
      return;
    }

    this.props.addSetToExercise(
      this.props.userId,
      this.props.token,
      this.props.visibleSet,
      this.state.reps,
      this.state.weight
    );

    this.setState({
      reps: "",
      weight: ""
    });
  }

  render() {
    if (this.props.loading) {
      return <View style={styles.container} />;
    }

    const statisticsData = [
      {
        values: this.props.sets.reduce((acc, next) => {
          return [...acc, next.reps * next.weight];
        }, []),
        positive: {
          fill: "#6669cb"
        },
        negative: {
          fill: "#6669cb"
        }
      }
    ];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.clearExercise();
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: "ViewWorkout"
                })
              );
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#b9baf1",
              margin: 10,
              borderRadius: 3,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                marginTop: 15,
                marginBottom: 15,
                marginLeft: 15,
                color: "#444",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              {this.props.visibleExercise}
            </Text>
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={() => {
                this.props.getExerciseDescription(this.props.visibleExerciseId);
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: "ExerciseHelp"
                  })
                );
              }}
            >
              <Text
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  color: "#444",
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                ?
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ backgroundColor: "#b9baf1", margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginLeft: 8,
                marginTop: 6,
                marginBottom: 15,
                color: "#444",
                fontSize: 18
              }}
            >
              Sets
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#6669cb",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginLeft: 8,
                marginRight: 8
              }}
            >
              <View style={{ width: "20%" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  #
                </Text>
              </View>

              <View style={{ width: "40%" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  Reps
                </Text>
              </View>

              <View style={{ width: "40%" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "#fff" }}
                >
                  Weight
                </Text>
              </View>
            </View>

            <FlatList
              style={{ marginLeft: 8, marginRight: 8 }}
              data={[...this.props.sets, { id: -1, reps: "", weight: "" }]}
              keyExtractor={(item, index) => `${item.id}${this.props.id}`}
              renderItem={({ item, index }) => {
                const key = `${this.props.id}${item.id}`;
                return (
                  <ExerciseSet
                    id={item.id}
                    index={index}
                    reps={item.id === -1 ? this.state.reps : String(item.reps)}
                    weight={
                      item.id === -1 ? this.state.weight : String(item.weight)
                    }
                    exerciseId={this.props.id}
                    setReps={this.setReps.bind(this)}
                    setWeight={this.setWeight.bind(this)}
                  />
                );
              }}
            />
            <TouchableOpacity
              onPress={() => this.addSetToExercise()}
              style={styles.addSetButton}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff"
                }}
              >
                Add set
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ backgroundColor: "#b9baf1", margin: 10, borderRadius: 3 }}
          >
            <Text
              style={{
                marginLeft: 15,
                marginTop: 6,
                marginBottom: 15,
                color: "#444",
                fontSize: 18
              }}
            >
              Statistics
            </Text>
            <BarChart
              style={{ height: 200 }}
              data={statisticsData}
              contentInset={{ top: 30, bottom: 30, left: 10, right: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, workout, exercises }) => {
  console.log(workout);
  return {
    exercises,
    id: user.id,
    token: user.token,
    sets: workout.sets,
    visibleSet: workout.visibleSet,
    visibleExercise: workout.visibleExercise,
    visibleExerciseId: workout.visibleExerciseId,
    loading: workout.exerciseLoading
  };
};

export default connect(mapStateToProps, {
  getSetsForExercise,
  viewSet,
  addSetToExercise,
  getExerciseDescription,
  clearExercise
})(ViewExercise);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#8b8ddf",
    paddingTop: 40
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "space-between"
  },
  addSetButton: {
    backgroundColor: "#6669cb",
    margin: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10
  }
});
