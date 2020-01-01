import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const global_colorHistory = []; // yeah, I know it's bad. Just didn't want to change a lot of codes

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      colorHex: this.generateColor(),
      prevColor: null,
      touchedOn: null,
      showHelp: false,
      showColorHistory: false,
    };
  }

  touchedOnRightSide() {
    this.setState({ colorHex: this.generateColor() });
    this.setState({ prevColor: this.state.colorHex });
  }

  touchedOnLeftSide() {
    this.state.prevColor
      ? this.setState({ colorHex: this.state.prevColor })
      : null;
  }

  generateColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

    const clr =
      '#' +
      hex[App.r(15)] +
      hex[App.r(15)] +
      hex[App.r(15)] +
      hex[App.r(15)] +
      hex[App.r(15)] +
      hex[App.r(15)];

    global_colorHistory.push(clr);
    return clr;
  }

  static r(max) {
    return Math.floor(Math.random() * (max - 0 + 1) + 0);
  }

  render() {
    return (
      <View
        onTouchStart={e => {
          if (
            e.nativeEvent.touches[0].pageX <
            Dimensions.get('window').width / 2
          ) {
            this.touchedOnLeftSide();
          } else this.touchedOnRightSide();
        }}
        style={{ ...styles.container, backgroundColor: this.state.colorHex }}
      >
        <StatusBar hidden={true} />
        <Text style={{ fontSize: 30, color: '#fff' }}>
          {this.state.colorHex}
        </Text>

        {/* floating help icon */}
        <View
          style={{
            position: 'absolute',
            right: 30,
            bottom: 30,
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 2000000,
            elevation: 10,
            zIndex: 2000,
            opacity: this.state.showColorHistory ? 0 : 1,
          }}
          onTouchStart={e => {
            e.stopPropagation();
            this.setState({ showHelp: !this.state.showHelp });
          }}
        >
          <Icon
            name={this.state.showHelp ? 'close' : 'question'}
            size={30}
            color='#141414'
          />
        </View>

        {/* floating button for showing color history */}
        <View
          style={{
            position: 'absolute',
            right: 30,
            bottom: this.state.showColorHistory ? 30 : 30 + 80,
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 2000000,
            elevation: 10,
            zIndex: 2000,
            opacity: this.state.showHelp ? 0 : 1,
          }}
          onTouchStart={e => {
            e.stopPropagation();
            this.setState({ showColorHistory: !this.state.showColorHistory });
          }}
        >
          <Icon
            name={this.state.showColorHistory ? 'close' : 'bars'}
            size={30}
            color='#141414'
          />
        </View>

        <Help showHelp={this.state.showHelp} />
        <ShowColors showColorHistory={this.state.showColorHistory} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Component for Showing Help Info
function Help({ showHelp }) {
  return showHelp ? (
    <View
      onClick={e => e.stopPropagation()}
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 20,
        paddingLeft: 0,
        paddingRight: 0,
        opacity: 100,
      }}
    >
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#141414',
            fontWeight: 'bold',
          }}
        >
          Color<Text style={{ color: 'red' }}>X{'\n'}</Text>
        </Text>
        <Text style={{ color: '#141414', fontSize: 20, lineHeight: 33 }}>
          Color<Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text> is an
          application which let you discover new colors just by tapping on your
          phone screen. {'\n'}
          Cool, isn't it? Nope, I know. A cool description is needed indeed!
          {'\n\n'}
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
            How it Generates Color?{'\n'}
          </Text>
          It generates color hex randomly. So, chances are, most of the time
          color would be unique. Just a FYI, it may never generate pure
          black(#000000) or while color(#ffffff). {'\n\n'}
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
            Release Notes{'\n'}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>v1.2</Text>
          {'\n'} - Color history: never miss any color {'\n'}
          <Text style={{ fontWeight: 'bold' }}>v1.1</Text>
          {'\n'} - Check Previous Color {'\n'}
          <Text style={{ fontWeight: 'bold' }}>v1.0</Text>
          {'\n'} - Implemented Help Menu{'\n'} - Added Color Generator{'\n'} -
          Initial Release
        </Text>
      </ScrollView>
    </View>
  ) : null;
}

// component for handling previous color
function ShowColors({ showColorHistory }) {
  return showColorHistory ? (
    <View
      onClick={e => e.stopPropagation()}
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 100,
      }}
    >
      <ScrollView
        style={{
          display: 'flex',
        }}
      >
        {global_colorHistory.map((v, i) => (
          <Text
            key={i}
            style={{
              backgroundColor: v,
              padding: 20,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {v}
          </Text>
        ))}
      </ScrollView>
    </View>
  ) : null;
}
