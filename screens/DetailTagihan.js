import { Box, Text, Center, Flex, Heading, HStack, Spacer, VStack } from 'native-base';
import { useContext, useEffect } from 'react';
import {Context as DataContext} from '../context/DataContext'

const DetailTagihan = ({route}) => {
  const {id} = route.params;  
  const {state, getDetailsTagihan} = useContext(DataContext)
  const {state: stateMember, getMemberData } = useContext(DataContext)
  
  useEffect(()=> {
    getDetailsTagihan(id)
    getMemberData()
  }, [id])
  
  return (
    <Box h={"100%"} justifyContent="center">
      <Box bg="white" p={"5"} rounded={"lg"} shadow="3">
        <Center>
          <Heading>Detail Tagihan</Heading>
        </Center>
        <Center mt={"12"} mb={"10"}>
          <Text fontSize={"xl"} fontWeight={"bold"} >
            Hai {stateMember.member.anggota_name}
          </Text>
          <Text>
            Berikut adalah detail tagihan anda
          </Text>
        </Center>
        <HStack p="2" backgroundColor={"light.200"}>
          <Text fontSize={"md"} flex="1">
            Bulan/Tahun
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
            {state.detailTagihan.bulan}/{state.detailTagihan.tahun}
          </Text>
        </HStack>
        <HStack p="2">
          <Text fontSize={"md"} flex={1}>
            Tipe
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
            {state.detailTagihan.type}
          </Text>
        </HStack>
        <HStack p="2" backgroundColor={"light.200"}>
          <Text fontSize={"md"} flex="1">
            Status
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} flex="2" pl={"2"}>
            {state.detailTagihan.status}
          </Text>
        </HStack>
        <Center mt={"24"} mb={"7"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>Jumlah Tagihan</Text>
          <Heading py={"3"}>Rp. {state.detailTagihan.amount},00</Heading>
        </Center>
      </Box>
    </Box>
  )
}

export default DetailTagihan