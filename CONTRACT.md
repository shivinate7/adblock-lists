# Export contract

Assets of one release (tag `lists-<YYYYMMDD>-<shortsha>`), each listed in `manifest.json` with sha256 and size:

- `blockerList1.json.gz` to `blockerListN.json.gz`: Safari content-blocker JSON, gzip; one list per blocker, the count is the number of `blockerList*` entries in `manifest.json`. Gunzip each and load it as one `WKContentRuleList`. Load all of them. The ios-adblock app takes a manifest only when its blocker-list count is exactly the number of blockers it has (8 since 2026-10-22; 4 before), and otherwise keeps the lists it has, so a change of count strands apps built with the old count until they are updated. Other consumers set their own rule.
- `chromeSlice1.json.gz` to `chromeSliceN.json.gz` (optional): Chrome declarativeNetRequest rules, a JSON array, gzip; one slice per Chrome extension, which loads its slice as dynamic rules. iOS consumers ignore these names.
- `strict.js`: JavaScript bundle (IIFE) for the strict-mode content script.
- `early-sites.json`: JSON array of regex source strings. A page whose hostname matches one gets strict mode at document start.
- `manifest.json`: `format`, `version`, `created` (UTC), `commit`, `assets` (name to `{sha256, bytes}`), `sources` (pinned list sources).

Keychain (written by the ios-adblock app, read-only for consumers):

- Access group: `SFYDZG48BE.dev.shivinate.adblock.shared`
- Class: generic password. Service: `problem-sites`. No account attribute is set.
- Value: a JSON array of strings, the active problem-site hosts.
- A consumer must never write, update or delete this item.

Format rule: any change to the shape of an asset or of the manifest bumps `format` in the manifest. A consumer rejects a `format` it does not know.
