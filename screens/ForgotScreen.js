import React, { useState, useEffect, useContext } from "react";
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
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import { useToast } from "native-base";

const ForgotScreen = ({ navigation }) => {
  const { state, forget, clearErrorMessage } = useContext(AuthContext);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
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

          if (!email.includes("@")) {
            setErrorMessages((arr) => {
              if (!arr.includes("email-invalid")) {
                return [...arr, "email-invalid"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("email-invalid")) {
              errorMessages.push("email-invalid");
            }
          }
          break;
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
      if (!email.includes("@")) {
        setErrorMessages((arr) => {
          if (!arr.includes("email-invalid")) {
            return [...arr, "email-invalid"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("email-invalid")) {
          errorMessages.push("email-invalid");
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
      forget({
        email,
      });
      setIsLoading(false);
      setIsSubmitted(true);
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
          <VStack space={3} mt="5">
            {!isSubmitted ? (
              <>
                <Heading
                  size="md"
                  fontWeight="600"
                  color="coolGray.800"
                  textAlign="center"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Silahkan masukan email anda untuk mereset password
                </Heading>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => {
                      setEmail(value);
                      resetErrorMessages("email-required");
                      resetErrorMessages("email-invalid");
                    }}
                    onEndEditing={() => validateForm("email")}
                  />
                  {errorMessages && errorMessages.includes("email-required") ? (
                    <Text fontSize="sm" color="#f7030b">
                      Email tidak boleh kosong.
                    </Text>
                  ) : null}
                  {errorMessages && errorMessages.includes("email-invalid") ? (
                    <Text fontSize="sm" color="#f7030b">
                      Email tidak valid.
                    </Text>
                  ) : null}
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="indigo"
                  size={"lg"}
                  isLoading={isLoading}
                  onPress={handleSubmit}
                >
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                <Text fontSize="md" color="#1a0dcc" textAlign={"center"}>
                  Email untuk mereset password telah di kirim, silahkan cek
                  email anda.
                </Text>
              </>
            )}
            <HStack mt="6" justifyContent="center">
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
                Masuk
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default ForgotScreen;
