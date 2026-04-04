import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const contentDir = process.env.INTERSITE_CONTENT_DIR;

const pipelineState = z.enum([
  "raw_draft",
  "texturaize_review",
  "voice_review",
  "mk_review",
  "published",
  "archived",
]);

const themes = z
  .array(
    z.enum([
      "emergent-systems",
      "human-machine-interface",
      "autonomous-agents",
      "generative-media",
      "infrastructure-tooling",
    ]),
  )
  .default([]);

const projectSchema = z.object({
  name: z.string(),
  status: z.enum(["active", "shipped", "dormant", "early"]),
  domain: z.string(),
  themes,
  lineage: z.string().max(150).default(""),
  featured: z.boolean().default(false),
  tagline: z.string().default(""),
  repo: z.string().url().optional(),
  description: z.string(),
  what_was_learned: z.string().optional(),
  pipeline_state: pipelineState.default("raw_draft"),
  mk_approved_at: z.string().datetime().optional(),
});

const experimentSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  result: z.enum(["success", "failure", "inconclusive"]),
  summary: z.string(),
  pipeline_state: pipelineState.default("raw_draft"),
  mk_approved_at: z.string().datetime().optional(),
});

const pluginSchema = z.object({
  name: z.string(),
  description: z.string(),
  notable: z.boolean().default(false),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: contentDir ? `${contentDir}/projects` : "./src/content/projects" }),
  schema: projectSchema,
});

const experiments = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: contentDir ? `${contentDir}/experiments` : "./src/content/experiments",
  }),
  schema: experimentSchema,
});

const plugins = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: contentDir ? `${contentDir}/plugins` : "./src/content/plugins" }),
  schema: pluginSchema,
});

export const collections = { projects, experiments, plugins };
