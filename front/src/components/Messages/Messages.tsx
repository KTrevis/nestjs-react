import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"
import { useState } from "react"
import GroupList, { GroupData } from "./GroupList"
import MessageList from "./MessageList"

export default function Messages() {
	const [message, setMessage] = useState<ServerMessage>({severity: "success", message: ""})
	const [group, setGroup] = useState<GroupData | undefined>()

	return <>
		<ServerAlert {...{message}}/>
		<GroupList {...{setGroup, message, setMessage}}/>
		<MessageList {...{group}}/>
	</>
}
