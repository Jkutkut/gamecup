# Create app directory:
# Enter a docker container:
#   docker run --rm -it -v $(pwd):/app --entrypoint="/bin/sh" -w="/app" node:current-alpine3.16
# once in:
#  npm create vite@latest # Or any: 4.1.0...
# Ok to install the package
# Enter project name
# Select framework: React
# Select variant: TypeScript
# Done! Follow the steps and that's it!
#
# Bootstrap
# npm i bootstrap
# add to main.tsx:
# import 'bootstrap/dist/css/bootstrap.css'

#------------------------

OS	= $(shell uname -s)
ifeq ($(OS),Linux)
	CURRENT_PATH = $(shell pwd)
endif
ifeq ($(OS),Darwin)
	CURRENT_PATH = ${PWD}
endif

FRONT_NAME = gamecup
PORT_FRONT = 8080

DOCKER_CMD = docker run --rm -it --name ${FRONT_NAME}
DOCKER_APP_V = -v ${CURRENT_PATH}/${FRONT_NAME}/:/app -w /app
DOCKER_IMG_FRONT = node:current-alpine3.16

DEPENDENCIES = \
	$(shell find ./gamecup/index.html -type f) \
	$(shell find ./gamecup/*.json -type f) \
	$(shell find ./gamecup/src -type f)

RELEASE=gamecup/dist

install:
	${DOCKER_CMD} --entrypoint=npm ${DOCKER_IMG_FRONT} install

run_front:
	$(DOCKER_CMD) -p ${PORT_FRONT}:${PORT_FRONT} ${DOCKER_APP_V} --entrypoint=npm -e PORT=${PORT_FRONT} ${DOCKER_IMG_FRONT} run dev

terminal_front:
	$(DOCKER_CMD) ${DOCKER_APP_V} --entrypoint=/bin/sh ${DOCKER_IMG_FRONT}

build: ${RELEASE}

$(RELEASE): ${DEPENDENCIES}
	$(DOCKER_CMD) ${DOCKER_APP_V} --entrypoint=npm ${DOCKER_IMG_FRONT} run build

qr:
	docker run -it --rm jkutkut/py-qr ${shell hostname -I | awk '{print $$1}'}:${PORT_FRONT}

clean:
	rm -rf ${RELEASE}

.PHONY: install run_front terminal_front build qr
