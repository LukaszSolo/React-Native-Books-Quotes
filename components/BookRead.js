import { MarkdownView } from 'react-native-markdown-view'
import React, { Component } from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Divider, Button, Icon } from 'react-native-elements'

const offColor = '#9E9E9E';
const onColor = '#007bef'
export default class BookRead extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chapter ${parseInt(navigation.state.params.chapter)+1}`,
  });

  constructor(props) {
    super(props);
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);

    const currentChapter = this.props.navigation.state.params.chapter;
    const hasPrev = currentChapter == 0 ? offColor : onColor;
    const hasNext = currentChapter + 1 == this.props.navigation.state.params.book.length ? offColor : onColor;

    this.state = {
      hasPrev: hasPrev,
      hasNext: hasNext,
      currentChapter: currentChapter,
      currentText: this.props.navigation.state.params.book[currentChapter]
    };
  }

  goPrev() {
    const index = parseInt(this.state.currentChapter)-1;
    if (index >= 0) {
      const book = this.props.navigation.state.params.book;
      const hasPrev = index == 0 ? offColor : onColor;
      const hasNext = onColor;

      this.props.navigation.setParams({chapter: index});
      this.setState({
        hasPrev: hasPrev,
        hasNext: hasNext,
        currentChapter: index,
        currentText: book[index]
      });
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: false});
    } 
  }

  goNext() {
    const index = parseInt(this.state.currentChapter) + 1
    const book = this.props.navigation.state.params.book;

    if (index < book.length) {
      const hasPrev = onColor;
      const hasNext = index+1 == book.length ?  offColor : onColor;

      this.props.navigation.setParams({chapter: index});

      this.setState({
        hasPrev: hasPrev,
        hasNext: hasNext,
        currentChapter: index,
        currentText: book[index]
      });
      
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: false});
    }
  }

  render() {
    return (
      <View style={styles.paper}>
        <ScrollView style={styles.read} ref="_scrollView">
          <Text style={styles.header} h3>{this.state.currentText.title}</Text>
          <Divider styleName="line" />
          <MarkdownView>{this.state.currentText.content}</MarkdownView>
        </ScrollView>
        <Divider />
        <View style={styles.navigation}>
          <Icon raised name='chevron-left' type='font-awesome' color={this.state.hasPrev} onPress={this.goPrev} />
          <Icon raised name='chevron-right'type='font-awesome' color={this.state.hasNext} onPress={this.goNext} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  header: {
    paddingTop: 15
  },
  read: {
    paddingLeft: 15,
    paddingRight: 15,
  },

  paper: {
    flex: 1,
    backgroundColor: 'white'
  }
});
