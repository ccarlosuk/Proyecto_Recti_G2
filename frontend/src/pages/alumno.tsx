import React from 'react';
import {useRouter} from "next/router";
const Alumno = () => {
    const navigate = useRouter();

    return (
        <>
            <h1 style={{color:"green"}}>Alumno</h1>
        </>
    )
};

export default Alumno;