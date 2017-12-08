import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import { Tile, List, ListItem, Card, Text } from 'react-native-elements'

import BookData from './assets/BookData';
import BookImagesData from './assets/BookImagesData';

export default class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.readBook = this.readBook.bind(this);
  }

  readBook(chapter) {
    const { navigate } = this.props.navigation;
    const bookData = this.props.navigation.state.params;
    const book = BookData.getData(bookData.filename);
    navigate('Read', {book: book, chapter: chapter-1 });
  }

  renderRow(rowData) {
    const chapter = parseInt(rowData.chapter);

    return (
      <TouchableOpacity onPress={() => this.readBook(chapter)}>
      <Card
        title={`Chapter ` + chapter}>
        <Text h4>{rowData.title}</Text>
      </Card>
      </TouchableOpacity>
    )
  }

  render() {
    const bookData = this.props.navigation.state.params;
    const book = BookData.getData(bookData.filename);
    const bookImg = BookImagesData.getData(bookData.filename.replace('.json', '.jpg'));
    return (
      <View>
        <Tile
          featured
          height={130}
          imageSrc={bookImg}
          title={bookData.title}
          caption={bookData.author}
        />

        <List containerStyle={{marginBottom: 265}}>
          <FlatList
            renderItem={({ item }) => {return this.renderRow(item);}}
            data={book}
            keyExtractor={(item, index) => index}
          />
        </List>
      </View> 
    );
  }
}

BookDetails.navigationOptions = {
  title: 'Details',
};
