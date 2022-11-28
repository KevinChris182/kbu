import {
  Box,
  Image,
  Center,
  Input,
  Button,
  VStack,
  FormControl,
  HStack,
  Heading,
  Link,
  Text,
  Icon,
  Pressable,
} from "native-base";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import { useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const { state, login, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState(false);

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
        case "email":
          if (!email) {
            setErrorMessages((arr) => {
              if (!arr.includes("email-required")) {
                return [...arr, "email-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("email-required")) {
              errorMessages.push("email-required");
            }
          }

          break;
        case "password":
          if (!password) {
            setErrorMessages((arr) => {
              if (!arr.includes("password-required")) {
                return [...arr, "password-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("password-required")) {
              errorMessages.push("password-required");
            }
          }

          if (
            !new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(password)
          ) {
            setErrorMessages((arr) => {
              if (!arr.includes("password-invalid")) {
                return [...arr, "password-invalid"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("password-invalid")) {
              errorMessages.push("password-invalid");
            }
          }
          break;
        default:
          break;
      }
    } else {
      if (!email) {
        setErrorMessages((arr) => {
          if (!arr.includes("email-required")) {
            return [...arr, "email-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("email-required")) {
          errorMessages.push("email-required");
        }
      }
      if (!password) {
        setErrorMessages((arr) => {
          if (!arr.includes("password-required")) {
            return [...arr, "password-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("password-required")) {
          errorMessages.push("password-required");
        }
      }
      if (
        !new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(password)
      ) {
        setErrorMessages((arr) => {
          if (!arr.includes("password-invalid")) {
            return [...arr, "password-invalid"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("password-invalid")) {
          errorMessages.push("password-invalid");
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
      login({
        email,
        password,
      });
    }
  };

  return (
    <SafeAreaView>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Image
            source={require("../assets/icon.png")}
            width={"100"}
            height={"100"}
            alignSelf="center"
            alt="logo"
          />
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            textAlign="center"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Selamat Datang
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            textAlign="center"
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Silahkan masuk untuk melanjutkan!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email/Username</FormControl.Label>
              <Input
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(value) => {
                  setEmail(value);
                  resetErrorMessages("email-required");
                }}
                onEndEditing={() => validateForm("email")}
              />
              {errorMessages && errorMessages.includes("email-required") ? (
                <Text fontSize="sm" color="#f7030b">
                  Email atau username tidak boleh kosong.
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type={show ? "text" : "password"}
                value={password}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(value) => {
                  setPassword(value);
                  resetErrorMessages("password-required");
                  resetErrorMessages("password-invalid");
                }}
                onEndEditing={() => validateForm("password")}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              />
              {errorMessages && errorMessages.includes("password-required") ? (
                <Text fontSize="sm" color="#f7030b">
                  Password tidak boleh kosong.
                </Text>
              ) : null}
              {errorMessages && errorMessages.includes("password-invalid") ? (
                <Text fontSize="sm" color="#f7030b">
                  Password harus berisi huruf dan angka minimal 8 karakter.
                </Text>
              ) : null}
            </FormControl>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => navigation.navigate("Forgot")}
            >
              Lupa password?
            </Link>
            <Button
              mt="2"
              colorScheme="indigo"
              size={"lg"}
              isLoading={isLoading}
              onPress={handleSubmit}
            >
              Masuk
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Belum punya akun?{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Daftar
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;
