FROM python:3-alpine

ENV REDIS_URL="redis://redis:6379" \
    DJANGO_SETTINGS_MODULE="settings"

ADD ./ /opt/otree
ADD ./entrypoint.sh /entrypoint.sh
ADD ./pg_ping.py /pg_ping.py
ADD ./requirements.txt /opt/otree/requirements.txt
ADD ./requirements_base.txt /opt/otree/requirements_base.txt
ADD ./containers/super/rpc /opt/rpc

RUN apk -U add --no-cache bash \
                          curl \
                          gcc \
                          musl-dev \
                          postgresql \
                          postgresql-dev \
                          libffi \
                          libffi-dev \
                          nodejs \
                          npm \
    && pip install --no-cache-dir -r /opt/otree/requirements.txt \
    && mkdir -p /opt/init \
    && chmod +x /entrypoint.sh \
    && apk del curl gcc musl-dev postgresql-dev libffi-dev \
    && npm install -g /opt/rpc \
    && npm install -g ts-node \
    && npm install typescript

WORKDIR /opt/otree
VOLUME /opt/init
ENTRYPOINT ["/entrypoint.sh"]
CMD ["otree", "runprodserver", "--port=80"]
EXPOSE 80
