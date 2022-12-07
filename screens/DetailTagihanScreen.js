import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
  View,
} from "native-base";
import { useState } from "react";
import { useContext, useEffect, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text as TextRN,
} from "react-native";
import { Context as DataContext } from "../context/DataContext";

const DetailTagihan = ({ route }) => {
  const { id } = route.params;
  const { state, getDetailsTagihan } = useContext(DataContext);
  const { state: stateMember } = useContext(DataContext);
  useLayoutEffect(() => {
    getDetailsTagihan(id);
  }, [id]);
  return (
    <>
      <SafeAreaView>
        <Box h={"100%"} justifyContent="center" bg="white">
          {state.isLoading ? (
            <View justifyContent={"center"} height={"100%"}>
              <ActivityIndicator size="large" color="#1a0ccd" />
            </View>
          ):(
          <Box p={"5"}>
            <Center mt={"12"} mb={"10"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {stateMember.member.anggota_name}
              </Text>
              <Text py={"2"}>Berikut adalah detail tagihan anda</Text>
            </Center>
            <HStack p="2" backgroundColor={"light.200"} mt={"10"}>
              <Text fontSize={"md"} flex="1">
                Bulan/Tahun
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                {state.detailTagihan.bulan}/{state.detailTagihan.tahun}
              </Text>
            </HStack>
            <HStack p="2">
              <Text fontSize={"md"} flex={1}>
                Tipe
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                {state.detailTagihan.type}
              </Text>
            </HStack>
            <HStack p="2" backgroundColor={"light.200"}>
              <Text fontSize={"md"} flex="1">
                Status
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                {state.detailTagihan.status}
              </Text>
            </HStack>
            <Center mt={"24"} mb={"7"}>
              <Text fontSize={"lg"} fontWeight={"semibold"}>
                Jumlah Tagihan
              </Text>
              <Heading style={style.currencyStyle}>
                Rp. {state.detailTagihan.amount},00
              </Heading>
            </Center>
          </Box>
          )}
        </Box>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  currencyStyle: {
    paddingVertical: 10,
    color: "#1a0ccd",
    fontWeight: "bold",
  },
});

export default DetailTagihan;
