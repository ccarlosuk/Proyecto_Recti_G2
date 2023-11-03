import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faUserCircle,faKey ,faRightToBracket,faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../logofisi.png'



import Alert from 'react-bootstrap/Alert';
//dependencia para la conexion al backend
import axios from "axios";
//importar el hook
import React, {useState} from 'react';
import {useRouter} from 'next/router'
import {setAuthUser} from "@/helper/Storage";


const LoginView:React.FC = () => {
    // CODIGO PARA LA INTEFGRACIÓN DEL BACKEND CON EL FRONTEND
    //FALTA LA REDIRECCIÓN A LA RUTA CORRESPONDIENTE
    const router = useRouter(); //useNavigate()
    type Estado = {
        usuario: string;
        password: string;
        loading: boolean;
        err: string[] | null;
    };

    const [login, setLogin] = useState<Estado>({
        usuario: "",
        password: "",
        loading: false,
        err: null , //err puede ser null o un [] String
    });
    const LoginFun = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLogin({ ...login, loading: true, err: null, });
        axios
            .post(`http://localhost:8080/api/login`, {
                usuario: login.usuario,
                password: login.password
            })
            .then((resp) => {
                setLogin({ ...login, loading: false, err: null });
                //console.log("mensaje de respuesta: ",resp.data.message);
                console.log("mensaje de respuesta 1: ",resp.data);
                console.log("mensaje de respuesta 2: ",resp.data.type);

                setAuthUser(resp.data);
                router.push("/" + resp.data.rol);
                //router.push("/Alumno");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // console.log(err);
                // console.log(login.usuario);
                // console.log(login.password);
                // console.log('Detalles del error:', err.response.data);

                if (err.response.status === 400 || err.response.status === 422) {
                    setLogin({
                        ...login,
                        loading: false,
                        err: err.response.data.errors[0].msg,
                    });
                } else {
                    setLogin({
                        ...login,
                        loading: false,
                        err: ["Algo salió mal"],
                    });
                }
            });
    };

    return (
        <>
            <div >

                <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center',height:'100%',width:'100%',backgroundColor:'#73201F',margin:'0',position:'absolute',top:'50%',left:'50%',transform: 'translateX(-50%) translateY(-50%)'}}>
                    <div className='tituloLogin' style={{borderRadius:'10px',border: '2px solid black', width:'400px',height:'100px', backgroundColor:'#3E1010'}}>
                        <h3 style={{ textAlign:'center',fontSize:'15px', margin:'20px',marginBottom:'5px',marginTop:'26px', color:'#F1F1F1'}}>SISTEMA DE RECTIFICACION</h3>
                        <h3 style={{ textAlign:'center',fontSize:'15px', margin:'20px',marginTop:'5px', color:'#F1F1F1'}}>DE MATRICULA</h3>
                    </div>

                    <div className='formatoLogin' style={{borderRadius:'10px',border: '2px solid black', width:'500px',height:'200px', backgroundColor:'#926A6A',marginTop:'5px'}} >

                        {login.loading === false && login.err && (
                            <Alert variant="danger" className='alert-login'>
                                {login.err}
                            </Alert>
                        )}

                        <form  style={{position:'relative',display:'flex', flexDirection:'row', gap:'5',textAlign:'center',marginLeft:'60px',marginTop:'20px'}}>
                            <FontAwesomeIcon icon={faUser} style={{marginLeft:'8px',padding:'8px',top:'18%', position:'relative',backgroundColor:'#D7D9D6', borderRadius:'5px',marginRight:0,marginTop:'18px'}} />
                            <input id="usuario" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',width:'190px'}} type='text'  required
                                   value={login.usuario} onChange={(e) =>
                                setLogin({ ...login, usuario: e.target.value })
                            }></input>
                            <input id="dominio" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',backgroundColor:'#D7D7D7',width:'140px',textAlign:'center', fontWeight:'bold'}} type='text' value='@unmsm.edu.pe' readOnly={true}></input>
                        </form>
                        <form  style={{display:'flex',marginLeft:'60px', flexDirection:'row', gap:'5',textAlign:'center'}}>
                            <FontAwesomeIcon icon={faKey} style={{marginLeft:'8px',padding:'8px',top:'18%', position:'relative',backgroundColor:'#D7D9D6', borderRadius:'5px',marginRight:0,marginTop:'18px'}}/>
                            <div className="password-container" style={{}}>
                                <input id="password" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',width:'330px'}} type='password' required
                                       value={login.password} onChange={(e) =>
                                    setLogin({ ...login, password: e.target.value })
                                }  ></input>
                                <FontAwesomeIcon icon={faEye} id="hideshow" style={{position:'relative',marginLeft:'-25px',cursor: 'pointer'}} />
                            </div>

                        </form>

                        <form onSubmit={LoginFun} style={{display:'flex',marginLeft:'190px', flexDirection:'row', gap:'5',textAlign:'center'}}>
                            <button  id="btnLogin" style={{marginLeft:'16px' ,margin:'10px',width:'90px', height:'40px',alignSelf:'center', fontWeight:'bold', backgroundColor:'#D7D9D6',fontSize:'14px', borderRadius:'10px'}} type='submit'><FontAwesomeIcon icon={faRightToBracket} />
                                Login
                            </button>
                        </form>
                    </div>

                </div>

                <div style={{display:'flex',flexDirection:'column',alignItems:'end',textAlign:'center',backgroundColor:'#73201F',position:'relative'}}>


                    <div style={{display:'flex',flexDirection:'row'}}>
                        <img src={logo.src} style={{margin:'auto', width:'80px',height:'80px'}} />
                        <div >
                            <h3 style={{ textAlign:'center',fontSize:'15px', margin:'15px',marginTop:'10px', color:'#F1F1F1'}}>FACULTAD DE INGENIERIA DE</h3>
                            <h3 style={{ textAlign:'center',fontSize:'15px', margin:'15px',marginTop:'5px', color:'#F1F1F1'}}>SISTEMAS E INFORMATICA</h3>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
export default LoginView;