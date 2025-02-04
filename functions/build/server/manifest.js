const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Arrow.svg","carti.jpg","ChicagoFLF.ttf","computer.svg","favicon.png","GenevaRegular.ttf","global.css","lyrictypeIcon.svg","sysfont.otf","windows-95.png"]),
	mimeTypes: {".svg":"image/svg+xml",".jpg":"image/jpeg",".ttf":"font/ttf",".png":"image/png",".css":"text/css",".otf":"font/otf"},
	_: {
		client: {"start":"_app/immutable/entry/start.DKEW0ONK.js","app":"_app/immutable/entry/app.5jHkNSwd.js","imports":["_app/immutable/entry/start.DKEW0ONK.js","_app/immutable/chunks/entry.BWGpgL5q.js","_app/immutable/chunks/scheduler.JpPFHltV.js","_app/immutable/chunks/index.DJchQHNX.js","_app/immutable/entry/app.5jHkNSwd.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.JpPFHltV.js","_app/immutable/chunks/index.18hp6mwB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-Bzz8RUT8.js')),
			__memo(() => import('./chunks/1-Bstl-TMY.js')),
			__memo(() => import('./chunks/2-BHZ_Me1I.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/proxy-image",
				pattern: /^\/api\/proxy-image\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BtXL4YiP.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
