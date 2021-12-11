import React from 'react';

import Button from '../Button';



import styled from './index.module.css';
const Header = () => {
    return (
        <header className={styled.header}>
            <div className={styled.header__wrapper}>
                {/* <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=121&h=121&fit=crop&auto=format" width={60} height={40}/> */}
                <div className={styled.buttons__container}>
                    <button value="vany" className={styled.header__button}>
                        Vany
                    </button>
                </div>
                {/* <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=121&h=121&fit=crop&auto=format" width={40} height={40}/> */}
            </div>
        </header>
    );
}

export default Header;