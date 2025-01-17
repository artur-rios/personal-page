import {Content} from "@/types/content";

export type ContentSection = {
    header: string
    ptHeader: string
    subheader: string
    ptSubheader?: string
    image?: string
    content: Array<Content>
}