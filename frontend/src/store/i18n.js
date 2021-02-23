// i18n.js 
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { globalResourceEN, globalResourceKO } from "./i18nResources/globalResource";
import { 
    ConclusionEN, 
    ContainerFirstEN, 
    ContainerFourthEN, 
    ContainerSecondEN, 
    ContainerThirdEN, 
    IntroductionEN, 
    LandingGlobalEN, 
    IntroductionKO, 
    LandingGlobalKO,
    ContainerFirstKO, 
    ContainerSecondKO,
    ContainerThirdKO,
    ContainerFourthKO,
    ConclusionKO
} from "./i18nResources/landingResource";

const resources = {
  en: {
    translation: Object.assign(
        {},
        LandingGlobalEN,
        IntroductionEN,
        ContainerFirstEN,
        ContainerSecondEN,
        ContainerThirdEN,
        ContainerFourthEN,
        ConclusionEN,

        globalResourceEN,
        )
  },
  ko: {
    translation: Object.assign(
        {},
        LandingGlobalKO,
        IntroductionKO,
        ContainerFirstKO,
        ContainerSecondKO,
        ContainerThirdKO,
        ContainerFourthKO,
        ConclusionKO,

        globalResourceKO,
    )
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:'ko',
  });

  
export default i18n;