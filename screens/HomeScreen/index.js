import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { Body, Card, CardItem } from 'native-base';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import * as authActions from '../../store/actions/auth';

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  cardContainer: {
    justifyContent: 'center',
    marginTop: '30%',
  },
  menuContainer: {
    flex: 1,
    marginTop: '15%',
  },
  menuCard: {
    opacity: 0.8,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Home screen</Text>
        <View style={styles.menuContainer}>
          <Card style={styles.menuCard}>
            <CardItem
              button
              onPress={() => {
                navigation.navigate('Screen 3');
              }}
            >
              <Body>
                <Text style={styles.menuText}>Screen 3</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.menuCard}>
            <CardItem
              button
              onPress={() => {
                dispatch(authActions.logout());
              }}
            >
              <Body>
                <Text style={styles.menuText}>Signout</Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export const screenOptions = navData => ({
  headerTitle: 'Home',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {}}
      />
    </HeaderButtons>
  ),
});

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
