@echo off
rem Arranca PocketBase (puerto 8090). Tailscale Funnel lo publica en
rem https://desktop-e020bk9.taila973ce.ts.net para el sitio publicado y el visor de Francisco.
rem Tiene que quedar abierto: si se cierra esta ventana, el sitio publicado pasa a la copia fija de datos/.
cd /d "%~dp0"
tienda\pocketbase\pocketbase.exe serve --dir tienda\pocketbase\pb_data --hooksDir tienda\pocketbase\pb_hooks --migrationsDir tienda\pocketbase\pb_migrations
