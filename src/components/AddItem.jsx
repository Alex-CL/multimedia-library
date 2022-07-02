import { Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export const AddItem = (props) => {
  const button = {
  	marginTop: '10px',
  	borderRadius: '50px',
  };

  return (
      <Button 
      	sx={button}
      	color="primary"
      	variant="outlined"
      	startIcon={<AddIcon />}
      	onClick={() => props.onClick()}
  		>
      	Add
      </Button>
  );
};
