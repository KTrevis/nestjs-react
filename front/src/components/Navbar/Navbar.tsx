import { useNavigate } from "react-router"

export default function Navbar({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const navigate = useNavigate()

	const logout: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
		e.preventDefault()
		await fetch("/api/users/logout")
		setAuthenticated(false)
	}

	return <>
		<nav>
			<a href="/api/users/logout" onClick={logout}>Logout</a>
		</nav>
	</>
}
