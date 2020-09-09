import React, { memo } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import {
  useStackedPagesProvider,
  StackedPagesProvider,
} from "react-stacked-pages-hook";
import { ScrollState } from "react-stacked-pages-hook/lib";

import { dataToNote, dataToSlug } from "../utils/data-to-note";
import Note from "./note";
import NoteWrapper from "./note-wrapper";
import Header from "./header";

import "./theme.css";
import "./stacked-layout.css";
import "./custom.css";

interface StackedPagesState {
  stackedPages: { slug: string; data: any }[];
  stackedPageStates: ScrollState;
  navigateToStackedPage: (to: string, index?: number | undefined) => void;
  highlightStackedPage: (
    slug: string,
    highlighted?: boolean | undefined
  ) => void;
}

const Content = ({
  windowWidth,
  scrollContainer,
  stackedPages,
  index,
}: any) => {
  return (
    <div className="layout">
      <Header />
      <div className="note-columns-scrolling-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: 625 * (stackedPages.length + 1) }}
        >
          {stackedPages.map((page: any, i: any) => (
            <NoteWrapper
              key={page.slug}
              i={typeof index !== "undefined" ? index : i}
              slug={page.slug}
              title={page.data.title}
            >
              <Note {...page.data} />
            </NoteWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, slug, data }: any) => {
  const windowWidth = useWindowWidth();

  const stackedPagesContext = useStackedPagesProvider({
    firstPage: { slug: dataToSlug(data), data },
    location,
    processPageQuery: dataToNote,
    pageWidth: 625,
  });
  const state = stackedPagesContext[0] as StackedPagesState;
  const scrollContainer = stackedPagesContext[1];

  let pages = state.stackedPages;
  let activeIndex;
  if (windowWidth <= 800) {
    const activeSlug = Object.keys(state.stackedPageStates).find(
      (slug) => state.stackedPageStates[slug].active
    );
    activeIndex = state.stackedPages.findIndex(
      (page: any) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      activeIndex = state.stackedPages.length - 1;
    }

    pages = [state.stackedPages[activeIndex]];
  }

  return (
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={windowWidth}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;
