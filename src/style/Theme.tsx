import { createMuiTheme } from '@material-ui/core/styles';
const Theme = createMuiTheme({
  "palette": { 
    "common": { 
      "black": "#000",
      "white": "#fff" 
    },
    "background": {
      "paper": "#fff",
      "default": "#fff"
    },
    "primary": {
      "light": "#fff350",
      "main": "#ffc107",
      "dark": "#c79100",
      "contrastText": "#000" 
    },
    "secondary": { 
      "light": "#ffa270",
      "main": "#ff7043",
      "dark": "#c63f17",
      "contrastText": "#fff" 
    },
    "error": {
      "light": "#e57373", 
      "main": "#f44336", 
      "dark": "#d32f2f", 
      "contrastText": "#fff" 
    }, 
    "text": { 
      "primary": "#000", 
      "secondary": "#c79100", 
      "disabled": "rgba(128, 73, 71, 0.5)", 
      "hint": "rgba(0, 0, 0, 0.38)" 
    } 
  },
});
// typography
Theme.typography.h1 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [Theme.breakpoints.up('md')]: {
    fontSize: '2.0rem',
  },
};
Theme.typography.h2 = {
  fontSize: '1.0rem',
  '@media (min-width:600px)': {
    fontSize: '0.8rem',
  },
  [Theme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
  },
};
Theme.typography.h3 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '0.5rem',
  },
  [Theme.breakpoints.up('md')]: {
    fontSize: '1.0rem',
  },
};
Theme.typography.body2 = {
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
    fontSize: '0.3rem',
  },
  [Theme.breakpoints.up('md')]: {
    fontSize: '0.8rem',
  },
};
export default Theme