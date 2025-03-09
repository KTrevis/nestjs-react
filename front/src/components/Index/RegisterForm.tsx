export default function RegisterForm() {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = {
			username: formData.get("username"),
			password: formData.get("password"),
		}

		if (body.password != formData.get("confirm-password")) {
			alert("Passwords do not match.")
			return
		}

		const res = await fetch("/api/users/register", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {"Content-Type": "application/json"}
		})

		const message = (await res.json()).message[0]

		if (res.status >= 400) {
			alert(message)
		}
	}

	return <>
		<form onSubmit={onSubmit}>
			<input placeholder="Username" type="text" name="username" />
			<input placeholder="Password" type="password" name="password" />
			<input placeholder="Confirm password" type="password" name="confirm-password" />
			<button type="submit">Register</button>
		</form>
	</>
}
