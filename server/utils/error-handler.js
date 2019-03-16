module.exports = error_handler;
const error_message = "OOPSIE WOOPSIE!! Uwu We made a fucky wucky! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!";


function error_handler(err, req, res, next) {
	if (typeof (err) === 'string') {
		//custom application error
		return res.status(400).json({message: error_message});
	}

	if (err.name === 'UnauthorizedError') {
		//jwt authentication error
		return res.status(401).json({message: 'Invalid Token'});
	}

	//default to 500 internal server error
	return res.status(500).json({message: error_message})
}
