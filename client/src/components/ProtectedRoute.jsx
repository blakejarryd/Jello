import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ authorised, children }) => { 
	if (authorised === true) {
		return children
	} else if (authorised === false) {
		return <Navigate to="/login" />
	} else {
		// this is where we put loading spinner
		return <p>loading</p>
	}
	
}

export default ProtectedRoute
