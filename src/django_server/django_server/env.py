# Local environment variables
local = {
	'SERVER_URL': 'http://localhost:9000',
	'LANDING_URL': 'http://localhost:8000',
	'APPLICATION_URL': 'http://localhost:3000'
}

# Development environment variables
development = {
	'SERVER_URL': 'https://redfish-server-development.guandjoy.now.sh',
	'LANDING_URL': 'http://localhost:8000',
	'APPLICATION_URL': 'http://localhost:3000'
}

# Staging branch env variables
staging = {
	'SERVER_URL': 'https://redfish-server-staging.guandjoy.now.sh',
	'LANDING_URL': 'https://staging.redfish-project.gq',
	'APPLICATION_URL': 'https://app.staging.redfish-project.gq'	
}

# Master branch env variables
master = {
	'SERVER_URL': 'https://redfish-server.guandjoy.now.sh',
	'LANDING_URL': 'https://redfish-project.gq',
	'APPLICATION_URL': 'https://app.redfish-project.gq'
}
