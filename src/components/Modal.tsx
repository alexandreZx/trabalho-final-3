import {  useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, TextField } from "@mui/material";
import  User from "../types/User";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; //passar o set do userLogged, ou seja, vamos passar a funcao de set
  indice: number;
  mode: string;
  descrição?: string;
  detalhamento?: string;
}

function Modal({
  open,
  handleClose,
  indice,
  user,
  setUser,
  mode,
  descrição,
  detalhamento,
}: ModalProps) {
  const [descriçãoAtualiza, setDescriçãoAtualiza] = useState<string>("");
  const [detalhamentoAtualiza, setdetalhamentoAtualiza] = useState("");

  const handleConfirm = () => {
    const temp = [...user.recados]; //pego tudo o que tem dentro do vetor
    temp.splice(indice, 1); //apago de la
    setUser({ ...user, recados: temp }); //coloco o no vetor o vetor recados modificado
    handleClose();
  };

  const handleUpdate = () => {
    const temp = [...user.recados]; // criar uma cópia do array de recados
    const updatedRecado = { ...temp[indice] }; // criar uma cópia do recado que será atualizado
    if (descriçãoAtualiza) {
      updatedRecado.descriçao = descriçãoAtualiza;
    }
    if (detalhamentoAtualiza) {
      updatedRecado.detalhamento = detalhamentoAtualiza;
    }
    temp[indice] = updatedRecado; // atualizar a cópia do recado no array de recados
    setUser({ ...user, recados: temp }); // atualizar o usuário com o novo array de recados
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {mode === "delete" && (
        <>
          <DialogTitle id='alert-dialog-title'>
            {`Tem certeza que deseja excluir o recado de ID ${indice}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Ao confirmar esta ação, não poderá ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color='info'>
              Confirmo
            </Button>
            <Button onClick={handleClose} autoFocus color='warning'>
              Cancelar
            </Button>
          </DialogActions>
        </>
      )}

      {mode === "update" && (
        <div>
          <DialogTitle id='alert-dialog-title'>
            {`Os dados do ID ${indice} serão atualizados`}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Descrição'
              value={descriçãoAtualiza}
              fullWidth
              variant='standard'
              onChange={(e) => setDescriçãoAtualiza(e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Detalhe'
              value={detalhamentoAtualiza}
              fullWidth
              variant='standard'
              onChange={(e) => setdetalhamentoAtualiza(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} color='info'>
              Confirmo
            </Button>
            <Button onClick={handleClose} autoFocus color='warning'>
              Cancelar
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}

export default Modal;

// const handleConfirm = () => {
//   if (userLogged) {
//     setUserLogged(
//       (prev)=>{
//         prev?.recados.splice(indice, 1);
//         return prev
//       }
//     )
//     handleClose();
//   }
// };