"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/users/signup/route";
exports.ids = ["app/api/users/signup/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "console":
/*!**************************!*\
  !*** external "console" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("console");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fsignup%2Froute&page=%2Fapi%2Fusers%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fsignup%2Froute&page=%2Fapi%2Fusers%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_epatlan_Documents_SDSU_Terms_2024_Fall2024_Big_Data_Hackathon_SDSU_signUp_auth_app_src_app_api_users_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/users/signup/route.ts */ \"(rsc)/./src/app/api/users/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/users/signup/route\",\n        pathname: \"/api/users/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/users/signup/route\"\n    },\n    resolvedPagePath: \"/Users/epatlan/Documents/SDSU/Terms/2024/Fall2024/Big-Data-Hackathon-SDSU/signUp/auth_app/src/app/api/users/signup/route.ts\",\n    nextConfigOutput,\n    userland: _Users_epatlan_Documents_SDSU_Terms_2024_Fall2024_Big_Data_Hackathon_SDSU_signUp_auth_app_src_app_api_users_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/users/signup/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VycyUyRnNpZ251cCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXNlcnMlMkZzaWdudXAlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ1c2VycyUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmVwYXRsYW4lMkZEb2N1bWVudHMlMkZTRFNVJTJGVGVybXMlMkYyMDI0JTJGRmFsbDIwMjQlMkZCaWctRGF0YS1IYWNrYXRob24tU0RTVSUyRnNpZ25VcCUyRmF1dGhfYXBwJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmVwYXRsYW4lMkZEb2N1bWVudHMlMkZTRFNVJTJGVGVybXMlMkYyMDI0JTJGRmFsbDIwMjQlMkZCaWctRGF0YS1IYWNrYXRob24tU0RTVSUyRnNpZ25VcCUyRmF1dGhfYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMyRTtBQUN4SjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2F1dGhfYXBwLz85Yzk1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9lcGF0bGFuL0RvY3VtZW50cy9TRFNVL1Rlcm1zLzIwMjQvRmFsbDIwMjQvQmlnLURhdGEtSGFja2F0aG9uLVNEU1Uvc2lnblVwL2F1dGhfYXBwL3NyYy9hcHAvYXBpL3VzZXJzL3NpZ251cC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlcnMvc2lnbnVwL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlcnMvc2lnbnVwXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2Vycy9zaWdudXAvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZXBhdGxhbi9Eb2N1bWVudHMvU0RTVS9UZXJtcy8yMDI0L0ZhbGwyMDI0L0JpZy1EYXRhLUhhY2thdGhvbi1TRFNVL3NpZ25VcC9hdXRoX2FwcC9zcmMvYXBwL2FwaS91c2Vycy9zaWdudXAvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3VzZXJzL3NpZ251cC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fsignup%2Froute&page=%2Fapi%2Fusers%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/users/signup/route.ts":
/*!*******************************************!*\
  !*** ./src/app/api/users/signup/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/dbConfig/dbConfig */ \"(rsc)/./src/dbConfig/dbConfig.ts\");\n/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/userModel */ \"(rsc)/./src/models/userModel.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _helpers_mailer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/helpers/mailer */ \"(rsc)/./src/helpers/mailer.ts\");\n\n\n\n\n\n(0,_dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_0__.connect)();\nasync function POST(request) {\n    try {\n        const reqBody = await request.json();\n        const { username, email, password } = reqBody;\n        console.log(reqBody);\n        const user = await _models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n            email\n        });\n        if (user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n                error: \"User already exists\"\n            }, {\n                status: 400\n            });\n        }\n        //hashing password\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().genSalt(10);\n        const hashedpassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hash(password, salt);\n        const newUser = new _models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n            username,\n            email,\n            password: hashedpassword\n        });\n        const savedUser = await newUser.save();\n        await (0,_helpers_mailer__WEBPACK_IMPORTED_MODULE_4__.sendMail)({\n            email: email,\n            emailType: \"VERIFY\",\n            userId: savedUser._id\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            message: \"User created successfully\",\n            success: true,\n            savedUser\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91c2Vycy9zaWdudXAvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4QztBQUNSO0FBRWlCO0FBQzFCO0FBQ2U7QUFFNUNBLDJEQUFPQTtBQUVBLGVBQWVLLEtBQUtDLE9BQW1CO0lBQzFDLElBQUk7UUFDQSxNQUFNQyxVQUFRLE1BQU1ELFFBQVFFLElBQUk7UUFDaEMsTUFBTSxFQUFDQyxRQUFRLEVBQUNDLEtBQUssRUFBQ0MsUUFBUSxFQUFDLEdBQUNKO1FBQ2hDSyxRQUFRQyxHQUFHLENBQUNOO1FBRVosTUFBTU8sT0FBTSxNQUFNYix5REFBSUEsQ0FBQ2MsT0FBTyxDQUFDO1lBQUNMO1FBQUs7UUFFckMsSUFBR0ksTUFBSztZQUNKLE9BQU9aLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7Z0JBQUNRLE9BQU07WUFBcUIsR0FBRTtnQkFBQ0MsUUFBTztZQUFHO1FBQ3RFO1FBQ0Esa0JBQWtCO1FBRWxCLE1BQU1DLE9BQU0sTUFBTWYsdURBQWMsQ0FBQztRQUNqQyxNQUFNaUIsaUJBQWlCLE1BQU1qQixvREFBVyxDQUFDUSxVQUFTTztRQUVsRCxNQUFNSSxVQUFTLElBQUlyQix5REFBSUEsQ0FDbkI7WUFBQ1E7WUFBU0M7WUFBTUMsVUFBU1M7UUFBYztRQUczQyxNQUFNRyxZQUFZLE1BQU1ELFFBQVFFLElBQUk7UUFFcEMsTUFBTXBCLHlEQUFRQSxDQUFDO1lBQUNNLE9BQU1BO1lBQU1lLFdBQVU7WUFBU0MsUUFBT0gsVUFBVUksR0FBRztRQUFBO1FBRW5FLE9BQU96QixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQ3JCb0IsU0FBUTtZQUNSQyxTQUFRO1lBQ1JOO1FBQ0o7SUFFSixFQUFFLE9BQU9QLE9BQVc7UUFDaEIsT0FBT2QscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUFDUSxPQUFNQSxNQUFNWSxPQUFPO1FBQUEsR0FBRTtZQUFDWCxRQUFPO1FBQUc7SUFFOUQ7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2F1dGhfYXBwLy4vc3JjL2FwcC9hcGkvdXNlcnMvc2lnbnVwL3JvdXRlLnRzPzE2ZjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJAL2RiQ29uZmlnL2RiQ29uZmlnXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiQC9tb2RlbHMvdXNlck1vZGVsXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiY29uc29sZVwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xuaW1wb3J0IHsgc2VuZE1haWwgfSBmcm9tIFwiQC9oZWxwZXJzL21haWxlclwiO1xuXG5jb25uZWN0KClcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDpOZXh0UmVxdWVzdCl7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVxQm9keT1hd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgICAgICBjb25zdCB7dXNlcm5hbWUsZW1haWwscGFzc3dvcmR9PXJlcUJvZHlcbiAgICAgICAgY29uc29sZS5sb2cocmVxQm9keSk7XG5cbiAgICAgICAgY29uc3QgdXNlcj0gYXdhaXQgVXNlci5maW5kT25lKHtlbWFpbH0pXG5cbiAgICAgICAgaWYodXNlcil7XG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe2Vycm9yOlwiVXNlciBhbHJlYWR5IGV4aXN0c1wifSx7c3RhdHVzOjQwMH0pXG4gICAgICAgIH1cbiAgICAgICAgLy9oYXNoaW5nIHBhc3N3b3JkXG5cbiAgICAgICAgY29uc3Qgc2FsdD0gYXdhaXQgYmNyeXB0LmdlblNhbHQoMTApXG4gICAgICAgIGNvbnN0IGhhc2hlZHBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsc2FsdClcblxuICAgICAgICBjb25zdCBuZXdVc2VyPSBuZXcgVXNlcihcbiAgICAgICAgICAgIHt1c2VybmFtZSxlbWFpbCxwYXNzd29yZDpoYXNoZWRwYXNzd29yZH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2F2ZWRVc2VyID0gYXdhaXQgbmV3VXNlci5zYXZlKClcblxuICAgICAgICBhd2FpdCBzZW5kTWFpbCh7ZW1haWw6ZW1haWwsZW1haWxUeXBlOidWRVJJRlknLHVzZXJJZDpzYXZlZFVzZXIuX2lkfSlcblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgICAgICAgbWVzc2FnZTpcIlVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6dHJ1ZSxcbiAgICAgICAgICAgIHNhdmVkVXNlclxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9IGNhdGNoIChlcnJvcjphbnkpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtlcnJvcjplcnJvci5tZXNzYWdlfSx7c3RhdHVzOjUwMH0pXG4gICAgICAgIFxuICAgIH1cbn0iXSwibmFtZXMiOlsiY29ubmVjdCIsIlVzZXIiLCJOZXh0UmVzcG9uc2UiLCJiY3J5cHQiLCJzZW5kTWFpbCIsIlBPU1QiLCJyZXF1ZXN0IiwicmVxQm9keSIsImpzb24iLCJ1c2VybmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJjb25zb2xlIiwibG9nIiwidXNlciIsImZpbmRPbmUiLCJlcnJvciIsInN0YXR1cyIsInNhbHQiLCJnZW5TYWx0IiwiaGFzaGVkcGFzc3dvcmQiLCJoYXNoIiwibmV3VXNlciIsInNhdmVkVXNlciIsInNhdmUiLCJlbWFpbFR5cGUiLCJ1c2VySWQiLCJfaWQiLCJtZXNzYWdlIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/users/signup/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/dbConfig/dbConfig.ts":
/*!**********************************!*\
  !*** ./src/dbConfig/dbConfig.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connect: () => (/* binding */ connect)\n/* harmony export */ });\n/* harmony import */ var console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! console */ \"console\");\n/* harmony import */ var console__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(console__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function connect() {\n    try {\n        mongoose__WEBPACK_IMPORTED_MODULE_1___default().connect(process.env.MONGO_URL) //! says don't worry. It will be available\n        ;\n        const connection = (mongoose__WEBPACK_IMPORTED_MODULE_1___default().connection);\n        connection.on(\"connected\", ()=>{\n            console.log(\"MongoDB connected Successfully\");\n        });\n        connection.on(\"error\", ()=>{\n            console.log(\"Mongo connection error. make suere DB is running \" + console__WEBPACK_IMPORTED_MODULE_0__.error);\n            process.exit();\n        });\n    } catch (error) {\n        console.log(\"Something went wrong\");\n        console.log(error);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvZGJDb25maWcvZGJDb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBZ0M7QUFDQTtBQUd6QixlQUFlRTtJQUNsQixJQUFJO1FBQ0FELHVEQUFnQixDQUFDRSxRQUFRQyxHQUFHLENBQUNDLFNBQVMsRUFBSSwwQ0FBMEM7O1FBQ3BGLE1BQU1DLGFBQWFMLDREQUFtQjtRQUN0Q0ssV0FBV0MsRUFBRSxDQUFDLGFBQVk7WUFDdEJDLFFBQVFDLEdBQUcsQ0FBQztRQUVoQjtRQUVBSCxXQUFXQyxFQUFFLENBQUMsU0FBUTtZQUNsQkMsUUFBUUMsR0FBRyxDQUFDLHNEQUFvRFQsMENBQUtBO1lBQ3JFRyxRQUFRTyxJQUFJO1FBRWhCO0lBR0osRUFDQSxPQUFPVixPQUFPO1FBQ1ZRLFFBQVFDLEdBQUcsQ0FBQztRQUNaRCxRQUFRQyxHQUFHLENBQUNUO0lBR2hCO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRoX2FwcC8uL3NyYy9kYkNvbmZpZy9kYkNvbmZpZy50cz9jMDc5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9yIH0gZnJvbSBcImNvbnNvbGVcIjtcbmltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICB0cnkge1xuICAgICAgICBtb25nb29zZS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPX1VSTCEpICAvLyEgc2F5cyBkb24ndCB3b3JyeS4gSXQgd2lsbCBiZSBhdmFpbGFibGVcbiAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247XG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9uZ29EQiBjb25uZWN0ZWQgU3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZXJyb3InLCgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1vbmdvIGNvbm5lY3Rpb24gZXJyb3IuIG1ha2Ugc3VlcmUgREIgaXMgcnVubmluZyBcIitlcnJvcik7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG5cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuXG4gICAgfVxufSJdLCJuYW1lcyI6WyJlcnJvciIsIm1vbmdvb3NlIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT19VUkwiLCJjb25uZWN0aW9uIiwib24iLCJjb25zb2xlIiwibG9nIiwiZXhpdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/dbConfig/dbConfig.ts\n");

