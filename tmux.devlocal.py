import os
from subprocess import run


DIR_PATH = os.path.dirname(os.path.realpath(__file__))
APP_PATH = DIR_PATH
print('App path:', APP_PATH)

def shell(command):
	run(command, shell=True, check=True)

# run django server
shell(f"tmux new -s redfish -n django-server -c {APP_PATH}/src/django_server -d")
shell(f"tmux send-keys -t redfish:django-server 'cd {APP_PATH}/src/django_server' C-m")
shell(f"tmux send-keys -t redfish:django-server 'source venv/bin/activate' C-m")
shell(f"tmux send-keys -t redfish:django-server 'python manage.py runserver 0.0.0.0:9000' C-m")

# run react-app dev server
shell(f"tmux new-window -t redfish -n react-app -c {APP_PATH}/src/react-app -d")
shell(f"tmux send-keys -t redfish:react-app 'cd {APP_PATH}/src/react-app' C-m")
shell(f"tmux send-keys -t redfish:react-app 'npm start' C-m")

# run landing-page dev server
shell(f"tmux new-window -t redfish -n landing-page -c {APP_PATH}/src/landing-page -d")
shell(f"tmux send-keys -t redfish:landing-page 'cd {APP_PATH}/src/landing-page' C-m")
shell(f"tmux send-keys -t redfish:landing-page 'npm start' C-m")

# create window for git commands
shell(f"tmux new-window -t redfish -n console -c {APP_PATH} ")
shell(f"tmux send-keys -t redfish:console 'cd {APP_PATH}' C-m")
shell(f"tmux a")
