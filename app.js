const http = require('http');
const os = require('os');

const VERSION = '2.0';
const PORT = 3000;

const productos = [
  { nombre: 'Café de Chanchamayo', precio: 'S/ 28.00', icono: '☕' },
  { nombre: 'Cacao orgánico', precio: 'S/ 22.00', icono: '🍫' },
  { nombre: 'Miel de abeja', precio: 'S/ 18.00', icono: '🍯' },
  { nombre: 'Naranjas de la selva', precio: 'S/ 6.00', icono: '🍊' },
  { nombre: 'Plátano bellaco', precio: 'S/ 5.00', icono: '🍌' },
  { nombre: 'Palta fuerte', precio: 'S/ 9.00', icono: '🥑' }
];

function pagina() {
  const tarjetas = productos.map(p => `
      <div class="card">
        <div class="icono">${p.icono}</div>
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}</p>
        <button>Agregar</button>
      </div>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Andina Market</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f1ea; color: #2b2b2b; }
    header { background: linear-gradient(135deg, #1b5e20, #43a047); color: #fff; padding: 48px 20px; text-align: center; }
    header h1 { font-size: 2.6rem; letter-spacing: 1px; }
    header p { margin-top: 8px; opacity: .9; }
    .badge { display: inline-block; margin-top: 16px; background: #ffb300; color: #2b2b2b; padding: 6px 16px; border-radius: 20px; font-weight: bold; }
    main { max-width: 1000px; margin: 32px auto; padding: 0 20px; }
    h2 { margin-bottom: 20px; color: #1b5e20; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .card { background: #fff; border-radius: 14px; padding: 24px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,.08); transition: transform .2s; }
    .card:hover { transform: translateY(-6px); }
    .icono { font-size: 3rem; }
    .card h3 { margin: 12px 0 6px; font-size: 1.05rem; }
    .precio { color: #e65100; font-weight: bold; font-size: 1.2rem; margin-bottom: 14px; }
    button { background: #1b5e20; color: #fff; border: none; padding: 10px 22px; border-radius: 8px; cursor: pointer; font-size: .95rem; }
    button:hover { background: #2e7d32; }
    .info { margin-top: 36px; background: #fff; border-left: 5px solid #43a047; border-radius: 10px; padding: 18px 22px; font-size: .95rem; line-height: 1.7; }
    footer { text-align: center; padding: 28px; color: #777; font-size: .85rem; }
  </style>
</head>
<body>
  <header>
    <h1>🏔️ Andina Market</h1>
    <p>Productos frescos de la selva central del Perú</p>
    <span class="badge">Versión ${VERSION}</span>
  </header>
  <main>
    <h2>Productos destacados</h2>
    <div class="grid">${tarjetas}
    </div>
    <div class="info">
      <strong>✅ Desplegado automáticamente desde GitHub</strong><br>
      Servidor: ${os.hostname()}<br>
      Fecha del servidor: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
    </div>
  </main>
  <footer>Andina Market © 2026 — William Soto · SENATI</footer>
</body>
</html>`;
}

http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ estado: 'ok', version: VERSION }));
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(pagina());
}).listen(PORT, () => console.log(`Andina Market v${VERSION} en puerto ${PORT}`));
