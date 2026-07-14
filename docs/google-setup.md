# Google Analytics 4 + Google Ads setup runbook

The site code is already wired for both — this doc is the account-side work.
There are exactly **three values to paste into the code** when you get them:

| Value | Looks like | Where it goes |
|---|---|---|
| GA4 Measurement ID | `G-ABC123XYZ` | `window.GA_MEASUREMENT_ID` in `index.html` `<head>` |
| Google Ads tag ID | `AW-123456789` | `window.GOOGLE_ADS_ID` in `index.html` `<head>` |
| Ads conversion send_to | `AW-123456789/AbC-DEfGhIJk` | `GOOGLE_ADS_SEND_TO` in `js/main.js` |

Nothing loads or breaks while these are empty, so partial setup is safe.

## What the site sends

| Event | Fires when | Role |
|---|---|---|
| `sign_up_intent` | A sign-up CTA is clicked while the form URL is still pending (CTA scrolls to #signup) | Baseline interest, pre-launch |
| `sign_up_click` | A sign-up CTA is clicked once `SIGNUP_FORM_URL` is live | **Primary conversion** (GA4 key event + Google Ads conversion) |
| `email_click` | Any contact-email link is clicked | Secondary key event |

Each carries a `link_location` parameter (which page section the click came from,
e.g. `pricing`, `signup`, `top`). GA4's Enhanced Measurement adds page views,
scroll depth, and outbound clicks automatically.

## Part 1 — Google Analytics 4 (do this first)

Heads-up: old Universal Analytics properties were shut down in 2023–24 and their
data is gone. GA4 renamed "conversions" to **key events**; "conversions" now
means key events imported into Google Ads.

1. Go to [analytics.google.com](https://analytics.google.com) → Admin (gear) →
   **Create → Property**. Name it "UMT Club website", set the US timezone/currency.
2. Add a **Web** data stream with URL `https://rdlucas2.github.io` (update this
   later when the custom domain exists). Leave **Enhanced measurement** on.
3. Copy the **Measurement ID** (`G-…`) shown on the stream page and paste it into
   `window.GA_MEASUREMENT_ID` in `index.html`. Deploy.
4. Admin → Data display → **Key events** → *New key event* → create two, by exact
   name: `sign_up_click` and `email_click`.
5. Verify: open the live site, click around, then check **Reports → Realtime**.
   For event-level detail, install the
   [Tag Assistant](https://tagassistant.google.com/) and use **Admin → DebugView**.

## Part 2 — Google Ads

Do this after GA4 shows data, and **do not launch campaigns until the Google Form
URL is live in `js/main.js`** — until then clicks land on "form coming soon" and
your budget buys nothing.

### Reactivate the dormant account
1. Sign in at [ads.google.com](https://ads.google.com); confirm billing details
   are current.
2. Complete **advertiser identity verification** (Billing → Advertiser
   verification). It's mandatory now and can take days — start it early.

### Conversion tracking
3. Goals → Conversions → **+ New conversion action → Website**. Scan the site,
   then choose **Add a conversion action manually**:
   - Category: *Submit lead form*. Name: `Sign-up click`. Value: none (or a
     nominal value). Count: **One** per click.
4. When asked how to install the tag, choose **Use the Google tag** /
   "install manually". You'll be shown a tag ID (`AW-…`) and an event snippet
   containing `send_to: 'AW-…/…'`:
   - Paste the `AW-…` ID into `window.GOOGLE_ADS_ID` in `index.html`.
   - Paste the full `AW-…/label` value into `GOOGLE_ADS_SEND_TO` in `js/main.js`.
   - Deploy. (The site already fires the conversion event on sign-up clicks.)
5. Link accounts: Google Ads → Tools → Data manager → connect **Google
   Analytics**, and in GA4 Admin → Product links → Google Ads. Then in Ads →
   Goals → Conversions → Import, add GA4's `email_click` as a **Secondary**
   conversion. Keep auto-tagging enabled (it's the default).
6. Status check: the conversion action shows "Unverified" until the first real
   click comes through, then "Recording conversions".

### Campaign structure (both Search campaigns)
7. **Campaign 1 — Local (in-person/hybrid):** target ~40 miles around Wexford,
   PA ("presence: people in or regularly in"). Ad groups: *adults* and
   *homeschool*. Starter keywords (phrase match):
   "music theory classes pittsburgh", "music theory teacher near me",
   "homeschool music class pittsburgh", "piano theory lessons wexford".
8. **Campaign 2 — Virtual (ET/CT):** target Eastern + Central time-zone states.
   Starter keywords: "online music theory class", "music theory for adults",
   "music theory class for homeschoolers", "rcm theory prep online".
9. Shared settings: start with **Maximize clicks** bidding and a modest daily
   budget (e.g. $5–10/day per campaign); switch to **Maximize conversions** only
   after ~30 conversions have recorded. Add sitelink assets pointing at
   `/#schedule`, `/#levels`, `/#pricing`, `/#faq`. Add negative keywords early
   (e.g. "free", "degree", "college", "ap music theory exam answers").
10. Review search-terms report weekly for the first month; prune junk terms and
    move winners to exact match.

## When the custom domain arrives
- GA4: Admin → Data streams → update the stream URL.
- Google Ads: update campaign final URLs.
- Site: add `<link rel="canonical">` and `og:url` in `index.html`.
