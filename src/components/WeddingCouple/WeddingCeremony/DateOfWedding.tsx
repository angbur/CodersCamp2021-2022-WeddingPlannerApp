import { Box, Card, CardContent, CardHeader, IconButton, Typography, Divider, IconButtonProps, styled, Collapse} from "@material-ui/core"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})
(({expand}:ExpandMoreProps) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}));



const DateOfWedding = () => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{display:'flex', flexDirection:'column', marginTop:'2rem'}}>
      <CardHeader
         avatar={
          <CalendarTodayIcon/>
        }
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
        title="Data ceremonii ślubnej"
      />
      <Divider/>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent style={{display:'flex', justifyContent:'center'}}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} style={{marginLeft:'5rem'}}>
          <Typography variant="body1">Wybierz datę ceremonii ślubnej</Typography>
          <Typography variant="body1" style={{paddingTop:'1rem'}}>Podaj godzinę:</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} style={{marginLeft:'5rem'}}>
            <Typography variant="body1">Wasz ślub odbędzie się:</Typography>
            <Typography variant="body1" style={{paddingTop:'1rem'}}>Data</Typography>
            <Typography variant="body1" style={{paddingTop:'1rem'}}>Do dnia, w którym zostaniecie Małżeństwem pozostało:</Typography>
        </Box>
      </CardContent>
      </Collapse>
    </Card>
  )
}

export default DateOfWedding