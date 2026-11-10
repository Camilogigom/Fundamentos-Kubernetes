FROM python:3.12-alpine

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

RUN pip uninstall -y pip setuptools wheel; \
    rm -rf /usr/local/lib/python3.12/site-packages/pip* \
    /usr/local/lib/python3.12/site-packages/setuptools* \
    /usr/local/lib/python3.12/site-packages/pkg_resources* \
    /usr/local/lib/python3.12/site-packages/_distutils_hack \
    /usr/local/lib/python3.12/site-packages/wheel*

WORKDIR /app
COPY --chown=appuser:appgroup app.py .

ENV PORT=8081
ENV BACKEND_HOST="greca-central"
ENV BACKEND_PORT=8080
ENV NOMBRE_CLIENTE="carrito-san-antonio"

USER appuser
EXPOSE 8081

CMD ["python", "app.py"]
