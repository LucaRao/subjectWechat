module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1662014035102, function(require, module, exports) {

const {default:hasToStringTag} = require("has-to-string-tag-x");
const isObject = require("is-object");
const {LENIENT_PROPERTIES, STRICT_PROPERTIES} = require("./props");

const SEARCH_PARAMS_CLASS = "[object URLSearchParams]";

const toStringTag = Object.prototype.toString;



const isURLSearchParams = (searchParams, supportIncomplete=false) =>
{
	if (!isObject(searchParams))
	{
		return false;
	}
	else if (hasToStringTag && toStringTag.call(searchParams)!==SEARCH_PARAMS_CLASS)
	{
		// Shimmed implementation with incorrect constructor name
		return false;
	}
	else if (!STRICT_PROPERTIES.every(prop => prop in searchParams))
	{
		return false;
	}
	else if (supportIncomplete)
	{
		return true;
	}
	else
	{
		return LENIENT_PROPERTIES.every(prop => prop in searchParams);
	}
};



isURLSearchParams.lenient = searchParams => isURLSearchParams(searchParams, true);



module.exports = Object.freeze(isURLSearchParams);

}, function(modId) {var map = {"./props":1662014035103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1662014035103, function(require, module, exports) {


const LENIENT_PROPERTIES =
[
	"entries",
	"sort",
	"values"
];

const STRICT_PROPERTIES =
[
	"append",
	"delete",
	"get",
	"getAll",
	"has",
	"keys",
	"set",
	// "toString" excluded because Object::toString exists
];



module.exports = { LENIENT_PROPERTIES, STRICT_PROPERTIES };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1662014035102);
})()
//miniprogram-npm-outsideDeps=["has-to-string-tag-x","is-object"]
//# sourceMappingURL=index.js.map