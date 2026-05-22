# Snake Game

Implementación del juego clásico Snake desarrollada con React y Vite.

## Tecnologías

- React 19 (JSX, hooks)
- Vite 8

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Cómo jugar

- Desde la pantalla principal presiona **JUGAR**
- Usa las teclas de dirección (↑ ↓ ← →) para mover la serpiente
- Come la comida roja para crecer y sumar puntos (+10 por comida)
- Evita chocar con las paredes o contigo mismo
- Al terminar puedes reiniciar o volver al inicio

## Funcionalidades

- Movimiento con teclado y detección de colisiones (paredes y cuerpo propio)
- Crecimiento de la serpiente al comer
- Puntaje en pantalla con mejor puntaje de la sesión
- Top 10 puntajes guardados en localStorage (persisten entre sesiones)
- Insignia "NUEVO RECORD" al superar un puntaje del top 10
- Aumento de dificultad progresivo: la serpiente acelera con cada comida
- Pantalla de inicio y pantalla de game over con opciones de reiniciar o volver al menú
- Diseño retro estilo CRT con fuente pixel, scanlines y paleta phosphor green

## Estructura de componentes

```text
App
├── HomeScreen          (pantalla principal con leaderboard)
└── Game                (contenedor del juego)
    ├── Score           (puntaje actual y mejor puntaje)
    ├── Board           (tablero / grilla)
    │   ├── Snake       (segmentos de la serpiente)
    │   ├── Food        (comida)
    │   ├── StartScreen (overlay inicial)
    │   └── GameOver    (overlay de fin de juego)
```
