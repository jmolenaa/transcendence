#!/bin/bash

RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
MAGENTA='\033[1;35m'
CYAN='\033[1;36m'
END='\033[0m'


# this line is here to load nvm command into the shell if it is already installed
# if this isn't here the script will always flag nvm as uninstalled and try to install it
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# checking if we have node installed and if so if it's the correct version
if ! command -v node > /dev/null ; then 
    NEED_NODE_INSTALL=true
else
    CURRENT_NODE_VERSION=$(node -v | cut -d'.' -f1-2)
    if [ "$CURRENT_NODE_VERSION" != "$NODE_VERSION" ]; then
        NEED_NODE_INSTALL=true
    else
        NEED_NODE_INSTALL=false
    fi
fi

# checking if we have nvm installed
if ! command -v nvm > /dev/null ; then
    NEED_NVM_INSTALL=true
else
    NEED_NVM_INSTALL=false
fi

# based on what has been installed, install node and nvm
if [ "$NEED_NODE_INSTALL" = true ]; then

    if [ "$NEED_NVM_INSTALL" = true ]; then
        echo -e $RED"No nvm detected, installing ... $END"
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh 2> /dev/null  | bash > /dev/null 2> /dev/null
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    nvm install $NODE_VERSION
    nvm use $NODE_VERSION
    echo -e $GREEN"\nNode has been installed\n"$END
else
    echo -e $GREEN"\nCorrect version of Node already installed\n$END"
fi
