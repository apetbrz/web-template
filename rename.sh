FILES= rg -l -g "!rename.sh" "CHANGEME" .

echo "Renaming project to ${1}"
echo $FILES

echo $FILES | xargs sed -i "s/CHANGEME/${1}/g"
