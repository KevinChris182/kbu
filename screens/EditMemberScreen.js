import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Text,
  VStack,
  Center,
  FormControl,
  Input,
  Box,
  Image,
  Select,
  CheckIcon,
  Checkbox,
  Button,
  HStack,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "native-base";
import { Context as DataContext } from "../context/DataContext";
import { ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const EditMemberScreen = ({ navigation }) => {
  const { state, editMember, clearErrorMessage } = useContext(DataContext);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("1");
  const [bankNumber, setBankNumber] = useState("");
  const [nip, setNip] = useState("");
  const [memberType, setMemberType] = useState("1");
  const [instalment, setInstalment] = useState(false);
  const [autoDebet, setAutoDebet] = useState(false);
  const [files, setFiles] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (state.errorMessage) {
      toast.show({
        description: state.errorMessage,
        placement: "top",
        duration: 3000,
      });
      clearErrorMessage();
      setIsLoading(false);
    }
  }, [state.errorMessage]);

  useEffect(() => {
    if (state.member && state.memberDetail) {
      setName(state.member.anggota_name);
      setNip(state.member.nip);
      setMemberType(state.member.tipe_anggota === "Anggota Biasa" ? "1" : "2");
      setInstalment(state.memberDetail.register.cicilan);
      setAutoDebet(state.member.is_autodebet);
    }
  }, [state.member, state.memberDetail]);

  const validateForm = (type) => {
    let errorMessages = [];
    if (type) {
      switch (type) {
        case "name":
          if (!name) {
            setErrorMessages((arr) => {
              if (!arr.includes("name-required")) {
                return [...arr, "name-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("name-required")) {
              errorMessages.push("name-required");
            }
          }
          break;
        case "nip":
          if (!nip) {
            setErrorMessages((arr) => {
              if (!arr.includes("nip-required")) {
                return [...arr, "nip-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("nip-required")) {
              errorMessages.push("nip-required");
            }
          }
          break;
        case "files":
          if (!files.length) {
            setErrorMessages((arr) => {
              if (!arr.includes("file-required")) {
                return [...arr, "file-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("file-required")) {
              errorMessages.push("file-required");
            }
          }
          break;
        case "bankNumber":
          if (!bankNumber) {
            setErrorMessages((arr) => {
              if (!arr.includes("bankNumber-required")) {
                return [...arr, "bankNumber-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("bankNumber-required")) {
              errorMessages.push("bankNumber-required");
            }
          }
          break;
        default:
          break;
      }
    } else {
      if (!name) {
        setErrorMessages((arr) => {
          if (!arr.includes("name-required")) {
            return [...arr, "name-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("name-required")) {
          errorMessages.push("name-required");
        }
      }
      if (!nip) {
        setErrorMessages((arr) => {
          if (!arr.includes("nip-required")) {
            return [...arr, "nip-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("nip-required")) {
          errorMessages.push("nip-required");
        }
      }
      if (!files.length) {
        setErrorMessages((arr) => {
          if (!arr.includes("file-required")) {
            return [...arr, "file-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("file-required")) {
          errorMessages.push("file-required");
        }
      }
      if (!bankNumber) {
        setErrorMessages((arr) => {
          if (!arr.includes("bankNumber-required")) {
            return [...arr, "bankNumber-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("bankNumber-required")) {
          errorMessages.push("bankNumber-required");
        }
      }
    }

    return errorMessages;
  };

  const resetErrorMessages = (message) => {
    if (message) {
      setErrorMessages((arr) => {
        if (arr.includes(message)) {
          return arr.filter((item) => item !== message);
        } else {
          return arr;
        }
      });
    }
  };

  const handleSubmit = () => {
    const errorMessages = validateForm();
    if (errorMessages.length === 0) {
      setIsLoading(true);
      editMember({
        name,
        nip,
        memberType,
        instalment,
        files,
        autoDebet,
        id: state.memberDetail.register.id,
        bank,
        bankNumber,
      });
    }
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/*",
        ],
      });
      const { uri, name, mimeType, size } = response;
      const file = { type: mimeType, uri, name, size };
      setFiles((prevState) => [...prevState, file]);
      resetErrorMessages("file-required");
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleDeleteFile = (file) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Center w="100%">
          <VStack
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            w="100%"
            p="3"
          >
            <Button
              size="lg"
              variant="ghost"
              leftIcon={<Icon as={Ionicons} name="chevron-back" size="sm" />}
              onPress={() => {
                navigation.navigate("Tabs");
              }}
            >
              Kembali
            </Button>
          </VStack>
          <Box pb="50" w="90%" maxW="290">
            <Image
              source={require("../assets/icon.png")}
              width={"100"}
              height={"100"}
              alignSelf="center"
              alt="logo"
            />
            <Text fontSize={"lg"} fontWeight={"bold"} textAlign="center">
              Ubah Data Anggota Koperasi
            </Text>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Nama Lengkap</FormControl.Label>
                <Input
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    resetErrorMessages("name-required");
                  }}
                  onEndEditing={() => validateForm("name")}
                />
                {errorMessages && errorMessages.includes("name-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Nama Lengkap tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>NIP</FormControl.Label>
                <Input
                  autoCapitalize={"characters"}
                  value={nip}
                  onChangeText={(value) => {
                    setNip(value);
                    resetErrorMessages("nip-required");
                  }}
                  onEndEditing={() => validateForm("nip")}
                />
                {errorMessages && errorMessages.includes("nip-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    NIP tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Pilih Tipe Anggota</FormControl.Label>
                <Select
                  selectedValue={memberType}
                  minWidth="200"
                  accessibilityLabel="Pilih Tipe Anggota"
                  placeholder="Pilih Tipe Anggota"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setMemberType(itemValue)}
                >
                  <Select.Item label="Anggota biasa" value="1" />
                  <Select.Item label="Anggota luar biasa" value="2" />
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Nomor Rekening</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  value={bankNumber}
                  onChangeText={(value) => {
                    setBankNumber(value);
                    resetErrorMessages("bankNumber-required");
                  }}
                  onEndEditing={() => validateForm("bankNumber")}
                />
                {errorMessages &&
                errorMessages.includes("bankNumber-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Nomor rekening tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Pilih Bank</FormControl.Label>
                <Select
                  selectedValue={bank}
                  minWidth="200"
                  accessibilityLabel="Pilih Bank"
                  placeholder="Pilih Bank"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => {
                    setBank(itemValue);
                    setAutoDebet(false);
                  }}
                >
                  <Select.Item label="Bank Negara Indonesia (BNI)" value="1" />
                  <Select.Item label="Bank Rakyat Indonesia (BRI)" value="2" />
                  <Select.Item label="Bank Mandiri" value="3" />
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Mohon upload Pernyataan tidak terdaftar di koperasi lain dan
                  atau surat pernyataan sudah keluar dari keanggotaan koperasi
                  sebelumnya (file berupa pdf, doc atau docx, jpg, jpeg, png
                  maksimal 5MB)
                </FormControl.Label>
                <Button
                  my={"3"}
                  colorScheme={"indigo"}
                  size={"lg"}
                  onPress={handleDocumentSelection}
                  variant="outline"
                >
                  Pilih berkas 📑
                </Button>
                {files.length ? (
                  <VStack>
                    {files.map((file) => (
                      <HStack
                        key={file.name}
                        mt={"3"}
                        p={"3"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        backgroundColor={"indigo.100"}
                        borderRadius={"lg"}
                      >
                        <Text fontSize="sm" maxWidth={"90%"}>
                          {file.name}
                        </Text>
                        <MaterialCommunityIcons
                          name="close"
                          size={24}
                          color="black"
                          onPress={() => handleDeleteFile(file)}
                        />
                      </HStack>
                    ))}
                  </VStack>
                ) : null}
                {errorMessages && errorMessages.includes("file-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    File tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <Checkbox
                  onPress={() => {
                    setInstalment(!instalment);
                  }}
                  colorScheme={"indigo"}
                  isSelected={instalment}
                >
                  Bayar dengan cicilan
                </Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox
                  isDisabled={bank !== "1"}
                  onPress={() => setAutoDebet(!autoDebet)}
                  colorScheme={"indigo"}
                  isSelected={autoDebet}
                >
                  Gunakan auto debet (khusus Bank BNI)
                </Checkbox>
              </FormControl>
              <Button
                my={"3"}
                colorScheme={"indigo"}
                size={"lg"}
                onPress={handleSubmit}
                isLoading={isLoading}
              >
                Kirim
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditMemberScreen;
