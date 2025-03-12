import { useEffect, useState } from "react"
import { Box, Button, Divider, Drawer, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Abc, Inbox, Mail } from "@mui/icons-material"
import { ServerMessage, ServerMessageProps } from "../../utils/ServerMessage"

type GroupData = {
	name: string,
	id: number
}

function CreateGroupPart({message, setMessage}: ServerMessageProps) {
	const [groupName, setGroupName] = useState("")

	async function createForm() {
		if (groupName.trim().length == 0) {
			setMessage({
				severity: "error",
				message: "Group name cannot be empty."
			})
			return
		}

		const res = await fetch(`/api/messages/create-group/${groupName}`, {
			method: "POST"
		})

		setMessage({
			severity: res.status >= 400 ? "error" : "success",
			message: (await res.json()).message
		})
	}

	return <>
		<div onClick={e => e.stopPropagation()} style={{display: "flex", justifyContent: "center"}}>
			<Input placeholder="Group name..." type="text"
				onChange={e => setGroupName(e.currentTarget.value)}/>
		</div>
		<ListItem disablePadding>
			<ListItemButton onClick={createForm}>
			<ListItemIcon>
				<Inbox />
			</ListItemIcon>
			<ListItemText primary={"Create group"} />
			</ListItemButton>
		</ListItem>
	</>
}

function GroupItem({group, onGroupClick}: {group: GroupData, onGroupClick: (g: GroupData) => void}) {
	return <>
		<ListItem key={group.id} disablePadding>
			<ListItemButton onClick={() => onGroupClick(group)}>
				<ListItemIcon>
					<Abc />
				</ListItemIcon>
				<ListItemText primary={group.name} />
			</ListItemButton>
		</ListItem>
	</>
}

type DrawerListProps = {
	onGroupClick: (group: GroupData) => void,
	setOpen: (a: boolean) => void,
	groups: GroupData[]
}

function DrawerList({setOpen, groups, onGroupClick, message, setMessage}: DrawerListProps & ServerMessageProps) {
	return (
		<Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
			<List>
				<CreateGroupPart {...{message, setMessage}}/>
			</List>
			<Divider />
			<List>
				{groups.map(group => <GroupItem key={group.id} {...{group, onGroupClick}}/>)}
			</List>
		</Box>
	)
}

export default function GroupList({message, setMessage}: ServerMessageProps) {
	const [groups, setGroups] = useState<GroupData[]>([])
	const [open, setOpen] = useState(false)

	function onGroupClick(group: GroupData) {
		console.log(group)
	}

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/messages/groups")
			setGroups(await res.json())
		})()
	}, [message])

	return <>
		<Button variant="outlined" onClick={() => setOpen(true)}>Show group list</Button>
		<Drawer onClose={() => setOpen(false)} open={open}>
			<DrawerList {...{message, setMessage, onGroupClick, groups, setOpen}}/>
		</Drawer>
	</>
}
