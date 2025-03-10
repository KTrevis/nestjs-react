import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./global.css"
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={darkTheme}>
		<CssBaseline/>
		<App/>
	</ThemeProvider>
)
