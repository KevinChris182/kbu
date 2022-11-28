import React from "react";
import { Dimensions } from "react-native";
import { Box, Text, HStack, VStack, Badge } from "native-base";

const SavingsCard = ({ savings }) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "",
  };

  const currencyFormatter = (value, options) => {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${options.symbol} ${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}${options.decimalSeparator}${decimal}`;
  };

  return (
    <HStack p={"5"} h={"100"}>
      <VStack w={"1/2"}>
        <Badge
          variant="solid"
          colorScheme={savings.type === 1 ? "success" : "info"}
          alignSelf={"flex-start"}
          borderRadius={"4"}
        >
          {savings.type === 1
            ? "SIMPANAN POKOK"
            : savings.type === 2
            ? "SIMPANAN WAJIB"
            : "SIMPANAN SUKARELA"}
        </Badge>
        <Text>Sumber: {savings.source}</Text>
        <Text size={"sm"} italic>
          {savings.tanggal_bayar}
        </Text>
      </VStack>
      <Text
        color="#1a0ccd"
        fontSize={"md"}
        fontWeight={"bold"}
        alignSelf={"center"}
        textAlign={"right"}
        flex={1}
      >
        Rp.{currencyFormatter(Number(savings.amount.split(".")[0]))}
      </Text>
    </HStack>
  );
};

export default SavingsCard;
