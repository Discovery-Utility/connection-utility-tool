FROM centos/nodejs-10-centos7

WORKDIR /home/node/

ENV USE_SYSTEM_7ZA=true
# ENV DEBUG=electron-builder

USER root

RUN yum -y update && \
    yum install -y epel-release && \
    yum install -y p7zip

COPY docker-cmd.sh /home/node/docker-cmd.sh
RUN chmod +x /home/node/docker-cmd.sh

ENTRYPOINT ["./docker-cmd.sh"]
CMD ["PowerStore-Discovery-Utility.AppImage"]
