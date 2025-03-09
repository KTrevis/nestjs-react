import { Link } from "react-router"
import "./Navbar.scss"
import { useState } from "react"

type NavBarParams = {
	setAuthenticated: (authenticated: boolean) => void,
	authenticated: boolean,
}

function NavbarContent({authenticated, setAuthenticated}: NavBarParams) {
	const logout: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
		e.preventDefault()
		await fetch("/api/users/logout")
		setAuthenticated(false)
	}

	return <>
		<Link to="/friends">Friends</Link>
		{ authenticated ? <a href="/api/users/logout" onClick={logout}>Logout</a> : "" }
	</>
}

export default function Navbar({authenticated, setAuthenticated}: NavBarParams) {
	const [visible, setVisibility] = useState(false)

	return <>
		<nav id="navbar">
			<button onClick={() => setVisibility(!visible)}>Toggle navbar content</button>
			{ visible ? <NavbarContent {...{setAuthenticated, authenticated}}/> : "" }
		</nav>
	</>
}
