import { useNavigate } from "react-router"

function RegisterForm() {
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
			<input type="text" name="username" />
			<input type="password" name="password" />
			<input type="password" name="confirm-password" />
			<button type="submit">Register</button>
		</form>
	</>
}

function LoginForm({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const body = {
			username: formData.get("username"),
			password: formData.get("password"),
		}

		const res = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {"Content-Type": "application/json"}
		})

		if (res.status >= 400) {
			const message = (await res.json()).message
			alert(message)
			return
		}
		setAuthenticated(true)
	}

	return <>
		<form onSubmit={onSubmit}>
			<input type="text" name="username" />
			<input type="password" name="password" />
			<button type="submit">Login</button>
		</form>
	</>
}

export default function Index({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	return <>
		<RegisterForm/>
		<LoginForm setAuthenticated={setAuthenticated}/>
	</>
}
