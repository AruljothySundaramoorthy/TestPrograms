import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts"; // Bringing in router
const app = new Application();
const PORT = 4000;

app.use(router.routes()); // Pass our router as a middleware
app.use(router.allowedMethods()); // Allow HTTP methods on router

await app.listen({ port: PORT });
console.log(`Server running on PORT: ${PORT}`)