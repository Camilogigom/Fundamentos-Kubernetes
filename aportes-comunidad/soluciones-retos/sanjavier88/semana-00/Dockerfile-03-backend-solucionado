FROM python:3.12-alpine

# Usuario sin privilegios por seguridad
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

ENV PORT=8080
ENV NOMBRE_SERVICIO="greca-central"

USER appuser
EXPOSE 8080

CMD ["python", "app.py"]
