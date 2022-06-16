import React from 'react';
import { List } from 'app/pages/home/components/List';
import { Header } from 'app/components/Header';
import { Container } from 'app/components/Container';
import { Logger } from 'app/modules/logger/components/Logger';

export const App = () => {
    return <Container>
        <Header/>
        <List/>
        <Logger/>
    </Container>
}
