import { FunctionDefinition, TypeDefinition } from "./parser/definitions";
import { TokenType } from "./lexer/TokenType";
import { Token, createToken } from "./lexer/Token";

const DictBuiltin = createBuiltinObject("Dict");
const ListBuiltin = createBuiltinObject("List");
const RangeBuiltin = createBuiltinObject("Range");
const Vector3Builtin = createBuiltinExtension(
    "Vector3",
    ["Up", "Down", "Left", "Right", "Forward", "Back", "Zero"],
    [
        "Lerp",
        "LerpUnclamped",
        "Slerp",
        "SlerpUnclamped",
        "GetRotationDirection",
        "Distance",
        "Project",
        "Multiply",
        "Divide",
        "Angle",
        "SignedAngle",
        "Cross",
        "Dot",
        "RotateTowards",
    ]
);
const QuaternionBuiltin = createBuiltinExtension("Quaternion", ["Identity"], ["Lerp", "LerpUnclamped", "Slerp", "SlerpUnclamped"]);
const GameBuiltin = createBuiltinExtension(
    "Game",
    [
        "IsEnding",
        "PVP",
        "EndTimeLeft",
        "Titans",
        "Shifters",
        "Humans",
        "AITitans",
        "AIShifters",
        "AIHumans",
        "PlayerTitans",
        "PlayerShifters",
        "PlayerHumans",
    ],
    [
        "Debug",
        "Print",
        "PrintAll",
        "End",
        "SpawnTitan",
        "SpawnTitanAt",
        "SpawnTitans",
        "SpawnTitansAt",
        "SpawnTitansAsync",
        "SpawnTitansAtAsync",
        "SpawnShifter",
        "SpawnShifterAt",
        "SpawnPlayer",
        "SpawnPlayerAt",
        "SpawnPlayerAll",
        "SpawnPlayerAtAll",
        "SpawnProjectile",
        "SpawnEffect",
        "SetPlaylist",
        "SetSong",
        "FindCharacterByViewID",
    ]
);
const NetworkBuiltin = createBuiltinExtension(
    "Network",
    ["IsMasterClient", "Players", "MasterClient", "MyPlayer"],
    ["SendMessage", "SendMessageAll", "SendMessageOthers"]
);
const MapBuiltin = createBuiltinExtension(
    "Map",
    [],
    [
        "FindMapObjectByName",
        "FindMapObjectsByName",
        "FindMapObjectByID",
        "FindMapObjectByTag",
        "FindMapObjectsByTag",
        "CreateMapObjectRaw",
        "DestroyMapObject",
        "CopyMapObject",
    ]
);
const UIBuiltin = createBuiltinExtension(
    "UI",
    [],
    [
        "SetLabel",
        "SetLabelForTime",
        "SetLabelAll",
        "SetLabelForTimeAll",
        "CreatePopup",
        "ShowPopup",
        "HidePopup",
        "ClearPopup",
        "AddPopupLabel",
        "AddPopupButton",
        "AddPopupButtons",
        "AddPopupBottomButton",
        "WrapStyleTag",
        "GetLocale",
        "GetLanguage",
    ]
);
const TimeBuiltin = createBuiltinExtension("Time", ["TickTime", "GameTime", "FrameTime", "TimeScale"], []);
const ConvertBuiltin = createBuiltinExtension(
    "Convert",
    [],
    ["ToFloat", "ToInt", "ToBool", "ToString", "IsFloat", "IsInt", "IsBool", "IsString", "IsObject"]
);
const StringBuiltin = createBuiltinExtension(
    "String",
    ["Newline"],
    ["FormatFloat", "Split", "Join", "Substring", "SubstringWithLength", "Length", "Replace", "Contains", "StartsWith", "EndsWith", "Trim", "Insert"]
);
const InputBuiltin = createBuiltinExtension("Input", [], ["GetKeyName", "GetKeyHold", "GetKeyDown", "GetKeyUp", "GetMouseAim"]);
const MathBuiltin = createBuiltinExtension(
    "Math",
    [],
    ["Clamp", "Max", "Min", "Pow", "Abs", "Sqrt", "Mod", "Ceil", "Floor", "Round", "Sin", "Cos", "Tan", "Asin", "Acos", "Atan"]
);
const RandomBuiltin = createBuiltinExtension(
    "Random",
    [],
    ["RandomInt", "RandomFloat", "RandomBool", "RandomDirection", "RandomSign", "RandomVector3"]
);
const CutsceneBuiltin = createBuiltinExtension("Cutscene", [], ["Start", "ShowDialogue", "HideDialogue"]);
const CameraBuiltin = createBuiltinExtension(
    "Camera",
    ["IsManual", "Position", "Rotation", "Velocity", "FOV", "Forward"],
    ["SetManual", "SetPosition", "SetRotation", "SetVelocity", "LookAt", "SetFOV"]
);
const RoomDataBuiltin = createBuiltinExtension("RoomData", [], ["SetProperty", "GetProperty", "Clear"]);
const PersistentDataBuiltin = createBuiltinExtension("PersistentData", [], ["SetProperty", "GetProperty", "Clear", "SaveToFile", "LoadFromFile"]);
const JsonBuiltin = createBuiltinExtension("Json", [], ["LoadFromString", "SaveToString"]);
const PhysicsBuiltin = createBuiltinExtension("Physics", [], ["LineCast", "SphereCast"]);

function createBuiltinObject(identifier: string) {
    return createBuiltinType(TokenType.Class, identifier, [], []);
}
function createBuiltinExtension(id: string, variables: string[], functions: string[]) {
    return createBuiltinType(TokenType.Extension, id, variables, functions);
}
function createBuiltinType(type: TokenType, identifier: string, variables: string[], functions: string[]): TypeDefinition {
    const variablesMap = new Map<string, Token>();
    const functionsMap = new Map<string, FunctionDefinition>();
    variables.forEach((v) => {
        variablesMap.set(v, createToken(TokenType.Identifier, v, -1, -1, -1));
    });
    functions.forEach((f) => {
        functionsMap.set(f, {
            typeToken: createToken(TokenType.Function, "", -1, -1, -1),
            identifierToken: createToken(TokenType.Identifier, f, -1, -1, -1),
            variables: new Map<string, Token>(),
        });
    });
    return {
        typeToken: createToken(type, "", -1, -1, -1),
        identifierToken: createToken(TokenType.Identifier, identifier, -1, -1, -1),
        callExpressions: [],
        memberAccesss: [],
        variableAssignment: [],
        variables: variablesMap,
        functions: functionsMap,
    };
}

export default [
    DictBuiltin,
    ListBuiltin,
    RangeBuiltin,
    Vector3Builtin,
    QuaternionBuiltin,
    GameBuiltin,
    NetworkBuiltin,
    MapBuiltin,
    UIBuiltin,
    TimeBuiltin,
    ConvertBuiltin,
    StringBuiltin,
    InputBuiltin,
    MathBuiltin,
    RandomBuiltin,
    CutsceneBuiltin,
    CameraBuiltin,
    RoomDataBuiltin,
    PersistentDataBuiltin,
    JsonBuiltin,
    PhysicsBuiltin,
];
