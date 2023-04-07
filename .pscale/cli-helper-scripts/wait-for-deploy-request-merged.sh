function wait_for_deploy_request_merged {
    local retries=$1
    local db=$2
    local number=$3
    local org=$4
    
    # check whether fifth parameter is set, otherwise use default value
    if [ -z "$5" ]; then
        local max_timeout=600
    else
        local max_timeout=$5
    fi

    local count=0
    local wait=1

    echo "Checking if deploy request $number is ready for use..."
    while true; do
        local raw_output=`pscale deploy-request list "$db" --org "$org" --format json`
        # check return code, if not 0 then error
        if [ $? -ne 0 ]; then
            echo "Error: pscale deploy-request list returned non-zero exit code $?: $raw_output"
            return 1
        fi
        local output=`echo $raw_output | jq ".[] | select(.number == $number) | .deployment.state"`
        # test whether output is pending, if so, increase wait timeout exponentially
        if [ "$output" = "\"pending\"" ] || [ "$output" = "\"in_progress\"" ] || [ "$output" = "\"submitting\"" ] || [ "$output" = "\"in_progress_cutover\"" ]; then
            # increase wait variable exponentially but only if it is less than max_timeout
            if [ $((wait * 2)) -le $max_timeout ]; then
                wait=$((wait * 2))
            else
                wait=$max_timeout
            fi  

            count=$((count+1))
            if [ $count -ge $retries ]; then
                echo  "Deploy request $number is not ready after $retries retries. Exiting..."
                return 2
            fi
            echo  "Deploy-request $number is not deployed yet. Current status:"
            echo "show vitess_migrations\G" | pscale shell "$db" main --org "$org"
            echo "Retrying in $wait seconds..."
            sleep $wait
        elif [ "$output" = "\"complete\"" ] || [ "$output" = "\"complete_pending_revert\"" ]; then
            echo  "Deploy-request $number has been deployed successfully."
            return 0
        else
            echo  "Deploy-request $number with unknown status: $output"
            return 3
        fi
    done
}
