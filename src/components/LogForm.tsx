import { Button, ButtonBase, Input, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Name } from "./InputDefault";
import InputDefault from "./InputDefault";
import User from "../types/User"
import { v4 as uuidv4} from 'uuid'
import { cadastrarUser } from "../store/features/UserSlice";
import { useDispatch } from "react-redux";

const Second = styled.div`
  width: 75vw;
  height: 90vh;
  border: 10px solid rgba(14, 38, 255, 0.3);
  border-radius: 30px;
  box-shadow: 3px 3px 5px rgba(157, 255, 0, 0.907);
  display:flex;
  justify-content:center;
  align-items:center;
  overflow: auto;
`;

const uuid = uuidv4();


interface Recado{
  id:string;
  title: string;
  description: string;
}

interface Mode{
    mode: "Login" | "Signup"
}








export function LogForm({mode}:Mode){
    const navigate=useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [erro, setErro] = useState(false)
    const [errorName, setErrorName]= useState(false);
    const [errorEmail, setErrorEmail]= useState(false);
    const [errorPassword, setErrorPassword]= useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword]= useState(false);

    const [listaUsuarios, setListaUsuarios] = useState<User[]>(
      JSON.parse(localStorage.getItem("listaUser") ?? "[]")
    );

    const [input, setInput] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      });

    const pegarDados = (value: string, key: Name) => {
      switch (key) {
        case 'name':
          setInput({ ...input, name: value });
          break;
        case 'email':
          setInput({ ...input, email: value });
          break;
        case 'password':
          setInput({ ...input, password: value });
          break;
        case 'confirmPassword':
          setInput({ ...input, confirmPassword: value });
          break;
        default:
      }
    };

    const dispatch = useDispatch();
    
  const LinkTest=()=>{
    if(mode== 'Login'){
        navigate('/Signup')
    }else{
        navigate('/')
    }
}

    useEffect(()=>{
      if(password.length <=1 ){
        setErro(true);
      }else{
        setErro(false)
      }
    })

    useEffect(() => {
      if (input.name.length < 3) {
        setErrorName(true);
      } else {
        setErrorName(false);
      }
  
      if (!input.email.match(/\S+@\S+\.\S+/)) {
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
      }
  
      if (mode == 'Signup') {
        if (
          !input.password ||
          input.password.length < 6 ||
          !input.confirmPassword ||
          input.password !== input.confirmPassword
        ) {
          setErrorPassword(true);
          setErrorConfirmPassword(true);
        } else {
          setErrorPassword(false);
          setErrorConfirmPassword(false);
        }
      }
    }, [input]);

    const register = () => {
      const newUser: User = {
        id: uuid,
        name: input.name,
        email: input.email,
        password: input.password,
        recados: []
      };
      dispatch(cadastrarUser(newUser));

    if (input.password !== input.confirmPassword) {
        alerta();
        return;
    }

    if (!input.email.match(/\S+@\S+\.\S/)) {
        alerta();
        return;
    }

      const userExist = listaUsuarios.some(
        (user)=>user.email === newUser.email
      );
      if (!userExist){
        setListaUsuarios([...listaUsuarios, newUser]);
        clearInputs();
        alert("Usuario cadastrado com sucesso!");
        setTimeout(()=>{
          navigate("/");
        },1500);
      }else{
        alert("email ja cadastrado")
      }
    };

    useEffect(() => {
      localStorage.setItem("listaUser", JSON.stringify(listaUsuarios));
    }, [listaUsuarios]);
  
    const login = () => {
      const userEmailExist = listaUsuarios.find(
        (user) => user.email === input.email && user.password === input.password
      );
      
      if (!userEmailExist) {
        const confirm = window.confirm(
          "Email e(ou) senha incorretos, Deseja cadastar uma conta?"
        );
        if (confirm) {
          navigate("/Signup");
        }
      } else {
        localStorage.setItem("usuarioLogado", JSON.stringify(userEmailExist));
        alert("Login efetuado com sucesso");
        setTimeout(() => {
          navigate("/Home");
        }, 1500);
      }
    };

    const clearInputs = () => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };

    const alerta = ()=> alert('Verifique suas informações')

    const nextInput = (e: any, nameT?: string) => {
      const { key } = e;
      if (key === 'Enter') {
        if (nameT) {
          const newInput = document.querySelector(`#${nameT}`);
          // @ts-ignore
          if (newInput) newInput.focus();
        } else {
          if (
            !errorName &&
            !errorEmail &&
            !errorPassword &&
            !errorConfirmPassword
          ) {
            register();
          }
        }
      }
    };
  

    return (
        <>
        <Second>
        <Stack spacing={2}>
        {mode === 'Login' && (
            <>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(160, 253, 0, 0.992)"
          align="center"
          fontSize={70}
          fontWeight={1000}>
          Acessar sua conta
        </Typography>
        <InputDefault 
        name="email"
        label="Insira o Email" 
        type="email"  
        color={errorEmail ? 'error' : 'success'}
        variant="outlined"
        value={input.email} 
        handleChange={pegarDados}
        sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <InputDefault
        name="password"
        value={input.password}
        type="password" 
        color={errorPassword ? 'error' : 'success'}
        label="Insira a Senha" 
        variant="outlined"
        handleChange={pegarDados} 
         sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <Button 
        onClick={login}
        variant="contained" 
        color="warning" 
        style={{width:"40%", marginLeft: "30%"}} >
          Login
        </Button>
        <Typography
          
          variant="h2"
          color="rgba(160, 253, 0, 0.992)"
          align="center"
          fontSize={30}
          >
          Ainda não tem conta? 
        </Typography>
        <Button variant="contained" color="success" style={{width:"40%", marginLeft: "30%"}} onClick={()=>{LinkTest()}}>Clique aqui</Button>
        </>
        )}
        

        {mode === 'Signup' && (
            <>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(160, 253, 0, 0.992)"
          align="center"
          fontSize={70}
          fontWeight={1000}>
          Crie sua Conta
        </Typography>
        <InputDefault 
        name="name"
        label="Insira seu nome" 
        type="text"  
        color={errorName ? 'error' : 'success'}
        variant="outlined"
        value={input.name} 
        handleChange={pegarDados}
        onKeyDown={(e) => nextInput(e, 'email')}
        sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <InputDefault 
        name="email" 
        label="Insira o Email" 
        type="email"
        color={errorEmail ? 'error' : 'success'}  
        variant="outlined"
        value={input.email} 
        handleChange={pegarDados}
        onKeyDown={(e) => nextInput(e, 'password')}
        sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <InputDefault
        name="password"
        type="password" 
        label="Insira a Senha" 
        color={errorPassword ? 'error' : 'success'}
        variant="outlined" 
        value={input.password} 
        handleChange={pegarDados}
        onKeyDown={(e) => nextInput(e, 'confirmPassword')}
        sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <InputDefault
        name="confirmPassword"
        type="password" 
        label="Confirme a senha" 
        color={errorConfirmPassword ? 'error' : 'success'}
        variant="outlined"
        value={input.confirmPassword} 
        onKeyDown={(e) => nextInput(e)}
        handleChange={pegarDados} 
        sx={{"border":"2px solid rgba(157, 255, 0, 0.907)"}} 
        style={{backgroundColor:"white", width: "80%", marginLeft: "10%"}}/>
        <Button 
        onClick={register}
        disabled={errorEmail || errorPassword} 
        variant="contained" 
        color="warning" 
        style={{width:"40%", marginLeft: "30%"}} >
        Criar conta
        </Button>
        <Button
        variant="contained" color="success" style={{width:"40%", marginLeft: "30%"}}
        onClick={()=>{LinkTest()}}>Voltar para pagina de login
        </Button>
        </>
        )}
        </Stack>
        

      </Second>
        </> )
    
} export default LogForm