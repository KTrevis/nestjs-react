import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { JSX, useEffect, useRef, useState } from 'react'

type ModalProps = {
	actions: JSX.Element,
	open: boolean,
	setOpen: (open: boolean) => void,
	title: string,
	body: JSX.Element
}

export default function Modal(props: ModalProps) {
	const descriptionElementRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (props.open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [props.open]);

	return <>
		<Dialog
		fullWidth={true}
		maxWidth="xs"
		open={props.open}
		scroll={"paper"}
		aria-labelledby="scroll-dialog-title"
		aria-describedby="scroll-dialog-description">
			<DialogTitle style={{display: "flex", justifyContent: "space-between"}} id="scroll-dialog-title">
				<span>{props.title}</span>
				<Button onClick={() => props.setOpen(false)}>Close</Button>
			</DialogTitle>
			<DialogContent dividers={true}>
			{props.body}
			</DialogContent>
			<DialogActions>
				{props.actions}
			</DialogActions>
		</Dialog>
	</>
}
