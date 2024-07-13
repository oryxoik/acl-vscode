/*
 * built-in constants are shown as enums
 * which the selected value will replace the whole range of the enum name and value
 * so for example: if `TitanType.Default` is selected, `TitanType.Default` will be replaced with: "Default"
 */

interface StringConstant {
    key: string;
    values: string[];
}

const inputKeys: StringConstant = {
    key: "KeyCode",
    values: [
        "General/Forward",
        "General/Back",
        "General/Left",
        "General/Right",
        "General/Up",
        "General/Down",
        "General/Pause",
        "General/ChangeCharacter",
        "General/RestartGame",
        "General/ToggleScoreboard",
        "General/Chat",
        "General/ChangeCamera",
        "General/HideCursor",
        "General/SpectatePreviousPlayer",
        "General/SpectateNextPlayer",
        "General/SkipCutscene",
        "General/HideUI",

        "Human/AttackDefault",
        "Human/AttackSpecial",
        "Human/HookLeft",
        "Human/HookRight",
        "Human/HookBoth",
        "Human/Dash",
        "Human/ReelIn",
        "Human/ReelOut",
        "Human/Dodge",
        "Human/Jump",
        "Human/Reload",
        "Human/HorseMount",
        "Human/HorseWalk",
        "Human/HorseJump",
        "Human/NapeLock",

        "Titan/AttackPunch",
        "Titan/AttackBody",
        "Titan/AttackSlap",
        "Titan/AttackGrab",
        "Titan/AttackRockThrow",
        "Titan/Kick",
        "Titan/Jump",
        "Titan/Sit",
        "Titan/Walk",
        "Titan/Sprint",

        "Shifter/Attack",
        "Shifter/Jump",
        "Shifter/Kick",
        "Shifter/Walk",

        "Interaction/Interact",
        "Interaction/Interact2",
        "Interaction/Interact3",
        "Interaction/ItemMenu",
        "Interaction/EmoteMenu",
        "Interaction/MenuNext",
        "Interaction/QuickSelect1",
        "Interaction/QuickSelect2",
        "Interaction/QuickSelect3",
        "Interaction/QuickSelect4",
        "Interaction/QuickSelect5",
        "Interaction/QuickSelect6",
        "Interaction/QuickSelect7",
        "Interaction/QuickSelect8",
        "Interaction/Function1",
        "Interaction/Function2",
        "Interaction/Function3",
        "Interaction/Function4",

        "MapEditor/Forward",
        "MapEditor/Back",
        "MapEditor/Left",
        "MapEditor/Right",
        "MapEditor/Up",
        "MapEditor/Down",
        "MapEditor/Slow",
        "MapEditor/Fast",
        "MapEditor/Select",
        "MapEditor/Multiselect",
        "MapEditor/Deselect",
        "MapEditor/RotateCamera",
        "MapEditor/AddObject",
        "MapEditor/ChangeGizmo",
        "MapEditor/ToggleSnap",
        "MapEditor/Delete",
        "MapEditor/CopyObjects",
        "MapEditor/Paste",
        "MapEditor/Cut",
        "MapEditor/Undo",
        "MapEditor/Redo",
        "MapEditor/SaveMap",
    ],
};

const collideMode: StringConstant = {
    key: "CollideMode",
    values: ["Physical", "Region", "None"],
};
const collideWith: StringConstant = {
    key: "CollideWith",
    values: ["All", "MapObjects", "Characters", "Projectiles", "Entities", "Hitboxes", "MapEditor"],
};

const titanTypes: StringConstant = {
    key: "TitanType",
    values: ["Default", "Normal", "Abnormal", "Jumper", "Crawler", "Thrower", "Punk"],
};

const shifterTypes: StringConstant = {
    key: "ShifterType",
    values: ["Annie", "Armored", "Eren"],
};

const projectilePrefabs: StringConstant = {
    key: "ProjectilePrefab",
    values: ["Thunderspear", "CannonBall", "Flare", "BladeThrow", "SmokeBomb", "Rock1"],
};

const songs: StringConstant = {
    key: "Song",
    values: [
        "dakros_main_theme",
        "david_moses",
        "meownist_settings",
        "blood_god_dakros_departure",
        "ertinos_up_there",
        "dakros_green_plains",
        "dakros_origin",
        "ertinos_wandering",
        "meownist_forest",
        "nadimd_flying",
        "big_bobby_battle",
        "dakros_armored_fist",
        "dakros_battle_chant",
        "dakros_colossal",
        "dakros_shrill_voices",
        "meownist_combat",
        "meownist_finale",
        "meownist_genesis",
        "meownist_hesitation",
        "meownist_more_battle",
        "meownist_annie",
        "meownist_ragakou_drift",
        "razentoast_scoutflight",
        "grabbed_short",
        "effect_play",
        "transition_amogus1",
        "transition_amogus2",
        "transition_bells",
        "transition_short_drums_mix",
        "transition_short_guitar_tamb",
        "transition_short_guzheng",
        "transition_short_violin_1",
        "transition_short_violin_2",
    ],
};

const playlist: StringConstant = {
    key: "Playlist",
    values: ["Default", "Menu", "Peaceful", "Battle", "Boss", "Racing"],
};

const effects: StringConstant = {
    key: "Effect",
    values: [
        "ThunderspearExplodeEffect",
        "GasBurstEffect",
        "GroundShatterEffect",
        "Blood1Effect",
        "Blood2Effect",
        "PunchHitEffect",
        "GunExplodeEffect",
        "CriticalHitEffect",
        "TitanSpawnEffect",
        "TitanDie1Effect",
        "TitanDie2Effect",
        "Boom1Effect",
        "Boom2Effect",
        "Boom3Effect",
        "Boom4Effect",
        "Boom5Effect",
        "Boom6Effect",
        "Boom7Effect",
        "SplashEffect",
        "BiteEffect",
        "ShifterThunderEffect",
        "BladeThrowHitEffect",
        "APGTrailEffect",
        "SplashEffect",
        "Splash1Effect",
        "Splash2Effect",
        "Splash3Effect",
        "WaterWakeEffect",
    ],
};

// Todo: settings constants
// Todo: language constants
// Todo: builtin map assets constants

const stringConstants = [inputKeys, collideMode, collideWith, titanTypes, shifterTypes, projectilePrefabs, songs, playlist, effects];

export { stringConstants };
