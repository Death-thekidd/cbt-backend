// Responsible for sending an http response
// And logging the activity after that
const { v4: uuidv4 } = require('uuid');
const backlogService = require("../services/back-log.service")
const on = require("./on")

const respondAndLog = (req, res) => async data => {

	// First send the response
	const response = removeFrom(data, [ "activity", "operator" ])
	res.status(data.status).json({ ...response })
	

	// What should happen when the operator id doesn't exist?
	// Operator id might have to be a string
	const operatorId = req.user ? req.user.id : "2e0fe763-1ddf-4170-9ea7-857ec70ae1d6"
	//const id = uuidv4()
	
	if(data.errorMessage)
		console.log(data.errorMessage)
	

	// Handle logging
	const [ logError, logResult ] = await on(backlogService.createBacklog({
		id:  uuidv4(),
		operatorId,
		activity: data.activity,
		errorMessage: data.errorMessage ? data.errorMessage: { name: "None" },
		status: data.code,
		code: data.status

	}))

	if(logError)
		console.log(logError) 
		

}

module.exports = respondAndLog

function removeFrom(obj, properties){

	const extracted = {}

	Object.keys(obj).forEach(key => {

		if(!properties.includes(key))
			extracted[key] = obj[key]

	})

	return extracted

}
