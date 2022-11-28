import React, { useState, useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  Box,
  Image,
  Center,
  Input,
  Button,
  VStack,
  FormControl,
  HStack,
  Link,
  Text,
} from "native-base";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "native-base";

const RegisterScreen = ({ navigation }) => {
  const { state, register, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
        case "username":
          if (!username) {
            setErrorMessages((arr) => {
              if (!arr.includes("username-required")) {
                return [...arr, "username-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("username-required")) {
              errorMessages.push("username-required");
            }
          }

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
        case "confirmPassword":
          if (!confirmPassword) {
            setErrorMessages((arr) => {
              if (!arr.includes("confirm-password-required")) {
                return [...arr, "confirm-password-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("confirm-password-required")) {
              errorMessages.push("confirm-password-required");
            }
          }

          if (password !== confirmPassword) {
            setErrorMessages((arr) => {
              if (!arr.includes("password-mismatch")) {
                return [...arr, "password-mismatch"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("password-mismatch")) {
              errorMessages.push("password-mismatch");
            }
          }

          break;
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
        case "phoneNumber":
          if (!phoneNumber) {
            setErrorMessages((arr) => {
              if (!arr.includes("phone-number-required")) {
                return [...arr, "phone-number-required"];
              } else {
                return arr;
              }
            });

            if (!errorMessages.includes("phone-number-required")) {
              errorMessages.push("phone-number-required");
            }
          }
          break;
        default:
          break;
      }
    } else {
      if (!username) {
        setErrorMessages((arr) => {
          if (!arr.includes("username-required")) {
            return [...arr, "username-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("username-required")) {
          errorMessages.push("username-required");
        }
      }
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
      if (!confirmPassword) {
        setErrorMessages((arr) => {
          if (!arr.includes("confirm-password-required")) {
            return [...arr, "confirm-password-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("confirm-password-required")) {
          errorMessages.push("confirm-password-required");
        }
      }
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
      if (!phoneNumber) {
        setErrorMessages((arr) => {
          if (!arr.includes("phone-number-required")) {
            return [...arr, "phone-number-required"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("phone-number-required")) {
          errorMessages.push("phone-number-required");
        }
      }
      if (password !== confirmPassword) {
        setErrorMessages((arr) => {
          if (!arr.includes("password-mismatch")) {
            return [...arr, "password-mismatch"];
          } else {
            return arr;
          }
        });

        if (!errorMessages.includes("password-mismatch")) {
          errorMessages.push("password-mismatch");
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
      register({
        username,
        email,
        password,
        name,
        phoneNumber,
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    resetErrorMessages("username-required");
                  }}
                  onEndEditing={() => validateForm("username")}
                />
                {errorMessages &&
                errorMessages.includes("username-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Username tidak boleh kosong.
                  </Text>
                ) : null}
              </FormControl>
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
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  value={password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => {
                    setPassword(value);
                    resetErrorMessages("password-required");
                    resetErrorMessages("password-invalid");
                  }}
                  onEndEditing={() => validateForm("password")}
                />
                {errorMessages &&
                errorMessages.includes("password-required") ? (
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
              <FormControl>
                <FormControl.Label>Ulangi Password</FormControl.Label>
                <Input
                  type="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    resetErrorMessages("confirm-password-required");
                    resetErrorMessages("password-mismatch");
                  }}
                  onEndEditing={() => validateForm("confirmPassword")}
                />
                {errorMessages &&
                errorMessages.includes("password-missmatch") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Konfirm password harus sama.
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Nomor Telepon</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  value={phoneNumber}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => {
                    setPhoneNumber(value);
                    resetErrorMessages("phone-number-required");
                  }}
                  onEndEditing={() => validateForm("phoneNumber")}
                />
                {errorMessages &&
                errorMessages.includes("phone-number-required") ? (
                  <Text fontSize="sm" color="#f7030b">
                    Nomor telepon tidak boleh kosong.
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
                Daftar
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Sudah memiliki akun?{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  Masuk
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
