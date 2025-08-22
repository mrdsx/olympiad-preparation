import { StaticImageData } from "next/image";

import akatuj from "../../../public/akatuj.jpg";
import balakovo from "../../../public/balakovo.jpg";
import balashov from "../../../public/balashov.png";
import bashkiri from "../../../public/bashkiri.jpg";
import bogolubovAP from "../../../public/bogolubov-a-p.jpg";
import bortnichestvo from "../../../public/bortnichestvo.jpg";
import chernishevskiyNG from "../../../public/chernishevskiy-n-g.jpg";
import chuvashi from "../../../public/chuvashi.jpg";
import dalVI from "../../../public/dal-v-i.jpg";
import engels from "../../../public/engels.png";
import hudyakovMG from "../../../public/hudyakov-m-g.jpg";
import juGagarinu from "../../../public/ju-gagarinu.jpg";
import kauliChitek from "../../../public/kauli-chitek.jpg";
import komiParcha from "../../../public/komi-parcha.jpg";
import marijtsi from "../../../public/marijtsi.jpg";
import markelovMT from "../../../public/markelov-m-t.jpg";
import nardugan from "../../../public/nardugan.jpg";
import PAStolipinu from "../../../public/p-a-stolipinu.jpg";
import pervojUchitelnitse from "../../../public/pervoj-uchitelnitse.jpg";
import sabantuj from "../../../public/sabantuj.jpg";
import saratov from "../../../public/saratov.jpg";
import saratovskojGarmoshke from "../../../public/saratovskoj-garmoshke.jpg";
import semik from "../../../public/semik.jpg";
import shnitkeAG from "../../../public/shnitke-a-g.jpg";
import shumbrat from "../../../public/shumbrat.jpg";
import smirnovIN from "../../../public/smirnov-i-n.jpg";
import tabakovOP from "../../../public/tabakov-o-p.jpg";
import tatari from "../../../public/tatari.jpg";
import tatischevVN from "../../../public/tatischev-v-n.jpg";
import tere from "../../../public/tere.jpg";
import udmurti from "../../../public/udmurti.jpg";
import vojlokovalyanije from "../../../public/vojlokovalyanije.jpg";
import volsk from "../../../public/volsk.jpg";
import vorobjevNI from "../../../public/vorobjev-n-i.jpg";
import zhuravli from "../../../public/zhuravli.jpg";

type ImageItem = {
  name: string;
  url: StaticImageData;
};

const imagesArray: ImageItem[] = [
  { name: "Акатуй", url: akatuj },
  { name: "Балаково", url: balakovo },
  { name: "Балашов", url: balashov },
  { name: "Башкиры", url: bashkiri },
  { name: "Боголюбов А. П. (1824-1896)", url: bogolubovAP },
  { name: "Бортничество", url: bortnichestvo },
  { name: "Войлоковаляние", url: vojlokovalyanije },
  { name: "Вольск", url: volsk },
  { name: "Воробьев Н. И. (1894-1967)", url: vorobjevNI },
  { name: "Даль В. И. (1801-1872)", url: dalVI },
  { name: "Журавли", url: zhuravli },
  { name: "Каюлы Читек", url: kauliChitek },
  { name: "Коми парча", url: komiParcha },
  { name: "Марийцы", url: marijtsi },
  { name: "Маркелов М. Т. (1899-1937)", url: markelovMT },
  { name: "Нардуган", url: nardugan },
  { name: "П. А. Столыпину", url: PAStolipinu },
  { name: "Первой Учительнице", url: pervojUchitelnitse },
  { name: "Сабантуй", url: sabantuj },
  { name: "Саратов", url: saratov },
  { name: "Саратовской гармошке", url: saratovskojGarmoshke },
  { name: "Семык", url: semik },
  { name: "Смирнов И. Н. (1856-1904)", url: smirnovIN },
  { name: "Табаков О. П. (1935-2018)", url: tabakovOP },
  { name: "Татары", url: tatari },
  { name: "Татищев В. Н. (1686-1750)", url: tatischevVN },
  { name: "Тĕрĕ", url: tere },
  { name: "Удмурты", url: udmurti },
  { name: "Худяков М. Г. (1894-1936)", url: hudyakovMG },
  { name: "Чернышевский Н. Г. (1828-1889)", url: chernishevskiyNG },
  { name: "Чуваши", url: chuvashi },
  { name: "Шнитке А. Г. (1934-1998)", url: shnitkeAG },
  { name: "Шумбрат", url: shumbrat },
  { name: "Энгельс", url: engels },
  { name: "Ю. Гагарину", url: juGagarinu },
];

export { imagesArray, type ImageItem };
