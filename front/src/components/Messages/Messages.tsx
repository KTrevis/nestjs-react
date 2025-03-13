import ServerAlert, { ServerMessage } from "../../utils/ServerMessage"
import { useEffect, useRef, useState } from "react"
import GroupList, { GroupData } from "./GroupList"
import MessageList from "./MessageList"
import { io, Socket } from "socket.io-client"


export default function Messages() {
	const [message, setMessage] = useState<ServerMessage>({severity: "success", message: ""})
	const [group, setGroup] = useState<GroupData | undefined>()
	const socket = useRef<Socket>(initSocket())

	function initSocket() {
		const instanceSocket = io(window.location.origin, {
			path: "/api/chat",
		})
		return instanceSocket
	}

	useEffect(() => {
		return () => { socket.current.disconnect() }
	}, [])

	useEffect(() => {
		if (group == undefined || socket.current == null) {
			return
		}
		socket.current.emit("join-group", {group: group.name})
	}, [group])

	return <>
		<ServerAlert {...{message}}/>
		<GroupList {...{setGroup, message, setMessage}}/>
		<MessageList socket={socket.current} {...{group}}/>
	</>
}
