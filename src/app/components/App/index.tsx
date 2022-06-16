import React from 'react';
import { List } from 'app/pages/home/components/List';
import { Header } from 'app/components/Header';
import { Container } from 'app/components/Container';
import { Secret } from 'app/components/Secret';

export const App = () => {
    return <Container>
        <Header/>
        <List/>
        <Secret/>
    </Container>
}
