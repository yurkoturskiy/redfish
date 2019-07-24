'''
This script created for `now` local use:
```shell
$ python now.py [environment]
```

By default envrironment is same as your current git branch:
```shell
$ python now.py
branch: development
name: redfish-server-development
environment: development
command: now -n redfish-server-development -e DJANGO_ENV=development
```

To customize environment pass it as a first argument:
```shell
$ python now.py staging
branch: development
name: redfish-server-development
environment: staging
command: now -n redfish-server-development -e DJANGO_ENV=staging
'''

import os
import sys
import json
from git import Repo
from subprocess import run

# path where this script is located
DIR_PATH = os.path.dirname(os.path.realpath(__file__))

# read now.json file
with open(f'{DIR_PATH}/now.json', 'r') as now_file:
    now_file_content = now_file.read()
    now_config = json.loads(now_file_content)

# Check if environment argument is given
try:
	environment_arg = sys.argv[1]
except:
	environment_arg = False

# get name from now.json
now_env_name_default = str(now_config['name'])

# git branch name
repo = Repo(search_parent_directories=True)
branch_name = repo.active_branch

# add mark to name
now_name_mark = f"-{branch_name}" if branch_name != "master" else ""
now_name = now_env_name_default + now_name_mark

# set django environment
environment = branch_name if not environment_arg else environment_arg
DJANGO_ENV = f'DJANGO_ENV={environment}'

# prepare now command
command = f'now -n {now_name} -e {DJANGO_ENV}'

# logging
print(f'branch: {branch_name}')
print(f'name: {now_name}')
print(f'environment: {environment}')
print(f'command: {command}')
print('executing...')

# execute command
run(command, shell=True, check=True)
