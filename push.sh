# Get date and time
date
date +"%FORMAT"
var=$(date)
var=`date`

time
time +"%FORMAT"
var=$(time)
var=`time`


# Git actions
git add .
git commit -m "Lazy push at $date $time"
git push origin master