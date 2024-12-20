/** === === === === === === === === === === === === **\
 * This is an internal component that manages the    *
 * core utilities of Wrapped. Changes and updates to *
 * this component are welcome, but they may impact   *
 * the work of other slides and other contributors.  *
\** === === === === === === === === === === === === **/

import { WrappedData } from "../utils/data";
import $ from "../utils/theme";
import Slides from "./slidesHelper";
import React, { useState, useEffect } from "react";
import Background from "../components/Background";

export default function HcbWrapped({ data }: { data: WrappedData }) {
  const [started, setStarted] = useState(false);

  const start = () => setStarted(true);

  useEffect(() => {
    const el = document.body;
    el.addEventListener("touchstart", function () {
      var top = el.scrollTop,
        totalScroll = el.scrollHeight,
        currentScroll = top + el.offsetHeight;

      //If we're at the top or the bottom of the containers
      //scroll, push up or down one pixel.
      //
      //this prevents the scroll from "passing through" to
      //the body.
      if (top === 0) {
        el.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1;
      }
    });

    el.addEventListener("touchmove", function (evt) {
      //if the content is actually scrollable, i.e. the content is long enough
      //that scrolling can occur
      if (el.offsetHeight < el.scrollHeight) (evt as any)._isScroller = true;
    });

    document.body.addEventListener(
      "touchmove",
      function (evt: any) {
        //In this case, the default behavior is scrolling the body, which
        //would result in an overflow.  Since we don't want that, we preventDefault.
        if (!evt._isScroller) {
          evt.preventDefault();
        }
      },
      { passive: false }
    );
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (window?.__wrapped_audio) return;
    // @ts-ignore
    window.__wrapped_audio = new Audio(
      "https://cloud-auzh6ioja-hack-club-bot.vercel.app/041857.mp3"
    );

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Wrapped Theme",
        artist: "Hack Club",
        album: "HCB Wrapped",
        artwork: [
          {
            src: "https://cloud-h35rphr9i-hack-club-bot.vercel.app/0bank_wrapped.jpg"
          }
        ]
      });
    } catch (err) {}

    // @ts-ignore
    window.__wrapped_audio.loop = true;
    // @ts-ignore
    window.__wrapped_audio.currentTime = 500;
    // @ts-ignore
    window.__wrapped_audio.volume = 0.4;
  }, []);

  useEffect(() => {
    if (started == true) {
      // @ts-ignore
      if (window?.__wrapped_audio_started) return;
      // @ts-ignore
      window.__wrapped_audio.play();
    }
  }, [started]);

  return (
    <>
      <div
        {...$({
          margin: "0px",
          padding: "0px",
          height: "100svh",
          width: "100vw",
          zIndex: "19",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        })}
        id="main-wrapped-part"
      >
        {started ? (
          <Slides data={data} />
        ) : (
          <div
            className="card"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              width: "95%",
              maxWidth: "400px",
              gap: "8px"
            }}
          >
            <h2 style={{ fontSize: "2.3rem" }}>🏦 🎁 🎉</h2>
            <h1 style={{ fontSize: "2.7rem" }}>
              Welcome to <br /> Wrapped 2024
            </h1>
            <div>
              This year's HCB Wrapped is open-sourced and built by 10+ Hack
              Clubbers; check it out{" "}
              <a
                href="https://github.com/hackclub/hcb-wrapped-2024"
                target="_blank"
              >
                on Github
              </a>
              .
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={start}>Unwrap The Year on HCB</button>
            </div>
            <Background />
          </div>
        )}
      </div>
      <div className="bg-wrapper">
        <div className="bg"></div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: css
        }}
      />
    </>
  );
}

