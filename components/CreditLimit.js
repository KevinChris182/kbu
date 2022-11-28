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

const CreditLimit = () => {
  return (
    <Box backgroundColor={"#d1cff5"} p={"4"} borderRadius={"12"} mx={"5"}>
      <HStack alignItems="center" space={3}>
        <Image
          source={require("../assets/pinjaman.png")}
          width={"50"}
          height={"50"}
          alt="pinjaman"
        ></Image>
        <VStack>
          <Text fontSize={"md"}>Limit Pinjaman</Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Rp. 10.000.000 / 40.000.000
          </Text>
          <Progress value={25} mt={"3"} />
        </VStack>
      </HStack>
    </Box>
  );
};

export default CreditLimit;
