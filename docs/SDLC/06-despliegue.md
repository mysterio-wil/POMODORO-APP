# Fase 6: Despliegue (Deployment)

## 6.1 Estrategia de Despliegue

### Entornos

```
Desarrollo (Local)
      ↓
Staging (Pre-producción)
      ↓
Producción
```

---

## 6.2 Preparación para Producción

### 6.2.1 Checklist Pre-Despliegue

**Backend**:
- [ ] Variables de entorno configuradas
- [ ] Base de datos de producción creada
- [ ] Migraciones de Prisma ejecutadas
- [ ] JWT_SECRET seguro generado
- [ ] CORS configurado para dominio de producción
- [ ] Logs configurados
- [ ] Rate limiting implementado
- [ ] HTTPS configurado

**Frontend**:
- [ ] Build de producción exitoso
- [ ] Variables de entorno configuradas
- [ ] API URL apuntando a producción
- [ ] Assets optimizados
- [ ] Service Worker configurado (PWA)
- [ ] Meta tags SEO configurados

---

## 6.2.2 Optimizaciones

### Backend

**Archivo**: `backend/src/index.ts`

```typescript
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

// Seguridad
app.use(helmet())

// Compresión
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Too many requests from this IP',
})
app.use('/api/', limiter)

// Producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
}
```

### Frontend

**Build Optimization** (`frontend/vite.config.ts`):

```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          axios: ['axios'],
        },
      },
    },
  },
})
```

---

## 6.3 Opciones de Hosting

### 6.3.1 Backend

#### Opción 1: Render.com (Recomendado)
**Pros**:
- ✅ Free tier disponible
- ✅ PostgreSQL incluido
- ✅ Deploy automático desde GitHub
- ✅ HTTPS automático
- ✅ Fácil configuración

**Pasos**:
1. Crear cuenta en Render.com
2. Conectar repositorio de GitHub
3. Crear Web Service
4. Configurar variables de entorno
5. Deploy automático

**Configuración** (`render.yaml`):
```yaml
services:
  - type: web
    name: pomodoro-api
    env: node
    buildCommand: cd backend && npm install && npx prisma generate
    startCommand: cd backend && npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production

databases:
  - name: pomodoro-db
    databaseName: pomodoro
    user: pomodoro_user
```

---

#### Opción 2: Railway.app
**Pros**:
- ✅ Deploy sencillo
- ✅ PostgreSQL incluido
- ✅ $5 de crédito gratis
- ✅ Escalable

---

#### Opción 3: Heroku
**Pros**:
- ✅ Bien documentado
- ✅ Add-ons disponibles
- ⚠️ Free tier limitado

---

### 6.3.2 Frontend

#### Opción 1: Vercel (Recomendado)
**Pros**:
- ✅ Optimizado para React/Vite
- ✅ Deploy automático
- ✅ CDN global
- ✅ HTTPS automático
- ✅ Free tier generoso

**Pasos**:
1. Crear cuenta en Vercel
2. Importar repositorio
3. Configurar build settings:
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
4. Configurar variables de entorno
5. Deploy

**Configuración** (`vercel.json`):
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

#### Opción 2: Netlify
**Pros**:
- ✅ Fácil de usar
- ✅ Free tier
- ✅ CDN global

**Configuración** (`netlify.toml`):
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 6.4 Configuración de Base de Datos

### Producción con Render PostgreSQL

```bash
# Conectar a base de datos de producción
DATABASE_URL="postgresql://user:password@host:5432/database"

# Ejecutar migraciones
npx prisma migrate deploy

# Verificar conexión
npx prisma studio
```

### Backup y Restauración

```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restauración
psql $DATABASE_URL < backup.sql
```

---

## 6.5 Variables de Entorno

### Backend (Producción)

```bash
# Base de datos
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="super-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=4000
NODE_ENV=production

# CORS
ALLOWED_ORIGINS="https://your-frontend-domain.com"
```

### Frontend (Producción)

```bash
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME="Pomodoro App"
VITE_ENABLE_ANALYTICS=true
```

---

## 6.6 CI/CD Pipeline

### GitHub Actions

**Archivo**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
      
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test
      
      - name: Lint
        run: npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          curl -X POST https://api.render.com/deploy/...

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npx vercel --prod --token=$VERCEL_TOKEN
```

---

## 6.7 Monitoreo y Logs

### Backend Logging

**Instalación**:
```bash
npm install winston
```

**Configuración** (`backend/src/utils/logger.ts`):
```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

export default logger
```

**Uso**:
```typescript
import logger from './utils/logger'

logger.info('Server started', { port: PORT })
logger.error('Database connection failed', { error })
```

---

### Monitoreo de Aplicación

**Opciones**:
1. **Sentry** - Error tracking
2. **LogRocket** - Session replay
3. **Google Analytics** - Analytics
4. **Uptime Robot** - Uptime monitoring

---

## 6.8 Seguridad en Producción

### Checklist de Seguridad

- [ ] HTTPS habilitado
- [ ] Helmet.js configurado
- [ ] Rate limiting implementado
- [ ] CORS configurado correctamente
- [ ] Variables de entorno seguras
- [ ] SQL injection protegido (Prisma)
- [ ] XSS protegido
- [ ] CSRF protegido
- [ ] Contraseñas hasheadas (bcrypt)
- [ ] JWT con expiración
- [ ] Validación de entrada (Zod)

### Configuración de Seguridad

```typescript
// backend/src/index.ts
import helmet from 'helmet'
import cors from 'cors'

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}))

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  credentials: true,
}))
```

---

## 6.9 Rollback Plan

### En caso de problemas

1. **Revertir deploy en Vercel**:
   ```bash
   vercel rollback
   ```

2. **Revertir deploy en Render**:
   - Ir al dashboard
   - Seleccionar deploy anterior
   - Click en "Redeploy"

3. **Revertir migraciones de BD**:
   ```bash
   npx prisma migrate resolve --rolled-back <migration_name>
   ```

---

## 6.10 Post-Deployment

### Verificación

- [ ] API health check responde
- [ ] Frontend carga correctamente
- [ ] Login funciona
- [ ] Crear tarea funciona
- [ ] Temporizador funciona
- [ ] Estadísticas se muestran
- [ ] No hay errores en consola
- [ ] Performance aceptable (< 2s load time)

### Documentación

- [ ] Actualizar README con URLs de producción
- [ ] Documentar proceso de deploy
- [ ] Crear guía de troubleshooting
- [ ] Documentar variables de entorno

---

## 6.11 Costos Estimados

| Servicio | Plan | Costo Mensual |
|----------|------|---------------|
| Render (Backend + DB) | Free / Starter | $0 / $7 |
| Vercel (Frontend) | Free | $0 |
| **Total** | | **$0 - $7** |

---

**Fecha de Creación**: 2025-11-29  
**Última Actualización**: 2025-11-29  
**Versión**: 1.0  
**Estado**: ⏳ Pendiente
