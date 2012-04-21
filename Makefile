SRC_DIR = .
BUILD_DIR = build

BASE_FILES = ${SRC_DIR}/mquery.js

all: core core-test yui

core:
	@cat ${BUILD_DIR}/pre ${BASE_FILES} ${BUILD_DIR}/post > ${BUILD_DIR}/mquery.js

yui:
	@cat ${BUILD_DIR}/yui-pre ${BASE_FILES} ${BUILD_DIR}/yui-post > ${BUILD_DIR}/mquery-yui.js

core-test:
	@cat ${BUILD_DIR}/test-pre ${BASE_FILES} ${BUILD_DIR}/test-post > ${BUILD_DIR}/mquery-test.js