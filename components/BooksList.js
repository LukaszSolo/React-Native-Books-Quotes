import React, { Component } from 'react';
import Fuse from 'fuse.js';

import { NavigationActions } from 'react-navigation';
import {SearchBar, List, ListItem, Avatar } from 'react-native-elements'
import {View, FlatList} from 'react-native';

import BookImagesData from './assets/BookImagesData';

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

  renderRow(rowData) {
    const bookImg = BookImagesData.getData(rowData.filename.replace('.json', '.jpg'));
    return (
      <ListItem onPress={() => this.onPress(rowData)}
        roundAvatar
        title={rowData.title}
        hideChevron={true}
        subtitle={rowData.author}
        avatar={<Avatar medium
                rounded
                source={bookImg}
                />}
      />
    )
  }

  
  render() {
    return (
      <View>
        <SearchBar lightTheme 
          onChangeText={this.filterBooks}
          onClearText={this.clearSearch}
          placeholder='Book Name or Author' />
          
        <List>
          <FlatList
            renderItem={({ item }) => {return this.renderRow(item);}}
            data={this.state.searchResults}
            keyExtractor={(item, index) => index}
          />
        </List>
      
      </View>
    );
  }
}

BooksList.navigationOptions = {
  title: 'List',
};