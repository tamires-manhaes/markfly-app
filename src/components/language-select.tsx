import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "react-i18next";
import { useI18n } from "@/hooks/use-i18n";

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const { currentLanguage } = useI18n();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger className="w-[100px]" value={currentLanguage}>
        <SelectValue placeholder="Idioma" defaultValue="EN" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem key={l.code} value={l.code} className="W-[90px]">
            {l.flag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
