import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '../../utils/Modal';

export default function ChatUI({recipient}: {recipient: string}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const message = formData.get("message") as string
		console.log(message)
	}

	const actions = 
		<form onSubmit={onSubmit} style={{width: "100%", justifyContent: "space-around"}}>
			<Input
			name="message"
			style={{width: "100%"}}
			placeholder='Type your message...'
			type="text"/>
			<Button>Send message</Button>
		</form>

	return <>
		<Modal actions={actions}/>
	</>
}
