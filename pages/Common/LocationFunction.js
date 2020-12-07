// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useLinkProps } from '@react-navigation/native';
import locationJson from '../data/locationData.json';

const LocationPage = (props) => {
  const [search, setSearch] = useState('');
  const [hkEast, setHkEast] = useState('');
  const [hkNorth, setHkNorth] = useState('');
  const [loadingList, setLoadingList] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   let { status } = await Location.requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //   }
    //   const location = await Location.getCurrentPositionAsync();

    //   var locationAPI = `http://www.geodetic.gov.hk/transform/v2/?inSys=wgsgeog&outSys=hkgrid&lat=${location.coords.latitude}&long=${location.coords.longitude}&h=23.128`;
    //   fetch(locationAPI)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       let hkEast = responseJson.hkE;
    //       let hkNorth = responseJson.hkN;
    //       setHkEast(hkEast);
    //       setHkNorth(hkNorth);
    //       findNearBy();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // fetchData();
    setFilteredDataSource(locationJson);
    setMasterDataSource(locationJson);
  }, []);

  const findNearBy = () => {
    // setLoadingList(true);
    // var nearbyPlace = `https://geodata.gov.hk/gs/api/v1.0.0/searchNearby?x=${hkEast}&y=${hkNorth}&lang=en`
    // fetch(nearbyPlace)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setFilteredDataSource(responseJson);
    //     setMasterDataSource(responseJson);
    //     setLoadingList(false);
    //   })
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>
            {item.address.toUpperCase()}
          </Text>
        </View>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {

    // Function for click on an item
    alert('Place : ' + item.name + ' Address : ' + item.address);
    console.log("setLocation");
    props.setLocation(item);
  };

  const renderFooter = () => {
    return loadingList ? <View><Text>Loading...</Text></View> : <></>
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchcontainer}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        {/* <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() =>
            findNearBy()
          }>
          <FontAwesome
            name="map-marker"
            style={{ color: "black", fontSize: 30 }}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() =>
            findNearBy()
          }>
          <FontAwesome
            name="map-marker"
            style={{ color: "black", fontSize: 30 }}
          />
        </TouchableOpacity> */}
        <FlatList
          data={filteredDataSource}
          renderFooter={renderFooter.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  searchcontainer: {
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white'
  },
  buttoncontainer: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});

export default LocationPage;
