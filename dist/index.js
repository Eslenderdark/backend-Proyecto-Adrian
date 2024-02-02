"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db = __importStar(require("./db-connection"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
var jsonParser = body_parser_1.default.json();
app.get('/', function (req, res) {
    res.send('Hello from express and typescript');
});
app.get('/cortes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("SELECT * FROM cortes");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM cortes")];
            case 2:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/cliente/:cliente', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, result, err_2, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("ENDPOINT: /cliente/:cliente");
                console.log("INPUT VALUES: " + req.params.cliente);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM clientes WHERE id = '" + req.params.cliente + "'")];
            case 2:
                result = _a.sent();
                console.log(JSON.stringify(result.rows));
                usuario = result.rows;
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Error al recuperar el cliente de la base de datos');
                return [3 /*break*/, 4];
            case 4:
                if (!(usuario.length > 0)) return [3 /*break*/, 5];
                // El usuario existe
                console.log("El usuario ya existe");
                res.json({ user: usuario[0], creado: false });
                return [3 /*break*/, 8];
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, db.query("INSERT INTO clientes (id) VALUES ('" + req.params.cliente + "')")];
            case 6:
                result = _a.sent();
                console.log(result);
                res.json({ user: { id: req.params.cliente }, creado: true });
                return [3 /*break*/, 8];
            case 7:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error, al crear al usuario');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post('/cliente', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                console.log("INSERT INTO clientes VALUES (" + req.body.id + ", '" + req.body.name + "', " + req.body.admin + ")");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("INSERT INTO clientes VALUES (" + req.body.id + ", '" + req.body.name + "', " + req.body.admin + ")")];
            case 2:
                result = _a.sent();
                console.log(result);
                res.json("Datos guardados correctamente");
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/citas/:citas', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cita, result, err_5, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("ENDPOINT: /citas/:citas");
                console.log("INPUT VALUES: " + req.params.citas);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT * FROM citas WHERE id = '" + req.params.citas + "'")];
            case 2:
                result = _a.sent();
                console.log(JSON.stringify(result.rows));
                cita = result.rows;
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error(err_5);
                res.status(500).send('Error al recuperar el citas de la base de datos');
                return [3 /*break*/, 4];
            case 4:
                if (!(cita.length > 0)) return [3 /*break*/, 5];
                // La cita existe
                console.log("La cita ya existe");
                res.json({ cita: cita[0], creado: false });
                return [3 /*break*/, 8];
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, db.query("INSERT INTO citas (id) VALUES ('" + req.params.citas + "')")];
            case 6:
                result = _a.sent();
                console.log(result);
                res.json({ cita: { id: req.params.citas }, creado: true });
                return [3 /*break*/, 8];
            case 7:
                err_6 = _a.sent();
                console.error(err_6);
                res.status(500).send('Internal Server Error, al crear la cita');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.get('/citas', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("select * from citas INNER JOIN cortes ON citas.id_corte = cortes.id");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("select * from citas INNER JOIN cortes ON citas.id_corte = cortes.id")];
            case 2:
                result = _a.sent();
                res.json(result.rows);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                console.error(err_7);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/citas', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                console.log("INSERT INTO citas (id_cliente,id_corte,precio,hora,dia,col_index,row_index,nombre) VALUES ('" + req.body.id_cliente + "'," + req.body.id_corte + "," + req.body.precio + ",'" + req.body.hora + "','" + req.body.dia + "'," + req.body.col_index + "," + req.body.row_index + ",'" + req.body.nombre + "')");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("INSERT INTO citas (id_cliente,id_corte,precio,hora,dia,col_index,row_index,nombre) VALUES ('" + req.body.id_cliente + "'," + req.body.id_corte + "," + req.body.precio + ",'" + req.body.hora + "','" + req.body.dia + "'," + req.body.col_index + "," + req.body.row_index + ",'" + req.body.nombre + "')")];
            case 2:
                result = _a.sent();
                console.log(result);
                res.json("Datos guardados correctamente");
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                console.error(err_8);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/citas/:id_cliente', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("DELETE FROM citas WHERE id_cliente = '" + req.params.id_cliente + "'")];
            case 2:
                result = _a.sent();
                console.log(result);
                res.json("Datos eliminados correctamente");
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                console.error(err_9);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("App listening on PORT " + port); });
