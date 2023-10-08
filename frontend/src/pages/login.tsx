import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUser, faUserCircle,faKey ,faRightToBracket,faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../logofisi.png'
const LoginView = () => {
  return (
    
    <div >
        

      <div style={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center',height:'100%',width:'100%',backgroundColor:'#73201F',margin:'0',position:'absolute',top:'50%',left:'50%',transform: 'translateX(-50%) translateY(-50%)'}}>
        <div className='tituloLogin' style={{borderRadius:'10px',border: '2px solid black', width:'400px',height:'100px', backgroundColor:'#3E1010'}}>
          <h3 style={{ textAlign:'center',fontSize:'15px', margin:'20px',marginBottom:'5px',marginTop:'26px', color:'#F1F1F1'}}>SISTEMA DE RECTIFICACION</h3>
          <h3 style={{ textAlign:'center',fontSize:'15px', margin:'20px',marginTop:'5px', color:'#F1F1F1'}}>DE MATRICULA</h3>        
        </div>

        <div className='formatoLogin'style={{borderRadius:'10px',border: '2px solid black', width:'500px',height:'200px', backgroundColor:'#926A6A',marginTop:'5px'}} >  
        <form style={{position:'relative',display:'flex', flexDirection:'row', gap:'5',textAlign:'center',marginLeft:'60px',marginTop:'20px'}}>
            <FontAwesomeIcon icon={faUser} style={{marginLeft:'8px',padding:'8px',top:'18%', position:'relative',backgroundColor:'#D7D9D6', borderRadius:'5px',marginRight:0,marginTop:'18px'}} />
            <input id="usuario" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',width:'190px'}} type='text'></input>
            <input id="dominio" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',backgroundColor:'#D7D7D7',width:'140px',textAlign:'center', fontWeight:'bold'}} type='text' value='@unmsm.edu.pe' readOnly={true}></input>
        </form>
        <form style={{display:'flex',marginLeft:'60px', flexDirection:'row', gap:'5',textAlign:'center'}}>
          <FontAwesomeIcon icon={faKey} style={{marginLeft:'8px',padding:'8px',top:'18%', position:'relative',backgroundColor:'#D7D9D6', borderRadius:'5px',marginRight:0,marginTop:'18px'}}/>
          <div className="password-container" style={{}}>
            <input id="password" style={{marginLeft:0,marginRight:0,marginTop:'20px',borderRadius:'5px',width:'330px'}} type='password'></input>
            <FontAwesomeIcon icon={faEye} id="hideshow" style={{position:'relative',marginLeft:'-25px',cursor: 'pointer'}} />
          </div>
          
        </form> 

        <form style={{display:'flex',marginLeft:'190px', flexDirection:'row', gap:'5',textAlign:'center'}}>
          <button id="btnLogin" style={{marginLeft:'16px' ,margin:'10px',width:'90px', height:'40px',alignSelf:'center', fontWeight:'bold', backgroundColor:'#D7D9D6',fontSize:'14px', borderRadius:'10px'}} type='submit'><FontAwesomeIcon icon={faRightToBracket} /> LOGIN</button>
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
  )
}

export default LoginView