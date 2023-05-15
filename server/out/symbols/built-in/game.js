"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSymbols = void 0;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
exports.gameSymbols = {
    name: "Game",
    kind: vscode_languageserver_types_1.CompletionItemKind.Class,
    detail: "extension Game",
    description: "Game functions such as spawning titans and managing game state.",
    subSymbols: [
        {
            name: "IsEnding",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) IsEnding: bool",
            description: "Is the game currently ending.",
        },
        {
            name: "PVP",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) PVP: int",
            description: "Returns the current PVP setting (in misc). 0 - Off, 1 - FFA, 2 - Teams.",
        },
        {
            name: "EndTimeLeft",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) EndTimeLeft: float",
            description: "Time left before game restarts.",
        },
        {
            name: "Titans",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) Titans: List(Titan)",
            description: "List of titans currently alive.",
        },
        {
            name: "Shifters",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) Shifters: List(Shifter)",
            description: "List of shifters currently alive.",
        },
        {
            name: "Humans",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) Humans: List(Human)",
            description: "List of humans currently alive.",
        },
        {
            name: "AIShifters",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) AIShifters: List(Shifter)",
            description: "List of aIShifters currently alive.",
        },
        {
            name: "PlayerShifters",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "(Readonly) PlayerShifters: List(Shifter)",
            description: "List of playerShifters currently alive.",
        },
        {
            name: "Debug",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function Debug(message: string)",
            description: "Prints a message to the debug console (accessible using F11).",
        },
        {
            name: "Print",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function Print(message: string)",
            description: "Prints a message to the chat window.",
        },
        {
            name: "PrintAll",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function PrintAll(message: string)",
            description: "Prints a message to all players chat window.",
        },
        {
            name: "End",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function End(delay: float)",
            description: "Ends the game and restarts after given delay. Master client only.",
        },
        {
            name: "SpawnTitan",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnTitan(type: string): Titan",
            description: 'Spawn a titan. Master client only. Valid types: "Default", "Dummy", "Normal", "Abnormal", "Punk", "Crawler".',
        },
        {
            name: "SpawnTitanAt",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnTitanAt(type: string, position: Vector3): Titan",
            description: "Spawn a titan at position. Master client only.",
        },
        {
            name: "SpawnTitans",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnTitans(type:string, amount: int): List(Titan)",
            description: "Spawn amount titans. Master client only.",
        },
        {
            name: "SpawnTitansAt",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnTitansAt(type:string, amount: int, position: Vector3): List(Titan)",
            description: "Spawn amount titans at position. Master client only.",
        },
        {
            name: "SpawnShifter",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnShifter(type: string): Shifter",
            description: 'Spawn a shifter. Master client only. Valid types: "Annie"',
        },
        {
            name: "SpawnShifterAt",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnShifterAt(type: string, position: Vector3): Shifter",
            description: "Spawn a shifter at position.",
        },
        {
            name: "SpawnPlayer",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnPlayer(player: Player, force: bool)",
            description: "Spawns the given player. Must be the given player or masterclient. If force is true, will kill the existing player and respawn them, otherwise will only spawn if the player is dead.",
        },
        {
            name: "SpawnPlayerAt",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnPlayerAt(player: Player, force: bool, position: Vector3)",
            description: "Spawns the player at a given position.",
        },
        {
            name: "SpawnPlayerAll",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnPlayerAll(force: bool)",
            description: "Spawns all players. Master client only.",
        },
        {
            name: "SpawnPlayerAtAll",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnPlayerAtAll(force: bool, position: Vector3)",
            description: "Spawns all players at position.",
        },
        {
            name: "SpawnProjectile",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnProjectile(projectile: string, position: Vector3, rotation: Vector3, velocity: Vector3, gravity: Vector3, liveTime: float, team: string, [extra params])",
            description: `Spawns a projectile. Valid projectiles: ThunderSpear, CannonBall, Flare, BladeThrow. \n ThunderSpear takes two extra params (radius: float, color: Color) \n Flare takes extra param (color: Color).`,
        },
        {
            name: "SpawnProjectileWithOwner",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnProjectileWithOwner(projectile: string, position: Vector3, rotation: Vector3, velocity: Vector3, gravity: Vector3, liveTime: float, owner: Character, [extra params])",
            description: `Spawns a projectile from the given character as its owner.`,
        },
        {
            name: "SpawnEffect",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SpawnEffect(effect: string, position: Vector3, rotation: Vector3, scale: float, [params])",
            description: `Spawns an effect. Valid effects: ThunderSpearExplode, GasBurst, GroundShatter, Blood1, Blood2, PunchHit, GunExplode, CriticalHit, TitanSpawn, TitanDie1, TitanDie2, Boom1, Boom2..., Boom6, TitanBite, ShifterThunder, BladeThrowHit. \n ThunderSpearExplode takes an extra param Color.`,
        },
        {
            name: "SetPlaylist",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SetPlaylist(playlist: string)",
            description: `Sets the music playlist. Valid playlists: Default, Boss, Menu, Peaceful, Battle, Racing`,
        },
        {
            name: "SetSong",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "function SetSong(song: string)",
            description: `Sets the music song.`,
        },
    ],
};
//# sourceMappingURL=game.js.map