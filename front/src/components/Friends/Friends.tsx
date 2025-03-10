import { useState } from "react"
import { ServerMessage } from "../../utils/ServerMessage"
import AddFriend from "./AddFriend"
import FriendList from "./FriendList"
import RequestsReceived from "./RequestsReceived"
import ServerAlert from "../../utils/ServerMessage"

export default function Friends() {
	const [message, setMessage] = useState<ServerMessage>({severity: "error", message: ""})

	return <>
		<ServerAlert message={message}/>
		<AddFriend {...{setMessage}} />
		<RequestsReceived {...{message, setMessage}}/>
		<FriendList {...{message, setMessage}}/>
	</>
}
