
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { v4 as uuid } from "uuid";
  import InputDefault, { Name } from "../../components/InputDefault";
  import Modal from "../../components/Modal";
  import { Recado } from "../../types/Recados";
  import  User  from "../../types/User";
import styled from "styled-components";
import { Typography } from "@mui/joy";


  const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Second = styled.div`

  border: 10px solid rgba(160, 206, 74, 0.927);
  border-radius: 30px;
  
  display: flex;
  overflow: auto;
`;

  
  function Home (){
    const [userLogged, setUserLogged] = useState<User | null>(
      JSON.parse(localStorage.getItem("usuarioLogado") ?? "null")
    );
    const [listaUsuarios, setListaUsuarios] = useState<User[]>(
      JSON.parse(localStorage.getItem("listaUser") ?? "[]")
    );
    const [descriçao, setDescrição] = useState("");
    const [detalhamento, setDetalhamento] = useState("");
    const [indiceSelecionado, SeIndiceSelecionado] = useState(-1); 
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("");
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!userLogged) {
        alert("Precisa está logado no sistema!");
        navigate("/");
      }
  
      localStorage.setItem("usuarioLogado", JSON.stringify(userLogged));
    }, [navigate, userLogged]);
  
    const logout = () => {
      localStorage.removeItem("usuarioLogado");
      const index = listaUsuarios.findIndex((u) => u.email === userLogged?.email);
      listaUsuarios[index] = userLogged ? userLogged : listaUsuarios[index];
      setListaUsuarios(listaUsuarios);
      localStorage.setItem("listaUser", JSON.stringify(listaUsuarios));
  
      navigate("/");
    };
  
    const mudarInput = (value: string, key: Name) => {
      switch (key) {
        case "descrição":
          setDescrição(value);
          break;
        case "detalhamento":
          setDetalhamento(value);
          break;
        default:
      }
    };
  



    
    const handleSave = () => {
      if (descriçao !== "" && detalhamento !== "") {
        const novoRecado: Recado = {
          id: uuid(),
          descriçao: descriçao,
          detalhamento: detalhamento,
        };
        if (userLogged) {
          setUserLogged({
            ...userLogged,
            recados: [...userLogged.recados, novoRecado],
          });
        }
        handleClear();
        alert("Recado salvo com sucesso!");
      } else {
        alert("Preencha os campos");
      }
    };
  
    const handleEdit = (indice: number, description: string, details: string) => {
      setDescrição(description);
      setDetalhamento(details);
      SeIndiceSelecionado(indice);
      setMode("update");
      setOpen(true);
      handleClear();
    };
  
    const handleDelete = (indice: number) => {
      SeIndiceSelecionado(indice);
      setOpen(true);
      setMode("delete");
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };
  
    const handleClear = () => {
      setDescrição("");
      setDetalhamento("");
    };
  
    return (
        <Main>
            <Second>
            <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          flexDirection='row'
          justifyContent='right'
          
        >
          <Grid item>
            <Typography
            component="h1"
            color="success"
            fontSize={70}>Hello, {userLogged?.email}</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' color='warning' onClick={logout}>
              LogOut
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          padding={2}
          gap={2}
        >
          <Grid item xs={12} sm={4}>
            <InputDefault
              name={"descrição"}
              type={"text"}
              label={"Assunto"}
              value={descriçao}
              handleChange={mudarInput}
              color={"success"}
              sx={{'background-color':'white'}}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputDefault
              name={"detalhamento"}
              type={"text"}
              label={"Detalhamento"}
              value={detalhamento}
              handleChange={mudarInput}
              color={"success"}
              sx={{'background-color':'white'}}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant='contained' color='success' onClick={handleSave}>
              Salvar
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>descricao</TableCell>
                    <TableCell align='right'>Detalhamento</TableCell>
                    <TableCell align='right'>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userLogged &&
                    userLogged.recados.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align='right'>{row.descriçao}</TableCell>
                        <TableCell align='right'>{row.detalhamento}</TableCell>
                        <TableCell align='right'>
                          <Button
                            variant='text'
                            color='info'
                            onClick={() =>
                              handleEdit(index, row.descriçao, row.detalhamento)
                            }
                          >
                            Editar
                          </Button>
                          <Button
                            variant='text'
                            color='error'
                            onClick={() => handleDelete(index)}
                          >
                            Apagar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Modal
          indice={indiceSelecionado}
          open={open}
          handleClose={handleCloseModal}
          user={userLogged as User}
          setUser={setUserLogged}
          mode={mode}
          descrição={descriçao}
          detalhamento={detalhamento}
        />
      </Box>
      </Second>
      </Main>
    );
  };
  
  export default Home;