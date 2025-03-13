import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"
import { useEffect, useState } from "react"
import GroupList, { GroupData } from "./GroupList"
import { Button, Input } from "@mui/material"

function SendMessageForm({group}: {group: GroupData}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const message = formData.get("message") as string

		if (message.trim() == "") {
			return
		}

		const res = await fetch(`/api/messages/send/${group.name}`, {
			method: "POST",
			body: JSON.stringify({message}),
			headers: {"Content-Type": "application/json"}
		})

		console.log(await res.text())
		form.reset()
	}

	return <>
		<form onSubmit={onSubmit} style={{flexDirection: "row", justifyContent: "center"}}>
			<Input placeholder="Type your message..." type="text" name = "message"
				sx={{width: "20rem", textAlign: "center"}}/>
			<Button variant="outlined" type="submit">Send</Button>
		</form>
	</>
}

function MessageCard({message, from}: {message: string, from: string}) {
	return <>
		<div>{message}</div>
		<div>from {from}</div>
	</>
}

function MessageList({group}: {group: GroupData | undefined}) {
	const [messages, setMessages] = useState<{from: string, message: string}[]>([])

	useEffect(() => {
		(async () => {
			if (group == undefined) {
				return
			}
			const res = await fetch(`/api/messages/${group.name}`)
			setMessages(await res.json())
		})()
	}, [group])

	if (group == undefined) {
		return <>
			<p>Join or create a group to start chatting.</p>
		</>
	}

	return <>
		<p>Current group: {group.name}</p>
		{ messages.map((message, index) => <MessageCard key={index} message={message.message} from={message.from}/>) }
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
