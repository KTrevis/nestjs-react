import { useEffect, useState } from "react"
import { Button, Card, CardActions, CardContent } from "@mui/material"
import { ServerMessageProps } from "../../utils/ServerMessage"
import ScrollModal from "./ScrollModal"

function FriendCard({username, message, setMessage}: {username: string} & ServerMessageProps) {
	async function removeFriend() {
		const res = await fetch(`/api/friends/${username}`, {
			method: "DELETE"
		})

		setMessage({
			severity: "success",
			message: (await res.json()).message
		})
	}

	return <>
		<Card style={{display: "block", margin: "auto", width: "30rem", maxWidth: "95vw"}}>
			<CardContent style={{textAlign: "center"}}>{username}</CardContent>
			<CardActions style={{display: "flex", justifyContent: "center", gap: "1rem", width: "100%"}}>
				<ScrollModal/>
				<Button onClick={removeFriend} color="error" variant="outlined">Remove friend</Button>
			</CardActions>
		</Card>
	</>
}

export default function FriendList({message, setMessage}: ServerMessageProps) {
	const [friends, setFriends] = useState<string[]>([])

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/friends/")
			setFriends(await res.json())
		})()
	}, [message])

	return <>
		{friends.map(username => <FriendCard key={username} {...{username, message, setMessage}}/>)}
	</>
}
