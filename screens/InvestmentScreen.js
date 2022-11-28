import React from "react";
import { Box, Text, Image } from "native-base";

const InvestmentScreen = () => {
  return (
    <Box
      p={"5"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"full"}
    >
      <Image
        source={require("../assets/investasi.png")}
        width={"120"}
        height={"120"}
        alt="investasi"
      />
      <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} my={"5"}>
        Investasi
      </Text>
    </Box>
  );
};

export default InvestmentScreen;
