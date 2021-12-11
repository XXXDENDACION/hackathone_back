import React, { useState } from 'react';

import styled from './index.module.css';
import MainLogo from '../../assets/images/Group.svg'
import AcountPic from '../../assets/images/01.svg';
import PhoneIcon from '../../assets/images/Phone.svg';
import DiscoverIcon from '../../assets/images/Discovery.svg'

const Header = () => {
    const [currentPage, setCurrentPage] = useState('')
    const heandlerButton = (event) => {
        setCurrentPage(event.target.id)
        console.log(event.target.id);
    }
    const activeButton = {
        backgroundColor: '#6667AB',
    }

    return (
        <header className={styled.header}>
            <div className={styled.header__wrapper}>
                <div width={60} height={40}>
                    <img src={MainLogo} width={60} height={40} />
                </div>
                <div className={styled.buttons__container}>
                    <button id="first_button" className={styled.header__button} onClick={heandlerButton} style={currentPage === "first_button" ? activeButton : {}}>
                        <img src={PhoneIcon} width={20} height={20} />
                    </button>
                    <button id="second_button" className={styled.header__button} onClick={heandlerButton} style={currentPage === "second_button" ? activeButton : {}}>
                        <img src={DiscoverIcon} width={20} height={20} />
                    </button>
                </div>
                <div width={60} height={40}>
                    <img src={AcountPic} width={60} height={40} />
                </div>
            </div>
        </header>
    );
}

export default Header;