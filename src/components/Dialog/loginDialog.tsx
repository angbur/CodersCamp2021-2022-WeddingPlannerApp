import { TextField, Button, Typography, Link, Box } from  "@mui/material";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { openDialog, FormType, closeDialog } from 'store/dialogSlice';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchLoginData, login, selectResponseStatus } from "store/userSlice";
import { useNavigate } from "react-router-dom";

export interface LoginData {
  email: string
  password: string
}

const useStyles = makeStyles({
    field: {
      marginTop: 15,
      marginBottom: 20,
    },
    text2: {
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });

export const LoginDialog = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const responseStatus = useAppSelector(selectResponseStatus);
    const [status, setStatus] = useState<string>('idle');
    const [data, setData] = useState<LoginData>({
      email: "",
      password: ""
    });
  
    const handleChange=(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const value = event.target.value;
      setData({
        ...data,
        [event.target.name.trim()]: value
      });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      //dispatch(fetchLoginData(data)); 
        dispatch(login({ user: data.email }));
        dispatch(openDialog({formType:FormType.zalogowano}));
        navigate(`/WeddingCouple`)    
    }; 

    useEffect(()=> {
      if(responseStatus) {
        setStatus(responseStatus);
      }
  
    },[responseStatus]);
  
    useEffect(()=> {
      if (responseStatus === 'succeeded log in (:'){
        dispatch(login({ user: data.email }));
        dispatch(openDialog({formType:FormType.zalogowano}));
        navigate(`/WeddingCouple`)
      }
    },[responseStatus]);
  
    return (
      <form onSubmit={handleSubmit}>
        <TextField sx={{marginBottom:'20px'}}
          className={classes.field}
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          error={data.email ? false : true}
          value={data.email}
          onChange={handleChange}
        />
  
        <TextField sx={{marginBottom:'20px'}}
          className={classes.field}
          type="password"
          name="password"
          label="Hasło"
          variant="outlined"
          required
          fullWidth
          error={data.password ? false : true}
          onChange={handleChange}
        />

        <Box sx={{display:"flex", justifyContent:'center' }}>
        <Button sx={{marginBottom:'20px'}}
          type="submit"        
          color="primary" variant="contained" size="large"
          className={classes.field}
        >
          Zaloguj się
        </Button>
        </Box>

        <Typography align="center">
          <Link
            component="button"
            variant="body1"
            onClick={() => dispatch(openDialog({ formType: FormType.rejestracjaEmail }))}
          >
            <Typography variant="h4" style={{color:"primary"}}>Jeśli nie masz konta, zarejestruj się tutaj</Typography>
          </Link>
        </Typography>
      </form>
    );
  };
  
  export default LoginDialog;