import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Container, Flex, Center } from '@chakra-ui/react';
import { FormControl, Input, Button } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getSelectedProductAsync, UpdateProductAsync, DeleteProductAsync } from './productSlice';

export function SingleProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.product.status);

  const [isDisabled, setIsDisabled] = useState(true);
  const [product, setProduct] = useState<IProduct>({});

  const handleInput = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: string,
      value: string
    };
    setProduct({ ...product, [target.id]: target.value })
  }

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(UpdateProductAsync(product, navigate))
  }

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(DeleteProductAsync(product.id, navigate))
  }

  useEffect(() => {
    if (params.id) {
      // ...this will update the state for product once
      dispatch(getSelectedProductAsync(params.id, setProduct))
    }
  }, []);

  return (
    <Container maxW='container.lg' color="white">
      <Flex>
        <Center w='100vw' h="100vh" bg="black">
          <FormControl w="30%" p="1.5rem" pr="1.8rem" border="3px solid white">
            <Input disabled={isDisabled} required id='title' type='text' value={product.title || ''} placeholder='Product title' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
            <Input disabled={isDisabled} required id='price' type='number' value={product.price || ''} placeholder='Product price' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
            <Input disabled={isDisabled} required id='description' type='text' value={product.description || ''} placeholder='Product description' w="100%" h="1.8rem" my=".3rem" onInput={handleInput} />
            {isDisabled && <Button color="white" size="md" bg='teal' border="0" h="2rem" m=".3rem" w="30%" cursor="pointer" onClick={() => setIsDisabled(false)}>Update</Button>}
            {!isDisabled && <Button color="white" disabled={status === 'loading'} size="md" bg='green' border="0" h="2rem" m=".3rem" w="30%" cursor="pointer" onClick={handleUpdate}>{status === 'loading' ? 'wait ...' : 'Save'}</Button>}
            <Button size="md" color="white" disabled={status === 'loading'} bg='red' border="0" h="2rem" m=".3rem" w="30%" cursor="pointer" onClick={handleDelete}>{status === 'loading' ? 'wait ...' : 'Delete'}</Button>
          </FormControl>
        </Center>
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