/***/ }),

/***/ "(rsc)/./src/helpers/mailer.ts":
/*!*******************************!*\
  !*** ./src/helpers/mailer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendMail: () => (/* binding */ sendMail)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_userModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/userModel */ \"(rsc)/./src/models/userModel.js\");\n/* harmony import */ var _dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/dbConfig/dbConfig */ \"(rsc)/./src/dbConfig/dbConfig.ts\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n\n\n\n\n(0,_dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_2__.connect)();\nasync function sendMail({ email, emailType, userId }) {\n    const hashedToken = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(userId.toString(), 10);\n    const currentTime = new Date();\n    const expiryTime = new Date(currentTime.getTime() + 3600000); // 1 hour from now\n    console.log(\"Current time:\", currentTime);\n    console.log(\"Expiry time:\", expiryTime);\n    try {\n        if (emailType === \"REST\") {\n            await _models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findByIdAndUpdate(userId, {\n                forgotpasswordToken: hashedToken,\n                forgotpasswordToeknExpiry: expiryTime // Ensure this is a Date object\n            });\n        } else if (emailType === \"VERIFY\") {\n            await _models_userModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findByIdAndUpdate(userId, {\n                verifyToken: hashedToken,\n                verifyTokenExpiry: expiryTime // Ensure this is a Date object\n            });\n        }\n    } catch (error) {\n        throw new Error(error.message);\n    }\n    const transport = nodemailer__WEBPACK_IMPORTED_MODULE_3__.createTransport({\n        host: process.env.SMTP_HOST,\n        port: parseInt(process.env.SMTP_PORT, 10),\n        auth: {\n            user: process.env.SMTP_USER,\n            pass: process.env.SMTP_PASS\n        }\n    });\n    const mailOptions = {\n        from: process.env.SENDER_EMAIL,\n        to: email,\n        subject: emailType === \"REST\" ? \"Reset Password\" : \"Verify Email\",\n        html: `<p>Click <a href=\"http://localhost:3000/${emailType === \"REST\" ? \"resetpassword\" : \"verifyemail\"}?token=${hashedToken}\">here</a> to ${emailType === \"REST\" ? \"reset your password\" : \"verify your email\"}</p>\n               <p>http://localhost:3000/${emailType === \"REST\" ? \"resetpassword\" : \"verifyemail\"}?token=${hashedToken}</p>`\n    };\n    const emailResponse = await transport.sendMail(mailOptions);\n    return emailResponse;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvaGVscGVycy9tYWlsZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTZCO0FBQ1E7QUFDUTtBQUNWO0FBRW5DRSwyREFBT0E7QUFFQSxlQUFlRSxTQUFTLEVBQUVDLEtBQUssRUFBRUMsU0FBUyxFQUFFQyxNQUFNLEVBQU87SUFDNUQsTUFBTUMsY0FBYyxNQUFNUixvREFBVyxDQUFDTyxPQUFPRyxRQUFRLElBQUk7SUFDekQsTUFBTUMsY0FBYyxJQUFJQztJQUN4QixNQUFNQyxhQUFhLElBQUlELEtBQUtELFlBQVlHLE9BQU8sS0FBSyxVQUFVLGtCQUFrQjtJQUVoRkMsUUFBUUMsR0FBRyxDQUFDLGlCQUFpQkw7SUFDN0JJLFFBQVFDLEdBQUcsQ0FBQyxnQkFBZ0JIO0lBRTVCLElBQUk7UUFDQSxJQUFJUCxjQUFjLFFBQVE7WUFDdEIsTUFBTUwseURBQUlBLENBQUNnQixpQkFBaUIsQ0FBQ1YsUUFBUTtnQkFDakNXLHFCQUFxQlY7Z0JBQ3JCVywyQkFBMkJOLFdBQVcsK0JBQStCO1lBQ3pFO1FBRUosT0FBTyxJQUFJUCxjQUFjLFVBQVU7WUFDL0IsTUFBTUwseURBQUlBLENBQUNnQixpQkFBaUIsQ0FBQ1YsUUFBUTtnQkFDakNhLGFBQWFaO2dCQUNiYSxtQkFBbUJSLFdBQVcsK0JBQStCO1lBQ2pFO1FBQ0o7SUFDSixFQUFFLE9BQU9TLE9BQVk7UUFDakIsTUFBTSxJQUFJQyxNQUFNRCxNQUFNRSxPQUFPO0lBQ2pDO0lBRUEsTUFBTUMsWUFBWXRCLHVEQUEwQixDQUFDO1FBQ3pDd0IsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxTQUFTO1FBQzNCQyxNQUFNQyxTQUFTSixRQUFRQyxHQUFHLENBQUNJLFNBQVMsRUFBWTtRQUNoREMsTUFBTTtZQUNGQyxNQUFNUCxRQUFRQyxHQUFHLENBQUNPLFNBQVM7WUFDM0JDLE1BQU1ULFFBQVFDLEdBQUcsQ0FBQ1MsU0FBUztRQUMvQjtJQUNKO0lBRUEsTUFBTUMsY0FBYztRQUNoQkMsTUFBTVosUUFBUUMsR0FBRyxDQUFDWSxZQUFZO1FBQzlCQyxJQUFJckM7UUFDSnNDLFNBQVNyQyxjQUFjLFNBQVMsbUJBQW1CO1FBQ25Ec0MsTUFBTSxDQUFDLHdDQUF3QyxFQUFFdEMsY0FBYyxTQUFTLGtCQUFrQixjQUFjLE9BQU8sRUFBRUUsWUFBWSxjQUFjLEVBQUVGLGNBQWMsU0FBUyx3QkFBd0Isb0JBQW9CO3dDQUNoTCxFQUFFQSxjQUFjLFNBQVMsa0JBQWtCLGNBQWMsT0FBTyxFQUFFRSxZQUFZLElBQUksQ0FBQztJQUN2SDtJQUVBLE1BQU1xQyxnQkFBZ0IsTUFBTXBCLFVBQVVyQixRQUFRLENBQUNtQztJQUMvQyxPQUFPTTtBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0aF9hcHAvLi9zcmMvaGVscGVycy9tYWlsZXIudHM/NmM5YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvdXNlck1vZGVsJ1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ0AvZGJDb25maWcvZGJDb25maWcnXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJ1xuXG5jb25uZWN0KClcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRNYWlsKHsgZW1haWwsIGVtYWlsVHlwZSwgdXNlcklkIH06IGFueSkge1xuICAgIGNvbnN0IGhhc2hlZFRva2VuID0gYXdhaXQgYmNyeXB0Lmhhc2godXNlcklkLnRvU3RyaW5nKCksIDEwKTtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgZXhwaXJ5VGltZSA9IG5ldyBEYXRlKGN1cnJlbnRUaW1lLmdldFRpbWUoKSArIDM2MDAwMDApOyAvLyAxIGhvdXIgZnJvbSBub3dcblxuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCB0aW1lOlwiLCBjdXJyZW50VGltZSk7XG4gICAgY29uc29sZS5sb2coXCJFeHBpcnkgdGltZTpcIiwgZXhwaXJ5VGltZSk7XG5cbiAgICB0cnkge1xuICAgICAgICBpZiAoZW1haWxUeXBlID09PSAnUkVTVCcpIHtcbiAgICAgICAgICAgIGF3YWl0IFVzZXIuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XG4gICAgICAgICAgICAgICAgZm9yZ290cGFzc3dvcmRUb2tlbjogaGFzaGVkVG9rZW4sXG4gICAgICAgICAgICAgICAgZm9yZ290cGFzc3dvcmRUb2VrbkV4cGlyeTogZXhwaXJ5VGltZSAvLyBFbnN1cmUgdGhpcyBpcyBhIERhdGUgb2JqZWN0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGVtYWlsVHlwZSA9PT0gJ1ZFUklGWScpIHtcbiAgICAgICAgICAgIGF3YWl0IFVzZXIuZmluZEJ5SWRBbmRVcGRhdGUodXNlcklkLCB7XG4gICAgICAgICAgICAgICAgdmVyaWZ5VG9rZW46IGhhc2hlZFRva2VuLFxuICAgICAgICAgICAgICAgIHZlcmlmeVRva2VuRXhwaXJ5OiBleHBpcnlUaW1lIC8vIEVuc3VyZSB0aGlzIGlzIGEgRGF0ZSBvYmplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNwb3J0ID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICBob3N0OiBwcm9jZXNzLmVudi5TTVRQX0hPU1QsXG4gICAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlNNVFBfUE9SVCBhcyBzdHJpbmcsIDEwKSwgLy8gQ2FzdCBhcyBzdHJpbmcgYW5kIHRoZW4gcGFyc2VcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuU01UUF9VU0VSLFxuICAgICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuU01UUF9QQVNTXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1haWxPcHRpb25zID0geyBcbiAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuU0VOREVSX0VNQUlMLFxuICAgICAgICB0bzogZW1haWwsXG4gICAgICAgIHN1YmplY3Q6IGVtYWlsVHlwZSA9PT0gJ1JFU1QnID8gJ1Jlc2V0IFBhc3N3b3JkJyA6ICdWZXJpZnkgRW1haWwnLFxuICAgICAgICBodG1sOiBgPHA+Q2xpY2sgPGEgaHJlZj1cImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8ke2VtYWlsVHlwZSA9PT0gJ1JFU1QnID8gJ3Jlc2V0cGFzc3dvcmQnIDogJ3ZlcmlmeWVtYWlsJ30/dG9rZW49JHtoYXNoZWRUb2tlbn1cIj5oZXJlPC9hPiB0byAke2VtYWlsVHlwZSA9PT0gJ1JFU1QnID8gJ3Jlc2V0IHlvdXIgcGFzc3dvcmQnIDogJ3ZlcmlmeSB5b3VyIGVtYWlsJ308L3A+XG4gICAgICAgICAgICAgICA8cD5odHRwOi8vbG9jYWxob3N0OjMwMDAvJHtlbWFpbFR5cGUgPT09ICdSRVNUJyA/ICdyZXNldHBhc3N3b3JkJyA6ICd2ZXJpZnllbWFpbCd9P3Rva2VuPSR7aGFzaGVkVG9rZW59PC9wPmBcbiAgICB9O1xuXG4gICAgY29uc3QgZW1haWxSZXNwb25zZSA9IGF3YWl0IHRyYW5zcG9ydC5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgcmV0dXJuIGVtYWlsUmVzcG9uc2U7XG59XG4iXSwibmFtZXMiOlsiYmNyeXB0IiwiVXNlciIsImNvbm5lY3QiLCJub2RlbWFpbGVyIiwic2VuZE1haWwiLCJlbWFpbCIsImVtYWlsVHlwZSIsInVzZXJJZCIsImhhc2hlZFRva2VuIiwiaGFzaCIsInRvU3RyaW5nIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiZXhwaXJ5VGltZSIsImdldFRpbWUiLCJjb25zb2xlIiwibG9nIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCJmb3Jnb3RwYXNzd29yZFRva2VuIiwiZm9yZ290cGFzc3dvcmRUb2VrbkV4cGlyeSIsInZlcmlmeVRva2VuIiwidmVyaWZ5VG9rZW5FeHBpcnkiLCJlcnJvciIsIkVycm9yIiwibWVzc2FnZSIsInRyYW5zcG9ydCIsImNyZWF0ZVRyYW5zcG9ydCIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiU01UUF9IT1NUIiwicG9ydCIsInBhcnNlSW50IiwiU01UUF9QT1JUIiwiYXV0aCIsInVzZXIiLCJTTVRQX1VTRVIiLCJwYXNzIiwiU01UUF9QQVNTIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwiU0VOREVSX0VNQUlMIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImVtYWlsUmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/helpers/mailer.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/userModel.js":
