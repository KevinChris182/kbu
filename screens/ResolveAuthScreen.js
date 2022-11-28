import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      tryLocalSignin();
    });

    return unsubscribe;
  }, [navigation]);

  return null;
};

export default ResolveAuthScreen;
