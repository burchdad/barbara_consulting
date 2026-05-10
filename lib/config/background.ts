/**
 * Background / scene configuration.
 *
 * Controls the cinematic hero background system.
 * Change `type` to swap the visual theme without touching components.
 *
 * Supported types (extend HomepageCinematicScene to add new ones):
 *   "earth"       – rotating satellite earth photograph (default)
 *   "grid"        – abstract tech/AI grid (future)
 *   "cityscape"   – aerial city at night (future)
 *   "mesh"        – abstract gradient mesh (future)
 */

export const sceneTypes = ["earth", "grid", "cityscape", "mesh"] as const;
export type SceneType = (typeof sceneTypes)[number];

export const sceneGlows = ["red", "blue", "green", "gold"] as const;
export type SceneGlow = (typeof sceneGlows)[number];

export function normalizeSceneType(value: string | null | undefined): SceneType {
  return sceneTypes.includes(value as SceneType) ? (value as SceneType) : "grid";
}

export function normalizeSceneGlow(value: string | null | undefined): SceneGlow {
  return sceneGlows.includes(value as SceneGlow) ? (value as SceneGlow) : "blue";
}

export const backgroundConfig = {
  type: "grid" as SceneType,

  /** Primary glow / accent color injected into the scene. */
  glow: "blue" as SceneGlow,

  /** Show animated floating particles. */
  particles: true,

  /** Enable scroll-driven parallax on the background layers. */
  parallax: true,
};
