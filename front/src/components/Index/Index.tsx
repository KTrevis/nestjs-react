import { useNavigate } from "react-router"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Index({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	return <>
		<RegisterForm setAuthenticated={setAuthenticated}/>
		<LoginForm setAuthenticated={setAuthenticated}/>
	</>
}
