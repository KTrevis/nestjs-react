import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Link } from "react-router";
import { Menu } from "@mui/icons-material";

export default function Navbar({authenticated, setAuthenticated}: {
	setAuthenticated: (authenticated: boolean) => void,
	authenticated: boolean,
}) {
	const logout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.preventDefault()
		document.cookie = "jwt="
		setAuthenticated(false)
	}

	return <>
      <Accordion>
        <AccordionSummary
          expandIcon={<Menu/>}
		  sx={{ flexDirection: "row-reverse" }}
          aria-controls="panel1-content"
          id="panel1-header">
        </AccordionSummary>
        <AccordionDetails style={{textAlign: "center"}}>
			<Link to="/home">Home</Link>
			<Link to="/friends">Friends</Link>
			<Link to="/messages">Messages</Link>
			<a href="/logout" onClick={logout}>Logout</a>
        </AccordionDetails>
      </Accordion>
	</>
}
