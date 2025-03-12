import { Button, Input } from "@mui/material"
import { ServerMessageProps } from "../../utils/ServerMessage"

export default function CreateGroup({message, setMessage}: ServerMessageProps) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const name = formData.get("name")
		const res = await fetch(`/api/messages/create-group/${name}`, {
			method: "POST"
		})
		setMessage({
			severity: res.status >= 400 ? "error" : "success",
			message: (await res.json()).message
		})
	}

	return <>
		<form onSubmit={onSubmit} >
			<Input name="name" placeholder="Group name" type="text" />
			<Button variant="contained" type="submit">Create chat group</Button>
		</form>
	</>
}
