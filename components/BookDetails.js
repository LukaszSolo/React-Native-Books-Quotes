import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import {
  Row,
  Subtitle,
  Text,
  Title,
  View,
  Divider,
  Screen,
  ListView,
  TouchableOpacity,
  Caption,
  Tile,
  Heading,
  Image,
  Overlay
} from '@shoutem/ui';


import BookData from './assets/BookData';
import BookImagesData from './assets/BookImagesData';

export default class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.readBook = this.readBook.bind(this);
  }

  readBook(index) {
    const { navigate } = this.props.navigation;
    const bookData = this.props.navigation.state.params;
    const book = BookData.getData(bookData.filename);
    navigate('Read', {book: book, chapter: index });
  }
  renderRow(rowData, sectionId, index) {
    const chapter = parseInt(index) + 1;

    return (
      <TouchableOpacity onPress={() => {this.readBook(index)}}>
      <Row>
      <View styleName="vertical stretch space-between">
        <Subtitle>{rowData.title}</Subtitle>
        <View styleName="horizontal space-between">
          <Caption>Chapter {chapter}</Caption>
        </View>
      <Divider styleName="line" />
      </View>
      </Row>
      </TouchableOpacity>
    )
  }

  render() {
    const bookData = this.props.navigation.state.params;
    const book = BookData.getData(bookData.filename);
    const bookImg = BookImagesData.getData(bookData.filename.replace('.json', '.jpg'));
    return (
      <Screen styleName="pap1er">
        <Tile>
          <Heading>{bookData.title}</Heading>
          <Caption styleName="sm-gutter-horizontal">{bookData.author}</Caption>
        </Tile>
        <ListView data={book} renderRow={this.renderRow} />
      </Screen> 
    );
  }
}

BookDetails.navigationOptions = {
  title: 'Details',
};
