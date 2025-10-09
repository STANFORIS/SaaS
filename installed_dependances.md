# 1. Clone the repository from GitHub
git clone https://github.com/STANFORIS/SaaS.git SaaS

cd SaaS

# 2. (Optional) Remove everything, then copy in your local files
#    Or you can merge by hand.
rm -rf *        # Be careful: this deletes all files (except .git folder)
cp -r /path/to/your/new-project/* .

# 3. Stage all changes
git add .

# 4. Commit
git commit -m "Reorganized directory structure and updated project"

# 5. Push to GitHub
git push origin main
