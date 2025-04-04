/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Using export instead of standalone to fix CSS processing issues
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Disable some features that might cause CSS/rendering issues
    experimental: {
        optimizeCss: false,
        esmExternals: false
    }
};

export default config;
