const { chromium } = require("playwright");

const VIEWPORT = { width: 1280, height: 720 };
const OUT_DIR = "/home/user/the-pincio-demo/video/short";

(async () => {
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: OUT_DIR, size: VIEWPORT },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  const sleep = (ms) => page.waitForTimeout(ms);

  const scrollTo = async (target, duration) => {
    await page.evaluate(({ target, duration }) => {
      const lenis = window.__lenis;
      let y = target;
      if (typeof target === "string") {
        const el = document.querySelector(target);
        y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      }
      if (lenis) lenis.scrollTo(y, { duration });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, { target, duration });
    await sleep(duration * 1000 + 200);
  };
  const arc = async (pts) => {
    for (const [x, y] of pts) { await page.mouse.move(x, y, { steps: 20 }); await sleep(300); }
  };

  // HERO — intro + pointer parallax
  await sleep(2600);
  await arc([[360, 280], [820, 340], [1040, 280], [620, 420], [340, 340]]);
  // GALLERY — horizontal pin
  await scrollTo("#gallery", 1.6);
  await sleep(300);
  await scrollTo("#sere", 4.2);
  // LOCATION — colle parallax
  await scrollTo("#dove", 1.8);
  await arc([[980, 300], [1150, 360], [1040, 300]]);
  await sleep(500);

  await context.close();
  await browser.close();
  console.log("SHORT RECORDED");
})().catch((e) => { console.error(e); process.exit(1); });
