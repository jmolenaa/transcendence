RED=\033[1;31m
GREEN=\033[1;32m
YELLOW=\033[1;33m
BLUE=\033[1;34m
MAGENTA=\033[1;35m
CYAN=\033[1;36m
END=\033[0m

BACKEND := ./project/backend
FRONTEND := ./project/frontend

NODE_VERSION := v22.2

# scripts
NODE_INIT = ./init_files/node_init.sh



# TODO
# for later setup a production branch
# and a frontend setup
# build stuff here
all: dev


production:
	@echo "${RED}No production flow yet :(${END}"


# startup server
dev: node backend frontend
	@echo huh


node:
	@export NODE_VERSION=${NODE_VERSION} && ${NODE_INIT}

backend:



frontend:
	@echo "${YELLOW}Frontend doesn't require building yet${END}"


package:
	echo hi


# initiliase, so npm init and install all the various packages we need
init:



# cleanup node_modules
clean:


# cleanup package.json as well, be careful with this one, also cleanup .nvm or node?
fclean: clean


re: fclean init


.PHONY: all init clean re fclean

