const inputKeys = [
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
];

const collideMode = ["Physical", "Region", "None"];
const collideWith = ["All", "MapObjects", "Characters", "Projectiles", "Entities", "Hitboxes", "MapEditor"];

export { inputKeys, collideMode, collideWith };
