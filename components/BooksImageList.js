import React, { Component } from 'react';
import Fuse from 'fuse.js';

import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements'
import { Screen, ListView, TouchableOpacity, Card, Image, GridRow} from '@shoutem/ui';
import {View} from 'react-native';
import BookImagesData from './assets/BookImagesData';

export default class BooksImageList extends Component {
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
    const { navigate } = this.props.navigation;
    
    const cellViews = rowData.map((book, id) => {
      const bookImg = BookImagesData.getData(book.filename.replace('.json', '.jpg'));
      return (
        <TouchableOpacity key={id} onPress={() => this.onPress(book)}>
          <Card styleName="flex1ible">
            <Image
              styleName="medium-square"
              source={bookImg}
              resizeMode="cover"
            />
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    const groupedData = GridRow.groupByRows(this.state.searchResults, 2);

    return (
      <Screen>
        <SearchBar lightTheme 
          onChangeText={this.filterBooks}
          onClearText={this.clearSearch}
          placeholder='Book Name or Author' />
        <ListView data={groupedData} renderRow={this.renderRow} />
      </Screen> 
    );
  }
}

BooksImageList.navigationOptions = {
  title: 'Covers',
};