import React from 'react';
import { Container } from '@mui/material';

import Header from '../../components/Header';
import Lenta from '../../components/Lenta';

function MainScreen() {
    return (
        <Container>
            <Header />
            <Lenta />
        </Container>
    );
}
export default MainScreen;

