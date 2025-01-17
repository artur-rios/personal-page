"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {GiBrazilFlag, GiUsaFlag} from "react-icons/gi";
import {useLanguage} from "@/components/lang-provider";


export function LangToggle() {
    const { lang, setLang } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {(lang === "en") &&
                        <GiUsaFlag className={`h-[1.2rem] w-[1.2rem]`}/>
                    }
                    {(lang === "pt") &&
                        <GiBrazilFlag className={`h-[1.2rem] w-[1.2rem]`}/>
                    }
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang?.("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang?.("pt")}>
                    Portuguese
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}