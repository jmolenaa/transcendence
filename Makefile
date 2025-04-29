# TODO
# for later setup a production branch
# and a frontend setup

RED=\033[1;31m
GREEN=\033[1;32m
YELLOW=\033[1;33m
BLUE=\033[1;34m
MAGENTA=\033[1;35m
CYAN=\033[1;36m
END=\033[0m

export BACKEND := ./project/backend
export FRONTEND := ./project/frontend
export NVM_DIR = ${HOME}/.nvm
export PACKAGE_FILE_PATH=${PWD}/packages.txt
export NODE_VERSION=v23.11

# scripts
NODE_INIT=./init_files/node_init.sh
BACKEND_INIT = ./init_files/backend_init.sh
STARTUP_SCRIPT = ./init_files/startup.sh

RM=rm -rf

# build stuff here
all: dev


production:
	@echo "${RED}No production flow yet :(${END}"

# startup server
dev: node backend frontend
	@${STARTUP_SCRIPT}

node:
# 	echo ${NODE_VERSION}
# 	export NODE_VERSION NODE_INIT=asd

	@${NODE_INIT}

# 	@export NODE_VERSION=${NODE_VERSION} && ${NODE_INIT}

backend:
# 	@export BACKEND=${BACKEND} NODE_VERSION=${NODE_VERSION} && ${BACKEND_INIT}
	@${BACKEND_INIT}

frontend:
	@echo "${YELLOW}Frontend doesn't require building yet${END}"

# cleanup node_modules
clean:
	@${RM} ${BACKEND}/node_modules

# cleanup package.json as well, be careful with this one, also cleanup .nvm or node?
reset: clean
	@${RM} ~/.nvm
	@${RM} ${BACKEND}/package.json
	@${RM} ${BACKEND}/package-lock.json

re: clean init


.PHONY: all init clean re fclean

