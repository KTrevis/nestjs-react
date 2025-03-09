import { createRoot } from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import "./global.css"

createRoot(document.getElementById('root')!).render(
	<AppRoutes/>
)
