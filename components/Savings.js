import React from "react";
import { Dimensions } from "react-native";
import {
  Box,
  Center,
  ScrollView,
  Avatar,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Image,
  Progress,
} from "native-base";

const Savings = () => {
  return (
    <Box backgroundColor={"#d1cff5"} p={"4"} borderRadius={"12"} mx={"5"}>
      <HStack alignItems="center" space={3}>
        <Image
          source={require("../assets/simpanan.png")}
          width={"50"}
          height={"50"}
          alt="simpanan"
        ></Image>
        <VStack>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Rp. 10.000.000
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Savings;
