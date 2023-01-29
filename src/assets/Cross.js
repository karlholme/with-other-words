import React from "react";

export default function Cross({ size }) {

    return (
        <div style={{ width: size + 'vh', height: size + 'vh' }}>
            <svg
                viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 0L30 4.99999L5 30L0 25L25 0Z" fill="white" />
                <path d="M8.56986e-06 5.00003L5.00001 4.14443e-05L30 25L25 30L8.56986e-06 5.00003Z" fill="white" />
            </svg>
        </div>
    )
}
