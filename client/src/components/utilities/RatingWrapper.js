import React from 'react';
import { View, Easing } from 'react-native';
import Rating from 'react-native-rating';

const images = {
  flexFilled: require('../../../assets/flex_full.png'),
  flexUnfilled: require('../../../assets/flex_empty.png')
};

const ANIMATION_DURATION = 350;

// This is a wrapper component around react-native-rating.
// Solves the problem that the initial state of the rating can't be
// updated after the component is first rendered.
// We are therefore using a simple hack to trick the Rating-component
// to update itself after the rating has been changed.
class RatingWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { update: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rating !== nextProps.rating) {
      this.setState({
        update: true
      });
    }
  }

  componentDidUpdate() {
    if (this.state.update) {
      this.setState({
        update: false
      });
    }
  }

  onChange(level) {
    if (this.props.onChange) {
      setTimeout(
        () => this.props.onChange(this.props.id, level),
        ANIMATION_DURATION
      );
    }
  }

  render() {
    if (this.state.update) {
      return <View />;
    }

    return (
      <Rating
        selectedStar={images.flexFilled}
        unselectedStar={images.flexUnfilled}
        initial={this.props.rating}
        onChange={level => this.onChange(level)}
        editable={this.props.editable}
        stagger={80}
        maxScale={1.4}
        config={{
          easing: Easing.inOut(Easing.ease),
          duration: ANIMATION_DURATION
        }}
        starStyle={{
          width: 40,
          height: 40
        }}
      />
    );
  }
}

export default RatingWrapper;
