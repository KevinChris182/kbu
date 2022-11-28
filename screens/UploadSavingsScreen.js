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

const UploadSavingsScreen = ({ navigation }) => {
  const { state, confirmSavings, clearErrorMessage } = useContext(DataContext);
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [source, setSource] = useState("simpanan");
  const [type, setType] = useState("1");
  const [files, setFiles] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (state.errorMessage) {
      console.log(state.errorMessage);
      toast.show({
        description: state.errorMessage,
        placement: "top",
        duration: 3000,
      });
      clearErrorMessage();
      setIsLoading(false);
      setMonth(getCurrMonth());
    }
  }, [state.errorMessage]);

  const validateForm = (type) => {
    let errorMessages = [];
    if (type) {
      switch (type) {
        case "amount":
          if (!amount) {
            setErrorMessages((arr) => {
              if (!arr.includes("amount-required")) {
                return [...arr, "amount-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("amount-required")) {
              errorMessages.push("amount-required");
            }
          }
          break;
        case "month-required":
          if (!month) {
            setErrorMessages((arr) => {
              if (!arr.includes("month-required")) {
                return [...arr, "month-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("month-required")) {
              errorMessages.push("month-required");
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
        case "year":
          if (!year) {
            setErrorMessages((arr) => {
              if (!arr.includes("year-required")) {
                return [...arr, "year-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("year-required")) {
              errorMessages.push("year-required");
            }
          }
          break;
        default:
          break;
      }
    } else {
      if (!amount) {
        setErrorMessages((arr) => {
          if (!arr.includes("amount-required")) {
            return [...arr, "amount-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("amount-required")) {
          errorMessages.push("amount-required");
        }
      }
      if (!month) {
        setErrorMessages((arr) => {
          if (!arr.includes("month-required")) {
            return [...arr, "month-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("month-required")) {
          errorMessages.push("month-required");
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
      if (!year) {
        setErrorMessages((arr) => {
          if (!arr.includes("year-required")) {
            return [...arr, "year-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("year-required")) {
          errorMessages.push("year-required");
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
      confirmSavings({
        amount,
        year,
        month,
        files,
        type,
        source,
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
      if (response.type === "cancel") {
        return;
      }
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

  const generateYears = () => {
    const max = new Date().getFullYear();
    const min = max - 5;
    const years = [];

    for (let i = max; i >= min; i--) {
      years.push(i + "");
    }
    return years;
  };

  const getCurrMonth = () => {
    var month = new Date().getMonth() + 1;
    return month < 10 ? "0" + month : "" + month;
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
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Upload konfirmasi simpanan
            </Text>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Jumlah Simpanan</FormControl.Label>
                <Input
                  type="number"
                  value={amount}
                  onChangeText={(value) => {
                    setAmount(value);
                    resetErrorMessages("amount-required");
                  }}
                  onEndEditing={() => validateForm("amount")}
                />
                {errorMessages && errorMessages.includes("amount-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Jumlah tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Bulan</FormControl.Label>
                <Select
                  selectedValue={month}
                  minWidth="200"
                  accessibilityLabel="Pilih Bulan"
                  placeholder="Pilih Bulan"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setMonth(itemValue)}
                >
                  <Select.Item label="Januari" value="01" />
                  <Select.Item label="Februari" value="02" />
                  <Select.Item label="Maret" value="03" />
                  <Select.Item label="April" value="04" />
                  <Select.Item label="Mei" value="05" />
                  <Select.Item label="Juni" value="06" />
                  <Select.Item label="Juli" value="07" />
                  <Select.Item label="Agustus" value="08" />
                  <Select.Item label="September" value="09" />
                  <Select.Item label="Oktober" value="10" />
                  <Select.Item label="November" value="11" />
                  <Select.Item label="Desember" value="12" />
                </Select>
                {errorMessages && errorMessages.includes("month-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Bulan tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Pilih Tahun</FormControl.Label>
                <Select
                  selectedValue={year}
                  minWidth="200"
                  accessibilityLabel="Pilih Tahun"
                  placeholder="Pilih Tahun"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setYear(itemValue)}
                >
                  {generateYears().map((year) => (
                    <Select.Item key={year} label={year} value={year} />
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Pilih Sumber</FormControl.Label>
                <Select
                  selectedValue={source}
                  minWidth="200"
                  accessibilityLabel="Pilih Sumber"
                  placeholder="Pilih Sumber"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => {
                    setSource(itemValue);
                  }}
                >
                  <Select.Item label="Simpanan" value="simpanan" />
                  <Select.Item
                    label="Register Anggota"
                    value="register_anggota"
                  />
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>Pilih Tipe</FormControl.Label>
                <Select
                  selectedValue={type}
                  minWidth="200"
                  accessibilityLabel="Pilih Tipe"
                  placeholder="Pilih Tipe"
                  _selectedItem={{
                    bg: "indigo.200",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => {
                    setType(itemValue);
                  }}
                >
                  <Select.Item label="Simpanan Pokok" value="1" />
                  <Select.Item label="Simpanan Wajib" value="2" />
                  <Select.Item label="Simpanan Sukarela" value="3" />
                </Select>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Mohon upload bukti transfer (file berupa pdf, doc atau docx,
                  jpg, jpeg, png maksimal 5MB)
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

export default UploadSavingsScreen;
