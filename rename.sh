FILES= rg -l -g "!rename.sh" "CHANGEME" .

echo "Renaming project to ${1}"
echo $FILES

rg -l -g "!rename.sh" "CHANGEME" . | xargs sed -i "s/CHANGEME/${1}/g" && echo "Success! Cleaning up..." && rm -rvf rename.sh .git || echo "Failure"
