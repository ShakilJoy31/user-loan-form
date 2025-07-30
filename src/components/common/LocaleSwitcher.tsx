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

const LocaleSwitcher = () => {
  const { locale } = useLocaleContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="uppercase">
          {locale}
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
