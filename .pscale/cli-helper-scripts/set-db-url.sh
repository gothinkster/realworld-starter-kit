if [ -z "$MY_DB_URL" ]; then
    echo "MY_DB_URL not set, using default database - this will potentially interfere with demos of other users using the same repo at the same time"
else
    echo "MY_DB_URL set, using your personal database"
    export DATABASE_URL="$MY_DB_URL"
fi

# if DATABASE_URL is not set, exit
if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not set, exiting"
    exit 1
fi