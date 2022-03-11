# Get date and time
currentdatetime=$(date)

# Print message to terminal
echo "##########################################################"
echo Lazy pushing using push.sh at $currentdatetime
echo "##########################################################"



# Git actions
git add .
git commit -m "Lazy push at $date"
git push origin master