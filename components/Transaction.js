import React from "react";
import { Box, Center, HStack, Text, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const Transaction = ({ type, desc, amount, date }) => {
  return (
    <Box
      backgroundColor={type === "credit" ? "#e8e7fa" : "#fee6e7"}
      p={"4"}
      borderRadius={"12"}
      mx={"5"}
      my={"1"}
    >
      <HStack alignItems={"center"} width={"100%"}>
        <Center width={"30"} height={"30"}>
          <AntDesign
            name={type === "credit" ? "arrowdown" : "arrowup"}
            size={24}
            color={type === "credit" ? "#1a0dcc" : "#f7030b"}
          />
        </Center>
        <VStack ml={"2"}>
          <Text fontSize={"md"}>{desc}</Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {amount}
          </Text>
        </VStack>
        <Text position={"absolute"} right={"0"}>
          {date}
        </Text>
      </HStack>
    </Box>
  );
};

export default Transaction;
