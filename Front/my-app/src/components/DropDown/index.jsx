import React, { useState } from 'react';

import ArrowIcon from '../../assets/images/Arrow.svg'

import styled from './index.module.css';

const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSortMode, setCurrentSortMode] = useState('Упорядочить');

    const handlerDropDown = () => {
        setIsOpen(!isOpen);
    }

    const handlerSortMode = (event) => {
        console.log(event.target.children[0].textContent);
        setCurrentSortMode(event.target.children[0].textContent);
        setIsOpen(!isOpen);
    }
     
    return (
        <div className={styled.drop_wrapper}>
            <div className={styled.drop_header}>
                <button className={styled.drop_current_sort} onClick={handlerDropDown}> 
                    <span className={styled.drop_current_sort_text}>{currentSortMode}</span>
                    <img src={ArrowIcon} style={isOpen ? {transform: 'rotate(0.5turn)'} : {}}/>
                </button>
            </div>
            {
                isOpen 
                ? 
                    (
                        <div className={styled.drop_bottom_content}>
                            <button className={styled.drop_current_sort} onClick={handlerSortMode}>
                                <span className={styled.drop_current_sort_text}>По дате</span>
                            </button>
                            <button className={styled.drop_current_sort} onClick={handlerSortMode}>
                                <span className={styled.drop_current_sort_text}>По лайкам</span>
                            </button>
                            <button className={styled.drop_current_sort} onClick={handlerSortMode}>
                                <span className={styled.drop_current_sort_text}>По просмотрам</span>
                            </button>
                        </div>
                    )
                : null
            }
        </div>
    )
}

export default DropDown;