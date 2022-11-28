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
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";

const AvartarCard = ({ user, member }) => {
  return (
    <Box p={"5"} width={"100%"}>
      <VStack alignItems={"center"}>
        <EvilIcons name="user" size={50} color="black" />
        <Badge
          colorScheme={member ? "success" : "gray"}
          borderRadius={"20"}
          mt={"1"}
        >
          <Text>{member ? "Anggota" : "User Aplikasi"}</Text>
        </Badge>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {user ? user.name : ""}
        </Text>
        <Text fontSize={"sm"}>{user ? user.email : ""}</Text>
      </VStack>
    </Box>
  );
};

export default AvartarCard;
