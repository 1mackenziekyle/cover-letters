# Get date and time
currentdatetime=$(date)

# Print message to terminal
echo "############################################"
echo Lazy pushing at $currentdatetime
echo "############################################"

# Git actions
git add .
git commit -m "Lazy push at $currentdatetime"
git push origin master