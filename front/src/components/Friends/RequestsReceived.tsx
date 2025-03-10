import { Button, Card, CardActions, CardContent } from "@mui/material"
import { useEffect, useState } from "react"
import { ServerMessage, ServerMessageProps } from "../../utils/ServerMessage"

type FriendRequestResponse = (
	username: string,
	setMessage: (message: ServerMessage) => void,
	method: string
) => Promise<void>

const answerRequest: FriendRequestResponse = async (username, setMessage, method) => {
	const res = await fetch(`/api/friends/${username}`, {
		method: method
	})

	setMessage({
		severity: res.status >= 400 ? "error" : "success",
		message: (await res.json()).message 
	})
}

function RequestCard({username, setMessage}: {setMessage: (a: ServerMessage) => void, username: string}) {
	return <>
		<Card style={{display: "block", margin: "auto", width: "30rem", maxWidth: "95vw"}}>
			<CardContent style={{textAlign: "center"}}>Friend invitation received from {username}.</CardContent>
			<CardActions style={{display: "flex", justifyContent: "center", gap: "1rem", width: "100%"}}>
				<Button onClick={async () => await answerRequest(username, setMessage, "POST")}
					variant="outlined" color="success">Accept</Button>
				<Button onClick={async () => await answerRequest(username, setMessage, "DELETE")}
					variant="outlined" color="error">Decline</Button>
			</CardActions>
		</Card>
	</>
}

export default function RequestsReceived({message, setMessage}: ServerMessageProps) {
	const [requests, setRequests] = useState<string[]>([])

	async function getRequestsReceived() {
		const res = await fetch("/api/friends/requests-received")
		setRequests(await res.json())
	}

	useEffect(() => { getRequestsReceived() }, [message])

	return <>
		{ requests.map(request => <RequestCard key={request} setMessage={setMessage} username={request}/>) }
	</>
}
