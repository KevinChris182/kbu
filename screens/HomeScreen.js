import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  ScrollView,
  Text,
  Link,
  Image,
  View,
} from "native-base";
import React, { useEffect, useContext } from "react";
import Footer from "../components/Footer";
import AvartarCard from "../components/AvatarCard";
import CreditLimit from "../components/CreditLimit";
import Savings from "../components/Savings";
import Transaction from "../components/Transaction";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as DataContext } from "../context/DataContext";

const HomeScreen = () => {
  const { state, getData } = useContext(DataContext);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        width={"100%"}
        backgroundColor={"white"}
        paddingBottom={"100"}
        minHeight={"full"}
      >
        <Text
          mt={"5"}
          fontSize={"lg"}
          fontWeight={"bold"}
          color="#1a0ccd"
          textAlign={"center"}
          width="100%"
        >
          Hi, Selamat datang!
        </Text>
        <AvartarCard user={state.user} member={state.member} />
        <HStack mx={"5"} mb={"2"} justifyContent={"space-between"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Statistik
          </Text>
        </HStack>
        <VStack mx={"5"} mb={"3"} space={"3"}>
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
          <Box backgroundColor={"#e9e7fd"} p={"4"} borderRadius={"12"}>
            <HStack space={"3"}>
              <Image
                source={require("../assets/pinjaman.png")}
                width={"50"}
                height={"50"}
                alt="pinjaman"
              ></Image>

              <VStack>
                <Text fontSize={"sm"}>Total Pinjaman</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Rp.{state.statistic ? state.statistic.total_pinjaman : "0"}
                  ,00
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Box backgroundColor={"#e9e7fd"} p={"4"} borderRadius={"12"}>
            <HStack space={"3"}>
              <Image
                source={require("../assets/investasi.png")}
                width={"50"}
                height={"50"}
                alt="investasi"
              ></Image>

              <VStack>
                <Text fontSize={"sm"}>Total Investasi</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Rp.
                  {state.statistic ? state.statistic.total_investasi : "0"},00
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Box backgroundColor={"#e9e7fd"} p={"4"} borderRadius={"12"}>
            <HStack space={"3"}>
              <Image
                source={require("../assets/simpan.png")}
                width={"50"}
                height={"50"}
                alt="shu"
              ></Image>

              <VStack>
                <Text fontSize={"sm"}>Total SHU</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Rp.{state.statistic ? state.statistic.total_shu : "0"},00
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Box backgroundColor={"#e9e7fd"} p={"4"} borderRadius={"12"}>
            <HStack space={"3"}>
              <Image
                source={require("../assets/tagihan.png")}
                width={"50"}
                height={"50"}
                alt="shu"
              ></Image>

              <VStack>
                <Text fontSize={"sm"}>Total Tagihan Simpanan</Text>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Rp.
                  {state.statistic
                    ? state.statistic.total_tagihan_simpanan
                    : "0"}
                  ,00
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
        {/* <HStack mx={"5"} mb={"2"} justifyContent={"space-between"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Transaksi
          </Text>
          <Link>Semua</Link>
        </HStack>
        <ScrollView maxHeight={"1/3"}>
          <Transaction
            type="credit"
            amount="1.000.000"
            desc="Setoran simpanan"
            date="07/08/2022"
          />
          <Transaction
            type="debit"
            amount="200.000"
            desc="Pembayaran pinjaman"
            date="07/08/2022"
          />
          <Transaction
            type="credit"
            amount="1.000.000"
            desc="Setoran simpanan"
            date="07/08/2022"
          />
          <Transaction
            type="debit"
            amount="200.000"
            desc="Pembayaran pinjaman"
            date="07/08/2022"
          />
        </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