/*!*********************************!*\
  !*** ./src/models/userModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assert */ \"assert\");\n/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! os */ \"os\");\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst { Mongoose, default: mongoose } = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst userSchema = new mongoose.Schema({\n    username: {\n        type: String,\n        required: [\n            true,\n            \"please provide a username\"\n        ],\n        unique: true\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            \"please provide a password\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"please provide password\"\n        ]\n    },\n    isverified: {\n        type: Boolean,\n        default: false\n    },\n    isAdmin: {\n        type: Boolean,\n        default: false\n    },\n    forgotpasswordToken: String,\n    forgotpasswordToeknExpiry: Date,\n    verifyToken: String,\n    verifyTokenExpiry: Date\n});\nconst User = mongoose.models.users || mongoose.model(\"users\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL3VzZXJNb2RlbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWdDO0FBQ0E7QUFDTjtBQUUxQixNQUFNLEVBQUVHLFFBQVEsRUFBRUMsU0FBU0MsUUFBUSxFQUFFLEdBQUdDLG1CQUFPQSxDQUFDLDBCQUFVO0FBQzFELE1BQU1DLGFBQWEsSUFBSUYsU0FBU0csTUFBTSxDQUFDO0lBQ25DQyxVQUFTO1FBQ0xQLE1BQUtRO1FBQ0xDLFVBQVM7WUFBQztZQUFLO1NBQTRCO1FBQzNDQyxRQUFPO0lBQ1g7SUFDQUMsT0FBTTtRQUNGWCxNQUFLUTtRQUNMQyxVQUFTO1lBQUM7WUFBSztTQUE0QjtJQUMvQztJQUNBRyxVQUFTO1FBQ0xaLE1BQUtRO1FBQ0xDLFVBQVM7WUFBQztZQUFLO1NBQTBCO0lBQzdDO0lBQ0FJLFlBQVc7UUFDUGIsTUFBS2M7UUFDTFosU0FBUTtJQUNaO0lBQ0FhLFNBQVE7UUFDSmYsTUFBS2M7UUFDTFosU0FBUTtJQUVaO0lBQ0FjLHFCQUFxQlI7SUFDckJTLDJCQUEyQkM7SUFDM0JDLGFBQWFYO0lBQ2JZLG1CQUFtQkY7QUFLdkI7QUFJQSxNQUFNRyxPQUFNbEIsU0FBU21CLE1BQU0sQ0FBQ0MsS0FBSyxJQUFJcEIsU0FBU3FCLEtBQUssQ0FBQyxTQUFRbkI7QUFFNUQsaUVBQWVnQixJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0aF9hcHAvLi9zcmMvbW9kZWxzL3VzZXJNb2RlbC5qcz9jNGRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0cmljdCB9IGZyb20gXCJhc3NlcnRcIjtcbmltcG9ydCB7IHZlcmlmeSB9IGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IHR5cGUgfSBmcm9tIFwib3NcIjtcblxuY29uc3QgeyBNb25nb29zZSwgZGVmYXVsdDogbW9uZ29vc2UgfSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgICB1c2VybmFtZTp7XG4gICAgICAgIHR5cGU6U3RyaW5nLFxuICAgICAgICByZXF1aXJlZDpbdHJ1ZSxcInBsZWFzZSBwcm92aWRlIGEgdXNlcm5hbWVcIl0sXG4gICAgICAgIHVuaXF1ZTp0cnVlLFxuICAgIH0sXG4gICAgZW1haWw6e1xuICAgICAgICB0eXBlOlN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6W3RydWUsXCJwbGVhc2UgcHJvdmlkZSBhIHBhc3N3b3JkXCJdLFxuICAgIH0sXG4gICAgcGFzc3dvcmQ6e1xuICAgICAgICB0eXBlOlN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6W3RydWUsXCJwbGVhc2UgcHJvdmlkZSBwYXNzd29yZFwiXSxcbiAgICB9LFxuICAgIGlzdmVyaWZpZWQ6e1xuICAgICAgICB0eXBlOkJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6ZmFsc2UsXG4gICAgfSxcbiAgICBpc0FkbWluOntcbiAgICAgICAgdHlwZTpCb29sZWFuLFxuICAgICAgICBkZWZhdWx0OmZhbHNlLFxuXG4gICAgfSxcbiAgICBmb3Jnb3RwYXNzd29yZFRva2VuOiBTdHJpbmcsXG4gICAgZm9yZ290cGFzc3dvcmRUb2VrbkV4cGlyeTogRGF0ZSxcbiAgICB2ZXJpZnlUb2tlbjogU3RyaW5nLFxuICAgIHZlcmlmeVRva2VuRXhwaXJ5OiBEYXRlLFxuICAgIFxuICAgIFxuICAgIFxuICAgIFxufSlcblxuXG5cbmNvbnN0IFVzZXI9IG1vbmdvb3NlLm1vZGVscy51c2VycyB8fCBtb25nb29zZS5tb2RlbChcInVzZXJzXCIsdXNlclNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7Il0sIm5hbWVzIjpbInN0cmljdCIsInZlcmlmeSIsInR5cGUiLCJNb25nb29zZSIsImRlZmF1bHQiLCJtb25nb29zZSIsInJlcXVpcmUiLCJ1c2VyU2NoZW1hIiwiU2NoZW1hIiwidXNlcm5hbWUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVuaXF1ZSIsImVtYWlsIiwicGFzc3dvcmQiLCJpc3ZlcmlmaWVkIiwiQm9vbGVhbiIsImlzQWRtaW4iLCJmb3Jnb3RwYXNzd29yZFRva2VuIiwiZm9yZ290cGFzc3dvcmRUb2VrbkV4cGlyeSIsIkRhdGUiLCJ2ZXJpZnlUb2tlbiIsInZlcmlmeVRva2VuRXhwaXJ5IiwiVXNlciIsIm1vZGVscyIsInVzZXJzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/models/userModel.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/nodemailer","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fusers%2Fsignup%2Froute&page=%2Fapi%2Fusers%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2Fsignup%2Froute.ts&appDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fepatlan%2FDocuments%2FSDSU%2FTerms%2F2024%2FFall2024%2FBig-Data-Hackathon-SDSU%2FsignUp%2Fauth_app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();