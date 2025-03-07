import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './Home.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  	<Routes>
		<Route path="/" element={<Home />} />
	</Routes>
  </BrowserRouter>,
)
