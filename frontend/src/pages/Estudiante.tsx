import React from 'react';
import {useRouter} from "next/router";
const Estudiante = () => {
    const navigate = useRouter();

    return (
        <>
            <h1 style={{color:"green"}}>Estudiante</h1>
        </>
    )
};

export default Estudiante;