import React, { Component } from 'react';
import Fuse from 'fuse.js';

import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import {
Card,
Divider,
Screen,
ListView,
Row,
Image,
Title,
Subtitle,
TouchableOpacity,
Caption,
Button,
Icon
} from '@shoutem/ui';

import BookImagesData from './assets/BookImagesData';
import {View} from 'react-native';

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.onPress = this.onPress.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.filterBooks = this.filterBooks.bind(this);

    const options = {
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["author","title"]
    };

    this.fuse = new Fuse(this.getBooks(), options);

    this.state = {
      currentSearch: '',
      searchResults: this.getBooks(),
    };
  }
  
  getBooks() {
    return require('../assets/all.json')
  }

  clearSearch() {
    this.setState({
      currentSearch: '',
      searchResults: this.getBooks(),
    });
  }

  filterBooks(search) {
    if (search.length < 3) {
      return;
    }

    queries = search.toLowerCase().split(' ')
    this.setState({currentSearch: search})

    var result = this.fuse.search(search);
    this.setState({searchResults: result})
  }

  onPress(bookData) {
    const { navigate } = this.props.navigation;
    navigate('Details', bookData);
  }

  renderRow(rowData, sectionId, index) {
    const bookImg = BookImagesData.getData(rowData.filename.replace('.json', '.jpg'));
    return (

      <TouchableOpacity onPress={() => this.onPress(rowData)}>
      <Row>
        <Image
        styleName="small-avatar top"
          source={bookImg}
        />

        <View styleName="vertical stretch space-between">
          <Subtitle>{rowData.title}</Subtitle>
          <View styleName="horizontal space-between">
            <Caption>{rowData.author}</Caption>
          </View>
          <Divider styleName="line" />
        </View>
      </Row>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Screen>
        <SearchBar lightTheme 
          onChangeText={this.filterBooks}
          onClearText={this.clearSearch}
          placeholder='Book Name or Author' />
        <ListView data={this.state.searchResults} renderRow={this.renderRow} />
      </Screen> 
    );
  }
}

BooksList.navigationOptions = {
  title: 'List',
};