import { Alert, Button, Input } from "@mui/material"
import { useState } from "react"

export default function LoginForm({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const [error, setError] = useState("")

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
			const message = (await res.json()).message
			setError(message)
			return
		}

		const token = (await res.json()).access_token
		document.cookie = `jwt=${token}`
		setAuthenticated(true)
	}

	return <>
		<form onSubmit={onSubmit}>
			{ error != "" ? <Alert severity="error">{error}</Alert> : "" }
			<Input placeholder="Username" type="text" name="username" />
			<Input placeholder="Password" type="password" name="password" />
			<Button variant="contained" type="submit">Login</Button>
		</form>
	</>
}
