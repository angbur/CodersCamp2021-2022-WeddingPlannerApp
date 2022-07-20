import { Typography, Button, Box } from "@mui/material";
import { closeDialog } from "../../store/dialogSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { toast } from 'react-toastify';

export const ZalozonyProfil = () => {
  const dispatch = useAppDispatch();
  const navigate= useNavigate();

  return (
    <Box sx={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"space-between"  }}>
      <Box sx={{marginTop:'20px', marginBottom:'20px'}}>
          <Typography
            variant="body1"
            align="center">
            Założyłeś profil!
          </Typography>
      </Box>
      <Box
        sx={{ marginBottom: '20px', textAlign:'center' }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              dispatch(closeDialog());
              navigate('/');
              toast.success("Jesteś zalogowany");
              }}>
            ZACZYNAMY!
          </Button>
      </Box>
    </Box>
  )
}

export default ZalozonyProfil;