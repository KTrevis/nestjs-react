import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Index from './Index.tsx'
import NotFound from './NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  	<Routes>
		<Route path="/" element={<Index />} />
		<Route path="*" element={<NotFound />} />
	</Routes>
  </BrowserRouter>,
)
