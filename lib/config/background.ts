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

export const backgroundConfig = {
  type: "earth" as "earth" | "grid" | "cityscape" | "mesh",

  /** Primary glow / accent color injected into the scene. */
  glow: "red" as "red" | "blue" | "green" | "gold",

  /** Show animated floating particles. */
  particles: true,

  /** Enable scroll-driven parallax on the background layers. */
  parallax: true,
};
