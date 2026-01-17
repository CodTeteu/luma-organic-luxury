"use client";

import { TemplateData } from "@/types/template";
import { getTemplate } from "@/templates/registry";

interface TemplateRendererProps {
    data: TemplateData;
}

export default function TemplateRenderer({ data }: TemplateRendererProps) {
    // Get the configured template ID, default to 'organic-luxury'
    const templateId = data.config.themeStyle || 'organic-luxury';

    // Retrieve the component from registry
    const templateDef = getTemplate(templateId);

    // Render the specific template implementation
    const TemplateComponent = templateDef.component;

    return <TemplateComponent data={data} />;
}
