function Friend({username}: {username: string}) {
	
}

function AddFriend() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const username = formData.get("username")
		const res = await fetch(`/api/friends/add?username=${username}`)
		console.log(await res.json())
	}

	return <>
		<form onSubmit={onSubmit}>
			<label htmlFor="username">Add friend</label>
			<input type="text" placeholder="Username" name="username"/>
			<button type="submit">Send invitation</button>
		</form>
	</>
}

export default function Friends() {
	return <>
		<AddFriend/>
	</>
}
