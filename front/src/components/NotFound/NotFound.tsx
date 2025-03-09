import { Navigate } from "react-router"

export default function NotFound({authenticated}: {authenticated: boolean}) {
	if (authenticated) {
		return <Navigate to="/home"/>
	}
	return <Navigate to="/"/>
}
