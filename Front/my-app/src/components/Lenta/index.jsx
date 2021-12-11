import React, { useState } from 'react';

import DropDown from '../DropDown';
import { Grid } from '@mui/material';
import GridIcon from '../../assets/images/PNhCI5vz9pI 1.svg';
import LikeIcon from '../../assets/images/Mask.svg';

import styled from './index.module.css'


const Lenta = () => {

    return (
        <div>
            <div className={styled.lenta__header}>
                <h1>Лента</h1>
                <DropDown />
            </div>
            <Grid container columns={1}>
                <Grid item xs={2} >
                    <div className={styled.news}>
                        <div className={styled.icon}>
                            <img src={GridIcon} width={600} height={600} />
                        </div>
                        <div className={styled.lenta__discription}>
                            <div className={styled.lenta_title__discription}>
                                <span>Описание</span>
                                <span>Ананас</span>
                            </div>
                            <div className={styled.lenta_like__container}>
                                <span>0</span>
                                <img src={LikeIcon} />
                                <span>Оценить</span>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Lenta;
