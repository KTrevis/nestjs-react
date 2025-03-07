import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Index from './Index.tsx'
import Cats from "./cats/Cats.tsx"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  	<Routes>
		<Route path="/" element={<Index />} />
		<Route path="/cats" element={<Cats />} />
	</Routes>
  </BrowserRouter>,
)
