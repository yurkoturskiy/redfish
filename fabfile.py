from fabric import Connection
import os
# import sys
c = Connection('User-PC')
dir_path = os.path.dirname(os.path.realpath(__file__))

# run django server
c.local(f"tmux new -s redject -n django-server -c {dir_path}/django_server/ -d")
c.local(f"tmux send-keys -t redject:django-server 'source ../venv/bin/activate' C-m")
c.local(f"tmux send-keys -t redject:django-server 'python manage.py runserver 9000' C-m")
# run react-app dev server
c.local(f"tmux new-window -t redject -n react-app -c {dir_path}/react-app/ -d")
c.local(f"tmux send-keys -t redject:react-app 'source ../venv/bin/activate' C-m")
c.local(f"tmux send-keys -t redject:react-app 'npm start' C-m")
# create window for git commands
c.local(f"tmux new-window -t redject -n git -c {dir_path} -d")
c.local(f"tmux send-keys -t redject:git 'source venv/bin/activate' C-m")


# if __name__ == '__main__':
# 	if len(sys.argv) > 1:
# 		# sessions = ['redis', 'django', 'sebucur', 'react',]
# 		sessions = sys.argv[1:]
# 		print(sys.argv)
# 		print(sessions)
# 		for session in sessions:
# 			eval(session)()
# 	else:
# 		redis()
# 		django()
# 		sebucur()
# 		react()
