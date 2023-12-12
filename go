#!/bin/zsh -f
source ~/.zshrc


run() {
    docker-compose stop
    docker-compose rm -f
    docker-compose up -d
}

# Get the function name from the command-line argument
function_name=$1

# Check if a function with the provided name exists
if [[ "$(type $function_name 2>/dev/null)" == *function* ]]; then
    # Invoke the function
    $function_name
else
    echo "Function '$function_name' not found."
fi