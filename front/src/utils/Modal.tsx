import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { JSX, useEffect, useRef, useState } from 'react'

export default function Modal({actions}: {actions: JSX.Element}) {
	const [open, setOpen] = useState(false);
	const descriptionElementRef = useRef<HTMLElement>(null);

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
		scroll={"paper"}
		aria-labelledby="scroll-dialog-title"
		aria-describedby="scroll-dialog-description">
			<DialogTitle id="scroll-dialog-title">
				<span>Messages</span>
				<Button onClick={() => setOpen(false)}>Close</Button>
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
