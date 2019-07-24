from git import Repo

repo = Repo(search_parent_directories=True)
branch = repo.active_branch
print(f'git branch: {branch}')