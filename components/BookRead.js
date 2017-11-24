import { MarkdownView } from 'react-native-markdown-view'
import React, { Component } from 'react';
import {
  View,
  Heading,
  ScrollView,
  Text,
  Screen,
  Divider,
  Button,
  Icon
} from '@shoutem/ui';

export default class BookRead extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chapter ${parseInt(navigation.state.params.chapter)+1}`,
  });

  constructor(props) {
    super(props);
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);

    const currentChapter = this.props.navigation.state.params.chapter;
    const hasPrev = currentChapter == 0 ? 'muted' : '';
    const hasNext = currentChapter == this.props.navigation.state.params.book.length ? 'muted' : '';

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
      const hasPrev = index == 0 ? 'muted' : '';
      const hasNext = '';

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
      const hasPrev = '';
      const hasNext = index+1 == book.length ?  'muted' : '';

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
    const prevClass = "confirmation " + this.state.hasPrev;
    const nextClass = "confirmation " + this.state.hasNext;

    return (
      <Screen styleName="paper">
        <ScrollView style={styles.read} ref="_scrollView">
          <Heading>{this.state.currentText.title}</Heading>
          <Divider styleName="line" />
          <MarkdownView>{this.state.currentText.content}</MarkdownView>
        </ScrollView>
        <View styleName="horizontal">
            <Button onPress={this.goPrev} styleName={prevClass}><Icon name="left-arrow" /><Text>PREV</Text></Button>
            <Button onPress={this.goNext} styleName={nextClass}><Icon name="right-arrow" /><Text>NEXT</Text></Button>
          </View>
      </Screen>
    );
  }
}

const styles = {
  read: {
    padding: 15
  },
}
