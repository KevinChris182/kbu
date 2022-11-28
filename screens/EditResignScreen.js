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

const EditResignScreen = ({ navigation }) => {
  const { state, editResign, clearErrorMessage } = useContext(DataContext);
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

  const validateForm = (type) => {
    let errorMessages = [];
    if (type) {
      switch (type) {
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
        default:
          break;
      }
    } else {
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
      editResign({
        files,
        id: state.memberDetail.resign.id,
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
              Ubah Data Pengunduran Diri Anggota Koperasi
            </Text>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>
                  Mohon upload formulir pengunduran diri (file berupa pdf, doc
                  atau docx, jpg, jpeg, png maksimal 5MB)
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

export default EditResignScreen;
