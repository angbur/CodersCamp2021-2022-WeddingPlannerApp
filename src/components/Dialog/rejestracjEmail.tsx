import { TextField, Button, Box} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { openDialog, FormType, closeDialog } from 'store/dialogSlice';
import { fetchRegistrationData, selectResponseStatus } from "store/userSlice";

export interface RegistrationData {
    firstName: string
    lastName: string
    email: string
    password: string
    repassword: string
};

const useStyles = makeStyles({
  field: {
    marginTop: 15,
    marginBottom: 20,
  }
});

export const RejestracjaEmail = () => {
  const dispatch = useAppDispatch();
  const responseStatus = useAppSelector(selectResponseStatus);
  const [status, setStatus] = useState<string>('idle');

  const classes = useStyles();
  const [data, setData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const value = event.target.value;
    setData({
      ...data,
      [event.target.name.trim()]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    //dispatch(fetchRegistrationData(data));
  };

  useEffect(()=> {
    if(responseStatus) {
      setStatus(responseStatus);
    }

  },[responseStatus]);

  useEffect(()=> {
    if (responseStatus === 'succeeded register (:')
      dispatch(closeDialog());
  },[responseStatus]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField sx={{marginBottom:'10px'}}
        className={classes.field}
        type="text"
        name="firstName"
        label="Imię"
        variant="outlined"
        required
        fullWidth
        error={data.firstName ? data.firstName.trim().length < 3 : true}
        value={data.firstName}
        onChange={handleChange}
        helperText="Minimum 3 litery"
      />

      <TextField sx={{marginBottom:'10px'}}
        className={classes.field}
        type="text"
        name="lastName"
        label="Nazwisko"
        variant="outlined"
        required
        fullWidth
        error={data.lastName ? false : true}
        value={data.lastName}
        onChange={handleChange}
        helperText="Minimum 3 litery"
      />


      <TextField sx={{marginBottom:'20px'}}
        className={classes.field}
        type="email"
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
        error={data.password? data.password.trim().length < 5 : true}
        value={data.password}
        onChange={handleChange}
        helperText="Co najmniej 8 znaków, jedna wielka litera i jedna cyfra."
      />

      <TextField sx={{marginBottom:'20px'}}
        className={classes.field}
        type="password"
        name="repassword"
        label="Powtórz hasło"
        variant="outlined"
        required
        fullWidth
        error={data.repassword? data.repassword.trim().length < 5 : true}
        value={data.repassword}
        onChange={handleChange}
        helperText="Co najmniej 8 znaków, jedna wielka litera i jedna cyfra."
      />

<Box sx={{display:"flex", justifyContent:'center'}}>
      <Button
        type="submit"
        className={classes.field}
        color={'primary'}
        variant="contained"
        size="large"
       
      >
        ZAREJESTRUJ SIĘ
      </Button>
      </Box>
      </form>
  );
};

export default RejestracjaEmail;