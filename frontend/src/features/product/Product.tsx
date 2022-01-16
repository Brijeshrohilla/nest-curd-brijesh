import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProductAsync, AddProductAsync } from './productSlice';

import { NavLink } from 'react-router-dom';
import { Container, Flex, Box } from '@chakra-ui/react';
import { FormControl, Input, Button } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

export function Product() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<IProduct>({});
  const productState = useAppSelector((state) => state.product);
  const status = useAppSelector((state) => state.product.status);

  useEffect(() => { dispatch(getProductAsync()) }, [])

  const handleInput = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: string,
      value: string
    };
    setProduct({ ...product, [target.id]: target.value })
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(AddProductAsync(product));
    setProduct({}); // set state empty
  }

  return (
    <Container maxW='container.lg' color="white">
      <Flex>
        <Box w='100vw' h="100vh" bg="black">
          <FormControl w="50vw" mx="auto" mt="3rem" p="1rem" border="3px solid white">
            <Box w="70%" mx="auto">
              <Input required id='title' type='text' value={product.title || ''} placeholder='Product title' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
              <Input required id='price' type='number' value={product.price || ''} placeholder='Product price' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
              <Input required id='description' type='text' value={product.description || ''} placeholder='Product description' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
              <Button disabled={status === 'loading'} type="submit" size="md" bg='teal' border="0" w="101.5%" h="1.8rem" my=".3rem" cursor="pointer" onClick={handleClick}>{status === 'loading' ? 'wait ...' : 'Create'}</Button>
            </Box>
          </FormControl>


          <Box w="80vw" mx="auto" mt="3rem">
            <Table variant='striped' colorScheme='whatsapp' w="100%" size='sm'>
              <Thead>
                <Tr style={{ textTransform: "uppercase" }}>
                  <Th>title</Th>
                  <Th>price</Th>
                  <Th>description</Th>
                  <Th>delete</Th>
                </Tr>
              </Thead>

              <Tbody>
                {productState.product && productState.product.map((prod) => {
                  return (
                    <Tr bg="teal" key={Math.random()}>
                      <Td>{prod.title}</Td>
                      <Td>{prod.price}</Td>
                      <Td>{prod.description}</Td>
                      <Td p="0">
                        <NavLink to={`/${prod.id}`}>
                          <Button bg='voilet' border="0" w="100%" h="1.8rem" cursor="pointer">View</Button>
                        </NavLink>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex >
    </Container >
  );
}


interface IProduct {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
}