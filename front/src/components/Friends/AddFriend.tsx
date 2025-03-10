import { Button, Input } from "@mui/material"
import { ServerMessage, } from "../../utils/ServerMessage"

export default function AddFriend({setMessage}: {setMessage: (message: ServerMessage) => void}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const username = formData.get("username")
		const res = await fetch(`/api/friends/invite/${username}`, {
			method: "POST"
		})

		setMessage({
			severity: res.status >= 400 ? "error" : "success",
				message: (await res.json()).message 
		})
		form.reset()
	}

	return <>
		<form onSubmit={onSubmit}>
			<Input type="text" placeholder="Username" name="username"/>
			<Button variant="contained" type="submit">Send friend invitation</Button>
		</form>
	</>
}
