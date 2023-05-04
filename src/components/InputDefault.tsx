import React from 'react';
import { TextField} from "@mui/material";
import { Theme } from '@mui/material/styles';

export type Name = 'name' | 'email' | 'password' | 'confirmPassword' | 'descrição' | 'detalhamento';

interface InputDefaultProp {
  
  name: Name;
  type: string;
  label: string;
  value: string;
  color: 'error' | 'success'
  variant?: "standard" | "outlined" | "filled";
  handleChange: (value: string, name: Name) => void;
  sx?: Record<string, any> & {
    border?: string;
  } & Partial<Record<keyof Theme['breakpoints'], Record<string, any>>>;
  style?: React.CSSProperties;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}



const InputDefault: React.FC<InputDefaultProp> = ({color, sx,style , variant, name, type, label, value,onKeyDown, handleChange,})=>{
    return (
        <>
        <TextField color={color} name={name}  style={style} sx={sx} variant={variant} onKeyDown={onKeyDown} label={label} type={type} value={value} onChange={(e) => handleChange(e.target.value, name)}></TextField>
        </>
    )
}; export default InputDefault