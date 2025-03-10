import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home/Home.tsx'
import Index from './components/Index/Index.tsx'
import NotFound from './components/NotFound/NotFound.tsx'
import Friends from "./components/Friends/Friends.tsx"
import Navbar from "./components/Navbar/Navbar.tsx"

export default function AppRoutes() {
	const [authenticated, setAuthenticated] = useState(true)

	async function getAuthStatus() {
		const res = await fetch("/api/auth/authenticated")
		setAuthenticated(res.status < 400) // if no error = authenticated
		
		if (res.status == 502) {
			setTimeout(getAuthStatus, 1000)
		}
	}

	useEffect(() => {
		getAuthStatus()
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
			{ authenticated ? <Navbar {...{setAuthenticated, authenticated}}/> : "" }
			<Routes>
				{getUsableRoutes()}
				<Route path="*" element={<NotFound {...{authenticated}}/>} />
			</Routes>
		</BrowserRouter>
	</>
}
