import React from 'react';
import { AsyncStorage, View, StyleSheet, Text } from 'react-native';
import { Radar } from 'react-native-pathjs-charts';
import axios from 'axios';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          speed: 0
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(
          `https://getpushapp.com/api/workouts/${nextProps.workoutId}/categories`,
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          this.setState({ data: [data] });
        });
    });
  }

  render() {
    let data = [
      {
        speed: 74,
        balance: 29,
        explosives: 40,
        energy: 40,
        flexibility: 30,
        agility: 25,
        endurance: 44
      }
    ];

    let options = {
      width: 270,
      height: 270,
      margin: {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
      },
      r: 120,
      max: 3,
      fill: '#b9baf1',
      stroke: '#98e0d2',
      // fill: '#2980B9',
      // stroke: '#2980B9',
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fill: '#34495E'
      }
    };

    if (!this.state.data) {
      return <View />;
    }

    console.log(this.state.data);

    return (
      <View style={styles.container}>
        {/* <Radar data={this.state.data} options={options} /> */}
      </View>
    );
  }
}

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  }
});
