import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const limitRestaurants = 12;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("restaurants")
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    (async () => {
      let resultRestaurants = [];

      const restaurants = db
        .collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurants);

      await restaurants.get().then(response => {
        setStartRestaurants(response.docs[response.docs.lenght - 1]);

        response.forEach(doc => {
          let restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });
        setRestaurants(resultRestaurants);
      });
    })();
  }, []);

  const handleLoadMore = async () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    const restaurantsDb = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

    await restaurantsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartRestaurants(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });

      setRestaurants([...restaurants, ...resultRestaurants]);
    });
  };
  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
      {user && <AddRestaurantsButton navigation={navigation} />}
    </View>
  );
}

function AddRestaurantsButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurants")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
