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

export BACKEND := ./backend
export FRONTEND := ./frontend
export NVM_DIR = ${HOME}/.nvm
export PACKAGE_FILE_PATH=${PWD}/packages.txt
export NODE_VERSION=v23.11

# scripts
NODE_INIT=./init_files/node_init.sh
BACKEND_INIT = ./init_files/backend_init.sh
FRONTEND_INIT = ./init_files/frontend_init.sh
STARTUP_SCRIPT = ./init_files/startup.sh

RM=rm -rf

all: dev

production:
	@echo "${RED}No production flow yet :(${END}"

# starts in dev mode, will start server with nodemon, so it monitors changes to files and restarts automatically
dev: node backend frontend
	@${STARTUP_SCRIPT}

# calls script that makes sure the right version of node is being used
node:
	@${NODE_INIT}

# initialises package.json and installs modules if they aren't already there
backend:
	@${BACKEND_INIT}

frontend:
	@${FRONTEND_INIT}

# cleanup node_modules
clean:
	@${RM} ${BACKEND}/node_modules
	@${RM} ${FRONTEND}/node_modules

lint:
	@echo "${YELLOW}Linting the backend...${END}"
	@cd ${BACKEND} && npm run lint || true
	@echo "${YELLOW}Linting the frontend...${END}"
	@cd ${FRONTEND} && npm run lint || true

lint-fix:
	@echo "${YELLOW}Linting and fixing the backend...${END}"
	@cd ${BACKEND} && npm run lint:fix || true
	@echo "${YELLOW}Linting and fixing the frontend...${END}"
	@cd ${FRONTEND} && npm run lint:fix || true

# cleanup package.json as well
reset: clean
	@${RM} ~/.nvm
	@${RM} ${BACKEND}/package.json
	@${RM} ${BACKEND}/package-lock.json
	@${RM} ${FRONTEND}/package.json
	@${RM} ${FRONTEND}/package-lock.json

re: clean dev

.PHONY: all dev clean re reset backend frontend node production

