import Navbar from "../Navbar/Navbar"

export default function Home({setAuthenticated}: {setAuthenticated: (authenticated: boolean) => void}) {
	return <>
		<Navbar {...{setAuthenticated}} />
		<div>HOME</div>
	</>
}
