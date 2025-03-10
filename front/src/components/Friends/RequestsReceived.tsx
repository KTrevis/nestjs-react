import { useEffect, useState } from "react"

function Request({username}: {username: string}) {
	return <>
		<div>{username}</div>
	</>
}

export default function RequestsReceived() {
	const [requests, setRequests] = useState<string[]>([])

	async function getRequestsReceived() {
		const res = await fetch("/api/friends/requests-received")
		setRequests(await res.json())
	}

	useEffect(() => { getRequestsReceived() }, [])

	return <>
		{ requests.map(request => <Request key={request} username={request}/>) }
	</>
}
