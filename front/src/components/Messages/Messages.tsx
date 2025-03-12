import ServerAlert, { ServerMessage, ServerMessageProps } from "../../utils/ServerMessage"
import { useState } from "react"
import CreateGroup from "./CreateGroup"
import GroupList from "./GroupList"

export default function Messages() {
	const [message, setMessage] = useState<ServerMessage>({severity: "success", message: ""})

	return <>
		<ServerAlert message={message}/>
		<GroupList {...{message, setMessage}}/>
	</>
}
