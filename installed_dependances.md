cd ~/projects/SaaS-new

git init
git remote add origin https://github.com/STANFORIS/SaaS.git
git checkout -b main

git add .
git commit -m "Current Update of Digital Identity API"

# Force push to overwrite remote content with your local version
git push -f origin main

git pull origin main
git pull --rebase origin main

git push origin main