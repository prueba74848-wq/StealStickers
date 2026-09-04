import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { getStickerExtension } from "../../lib/utils/getStickerUrl";
import {
    AuthenticationStore,
    GuildIcon,
    GuildIconSizes,
    LazyActionSheet,
    RestAPI,
} from "../../modules";
var FormRow = Forms?.FormRow;
var FormIcon = Forms?.FormIcon;
// Mime types for each format
var MIME_MAP: Record<number, string> = {
    1: "image/png",
    2: "image/png",   // APNG is served as image/png
    4: "image/gif",
};
// Use cdn.discordapp.com (not media.discordapp.net) for raw sticker files
function getUploadUrl(sticker: StickerNode): string | null {
    switch (sticker.format_type) {
        case 1:
        case 2:
            return "https://cdn.discordapp.com/stickers/" + sticker.id + ".png";
        case 4:
            return "https://cdn.discordapp.com/stickers/" + sticker.id + ".gif";
        default:
            return null;
    }
}

// On some platforms (observed on Android) the sticker object handed down
// through the action sheet context is a stripped preview — just
// { name, id } — with no format_type, tags, or description. When that
// happens, fetch the full sticker resource from Discord's REST API by ID
// and merge it in, instead of failing with "Unsupported sticker format".
async function resolveFullSticker(sticker: StickerNode, token: string | undefined): Promise<StickerNode> {
    if (sticker.format_type !== undefined) return sticker;
    if (!sticker.id) return sticker;

    // Prefer Discord's own internal REST client — raw fetch() to
    // discord.com/api has been unreliable on Android in this plugin
    // (throws "Network request failed"), likely because the app's
    // network stack expects API calls to go through its own client.
    if (RestAPI?.get) {
        try {
            var apiRes = await RestAPI.get({ url: "/stickers/" + sticker.id });
            var body = apiRes?.body ?? apiRes;
            if (body) return { ...sticker, ...body };
        } catch (e) {
            // fall through to raw fetch below
        }
    }

    try {
        var res = await fetch("https://discord.com/api/v10/stickers/" + sticker.id, {
            headers: token ? { Authorization: token } : undefined,
        });
        if (!res.ok) return sticker;
        var full = await res.json().catch(function () { return null; });
        if (!full) return sticker;
        return { ...sticker, ...full };
    } catch (e) {
        return sticker;
    }
}

export default function AddToServerRow({
    guild,
    sticker,
}: {
    guild: any;
    sticker: StickerNode;
}) {
    if (!FormRow) return null;

    var addToServer = async function() {
        LazyActionSheet?.hideActionSheet?.();
        try {
            var token = AuthenticationStore?.getToken?.();

            // Fill in format_type (and anything else) if the sticker we
            // were handed is incomplete.
            var resolvedSticker = await resolveFullSticker(sticker, token);

            var uploadUrl = getUploadUrl(resolvedSticker);
            var ext = getStickerExtension(resolvedSticker);

            if (!uploadUrl) {
                showToast(
                    "Unsupported format_type=" + resolvedSticker.format_type + " keys=" + Object.keys(resolvedSticker).join(","),
                    getAssetIDByName("Small")
                );
                return;
            }

            var mime = MIME_MAP[resolvedSticker.format_type] ?? "image/png";
            var uploadFilename = resolvedSticker.name + "." + ext;
            var res: { ok: boolean; status: number; body?: any };
            {
                var form = new FormData();
                form.append("file", { uri: uploadUrl, name: uploadFilename, type: mime } as any);
                form.append("name", resolvedSticker.name);
                form.append("description", resolvedSticker.description ?? resolvedSticker.name);
                form.append("tags", resolvedSticker.tags?.split(",")?.[0]?.trim() || "⭐");
                var rawRes = await fetch(
                    "https://discord.com/api/v10/guilds/" + guild.id + "/stickers",
                    { method: "POST", headers: { Authorization: token }, body: form }
                );
                res = {
                    ok: rawRes.ok,
                    status: rawRes.status,
                    body: await rawRes.json().catch(function() { return {}; }),
                };
            }
            if (res.ok) {
                showToast(
                    "Added " + resolvedSticker.name + " to " + guild.name,
                    getAssetIDByName("Check")
                );
            } else {
                var { clipboard } = require("@vendetta/metro/common");
                var fullErrorText = JSON.stringify(res.body ?? { message: "no body", status: res.status });
                clipboard.setString(fullErrorText);
                showToast(
                    "Failed — full error copied to clipboard, paste it somewhere",
                    getAssetIDByName("Small")
                );
            }
        } catch (e: any) {
            showToast(e?.message ?? "Something went wrong", getAssetIDByName("Small"));
        }
    };
    return (
        <FormRow
            leading={GuildIcon ? <GuildIcon guild={guild} size={GuildIconSizes?.MEDIUM} animate={false} /> : undefined}
            label={guild.name}
            trailing={FormIcon ? <FormIcon style={{ opacity: 1 }} source={getAssetIDByName("ic_add_24px")} /> : undefined}
            onPress={addToServer}
        />
    );
}
