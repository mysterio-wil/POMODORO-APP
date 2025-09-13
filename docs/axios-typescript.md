# Buenas prácticas con Axios + TypeScript

Este documento recoge las convenciones y buenas prácticas que seguimos en este proyecto al usar **Axios** junto con **TypeScript**, con el fin de mantener un tipado fuerte, evitar el uso de `any` y garantizar escalabilidad.

---

## 1. Tipado de respuestas de autenticación

Siempre definimos interfaces para las respuestas de la API.  
Ejemplo para login/registro:

```ts
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
```

Uso en el contexto de autenticación:

```ts
const res = await api.post<AuthResponse>("/auth/login", {
  email,
  password,
});

const data: AuthResponse = res.data;
```

## 2. Manejo de errores con Axios

Nunca usamos `catch (error: any)`.
En su lugar, empleamos `axios.isAxiosError` para tipar correctamente:

```ts
try {
  await api.post<AuthResponse>("/auth/login", { email, password });
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## 3. Tipado de tareas (Task)

Definimos una interfaz global para el modelo de tareas:

```ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

Uso en los servicios:

```ts
// Obtener todas las tareas
export async function getTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>("/tasks");
  return res.data;
}

// Actualizar tarea
export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, updates);
  return res.data;
}
```

## 4. Reglas generales

✅ Siempre usar interfaces o types para tipar datos de entrada y salida.

✅ Preferir `Partial<T>` en actualizaciones parciales.

✅ Nunca usar `any` salvo casos muy justificados.

✅ Centralizar lógica de API en `services/` y no en los componentes.

✅ Usar interceptores de Axios para gestión de tokens y errores globales.

## 5. Recursos recomendados

*   [Documentación oficial de Axios](https://axios-http.com/docs/intro)
*   [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
*   [Guía de buenas prácticas con Axios y TS](https://www.google.com/search?q=axios+typescript+best+practices)

📌 Esta guía se irá actualizando conforme el proyecto crezca y se incorporen más patrones de arquitectura.
