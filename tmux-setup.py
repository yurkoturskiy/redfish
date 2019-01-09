import os
from subprocess import run


DIR_PATH = os.path.dirname(os.path.realpath(__file__))

def shell(command):
	run(command, shell=True, check=True)

# run django server
shell(f"tmux new -s redject -n django-server -c {DIR_PATH}/django_server -d")
shell(f"tmux send-keys -t redject:django-server 'source ../venv/bin/activate' C-m")
shell(f"tmux send-keys -t redject:django-server 'python manage.py runserver 9000' C-m")
# run react-app dev server
shell(f"tmux new-window -t redject -n react-app -c {DIR_PATH}/react-app -d")
shell(f"tmux send-keys -t redject:react-app 'source ../venv/bin/activate' C-m")
shell(f"tmux send-keys -t redject:react-app 'npm start' C-m")
# create window for git commands
shell(f"tmux new-window -t redject -n git -c {DIR_PATH} ")
shell(f"tmux send-keys -t redject:git 'source venv/bin/activate' C-m")

