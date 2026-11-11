import http.server
import json
import sys

# El servicio escucha en todas las interfaces del contenedor y en el puerto publicado por Docker.
HOST = "0.0.0.0"
PORT = 8080


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        respuesta = {
            "estado": "conectado",
            "mensaje": "🎉 ¡Felicidades! Lograste alinear el Host y el Puerto en Docker.",
            "host": HOST,
            "puerto": PORT
        }
        self.wfile.write(json.dumps(respuesta, indent=2, ensure_ascii=False).encode("utf-8"))

    def log_message(self, formato, *args):
        sys.stdout.write(f"[{self.log_date_time_string()}] {formato % args}\n")
        sys.stdout.flush()


if __name__ == "__main__":
    print(f"🚀 Iniciando servidor en http://{HOST}:{PORT}...")
    servidor = http.server.HTTPServer((HOST, PORT), Handler)
    servidor.serve_forever()
