export default function LoginForm({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = {
			username: formData.get("username"),
			password: formData.get("password"),
		}

		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {"Content-Type": "application/json"}
		})

		if (res.status >= 400) {
			const message = (await res.json()).message
			alert(message)
			return
		}

		const token = (await res.json()).access_token
		document.cookie = `jwt=${token}`
		setAuthenticated(true)
	}

	return <>
		<form onSubmit={onSubmit}>
			<input placeholder="Username" type="text" name="username" />
			<input placeholder="Password" type="password" name="password" />
			<button type="submit">Login</button>
		</form>
	</>
}
