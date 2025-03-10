import { Button, Input } from "@mui/material"
import { useState } from "react"
import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"

export default function RegisterForm({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<ServerMessage>({
		severity: "error",
		message: ""
	}) 

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = {
			username: formData.get("username"),
			password: formData.get("password"),
		}

		if (body.password != formData.get("confirm-password")) {
			setMessage({
				severity: "error",
				message: "Passwords do not match."
			})
			return
		}

		setLoading(true)
		const res = await fetch("/api/users/register", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {"Content-Type": "application/json"}
		})
		setLoading(false)

		const message: string = (await res.json()).message[0]

		if (res.status >= 400) {
			setMessage({
				severity: "error",
				message: message
			})
			return
		}
		setMessage({
			severity: "success",
			message: "Account created. You can log in."
		})
	}

	return <>
		<form onSubmit={onSubmit}>
			<ServerAlert message={message}/>
			<Input placeholder="Username" type="text" name="username" />
			<Input placeholder="Password" type="password" name="password" />
			<Input placeholder="Confirm password" type="password" name="confirm-password" />
			<Button variant="contained" disabled={loading} type="submit">Register</Button>
		</form>
	</>
}
