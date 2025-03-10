import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { JSX, useEffect, useRef, useState } from 'react'

function Modal({actions}: {actions: JSX.Element}) {
	const [open, setOpen] = useState(false);
	const descriptionElementRef = useRef<HTMLElement>(null);

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return <>
		<Button variant='outlined' onClick={() => setOpen(true)}>Send Message</Button>
		<Dialog
		fullWidth={true}
		maxWidth="xs"
		open={open}
		onClose={handleClose}
		scroll={"paper"}
		aria-labelledby="scroll-dialog-title"
		aria-describedby="scroll-dialog-description"
		>
			<DialogTitle id="scroll-dialog-title">
				<span>Messages</span>
				<Button onClick={handleClose}>Close</Button>
			</DialogTitle>
			<DialogContent dividers={true}>
			hello world
			</DialogContent>
			<DialogActions>
				{actions}
			</DialogActions>
		</Dialog>
	</>
}

export default function TchatUI() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const message = formData.get("message") as string
		console.log(message)
	}

	const actions = 
		<form onSubmit={onSubmit} style={{width: "100%", justifyContent: "space-around"}}>
			<Input name="message" style={{width: "100%"}} placeholder='Type your message...' type="text"/>
			<Button>Send message</Button>
		</form>

	return <>
		<Modal actions={actions}/>
	</>
}
