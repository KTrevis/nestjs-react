import { useEffect, useState } from "react"
import { Box, Button, Divider, Drawer, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Abc, Inbox, Mail } from "@mui/icons-material"

type GroupData = {
	name: string,
	id: number
}

function CreateGroupPart() {
	const [groupName, setGroupName] = useState("")

	return <>
		<div onClick={e => e.stopPropagation()} style={{display: "flex", justifyContent: "center"}}>
			<Input placeholder="Group name..." type="text"
				onChange={e => setGroupName(e.currentTarget.value)}/>
		</div>
		<ListItem disablePadding>
			<ListItemButton>
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

function DrawerList({setOpen, groups, onGroupClick}: DrawerListProps) {
	return (
		<Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
			<List>
				<CreateGroupPart/>
			</List>
			<Divider />
			<List>
				{groups.map(group => <GroupItem key={group.id} {...{group, onGroupClick}}/>)}
			</List>
		</Box>
	)
}

export default function GroupList() {
	const [groups, setGroups] = useState<GroupData[]>([])
	const [drawer, setDrawer] = useState(false)

	function onGroupClick(group: GroupData) {
		console.log(group)
	}

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/messages/groups")
			setGroups(await res.json())
		})()
	}, [])

	return <>
		<Button variant="outlined" onClick={() => setDrawer(true)}>Show group list</Button>
		<Drawer onClose={() => setDrawer(false)} open={drawer}>
			<DrawerList onGroupClick={onGroupClick} groups={groups} setOpen={setDrawer}/>
		</Drawer>
	</>
}