export const css = `
    * {
        box-sizing: border-box;
    }

    html, body, div.wrapper, div.bg-wrapper {
        margin: 0px;
        padding: 0px;
        height: 100svh;
        width: 100vw;
    }

    div.bg-wrapper {
        position: absolute;
        z-index: 4;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }

    body {
        background: var(--red);
    }

    div.wrapper {
        z-index: 19;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.main {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        box-shadow: 0px 0px 20px 0px #3403095e;
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 22;
    }

    .tx-details {
        display: inline-flex;
    }

    @media screen and (max-width: 600px) {
        .tx-details {
            display: none;
        }
    }

    div.content {
        text-align: center;
        cursor: default;
        max-width: 100%;
    }

    div.footer {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding: var(--spacing-3);
        text-align: center;
        color: white;
        z-index: 20;
    }

    div.inner-footer {
        background: #ec374f92;
        display: inline-block;
        box-shadow: 0px 0px 40px 0px #ec374f92;
        padding: 16px;
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 21;
    }

    div.inner-footer * {
        color: white;
    }

    div.progress {
        width: 100%;
        height: 32px;
        border: 4px solid var(--smoke);
        background: var(--snow);
        border-radius: 16px;
    }

    div.progress > div.meter {
        height: 100%;
        background: var(--red);
        --color-1: #ec3750;
        --color-2: #a72032;
        background-position-x: 10px;
        --width: 20px;
        background: repeating-linear-gradient(110deg, #ec3750 calc(var(--offset) + 0px), #ec3750 calc(var(--offset) + var(--width)), #cb2b41 calc(var(--offset) + var(--width)), #cb2b41 calc(var(--offset) + calc(var(--width) * 2)));
        width: min(max(calc(var(--value) * 100%), 60px), 100%);
        transition: width 0.5s;
        border-radius: 16px;
        color: white;
        font-size: 10px;
    }

    .dev div.progress > div.meter {
        background: repeating-linear-gradient(110deg, #26c696 calc(var(--offset) + 0px), #26c696 calc(var(--offset) + var(--width)), #13a67a calc(var(--offset) + var(--width)), #13a67a calc(var(--offset) + calc(var(--width) * 2)));
    }

    div.meter > p {
        color: white;
        vertical-align: top;
        display: inline-block;
        margin: 0px;
        padding: 0px;
        font-size: 18px;
        font-weight: bold;
    }

    .transition-in {
        opacity: 0;
        position: relative;
        top: 0px;
        left: -50px;
        transition: all 0.6s;
    }

    .transition-in.transitioned-in {
        top: 0px;
        left: 0px;
        opacity: 1;
    }

    .transition-in.transitioned-out {
        top: 0px;
        left: 50px;
        opacity: 0;
    }

    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}
body {
    line-height: 1;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: "";
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* STRICTLY FOR HQ CONTROLLED SITES ONLY. */

@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Regular.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Regular.woff2")
            format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Italic.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Italic.woff2")
            format("woff2");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}
@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Bold.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Bold.woff2")
            format("woff2");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Book.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Book.woff2")
            format("woff2");
    font-weight: 450;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Medium.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Medium.woff2")
            format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: "Phantom Sans";
    src:
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Semibold.woff")
            format("woff"),
        url("https://assets.hackclub.com/fonts/Phantom_Sans_0.8/Semibold.woff2")
            format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

:root {
    --darker: #121217;
    --dark: #17171d;
    --darkless: #252429;
    --black: #1f2d3d;
    --steel: #273444;
    --slate: #3c4858;
    --muted: #8492a6;
    --smoke: #e0e6ed;
    --snow: #f9fafc;
    --white: #ffffff;
    --red: #ec3750;
    --orange: #ff8c37;
    --yellow: #f1c40f;
    --green: #33d6a6;
    --cyan: #5bc0de;
    --blue: #338eda;
    --purple: #a633d6;
    --text: var(--black);
    --background: var(--white);
    --elevated: var(--white);
    --sheet: var(--snow);
    --sunken: var(--smoke);
    --border: var(--smoke);
    --primary: #ec3750;
    --secondary: #8492a6;
    --accent: #5bc0de;
    --twitter: #1da1f2;
    --facebook: #3b5998;
    --instagram: #e1306c;
    --breakpoint-xs: 32em;
    --breakpoint-s: 48em;
    --breakpoint-m: 64em;
    --breakpoint-l: 96em;
    --breakpoint-xl: 128em;
    --spacing-0: 0px;
    --spacing-1: 4px;
    --spacing-2: 8px;
    --spacing-3: 16px;
    --spacing-4: 32px;
    --spacing-5: 64px;
    --spacing-6: 128px;
    --spacing-7: 256px;
    --spacing-8: 512px;
    --font-1: 12px;
    --font-2: 16px;
    --font-3: 20px;
    --font-4: 24px;
    --font-5: 32px;
    --font-6: 48px;
    --font-7: 64px;
    --font-8: 96px;
    --font-9: 128px;
    --font-10: 160px;
    --font-11: 192px;
    --line-height-limit: 0.875;
    --line-height-title: 1;
    --line-height-heading: 1.125;
    --line-height-subheading: 1.25;
    --line-height-caption: 1.375;
    --line-height-body: 1.5;
    --font-weight-body: 400;
    --font-weight-bold: 700;
    --font-weight-heading: var(--font-weight-bold);
    --letter-spacing-title: -0.009em;
    --letter-spacing-headline: 0.009em;
    --size-wide-plus: 2048px;
    --size-wide: 1536px;
    --size-layout-plus: 1200px;
    --size-layout: 1024px;
    --size-copy-ultra: 980px;
    --size-copy-plus: 768px;
    --size-copy: 680px;
    --size-narrow-plus: 600px;
    --size-narrow: 512px;
    --radii-small: 4px;
    --radii-default: 8px;
    --radii-extra: 12px;
    --radii-ultra: 16px;
    --radii-circle: 99999px;
    --shadow-text: 0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.125);
    --shadow-small: 0 1px 2px rgba(0, 0, 0, 0.0625),
        0 2px 4px rgba(0, 0, 0, 0.0625);
    --shadow-card: 0 4px 8px rgba(0, 0, 0, 0.125);
    --shadow-elevated: 0 1px 2px rgba(0, 0, 0, 0.0625),
        0 8px 12px rgba(0, 0, 0, 0.125);
}

body {
    font-family:
        "Phantom Sans",
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif;
    line-height: var(--line-height-body);
    font-weight: var(--font-weight-body);
    margin: 0;
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    font-smooth: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: var(--text);
    box-sizing: border-box;
}

* {
    box-sizing: border-box;
}

.monospace {
    font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
}

.heading {
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

.ultratitle {
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-limit);
    letter-spacing: var(--letter-spacing-title);
}

.title {
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
    letter-spacing: var(--letter-spacing-title);
}

.subtitle {
    margin-top: var(--spacing-3);
    font-weight: var(--font-weight-body);
    line-height: var(--line-height-subheading);
    letter-spacing: var(--letter-spacing-headline);
}

.headline {
    margin-top: var(--spacing-3);
    margin-bottom: var(--spacing-3);
    font-size: var(--font-4);
    line-height: var(--line-height-heading);
    letter-spacing: var(--letter-spacing-headline);
}

.subheadline {
    margin-top: var(--spacing-0);
    margin-bottom: var(--spacing-3);
    font-size: var(--font-2);
    line-height: var(--line-height-heading);
    letter-spacing: var(--letter-spacing-headline);
}

.eyebrow {
    color: var(--muted);
    font-weight: var(--font-weight-heading);
    letter-spacing: var(--letter-spacing-headline);
    line-height: var(--line-height-subheading);
    text-transform: uppercase;
    margin-top: var(--spacing-0);
    margin-bottom: var(--spacing-2);
}

.lead {
    font-weight: var(--font-weight-body);
}

.caption {
    color: var(--muted);
    font-weight: var(--font-weight-body);
    letter-spacing: var(--letter-spacing-headline);
    line-height: var(--line-height-caption);
}

.pill {
    border-radius: var(--radii-circle);
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    font-size: var(--font-2);
    background: var(--primary);
    color: var(--background);
    font-weight: var(--font-weight-bold);
}

.outline-badge {
    border-radius: var(--radii-circle);
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    font-size: var(--font-2);
    background: none;
    color: var(--muted);
    border: 1px solid currentcolor;
    font-weight: var(--font-weight-body);
}

button {
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--font-weight-bold);
    border-radius: var(--radii-circle);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-card);
    letter-spacing: var(--letter-spacing-headline);
    -webkit-tap-highlight-color: transparent;
    transition:
        transform 0.125s ease-in-out,
        box-shadow 0.125s ease-in-out;
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: center;
    line-height: inherit;
    -webkit-text-decoration: none;
    text-decoration: none;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: var(--theme-ui-colors-white, #ffffff);
    background-color: var(--theme-ui-colors-primary, #ec3750);
    border: 0;
    font-size: var(--font-2);
}

button:focus,
button:hover {
    box-shadow: var(--shadow-elevated);
    transform: scale(1.0625);
}

button.lg {
    font-size: var(--font-3) !important;
    line-height: var(--line-height-title);
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
}

button.outline {
    background: none;
    color: var(--primary);
    border: 2px solid currentcolor;
}

button.cta {
    font-size: var(--font-2);
    background-image: radial-gradient(
        ellipse farthest-corner at top left,
        var(--orange),
        var(--red)
    );
}

.card {
    background: var(--elevated);
    color: var(--text);
    border-radius: var(--radii-extra);
    box-shadow: var(--shadow-card);
    overflow: hidden;
}

.card.sunken {
    background: var(--sunken);
    box-shadow: none;
}

.card.interactive {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition:
        transform 0.125s ease-in-out,
        box-shadow 0.125s ease-in-out;
}

.card.interactive:hover,
.card.interactive:focus {
    transform: scale(1.0625);
    box-shadow: var(--shadow-elevated);
}

input,
textarea,
select {
    background: var(--elevated);
    color: var(--text);
    font-family: inherit;
    border-radius: var(--radii-small);
    border: 0;
    font-size: inherit;
    padding: var(--spacing-2);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

input::-webkit-input-placeholder,
input::-moz-placeholder,
input:-ms-input-placeholder,
textarea::-webkit-input-placeholder,
textarea::-moz-placeholder,
textarea:-ms-input-placeholder,
select::-webkit-input-placeholder,
select::-moz-placeholder,
select:-ms-input-placeholder {
    color: var(--muted);
}

input[type="search"]::-webkit-search-decoration,
textarea[type="search"]::-webkit-search-decoration,
select[type="search"]::-webkit-search-decoration {
    display: none;
}

input[type="checkbox"] {
    -webkit-appearance: checkbox;
    -moz-appearance: checkbox;
    appearance: checkbox;
}

label {
    color: var(--text);
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: var(--line-height-caption);
    font-size: var(--font-3);
}

label.horizontal {
    display: flex;
}

.slider {
    color: var(--primary);
}

.form-hidden {
    position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
}

.container {
    width: 100%;
    margin: auto;
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
}

h1 {
    font-size: var(--font-5);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

h2 {
    font-size: var(--font-4);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

h3 {
    font-size: var(--font-3);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

h4 {
    font-size: var(--font-2);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

h5 {
    font-size: var(--font-1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

h6 {
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    margin-top: 0;
    margin-bottom: 0;
}

p {
    color: var(--text);
    font-weight: var(--font-weight-body);
    line-height: var(--line-height-body);
    margin-top: var(--spacing-3);
    margin-bottom: var(--spacing-3);
}

img {
    max-width: 100%;
}

hr {
    border: 0;
    border-bottom: 1px solid var(--border);
}

a {
    color: var(--primary);
    text-decoration: underline;
    text-underline-position: under;
}

a:focus,
a:hover {
    text-decoration-style: wavy;
    text-decoration-skip-ink: none;
}

pre {
    font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
    font-size: var(--font-1);
    padding: var(--spacing-3);
    color: var(--text);
    background: var(--sunken);
    overflow: auto;
    border-radius: var(--radii-default);
    white-space: inherit;
}

pre > code {
    color: inherit;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
}

code {
    font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
    font-size: inherit;
    color: var(--purple);
    background: var(--sunken);
    overflow: auto;
    border-radius: var(--radii-small);
    margin-left: var(--spacing-1);
    margin-right: var(--spacing-1);
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
}

p > code,
li > code {
    color: var(--blue);
    font-size: 0.875em;
}

p > a > code,
li > a > code {
    color: var(--blue);
    font-size: 0.875em;
}

li {
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
}

table {
    width: 100%;
    margin-top: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    border-collapse: separate;
    border-spacing: 0;
}

table > th,
table > td {
    text-align: left;
    padding: 4px;
    padding-left: 0px;
    border-color: var(--border);
    border-bottom-style: solid;
}

th {
    vertical-align: bottom;
    border-bottom-width: 2px;
}

td {
    vertical-align: top;
    border-bottom-width: 1px;
}

.ultratitle {
    font-size: var(--font-5);
}
.title {
    font-size: var(--font-4);
}
.subtitle {
    font-size: var(--font-2);
}
.eyebrow {
    font-size: var(--font-3);
}
.lead {
    font-size: var(--font-2);
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
}
.card {
    padding: var(--spacing-3);
}
.container {
    max-width: var(--size-layout);
}
.container.copy {
    max-width: var(--size-copy);
}
.container.narrow {
    max-width: var(--size-narrow);
}

    .ultratitle {
        font-size: var(--font-6);
    }
    .title {
        font-size: var(--font-5);
    }
    .subtitle {
        font-size: var(--font-3);
    }
    .eyebrow {
        font-size: var(--font-4);
    }
    .lead {
        font-size: var(--font-3);
        margin-top: var(--spacing-3);
        margin-bottom: var(--spacing-3);
    }
    .card {
        padding: var(--spacing-4);
    }



    .ultratitle {
        font-size: var(--font-7);
    }
    .title {
        font-size: var(--font-6);
    }
    .container {
        max-width: var(--size-layout-plus);
    }
    .container.wide {
        max-width: var(--size-wide);
    }
    .container.copy {
        max-width: var(--size-copy-plus);
    }
    .container.narrow {
        max-width: var(--size-narrow-plus);
    }


@keyframes _fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes _fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

._fadeIn {
  opacity: 0;
}

._fadeIn_fromBottom {
  transform: translateY(100%);
}

._fadeIn_fromTop {
  transform: translateY(-100%);
}

._fadeIn_fromLeft {
  transform: translateX(-100%);
}

._fadeIn_fromRight {
  transform: translateX(100%);
}

@keyframes _fadeIn_fromBottom {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes _fadeOut_toBottom {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}

@keyframes _fadeIn_fromTop {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes _fadeOut_toTop {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
}

@keyframes _fadeIn_fromLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes _fadeOut_toLeft {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
}

@keyframes _fadeIn_fromRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes _fadeOut_toRight {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes _zoomIn {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes _zoomOut {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.5);
        opacity: 0;
    }
}

@keyframes _spinIn {
    0% {
        transform: rotate(0deg) scale(0.25);
        opacity: 0;
        animation-timing-function: linear;
    }
    25% {
        transform: rotate(180deg) scale(0.4375);
        opacity: 0.25;
        animation-timing-function: linear;
    }
    50% {
        transform: rotate(360deg) scale(0.625);
        opacity: 0.5;
        animation-timing-function: linear;
    }
    75% {
        transform: rotate(540deg) scale(0.8125);
        opacity: 0.75;
        animation-timing-function: linear;
    }
    100% {
        transform: rotate(720deg) scale(1);
        opacity: 1;
        animation-timing-function: linear;
    }
}

.grid-container {
   display: grid;
   grid-template-columns: repeat(7, 1fr);
   grid-template-rows: repeat(6, 1fr);
   gap: 2px;
   max-width: 100%;
}

.grid-item {
   border: 0.2px solid #ffffff99;
   border-radius: 1px;
   padding-left: 0px!important;
   padding-right: 0px!important;
   padding-bottom: 0px!important;
   padding-top: calc(100% - 1px)!important;
}

`;
