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
		client: {"start":"_app/immutable/entry/start.CD80rpdy.js","app":"_app/immutable/entry/app.Bm1EMyCB.js","imports":["_app/immutable/entry/start.CD80rpdy.js","_app/immutable/chunks/entry.CTNsL7jg.js","_app/immutable/chunks/scheduler.Cl_kRo4D.js","_app/immutable/chunks/index.D6sS8L-H.js","_app/immutable/entry/app.Bm1EMyCB.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.Cl_kRo4D.js","_app/immutable/chunks/index.CEzISSJJ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CkqFZZD-.js')),
			__memo(() => import('./chunks/1-C4UZBA9S.js')),
			__memo(() => import('./chunks/2-DCgnbK9c.js'))
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
