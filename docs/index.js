(function () {
    var module = { exports: {} };
    var exports = module.exports;

    function require(id) {
        switch (id) {
            case "@vendetta":
                return vendetta;
            case "@vendetta/patcher":
                return vendetta.patcher;
            case "@vendetta/metro":
                return vendetta.metro;
            case "@vendetta/metro/common":
                return vendetta.metro.common;
            case "@vendetta/utils":
                return vendetta.utils;
            case "@vendetta/ui":
                return vendetta.ui;
            case "@vendetta/ui/assets":
                return vendetta.ui.assets;
            case "@vendetta/ui/toasts":
                return vendetta.ui.toasts;
            case "@vendetta/ui/components":
                return vendetta.ui.components;
            case "@vendetta/storage":
                return vendetta.storage;
            case "@vendetta/commands":
                return vendetta.commands;
            default:
                throw new Error("[StealSticker] Unknown module: " + id);
        }
    }

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/StealSticker/index.ts
var StealSticker_exports = {};
__export(StealSticker_exports, {
  default: () => StealSticker_default
});
module.exports = __toCommonJS(StealSticker_exports);

// src/StealSticker/patches/MessageStickerActionSheet.tsx
var import_common3 = require("@vendetta/metro/common");
var import_patcher = require("@vendetta/patcher");
var import_utils = require("@vendetta/utils");
var import_components3 = require("@vendetta/ui/components");

// src/StealSticker/modules.ts
var import_metro = require("@vendetta/metro");
var LazyActionSheet = (0, import_metro.findByProps)("hideActionSheet");
var MediaModalUtils = (0, import_metro.findByProps)("openMediaModal");
var ActionSheet = (0, import_metro.findByProps)("ActionSheet")?.ActionSheet ?? (0, import_metro.find)((m) => m.render?.name === "ActionSheet");
var { ActionSheetTitleHeader, ActionSheetCloseButton } = (0, import_metro.findByProps)("ActionSheetTitleHeader") ?? {};
var { BottomSheetFlatList } = (0, import_metro.findByProps)("BottomSheetScrollView") ?? {};
var GuildStore = (0, import_metro.findByStoreName)("GuildStore");
var StickerStore = (0, import_metro.findByStoreName)("StickersStore") ?? (0, import_metro.findByStoreName)("StickerStore");
var PermissionsStore = (0, import_metro.findByStoreName)("PermissionStore");
var AuthenticationStore = (0, import_metro.findByStoreName)("AuthenticationStore");
var { default: GuildIcon, GuildIconSizes } = (0, import_metro.findByProps)("GuildIconSizes") ?? {};
var { downloadMediaAsset } = (0, import_metro.findByProps)("downloadMediaAsset") ?? {};
var constants = (0, import_metro.findByProps)("Fonts", "Permissions");

// src/StealSticker/ui/components/StickerButtons.tsx
var import_metro2 = require("@vendetta/metro");
var import_common = require("@vendetta/metro/common");
var import_assets2 = require("@vendetta/ui/assets");
var import_toasts2 = require("@vendetta/ui/toasts");

// src/StealSticker/lib/utils/fetchImageAsDataURL.ts
function fetchImageAsDataURL(url, callback) {
  fetch(url).then((r) => r.blob()).then((blob) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => callback(reader.result);
  });
}

// src/StealSticker/lib/utils/getStickerUrl.ts
function getStickerUrl(sticker, size = 320) {
  switch (sticker.format_type) {
    case 1:
    case 2:
      return `https://media.discordapp.net/stickers/${sticker.id}.png?size=${size}`;
    case 4:
      return `https://media.discordapp.net/stickers/${sticker.id}.gif?size=${size}`;
    default:
      return null;
  }
}
function getStickerExtension(sticker) {
  switch (sticker.format_type) {
    case 1:
    case 2:
      return "png";
    case 4:
      return "gif";
    default:
      return null;
  }
}
function isLottie(sticker) {
  return sticker.format_type === 3;
}

// src/StealSticker/ui/sheets/AddToServerActionSheet.tsx
var import_components2 = require("@vendetta/ui/components");

// src/StealSticker/ui/components/AddToServerRow.tsx
var import_assets = require("@vendetta/ui/assets");
var import_components = require("@vendetta/ui/components");
var import_toasts = require("@vendetta/ui/toasts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _async_to_generator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
var FormRow = import_components.Forms?.FormRow;
var FormIcon = import_components.Forms?.FormIcon;
var MIME_MAP = {
  1: "image/png",
  2: "image/png",
  4: "image/gif"
};
function getUploadUrl(sticker) {
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
function AddToServerRow({ guild, sticker }) {
  if (!FormRow)
    return null;
  var uploadUrl = getUploadUrl(sticker);
  var ext = getStickerExtension(sticker);
  var mime = MIME_MAP[sticker.format_type] ?? "image/png";
  var addToServer = function addToServer2() {
    return _async_to_generator(function* () {
      LazyActionSheet?.hideActionSheet?.();
      try {
        if (!uploadUrl) {
          (0, import_toasts.showToast)("Unsupported format_type=" + sticker.format_type + " keys=" + Object.keys(sticker).join(","), (0, import_assets.getAssetIDByName)("Small"));
          return;
        }
        var imgRes = yield fetch(uploadUrl);
        var blob = yield imgRes.blob();
        var form = new FormData();
        form.append("file", blob, sticker.name + "." + ext);
        form.append("name", sticker.name);
        form.append("description", sticker.description ?? sticker.name);
        form.append("tags", sticker.tags?.split(",")?.[0]?.trim() || "\u2B50");
        var token = AuthenticationStore?.getToken?.();
        var res = yield fetch("https://discord.com/api/v10/guilds/" + guild.id + "/stickers", {
          method: "POST",
          headers: {
            Authorization: token
          },
          body: form
        });
        if (res.ok) {
          (0, import_toasts.showToast)("Added " + sticker.name + " to " + guild.name, (0, import_assets.getAssetIDByName)("Check"));
        } else {
          var err = yield res.json().catch(function() {
            return {};
          });
          (0, import_toasts.showToast)(err?.message ?? "Failed (" + res.status + ")", (0, import_assets.getAssetIDByName)("Small"));
        }
      } catch (e) {
        (0, import_toasts.showToast)(e?.message ?? "Something went wrong", (0, import_assets.getAssetIDByName)("Small"));
      }
    })();
  };
  return /* @__PURE__ */ React.createElement(FormRow, {
    leading: GuildIcon ? /* @__PURE__ */ React.createElement(GuildIcon, {
      guild,
      size: GuildIconSizes?.MEDIUM,
      animate: false
    }) : void 0,
    label: guild.name,
    trailing: FormIcon ? /* @__PURE__ */ React.createElement(FormIcon, {
      style: {
        opacity: 1
      },
      source: (0, import_assets.getAssetIDByName)("ic_add_24px")
    }) : void 0,
    onPress: addToServer
  });
}

// src/StealSticker/ui/sheets/AddToServerActionSheet.tsx
var FormDivider = import_components2.Forms?.FormDivider;
var FormIcon2 = import_components2.Forms?.FormIcon;
var STICKER_PERM = constants?.Permissions?.MANAGE_GUILD_EXPRESSIONS ?? constants?.Permissions?.MANAGE_EMOJIS_AND_STICKERS ?? constants?.Permissions?.MANAGE_EMOJIS ?? constants?.Permissions?.CREATE_GUILD_EXPRESSIONS ?? 1073741824n;
var CREATE_PERM = constants?.Permissions?.CREATE_GUILD_EXPRESSIONS ?? null;
function showAddToServerActionSheet(sticker) {
  if (!LazyActionSheet?.openLazy)
    return;
  LazyActionSheet.openLazy(Promise.resolve({
    default: function _default() {
      return /* @__PURE__ */ React.createElement(AddToServer, {
        sticker
      });
    }
  }), "AddToServerStickerActionSheet");
}
function AddToServer({ sticker }) {
  var guilds = Object.values(GuildStore?.getGuilds?.() ?? {}).filter(function(g) {
    if (!PermissionsStore?.can)
      return false;
    var canManage = STICKER_PERM ? PermissionsStore.can(STICKER_PERM, g) : false;
    var canCreate = CREATE_PERM ? PermissionsStore.can(CREATE_PERM, g) : false;
    return canManage || canCreate;
  }).sort(function(a, b) {
    return a.name?.localeCompare?.(b.name);
  });
  var previewUrl = getStickerUrl(sticker, 64);
  return /* @__PURE__ */ React.createElement(ActionSheet, {
    scrollable: true
  }, /* @__PURE__ */ React.createElement(import_components2.ErrorBoundary, null, ActionSheetTitleHeader ? /* @__PURE__ */ React.createElement(ActionSheetTitleHeader, {
    title: "Stealing " + sticker.name,
    leading: previewUrl && FormIcon2 ? /* @__PURE__ */ React.createElement(FormIcon2, {
      style: {
        marginRight: 12,
        opacity: 1
      },
      source: {
        uri: previewUrl
      },
      disableColor: true
    }) : void 0,
    trailing: ActionSheetCloseButton ? /* @__PURE__ */ React.createElement(ActionSheetCloseButton, {
      onPress: function onPress() {
        LazyActionSheet?.hideActionSheet?.();
      }
    }) : void 0
  }) : null, BottomSheetFlatList ? /* @__PURE__ */ React.createElement(BottomSheetFlatList, {
    style: {
      flex: 1
    },
    contentContainerStyle: {
      paddingBottom: 24
    },
    data: guilds,
    renderItem: function renderItem({ item }) {
      return /* @__PURE__ */ React.createElement(AddToServerRow, {
        guild: item,
        sticker
      });
    },
    ItemSeparatorComponent: FormDivider,
    keyExtractor: function keyExtractor(x) {
      return x.id;
    }
  }) : null));
}

// src/StealSticker/ui/components/StickerButtons.tsx
var ButtonModule = (0, import_metro2.findByProps)("TableRow", "Button") ?? (0, import_metro2.findByProps)("Button");
var Button = ButtonModule?.Button ?? ButtonModule?.default;
function StickerButtons({ sticker }) {
  if (isLottie(sticker))
    return null;
  if (!Button)
    return null;
  var url = getStickerUrl(sticker);
  var isGif = sticker.format_type === 4;
  var platform = import_common.ReactNative.Platform;
  var buttons = [
    {
      text: "Add to Server",
      callback: function callback() {
        showAddToServerActionSheet(sticker);
      }
    },
    {
      text: "Copy URL to clipboard",
      callback: function callback() {
        import_common.clipboard.setString(url);
        LazyActionSheet?.hideActionSheet?.();
        (0, import_toasts2.showToast)("Copied " + sticker.name + "'s URL", (0, import_assets2.getAssetIDByName)("ic_copy_message_link"));
      }
    },
    ...platform.select({
      ios: [
        {
          text: "Copy image to clipboard",
          callback: function callback() {
            fetchImageAsDataURL(url, function(dataUrl) {
              import_common.clipboard.setImage(dataUrl.split(",")[1]);
              LazyActionSheet?.hideActionSheet?.();
              (0, import_toasts2.showToast)("Copied " + sticker.name + "'s image", (0, import_assets2.getAssetIDByName)("ic_message_copy"));
            });
          }
        }
      ],
      default: []
    }),
    {
      text: "Save to " + platform.select({
        android: "Downloads",
        default: "Camera Roll"
      }),
      callback: function callback() {
        if (downloadMediaAsset) {
          downloadMediaAsset(url, isGif ? 1 : 0);
        }
        LazyActionSheet?.hideActionSheet?.();
        (0, import_toasts2.showToast)("Saved " + sticker.name, (0, import_assets2.getAssetIDByName)("toast_image_saved"));
      }
    }
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, buttons.map(function({ text, callback }) {
    return /* @__PURE__ */ React.createElement(Button, {
      color: Button.Colors?.BRAND,
      text,
      size: Button.Sizes?.SMALL,
      onPress: callback,
      style: {
        marginTop: platform.select({
          android: 12,
          default: 16
        })
      }
    });
  }));
}

// src/StealSticker/lib/utils/openMediaModal.ts
var import_common2 = require("@vendetta/metro/common");
function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _async_to_generator2(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function getSizeAsync(src) {
  return new Promise((resolve, reject) => import_common2.ReactNative.Image.getSize(src, (w, h) => resolve([
    w,
    h
  ]), reject));
}
function openMediaModal(src) {
  return _async_to_generator2(function* () {
    var [width, height] = yield getSizeAsync(src);
    var { width: sw, height: sh } = import_common2.ReactNative.Dimensions.get("window");
    LazyActionSheet.hideActionSheet();
    MediaModalUtils.openMediaModal({
      initialSources: [
        {
          uri: src,
          sourceURI: src,
          width,
          height
        }
      ],
      initialIndex: 0,
      originLayout: {
        width: 160,
        height: 160,
        x: sw / 2 - 80,
        y: sh - 80,
        resizeMode: "fill"
      }
    });
  })();
}

// src/StealSticker/patches/MessageStickerActionSheet.tsx
var import_metro3 = require("@vendetta/metro");
var { TouchableOpacity } = import_components3.General;
var _patchedModules = /* @__PURE__ */ new WeakSet();
var DirectSheet = (0, import_metro3.findByProps)("StickerDetails") ?? (0, import_metro3.findByProps)("stickerActionSheet") ?? (0, import_metro3.findByProps)("StickerActionSheet");
function pickFullSticker(...candidates) {
  var withFormat = candidates.find(function(c) {
    return c && c.format_type !== void 0;
  });
  return withFormat ?? candidates.find(Boolean);
}
function patchMessageStickerActionSheet() {
  if (DirectSheet) {
    return patchSheet("default", DirectSheet);
  }
  if (!LazyActionSheet?.openLazy) {
    return function() {
    };
  }
  var patches2 = [];
  var unpatchLazy = (0, import_patcher.instead)("openLazy", LazyActionSheet, function(args, originalOpenLazy) {
    var lazySheet = args[0];
    var name = args[1] ?? "";
    var context = args[2];
    var nameLower = (name || "").toLowerCase();
    if (!nameLower.includes("sticker") || nameLower.includes("addtoserver")) {
      return originalOpenLazy.apply(this, args);
    }
    try {
      var { showToast: __dbgToast } = require("@vendetta/ui/toasts");
      var { findByStoreName: __dbgFind } = require("@vendetta/metro");
      var __dbgStore = __dbgFind("StickersStore") ?? __dbgFind("StickerStore");
      __dbgToast("storeKeys=" + Object.keys(__dbgStore ?? {}).join(","));
    } catch (e) {
      var { showToast: __dbgToast2 } = require("@vendetta/ui/toasts");
      __dbgToast2("store lookup threw: " + (e?.message ?? e));
    }
    var sticker = pickFullSticker(context?.renderableSticker, context?.sticker, context?.stickerNode);
    if (!lazySheet || typeof lazySheet.then !== "function") {
      return originalOpenLazy.apply(this, args);
    }
    var patchedPromise = lazySheet.then(function(module2) {
      var target = module2.default;
      if (_patchedModules.has(module2)) {
        if (module2._ssCurrentSticker !== void 0) {
          module2._ssCurrentSticker = sticker;
        }
        return module2;
      }
      var renderFn = null;
      var renderHost = null;
      var renderKey = "";
      if (typeof target === "function") {
        renderFn = target;
        renderHost = module2;
        renderKey = "default";
      } else if (typeof target === "object" && target !== null) {
        if (typeof target.type === "function") {
          renderFn = target.type;
          renderHost = target;
          renderKey = "type";
        } else if (typeof target.render === "function") {
          renderFn = target.render;
          renderHost = target;
          renderKey = "render";
        } else if (typeof target.type === "object" && target.type !== null) {
          if (typeof target.type.render === "function") {
            renderFn = target.type.render;
            renderHost = target.type;
            renderKey = "render";
          } else if (typeof target.type.type === "function") {
            renderFn = target.type.type;
            renderHost = target.type;
            renderKey = "type";
          }
        }
        if (!renderFn) {
          for (var k of Object.keys(target)) {
            if (typeof target[k] === "function") {
              renderFn = target[k];
              renderHost = target;
              renderKey = k;
              break;
            }
          }
        }
      }
      if (!renderFn || !renderHost) {
        return module2;
      }
      module2._ssCurrentSticker = sticker;
      var OriginalRender = renderFn;
      renderHost[renderKey] = function PatchedStickerRender() {
        var res;
        try {
          res = OriginalRender.apply(this, arguments);
        } catch (e) {
          throw e;
        }
        var props = arguments[0] ?? {};
        var finalSticker = module2._ssCurrentSticker ?? pickFullSticker(props?.renderableSticker, props?.sticker, props?.stickerNode);
        if (finalSticker && res) {
          try {
            injectButtons(res, finalSticker);
          } catch (_) {
          }
        }
        return res;
      };
      _patchedModules.add(module2);
      return module2;
    });
    return originalOpenLazy.call(this, patchedPromise, name, context);
  });
  patches2.push(unpatchLazy);
  return function() {
    patches2.forEach(function(p) {
      p?.();
    });
  };
}
function injectButtons(res, sticker) {
  if (!res)
    return;
  if (res._ssInjected)
    return;
  res._ssInjected = true;
  var stickerUrl = getStickerUrl(sticker);
  var view = res?.props?.children?.props?.children;
  if (view && typeof view === "object" && typeof view.type === "function") {
    var unpatchView = (0, import_patcher.after)("type", view, function(_, component) {
      import_common3.React.useEffect(function() {
        return unpatchView;
      }, []);
      addButtonsToComponent(component, sticker, stickerUrl);
    });
    return;
  }
  if (res?.type && typeof res.type === "function") {
    var origType = res.type;
    res.type = function() {
      var component = origType.apply(this, arguments);
      addButtonsToComponent(component, sticker, stickerUrl);
      return component;
    };
    try {
      Object.assign(res.type, origType);
    } catch (_) {
    }
    return;
  }
  if (typeof res?.props?.children === "function") {
    var origRender = res.props.children;
    res.props.children = function() {
      var rendered = origRender.apply(this, arguments);
      appendToTree(rendered, /* @__PURE__ */ import_common3.React.createElement(StickerButtons, {
        sticker
      }));
      return rendered;
    };
    return;
  }
  appendToTree(res, /* @__PURE__ */ import_common3.React.createElement(StickerButtons, {
    sticker
  }));
}
function addButtonsToComponent(component, sticker, stickerUrl) {
  if (stickerUrl) {
    var isIcon = function isIcon2(c) {
      return c?.props?.source?.uri;
    };
    var iconContainer = (0, import_utils.findInReactTree)(component, function(c) {
      return c?.find?.(isIcon);
    });
    var iconIdx = iconContainer?.findIndex?.(isIcon) ?? -1;
    if (iconIdx >= 0) {
      iconContainer[iconIdx] = /* @__PURE__ */ import_common3.React.createElement(TouchableOpacity, {
        onPress: () => openMediaModal(stickerUrl.split("?")[0])
      }, iconContainer[iconIdx]);
    }
  }
  var isButton = function isButton2(c) {
    var n = c?.type?.name ?? c?.type?.displayName ?? "";
    return n === "Button" || n === "CompatButton";
  };
  var btnContainer = (0, import_utils.findInReactTree)(component, function(c) {
    return c?.find?.(isButton);
  });
  var btnIdx = btnContainer?.findLastIndex?.(isButton) ?? -1;
  var el = /* @__PURE__ */ import_common3.React.createElement(StickerButtons, {
    sticker
  });
  if (btnIdx >= 0) {
    btnContainer.splice(btnIdx + 1, 0, el);
  } else {
    appendToTree(component, el);
  }
}
function appendToTree(tree, element) {
  if (!tree)
    return;
  if (Array.isArray(tree?.props?.children)) {
    tree.props.children.push(element);
  } else if (tree?.props?.children != null) {
    tree.props.children = [
      tree.props.children,
      element
    ];
  } else if (tree?.props) {
    tree.props.children = element;
  } else if (Array.isArray(tree)) {
    tree.push(element);
  }
}
function patchSheet(funcName, sheetModule) {
  return (0, import_patcher.after)(funcName, sheetModule, function(callArgs, res) {
    var props = callArgs[0] ?? {};
    try {
      var { showToast: __dbgToast2 } = require("@vendetta/ui/toasts");
      __dbgToast2("patchSheet ran, props keys=" + Object.keys(props).join(","));
    } catch (e) {
    }
    var s = pickFullSticker(props?.sticker, props?.stickerNode, props?.renderableSticker);
    if (!s)
      return;
    injectButtons(res, s);
  });
}

// src/StealSticker/index.ts
var patches = [];
var StealSticker_default = {
  onLoad: () => {
    patches.push(patchMessageStickerActionSheet());
  },
  onUnload: () => {
    for (var unpatch of patches)
      unpatch();
  }
};


    return module.exports && module.exports.default !== undefined
        ? module.exports.default
        : module.exports;
})()