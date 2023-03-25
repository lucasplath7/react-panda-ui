// Material-UI
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'red',
        },
        colorSecondary: {
          backgroundColor: '#232c6b',
        },
      },
    }
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        "&:hover": {
          backgroundColor: '#182fdb',
        }
      },
      containedSecondary: {
        "&:hover": {
          backgroundColor: '#0e1d8f',
          color: '#dcdcdc',
        }
      },
      textSecondary: {
        "&:hover": {
          backgroundColor: '#F2F2F2',
          color: '#012169',
        }
      },
    },
    MuiOutlinedInput: {
        root: {
          backgroundColor: 'red'
        },
        colorPrimary: {
          backgroundColor: 'red',
          borderColor: 'red'
        },
        colorSecondary: {
          backgroundColor: '#232c6b',
        },
      
    }
  },
  palette: {
    primary: {
      main: '#323e9c',
      contrastText: '#dcdcdc',
    },
    secondary: {
      main: '#232c6b',
      contrastText: '#dcdcdc',
    },
    text: {
      primary: '#dcdcdc',
      secondary: '#dcdcdc6',
    },
  },
  typography: {
    body1: {
      color: '#dcdcdc'
    },
    body2: {
      color: '#dcdcdc'
    },
  }
});

theme = responsiveFontSizes(theme);

export default theme;