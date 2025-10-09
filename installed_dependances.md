cd ~/projects/SaaS-new

git init
git remote add origin https://github.com/STANFORIS/SaaS.git
git checkout -b main

git add .
git commit -m "Restructured project, updated modules, new layout"

# Force push to overwrite remote content with your local version
git push -f origin main
