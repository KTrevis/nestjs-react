import { Alert } from "@mui/material"

export type ServerMessage = {
	severity: "error" | "warning" | "info" | "success",
	message: string
}

export type ServerMessageProps = {
	message: ServerMessage,
	setMessage: (message: ServerMessage) => void
}

export default function ServerAlert({message}: {message: ServerMessage}) {
	if (message.message == "")
		return <></>

	return <>
		<Alert style={{display: "flex", justifyContent: "center"}} severity={message.severity}>
			{message.message}
		</Alert>
	</>
}
