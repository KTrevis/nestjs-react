import { Button, Input } from "@mui/material"
import { useState } from "react"
import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"

export default function LoginForm({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const [message, setMessage] = useState<ServerMessage>({severity: "info", message: ""})

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = {
			username: formData.get("username"),
			password: formData.get("password"),
		}

		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {"Content-Type": "application/json"}
		})

		if (res.status >= 400) {
			setMessage({
				severity: "error",
				message: (await res.json()).message
			})
			return
		}

		const token: string = (await res.json()).access_token
		document.cookie = `jwt=${token}`
		setAuthenticated(true)
	}

	return <>
		<form onSubmit={onSubmit}>
			<ServerAlert message={message}/>
			<Input placeholder="Username" type="text" name="username" />
			<Input placeholder="Password" type="password" name="password" />
			<Button variant="contained" type="submit">Login</Button>
		</form>
	</>
}
