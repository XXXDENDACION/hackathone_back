import React from 'react';
import { Container } from '@mui/material';

import Header from '../../components/Header';
import Lenta from '../../components/Lenta';
import LeftBackgroundIcon from '../../assets/images/Vector.svg'

import styled from './index.module.css'

function MainScreen() {
    return (
        <div className={styled.main__container}>
            <Header />
            <div className={styled.left__background} >
            </div>
            <div className={styled.left_bottom__background}>
            </div>
            <div className={styled.right__background}>
            </div>
            <div className={styled.right_bottom__background}>
            </div>
            <Lenta />
        </div>
    );
}
export default MainScreen;

