import { Box, ButtonBase, Drawer, FormGroup, FormControlLabel, IconButton, styled, Typography, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { closeToolbox, selectToolboxState } from "store/toolboxSlice";
import { theme } from "theme/theme";
import TimerWidget from 'assets/img/TimerWidget.png';
import NotificationWidget from 'assets/img/NotificationWidget.png';
import ReminderWidget from 'assets/img/ReminderWidget.png';
import PhotosWidget from 'assets/img/PhotoWidget.png';
import ProgressWidget from 'assets/img/ProgressWidget.png';
import { addWidget, Layouts, removeWidget, selectLayout } from "store/layoutSlice";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  '& .css-18sg6k4-MuiPaper-root-MuiDrawer-paper': {
    top: '66px',
    backgroundColor: theme.palette.secondary.light,
  }
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  opacity: 1,
  '& .widgetName': {
    color: theme.palette.common.black,
    position: 'relative',
    marginRight: '1rem',
       '&:hover': {
          opacity: 0,
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  marginRight: '1rem'
});

const Image = styled('span')(({ theme }) => ({
  objectFit: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  color: theme.palette.common.white,
  marginRight: '1rem',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  opacity: 0.8,
  transition: theme.transitions.create('opacity'),
  borderRadius: '2%',
  marginRight: '1rem',
}));

export default function ToolboxMenu() {
  const dispatch = useAppDispatch();
  const actualLayout: Layouts | undefined | [] = useAppSelector(selectLayout);
  const toolboxState: boolean | undefined = useAppSelector(selectToolboxState);
  const [isOpen, setOpen] = useState<boolean | undefined>(false);

  function isLayouts(actualLayout: Layouts | undefined | []): actualLayout is Layouts {
    return(
      (actualLayout as Layouts) !== undefined && (actualLayout as Layouts) !== null
    ) 
  };

  const images = [
    {
      url: TimerWidget,
      title: 'Odliczanie do dnia ślubu',
      value: 'TimerWidget',
    },
    {
      url: NotificationWidget,
      title: 'Powiadomienia',
      value: 'NotificationWidget',
    },
    {
      url: ReminderWidget,
      title: 'Przypomnienia',
      value: 'ReminderWidget',
    },
    {
      url: ProgressWidget,
      title: 'Postęp przygotowań',
      value: 'ProgressWidget',
    },
    {
      url: PhotosWidget,
      title: 'Zdjęcia',
      value: 'PhotosWidget'
    },
  ];
  
  const handleToolboxClose = () => {
    setOpen(false);
    dispatch(closeToolbox())
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.checked 
      ? dispatch(addWidget({ nameAddingWidget:  event.target.value })) 
      : dispatch(removeWidget({ nameRemovingWidget: event.target.value }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      isLayouts(actualLayout) && actualLayout.lg.find((el)=> (el.i === event.currentTarget.value && el.w>0 && el.h>0)) 
      ? dispatch(removeWidget({ nameRemovingWidget: event.currentTarget.value }))
      : dispatch(addWidget({ nameAddingWidget:  event.currentTarget.value }));      
  };

  useEffect(()=> {
    if (toolboxState) {
      setOpen(true);
    }
  }, [toolboxState]);

  return (
      <StyledDrawer
        variant="persistent"
        anchor='right'
        open={isOpen}
        onClose={handleToolboxClose}
      >
        <IconButton style={{position: 'absolute', top: '10px', right: '10px', color: `${theme.palette.tertiary.main}`}} onClick={handleToolboxClose}>
                  <CloseIcon />
        </IconButton>
        <Box display={'flex'} flexDirection={'column'} margin={'1rem'}>
          <Box display={'flex'}>
              <Typography variant='h4' style={{color: `${theme.palette.tertiary.main}`, margin: '1rem 0', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Widgety:</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
          <FormGroup>
          {images.map((image) => (
            <React.Fragment key={`divCheckbox-${image.title}`}>
            <FormControlLabel 
              key={`label-${image.title}`}
              control={<Switch
                        key={`checkbox-${image.title}`}
                        value={image.value}
                        checked={
                          isLayouts(actualLayout) && actualLayout.lg.find((el)=> (el.i === image.value && el.w>0 && el.h>0)) ? true : false
                        } 
                        onChange={handleChange}
                        inputProps={{ 'aria-label': `checked ${image.title}` }}
                        />
              }
              label={`${image.title}`} />
            <ImageButton
              key={`imagebutton-${image.title}`}
              value={image.value}
              style={{
                width: '260px',
                height: '140px',
                margin: '0.8rem 0',
              }}
              onClick={handleClick}
            >
              <ImageSrc 
                key={`imagesrc-${image.title}`}
                style={{ backgroundImage: `url(${image.url})`,  borderRadius: '4%', boxShadow:  '0px 2px 4px -1px rgb(0 0 0 / 20%)' }} />
              <ImageBackdrop key={`imagebackdrop-${image.title}`} className="MuiImageBackdrop-root" 
                  style={{
                    display: 
                    isLayouts(actualLayout) && actualLayout.lg.find((el)=> (el.i === image.value && el.w>0 && el.h>0)) ? 'none' : 'block'
                    }}/>
              <Image 
                  key={`image-${image.title}`}
                  style={{
                    display: 
                    isLayouts(actualLayout) && actualLayout.lg.find((el)=> (el.i === image.value && el.w>0 && el.h>0)) ? 'none' : 'block'
                    }}>
                <Typography
                  key={`addText-${image.title}`}
                  className="widgetName"
                  component="span"
                  variant="subtitle1"
                >
                  + Dodaj
                </Typography>
              </Image>
            </ImageButton>
        </React.Fragment>
      ))}
      </FormGroup>
          </Box>
        </Box>
      </StyledDrawer>
  )
};
