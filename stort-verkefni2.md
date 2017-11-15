
# Stórt verkefni 2

Seinna „stóra“ verkefnið felst í því að smíða vef lítinn myndbandavef.

Gefnar eru fyrirmyndir í 500px og 1000px fyrir útlit, vefur skal vera að fullu skalanlegur. Gögn skulu lesin úr `videos.json` skjali sem gefið er og engar upplýsingar skulu „harðkóðaðar“ í HTML. Birta skal skilaboð á meðan gögn eru hlaðin. Athugið að ef þetta væri „alvöru“ verkefni værum við með bakenda sem myndi sjá um að skrifa út rétt gögn í HTML í byrjun.

Uppbygging á `videos.json` er hlutur sem inniheldur:

* `videos` inniheldur fylki af vídeóum þar sem hvert vídeó hefur
  - `id`, einkvæmt auðkenni
  - `title`, titill sem birtur er
  - `created`, dagsetning þegar vídeó var „búið til“, millisekúndur 1. jan 1970
  - `duration`, lengd í sekúndum
  - `poster`, slóð á plakat
  - `video`, slóð á vídeó
* `categories`, inniheldur fylki af flokkum
  - `title`, titill flokks
  - `videos`, fylki af vísunum í vídeó að ofan, þau vídeó sem eru í flokk

Undir `gogn/videos` eru tvö lítil prufuvídeó sem hægt er að nota. Leyfilegt er að breyta og bæta við `videos.json` en passa skal upp á að senda ekki of stórar skrár í skilum.

## Myndbandalisti

Þegar vefur er opnaður (þ.e. `index.html`) skal lista upp alla flokka í þeirri röð sem þeir eru skilgreindir í `videos.json` ásamt öllum vídeóum sem eru í þeim flokki:

* Plakat fyrir vídeó
* Titill sem fer ekki í tvær línur
* Lengd sem liggur ofan á plakati formuð í mínútur og sekúndur, t.d. `30:20` væri 30 mín og 20 sek, sjá fyrirmynd, í fyrirmynd er bakgrunnslitur `rgba(0, 0, 0, 0.5)`
* Aldur vídeós formað eftir eftirfarandi reglum og mun á eintölu og fleirtölu (ekki þarf þó að gera ráð fyrir eintölu í 21, 31 o.s.fr.)
  - Ef aldur er meiri en eitt ár (365 dagar) er birt `Fyrir X ári/árum síðan`
  - Annars, ef aldur er meiri en mánuður (30 dagar) er birt `Fyrir X mánuði/mánuðum síðan`
  - Annars, ef aldur er meiri en vika (7 dagar) er birt `Fyrir X viku/vikum síðan`
  - Annars, ef aldur er meiri en dagur (24 klst) er birt `Fyrir X degi/dögum síðan`
  - Annars, er aldur í klukkustundum birtur `Fyrir x klukkustund/klukkustundum síðan`

Milli flokka er lína, `#eee` í fyrirmynd.

## Myndband

Þegar myndband er valið er farið á aðra síðu með auðkenni á myndbandi í _querystring_, t.d. `video.html?id=1`. Sá vefur grípur hvert það myndband er og birtir það með titil þess í haus og stýringum:

* Til baka takki, þegar ýtt er á hann og myndband er að spila, er það fært til baka um 3 sekúndur eða á byrjun
* Spila takki, ef videó er ekki að spila er það spilað, annars er pásu táknmynd sýnd og vídeó pásað
* Slökkva á hljóði takki, ef hljóð er að spila er slökkt á því annars öfugt
* _Fullscreen_ takki, setur vídeó í fullscreen (athuga þarf stuðning og gera ráðstafanir með `requestFullscreen` API)
* Áfram takki, þegar ýtt er á hann og myndband er að spila, er það fært áfram um 3 sekúndur eða á enda

Meðan vídeó er ekki að spila er sýnt _overlay_ með play takka í miðju og gegnsæum bakgrunn (`rgba(0, 0, 0, 0.2)` í fyrirmynd).

Ef vídeó er ekki til (`id` er ekki í `videos.json`) er skilaboð um það birt.

Táknmyndir fyrir stýringar eru gefnar í `gogn/img`.

## Tæki og tól

Leyfilegt er að nota tæki og tól sem farið hefur verið yfir ásamt öðrum, innan skynsamlegra marka. Ef vafi leikur á hvort eitthvað sé í lagi skal hafa samband við kennara. Sterklega mælt með að nota Sass og ES2015.

Gefin er `.stylelintrc` skrá sem segir til um hvernig lint fyrir `scss` skrár skuli háttað.

Gefin er `.eslintrc` skrá fyrir ES2015.

Ef annað er notað þarf að gera viðeigandi ráðstafanir með linting.

## Hópavinna

Verkefnið skal unnið í hóp, helst með þremur einstaklingum. Hópar með tveim eða fjórum einstaklingum eru einnig í lagi. Hafið samband við kennara ef ekki tekst eða ekki mögulegt að vinna í hóp.

Notast skal við Git og, GitHub eða Bitbucket til að halda utan um verkefni. Engar zip skrár með kóða ættu að ganga á milli í hópavinnu, heldur á að „committa“ allan kóða og vinna gegnum Git.

## Lýsing á verkefni

`README.md` skrá skal vera í rót verkefnis og innihalda:

* Upplýsingar um hvernig keyra skuli verkefnið, miða skal við að einhver sem ekki veit neitt um verkefnið geti keyrt það án vandræða
* Lýsingu á uppsetningu verkefnis, hvernig því er skipt í möppur, hvernig CSS er skipulagt og fleira sem á við
* Upplýsingar um alla sem unnu verkefni

## Mat

* 20% – CSS og JavaScript snyrtilegt og án lint villa þegar `npm run lint -s` er keyrt
* 20% – Gögn sótt úr `videos.json`
* 20% – Virkni fyrir myndbandalista
* 20% – Virkni fyrir myndband
* 20% – Skalanlegt útlit eftir fyrirmynd

## Sett fyrir

Verkefni sett fyrir í fyrirlestri 6. nóvember 2017.

## Skil

Senda skal tölvupóst til dæmatímakennara (sem flestir í hóp eru hjá, eða af handahófi) með fyrirsögn „Vefforritun - Stórt verkefni 2“ í seinasta lagi þriðjudaginn 27. nóvember 2017.

Póstur skal innihalda:

* Slóð á zip skjal með lausn sem heitir notendanöfnum allra í hóp, skiptum með „-“, t.d. `osk-foo-bar.zip`
* Slóð á verkefnið keyrandi á vefnum
* Slóð á GitHub/Bitbucket repository fyrir verkefnið

**EKKI** skal skila `/node_modules` möppu.

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 3,5% hvert, samtals 28% af lokaeinkunn.

Sett verða fyrir tvö stærri verkefni þar sem hvort um sig gildir 11%, samtals 22% af lokaeinkunn.

Táknmyndir fengnar frá [Smashicons](https://www.flaticon.com/authors/smashicons)
