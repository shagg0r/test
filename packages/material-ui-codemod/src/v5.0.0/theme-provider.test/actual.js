import { createTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';

function App() {
  return <MuiThemeProvider theme={createTheme()}></MuiThemeProvider>;
}
