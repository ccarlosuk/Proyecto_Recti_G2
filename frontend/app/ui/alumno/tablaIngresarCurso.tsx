import React from 'react'
import {useState} from 'react';


function tablaIngresarCurso () {
    const [inputarr,
        setInputarr] = useState([])

    const [inputdata,
        SetInputdata] = useState({name: "", rollNo: ""})

    function changehandle(e) {

        SetInputdata({
            ...inputdata,
            [e.target.name]: e.target.value
        })

    }

    let {name, rollNo} = inputdata;
    function changhandle() {
        setInputarr([
            ...inputarr, {
                name,
                rollNo
            }
        ])

        console.log(inputdata, "input data what we Enter")
        SetInputdata({name: "", rollNo: ""})

    }
    let delethandle =(i)=>{
        let newdataArr=[...inputarr]
        newdataArr.splice(i,1)
        setInputarr(newdataArr)
    }
 
    return (
        <div className='grid-cols-1 sm:grid-cols-2'>
          <h1 className='font-bold'>Ingreso de Cursos</h1>
            <label> Codigo de curso </label>
            <input
                type="text"
                autoComplete='off'
                name='name'
                value={inputdata.name}
                onChange={changehandle}
                placeholder="Digite Codigo curso"
                className=' border-r-gray-600 rounded-lg '/> 
            <label> Nombre curso </label>
              <input
                type="text"
                autoComplete='off'
                name='rollNo'
                value={inputdata.rollNo}
                onChange={changehandle}
                placeholder="Digite Nombre curso"
                className=' border-r-gray-600 rounded-lg'/>
            <button onClick={changhandle}  className='border w-20 my-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg'>Agregar
            </button><br/>
            <br/>

            <table border={1} width="90%" cellPadding={10} className='bg-gray-100 ' >
                <tbody>
                    <tr style={{background:'#6d1115',
                                color:"white"}}>
                        <td>No</td>
                        <th>Codigo de Curso </th>
                        <th>Nombre de Curso</th>
                        <th className='text-left'>Opciones</th>
                    </tr>
                    {inputarr.length < 1 ?
                        <tr>
                            <td colSpan={4}>No hay registro de curso ingresado !</td>
                        </tr>:
                    inputarr.map((info, ind) => {
                        return (
                            <tr className='border w-10 my-0 py-1 border-black' key={ind}>
                                <td>{ind + 1}</td>
                                <td className='text-center'>{info.name}</td>
                                <td className='text-center'>{info.rollNo}</td>
                                <td><button onClick={()=>delethandle(ind)} className='border w-20 my-0 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg'  >Delete</button></td>
                            </tr>
                        )
                    })
}

                </tbody>
            </table>
        </div>
    );
}

export default tablaIngresarCurso;