import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import GridIcon from '../../assets/images/PNhCI5vz9pI 1.svg';

import styled from './index.module.css'
import axios from "axios";

const Lenta = () => {
    const [feedLenta, setFeedLenta] = useState([
        {
            img: GridIcon,
            description: "Ананас"
        },
        {
            img: GridIcon,
            description: "Ананас"
        },
        {
            img: GridIcon,
            description: "Ананас"
        }
    ]);

    useEffect(() => {
        getImage();
    }, [])

    const getImage = () => {
        const url = `https://backend-hahathone.herokuapp.com/getImages`;
        axios.get(url, {
            headers: {
                responseType: 'arraybuffer'
            }
        }).then(res => {
            const { data } = res;
            setFeedLenta((prev) => ([{img: "data:image/png;base64, " + data.img, description: data.description}, ...prev]))
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className={styled.lenta__header}>
                <h1>Лента</h1>
            </div>
                <Grid className={styled.grid__container} container columns={1}>
                    <Grid item xl={2}>
                        {feedLenta.map((item, index) => (
                            <div key={index} className={styled.news}>
                                <div key={index} className={styled.news__wrapper}>
                                    <div className={styled.image__container}>
                                        <img src={item.img} className={styled.image}/>
                                    </div>
                                    <div className={styled.lenta__discription}>
                                        <div className={styled.lenta_title__discription}>
                                            <span className={styled.description__title }>Описание</span>
                                            <span className={styled.description__text}>{item.description}</span>
                                            <div className={styled.nft__container}>
                                                <div className={styled.nft__title}>
                                                    <span>NFT</span>
                                                </div>
                                                <div className={styled.nft__value}>
                                                    <span>0xb9f7d07e14ab2db9b52fd1e1433292c2455fc474</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className={styled.lenta_like__container}>*/}
                                        {/*    <span>0</span>*/}
                                        {/*    <img src={LikeIcon} />*/}
                                        {/*    <span>Оценить</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Grid>
        </div>
    );
}

export default Lenta;
