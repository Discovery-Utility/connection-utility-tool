# UNTESTED! 

FROM mcr.microsoft.com/windows/servercore:1803 as installer

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v10.24.0/node-v10.24.0-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\; Rename-Item "C:\\node-v12.4.0-win-x64" c:\nodejs

FROM mcr.microsoft.com/windows/nanoserver:1803

WORKDIR C:/nodejs
COPY --from=installer C:/nodejs/ .
RUN SETX PATH C:\nodejs

RUN npm config set registry https://registry.npmjs.org/

CMD npm install --prefix C:/nodejs/connection-utility-tool && \
    npm run dev --prefix C:/nodejs/connection-utility-tool && \
    npm run build:win64 --prefix C:/nodejs/connection-utility-tool
    