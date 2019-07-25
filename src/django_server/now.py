'''
This script created for `now` local use:
```shell
$ python now.py [environment]
```

By default envrironment is same as your current git branch:
```shell
$ python now.py
envrironment as branch: True
branch: development
name: redfish-server-development
environment: development
command: now -n redfish-server-development -e DJANGO_ENV=development
```

To customize environment pass it as a first argument:
```shell
$ python now.py staging
envrironment as branch: False
branch: development
name: redfish-server-development
environment: staging
command: now -n redfish-server-development -e DJANGO_ENV=staging
'''

import os
import json
import argparse
from git import Repo
from subprocess import run

SCRIPT_DESCRIPTION = "Prepare and execute `now` command with custom name and environment variables."
DIR_PATH = os.path.dirname(os.path.realpath(__file__))
REPO = Repo(search_parent_directories=True)
BRANCH_NAME = str(REPO.active_branch)

# Script interface
interface = argparse.ArgumentParser(description=SCRIPT_DESCRIPTION)
interface.add_argument('--mark', default=BRANCH_NAME, help="custom mark (`branch name` by default)")
interface.add_argument('--env', default=BRANCH_NAME, help="custom environment (`branch name` by default)")
INPUT = interface.parse_args()

# Get values from now.json
with open(f'{DIR_PATH}/now.json', 'r') as now_file:
    now_file_content = now_file.read()
    NOW_CONFIG = json.loads(now_file_content)
NOW_ENV_NAME_DEFAULT = NOW_CONFIG['name']
DEFAULT_ENVIRONMENT = NOW_CONFIG['env']['DJANGO_ENV']
PROD_BRANCH = NOW_CONFIG['env']['PROD_BRANCH']
ENV_AS_BRANCH = eval(NOW_CONFIG['env']['ENV_AS_BRANCH'])

def logging():
	print('envrironment as branch:', ENV_AS_BRANCH)
	print(f'branch: {BRANCH_NAME}')
	print(f'name: {now_name}')
	print(f'environment: {environment}')
	print(f'command: {now_command}')
	print('executing...')

if __name__ == '__main__':
	mark = f'-{INPUT.mark}' if INPUT.mark != PROD_BRANCH else ""
	now_name = NOW_ENV_NAME_DEFAULT + mark
	environment = INPUT.env if ENV_AS_BRANCH else DEFAULT_ENVIRONMENT
	now_command = f'now -n {now_name} -e DJANGO_ENV={environment}'
	logging()
	run(now_command, shell=True, check=True)

