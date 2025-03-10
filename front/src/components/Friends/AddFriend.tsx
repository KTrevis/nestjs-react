import { Alert, Button, Input } from "@mui/material"
import { ServerMessage } from "../../utils/ServerMessage"
import { useState } from "react"

export default function AddFriend() {
	const [message, setMessage] = useState<ServerMessage>({severity: "error", message: ""})

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const username = formData.get("username")
		const res = await fetch(`/api/friends/invite?username=${username}`)
		const newMessage = {...message}

		if (res.status >= 400) {
			newMessage.severity = "error"
		} else {
			newMessage.severity = "success"
		}
		newMessage.message = (await res.json()).message
		setMessage(newMessage)
	}

	return <>
		<form onSubmit={onSubmit}>
			{ message.message != "" ? <Alert severity={message.severity}>{message.message}</Alert> : "" }
			<label htmlFor="username">Add friend</label>
			<Input type="text" placeholder="Username" name="username"/>
			<Button variant="contained" type="submit">Send invitation</Button>
		</form>
	</>
}
