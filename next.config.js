const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	cacheStartUrl: true,
	workboxOptions: {
		runtimeCaching: [
			{
				// drum samples never change after a release, so once a sample is
				// fetched it should be served from cache on every later visit
				// instead of hitting the network again
				urlPattern: /\.(?:mp3|wav|ogg)$/i,
				handler: "CacheFirst",
				options: {
					cacheName: "bandmate-drum-samples",
					expiration: {
						maxEntries: 250,
						maxAgeSeconds: 60 * 60 * 24 * 365,
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			...require("@ducanh2912/next-pwa").runtimeCaching,
		],
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: "https", hostname: "i.imgur.com", port: "", pathname: "/**" }],
	},
	webpack(config, options) {
		const { isServer } = options;

		// tone's package.json "browser" field points at its UMD bundle, which has
		// no ES exports at all; force resolution to the real ESM build instead
		config.resolve.alias["tone"] = require.resolve("tone/build/esm/index.js");

		config.module.rules.push({
			test: /\.(ogg|mp3|wav|mpe?g)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: require.resolve("url-loader"),
					options: {
						limit: config.inlineImageLimit,
						fallback: require.resolve("file-loader"),
						publicPath: `${config.assetPrefix}/_next/static/images/`,
						outputPath: `${isServer ? "../" : ""}static/images/`,
						name: "[name]-[hash].[ext]",
						esModule: config.esModule || false,
					},
				},
			],
		});

		return config;
	},
};

module.exports = withPWA(nextConfig);
