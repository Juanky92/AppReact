import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    try {
      await Facebook.initializeAsync("222768705393596");
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync(
        FacebookApi.application_id,
        { permissions: FacebookApi.permissions }
      );

      if (type === "success") {
        setIsVisibleLoading(true);
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show(
              "Error accediendo con Facebook, inténtelo más tarde"
            );
          });
      } else if (type === "cancel") {
        toastRef.current.show("Inicio de sesión cancelado");
      } else {
        toastRef.current.show("Error desconocido, inténtelo más tarde");
      }
      setIsVisibleLoading(false);
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <>
      <SocialIcon
        title="Iniciar sesion con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading text="Iniciando sesion" isVisible={isVisibleLoading} />
    </>
  );
}
