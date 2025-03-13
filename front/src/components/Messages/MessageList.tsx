import { useEffect, useState } from "react"
import { GroupData } from "./GroupList"
import { Button, Card, Input, Paper } from "@mui/material"

function SendMessageForm({getMessages, group}: {getMessages: () => Promise<void>, group: GroupData}) {
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
		getMessages()
	}
	const formStyle: React.CSSProperties = {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: "1.5rem",
		marginTop: "1.5rem"
	}
	return <Paper style={{position: "fixed", bottom: 0, left: 0, right: 0}}>
		<form onSubmit={onSubmit} style={formStyle}>
			<Input placeholder="Type your message..." type="text" name = "message"
				sx={{width: "20rem", textAlign: "center"}}/>
			<Button variant="outlined" type="submit">Send</Button>
		</form>
	</Paper>
}

function MessageCard({message, from, username}: {username: string, message: string, from: string}) {
	const style: React.CSSProperties = {
		width: "20rem",
		maxWidth: "95vw",
		marginLeft: "1rem",
		marginRight: "1rem",
		paddingLeft: "1rem",
		paddingRight: "1rem",
	}

	if (from == username) {
		style.alignSelf = "flex-start"
		style.backgroundColor = "rgb(50, 40, 255)"
	} else {
		style.alignSelf = "flex-end"
		style.backgroundColor = "#121212"
	}

	return <>
		<Card style={style}>
			<p style={{wordWrap: "break-word"}}>{message}</p>
			<p>from {from}</p>
		</Card>
	</>
}

export default function MessageList({group}: {group: GroupData | undefined}) {
	const [messages, setMessages] = useState<{from: string, message: string}[]>([])
	const [username, setUsername] = useState("")

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

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/auth/status")
			setUsername((await res.json()).username)
		})()
	}, [])

	if (group == undefined) {
		return <>
			<p>Join or create a group to start chatting.</p>
		</>
	}

	return <>
		<h3 style={{textAlign: "center"}}>{group.name}'s group messages</h3>
		<div style={{display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "8rem"}}>
			{ messages.map((message, index) => <MessageCard key={index}
						  username={username} message={message.message} from={message.from}/>) }
		</div>
		<SendMessageForm {...{getMessages, group}}/>
	</>
}
