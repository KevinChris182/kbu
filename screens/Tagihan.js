import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Context as DataContext } from "../context/DataContext";
import { Heading, Text, VStack, HStack, Badge, Box, Image, Button, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const currencyFormatter = (value, options) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "",
  };

  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);
  
  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};


const Tagihan = () => {
  const navigation = useNavigation();
  const { state, getDataTagihan, getMoreTagihan } = useContext(DataContext);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  const renderEmpty = () => (
    <View height={windowHeight - 120}>
      <Box
        p={"5"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"full"}
      >
        <Image
          source={require("../assets/simpanan.png")}
          width={"120"}
          height={"120"}
          alt="simpanan"
        />
        <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} my={"5"}>
          Tidak ada data simpanan.
        </Text>
        <Button variant={"ghost"} onPress={() => getDataTagihan()}>
          Refresh
        </Button>
      </Box>
    </View>
  );

  const handlePagination = () => {
    // console.log(state.tagihanMeta?.next);
    if (
      state.tagihanMeta &&
      state.tagihanMeta.next !== null &&
      !state.isMoreLoading
    ) {
      getMoreTagihan(state.tagihanMeta.next.split("=")[1]);
    }
  };

  useEffect(() => {
    getDataTagihan();
  }, []);
  return (
    <FlatList
      style={[styles.tagihanWrapper]}
      data={state.tagihan}
      contentContainerStyle={{flexGrow: 1}}
      ItemSeparatorComponent={() => (
        <View backgroundColor={"gray.200"} style={{marginTop: 7}}></View>
      )}
      ListHeaderComponent={() => (
        <HStack p="5">
          <Heading>List Tagihan</Heading>
        </HStack>
      )}
      ListEmptyComponent={renderEmpty}
      initialNumToRender={1}
      keyExtractor={(item, index) => index}
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum) {
          handlePagination();
          setOnEndReachedCalledDuringMomentum(true);
        }
      }}
      onMomentumScrollBegin={() => {
        setOnEndReachedCalledDuringMomentum(false);
      }}
      renderItem={({ item }) => (
        <Pressable onPress={()=>navigation.navigate('TagihanDetail', {id: item.id, anggota_id: item.anggota_id})} >
          {({isPressed}) => (
            <HStack space="2.5" p={"5"} h={"100"} bg={isPressed ? 'coolGray.200' : 'white'} shadow="6">
              <VStack w='1/2' >
              <Badge
                variant="solid"
                colorScheme={item.type === 1 ? "success" : "info"}
                alignSelf={"flex-start"}
                borderRadius={"4"}
              >
                {item.type === 1
                  ? "SIMPANAN POKOK"
                  : item.type === 2
                  ? "SIMPANAN WAJIB"
                  : "SIMPANAN SUKARELA"}
              </Badge>
              <Text>Sumber: {item.source}</Text>
              <Text size={"sm"} italic>
                {item.bulan} - {item.tahun}
              </Text>
              </VStack>
              <Text
                style={styles.currencyStyle}
                fontSize= {"md"}
              >
                Rp.{currencyFormatter(Number(item.amount.split(".")[0]))}
              </Text>
            </HStack>
          )}
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tagihanWrapper: {
    width: "100%"
  },
  cardWrapper: {
    opacity: 3
  },
  textWhite: {
    color: "white"
  },
  currencyStyle: {
    color: "#1a0ccd",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "right",
    flex: 1
  }
})

export default Tagihan;
