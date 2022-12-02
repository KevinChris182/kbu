import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  View,
  Button,
  HStack,
  VStack,
  Icon,
  Pressable,
  Center,
  useColorModeValue,
} from "native-base";
import { TabView, SceneMap } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as DataContext } from "../context/DataContext";
import { ActivityIndicator, FlatList } from "react-native";
import SavingsCard from "../components/SavingsCard";
import { Dimensions, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Tagihan from "./TagihanScreen";

const FirstRoute = () => (
  <Center flex={1}>
    <Savings />
  </Center>
);

const SecondRoute = () => <Center flex={1}><Tagihan/></Center>;

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Savings = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const { state, getSavings, getMoreSavings } = useContext(DataContext);
  const renderHeader = () => (
    <View>
      {state.savings.length ? (
        <VStack p="5" pb="0" space={"3"}>
          <Box backgroundColor={"#e9e7fd"} p={"4"} borderRadius={"12"}>
            <HStack space={"3"}>
              <Image
                source={require("../assets/simpanan.png")}
                width={"50"}
                height={"50"}
                alt="simpanan"
              ></Image>

              <VStack>
                <Text fontSize={"sm"}>Total Simpanan</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Rp.{state.statistic ? state.statistic.total_simpanan : "0"}
                  ,00
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Button
            onPress={() => {
              navigation.navigate("UploadSavings");
            }}
            size={"lg"}
            colorScheme={"primary"}
            variant="subtle"
            mb={"5"}
            leftIcon={<Icon as={AntDesign} name="clouduploado" size="lg" />}
          >
            Upload konfirmasi simpanan
          </Button>
        </VStack>
      ) : (
        <></>
      )}
    </View>
  );

  useEffect(() => {
    getSavings();
    console.log(state.isLoading);
  }, []);

  const handlePagination = () => {
    // console.log(state.savingsMeta?.next);
    if (
      state.savingsMeta &&
      state.savingsMeta.next !== null &&
      !state.isMoreLoading
    ) {
      getMoreSavings(state.savingsMeta.next.split("=")[1]);
    }
  };

  const renderFooter = () => (
    <View>
      {state.isMoreLoading && (
        <ActivityIndicator color="#1a0ccd" size="small" />
      )}
      {state.savingsMeta && state.savingsMeta.next === null && <Text></Text>}
    </View>
  );

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
        <Button variant={"ghost"} onPress={() => getSavings()}>
          Refresh
        </Button>
      </Box>
    </View>
  );

  return (
    <>
      {state.isLoading ? (
        <View justifyContent={"center"} height={"100%"}>
          <ActivityIndicator size="large" color="#1a0ccd" />
        </View>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          initialNumToRender={15}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ flexGrow: 1 }}
          data={state.savings}
          renderItem={({ item }) => <SavingsCard savings={item} />}
          ItemSeparatorComponent={() => (
            <View backgroundColor={"gray.200"} height={1}></View>
          )}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
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
        />
      )}
    </>
  );
};

const SavingsScreen = ({ navigation }) => {
  {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {
        key: "first",
        title: "Simpanan",
      },
      {
        key: "second",
        title: "Tagihan",
      },
    ]);

    const renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      return (
        <Box flexDirection="row">
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });
            const color =
              index === i
                ? useColorModeValue("#000", "#e5e5e5")
                : useColorModeValue("#1f2937", "#a1a1aa");
            const borderColor =
              index === i
                ? "cyan.500"
                : useColorModeValue("coolGray.200", "gray.400");
            return (
              <Box
                borderBottomWidth="3"
                borderColor={borderColor}
                flex={1}
                alignItems="center"
                p="3"
                key={route+" "+i}
              >
                <Pressable
                  onPress={() => {
                    console.log(i);
                    setIndex(i);
                  }}
                >
                  <Animated.Text
                    style={{
                      color,
                    }}
                  >
                    {route.title}
                  </Animated.Text>
                </Pressable>
              </Box>
            );
          })}
        </Box>
      );
    };

    return (
      <SafeAreaView flex={1}>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    );
  }
};

export default SavingsScreen;
