import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home/Home.tsx'
import Index from './components/Index/Index.tsx'
import NotFound from './components/NotFound/NotFound.tsx'
import { useEffect, useState } from "react"
import Friends from "./components/Friends/Friends.tsx"
import Navbar from "./components/Navbar/Navbar.tsx"

export default function AppRoutes() {
	const [authenticated, setAuthenticated] = useState(true)

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/users/authenticated")
			setAuthenticated(await res.json())
		})()
	}, [])

	function getUsableRoutes() {
		if (authenticated) {
			return <>
				<Route path="/home" element={<Home/>}/>
				<Route path="/friends" element={<Friends/>}/>
			</>
		}
		return <>
			<Route path="/" element={<Index {...{setAuthenticated}}/>} />
		</>
	}

	return  <>
		<BrowserRouter>
			<Navbar {...{setAuthenticated, authenticated}}/>
			<Routes>
				{getUsableRoutes()}
				<Route path="*" element={<NotFound {...{authenticated}}/>} />
			</Routes>
		</BrowserRouter>
	</>
}
