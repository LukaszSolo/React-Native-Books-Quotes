import React from 'react';

import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'; 

import BooksList from '../components/BooksList';
import BooksImageList from '../components/BooksImageList';
import BookDetails from '../components/BookDetails';
import BookRead from '../components/BookRead';

const MainScreenNavigator = TabNavigator({
  List: { screen: BooksList,
  	navigationOptions: {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'library' : 'bookmark-outline'}
            size={30}
            type="material-community"
            color={tintColor}
          />
        )
    }
   },
  ImageList: { screen: BooksImageList,
  	  	navigationOptions: {
        tabBarLabel: 'Covers',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'image-filter' : 'image-filter-none'}
            size={30}
            type="material-community"
            color={tintColor}
          />
        )
    }

   },
});

export const AppNavigator = StackNavigator({
	Root: {screen: MainScreenNavigator},
 	Details: { screen: BookDetails },
 	Read: { screen: BookRead }
});

export default class AppWithNavigationState extends React.Component {
	render() {
		return (<AppNavigator />)
	}
}