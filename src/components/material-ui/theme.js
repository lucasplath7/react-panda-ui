// Material-UI
import { createTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createTheme({
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
    // MuiOutlinedInput: {
    //   root: {
    //     '& $focused': {
    //       '& $notchedOutline': {
    //         borderColor: 'red',
    //       },
    //     },
    //   },
    //   notchedOutline: {
    //     borderColor: 'red',
    //   },
    // },
  },
  palette: {
    primary: {
      main: '#323e9c',
      light: '#323e9c',
      dark: '#323e9c',
      contrastText: '#dcdcdc',
    },
    secondary: {
      main: '#232c6b',
      contrastText: '#dcdcdc',
    },
    action: {
      focused: '#f70202',
      selected: '#f70202',
      active: '#f70202',
    },
    text: {
      primary: '#dcdcdc',
      secondary: '#dcdcdc',
    },
    rightNews: {
      main: 'red'
    }
  },
  typography: {
    body1: {
      color: '#dcdcdc'
    },
    body2: {
      color: '#dcdcdc'
    },
    bodyInfo: {
      color: 'red'
    },
    h2: {
      color: '#dcdcdc'
    },
  }
});

theme = responsiveFontSizes(theme);

export default theme;