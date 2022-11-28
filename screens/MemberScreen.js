import {
  Button,
  Box,
  Text,
  Image,
  VStack,
  HStack,
  ScrollView,
  Spinner,
  Heading,
  Icon,
  Badge,
} from "native-base";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AvartarCard from "../components/AvatarCard";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { Dimensions, RefreshControl } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MemberScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { state, getMemberData, getRegisterStatus } = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getMemberData();

    if (!state.registerStatusSpinner) {
      getRegisterStatus();
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMemberData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const determineIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return "pdffile1";
    } else if (fileType.includes("jpeg")) {
      return "jpgfile1";
    } else if (fileType.includes("jpg")) {
      return "jpgfile1";
    } else if (fileType.includes("word")) {
      return "wordfile1";
    } else {
      return "file1";
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {state.isLoading ? (
          <HStack
            space={2}
            justifyContent="center"
            height={Dimensions.get("screen").height - 120}
            alignItems="center"
          >
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        ) : (
          <>
            {state.member && state.memberDetail ? (
              <>
                <AvartarCard user={state.user} member={state.member} />
                <Box p={"5"}>
                  <HStack>
                    <Text fontSize={"md"} fontWeight={"bold"}>
                      Keanggotaan
                    </Text>
                  </HStack>
                  <HStack p="2">
                    <Text fontSize={"md"} flex="1.5">
                      Nomor anggota
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.nomor_anggota}
                    </Text>
                  </HStack>
                  <HStack p="2" backgroundColor={"light.200"}>
                    <Text fontSize={"md"} flex="1.5">
                      Nama anggota
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.anggota_name}
                    </Text>
                  </HStack>
                  <HStack p="2">
                    <Text fontSize={"md"} flex="1.5">
                      NIP
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.nip}
                    </Text>
                  </HStack>
                  <HStack p="2">
                    <Text fontSize={"md"} flex="1.5">
                      Tipe anggota
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.tipe_anggota}
                    </Text>
                  </HStack>
                  <HStack p="2" backgroundColor={"light.200"}>
                    <Text fontSize={"md"} flex="1.5">
                      Status
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.status === 0 ? "Tidak aktif" : "Aktif"}
                    </Text>
                  </HStack>
                  <HStack p="2">
                    <Text fontSize={"md"} flex="1.5">
                      Autodebet
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
                      {state.member.is_autodebet ? "Ya" : "Tidak"}
                    </Text>
                  </HStack>
                </Box>
                {state.member && state.member.status !== 1 && (
                  <Box p={"5"}>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"md"} fontWeight={"bold"}>
                        Pendaftaran Keanggotaan
                      </Text>
                      <Button
                        onPress={() => navigation.navigate("EditMember")}
                        size={"lg"}
                        colorScheme={"primary"}
                        variant="ghost"
                        leftIcon={
                          <Icon
                            as={FontAwesome}
                            name="pencil-square-o"
                            size="sm"
                          />
                        }
                      >
                        Ubah data
                      </Button>
                    </HStack>
                    <HStack p="2">
                      <Text fontSize={"md"} flex="1.5">
                        Status
                      </Text>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        flex="2"
                        pl={"2"}
                      >
                        {state.registerStatusSpinner
                          ? state.registerStatusSpinner[
                              `${state.memberDetail.register.status}`
                            ]
                          : "-"}
                      </Text>
                    </HStack>
                    <HStack p="2" backgroundColor={"light.200"}>
                      <Text fontSize={"md"} flex="1.5">
                        Cicilan
                      </Text>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        flex="2"
                        pl={"2"}
                      >
                        {state.memberDetail.register.cicilan ? "Ya" : "Tidak"}
                      </Text>
                    </HStack>
                    <HStack p="2">
                      <Text fontSize={"md"} flex="1.5">
                        Catatan Evaluasi
                      </Text>
                      {state.memberDetail.register.catatan_evaluasi ? (
                        <VStack flex="2" pl={"2"}>
                          {state.memberDetail.register.catatan_evaluasi.map(
                            (item) => (
                              <VStack mb={"2"}>
                                <Badge colorScheme="info">{item.status}</Badge>
                                <Text pl={"2"}>{item.catatan}</Text>
                              </VStack>
                            )
                          )}
                        </VStack>
                      ) : (
                        <Text
                          fontSize={"md"}
                          fontWeight={"bold"}
                          flex="2"
                          pl={"2"}
                        >
                          -
                        </Text>
                      )}
                    </HStack>
                    <HStack p="2" backgroundColor={"light.200"}>
                      <Text fontSize={"md"} flex="1.5">
                        Berkas
                      </Text>
                      {state.memberDetail.register.files.length ? (
                        <VStack flex="2">
                          {state.memberDetail.register.files.map((file) => (
                            <HStack
                              key={file.id}
                              backgroundColor={"gray.100"}
                              p={"3"}
                              borderRadius={"md"}
                              shadow={"1"}
                            >
                              <AntDesign
                                name={determineIcon(file.mime)}
                                size={24}
                                color="black"
                              />
                              <Text
                                key={file.name}
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                pl={"2"}
                                numberOfLines={1}
                                flex={1}
                              >
                                {file.original_name}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      ) : (
                        <Text fontSize={"md"} fontWeight={"bold"} pl={"2"}>
                          -
                        </Text>
                      )}
                    </HStack>
                  </Box>
                )}
                {state.memberDetail.resign && (
                  <Box p={"5"}>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"md"} fontWeight={"bold"}>
                        Resign Keanggotaan
                      </Text>
                      <Button
                        onPress={() => navigation.navigate("EditResign")}
                        size={"lg"}
                        colorScheme={"primary"}
                        variant="ghost"
                        leftIcon={
                          <Icon
                            as={FontAwesome}
                            name="pencil-square-o"
                            size="sm"
                          />
                        }
                      >
                        Ubah data
                      </Button>
                    </HStack>
                    <HStack p="2">
                      <Text fontSize={"md"} flex="1.5">
                        Status
                      </Text>
                      <Text
                        fontSize={"md"}
                        fontWeight={"bold"}
                        flex="2"
                        pl={"2"}
                      >
                        {state.registerStatusSpinner
                          ? state.registerStatusSpinner[
                              `${state.memberDetail.resign.status}`
                            ]
                          : "-"}
                      </Text>
                    </HStack>
                    <HStack p="2">
                      <Text fontSize={"md"} flex="1.5">
                        Catatan Evaluasi
                      </Text>
                      {state.memberDetail.resign.catatan_evaluasi ? (
                        <VStack flex="2" pl={"2"}>
                          {state.memberDetail.resign.catatan_evaluasi.map(
                            (item) => (
                              <VStack mb={"2"}>
                                <Badge colorScheme="info">{item.status}</Badge>
                                <Text pl={"2"}>{item.catatan}</Text>
                              </VStack>
                            )
                          )}
                        </VStack>
                      ) : (
                        <Text
                          fontSize={"md"}
                          fontWeight={"bold"}
                          flex="2"
                          pl={"2"}
                        >
                          -
                        </Text>
                      )}
                    </HStack>
                    <HStack p="2" backgroundColor={"light.200"}>
                      <Text fontSize={"md"} flex="1.5">
                        Berkas
                      </Text>
                      {state.memberDetail.resign.files.length ? (
                        <VStack flex="2">
                          {state.memberDetail.resign.files.map((file) => (
                            <HStack
                              key={file.id}
                              backgroundColor={"gray.100"}
                              p={"3"}
                              borderRadius={"md"}
                              shadow={"1"}
                            >
                              <AntDesign
                                name={determineIcon(file.mime)}
                                size={24}
                                color="black"
                              />
                              <Text
                                key={file.name}
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                pl={"2"}
                                numberOfLines={1}
                                flex={1}
                              >
                                {file.original_name}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      ) : (
                        <Text
                          fontSize={"md"}
                          fontWeight={"bold"}
                          pl={"2"}
                          flex="2"
                        >
                          -
                        </Text>
                      )}
                    </HStack>
                  </Box>
                )}
              </>
            ) : (
              <Box
                mt={"200"}
                p={"5"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  source={require("../assets/anggota.png")}
                  width={"150"}
                  height={"150"}
                  alt="anggota"
                ></Image>
                <Text
                  textAlign={"center"}
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  mb={"5"}
                >
                  Anda belum terdaftar sebagai anggota, Silahkan ajukan
                  keanggotaan.
                </Text>
                <Button
                  width={"100%"}
                  size={"lg"}
                  colorScheme={"indigo"}
                  onPress={() => {
                    navigation.navigate("RegisterMember");
                  }}
                >
                  Ajukan Keanggotaan
                </Button>
              </Box>
            )}
            <VStack px={"5"}>
              <Button
                onPress={logout}
                size={"lg"}
                colorScheme={"danger"}
                variant="outline"
                mb={"5"}
                leftIcon={<Icon as={AntDesign} name="logout" size="sm" />}
              >
                Logout
              </Button>
              {state.member &&
                state.memberDetail &&
                !state.memberDetail.resign && (
                  <Button
                    onPress={() => {
                      navigation.navigate("Resign");
                    }}
                    size={"lg"}
                    colorScheme={"danger"}
                    variant="outline"
                    mb={"50"}
                  >
                    Ajukan Pengunduran Diri
                  </Button>
                )}
            </VStack>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberScreen;
