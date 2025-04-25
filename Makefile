BACKEND := ./project/backend
FRONTEND := ./project/frontend

# build stuff here
all:


# initiliase, so npm init and install all the various packages we need
init:




# cleanup node_modules
clean:


# cleanup package.json as well, be careful with this one, also cleanup .nvm or node?
fclean: clean


re: fclean init




.PHONY: all init clean re fclean

