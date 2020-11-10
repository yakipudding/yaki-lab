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
  fontSize: '1.8rem',
};
Theme.typography.h2 = {
  fontSize: '1.5rem',
};
// Card Title
Theme.typography.h3 = {
  fontSize: '1.25rem',
};
Theme.typography.h4 = {
  fontSize: '1.1rem',
};
// Card Head (Category)
Theme.typography.h5 = {
  fontSize: '0.8rem',
  color: "#9e9e9e",
};
Theme.typography.h6 = {
  fontSize: '0.75rem',
};
// Product Name
Theme.typography.subtitle1 = {
  fontSize: '1.9rem',
};
// Product Desctiption
Theme.typography.subtitle2 = {
  fontSize: '1.1rem',
  color: "#9e9e9e",
};
// PageLink
Theme.typography.body1 = {
  fontSize: '1rem',
};
// Card Description
Theme.typography.body2 = {
  fontSize: '0.8rem',
};
export default Theme