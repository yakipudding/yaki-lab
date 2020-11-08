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
      "light": "#c17d68",
      "main": "#8e503d",
      "dark": "#5d2616",
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
  fontSize: 24,
  [Theme.breakpoints.up('md')]: {
    fontSize: 32,
  },
};
Theme.typography.h2 = {
  fontSize: 22,
  [Theme.breakpoints.up('md')]: {
    fontSize: 24,
  },
};
Theme.typography.h3 = {
  fontSize: 20.8,
};
Theme.typography.h5 = {
  fontSize: 14,
  color: "#9e9e9e",
};
Theme.typography.body2 = {
  fontSize: 12.8,
};
export default Theme