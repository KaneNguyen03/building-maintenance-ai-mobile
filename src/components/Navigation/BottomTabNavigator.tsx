import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../types';

// Import screen components
import HomeScreen from '../../screen/HomeScreen';
import PropertyScreen from '../../screen/PropertyScreen';
import ServicesScreen from '../../screen/ServicesScreen';
import NotificationScreen from '../../screen/NotificationScreen';
import AccountScreen from '../../screen/AccountScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

// Custom tab bar component to match the design
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Define icons for each tab
        let iconName = 'home';
        let iconColor = isFocused ? '#B77F2E' : '#9E9E9E';
        
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Property') {
          iconName = 'file-text-o';
        } else if (route.name === 'Services') {
          iconName = 'shopping-basket';
        } else if (route.name === 'Notification') {
          iconName = 'bell';
        } else if (route.name === 'Account') {
          iconName = 'user-circle';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon name={iconName} size={24} color={iconColor} />
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? '#B77F2E' : '#9E9E9E' }
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Property" component={PropertyScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    height: 70,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default BottomTabNavigator;