import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"
import { useEffect, useState } from "react"
import GroupList, { GroupData } from "./GroupList"
import { Button, Card, CardContent, Input, Paper } from "@mui/material"

function SendMessageForm({group}: {group: GroupData}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const message = formData.get("message") as string

		if (message.trim() == "") {
			return
		}

		form.reset()

		const res = await fetch(`/api/messages/send/${group.name}`, {
			method: "POST",
			body: JSON.stringify({message}),
			headers: {"Content-Type": "application/json"}
		})
	}

	return <Paper style={{position: "fixed", bottom: 0, left: 0, right: 0}}>
		<form style={{flexDirection: "row", justifyContent: "center", marginBottom: "1.5rem", marginTop: "1.5rem"}} onSubmit={onSubmit}>
			<Input placeholder="Type your message..." type="text" name = "message"
				sx={{width: "20rem", textAlign: "center"}}/>
			<Button variant="outlined" type="submit">Send</Button>
		</form>
	</Paper>
}

function MessageCard({message, from}: {message: string, from: string}) {
	const style: React.CSSProperties = {
		width: "20rem",
		maxWidth: "95vw",
		marginLeft: "1rem",
		marginRight: "1rem",
		alignSelf: "flex-end",
		paddingLeft: "1rem",
		paddingRight: "1rem",
	}
	return <>
		<Card style={style}>
			<p style={{wordWrap: "break-word"}}>{message}</p>
			<p>from {from}</p>
		</Card>
	</>
}

function MessageList({group}: {group: GroupData | undefined}) {
	const [messages, setMessages] = useState<{from: string, message: string}[]>([])

	async function getMessages() {
		if (group == undefined) {
			return
		}
		const res = await fetch(`/api/messages/${group.name}`)
		setMessages(await res.json())
	}

	useEffect(() => {
		getMessages()
	}, [group])

	if (group == undefined) {
		return <>
			<p>Join or create a group to start chatting.</p>
		</>
	}

	return <>
		<h3 style={{textAlign: "center"}}>{group.name}'s group messages</h3>
		<div style={{display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "8rem"}}>
			{ messages.map((message, index) => <MessageCard key={index} message={message.message} from={message.from}/>) }
		</div>
		<SendMessageForm {...{group}}/>
	</>
}

export default function Messages() {
	const [message, setMessage] = useState<ServerMessage>({severity: "success", message: ""})
	const [group, setGroup] = useState<GroupData | undefined>()

	return <>
		<ServerAlert {...{message}}/>
		<GroupList {...{setGroup, message, setMessage}}/>
		<MessageList {...{group}}/>
	</>
}
