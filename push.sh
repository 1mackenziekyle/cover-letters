# Get date and time

date
date +"%FORMAT"
currentdatetime=$(date)
currentdatetime=`date`
echo Lazy pushing at $currentdatetime

# Git actions
git add .
git commit -m "Lazy push at $currentdatetime"
git push origin master