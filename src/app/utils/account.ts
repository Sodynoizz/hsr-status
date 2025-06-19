import { HonkaiStarRail, LanguageEnum } from "node-hoyolab";

export const hsr = new HonkaiStarRail({
  cookie: {
    ltokenV2: process.env.LTOKEN_V2 || "",
    ltuidV2: parseInt(process.env.LTUID_V2!) || 0,
  },
  lang: LanguageEnum.THAI,
  uid: 812_226_331
});
