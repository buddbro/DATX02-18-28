import React from 'react';
import { AsyncStorage, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Radar } from '../utilities/charts/';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          loading: true
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('jwt').then(jwt => {
      axios
        .get(
          `https://getpushapp.com/api/workouts/${
            nextProps.workoutId
          }/categories`,
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .then(({ data }) => {
          console.log(data);
          Object.keys(data).map(d => data[d]++);
          this.setState({ data: [data] });
        });
    });
  }

  render() {
    const max = Object.keys(this.state.data[0]).reduce((acc, next) => {
      return acc < this.state.data[0][next] ? this.state.data[0][next] : acc;
    }, 0);

    let options = {
      width,
      height: 250,
      // margin: {
      //   top: 10,
      //   left: 20,
      //   right: 20,
      //   bottom: 10
      // },
      r: 100,
      rings: 1,
      max: max + 1,
      fill: '#b9baf1',
      stroke: '#baf2d4',
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 'gray'
      }
    };

    if (this.state.data[0].loading) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <Radar
          data={this.state.data}
          options={options}
          backgroundColor="#E2FBF6"
        />
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
