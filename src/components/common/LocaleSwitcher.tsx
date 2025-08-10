import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFontShifter } from "@/hooks/useFontShifter";
import { useLocaleContext } from "@/hooks/useLocaleContext";
import i18n from "@/i18n";
import { cn } from "@/lib/utils";
import { CiGlobe } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";

const LocaleSwitcher = () => {
  const { locale } = useLocaleContext();
  console.log(locale);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='text-gray-700 dark:text-gray-300 uppercase' variant="ghost" size="sm">
          <span><CiGlobe size={20}></CiGlobe></span> <span className="px-1">{locale === "bn" ? "বাংলা" : "Eng"}</span> <span className="ml-1"><FaAngleDown /></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn(useFontShifter())}>
        <DropdownMenuItem
          className={cn(
            locale === "bn" && "bg-white text-black dark:bg-black dark:text-white font-lato",
            "cursor-pointer font-anek"
          )}
          onClick={() => i18n.changeLanguage("bn")}
        >
          বাংলা
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            locale === "en" && "bg-white text-black dark:bg-black dark:text-white font-lato",
            "cursor-pointer"
          )}
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
