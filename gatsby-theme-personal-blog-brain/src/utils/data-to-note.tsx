import React from "react";

const mapOutboundRefs = (ref: any) =>
  ref.parent.fields && typeof ref.parent.fields.title !== "undefined" // File
    ? {
        mdx: ref.body,
        title: ref.parent.fields.title,
        id: ref.parent.id,
        displayTitle: ref.parent.fields.title,
        slug: ref.parent.fields.slug,
      }
    : (() => {
        console.warn(`Cannot map outbound ref`, ref);
        return null;
      })();

const mapInboundRefs = (ref: any) =>
  ref.parent.fields && ref.parent.fields.title // File
    ? {
        content: null,
        title: ref.parent.fields.title,
        id: ref.parent.id,
        slug: ref.parent.fields.slug,
      }
    : (() => {
        console.warn(`Cannot map inbound ref`, ref);
        return null;
      })();

export const dataToNote = (data: any) =>
  data.file
    ? {
        title: data.file.fields.title,
        mdx: data.file.childMdx.body,
        outboundReferences: data.file.childMdx.outboundReferences
          .map(mapOutboundRefs)
          .filter((x: any) => !!x),
        inboundReferences: data.file.childMdx.inboundReferences
          .map(mapInboundRefs)
          .filter((x: any) => !!x),
      }
    : null;

export const dataToSlug = (data: any) =>
  data.file ? data.file.fields.slug : null;
