// Re-exporta desde projects.ts para no romper imports existentes.
// La fuente única de verdad es src/lib/projects.ts
export type { Work, Project, ProjectSpec } from "./projects";
export { projects, works, getProject, getWork, getFeaturedProjects } from "./projects";
