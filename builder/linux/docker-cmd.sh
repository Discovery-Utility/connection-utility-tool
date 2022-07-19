#!/bin/bash

TOOL_PATH=/home/node/connection-utility-tool
DIST_PATH=$TOOL_PATH/dist
DEFAULT_APPIMAGE_NAME=connection-utility-1.0.0-x86_64.AppImage
PROPOSED_APPIMAGE_NAME=$1

# install the dependencies from package.json  
npm install --no-save --prefix $TOOL_PATH
# Workaround. I don't really know why the dependencies are so complicated that it couldn't be resolved by single `npm install`
npm install --no-save --prefix $TOOL_PATH

# build the bundle to apply the changes 
npm run dev --prefix $TOOL_PATH

# build binary. It will be placed under $TOOL_PATH/dist
npm run build:linux --prefix $TOOL_PATH

# rename
mv $DIST_PATH/$DEFAULT_APPIMAGE_NAME $DIST_PATH/$PROPOSED_APPIMAGE_NAME
