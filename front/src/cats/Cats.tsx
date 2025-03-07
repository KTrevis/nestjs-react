import { useEffect, useState } from "react"

function Cat({name}: {name: string}) {
	const [details, setDetails] = useState("")

	async function onClick() {
		const res = await fetch(`/api/cats/${name}`)
		setDetails(await res.text())
	}

	return <>
		<div>{name}</div>
		{
			details == "" 
			?
			<button onClick={onClick}>Get details</button>
			:
			<p>{details}</p>
		}
	</>
}

function CatCreator({fetchCats}: {fetchCats: () => Promise<void>}) {
	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const json = JSON.stringify({
			"name": formData.get("name"),
			"details": formData.get("details")
		})

		const res = await fetch("/api/cats", {
			method: "POST",
			body: json,
			headers: {"Content-Type": "application/json"},
		})

		fetchCats()
	}

	return <>
		<p>Create cat form</p>
		<form onSubmit={onSubmit}>
			<input type="text" placeholder="Name" name="name" />
			<input type="text" placeholder="Details" name="details" />
			<button type="submit">Submit</button>
		</form>
	</>
}

export default function Cats() {
	const [cats, setCats] = useState<string[]>([])

	const fetchCats = async () => {
		const res = await fetch("/api/cats")
		setCats(await res.json())
	}

	useEffect(() => {fetchCats()}, [])

	return <>
		<CatCreator fetchCats={fetchCats}/>
		{cats.map((cat, index) => <Cat key={index} name={cat} />)}
	</>
}
