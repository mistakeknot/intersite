import { getCollection } from "astro:content";

export async function getPublishedContent(
  collection: "projects" | "experiments",
) {
  const entries = await getCollection(collection);
  return entries.filter(
    (e) =>
      e.data.pipeline_state === "published" &&
      e.data.mk_approved_at !== undefined,
  );
}

export async function getPublishedProjects() {
  return getPublishedContent("projects");
}

export async function getFeaturedProjects() {
  const published = await getPublishedProjects();
  return published.filter((p) => p.data.featured);
}

export async function getPublishedExperiments() {
  const published = await getPublishedContent("experiments");
  return published.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getAllPlugins() {
  return getCollection("plugins");
}
