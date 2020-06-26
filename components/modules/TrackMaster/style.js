import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Title = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
`;

export default () => (
  <Container>
    <Title>Hello</Title>
  </Container>
);
