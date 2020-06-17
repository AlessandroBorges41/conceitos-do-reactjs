import React from 'react';

//Abaixo foi feito uma desestruturalização sem ela seria export default function Header(props)
export default function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}