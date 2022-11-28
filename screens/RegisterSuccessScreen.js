import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Button, Text } from "native-base";

const RegisterSuccessScreen = ({ navigation }) => {
  return (
    <Box
      p={"5"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"full"}
    >
      <MaterialCommunityIcons
        name="account-multiple-check"
        size={120}
        color="#4f46e5"
      />
      <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} mb={"5"}>
        Data telah terkirim, silahkan tunggu konfirmasi dari admin.
      </Text>
      <Button
        size={"lg"}
        colorScheme={"indigo"}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Selesai
      </Button>
    </Box>
  );
};

export default RegisterSuccessScreen;
